---
title: Templates
description: Start a unify site from a built-in, a directory, a git repository or an npm package, keep it current with unify update, and publish a template of your own with the unify-template keyword.
class: t-templates
---

# Templates

A template is just a unify project: a `site/` folder beside `README.md`, `DEPLOY.md` and `unify.yaml`. `unify init` writes one, and `unify init` can start from one you or someone else published. Nothing in a template is ever executed on your machine.

## Start from one

```sh
unify init blog                                              # a built-in: default, basic, blog, docs, portfolio
unify init ../our-house-template                             # a directory
unify init https://github.com/fwdslsh/unify/templates/blog   # one subdirectory of a git repository
unify init git@github.com:acme/templates.git/shop#v2         # an SSH address, a subdirectory, a tag
unify init shop-template                                     # an npm package — any package
unify init @acme/shop-template@1.4.0                         # under an organization, at a version
```

The four forms are told apart by shape: a built-in name, a git address, a directory that exists, else an npm package — any package, and `--audit` what tells a template from a package that is not one. A git repository is cloned with your own `git` and an npm package fetched with your own `npm`, so your keys, tokens and registry apply. One repository can host several templates: the path after `owner/repo` names the directory, and `#ref` a branch, tag or commit. The URL your browser shows for a directory works as written.

Add `--audit` to keep the scaffold only if `unify audit --strict` passes on it. Every built-in does.

[Browse the templates](/unify/browse-templates.html) you can start from: the built-ins and every one published to npm with the `unify-template` keyword.

## Stay current

`init` records the template in `unify.yaml`, as you typed it — the value of `template:`, or `source:` inside a block that also lists the files `unify update` never overwrites:

```yaml
template:
  source: https://github.com/acme/templates/shop
  keep:
    - unify.yaml
    - site/assets/theme.css
```

That is the whole record. Commit it, configure your site, write your content. When the template changes:

```sh
unify update --dry-run   # the files it would overwrite and add, nothing written
unify update             # the same list, then one question
```

unify fetches the template again and compares every file it ships with yours. Files you do not have are added. Files that differ are listed, and `unify update` asks `overwrite N file(s)? [y/N]` before writing any of them: answer `y` and the listed files take the template's version; anything else writes nothing. A file named under `keep:` is never overwritten once it exists — the theme you edited, and the nav or the home page once you add them — and is reported as kept instead; `--keep <path>` names one for a single run. Nothing is ever removed, and files you added are never touched. `--yes` answers for a script. Running it when nothing differs says so.

The recommended rhythm: scaffold and commit, configure and commit, author and commit, then `unify update --dry-run`, read the list, `unify update`, `unify build --dry-run --strict`, commit. The update is ordinary changes in your working tree, so `git diff` reviews it and `git checkout -- <file>` takes back any file you would rather have kept your own version of.

## Publish your own

Make a site, strip it to the starting point you want others to have, and make sure `unify audit --strict` passes on a fresh scaffold.

Ship your tooling in place, and everything a site fills in only as examples:

```
site/
  _layout.html          tooling: ships in place, updates cleanly
  _includes/nav.html
  assets/style.css
  index.html            the one page a scaffold cannot build without
  _examples/
    post.md             copied into place, then edited — never edited where it is
    author.json
```

`_examples/` is excluded from the build by the default `_*` rule, so the examples land in every site and never publish. The author copies `_examples/post.md` to `posts/first.md` and edits the copy; `unify update` never visits a path the template does not ship, and the example itself is never edited, so your improvements to it arrive cleanly. Nothing is declared anywhere: the path says whose a file is. Ship `unify.yaml` only for the lines you need live, and name it under the `keep:` list of its own `template:` block — the files `unify update` never overwrites — so the lines a site uncomments stay the site's.

Ship the look the same way: a stylesheet that opens with `@layer base, theme;` and `@import url("theme.css") layer(theme);`, its look as custom properties in the base layer, and `assets/theme.css` in place with those properties at their defaults, named under `keep:` in the `template:` block of the `unify.yaml` you ship. The author edits the file; its values win over the defaults, and `unify update` never overwrites it. It ships in place rather than as an example because a stylesheet cannot import a file the site copies later: a reference to nothing blocks the publish.

Then host it where your users can fetch it: a directory in a git repository (tag your releases), or an npm package. Any name works; put `unify-template` in the `keywords` of its `package.json`, as the built-ins do, and a search for that keyword lists it beside every other template, on npm and on the [browse page](/unify/browse-templates.html).

The complete guide, with the exact rules for every case, is on [unify.fwdslsh.dev](https://unify.fwdslsh.dev/docs/templates/).
