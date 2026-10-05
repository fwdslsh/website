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

`init` leaves one line in `unify.yaml`, the template pinned to the version it fetched:

```yaml
template: https://github.com/acme/templates/shop#3f9c2e1a7b…
```

That is the whole record. Commit it, configure your site, write your content. When the template releases a new version:

```sh
unify update --dry-run   # the change set, nothing written
unify update             # apply it
```

unify fetches the template at the recorded version and at its latest, and compares each file three ways: then, now, and on your disk. Files you never touched take the new version. A file you edited that the template also changed is a **conflict**: your bytes stay, the line names the file, the exit code is 1, and the recorded version does not move until the conflict is gone. Resolve it by taking the template's version, or keep yours and list the file under `owned:` in `unify.yaml`, where the template's own seeds and content folders already are. Running it again when nothing changed says so.

The recommended rhythm: scaffold and commit, configure and commit, author and commit, then `unify update --dry-run`, `unify update`, resolve any conflicts, `unify build --dry-run --strict`, commit. The update is ordinary changes in your working tree, so `git diff` reviews it.

## Publish your own

Make a site, strip it to the starting point you want others to have, and make sure `unify audit --strict` passes on a fresh scaffold. Declare what a site owns once scaffolded in the template's `unify.yaml`:

```yaml
owned:
  - site/config.json
  - site/posts/**
```

Then host it where your users can fetch it: a directory in a git repository (tag your releases), or an npm package named `unify-<name>-template` or `@you/unify-<name>-template`, which is also what to search npm for.

The complete guide, with the exact rules for every case, is on [unify.fwdslsh.dev](https://unify.fwdslsh.dev/docs/templates.html).
