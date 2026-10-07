---
title: What's new in unify 0.9 to 0.11
description: Six weeks of unify releases by theme. One command to check and publish, a project root with a place for everything, templates from any directory, git repository or npm package, updates that keep your files, and a layout you can design in the browser.
class: u-news
---

# What's new in unify 0.9 to 0.11

unify went from 0.9.0 to 0.11.6 between 26 August and 5 October 2026. The five primitives are unchanged: `<include>`, layouts, slots, the underscore exclusion and the `.fragment.html` opt-out compose exactly what they composed in 0.8. What changed is everything around them: fewer commands to run, fewer flags to pass, a project layout with a place for every file, templates you can start from and update, and a development server you can design in.

This is the account by theme, with the version that shipped each change. The version-by-version record is the [changelog](https://github.com/fwdslsh/unify/blob/main/CHANGELOG.md), and each release is on the [releases page](https://github.com/fwdslsh/unify/releases) with its binaries.

## One command to check and publish

`unify build --audit --strict` (0.9.2) composes the site once, evaluates the same findings `unify audit` reports over that exact result, and publishes only if the audit would pass. Before it, a careful release ran three commands: `build --dry-run --strict`, then `build`, then `audit --strict`. It is now the one-line release gate the scaffolds' `AGENTS.md` and `DEPLOY.md` name, and the one this site's `npm run build` runs.

`--save-config` (0.9.2) writes the options you passed into `unify.yaml` after a build that exits 0, changing only the keys you gave. It works with `--dry-run` too (0.9.5), so a flag can be tried and saved without publishing.

## A project root with a place for everything

A fresh `unify init` scaffolds this (0.10.0):

```
AGENTS.md  DEPLOY.md
unify.yaml        # every build flag, described and commented out; uncomment what differs
scripts/gen.mjs   # the blog template's generator, run by unify before every build
site/             # the source root: pages, assets, _layout.html, _includes/
```

The source root defaults to `site/`, then `src/` for sites that predate 0.10, then the working directory. `unify.yaml` lives at the project root (0.9.5), where it can say `source: site` and `generate: scripts/gen.mjs`, and every relative path in it resolves against the file (0.10.0). The project root is also the last place an include path or the layout walk looks (0.9.5): `includes/nav.html` and a `_layout.html` can sit beside `package.json`, the source tree wins a tie, and nothing at the root is scanned or published.

The `unify.yaml` that `init` writes lists every saveable option, each commented out under a one-line description naming its default. Nothing changes until a line is uncommented, and a file stating every default builds byte-for-byte the same as no file at all. Only what differs from a default needs writing, on the command line or in the file.

## Flags that became defaults

Two flags that every site with an address or a generator ended up passing are now on by default (0.10.0). With `--base-url` set, every page that authors no canonical link gets one; `--canonical none` switches that off. With a generator named, the source inventory is written; `source-inventory: false` switches that off.

## Generators read the site instead of parsing it

`--generate <path>` runs one JavaScript file before the build, and what it writes is built as if it were part of the site. Three releases gave that file the facts it needs, so it never parses frontmatter or HTML itself:

- `generator-context.json` (0.9.0), passed as the fourth argument: the build's command, paths, base URL, pretty-URL and canonical settings, and where the catalog and search corpus will land.
- `source-pages.json` (0.9.3), named by `inputs.sourcePages` in that context: one record per source page with its path, address and authored title, description and date, and from 0.9.4 its own `<meta>` and `<link>` elements as written. A generator can group by its own `series` key or order by `part` without reading a single page file.
- The generator may live outside the source root (0.9.5), so build tooling stays in `scripts/` while content stays in `site/`.

The blog template's generator shows the shape. It runs through `--generate` and writes its post list into unify's overlay rather than into `site/`, so no derived file is checked in and none goes stale (0.10.0). Since 0.11.5 it reads the inventory and leaves the feed to unify: with `--base-url`, the posts' `schema: BlogPosting` activates `feed.xml` on its own. [This site's generator](/blog/posts/how-this-site-is-built.html) works the same way.

## A catalog and a search corpus

`--catalog` writes `assets/unify/catalog.json`, one entry per public page with its path, URL, title, metas, links and headings, for a browse or filter UI. `--search-corpus` writes `assets/unify/search-corpus.json`, one `{path, text}` entry per page for client-side search (0.9.0). They replace `--search-index`, are independent of each other, and join by `path`. `--include-noindex` (0.9.2) lists `noindex` pages in both, so a private site gets a usable directory. The docs template ships an "All pages" starter read from the catalog (0.9.2), with `catalog: true` live in its `unify.yaml`.

## Design a layout in the browser

`unify dev` always built, watched, served and reloaded. It now also previews the files that are not pages:

- `/_unify/preview/<source path>` (0.10.1) opens a layout as itself, includes inlined and slot fallbacks rendered, or composed with any page through `?page=`. An include opens on its own, its slots filled from a page that includes it, with `?layout=` picking the layout that supplies the head.
- `/_unify/preview/` (0.11.3) lists every layout, include and page in the site, with the number of built pages that use each one. `unify dev` prints the address at startup.
- A small overlay in the corner of every page the server serves (0.11.4) names the file, links the page to its layout and includes, carries the page and layout pickers on a preview, and opens the build's diagnostics for the file. It is styled from a reset, so the site's CSS cannot touch it. `?chrome=off` removes it, `?chrome=partials` keeps it collapsed on pages and open on layouts and includes, and the browser remembers the choice.
- `/_unify/pages.json` (0.10.1) maps every built page to its source file, layout and includes, for an editor that wants to show the composed page beside the file being edited.

The scaffolded layout and pages link their stylesheet relative to their own file (0.10.0), so a layout opened straight from the folder shows styled too. unify rewrites the link for every page at every depth.

## Start from any template

`unify init` takes a template source, not only a built-in name (0.11.0):

```sh
unify init blog                                              # a built-in
unify init ../our-house-template                             # a directory
unify init https://github.com/fwdslsh/unify/templates/blog   # a directory of a git repository
unify init git@github.com:acme/templates.git/shop#v2         # an SSH address, a subdirectory, a tag
unify init shop-template                                     # an npm package
unify init @acme/shop-template@1.4.0                         # scoped, at a version
```

A git repository is cloned with your own `git` and an npm package fetched with your own `npm`, so your keys and registry apply, and nothing a template ships is executed. One repository can hold many templates: the path after `owner/repo` names the directory, `#ref` a branch, tag or commit, and the URL your browser shows for a directory works as written. The five built-ins are real projects under `templates/` in the repository, each usable as a git template in its own right.

Any npm package can be the source (0.11.6). Naming a template `unify-<name>-template` and giving it the `unify-template` keyword is what makes it easy to find, on npm and on the [browse page](/unify/browse-templates.html), not a rule the CLI checks. `unify init --audit` is what tells a template from a package that is not one: it keeps the scaffold only if `unify audit --strict` passes on it.

## Update a site without losing anything

`unify update` arrived in 0.11.2 and has been simplified twice since. The first version kept a manifest of file hashes in `unify.template.json`, reported conflicts and needed `--adopt` for older projects. 0.11.5 replaced all of it with one line that `init` writes into `unify.yaml`, the source as you typed it:

```yaml
template: https://github.com/acme/templates/shop
```

`unify update` fetches that template again and compares every file it ships with yours. Files you do not have are added. Files that differ are listed, and unify asks `overwrite N file(s)? [y/N]` before writing any of them; anything but `y` writes nothing. `--dry-run` shows the list and asks nothing, `--yes` answers for a script, nothing is ever removed, and `unify update <source>` moves the project to another version or address. The update is ordinary changes in your working tree, so `git diff` reviews it.

`keep` (0.11.6) names the files you customized. The list sits under `template:` beside the record, and `--keep <path>` names one for a single run, repeatable:

```yaml
template:
  source: https://github.com/acme/templates/shop
  keep:
    - unify.yaml
    - site/assets/theme.css
```

A kept file that exists is never overwritten and never asked about; it is reported as `keep site/assets/theme.css` when the template's copy differs. One that does not exist yet is added. [Templates](/unify/templates.html) walks through the whole rhythm.

## Templates that stay out of your way

Two conventions, which the built-in templates follow, make an update something you can run without reading the list twice.

Tooling ships in place, and everything a site fills in ships only as an example (0.11.5). A template's layout, nav, stylesheet, home page and 404 are files `unify update` can replace cleanly. Its sample posts, authors file and project pages live under `site/_examples/`, which the default `_*` exclusion keeps out of the build. You copy an example into place and edit the copy, and the update never visits that path, because the template does not ship it.

The look is a file the site keeps (0.11.6). Every built-in's `assets/style.css` opens with `@layer base, theme;` and imports `theme.css` into the theme layer, puts its look into custom properties in the base layer, and ships `assets/theme.css` with those properties at their defaults. Edit a value and the look changes; delete one and the default returns. Every built-in's `unify.yaml` keeps that file and itself, so neither the theme nor a line you uncomment is ever overwritten.

## Content is never dropped silently

The content-loss law says authored content is never dropped without failing the build, and two releases closed gaps in it. Content beside a page's `<head>` and `<body>`, such as a `<script>` after `</html>`, was left out of the output at exit 0; it is now a located problem telling you where to move it (0.9.2). An `<include>` inside a slotted include's content ended the outer include early; tags now pair by nesting (0.9.2). Under `--pretty-urls`, a URL-valued `og:` or `twitter:` meta is rewritten the way the matching `href` always was (0.9.0).

The audit changed scope and lost a finding. Headings are read from the first `<main>`, else `<body>`, so a site name in a layout's header no longer counts as the page's `<h1>` (0.9.0). The `title-h1-mismatch` finding is gone: a brand-name `<title>` over a tagline `<h1>` is a correct page (0.9.2). And a page that declares `Organization` before `Article` joins the feed now, because membership tests inclusion rather than the first declaration (0.9.0).

## Upgrading from 0.8

Most sites notice nothing. These are the changes that can:

- `--search-index` and `search-index.json` are gone; use `--catalog` and `--search-corpus` (0.9.0).
- `audit --format json` pages are now `{source, generated, outputPath, document}`; a reader of the 0.8 flat shape needs rewriting (0.9.0).
- The `taxonomy-inert` finding no longer exists; `tags:` and `categories:` frontmatter still emit their metas (0.9.0).
- A page whose only `<h1>` came from the layout's chrome needs one inside `<main>` to pass `audit --strict` (0.9.0).
- A site built with `--base-url` and no `--canonical` now gets a canonical link on every page that authors none (0.10.0).
- A project-root `unify.yaml` that said `generate: ../scripts/gen.mjs` now says `generate: scripts/gen.mjs` (0.10.0).
- `unify.template.json` is retired; a project that still has one is told the exact `template:` line to add (0.11.5).
- `?config=false` on a preview is now `?chrome=off` (0.11.4).

0.9.1 changed nothing in unify itself: it moved the Svelte worked example to Svelte 5 to clear its advisories.
