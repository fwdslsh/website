---
title: Tools
description: Open-source tools from the fwdslsh lab, unify, rabit and akm, with what each does and how to install it.
---

<header class="page-header">
<p class="eyebrow">~/tools</p>

# Tools

<p class="lede">Open-source tools built by fwdslsh members. Each one lives in its own repo, so that's the place for docs, issues and releases.</p>

</header>

<include src="/_includes/tool-cards.html"></include>

<section>

## unify

A static site generator for people who'd rather write plain HTML. Write a layout, nav or footer once, and unify renders it into every page. It adds no JavaScript of its own, and this site is built with it.

```sh
npm install -g @fwdslsh/unify
unify init
unify build
```

<p class="meta">Needs Node 22.12+ or Bun 1.2+ · MPL-2.0 · <a href="https://unify.fwdslsh.dev/">docs</a> · <a href="https://github.com/fwdslsh/unify">github</a></p>

</section>

<section>

## rabit

A small JSON manifest convention (`.burrow.json`) that tells agents what content a site or repo holds and where, so they can find things without crawling. It's a draft spec (0.4.0). This site publishes its own at [`/.well-known/burrow.json`](/.well-known/burrow.json).

```sh
bun add -g @fwdslsh/rabit-client
rabit validate .burrow.json
```

<p class="meta">The CLI needs Bun · CC-BY-4.0 · <a href="/rabit/index.html">docs</a> · <a href="https://github.com/fwdslsh/rabit">github</a></p>

</section>

<section>

## akm

Agent Knowledge Manager: one searchable library of skills, scripts, workflows and knowledge that any shell-capable coding agent can use. It indexes your existing Claude Code and OpenCode directories where they are. Built by itlackey.

```sh
npm install -g akm-cli
akm setup --yes
```

<p class="meta">Needs Node 22+ · MPL-2.0 · <a href="https://github.com/itlackey/akm">github</a></p>

</section>
