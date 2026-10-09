---
title: Getting started
description: Install unify, scaffold a starter site and publish it, in three steps and two commands.
class: t-start
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

`init` writes a complete starter into `site/`: a layout, a nav fragment, a home page, a 404, a stylesheet with a theme file of custom properties you edit, and ready-to-copy example pages under `site/_examples/`, with `README.md` (an existing one is kept), `DEPLOY.md` and `unify.yaml` beside it. Pass a template name for a different start: `unify init blog`, `docs` or `portfolio`. A template can also be a directory, a git repository or any npm package, and `unify update` later brings its next version in, never overwriting the files `unify.yaml` keeps — see [Templates](/unify/templates.html).

## 2. Edit and preview

```sh
unify dev
```

Open <http://localhost:3000>. Edit anything under `site/`, save, and the browser reloads. While it runs, <http://localhost:3000/_unify/> lists every finding the audit would report, page by page.

The two files to look at first:

- `site/_layout.html` is the site chrome, a complete HTML page with `<main><slot></slot></main>` where pages land. Open it straight from the folder and it shows with its styles, because its stylesheet link is relative to the file.
- `site/index.html` is a page. It has its own `<head>` with a `<title>` and a description, and its body is the content. It never mentions the layout: the nearest `_layout.html` applies on its own.

Add a page by adding a file, and the scaffold ships ready-to-copy ones under `site/_examples/`, which never publish: copy `about.md` to `site/about.md`, edit it, and link it from `site/_includes/nav.html`. A Markdown page with a `title` and `description` in its frontmatter becomes `/about.html`, wrapped in the same layout. `unify update` refreshes the template's own files and never touches a file you copied. To change the look, edit `site/assets/theme.css`: the scaffolded `unify.yaml` keeps it, so an update never overwrites it either.

## 3. Check and publish

```sh
unify build --dry-run --strict   # the whole build and every check, writing nothing
unify build                      # write dist/
```

Exit 0 means `dist/` is the complete site. Anything else means nothing was published and the previous `dist/` is untouched. Upload `dist/` to any static host.

For a site with an address, add the flags once and keep them in `unify.yaml` at the project root so every command shares them:

```sh
unify build --pretty-urls --base-url https://example.com/ --save-config
```

`--pretty-urls` turns `/about.html` into `/about/` in the output (you still link the real file). `--base-url` makes share metadata absolute and switches on `sitemap.xml` and the feed.

## Where to go next

[How it works](/unify/concepts.html) covers the composition rules on one page, and [Examples](/unify/examples.html) shows the patterns this site uses. The complete documentation, including the CLI reference and worked example sites, is at [unify.fwdslsh.dev](https://unify.fwdslsh.dev/).
