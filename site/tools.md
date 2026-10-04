---
title: Tools
description: Open-source tools from the fwdslsh lab, unify, fhold, akm, rabit and gutterpress, with what each does and how to install it.
class: tools
---

# Tools

Open-source tools built by fwdslsh members. Each one lives in its own repo, so that's the place for docs, issues and releases.

<include src="/_includes/tool-cards.html"></include>

## unify

A static site generator for people who'd rather write plain HTML. Write a layout, nav or footer once, and unify renders it into every page. It adds no JavaScript of its own, and this site is built with it.

```sh
npm install -g @fwdslsh/unify
unify init
unify build
```

Needs Node 22.12+ or Bun 1.2+. MPL-2.0. [Getting started](/unify/getting-started.html) · [Full docs](https://unify.fwdslsh.dev/) · [GitHub](https://github.com/fwdslsh/unify)

## fhold

A home for your personal AI. fhold runs one persistent OpenCode agent, akm knowledge and recurring work in a single Assistant container on your own machine. Optional Guardian adds policy-scoped MCP, and one Portal image adds Discord and Slack. Linux alpha; Windows and macOS packaging is deferred.

```sh
curl -fL -o fhold https://github.com/fwdslsh/fhold/releases/download/0.1.2610040821-alpha.3/fhold-cli-linux-x64
sudo install -m 755 fhold /usr/local/bin/fhold
fhold install --name personal-agent
fhold setup
```

Needs Docker Engine with Compose v2 and an AI provider supported by OpenCode. MIT. [Getting started](/fhold/getting-started.html) · [Full docs](https://github.com/fwdslsh/fhold/blob/main/docs/README.md) · [GitHub](https://github.com/fwdslsh/fhold)

## akm

Agent Knowledge Manager: one searchable library of skills, scripts, workflows and knowledge that any shell-capable coding agent can use. It indexes your existing Claude Code and OpenCode directories where they are. Built by itlackey.

```sh
npm install -g akm-cli
akm setup --yes
```

Needs Node 22+. MPL-2.0. [Getting started](/akm/getting-started.html) · [Full docs](https://github.com/itlackey/akm/blob/main/docs/README.md) · [GitHub](https://github.com/itlackey/akm)

## rabit

A small JSON manifest convention (`.burrow.json`) that tells agents what content a site or repo holds and where, so they can find things without crawling. It's a draft spec (0.4.0). This site publishes its own at [`/.well-known/burrow.json`](/.well-known/burrow.json).

```sh
bun add -g @fwdslsh/rabit-client
rabit validate .burrow.json
```

The CLI needs Bun. CC-BY-4.0. [Docs](/rabit/index.html) · [GitHub](https://github.com/fwdslsh/rabit)

## gutterpress

Write a book in Markdown, lay it out with CSS and export a print-ready PDF. A desktop app for Windows, macOS and Linux, with a CLI for scripts and CI. Renders through a real Chromium print engine, so the preview is the PDF. Built by [Dimm City](https://dimm.city/).

```sh
npm install -g gutterpress
gutterpress new "My Book" --preset book
gutterpress build ./my-book
```

The CLI needs Node 22+ and a Chromium-based browser; the desktop app needs nothing. MPL-2.0. [Getting started](/gutterpress/getting-started.html) · [User guide](https://github.com/dimm-city/gutterpress/tree/main/examples/gutterpress-user-guide) · [GitHub](https://github.com/dimm-city/gutterpress)
