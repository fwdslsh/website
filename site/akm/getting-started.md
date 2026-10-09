---
title: Getting started
description: Install akm, connect the assets you already have, index them and pull a curated shortlist for a real task.
class: t-start
---

# Getting started

From install to a curated shortlist in five steps.

## 1. Install

The npm package needs Node 22+. Standalone binaries need no runtime at all:

```sh
npm install -g akm-cli

# or a prebuilt binary (Linux / macOS)
curl -fsSL https://github.com/itlackey/akm/releases/latest/download/install.sh | bash
```

Check it with `akm --version`. Later, `akm upgrade` updates in place.

## 2. Set up

```sh
akm setup --yes
```

This creates your working bundle at `~/akm`, with a directory per asset type (`scripts/`, `skills/`, `workflows/`, `memories/` and so on). It's the one bundle that's always writable. Drop `--yes` for the guided, interactive version.

## 3. Connect what you already have

Point akm at directories you already use. Nothing moves; akm indexes them in place:

```sh
akm bundle add ~/.claude                   # Claude Code skills, commands, agents
akm bundle add ~/.config/opencode          # OpenCode's config directory
akm bundle add github:itlackey/akm-stash   # the official onboarding bundle
akm bundle list
```

## 4. Index

```sh
akm index
```

Run it again whenever you add or change assets. It reports how many it indexed.

## 5. Curate for a real task

Describe the task in plain language instead of guessing an asset name:

```sh
akm curate "plan a release"
akm show workflows/release        # load the best match by the ref curate printed
```

## Tell your agent

Add a short block to `AGENTS.md` or `CLAUDE.md` so the agent knows akm exists. akm writes it for you:

```sh
akm help agents >> AGENTS.md
```

From then on the agent runs `akm curate` at the start of a task and `akm show` to load what it picked.

## Where to go next

[How it works](/akm/concepts.html) covers the mental model, and [Examples](/akm/examples.html) shows the common commands. The full guides and reference are in the [akm docs](https://github.com/itlackey/akm/blob/main/docs/README.md) on GitHub.
