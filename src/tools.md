---
title: Tools
description: Open-source tools from the fwdslsh lab, unify, rabit and akm, with what each does and how to install it.
class: prose
---

# Tools

Open-source tools built by fwdslsh members. Each one lives in its own repo, so that's the place for docs, issues and releases.

## unify

A static site generator for people who'd rather write plain HTML. Write a layout, nav or footer once, and unify renders it into every page. It adds no JavaScript of its own, and this site is built with it.

```
npm install -g @fwdslsh/unify
unify init
unify build
```

Needs Node 22.12+ or Bun 1.2+. MPL-2.0. [Docs](https://unify.fwdslsh.dev/) · [GitHub](https://github.com/fwdslsh/unify)

## rabit

A small JSON manifest convention (`.burrow.json`) that tells agents what content a site or repo holds and where, so they can find things without crawling. It's a draft spec (0.4.0). This site publishes its own at [`/.well-known/burrow.json`](/.well-known/burrow.json).

```
bun add -g @fwdslsh/rabit-client
rabit validate .burrow.json
```

The CLI needs Bun. CC-BY-4.0. [Docs](/rabit/index.html) · [GitHub](https://github.com/fwdslsh/rabit)

## akm

Agent Knowledge Manager: one searchable library of skills, scripts, workflows and knowledge that any shell-capable coding agent can use. It indexes your existing Claude Code and OpenCode directories where they are. Built by itlackey.

```
npm install -g akm-cli
akm setup --yes
```

Needs Node 22+. MPL-2.0. [GitHub](https://github.com/itlackey/akm)
