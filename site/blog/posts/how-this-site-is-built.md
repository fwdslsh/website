---
title: How this site is built
description: How fwdslsh.dev uses unify to share layouts, generate its post lists, and check the finished site before deployment.
author: fwdslsh
date: 2026-10-02T09:00:00Z
tags: webdev, html, staticsite, opensource
---

# How this site is built

A change to the navigation shouldn't require editing every page. This site keeps the shared markup in includes and uses [unify](https://unify.fwdslsh.dev/) to combine it with plain HTML and Markdown at build time. There's no framework or template language.

Below is how the layouts, pages, and generated lists fit together. You can follow along in the [website repository](https://github.com/fwdslsh/website).

## Layouts

unify starts in the page's folder and walks up until it finds an `_layout.html`. That file supplies the page's shared structure. This site has six layouts:

- `site/_layout.html` wraps most pages: the nav, `<main>` and the footer.
- `site/unify/_layout.html`, `site/fhold/_layout.html`, `site/akm/_layout.html`, and `site/gutterpress/_layout.html` add the appropriate section tabs to each tool's pages.
- `site/blog/posts/_layout.html` marks each post as a `BlogPosting` and adds a link back to the post list.

Layouts don't inherit from each other. Each one is a complete HTML document, but they pull in the same `<head>`, navigation, and footer. For example, this include adds the shared navigation:

```html
<include src="/_includes/nav.html"></include>
```

## The look

The site doesn't carry a stylesheet of its own design. `unify.yaml` says `extends: node_modules/unify-docs-template`: unify reads that template's files as the last place to find anything, so its stylesheet, theme and All-pages directory build into this site while every file here wins at the same path. unify.fwdslsh.dev and akm.fwdslsh.dev extend the same template, which is why the three sites look like one family. What only this site has, the tools dropdown, the section tabs, the post list and the member cards, is in `site/assets/site.css`, and both stylesheets are linked from `site/_includes/head.html`.

## Pages

Posts and other prose pages are Markdown. YAML frontmatter supplies the title, description, and publication date. It can also set a class on `<body>` when a page needs its own styles:

```yaml
---
title: How this site is built
description: fwdslsh.dev is plain HTML and Markdown composed by unify…
date: 2026-10-02T09:00:00Z
---
```

Pages such as the home page and the unify overview use HTML for their designed layouts. In either format, the page contains its own content rather than another copy of the navigation and footer. unify inserts that content into the layout's `<main>`.

## The current page in the nav

Each section's pages carry a class on `<body>`. The about page uses `class: about` in frontmatter; the unify layout uses `<body class="tools">`. unify merges that class into the finished page, where CSS highlights the matching navigation link. The selected section doesn't need to be tracked in JavaScript.

## Cards

Tool cards and feature cards use the same `card.fragment.html`. Its named slots let each card supply an icon and title while keeping the surrounding markup in one place:

```html
<include src="/_includes/card.fragment.html">
  <img slot="icon" src="/assets/icons/library.svg" alt="" width="20" height="20">
  <a slot="title" href="/akm/index.html">akm</a>
  <p>One library of skills, scripts and knowledge for any coding agent.</p>
</include>
```

The include fills those slots and adds the description. Changing the fragment's markup updates every card that uses it.

## The post list

The blog index needs a list of posts, but unify doesn't decide which pages belong in a collection or how to sort them. Our small, dependency-free `scripts/gen.mjs` handles that part. It lives beside the site, not inside it: unify runs a generator from anywhere, and build tooling isn't content.

unify gives every generator a list of source pages and their metadata. The script selects pages under `blog/posts/`, sorts them newest first, and writes includes for the blog index and home page. It doesn't need to parse frontmatter or maintain a separate list of published posts. The generated includes stay in unify's build overlay rather than being written back into `site/`.

The shared fragments live in `site/_includes/`, next to the layouts. Build tooling that isn't content, the generator and the config, sits at the repository root.

The [Atom feed](/feed.xml) follows a different path. The posts layout declares `BlogPosting`, and each post has a publication date with a time. unify uses that metadata to generate `feed.xml` and the post's JSON-LD structured data. No separate feed script is needed.

## Build and verify

The same build generates `sitemap.xml` and each page's canonical link. `unify.yaml` at the repository root keeps only what differs from unify's defaults (a path in the file is relative to the file): the site address, readable URLs, the post-list script, the template the look comes from, and the page catalog its All-pages directory reads:

```yaml
base-url: https://fwdslsh.dev/
pretty-urls: true
generate: scripts/gen.mjs
extends: node_modules/unify-docs-template
catalog: true
```

Before committing a content change, run the dry-run check:

```sh
npm run check
```

That command runs `unify build --dry-run --strict`, so you can check the composed pages without writing output. To produce the site, run:

```sh
npm run build
```

The build uses `unify build --clean --audit --strict`. It checks the composed pages for titles, descriptions, a single `<h1>`, working links, and other audit findings before writing `dist/`. CI runs this audited build before uploading the result to Azure Static Web Apps.

After a change, check the affected page and its navigation in the browser. For a new post, also confirm that it appears in the blog index, home-page list, and feed. A successful build checks the markup; those final checks confirm that the change reached the places readers use.
