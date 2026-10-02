# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

The **fwdslsh website** (https://fwdslsh.dev): fwdslsh is a collective of independent developers building open tools
for a web that AI agents and people both use. The site presents the collective, its members, and the three tools
"supported by fwdslsh": unify (linked to https://unify.fwdslsh.dev/, new tab), rabit (documented under `src/rabit/`)
and akm (github.com/itlackey/akm, a member's repo). It is built with unify: plain HTML and Markdown composed at build
time, no framework, minimal JavaScript. The support and governance rules on the site are marked Draft; fwdslsh is
one member today (itlackey). Background research and the messaging framework are in `drafts/`.

## Development Commands

```bash
npm run dev             # unify dev: build + watch + serve on http://localhost:3000 with live reload
npm run build           # unify build → dist/
npm run check           # the whole build and every check, writing nothing (--dry-run --strict); CI gate
npm run audit           # unify audit --strict: page-level findings (titles, h1s, metadata, links); CI gate
npm run audit:external  # audit plus fetching every off-site link
npm test                # Playwright smoke tests against `npm run dev`
```

Shared build flags (`--pretty-urls`, `--base-url https://fwdslsh.dev/`, `--canonical auto`) are saved in
`src/unify.yaml`, so every command above builds the same site. `unify.yaml` is never published. unify requires
Node >= 22.12.0 (or Bun >= 1.2.0).

## How unify composes this site

**unify's own docs are authoritative** — read
[`docs/authoring-rules.md`](https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md) before
changing markup. The short version:

- **Layout**: every page is wrapped by the nearest `_layout.html` (here, `src/_layout.html` for every page).
  The page says nothing; `data-layout="/path.html"` on a page's `<html>` picks a different one. Layouts don't chain.
- **Main**: page body content replaces the children of the layout's `<main>`. A page's own `<main>` is unwrapped.
- **Slots**: a layout may declare `<slot name="x">fallback</slot>`; a page fills it with `slot="x"` on a
  top-level element. (This site's layout has none.)
- **Head**: the layout's `<head>` is the base. A page writes only its own `<title>` (the layout's
  `<title>· fwdslsh</title>` carries the separator); page `<meta>` replaces the layout's same-name meta; page
  CSS/scripts append.
- **Includes**: `<include src="/_includes/base/nav.html"></include>`, always with the closing tag; resolved at
  build time.
- **Underscore**: `_includes/`, `_layout.html`, and any `_`-prefixed path never ship.
- **Links**: link the real file (`/rabit/docs.html`); `--pretty-urls` rewrites it to `/rabit/docs/`.
- **Everything else ships byte-for-byte**, including `src/.well-known/` (the site's rabit burrow and warren).
- **Markdown pages** set `title`, `description` and `class: prose` in frontmatter; `prose` (in `styles.css`) gives
  them the reading layout. Never put a `<head>` in Markdown.
- Content after `</html>` is dropped by unify when a layout applies — keep scripts inside `<body>` or in
  `src/assets/js/main.js`.

The retired DOM Cascade vocabulary (`data-unify`, `unify-*` area classes) is a build error in current unify.

## Site Structure

```
src/
├── _layout.html              # the one layout: head include, nav, <main>, footer, scripts
├── _includes/base/           # head.html, nav.html (scoped <style>), footer.html, scripts.html
├── index.md                  # home
├── tools.md, supported.md    # the supported tools; what "supported by fwdslsh" means (Draft rules)
├── members.md, about.md      # members list; how fwdslsh works (Draft governance)
├── join.md                   # membership and tool proposals
├── _member-template.md       # member card template (never ships)
├── rabit/                    # index, getting-started, docs, examples
├── .well-known/              # burrow.json and warren.json (rabit v0.4.0; validate against rabit's schemas)
├── assets/                   # styles.css (global), components.css, layouts.css, utilities.css, js/, vendor/
├── staticwebapp.config.json  # Azure Static Web Apps headers
└── unify.yaml                # saved CLI flags (never shipped)
```

Deployment: `.github/workflows/swa.yml` (Azure Static Web Apps; runs `check` and `audit` before building) and
`.github/workflows/static.yml` (GitHub Pages).

## Conventions

- Component styles live with the component (e.g. the `<style>` in `nav.html`, scoped under `nav`) and handle
  layout only; truly global styles go in `src/assets/styles.css`. Don't duplicate rules across both.
- Every page has its own `<title>`, `<meta name="description">`, and exactly one `<h1>` inside the content
  (unify audit checks the h1 inside `<main>`).
- Icons: Lucide (stroke) for site UI, Simple Icons (fill) for brand marks; top-bar icons are 20px with an
  `aria-label` on the link. Copy path data from the icon packages — never retype it.
- Designs must work from 320px wide up.
- When rabit's spec changes, update `src/rabit/*.html` and `src/.well-known/*.json`; `scripts/check-version-sync.sh`
  compares them against a sibling `../rabit` checkout.

## Testing

- `npm run check && npm run audit` must both exit 0.
- `npm test` covers same-site links on every page, one `<nav>`/`<h1>` per page, no console errors, the top-bar
  icons, and the tools menu (mouse and keyboard).
