// Syndication helpers shared by gen.mjs (articles pulled in from dev.to and
// Medium) and crosspost-devto.mjs (this blog's posts pushed out to dev.to).
// Pure functions over text and JSON; the network calls take `fetch` as an
// argument so the tests can hand in recorded responses.
import { readFileSync } from "node:fs";

/** The accounts whose articles the blog lists beside its own: scripts/external-articles.json. */
export function loadAccounts(path) {
  const config = JSON.parse(readFileSync(path, "utf8"));
  const list = (v) => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);
  return { devto: list(config.devto), medium: list(config.medium) };
}

const same = (url, base) => typeof url === "string" && base && url.startsWith(base);

/** dev.to's /api/articles?username= response → list items. A post whose canonical URL is on this site is our own cross-post, and is left out. */
export function parseDevto(articles, siteBase) {
  return articles
    .filter((a) => a && a.url && a.title && a.published_at && !same(a.canonical_url, siteBase))
    .map((a) => ({
      href: a.url,
      title: a.title,
      description: a.description || "",
      date: new Date(a.published_at).toISOString(),
      author: a.user?.name || a.user?.username || "",
      source: "dev.to",
    }));
}

const decode = (s) =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
    .trim();
const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};
const firstSentence = (html) => {
  const text = html.replace(/<figure[\s\S]*?<\/figure>/g, "").replace(/<h\d[\s\S]*?<\/h\d>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const sentence = text.split(/(?<=[.!?])\s/)[0] || "";
  return sentence.length > 240 ? `${sentence.slice(0, 237).replace(/\s+\S*$/, "")}…` : sentence;
};

/** A Medium RSS feed (medium.com/feed/@name) → list items. The tracking query on each link is dropped. */
export function parseMediumRss(xml, siteBase) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({
      href: tag(item, "link").split("?")[0],
      title: tag(item, "title"),
      description: firstSentence(tag(item, "description") || tag(item, "content:encoded")),
      date: tag(item, "pubDate") ? new Date(tag(item, "pubDate")).toISOString() : "",
      author: tag(item, "dc:creator"),
      source: "Medium",
    }))
    .filter((p) => p.href && p.title && p.date && !same(p.href, siteBase));
}

/**
 * Every configured account's articles. A source that cannot be reached is
 * reported and skipped, so an outage on dev.to or Medium never stops a build;
 * the list then shows this site's own posts and whatever did arrive. Each
 * source's outcome goes to stdout, which unify passes through to the build
 * log; a generator's stderr is shown only when it fails.
 */
export async function fetchExternal(accounts, { fetch = globalThis.fetch, siteBase = null, timeoutMs = 8000, log = console.log } = {}) {
  const get = async (url, as) => {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), headers: { accept: as === "json" ? "application/json" : "application/rss+xml" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return as === "json" ? res.json() : res.text();
  };
  const jobs = [
    ...accounts.devto.map((name) => [`dev.to/${name}`, () => get(`https://dev.to/api/articles?username=${encodeURIComponent(name)}&per_page=100`, "json").then((j) => parseDevto(j, siteBase))]),
    ...accounts.medium.map((name) => [`medium.com/@${name}`, () => get(`https://medium.com/feed/@${encodeURIComponent(name)}`, "text").then((x) => parseMediumRss(x, siteBase))]),
  ];
  const results = await Promise.all(jobs.map(([, run]) => run().then((items) => ({ items }), (error) => ({ items: [], error }))));
  results.forEach(({ items, error }, i) =>
    log(error ? `gen.mjs: skipped ${jobs[i][0]} (${error.message}); the list shows the other sources` : `gen.mjs: ${jobs[i][0]}: ${items.length} articles listed`),
  );
  return results.flatMap((r) => r.items);
}

/** `---` frontmatter of a post: the scalar keys it uses, unquoted. */
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (/^".*"$/.test(value)) value = JSON.parse(value);
    else if (/^'.*'$/.test(value)) value = value.slice(1, -1).replace(/''/g, "'");
    data[kv[1]] = value;
  }
  return { data, body: text.slice(m[0].length) };
}

/**
 * A post's `tags:` line (`tags: webdev, html`) as dev.to accepts them: at most
 * four, lowercase letters and digits only.
 */
export function devtoTags(value) {
  const tags = (value || "").split(",").map((t) => t.toLowerCase().replace(/[^a-z0-9]/g, "")).filter(Boolean);
  return [...new Set(tags)].slice(0, 4);
}

/** The published address of a page's source path, as unify writes it. */
export function publishedUrl(source, siteBase, prettyUrls) {
  let path = source.replace(/\.(md|html)$/, ".html");
  if (prettyUrls) path = path.endsWith("index.html") ? path.slice(0, -"index.html".length) : path.replace(/\.html$/, "/");
  return new URL(path.replace(/^\//, ""), siteBase).href;
}

/**
 * A post's Markdown as dev.to should show it: the leading `# Title` is
 * dropped (dev.to prints the title itself), and every root-relative link or
 * image outside code points at its published address on this site.
 */
export function toDevtoMarkdown(body, siteBase, prettyUrls) {
  const rewrite = (path) => {
    const [p, suffix = ""] = path.split(/(?=[#?])/);
    return /\.(md|html)$/.test(p) || p.endsWith("/") ? publishedUrl(p, siteBase, prettyUrls) + suffix : new URL(p.slice(1), siteBase).href + suffix;
  };
  let fence = null;
  const lines = body.replace(/^\s*#\s+.*\r?\n+/, "").split("\n");
  return lines
    .map((line) => {
      const marker = line.match(/^\s*(`{3,}|~{3,})/);
      if (marker) {
        if (!fence) fence = marker[1];
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
        return line;
      }
      if (fence) return line;
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) =>
          i % 2
            ? part
            : part
                .replace(/(\]\()(\/[^)\s]*)/g, (_, open, path) => open + rewrite(path))
                .replace(/(\s(?:src|href)=")(\/[^"]*)/g, (_, open, path) => open + rewrite(path)),
        )
        .join("");
    })
    .join("\n");
}
