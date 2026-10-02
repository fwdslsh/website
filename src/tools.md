---
title: Tools
description: "The tools supported by fwdslsh: unify, rabit and akm. What each one does today, its status, license, version, and who maintains it."
class: prose
---

# Tools

These are the tools the fwdslsh collective supports, for a web that agents and people both use. Supported by fwdslsh means members help review, release and maintain a tool, while it stays with its author and under its own license. It is not an endorsement, a certification or a promise of fixes. Today itlackey maintains all three alone, and we're working toward a second reviewer for each. [The full definition and criteria](/supported.html).

> **Review note:** We have no record of when each tool became supported. Recommended default: show "Supported since 2026-10", the month this page launches, on all three cards. Show it on the index.md cards too, or on neither page.

## Supported by fwdslsh

### unify

An HTML-native static site generator. HTML (or Markdown) goes in, plain HTML comes out, and it adds no JavaScript of its own. Its rules are short enough for an agent to author from.

- **Status:** Active · **Maturity:** pre-1.0
- **License:** MPL-2.0
- **Version:** 0.9.0 on npm (`@fwdslsh/unify`), as of 2026-10-01
- **Lives at:** [github.com/fwdslsh/unify](https://github.com/fwdslsh/unify)
- **Maintainers:** itlackey
- **Install:** `npm install -g @fwdslsh/unify` or `npx @fwdslsh/unify build` (needs Node >= 22.12.0 or Bun >= 1.2.0; the output is byte-identical on both). The Linux/macOS binary needs no runtime: `curl -fsSL https://raw.githubusercontent.com/fwdslsh/unify/main/install.sh | bash`. There's no Windows binary yet.
- **Links:** [Docs](https://unify.fwdslsh.dev/) · [Repo](https://github.com/fwdslsh/unify) · [npm](https://www.npmjs.com/package/@fwdslsh/unify)

**For agents and for people.** The whole authoring surface is five things, and the rules fit in sixty lines. Those rules were tested by giving AI agents only the rules in isolated sandboxes and judging their sites with the real build, and the findings changed the product. `unify init` writes an AGENTS.md. `unify audit` can emit JSON and SARIF 2.1.0 with stable fingerprints, and a build that finds a problem publishes nothing. Sitemaps, feeds and JSON-LD come only from facts the page declares. For people, the output is ordinary HTML, and unify adds no script to it.

unify is supported by fwdslsh. [What that means](/supported.html).

> **Review note:** unify 0.9.1 is in the repo but not on npm. Either publish it, or keep this card at 0.9.0 (the default).

### rabit

A small JSON manifest convention that tells agents what content exists and where, so they don't have to crawl.

- **Status:** Active · **Maturity:** draft spec 0.4.0
- **License:** CC-BY-4.0 (spec and code)
- **Version:** spec 0.4.0, draft, dated 2026-01-13. `@fwdslsh/rabit-client` 0.4.0 on npm.
- **Lives at:** [github.com/fwdslsh/rabit](https://github.com/fwdslsh/rabit)
- **Maintainers:** itlackey
- **Install:** Publishing a manifest needs no install, because a manifest is a JSON file. The client and CLI need Bun: `bun add -g @fwdslsh/rabit-client`.
- **Links:** [Docs](/rabit/index.html) · [Repo](https://github.com/fwdslsh/rabit) · [npm (client)](https://www.npmjs.com/package/@fwdslsh/rabit-client)

**For agents and for people.** A burrow (`.burrow.json`) lists what a location holds, and a warren (`.warren.json`) points to burrows. Both can live at `.well-known/`. The spec gives examples for HTTP(S), Git and the local filesystem. An optional `agents` block gives a context line, a suggested entry point and hints. An optional `.burrow.md` gives people a readable guide to the same content. An agent that reads the manifest knows what's there without crawling. Today the way to do that is the `rabit` CLI. The repo also includes an MCP server and an OpenCode plugin, but neither is published to npm yet. fwdslsh.dev publishes its own burrow and warren at `/.well-known/`.

rabit is supported by fwdslsh. [What that means](/supported.html).

> **Review note:** rabit's status (Active or Dormant) is decided on /supported.html, under Lifecycle. Update this card to match.

### akm

akm (Agent Knowledge Manager) is a local-first CLI that gives any coding agent that can run shell commands one searchable library of skills, scripts, workflows and knowledge.

- **Status:** Active · **Maturity:** pre-1.0
- **License:** MPL-2.0
- **Version:** 0.9.x on npm (`akm-cli`); 0.9.21 as of 2026-10-01. It releases often, so check npm for the latest.
- **Lives at:** [github.com/itlackey/akm](https://github.com/itlackey/akm), a member's repo
- **Maintainers:** itlackey (author)
- **Install:** `npm install -g akm-cli` (needs Node >= 22). The binaries need no runtime. On Linux and macOS: `curl -fsSL https://github.com/itlackey/akm/releases/latest/download/install.sh | bash`. On Windows: `irm https://github.com/itlackey/akm/releases/latest/download/install.ps1 | iex`.
- **Links:** [Repo](https://github.com/itlackey/akm) · [npm](https://www.npmjs.com/package/akm-cli)

**For agents and for people.** akm indexes your existing Claude Code and OpenCode directories and Agent Skills packages where they already are. It only reads them, so nothing has to be migrated. An agent curates a shortlist, then loads entries by ref, so it reads only what the task needs. `akm help agents >> AGENTS.md` writes akm's agent instructions into your AGENTS.md. Capabilities stay as ordinary files you can read. Improvements are proposed for you to review and are never applied silently. akm sends no remote telemetry, and it reaches the network only for sources and endpoints you configure.

akm is supported by fwdslsh. It lives in its author's account at github.com/itlackey/akm.

## How they fit

Agents and people both need to publish, find and navigate the web. unify covers publishing. rabit covers finding what a site holds. akm covers what an agent brings to the task: its skills, scripts and knowledge.

Today the three tools are independent, and none of them reads or writes another's files. Two of them meet in one place: this site, which is built with unify and publishes a rabit burrow and warren. akm isn't involved. Next, we want them to work together, for example unify writing a rabit burrow for each site it builds. None of that exists yet.

Have a tool that fits? [Propose a tool](/join.html).

## From our members

Members share their own work here too. Those repos are listed by their authors and aren't supported tools. A repo becomes supported only through [the support process](/supported.html).

*Listed by their authors. Not reviewed or supported by fwdslsh.*

No member repos are listed yet. See [Members](/members.html) for who's in the collective.

> **Review note:** Entries come from the "Own repos listed" field on each member's card on /members.html. Each one is the repo link plus one line written by its author, with no star or download counts. Recommended default: publish this section empty until itlackey or another member opts in.
