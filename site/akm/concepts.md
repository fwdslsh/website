---
title: How it works
description: The akm mental model in one page, including capabilities, bundles, the local index, refs and the retrieval loop.
class: t-concepts
---

# How it works

Four ideas cover the whole model. This is the short version; the [concepts guide](https://github.com/itlackey/akm/blob/main/docs/guides/concepts.md) is the complete one.

## Capabilities

A capability is anything an agent can discover and use: a script, skill, command, agent definition, knowledge document, instruction, workflow, memory, task, env file, secret, lesson or fact. akm classifies them mostly by what they are, from the file's extension and content, rather than by which directory they sit in. A `.sh` file is a script whether it lives in `scripts/` or the bundle root.

## Bundles

A bundle is a directory of capabilities you can connect, share and install. It can be a local folder, a git repo, an npm package or a crawled website, and `akm bundle add` infers which from the input:

| Kind | Input | Behaviour |
| --- | --- | --- |
| filesystem | a local path | indexed in place, writable |
| git | `github:owner/repo` or a git URL | cloned into a cache, read-only |
| npm | `@scope/pkg` | installed into a cache, read-only |
| website | any other URL | crawled to Markdown, refreshed every 12 hours |

Your working bundle (`~/akm`) is the default destination for everything akm writes. Existing Claude Code and OpenCode directories, standalone skill packages and LLM wikis are recognised by their own adapters and indexed read-only, so the native directory stays the source of truth.

## One local index

Every connected bundle folds into one local full-text index. Two verbs work it:

- **search** decides: a lean menu of type, name, action and score.
- **show** delivers: the full content, run command or prompt for one asset.

`curate` sits on top of search and returns a short, ranked list for a task described in plain language. When two bundles hold an asset with the same name, your working bundle wins by ranking; `akm clone` copies an upstream asset there so your edits override it.

## Refs

A ref is the compact handle search returns and `show` consumes, shaped `[bundle//]conceptId[#fragment]`. Treat it as opaque: get it from search or curate and pass it on. Install refs (`github:owner/repo`, `npm:@scope/pkg`) are a different grammar, accepted only by `bundle add` and `clone`.

## The loop

```text
local folders / git / npm / websites
              |
           bundles
              |
        one local index
              |
   curate -> show -> use/run -> feedback -> proposals
```

Connect a source, index it, curate a shortlist, show the full payload, use it, then send feedback. `--positive` raises an asset's ranking; `--negative --reason` flags it: it ranks lower right away, and the next `akm improve` run may repair its title or description. A fix to the text itself goes with the feedback (`--replace … --with … --source`) and is queued as a proposal for review. Nothing is executed just because it turned up in a search: akm runs only the surfaces it defines, such as workflows, agent dispatch and tasks.

## Local-first

The index and all state live on disk. There is no telemetry, and the network is used only for the sources and model endpoints you configure and the commands that need it, such as `akm upgrade` and improve's link checks.
