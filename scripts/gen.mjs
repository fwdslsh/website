// Writes the blog's post lists. unify runs it before every build, dev rebuild and
// audit (`generate: scripts/gen.mjs` in unify.yaml) and builds what it writes as
// if it were part of site/. It never touches site/ itself.
//
//   argv[3]  an empty overlay directory, added to the build
//   argv[4]  generator-context.json; its inputs.sourcePages (on by default) names a list of every source page with its authored
//            title, description, date and metas (author is one), so this script
//            parses no frontmatter itself
//
// Output, included by the blog index and the home page:
//   _generated/post-list.html     every post, newest first
//   _generated/latest-posts.html  the three newest
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , , overlay, contextPath] = process.argv;
const context = JSON.parse(readFileSync(contextPath, "utf8"));
if (!context.inputs.sourcePages) {
  throw new Error("gen.mjs reads the source page list: do not set `source-inventory: false` in unify.yaml");
}
const inventory = JSON.parse(readFileSync(context.inputs.sourcePages, "utf8"));

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s = "") => esc(s).replace(/"/g, "&quot;");

const posts = inventory.pages
  .filter((p) => p.source.startsWith("blog/posts/"))
  .map((p) => {
    if (!p.title || !p.date) {
      // A located failure: unify stops the build and publishes nothing.
      console.error(`gen.mjs: ${p.source} needs a title and a date in its frontmatter`);
      process.exit(1);
    }
    // `meta` holds the post's own frontmatter metas; `author` is one of them.
    const author = p.meta.find((m) => m.name === "author")?.content.trim() || "";
    return { href: p.href, title: p.title, description: p.description || "", date: p.date, author };
  })
  // Newest first; ties broken by address so every run agrees.
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.href.localeCompare(b.href));

const list = (items) =>
  items.length === 0
    ? '<p class="empty-state">No posts yet. The first ones are on the way.</p>\n'
    : '<ol class="post-list">\n' +
      items
        .map(
          (p) =>
            `  <li><time datetime="${escAttr(p.date)}">${esc(p.date.slice(0, 10))}</time>` +
            `<a href="${escAttr(p.href)}">${esc(p.title)}</a>` +
            (p.author ? `<p class="post-by">by ${esc(p.author)}</p>` : "") +
            (p.description ? `<p>${esc(p.description)}</p>` : "") +
            "</li>",
        )
        .join("\n") +
      "\n</ol>\n";

mkdirSync(join(overlay, "_generated"), { recursive: true });
writeFileSync(join(overlay, "_generated", "post-list.html"), list(posts));
writeFileSync(join(overlay, "_generated", "latest-posts.html"), list(posts.slice(0, 3)));
