---
title: Getting started
description: Install unify, scaffold a starter site and publish it, in three steps and two commands.
class: u-start
---

# Getting started

From nothing to a published site in three steps.

## 1. Install and scaffold

unify runs on Node 22.12+ or Bun 1.2+ (standalone binaries are on the [releases page](https://github.com/fwdslsh/unify/releases)):

```sh
npm install -g @fwdslsh/unify
mkdir my-site && cd my-site
unify init
```

`init` writes a complete starter into `src/`: a layout, a nav fragment, an HTML page, a Markdown page, a 404 and a stylesheet. Pass a template name for a different start: `unify init blog`, `docs` or `portfolio`.

## 2. Edit and preview

```sh
unify dev
```

Open <http://localhost:3000>. Edit anything under `src/`, save, and the browser reloads. While it runs, <http://localhost:3000/_unify/> lists every finding the audit would report, page by page.

The two files to look at first:

- `src/_layout.html` is the site chrome, a complete HTML page with `<main><slot></slot></main>` where pages land.
- `src/index.html` is a page. It has its own `<head>` with a `<title>` and a description, and its body is the content. It never mentions the layout: the nearest `_layout.html` applies on its own.

Add a page by adding a file. `src/about.md` with a `title` and `description` in its frontmatter becomes `/about.html`, wrapped in the same layout.

## 3. Check and publish

```sh
unify build --dry-run --strict   # the whole build and every check, writing nothing
unify build                      # write dist/
```

Exit 0 means `dist/` is the complete site. Anything else means nothing was published and the previous `dist/` is untouched. Upload `dist/` to any static host.

For a site with an address, add the flags once and keep them in `src/unify.yaml` so every command shares them:

```sh
unify build --pretty-urls --base-url https://example.com/ --canonical auto --save-config
```

`--pretty-urls` turns `/about.html` into `/about/` in the output (you still link the real file). `--base-url` makes share metadata absolute and switches on `sitemap.xml` and the feed.

## Where to go next

[How it works](/unify/concepts.html) covers the composition rules on one page, and [Examples](/unify/examples.html) shows the patterns this site uses. The complete documentation, including the CLI reference and worked example sites, is at [unify.fwdslsh.dev](https://unify.fwdslsh.dev/).
