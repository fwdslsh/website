// Writes the blog's post lists. unify runs it before every build, dev rebuild and
// audit (`generate: _scripts/gen.mjs` in unify.yaml) and builds what it writes as
// if it were part of src/. It never touches src/ itself.
//
//   argv[3]  an empty overlay directory, added to the build
//   argv[4]  generator-context.json; with `source-inventory: true` in unify.yaml its
//            inputs.sourcePages names a list of every source page with its authored
//            title, description and date, so this script parses no frontmatter itself
//
// Output, included by the blog index and the home page:
//   _includes/post-list.html     every post, newest first
//   _includes/latest-posts.html  the three newest
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , , overlay, contextPath] = process.argv;
const context = JSON.parse(readFileSync(contextPath, "utf8"));
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
    return { href: p.href, title: p.title, description: p.description || "", date: p.date };
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
            (p.description ? `<p>${esc(p.description)}</p>` : "") +
            "</li>",
        )
        .join("\n") +
      "\n</ol>\n";

mkdirSync(join(overlay, "_includes"), { recursive: true });
writeFileSync(join(overlay, "_includes", "post-list.html"), list(posts));
writeFileSync(join(overlay, "_includes", "latest-posts.html"), list(posts.slice(0, 3)));
