---
title: Templates
description: Start a unify site from a built-in, a directory, a git repository or an npm package, keep it current with unify update, and publish a template of your own.
class: u-templates
---

# Templates

A template is just a unify project: a `site/` folder beside `AGENTS.md`, `DEPLOY.md` and `unify.yaml`. `unify init` writes one, and `unify init` can start from one you or someone else published. Nothing in a template is ever executed on your machine.

## Start from one

```sh
unify init blog                                              # a built-in: default, basic, blog, docs, portfolio
unify init ../our-house-template                             # a directory
unify init https://github.com/fwdslsh/unify/templates/blog   # one subdirectory of a git repository
unify init git@github.com:acme/templates.git/shop#v2         # an SSH address, a subdirectory, a tag
unify init unify-shop-template                               # an npm package — any package; this is the searchable name
unify init @acme/unify-shop-template@1.4.0                   # under an organization, at a version
```

The four forms are told apart by shape: a built-in name, a git address, a directory that exists, else an npm package — any package, with `unify-<name>-template` the convention that makes one easy to find, and `--audit` what tells a template from a package that is not one. A git repository is cloned with your own `git` and an npm package fetched with your own `npm`, so your keys, tokens and registry apply. One repository can host several templates: the path after `owner/repo` names the directory, and `#ref` a branch, tag or commit. The URL your browser shows for a directory works as written.

Add `--audit` to keep the scaffold only if `unify audit --strict` passes on it. Every built-in does.

## Stay current

`init` leaves one line in `unify.yaml`, the template as you typed it:

```yaml
template: https://github.com/acme/templates/shop
```

That is the whole record. Commit it, configure your site, write your content. When the template changes:

```sh
unify update --dry-run   # the files it would overwrite and add, nothing written
unify update             # the same list, then one question
```

unify fetches the template again and compares every file it ships with yours. Files you do not have are added. Files that differ are listed, and `unify update` asks `overwrite N file(s)? [y/N]` before writing any of them: answer `y` and the listed files take the template's version; anything else writes nothing. Nothing is ever removed, and files you added are never touched. `--yes` answers for a script. Running it when nothing differs says so.

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

`_examples/` is excluded from the build by the default `_*` rule, so the examples land in every site and never publish. The author copies `_examples/post.md` to `posts/first.md` and edits the copy; `unify update` never visits a path the template does not ship, and the example itself is never edited, so your improvements to it arrive cleanly. Nothing is declared anywhere: the path says whose a file is. Don't ship `unify.yaml` unless a page needs a flag live; `init` writes the all-commented file, and it is then the site's.

Ship the look the same way: a stylesheet whose rules all sit in a `base` cascade layer and read custom properties, a layout that includes `/_includes/theme.html`, that fragment shipped beside `AGENTS.md` (a comment — a fresh scaffold resolves it from the project root), and `_examples/theme.html` holding those properties at their defaults in a `<style>` block. The author copies it to `site/_includes/theme.html`, a path you never ship; the site's file is found first and its values win. A stylesheet cannot import a file the site copies later: a reference to nothing blocks the publish.

Then host it where your users can fetch it: a directory in a git repository (tag your releases), or an npm package — any name works, and `unify-<name>-template` or `@you/unify-<name>-template` is the convention that makes it easy to find on npm.

The complete guide, with the exact rules for every case, is on [unify.fwdslsh.dev](https://unify.fwdslsh.dev/docs/templates.html).
