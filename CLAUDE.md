# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

The **fwdslsh website** (https://fwdslsh.dev): fwdslsh is a group of indie devs who build open-source tools
and write up what they learn in the fwdslsh lab, on the premise that shared tools and knowledge improve things for
everyone ("a rising tide lifts all boats"; tagline "Slash a path to a better future"). Keep the tone plain and informal. The site has the tools (unify,
introduced under `src/unify/` with the full docs at https://unify.fwdslsh.dev/; rabit, documented under
`src/rabit/`; akm, introduced under `src/akm/` with the full docs at github.com/itlackey/akm; gutterpress, introduced under
`src/gutterpress/` with the full docs at github.com/dimm-city/gutterpress), a blog
members publish to, a members page, an about page, and reference pages under `src/references/`.

The site is also a reference unify site: it should use unify's own features the way unify's docs describe them,
and never work around them with wrappers or scripts.

## Development Commands

```bash
npm run dev             # unify dev: build + watch + serve on http://localhost:3000 with live reload
                        #   http://localhost:3000/_unify/ shows every audit finding by page
npm run build           # unify build --audit --strict → dist/, written only if the audit passes; the CI gate
npm run check           # the whole build and every check, writing nothing (--dry-run --strict)
npm run audit           # unify audit --strict: page-level findings (titles, h1s, metadata, links), writing nothing
npm run audit:external  # audit plus fetching every off-site link
npm test                # Playwright smoke tests against `npm run dev`
```

Every build flag lives in `src/unify.yaml` (`pretty-urls`, `base-url: https://fwdslsh.dev/`, `canonical: auto`,
`generate: _scripts/gen.mjs`, `source-inventory: true`), so every command above builds the same site. unify finds `src/` and `dist/` by
default. `unify.yaml` is never published. unify requires Node >= 22.12.0 (or Bun >= 1.2.0).

## How unify composes this site

**unify's own docs are authoritative**: read
[`docs/authoring-rules.md`](https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md) before
changing markup. How this site uses each feature:

- **Layouts** (nearest `_layout.html` wins; layouts don't chain, so each is a complete page):
  - `src/_layout.html`: most pages. `<main id="main"><slot></slot></main>` between nav and footer.
  - `src/rabit/_layout.html`, `src/unify/_layout.html`, `src/akm/_layout.html` and `src/gutterpress/_layout.html`: the tool sections. Each adds its tabs and
    `<body class="tools">`. unify's body classes are `u-*`, because `unify-*` is retired vocabulary unify rejects.
    Under 640px the tab row collapses into a `<details>` menu whose summary names the current tab from the
    body class (CSS `content`), the same no-script pattern as the top nav's mobile menu.
  - `src/blog/posts/_layout.html`: blog posts. Wraps the post in `<article class="post">` and declares
    `og:type article` and `<meta name="schema" content="BlogPosting">` for every post at once.
  - The shared `<head>`, nav and footer are `src/_includes/base/*.html`, included by all three layouts.
- **Pages**: prose pages are **pure Markdown** (`tools`, `members`, `about`, `blog/index`, `rabit/*`, `unify/*`, `akm/*` and
  `gutterpress/*` except the overviews, posts). Frontmatter sets `title`, `description` and `class`. Never wrap Markdown in HTML to style
  it: CSS styles what the Markdown produces (the `<h1>`, the paragraph after it as the intro, an `<h2>` per
  section). Designed pages are HTML documents (`index.html`, `rabit/index.html`, `unify/index.html`, `akm/index.html`, `gutterpress/index.html`, `404.html`) with their own
  `<head>` (title and description only) and no chrome.
- **Titles**: a page writes only its own title; the layout's `<title>· fwdslsh</title>` (or `· rabit · fwdslsh`, `· unify · fwdslsh`, `· akm · fwdslsh`, `· gutterpress · fwdslsh`)
  carries the suffix. The feed is titled from `og:site_name` ("fwdslsh", in `_includes/base/head.html`).
- **Current section**: the page's `<body>` class (`class: about` in frontmatter, `<body class="home">` in HTML,
  or the rabit layout's `tools`) merges into the layout's `<body>`. CSS in `nav.html` (`body.about .nav-about`)
  and `styles.css` (`body.rabit-spec .tab-spec`) highlights the link. No script.
- **Slotted includes**: `_includes/card.fragment.html` (tool and rabit cards) and `_includes/member.fragment.html`
  declare named slots; a non-empty `<include>` fills them with `slot=` on its top-level elements. Card icons are
  `<img>`s of `src/assets/icons/*.svg`.
- **Generated content**: `src/_scripts/gen.mjs` runs before every build, dev rebuild and audit (`--generate`).
  It reads the source page list unify hands it (`--source-inventory`: each page's authored title, description,
  date and frontmatter metas, from which it takes `author` for the byline), keeps the pages under `blog/posts/`,
  and writes `_includes/post-list.html` and
  `_includes/latest-posts.html` into unify's overlay; it never writes into `src/`.
- **Generated by unify**: `feed.xml` (Atom, from every page declaring `BlogPosting` with a timed `date`),
  `sitemap.xml`, a canonical link and a JSON-LD block on every page (`WebPage` from the root and rabit layouts).
- **Includes**: `<include src="/_includes/x.html"></include>`, always with the closing tag. Includes in Markdown
  start a line; a non-empty one must have no blank lines inside.
- **Underscore**: `_includes/`, `_scripts/`, `_layout.html` and any `_`-prefixed file (`_template.md`) never ship.
- **Links**: link the real file (`/rabit/docs.html`); `--pretty-urls` rewrites it to `/rabit/docs/`.
- **Everything else ships byte-for-byte**: `robots.txt`, `src/.well-known/` (the site's rabit burrow and warren),
  `staticwebapp.config.json`, `assets/`.
- Addresses fetched by JavaScript are relative to the script (`import('../vendor/…')`); unify rewrites only HTML.

## Site Structure

```
src/
├── _layout.html              # root layout
├── _includes/base/           # head.html, nav.html (scoped <style>), footer.html
├── _includes/                # card.fragment.html, member.fragment.html, tool-cards.html
├── _scripts/gen.mjs          # writes the post lists (run by unify via --generate)
├── index.html                # home (HTML)
├── tools.md, members.md, about.md
├── 404.html                  # noindex; Azure serves it via staticwebapp.config.json
├── blog/index.md             # the post list
├── blog/posts/               # _layout.html, _template.md, one .md per post
├── references/model-ledger.md # full-width interactive benchmark ledger
├── rabit/                    # _layout.html, index.html, getting-started.md, docs.md, examples.md
├── unify/                    # _layout.html, index.html, getting-started.md, concepts.md, examples.md
├── akm/                      # same shape; full docs live in the akm repo
├── gutterpress/              # same shape; full docs live in the gutterpress repo
├── .well-known/              # burrow.json and warren.json (rabit v0.4.0; validate against rabit's schemas)
├── assets/                   # styles.css (the one stylesheet), og.png (1200×630), icons/, js/main.js, vendor/
├── robots.txt
├── staticwebapp.config.json  # Azure Static Web Apps headers and 404
└── unify.yaml                # saved CLI flags (never shipped)
```

Deployment: `.github/workflows/swa.yml` (Azure Static Web Apps; `npm run build` audits before it writes `dist/`).

## Publishing a blog post

1. Copy `src/blog/posts/_template.md` to `src/blog/posts/<slug>.md` and fill in the frontmatter. Give `date` a
   time (`2026-10-02T09:00:00Z`): the generator refuses a post without one, and the feed leaves out a date with
   no time.
2. `npm run check`. The post appears in the blog index, on the home page and in `/feed.xml` automatically.

## Adding a member

Add an `<include src="/_includes/member.fragment.html">` block to `src/members.md`, filling `avatar`, `name` and
a bio paragraph, like the existing one.

## Conventions

- Component styles live with the component (the `<style>` in `nav.html`, scoped under `.site-nav`); everything
  else is in `src/assets/styles.css`. Don't duplicate rules across both.
- Every page has its own `<title>`, `<meta name="description">` (the layouts carry none, so a missing one is an
  audit finding), and exactly one `<h1>` inside `<main>`.
- Type: Protest Revolution for `<h1>` only, JetBrains Mono for h2–h6, nav and code, Inter for body text.
- `main.js` is progressive enhancement only: a copy button and syntax highlighting on every `main pre`.
- Icons: Lucide (stroke) for site UI, Simple Icons (fill) for brand marks; top-bar icons are 20px with an
  `aria-label` on the link. Copy path data from the icon packages, never retype it.
- Designs must work from 320px wide up.
- When rabit's spec changes, update `src/rabit/*` and `src/.well-known/*.json`; `scripts/check-version-sync.sh`
  compares them against a sibling `../rabit` checkout.

## Testing

- `npm run build` must exit 0 (it audits with `--strict`); `npm run check` is the same gate without writing.
- `npm test` covers same-site links on every page, one `<nav>`/`<h1>` per page, no console errors, the top-bar
  icons, the tools menu (mouse and keyboard), the current-section highlight, the generated post list and the
  copy buttons.
