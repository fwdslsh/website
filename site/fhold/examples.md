---
title: Examples
description: Common fhold setups, from a scheduled morning briefing and Claude Desktop to a Discord bot, a second instance and a portable backup.
class: fh-examples
---

# Examples

The setups you'll reach for most. Each guide linked here goes deeper in the [fhold docs](https://github.com/fwdslsh/fhold/blob/main/docs/README.md).

## A morning briefing

```sh
fhold task create project-news --schedule '0 8 * * 1-5' --prompt 'Check project news and save a report'
fhold task show project-news
fhold task run project-news        # try it now
fhold task history project-news
```

Reports land in `knowledge/inbox/`, where the agent can read them back to you. `pause` and `resume` toggle a task; `remove` keeps the definition in `knowledge/disabled-tasks/`. See [Managing fhold](https://github.com/fwdslsh/fhold/blob/main/docs/managing-fhold.md).

## Connect Claude Desktop

Claude Desktop reaches a local fhold through a desktop extension, since its remote-connector form needs a public `https://` address. The extension is a plain MCP bridge; Guardian still does the authenticating:

```sh
fhold guardian enable
fhold credential add claude-desktop read
fhold connect claude --credential claude-desktop
```

Install the `.mcpb` extension under **Settings → Extensions → Advanced settings**, then paste the printed address and key. Start with `read` and move to `full` only if Claude should change the workspace. See [Claude Desktop](https://github.com/fwdslsh/fhold/blob/main/docs/claude-desktop.md).

## Put it on Discord

```sh
fhold portal token discord --bot-token-file -
fhold portal access discord --users 123456789012345678 --no-apply
fhold credential set-policy discord chat
fhold portal credential discord --credential discord --no-apply
fhold portal enable discord
fhold status
```

Every non-empty allowlist must match, and an empty allowlist refuses everyone, so name yourself explicitly for a personal bot. `chat` is the safe default for a shared platform. Slack is the same flow with `slack`, a bot token plus an app token, and `--channels`. See [Discord](https://github.com/fwdslsh/fhold/blob/main/docs/portals/discord-setup.md) and [Slack](https://github.com/fwdslsh/fhold/blob/main/docs/portals/slack-setup.md).

## A second instance

```sh
fhold install --name work-agent          # lands in ~/fhold/work-agent
FH_HOME=~/fhold/work-agent fhold setup
```

Each instance under `~/fhold/` is its own Compose project with its own knowledge, credentials, workspace and ports; fresh setup picks free ports automatically. Commands act on `~/fhold/default` unless `FH_HOME` names another instance's folder, so keep it explicit for every command meant for the second one. In Admin, **Create new instance** does the same.

## Back up and move it

```sh
fhold backup --to /private/path/backup

fhold install --name restored --no-start
FH_HOME=~/fhold/restored fhold restore --from /private/path/backup --dry-run
FH_HOME=~/fhold/restored fhold restore --from /private/path/backup --apply
```

The dry run lists what will be restored and what needs a separate opt-in (provider auth, private environment, portal maps). Backups are unencrypted, so keep them private. See [portable backup](https://github.com/fwdslsh/fhold/blob/main/docs/managing-fhold.md#portable-backup-and-own-backup-restore).

## Let Claude Code or Codex work in the workspace

Experimental in the alpha: the Assistant image carries native Claude Code and Codex workers that share the agent's `/work` directory. They are separate coding agents, not clients of the fhold agent, and they keep their vendor's own sign-in, trust and approvals:

```sh
fhold remote enable codex --sandbox read-only
fhold remote status codex
fhold remote pair codex
```

Nothing is pre-trusted and no public URL, port or SSH daemon is added. See [native remote workers](https://github.com/fwdslsh/fhold/blob/main/docs/native-remote-access.md).
