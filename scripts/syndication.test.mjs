// node --test scripts/ — the syndication helpers, against recorded responses.
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { articles, siteSettings } from "./crosspost-devto.mjs";
import { devtoTags, fetchExternal, parseDevto, parseFrontmatter, parseMediumRss, publishedUrl, toDevtoMarkdown } from "./syndication.mjs";

const SITE = "https://fwdslsh.dev/";

test("dev.to articles become list items, and this site's own cross-posts are left out", () => {
  const items = parseDevto(
    [
      { title: "Written on dev.to", description: "A note.", url: "https://dev.to/fwdslsh/written-1abc", canonical_url: "https://dev.to/fwdslsh/written-1abc", published_at: "2026-10-05T12:00:00Z", user: { name: "fwdslsh", username: "fwdslsh" } },
      { title: "How this site is built", url: "https://dev.to/fwdslsh/how-2def", canonical_url: "https://fwdslsh.dev/blog/posts/how-this-site-is-built/", published_at: "2026-10-02T09:00:00Z", user: { username: "fwdslsh" } },
    ],
    SITE,
  );
  assert.deepEqual(items, [
    { href: "https://dev.to/fwdslsh/written-1abc", title: "Written on dev.to", description: "A note.", date: "2026-10-05T12:00:00.000Z", author: "fwdslsh", source: "dev.to" },
  ]);
});

test("a Medium feed becomes list items: CDATA titles, links without the tracking query, a first-sentence description", () => {
  const xml = `<rss><channel><item><title><![CDATA[Lab notes &amp; more]]></title><link>https://medium.com/@someone/lab-notes-123?source=rss-abc</link><dc:creator><![CDATA[Some One]]></dc:creator><pubDate>Mon, 05 Oct 2026 10:00:00 GMT</pubDate><content:encoded><![CDATA[<h3>Lab notes</h3><p>First sentence here. Second one.</p>]]></content:encoded></item></channel></rss>`;
  assert.deepEqual(parseMediumRss(xml, SITE), [
    { href: "https://medium.com/@someone/lab-notes-123", title: "Lab notes & more", description: "First sentence here.", date: "2026-10-05T10:00:00.000Z", author: "Some One", source: "Medium" },
  ]);
});

test("an unreachable source is reported and skipped; the others still arrive", async () => {
  const lines = [];
  const fetch = async (url) => {
    if (url.includes("medium.com")) throw new Error("connect refused");
    return { ok: true, json: async () => [{ title: "T", url: "https://dev.to/a/t", published_at: "2026-10-01T00:00:00Z", user: { name: "A" } }] };
  };
  const items = await fetchExternal({ devto: ["a"], medium: ["b"] }, { fetch, siteBase: SITE, log: (m) => lines.push(m) });
  assert.equal(items.length, 1);
  assert.deepEqual(lines, ["gen.mjs: dev.to/a: 1 articles listed", "gen.mjs: skipped medium.com/@b (connect refused); the list shows the other sources"]);
});

test("frontmatter scalars are read with their quotes removed", () => {
  const { data, body } = parseFrontmatter('---\ntitle: "A: quoted title"\ndate: 2026-10-02T09:00:00Z\nauthor: fwdslsh\n---\n\n# A\n');
  assert.deepEqual(data, { title: "A: quoted title", date: "2026-10-02T09:00:00Z", author: "fwdslsh" });
  assert.equal(body, "\n# A\n");
});

test("a post's Markdown for dev.to: no leading title, root links made absolute at their pretty address, code untouched", () => {
  const md = "# Title\n\nSee [concepts](/unify/concepts.html#slots) and the [feed](/feed.xml).\n\n```html\n<a href=\"/x.html\">[y](/y.html)</a>\n```\n\nInline `[z](/z.html)` stays, ![logo](/assets/logo.png) moves.\n";
  assert.equal(
    toDevtoMarkdown(md, SITE, true),
    "See [concepts](https://fwdslsh.dev/unify/concepts/#slots) and the [feed](https://fwdslsh.dev/feed.xml).\n\n```html\n<a href=\"/x.html\">[y](/y.html)</a>\n```\n\nInline `[z](/z.html)` stays, ![logo](https://fwdslsh.dev/assets/logo.png) moves.\n",
  );
  assert.equal(publishedUrl("blog/posts/a.md", SITE, false), "https://fwdslsh.dev/blog/posts/a.html");
});

test("cross-post candidates: published posts only, with their canonical address on this site", () => {
  const dir = mkdtempSync(join(tmpdir(), "crosspost-"));
  try {
    writeFileSync(join(dir, "_template.md"), "---\ntitle: T\ndate: 2026-01-01T00:00:00Z\n---\n# T\n");
    writeFileSync(join(dir, "old.md"), "---\ntitle: Old\ndescription: d\ndate: 2026-10-01T00:00:00Z\ntags: webdev, HTML\n---\n# Old\n\nBody.\n");
    writeFileSync(join(dir, "future.md"), "---\ntitle: Future\ndate: 2099-01-01T00:00:00Z\n---\n# Future\n");
    const { siteBase, prettyUrls } = siteSettings("base-url: https://fwdslsh.dev/\npretty-urls: true\n");
    assert.deepEqual(articles({ postsDir: dir, siteBase, prettyUrls, now: new Date("2026-10-09T00:00:00Z") }), [
      { title: "Old", description: "d", body_markdown: "Body.\n", canonical_url: "https://fwdslsh.dev/blog/posts/old/", tags: ["webdev", "html"], published: true },
    ]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("a tags line becomes dev.to tags: four at most, lowercase letters and digits, no repeats", () => {
  assert.deepEqual(devtoTags("Static-Sites, html, HTML, web dev, ai, extra"), ["staticsites", "html", "webdev", "ai"]);
  assert.deepEqual(devtoTags(undefined), []);
});
