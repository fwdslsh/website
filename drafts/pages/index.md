---
title: Slash a path to the next epoch
description: fwdslsh is a collective of independent developers building open-source tools that help AI agents and people publish, find and navigate the web.
---

# Slash a path to the next epoch

We're entering a new epoch of technology: AI agents now read, build and navigate the web alongside people, on pages that were made for eyes. fwdslsh is a collective of independent developers building small, open tools for that shift, and helping each other maintain them. Today we support unify, rabit and akm.

[See the tools](/tools.html) · [Join](/join.html)

> **Review note:** This uses hero option A. The page title uses the framework's alternative title because the layout appends " · fwdslsh", so a plain `fwdslsh` title would render as "fwdslsh · fwdslsh". Recommended default: keep both as written.

## What's broken, what we built

- **Pages are built for eyes, and agents must parse them.** [unify](https://unify.fwdslsh.dev/) builds plain-HTML sites and adds no JavaScript of its own. When you ask it to, it also generates sitemap.xml, an Atom feed and JSON-LD, using only facts the page declares.
- **Sites have no map, so agents crawl and guess.** [rabit](/rabit/index.html) is a small JSON manifest convention that tells agents what content exists and where. This site publishes its own burrow and warren at `/.well-known/`.
- **Agent skills are scattered across tools and projects.** [akm](https://github.com/itlackey/akm) gives any shell-capable coding agent one searchable library of skills, scripts, workflows and knowledge. Agents curate a shortlist, then load only what the task needs.

People can use each tool too. unify's output is ordinary HTML. rabit defines an optional `.burrow.md` that gives people the same map. akm keeps capabilities as ordinary files and proposes changes for people to review.

## Supported by fwdslsh

### unify

Static site generator · Active · pre-1.0 · MPL-2.0 · [Docs](https://unify.fwdslsh.dev/) · [Details](/tools.html)

### rabit

Manifest convention · Active · draft spec 0.4.0 · CC-BY-4.0 · [Docs](/rabit/index.html) · [Details](/tools.html)

### akm

Agent Knowledge Manager · Active · pre-1.0 · MPL-2.0 · [Repo](https://github.com/itlackey/akm) · [Details](/tools.html)

akm is supported by fwdslsh. It lives in its author's account at github.com/itlackey/akm.

The three tools are independent today. unify and rabit meet on this site, which is built with unify and publishes a rabit burrow and warren. Read [what "supported" means](/supported.html).

## A collective, not a company

fwdslsh is a collective, not a company, co-op or foundation. It has no legal entity, holds no money and owns no member's code. Members share their work here and help each other review, release and maintain the tools we support.

[How fwdslsh works](/about.html)

## Members

Founding member: [itlackey](https://github.com/itlackey), who maintains unify, rabit and akm. itlackey is the only member today, and the invitation is open. Each member gets a profile and can share the repos they choose.

Members can also list their own repos on the members page, kept apart from the supported tools and marked 'Listed by their authors. Not reviewed or supported by fwdslsh.'

[Meet the members](/members.html)

## Join

If you build tools for agents and the people who use them, you can join as a member or propose a tool for support. Both paths will start with a public GitHub issue.

[Join fwdslsh](/join.html) · [See the tools](/tools.html) · [Read the rabit docs](/rabit/index.html)
