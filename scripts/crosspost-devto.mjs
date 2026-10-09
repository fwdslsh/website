// Cross-posts this blog's posts to dev.to, run by CI after each deploy of main
// (.github/workflows/swa.yml). Every post in site/blog/posts/ that the dev.to
// account (the one DEVTO_API_KEY belongs to) does not yet carry is published
// there, with its canonical URL set to the post's address on this site, so
// search engines credit fwdslsh.dev and gen.mjs knows to leave the copy out of
// the blog's own list. A post already on dev.to — matched by canonical URL — is
// never posted twice, so the script is safe to run on every deploy.
//
//   node scripts/crosspost-devto.mjs            publish what is missing
//   node scripts/crosspost-devto.mjs --dry-run  list what would be published
//
// Without DEVTO_API_KEY it says so and does nothing (a fork's CI, a local run).
// A post dated in the future waits until a deploy after its date.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter, publishedUrl, toDevtoMarkdown } from "./syndication.mjs";

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
          published: true,
        },
      };
    })
    .filter(({ article, date }) => article.title && date && Date.parse(date) <= now.getTime())
    .map(({ article }) => article);
}

const norm = (url) => (url || "").replace(/\/+$/, "");

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
  const existing = new Set((await res.json()).map((a) => norm(a.canonical_url)));
  const missing = candidates.filter((a) => !existing.has(norm(a.canonical_url)));

  console.log(`crosspost-devto: ${candidates.length} posts, ${missing.length} not on dev.to yet`);
  for (const [i, article] of missing.entries()) {
    if (dryRun) {
      console.log(`  would publish ${article.canonical_url}  ${article.title}`);
      continue;
    }
    if (i > 0) await new Promise((r) => setTimeout(r, 5000)); // dev.to rate-limits article creation
    let post = await fetch(`${API}/articles`, { method: "POST", headers, body: JSON.stringify({ article }) });
    if (post.status === 429) {
      await new Promise((r) => setTimeout(r, 1000 * (Number(post.headers.get("retry-after")) || 30)));
      post = await fetch(`${API}/articles`, { method: "POST", headers, body: JSON.stringify({ article }) });
    }
    if (!post.ok) throw new Error(`crosspost-devto: publishing ${article.canonical_url} failed: HTTP ${post.status} ${await post.text()}`);
    console.log(`  published ${(await post.json()).url}  ← ${article.canonical_url}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
