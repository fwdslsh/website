---
title: How fwdslsh works
description: "How fwdslsh is organized: a collective with no legal entity, no money and no ownership of members' code, and how we work with AI agents."
class: prose
---

# How fwdslsh works

fwdslsh is a collective of independent developers building small, open tools for the next epoch of technology, where AI agents and people both publish, find and navigate the web. We share our work under one name and help each other maintain the tools we support.

> fwdslsh is a collective, not a company, co-op or foundation. It has no legal entity, holds no money and owns no member's code. Supported tools stay with their authors and under their licenses. Members share their work here and help each other review, release and maintain the tools we support. If we ever accept money, we will use a public fiscal host and say so on this page.

## Why fwdslsh exists

The web has a new kind of reader. AI agents now read, build and navigate it alongside people, but most of it was made for eyes. Pages lean on scripts and guessed metadata. Sites offer no map of what they hold. The skills and instructions agents use are scattered across every tool and project.

This is the start of the next epoch of technology: agents and people both publish, find and navigate the same sites. That doesn't call for a bigger framework. It calls for small tools that fix specific problems, and for people willing to keep those tools maintained. fwdslsh is where independent developers share their work and help each other build and maintain those tools.

Today three tools are [supported by fwdslsh](/supported.html): unify builds plain-HTML sites, rabit gives a site a map agents can read, and akm, which lives in its author's account, gives coding agents one library of skills. Each one also serves the people reading over the agent's shoulder. [See what each does today](/tools.html).

## Why "/"

The `/` is a path. We still hold to the principles behind the name:

- **Comprehensible.** You should be able to understand a tool in one session. unify's whole authoring surface is five things.
- **Reliable.** The same input should give the same output. unify writes byte-identical output on Node and Bun, and a build that finds a problem publishes nothing. All three tools are pre-1.0 or draft, and the tools page says so on every card.
- **Composable.** Each tool works on plain files you can read (HTML, JSON, Markdown) and runs from a command line, so it fits into the scripts and workflows you already have.
- **With the grain of the web.** We build on plain HTML, files at `/.well-known/`, and existing formats like AGENTS.md and Agent Skills. Where we propose something new, like rabit's manifest, we keep it small and publish it as a draft.

Craft over hype. If a claim on this site can't be checked in a repo, open an issue and we'll fix it.

## Who holds the keys

> **Draft.** How fwdslsh makes decisions is a draft. fwdslsh is one member today, itlackey, and we will tune these rules with the members who join.

fwdslsh is small, and we want that to be visible. Today there is one member and one steward: itlackey ([github.com/itlackey](https://github.com/itlackey)). itlackey maintains all three supported tools and is the only npm maintainer of `@fwdslsh/unify`, `@fwdslsh/rabit-client` and `akm-cli`. If itlackey were unreachable, nobody else could publish a new version to npm. We know that is a risk. The [supported page](/supported.html) sets a target of two people who can release each tool, and no tool meets it yet.

We plan to decide membership and supported tools in public GitHub issues. Until there are three members, the steward (today, itlackey) decides. After that, we propose lazy consensus: a proposal passes if no member objects within a stated period.

> **Review note:** Before launch, record two holders for each credential (GitHub org, npm `@fwdslsh` scope, domain/DNS, hosting). This is not page copy. Default: keep the list private and say on this page only that it exists.

## How we use AI agents

We build these tools with AI agents, and we say so openly. Most of unify's recent commits are authored by Claude. unify's authoring rules were tested by giving agents only the rules and a brief in isolated sandboxes, and judging their sites with the real build. fwdslsh has no affiliation with the companies that make these agents. We use their agents the same way we use any other tool.

Draft policy for contributions to supported tools:

1. **Disclose.** Say in the pull request when an agent drafted any meaningful part of it.
2. **Name an accountable human.** A person posts the pull request, reads every line of it, answers review comments and owns the result.
3. **No autonomous-agent pull requests.** An agent may draft a change. A person decides to send it. Pull requests opened by an agent with no human behind them will be closed.

## Funding

fwdslsh holds no money, takes no donations and pays no one. Members may accept support for their own work through their own GitHub Sponsors pages, and a supported tool's repo may point to its author's page.

## Contact

We work in the open on GitHub: [github.com/fwdslsh](https://github.com/fwdslsh) for unify and rabit, and [github.com/itlackey/akm](https://github.com/itlackey/akm) for akm. Report bugs and propose features in each tool's own repo.

- [Join fwdslsh](/join.html) as a member, or propose a tool for support.
- [Read what "supported by fwdslsh" means](/supported.html).
