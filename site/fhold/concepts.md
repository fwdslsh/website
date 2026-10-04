---
title: How it works
description: The fhold model in one page, including the Assistant container, the home folder on disk, trusted versus guarded access, scheduled work and recovery.
class: fh-concepts
---

# How it works

fhold is three container images and one folder on your disk, not a platform. This is the short version; the [architecture](https://github.com/fwdslsh/fhold/blob/main/docs/technical/architecture.md) and [core principles](https://github.com/fwdslsh/fhold/blob/main/docs/technical/core-principles.md) documents are the complete one.

## One container by default

The Assistant is the only container a fresh install runs. Inside it, [OpenCode](https://opencode.ai/) owns providers, sign-in, models and native approvals; [akm](/akm/index.html) owns knowledge and task definitions; supercronic runs the schedule. fhold adds no provider registry, proxy, credential format or scheduler of its own.

Guardian and Portal are optional images, switched on as Compose profiles. No service runs as root or gets extra Linux capabilities, and the Assistant never holds Docker, host or Guardian authority.

```text
trusted OpenCode client ───────────────────────────────> Assistant
external MCP client ──> Guardian ──> policy profile ──> Assistant
Discord / Slack ──> Portal ──> Guardian MCP ────────────┘
CLI / optional Admin ──> shared library ──> Docker Compose
akm + supercronic ──> restricted scheduled work ───────┘
```

## Your home folder

Every instance is one folder under `~/fhold/`: `default` for a plain install, or the name you gave `--name`. Inside it:

| Path | Owner | What's in it |
| --- | --- | --- |
| `system/` | the release | managed OpenCode and Compose files, replaced on update |
| `config/` | you | seed-once OpenCode, akm and Compose settings |
| `knowledge/` | you and akm | memory, task sources, provider auth; mounted at `/stash` |
| `workspace/` | you | the agent's trusted working directory; mounted at `/work` |
| `state/` | the control plane | stack intent, derived env, named credentials, file-backed secrets |
| `data/` | the containers | Assistant home, akm state, portal databases, audit logs |

Each folder is its own instance with its own Compose project, ports and name; commands act on `default` unless `FH_HOME` points at another instance's folder. fhold refuses to adopt a folder it didn't create, and updates replace only release-owned files: they seed missing settings and never delete whole trees.

## Two ways in

**Trusted.** The Assistant publishes OpenCode's own server on loopback, password-protected. Your OpenCode client connects here with the agent's full native permissions, bypassing Guardian. Any other bind address is an explicit choice.

**Guarded.** Guardian is an authenticated MCP server, also on loopback by default. It checks a named credential or an OAuth identity, applies that identity's policy, screens suspicious prompts through a separate moderator, and issues expiring, scoped session handles. Unknown issuers, bad origins and boundary escapes fail closed.

| Policy | Starts from | Adds |
| --- | --- | --- |
| `chat` | deny-all | conversation only |
| `read` | deny-all | non-secret reads in `/stash` and `/work` |
| `full` | the agent's native permissions | everything the Assistant can do |

A request cannot choose its own profile. Discord and Slack users, Claude Desktop and remote MCP clients all map to one of these identities.

## Recurring work

A task is an id, a cron schedule and a plain-language prompt, stored under `knowledge/` in akm's format and run by supercronic inside the Assistant. Runs use the restricted `scheduled` profile, treat fetched content as untrusted, keep durable history, and write only to `knowledge/inbox/`. The timezone is explicit, downtime doesn't replay missed slots, and removing a task keeps its definition in `knowledge/disabled-tasks/`.

## Backup and recovery

`fhold backup --to` writes a portable backup with a `fhold-backup.json` manifest and a hash inventory. `fhold restore` previews with `--dry-run` and applies with `--apply` into a freshly initialised home, verifying hashes and refusing conflicting edits. Provider auth, private environment and portal maps need separate opt-ins. Native conversation history is handled apart, with `fhold history`, because it isn't portable knowledge.

## No hidden services

There is no hosted control plane, model proxy, VPN, browser chat or background updater. The Admin app is a local settings utility. The agent talks only to the provider you signed in to and the clients you connected, and every choice that widens access is one you make explicitly.
