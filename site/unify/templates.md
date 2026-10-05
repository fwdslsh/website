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
unify init unify-shop-template                               # an npm package, by its conventional name
unify init @acme/unify-shop-template@1.4.0                   # under an organization, pinned
```

The four forms are told apart by shape, so a typo is an error, never a network lookup. A git repository is cloned with your own `git` and an npm package fetched with your own `npm`, so your keys, tokens and registry apply. One repository can host several templates: the path after `owner/repo` names the directory, and `#ref` a branch, tag or commit. The URL your browser shows for a directory works as written.

Add `--audit` to keep the scaffold only if `unify audit --strict` passes on it. Every built-in does.

## Stay current

`init` leaves `unify.template.json` at the project root: the source, the version fetched and a hash of every file the template provided. Commit it, configure your site, write your content. When the template releases a new version:

```sh
unify update --dry-run   # the change set, nothing written
unify update             # apply it
```

Files you never touched take the new version. A file you edited that the template also changed is a **conflict**: your bytes stay, the line names the file, the exit code is 1. Nothing resolves a conflict but you. Files the template marks as yours, such as its config seed or a content folder, are never touched or mentioned. Running it again when nothing changed says so.

The recommended rhythm: scaffold and commit, configure and commit, author and commit, then `unify update --dry-run`, `unify update`, resolve any conflicts, `unify build --dry-run --strict`, commit. The update is ordinary changes in your working tree, so `git diff` reviews it.

## Publish your own

Make a site, strip it to the starting point you want others to have, and make sure `unify audit --strict` passes on a fresh scaffold. Declare what a site owns once scaffolded in a `unify.template.json` at the template's root:

```json
{"owned": ["site/config.json", "site/posts/**"]}
```

Then host it where your users can fetch it: a directory in a git repository (tag your releases), or an npm package named `unify-<name>-template` or `@you/unify-<name>-template`, which is also what to search npm for.

The complete guide, with the exact rules for every case, is on [unify.fwdslsh.dev](https://unify.fwdslsh.dev/docs/templates.html).
