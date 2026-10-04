---
title: How it works
description: The unify composition model in one page, including layouts, includes, slots, head merging, Markdown frontmatter and the build's checks.
class: u-concepts
---

# How it works

Five primitives and one rule for merging them. This is the short version; the [authoring rules](https://unify.fwdslsh.dev/docs/authoring-rules.html) are the complete one.

## Files

The source root is `site/` by default (or `src/`, or whatever `source:` names in `unify.yaml`). Every `.html` and `.md` file is a page, except a name ending `.fragment.html`, which ships as written for includes and `fetch`. Every other file copies through byte-for-byte to the same path. Anything whose name starts with `_` (`_layout.html`, `_includes/`, `_scripts/`) is read by the build but never published. `unify.yaml` and build scripts live at the project root, beside `package.json`; a path in the config is relative to the file. Write a layout's or fragment's asset links relative to the file and it previews straight from the folder, styled; unify rewrites them for every page.

Always link the real file: `/about.html`, never `/about/`. Under `--pretty-urls` the build rewrites it for you.

## Layouts

Every page is wrapped by the nearest `_layout.html`: its own folder, then each parent. A layout is a complete HTML page. Put one in `blog/` and every page under `blog/` gets that chrome instead. Layouts don't chain, so a section layout carries the shared nav and footer itself, usually through includes.

Pick a different layout with `data-layout="/path.html"` on the page's `<html>` or `<body>` (`layout: /path.html` in Markdown), or opt out with `data-layout="none"`.

## Includes

```html
<include src="/_includes/nav.html"></include>
```

Always with the closing tag. A path starting with `/` resolves from the source root; anything else is relative to the including file. Empty, it splices the file in verbatim. With content between the tags, it fills slots in a `*.fragment.html` that declares them:

```html
<include src="/_includes/card.fragment.html">
  <span slot="title">unify</span>
  <p>Everything else goes to the bare slot.</p>
</include>
```

No props, no attributes passed, no expressions. An include is not a component.

## Merging a page into its layout

Named fills go to named slots, everything else to the bare slot, else into `<main>`.

- **Named slots.** The layout writes `<slot name="footer">fallback</slot>`. A page fills it with `slot="footer"` on a top-level element, which replaces the slot, tag and all. Leave it out and the fallback ships.
- **Everything else** replaces the layout's bare `<slot></slot>`, or the children of its `<main>` if there is no slot. A page's own `<main>` wrapper is unwrapped first, so write complete documents.
- **Head.** The layout's head is the base. A page's `<title>` is joined in front of the layout's, so the layout writes the separator (`<title>· My Site</title>`) and a page writes only its own name. A page's `<meta>` replaces the layout's with the same `name` or `property`; everything else appends.
- **Root attributes.** On `<html>` and `<body>`, classes are merged. That's how this site highlights the current section: `class: about` in a page's frontmatter plus `body.about .nav-about` in the stylesheet.

## Markdown

Frontmatter is YAML. `title`, `description`, `layout`, `class`, `lang`, `dir` and `schema` have meaning; every other key becomes a `<meta>` tag with the value as written (`og:` keys emit `property=`). Headings get slug `id`s. A `# Heading` becomes the `<h1>`, and the page lands in the layout exactly like an HTML page's content.

`schema: Article`, `BlogPosting` or `WebPage` writes the page's JSON-LD from what it already declares. With `--base-url`, every `Article` or `BlogPosting` page with a timed `date` becomes an entry in `feed.xml`.

## Derived content

unify builds no collections, indexes or navigation. A post list is a script you own. Pass it with `generate: scripts/gen.mjs` in `unify.yaml` (or `--generate`) and unify runs it before every build, hands it an empty overlay directory to write pages and fragments into, and composes what it wrote as if it were in `src/`. With `--source-inventory` it also hands the script a list of every page with its authored title, description, date and metas, so the script parses nothing itself.

## The checks

```sh
unify build --dry-run --strict   # every problem in one pass, nothing written
unify audit --strict             # is the site complete? titles, descriptions, anchors, orphans
unify build --audit --strict     # compose once, publish only if the audit passes
```

A build is transactional. Content you wrote is never dropped silently: anything that would lose it is a located error, and a non-zero exit leaves the previous `dist/` untouched. `audit` answers a different question, whether the site is complete, with no score and no character counts.
