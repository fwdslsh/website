---
title: Examples
description: Common akm commands, from connecting a team bundle and curating for a task to capturing a memory and running a workflow.
class: akm-examples
---

# Examples

The commands you'll reach for most. Each guide linked here goes deeper in the [akm docs](https://github.com/itlackey/akm/blob/main/docs/README.md).

## Connect a team bundle from GitHub

```sh
akm bundle add github:my-org/team-bundle --name team
akm index
akm search "deploy" --type script
```

Pin a tag with `github:owner/repo#v1.2.3`. Add `--writable` on a git bundle you own so `akm sync` can push to it. See [Bundles](https://github.com/itlackey/akm/blob/main/docs/guides/bundles.md).

## Turn a docs site into a searchable bundle

```sh
akm bundle add https://docs.example.com --name docs --max-pages 200
akm index
akm curate "configure the webhook retry policy"
```

The site is crawled, converted to Markdown and refreshed every 12 hours. See the [website source recipe](https://github.com/itlackey/akm/blob/main/docs/guides/recipes/website-source.md).

## The retrieval loop inside an agent

Once `AGENTS.md` mentions akm, this is the pattern an agent follows for every non-trivial task:

```sh
akm curate "deploy to production" --limit 3
akm show workflows/deploy-to-prod
akm feedback workflows/deploy-to-prod --positive --reason "Completed without issues"
```

Negative feedback carries what should change, and the next improve run drafts the fix:

```sh
akm feedback skills/release-notes --negative --reason "Misses the breaking-changes section"
```

See [Use akm with any agent](https://github.com/itlackey/akm/blob/main/docs/guides/use-with-any-agent.md).

## Capture what you learned

```sh
akm remember "The staging DB needs VPN; use the bastion in 1Password"
akm import ./docs/postmortem-2026-05.md --name postmortem-2026-05
akm index
```

Both write into your working bundle, so every agent sees it on its next search. See [Capture knowledge](https://github.com/itlackey/akm/blob/main/docs/guides/capture-knowledge.md).

## Run a workflow

A workflow is a multi-step procedure with gates, retries and budgets. akm freezes a plan, persists each unit's state, and resumes after an interruption without replaying finished steps:

```sh
akm workflow run workflows/release --version 1.2.3
akm workflow status <run-id> --units
akm workflow resume <run-id>
```

See [Run workflows](https://github.com/itlackey/akm/blob/main/docs/guides/run-workflows.md) and the [author's guide](https://github.com/itlackey/akm/blob/main/docs/guides/author-workflows.md).

## Make a local copy you can edit

```sh
akm clone team//skills/code-review
```

The copy lands in your working bundle and outranks the upstream one in later searches, so edits are yours without touching the shared bundle.
