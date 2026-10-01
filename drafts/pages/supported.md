---
title: Supported by fwdslsh
description: "What 'supported by fwdslsh' means: the criteria a tool meets, what members commit to, and how a tool joins, goes dormant or leaves."
---

# Supported by fwdslsh

fwdslsh is a collective of independent developers building open tools for a web that agents and people both use. Members share their work under one name and help each other build and maintain a few of those tools. A tool that is supported by fwdslsh has members of the collective helping to build, review, release and maintain it.

The tool stays where it already lives, under its own license: unify and rabit in the fwdslsh GitHub organization, akm in its author's account.

Not every member's repo is supported. Members can list their own repos on [the members page](/members.html), marked "Listed by their authors. Not reviewed or supported by fwdslsh." Today exactly three tools are supported: [unify](https://github.com/fwdslsh/unify), [rabit](/rabit/index.html) and [akm](https://github.com/itlackey/akm).

Each supported tool will carry one fixed line in its README and on this site:

> {tool} is supported by fwdslsh. [What that means](/supported.html).

In a README, the link is `https://fwdslsh.dev/supported/`. akm also says where it lives: "akm is supported by fwdslsh. It lives in its author's account at github.com/itlackey/akm."

## What it does not mean

- fwdslsh has no legal entity, so it holds no copyright or trademark in any tool. The unify and rabit repositories sit in the fwdslsh GitHub organization and use the @fwdslsh npm scope. akm sits in its author's account.
- fwdslsh holds no money and pays no one.
- Nobody promises fix times. We promise to acknowledge a report, not to fix it by a date.
- Support is not an endorsement or a certification. It means people are helping to maintain the tool. It does not mean anyone audited it.

## Criteria

A supported tool meets these, or has a dated plan to meet them:

1. **An OSI-approved license for its code.**
2. **A README, a CHANGELOG and a versioning policy.** The README says what the tool is and isn't.
3. **A SECURITY.md** that names a contact and an acknowledgement window.
4. **CI that runs the tests on every change.**
5. **A code of conduct.**
6. **Agent instructions** (an AGENTS.md or equivalent), and the tool works with at least one open agent format, such as MCP, AGENTS.md or Agent Skills.
7. **At least two people who can review and release.**
8. **A written succession clause.** If the author can't be reached for a stated period, named members may publish security fixes or point users to a maintained fork.

> **Review note:** Decide how strict these criteria are. Recommended default: publish all eight as targets, and add a date for every 'No' and 'Partial' in the table before launch. Add a SECURITY.md to unify, and update rabit's (it still lists 0.3.x). The code of conduct and rabit's code license are separate decisions, on /join.html and under Lifecycle.

> **Review note:** The succession clause needs an unreachability period. Recommended default: 90 days. The clause only has teeth once a second person can release, so agree it with itlackey and name that second person.

## Where each tool stands today (2026-10-01)

| Criterion | unify | rabit | akm |
|---|---|---|---|
| OSI license for code | Yes, MPL-2.0 | No. Spec and code are CC-BY-4.0 | Yes, MPL-2.0 |
| README, CHANGELOG, versioning | Yes. The CHANGELOG follows SemVer, pre-1.0 | README yes. No CHANGELOG. The spec is versioned (0.4.0, Draft) | Yes. CHANGELOG plus STABILITY.md, pre-1.0 |
| SECURITY.md with acknowledgement window | No | `docs/SECURITY.md` aims to respond within 48 hours. It still lists 0.3.x as supported | Yes. Acknowledgement within 72 hours |
| CI on every change | Yes | Partial. Tests run only in the client's publish workflow | Yes |
| Code of conduct | No | No | No |
| Agent instructions and an open format | Yes. `unify init` writes AGENTS.md | Partial. No AGENTS.md. The spec has an `agents` block, and an MCP server is in the repo but not on npm | Yes. AGENTS.md, and it reads Agent Skills packages |
| Two people who can release | No | No | No |
| Succession clause | No | No | No |

No tool meets every criterion yet. None has a code of conduct, and none has two people who can release. Today itlackey ([members](/members.html)) is the only person who can publish releases of all three. Closing that gap is the point of the collective: the next member who can review and release makes every supported tool safer.

## What supporting members commit to

- Review pull requests when a tool's maintainers ask.
- Acknowledge security reports within the tool's stated window.
- Confirm each tool's status in an annual check-in.

Members do not get push or publish access by default. A tool's maintainers can invite a member to take on more, one tool at a time, based on recent work.

## What a supported tool gets

- A listing on [/tools.html](/tools.html) and in fwdslsh.dev's `/.well-known/warren.json`.
- Help with reviews, and a second pair of eyes on releases.
- The succession clause, once a second person can release.
- A mention on fwdslsh.dev and the fwdslsh GitHub organization profile.

> **Review note:** akm is not in warren.json yet. Add it, and fix the `digthub` tag typo, before this page goes live. Recommended default: add an akm entry pointing at github.com/itlackey/akm.

## Lifecycle

Every supported tool shows one status label:

- **Active.** Releases or check-ins are happening, and every unmet criterion has a dated plan in the table above (dates to be added before launch).
- **Dormant.** Six months with no release and no response to the check-in. The tool stays listed, labeled honestly.
- **Withdrawn.** No longer supported. A short, dated notice on [/tools.html](/tools.html) and in the README says the tool is no longer supported, that no one is acknowledging security reports, and where to find alternatives.

Leaving is normal. An author can withdraw a tool at any time by opening an issue. The code stays where it always was.

> **Review note:** Confirm the dormancy period. Recommended default: six months with no release and no check-in. rabit's spec 0.4.0 is dated 2026-01-13 and its last visible commit is 2026-01-15, more than six months ago, and no check-in has happened yet. Recommended default: record a first check-in for rabit at launch with a dated plan (publish rabit-mcp, fix the README and install drift, and relicense the code packages under an OSI license while keeping CC-BY-4.0 for the spec) and keep the "Draft spec · 0.4.0" label. Otherwise, label it Dormant.

## Propose a tool

Open an issue that says which criteria the tool meets and gives a dated plan for the rest. Details are on [/join.html](/join.html).

[Propose a tool](/join.html) · [See the tools](/tools.html)
