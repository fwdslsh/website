---
title: Getting started
description: Install fhold on a Linux machine with Docker, sign in to a provider, talk to your agent and give it its first scheduled task.
class: fh-start
---

# Getting started

From download to a first scheduled task in five steps. You need a non-root Linux account with Docker Engine and Compose v2, and an account with a model provider that OpenCode supports.

## 1. Install

Download the standalone CLI for your architecture from the [Linux alpha release](https://github.com/fwdslsh/fhold/releases/tag/0.1.2610040821-alpha.3). It needs no Bun, Node or npm on the host:

```sh
curl -fL -o fhold https://github.com/fwdslsh/fhold/releases/download/0.1.2610040821-alpha.3/fhold-cli-linux-x64
sudo install -m 755 fhold /usr/local/bin/fhold
fhold install --name personal-agent
```

Use `fhold-cli-linux-arm64` on ARM64. `install` writes one Compose project to `~/fhold/instances/personal-agent` and pulls the pinned `fwdslsh/fhold-assistant` image from public Docker Hub; no Docker Hub login is needed. The name you choose becomes the folder, the container prefix and the agent's hostname; leave it out and the instance is `~/fhold/instances/default`. The second line puts the binary on your `PATH`, which every command below assumes.

Prefer a desktop? The same release has an Admin AppImage. Make it executable, launch it and choose **Create new instance**; it walks through the same setup.

## 2. Set up

```sh
fhold setup
```

This starts the Assistant, hands sign-in to OpenCode's native provider login, and finishes only after a real, tool-free request gets an answer. Check readiness later with `fhold provider test` or `fhold doctor --readiness`. Provider usage is billed by the provider as usual.

## 3. Talk to it

```sh
fhold connect opencode
```

That prints the local address, username and password file for the Assistant's OpenCode server. Point your OpenCode client at it. This is the trusted path: it bypasses Guardian and carries the agent's full native permissions, which is why it listens on loopback only unless you say otherwise.

## 4. Teach it and schedule it

In conversation, ask the agent to remember a fact or to do something on a schedule: "Every weekday at 8 AM, check my project news and save the result to my inbox." The same task from the CLI:

```sh
fhold task create project-news --schedule '0 8 * * 1-5' --prompt 'Check project news and save a report'
fhold task list
fhold task history project-news
```

Scheduled runs use a restricted profile, treat anything they fetch as untrusted, and write only to `knowledge/inbox/`. Never paste credentials into a conversation.

## 5. Open the front door (optional)

```sh
fhold guardian enable
fhold credential add reader read
fhold connect mcp --credential reader
```

Guardian is the authenticated MCP endpoint for every client that isn't your own OpenCode. Each named identity gets a fixed policy: `chat`, `read` or `full`. Hand the printed address and key to an MCP client, or see [Examples](/fhold/examples.html) for Claude Desktop, Discord and Slack.

## Keep it running

```sh
fhold status      # inspect without changing anything
fhold logs
fhold doctor
fhold update      # pull the pinned images and refresh managed files
fhold backup --to /private/path/backup
```

`stop` removes containers and networks, never your data. There is no purge command.

## Where to go next

[How it works](/fhold/concepts.html) covers the containers, the home folder and the two ways in, and [Examples](/fhold/examples.html) walks through the common setups. The full guides are in the [fhold docs](https://github.com/fwdslsh/fhold/blob/main/docs/README.md) on GitHub.
