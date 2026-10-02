// Writes the blog's post lists. unify runs it before every build, dev rebuild and
// audit (`generate: _scripts/gen.mjs` in unify.yaml) and builds what it writes as
// if it were part of src/. It never touches src/ itself.
//
//   argv[2]  the source root (src/)
//   argv[3]  an empty overlay directory, added to the build
//
// Output, included by the blog index and the home page:
//   _includes/post-list.html     every post, newest first
//   _includes/latest-posts.html  the three newest
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [, , sourceRoot, overlay] = process.argv;
const POSTS = join(sourceRoot, "blog", "posts");

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s = "") => esc(s).replace(/"/g, "&quot;");

// Enough YAML for flat `key: value` frontmatter, which is all a post uses.
function frontmatter(text) {
  const block = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  for (const line of block ? block[1].split(/\r?\n/) : []) {
    const kv = line.match(/^([\w:-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^"([\s\S]*)"$/, "$1");
  }
  return data;
}

const posts = readdirSync(POSTS)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((file) => {
    const fm = frontmatter(readFileSync(join(POSTS, file), "utf8"));
    if (!fm.title || !fm.date) {
      // A located failure: unify stops the build and publishes nothing.
      console.error(`gen.mjs: blog/posts/${file} needs a title and a date in its frontmatter`);
      process.exit(1);
    }
    return { slug: file.slice(0, -3), title: fm.title, description: fm.description || "", date: fm.date };
  })
  // Newest first; ties broken by filename so every run agrees.
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date) || a.slug.localeCompare(b.slug));

const list = (items) =>
  items.length === 0
    ? '<p class="empty-state">No posts yet. The first ones are on the way.</p>\n'
    : '<ol class="post-list">\n' +
      items
        .map(
          (p) =>
            `  <li><time datetime="${escAttr(p.date)}">${esc(p.date.slice(0, 10))}</time>` +
            `<a href="/blog/posts/${escAttr(p.slug)}.html">${esc(p.title)}</a>` +
            (p.description ? `<p>${esc(p.description)}</p>` : "") +
            "</li>",
        )
        .join("\n") +
      "\n</ol>\n";

mkdirSync(join(overlay, "_includes"), { recursive: true });
writeFileSync(join(overlay, "_includes", "post-list.html"), list(posts));
writeFileSync(join(overlay, "_includes", "latest-posts.html"), list(posts.slice(0, 3)));
