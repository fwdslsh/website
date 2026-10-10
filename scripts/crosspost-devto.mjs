// Cross-posts this blog's posts to dev.to, run by CI after each deploy of main
// (.github/workflows/swa.yml). Every post in site/blog/posts/ that the dev.to
// account (the one DEVTO_API_KEY belongs to) does not yet carry is published
// there, with its canonical URL set to the post's address on this site, so
// search engines credit fwdslsh.dev and gen.mjs knows to leave the copy out of
// the blog's own list. A post already on dev.to — matched by canonical URL — is
// never posted twice, so the script is safe to run on every deploy. A post's
// `tags:` line becomes its dev.to tags, and a post already there whose tags
// differ from its line has them updated.
//
//   node scripts/crosspost-devto.mjs            publish what is missing
//   node scripts/crosspost-devto.mjs --dry-run  list what would be published or retagged
//
// Without DEVTO_API_KEY it says so and does nothing (a fork's CI, a local run).
// A post dated in the future waits until a deploy after its date.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { devtoTags, parseFrontmatter, publishedUrl, toDevtoMarkdown } from "./syndication.mjs";

const API = "https://dev.to/api";
const root = fileURLToPath(new URL("..", import.meta.url));

/** base-url and pretty-urls, from the unify.yaml every build reads. */
export function siteSettings(yaml) {
  const base = yaml.match(/^base-url:\s*(\S+)/m)?.[1];
  if (!base) throw new Error("crosspost-devto.mjs: unify.yaml has no base-url, so posts have no canonical address");
  return { siteBase: base.endsWith("/") ? base : `${base}/`, prettyUrls: /^pretty-urls:\s*true\b/m.test(yaml) };
}

/** Every published post as the dev.to article it becomes. */
export function articles({ postsDir, siteBase, prettyUrls, now = new Date() }) {
  return readdirSync(postsDir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .sort()
    .map((name) => {
      const { data, body } = parseFrontmatter(readFileSync(join(postsDir, name), "utf8"));
      return {
        date: data.date,
        article: {
          title: data.title,
          description: data.description || "",
          body_markdown: toDevtoMarkdown(body, siteBase, prettyUrls),
          canonical_url: publishedUrl(`blog/posts/${name}`, siteBase, prettyUrls),
          tags: devtoTags(data.tags),
          published: true,
        },
      };
    })
    .filter(({ article, date }) => article.title && date && Date.parse(date) <= now.getTime())
    .map(({ article }) => article);
}

const norm = (url) => (url || "").replace(/\/+$/, "");
// dev.to lists tags as an array, but some of its responses spell them "a, b".
const tagKey = (tags) => (Array.isArray(tags) ? tags : String(tags || "").split(/,\s*/)).filter(Boolean).sort().join();

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const key = process.env.DEVTO_API_KEY;
  const { siteBase, prettyUrls } = siteSettings(readFileSync(join(root, "unify.yaml"), "utf8"));
  const candidates = articles({ postsDir: join(root, "site", "blog", "posts"), siteBase, prettyUrls });

  if (!key) {
    console.log(`crosspost-devto: DEVTO_API_KEY is not set; nothing is published (${candidates.length} posts would be checked)`);
    if (dryRun) for (const a of candidates) console.log(`  ${a.canonical_url}  ${a.title}`);
    return;
  }
  const headers = { "api-key": key, "content-type": "application/json", accept: "application/vnd.forem.api-v1+json" };

  const res = await fetch(`${API}/articles/me/all?per_page=1000`, { headers });
  if (!res.ok) throw new Error(`crosspost-devto: listing the account's articles failed: HTTP ${res.status}`);
  const existing = new Map((await res.json()).map((a) => [norm(a.canonical_url), a]));
  const missing = candidates.filter((a) => !existing.has(norm(a.canonical_url)));
  const retag = candidates
    .map((a) => ({ article: a, copy: existing.get(norm(a.canonical_url)) }))
    .filter(({ article, copy }) => copy && article.tags.length && tagKey(article.tags) !== tagKey(copy.tag_list));

  console.log(`crosspost-devto: ${candidates.length} posts, ${missing.length} not on dev.to yet, ${retag.length} to retag`);
  const jobs = [
    ...missing.map((article) => ({ verb: "publish", url: `${API}/articles`, method: "POST", body: { article }, canonical: article.canonical_url })),
    ...retag.map(({ article, copy }) => ({ verb: "retag", url: `${API}/articles/${copy.id}`, method: "PUT", body: { article: { tags: article.tags } }, canonical: article.canonical_url })),
  ];
  for (const [i, job] of jobs.entries()) {
    if (dryRun) {
      console.log(`  would ${job.verb} ${job.canonical}`);
      continue;
    }
    if (i > 0) await new Promise((r) => setTimeout(r, 5000)); // dev.to rate-limits article writes
    const send = () => fetch(job.url, { method: job.method, headers, body: JSON.stringify(job.body) });
    let reply = await send();
    if (reply.status === 429) {
      await new Promise((r) => setTimeout(r, 1000 * (Number(reply.headers.get("retry-after")) || 30)));
      reply = await send();
    }
    if (!reply.ok) throw new Error(`crosspost-devto: ${job.verb} ${job.canonical} failed: HTTP ${reply.status} ${await reply.text()}`);
    const done = await reply.json();
    console.log(`  ${job.verb === "publish" ? "published" : "retagged"} ${done.url}  ← ${job.canonical}  [${done.tags ?? done.tag_list}]`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
