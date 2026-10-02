---
title: How this site is built
description: fwdslsh.dev is plain HTML and Markdown composed by unify, with one small script for the post list. Here is every piece.
author: fwdslsh
date: 2026-10-02T09:00:00Z
---

# How this site is built

This site is built with [unify](https://unify.fwdslsh.dev/), one of our own tools. There's no framework and no template language: every page is a plain HTML or Markdown file, and unify composes them at build time. Here's how the pieces fit, in case you want to build a site the same way. The [source is on GitHub](https://github.com/fwdslsh/website).

## Layouts

Every page is wrapped by the nearest `_layout.html`, found by walking up from the page's folder. This site has three:

- `src/_layout.html` wraps most pages: the nav, `<main>` and the footer.
- `src/rabit/_layout.html` adds the rabit tabs to every page in `rabit/`.
- `src/blog/posts/_layout.html` wraps each post in an `<article>` and marks it as a `BlogPosting`.

Layouts don't inherit from each other, so the shared parts (the `<head>`, nav and footer) are includes that each layout pulls in:

```html
<include src="/_includes/base/nav.html"></include>
```

## Pages

Prose pages, like this post, are Markdown. Frontmatter gives the page its title, description and a class for its `<body>`:

```yaml
---
title: How this site is built
description: fwdslsh.dev is plain HTML and Markdown composed by unify…
date: 2026-10-02T09:00:00Z
---
```

Pages with a designed layout, like the home page and the rabit overview, are HTML. Neither kind repeats any chrome; unify puts the page's content into the layout's `<main>`.

## The current page in the nav

Each section's pages carry a class on `<body>`: `class: about` in frontmatter, or `<body class="tools">` in the rabit layout. unify merges it into the layout's `<body>`, and one CSS rule highlights the matching nav link. No script needed.

## Cards

The tool cards and the rabit cards are one fragment, `card.fragment.html`, with named slots for an icon and a title. Each card fills them:

```html
<include src="/_includes/card.fragment.html">
  <img slot="icon" src="/assets/icons/signpost.svg" alt="" width="20" height="20">
  <a slot="title" href="/rabit/index.html">rabit</a>
  <p>A small JSON manifest that tells agents what a site holds and where.</p>
</include>
```

Change the card's markup once and every card follows.

## The post list

unify doesn't build collections. A list of posts is derived content, and derived content comes from a script you own. Ours is `src/_scripts/gen.mjs`, about 60 lines with no dependencies. unify runs it before every build. It reads each post's frontmatter and writes the list as an include, which the blog index and the home page pull in.

The [Atom feed](/feed.xml) needs no script at all. Because the posts layout declares `BlogPosting` and every post has a `date`, unify writes `feed.xml` itself, along with each post's JSON-LD.

## The rest

The build also writes `sitemap.xml` and a canonical link on every page from the site's address, saved in `src/unify.yaml`:

```yaml
pretty-urls: true
base-url: https://fwdslsh.dev/
canonical: auto
generate: _scripts/gen.mjs
```

Before anything deploys, two commands have to pass. `unify build --dry-run --strict` runs the whole build and every check without writing anything. `unify audit --strict` checks every page for a title, a description, one `<h1>`, working links and more. If either fails, nothing ships.
