---
title: Cross-post your unify blog to dev.to
description: "Extend unify's blog template with one script and one CI job: every post goes to dev.to with its canonical URL pointing home, never twice, with its tags kept in step."
author: fwdslsh
date: 2026-10-10T04:00:00Z
tags: webdev, devto, staticsite, tutorial
---

# Cross-post your unify blog to dev.to

Posting on your own site and on dev.to gets you two audiences, but only if the copies stay honest. Search engines should credit your site, not the copy. A post should land once, not once per deploy. And when you fix a tag at home, the copy should pick it up.

This site now does all three: [the posts here](/blog/index.html) are on the fwdslsh dev.to account. This post shows how to add the same thing to a site you started with `unify init blog`, in one script and one CI job.

## Keep it out of the build

The blog template doesn't ship this, on purpose. A unify build reads files and writes files; it doesn't reach the network, so you can build on a plane and get the same bytes twice. Publishing to dev.to is a side effect on somebody else's service, and it should happen once, after the site is live, not on every `unify dev` rebuild.

So it isn't a generator. It's a script you run after deploying: `scripts/crosspost-devto.mjs`, beside the template's `scripts/gen.mjs`.

## Give the posts their real address

Each copy on dev.to carries a canonical URL: the address of the original. The script works that address out the way unify does, from the site's address and whether you use pretty URLs. Save both in `unify.yaml` so the build and the script read the same values:

```sh
unify build --base-url https://you.example/ --pretty-urls --save-config
```

With those two settings, `site/posts/hello.md` is published at `https://you.example/posts/hello/`, and unify writes that same URL into the page's `<link rel="canonical">`.

## The script

```js
// Publishes every post in site/posts/ that dev.to doesn't have yet, with its
// canonical URL pointing at this site, and keeps each copy's tags in step with
// the post's tags: line. Run it after a deploy: node scripts/crosspost-devto.mjs
import { readdirSync, readFileSync } from "node:fs";

const API = "https://dev.to/api";
const config = readFileSync("unify.yaml", "utf8");
const base = config.match(/^base-url:\s*(\S+)/m)?.[1];
if (!base) throw new Error("save the site's address first: unify build --base-url https://you.example/ --save-config");
const site = new URL(base.endsWith("/") ? base : `${base}/`);
const pretty = /^pretty-urls:\s*true\b/m.test(config);

// The address unify publishes a source file at.
const address = (path) => new URL(pretty ? path.replace(/\.(md|html)$/, "/") : path.replace(/\.md$/, ".html"), site).href;

// A root-relative link in a post, as an absolute link dev.to can follow.
const absolute = (link) => {
  const [path, hash] = link.split("#");
  const url = /\.(md|html)$/.test(path) ? address(path.slice(1)) : new URL(path.slice(1), site).href;
  return hash ? `${url}#${hash}` : url;
};

function readPost(file) {
  const text = readFileSync(`site/posts/${file}`, "utf8");
  const [, head = "", body = text] = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
  const data = {};
  for (const line of head.split("\n")) {
    const m = line.match(/^([\w-]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
  }
  return {
    date: data.date,
    article: {
      title: data.title,
      description: data.description ?? "",
      // dev.to prints the title itself, so the post's own # heading goes.
      body_markdown: body.replace(/^\s*#\s.*\n+/, "").replace(/\]\((\/[^)\s]*)\)/g, (_, link) => `](${absolute(link)})`),
      canonical_url: address(`posts/${file}`),
      // dev.to takes at most four tags, lowercase letters and digits only.
      tags: (data.tags ?? "").split(",").map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, "")).filter(Boolean).slice(0, 4),
      published: true,
    },
  };
}

const posts = readdirSync("site/posts")
  .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
  .map(readPost)
  .filter(({ article, date }) => article.title && date && Date.parse(date) <= Date.now())
  .map(({ article }) => article);

const key = process.env.DEVTO_API_KEY;
if (!key) {
  console.log(`DEVTO_API_KEY is not set, so nothing was sent; ${posts.length} posts would be checked`);
  process.exit(0);
}
const headers = { "api-key": key, "content-type": "application/json", accept: "application/vnd.forem.api-v1+json" };
const pause = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

let writes = 0;
async function write(method, url, body) {
  if (writes++) await pause(5); // dev.to rate-limits article writes
  let res = await fetch(url, { method, headers, body: JSON.stringify(body) });
  if (res.status === 429) {
    await pause(Number(res.headers.get("retry-after")) || 30);
    res = await fetch(url, { method, headers, body: JSON.stringify(body) });
  }
  if (!res.ok) throw new Error(`${method} ${url}: HTTP ${res.status} ${await res.text()}`);
  return res.json();
}

const res = await fetch(`${API}/articles/me/all?per_page=1000`, { headers });
if (!res.ok) throw new Error(`listing your dev.to articles failed: HTTP ${res.status}`);
const trim = (url) => (url ?? "").replace(/\/+$/, "");
const onDevto = new Map((await res.json()).map((copy) => [trim(copy.canonical_url), copy]));
// dev.to returns tags as an array here, but as "a, b" in some other responses.
const sameTags = (a, b) => [a, b].map((t) => (Array.isArray(t) ? t : String(t ?? "").split(/,\s*/)).filter(Boolean).sort().join()).reduce((x, y) => x === y);

for (const article of posts) {
  const copy = onDevto.get(trim(article.canonical_url));
  if (!copy) {
    const made = await write("POST", `${API}/articles`, { article });
    console.log(`published ${made.url} ← ${article.canonical_url}`);
  } else if (article.tags.length && !sameTags(article.tags, copy.tag_list)) {
    await write("PUT", `${API}/articles/${copy.id}`, { article: { tags: article.tags } });
    console.log(`retagged ${copy.url} [${article.tags}]`);
  }
}
```

It uses only Node's built-ins, so there's nothing to install. A few choices in it are worth explaining.

**Matching by canonical URL is what makes it safe to run on every deploy.** The script asks dev.to for every article on your account, including drafts, and skips any post whose canonical URL is already there. There's no state file to commit and no list of what's been posted. dev.to already holds that record. The trailing slash is trimmed on both sides, so `/posts/hello` and `/posts/hello/` count as the same post.

**The copy reads like the original.** Your post starts with `# Title` because unify needs a heading, but dev.to prints the title above the body, so the script drops the first heading. A root-relative link like `[the archive](/blog.html)` would point at dev.to on dev.to, so it becomes an absolute link to your site, at the published address. The replacement is a plain pattern: it also rewrites links inside code blocks. If your posts show Markdown in code, skip fenced lines before replacing. [This site's version](https://github.com/fwdslsh/website/blob/main/scripts/syndication.mjs) does that, with tests.

**A post dated in the future waits.** It's skipped until a deploy after its date, so you can merge a post early and let it go out on schedule.

**Tags come from the post.** Add a line to the frontmatter:

```yaml
tags: webdev, html, staticsite
```

unify allows `tags` and builds nothing from it, so the line costs you nothing on your own site. dev.to takes at most four tags made of lowercase letters and digits, so the script trims and lowercases what you write. When a post already on dev.to has different tags, the script updates them in place. A post with no `tags:` line leaves its copy's tags alone, so tags you set by hand on dev.to stay.

**It pauses between writes.** dev.to rate-limits article creation. Our first run published three posts, and the third got a 429 response. The script waits five seconds between writes and retries once after the time dev.to asks for.

## Run it after the deploy

Create an API key on dev.to under Settings → Extensions → DEV Community API Keys, and store it as a secret named `DEVTO_API_KEY` in your repository or organization. Then add a job that runs after your deploy job. On GitHub Actions:

```yaml
crosspost:
  if: github.event_name == 'push'
  needs: deploy
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 22
    - run: node scripts/crosspost-devto.mjs
      env:
        DEVTO_API_KEY: ${{ secrets.DEVTO_API_KEY }}
```

`needs: deploy` keeps a post from reaching dev.to before its canonical URL exists. The `if:` keeps pull requests from publishing anything. Without the key, the script says so and exits 0. That's what a fork's CI sees, and what our first deploy logged before the secret was added.

Run it a second time and it does nothing. That's the check that it works: the second run prints no `published` or `retagged` lines.

## Optional: list dev.to articles on your blog

The other direction is a generator's job, since it changes what the blog page says. In the template's `scripts/gen.mjs`, fetch `https://dev.to/api/articles?username=you` and merge those articles into the list before sorting. Two rules keep it from going wrong:

- **Leave out your own cross-posts.** Each one carries a canonical URL on your site, so drop any article whose `canonical_url` starts with your base URL. Otherwise every post would appear twice on your own blog.
- **Never fail the build over it.** dev.to can be down, and your laptop can be offline. Give the request a timeout, catch the error, and build with your own posts. Print one line saying what happened, for example `skipped dev.to/you (fetch failed)`, using `console.log`. unify passes a generator's stdout through to the build log, so the line shows up in CI.

This is the one part that makes your build reach the network, which is why it's optional. This site does it in [gen.mjs](https://github.com/fwdslsh/website/blob/main/scripts/gen.mjs), and the [scripts README](https://github.com/fwdslsh/website/blob/main/scripts/README.md) describes both directions.
