---
title: How this site is built
description: How fwdslsh.dev uses unify to share layouts, generate its post lists, and check the finished site before deployment.
author: fwdslsh
date: 2026-10-02T09:00:00Z
---

# How this site is built

A change to the navigation shouldn't require editing every page. This site keeps the shared markup in includes and uses [unify](https://unify.fwdslsh.dev/) to combine it with plain HTML and Markdown at build time. There's no framework or template language.

Below is how the layouts, pages, and generated lists fit together. You can follow along in the [website repository](https://github.com/fwdslsh/website).

## Layouts

unify starts in the page's folder and walks up until it finds an `_layout.html`. That file supplies the page's shared structure. This site has six layouts:

- `src/_layout.html` wraps most pages: the nav, `<main>` and the footer.
- `src/rabit/_layout.html`, `src/unify/_layout.html`, `src/akm/_layout.html`, and `src/gutterpress/_layout.html` add the appropriate section tabs to each tool's pages.
- `src/blog/posts/_layout.html` wraps each post in an `<article>` and marks it as a `BlogPosting`.

Layouts don't inherit from each other. Each one is a complete HTML document, but they pull in the same `<head>`, navigation, and footer. For example, this include adds the shared navigation:

```html
<include src="/_includes/base/nav.html"></include>
```

## Pages

Posts and other prose pages are Markdown. YAML frontmatter supplies the title, description, and publication date. It can also set a class on `<body>` when a page needs its own styles:

```yaml
---
title: How this site is built
description: fwdslsh.dev is plain HTML and Markdown composed by unify…
date: 2026-10-02T09:00:00Z
---
```

Pages such as the home page and the rabit overview use HTML for their designed layouts. In either format, the page contains its own content rather than another copy of the navigation and footer. unify inserts that content into the layout's `<main>`.

## The current page in the nav

Each section's pages carry a class on `<body>`. The about page uses `class: about` in frontmatter; the rabit layout uses `<body class="tools">`. unify merges that class into the finished page, where CSS highlights the matching navigation link. The selected section doesn't need to be tracked in JavaScript.

## Cards

Tool cards and rabit cards use the same `card.fragment.html`. Its named slots let each card supply an icon and title while keeping the surrounding markup in one place:

```html
<include src="/_includes/card.fragment.html">
  <img slot="icon" src="/assets/icons/signpost.svg" alt="" width="20" height="20">
  <a slot="title" href="/rabit/index.html">rabit</a>
  <p>A small JSON manifest that tells agents what a site holds and where.</p>
</include>
```

The include fills those slots and adds the description. Changing the fragment's markup updates every card that uses it.

## The post list

The blog index needs a list of posts, but unify doesn't decide which pages belong in a collection or how to sort them. Our small, dependency-free `src/_scripts/gen.mjs` handles that part.

With `source-inventory: true`, unify gives the script a list of source pages and their metadata. The script selects pages under `blog/posts/`, sorts them newest first, and writes includes for the blog index and home page. It doesn't need to parse frontmatter or maintain a separate list of published posts. The generated includes stay in unify's build overlay rather than being written back into `src/`.

The [Atom feed](/feed.xml) follows a different path. The posts layout declares `BlogPosting`, and each post has a publication date with a time. unify uses that metadata to generate `feed.xml` and the post's JSON-LD structured data. No separate feed script is needed.

## Build and verify

The same build generates `sitemap.xml` and each page's canonical link. These settings in `src/unify.yaml` supply the site address, enable readable URLs, and connect the post-list script to the source inventory:

```yaml
pretty-urls: true
base-url: https://fwdslsh.dev/
canonical: auto
generate: _scripts/gen.mjs
source-inventory: true
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
