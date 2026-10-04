---
title: Examples
description: Worked unify examples, from a slot override and a section layout to a blog feed and the generated post list on this site.
class: u-examples
---

# Examples

The patterns this site is built from. Each one is a few lines of ordinary HTML or Markdown. Complete example sites, with their source, are on [unify.fwdslsh.dev](https://unify.fwdslsh.dev/examples/).

## A page overriding one region

The layout declares a footer slot with its default content:

```html
<footer><slot name="footer"><p>© My Site</p></slot></footer>
```

A page replaces it with one attribute on a top-level element. Every other page keeps the default:

```html
<!doctype html>
<html>
  <head><title>Contact</title></head>
  <body>
    <h1>Contact</h1>
    <p slot="footer">© My Site · <a href="mailto:hi@example.com">email us</a></p>
  </body>
</html>
```

## A section with its own chrome

Drop `src/blog/posts/_layout.html` in place and every post gets it. The shared head, nav and footer come from the same fragments the root layout uses, so nothing is written twice:

```html
<!doctype html>
<html lang="en">
<head>
  <include src="/_includes/base/head.html"></include>
  <title>· fwdslsh</title>
  <meta property="og:type" content="article">
  <meta name="schema" content="BlogPosting">
</head>
<body>
  <include src="/_includes/base/nav.html"></include>
  <main id="main"><article class="post"><slot></slot></article></main>
  <include src="/_includes/base/footer.html"></include>
</body>
</html>
```

The `schema` meta in the layout declares every post a `BlogPosting` at once. That is what puts them in the feed and gives each one a JSON-LD block.

## A Markdown post

Pure Markdown with frontmatter. The date carries a time, because a feed entry needs an instant and unify won't invent one:

```markdown
---
title: How this site is built
description: Every page is plain HTML or Markdown, composed by unify at build time.
author: fwdslsh
date: 2026-10-02T09:00:00Z
---

# How this site is built

This site is built with unify, one of our own tools...
```

`author` has no special meaning to unify. It becomes `<meta name="author">`, and the post list below reads it back for the byline.

## A card with slots

A fragment declares named slots and a bare one:

```html
<!-- _includes/card.fragment.html -->
<article class="card">
  <span class="card-icon"><slot name="icon"></slot></span>
  <h3><slot name="title"></slot></h3>
  <slot></slot>
</article>
```

A non-empty include fills them. This works in Markdown too, as long as the include starts a line and has no blank lines inside:

```html
<include src="/_includes/card.fragment.html">
  <img slot="icon" src="/assets/icons/signpost.svg" alt="" width="20" height="20">
  <a slot="title" href="/rabit/index.html">rabit</a>
  <p>A small JSON manifest that tells agents what a site holds and where.</p>
</include>
```

## A generated post list

unify has no collections, so the blog index comes from a script. This site keeps its content in `site/` and the script in `scripts/`, with `unify.yaml` at the repository root holding the flags every command shares (a path in the file is relative to the file):

```yaml
source: site
pretty-urls: true
base-url: https://fwdslsh.dev/
canonical: auto
generate: scripts/gen.mjs
source-inventory: true
```

Before each build unify runs the script with an overlay directory and a context file. The context names a JSON inventory of every source page, so the script filters, sorts and writes a fragment without parsing a single file:

```js
const [, , , overlay, contextPath] = process.argv;
const context = JSON.parse(readFileSync(contextPath, "utf8"));
const inventory = JSON.parse(readFileSync(context.inputs.sourcePages, "utf8"));

const posts = inventory.pages
  .filter((p) => p.source.startsWith("blog/posts/"))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

const items = posts.map((p) => `<li><a href="${p.href}">${p.title}</a></li>`);
mkdirSync(join(overlay, "_generated"), { recursive: true });
writeFileSync(join(overlay, "_generated", "post-list.html"), `<ol>${items.join("")}</ol>`);
```

`blog/index.md` then includes `/_generated/post-list.html` like any other fragment. The overlay and the source tree share one path space, and the generated fragment never touches `site/`.

## Saving the flags

Run the build once with the flags you want and `--save-config`, and unify writes them into `src/unify.yaml` for every later command:

```sh
unify build --pretty-urls --base-url https://example.com/ --canonical auto --save-config
unify dev      # same flags, from the file
```

The full source of this site is on [GitHub](https://github.com/fwdslsh/website), and the [blog post](/blog/posts/how-this-site-is-built.html) walks through it.
