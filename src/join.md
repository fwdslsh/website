---
title: Join
description: How to join fwdslsh as a member or propose a tool for support. Both paths start with a public GitHub issue, and the decision is recorded there.
class: prose
---

# Join

fwdslsh is a collective of independent developers building open tools for the next epoch of technology, where AI agents and people both publish, find and navigate the web. We are small. Today there is one member, the founding member itlackey, and three supported tools: unify, rabit and akm. That is where we start, and it is why we want more people.

You can come in two ways, and each is decided separately. Being a member does not put your tools on the supported list. Having a supported tool does not make you a member.

## Two paths at a glance

- **Become a member.** You are an independent developer who wants to share your work here and help maintain the tools we support.
- **Propose a tool for support.** You maintain a tool and want members to help build, review, release and maintain it. [What supported means](/supported.html).

Both start with a public GitHub issue, and the decision is recorded on that issue.

> **Review note:** No issue templates exist yet. Pick the repo they will live in. Recommended default: github.com/fwdslsh/.github with two templates, "Membership" and "Tool proposal". Then point the two links below at those templates. Also confirm that issues are enabled on github.com/fwdslsh/.github before linking to `/issues/new/choose`.

## Become a member

> **Draft.** The membership rules below are a draft. fwdslsh is one member today, itlackey, and we will tune these rules with the members who join.

**Who it is for:** independent developers who care about tools for a web that agents and people both use. You don't need a big project or a following.

**Requirements:**

1. You are a human, as best we can tell. You can use agents in your work, but agents are not members, and a person answers for every contribution. [How we use AI agents](/about.html).
2. Your issue says why you want to join.
3. You accept the code of conduct.

> **Review note:** No code of conduct exists yet. Recommended default: adopt Contributor Covenant 2.1 in github.com/fwdslsh/.github (so it covers the org) and in akm's repo before this page goes live, and link it from requirement 3.

**How to apply:** [Open a membership issue](https://github.com/fwdslsh/.github/issues/new/choose). Include your GitHub handle, one line about what you build, links to your public repos, and a statement that you accept the code of conduct.

**Vouching:** two existing members vouch for you in the issue. Until there are three members, the [steward](/about.html) decides.

**What you get:** a card on [Members](/members.html) with a bio you write yourself, a place to share your work, and members you can ask for review, as time allows.

**What you commit to:** help where you can. That means reviewing on request, answering questions in your area, and keeping your card current.

**Membership is not push access.** Joining gives you no write access to any repository or package. Rights on a supported tool come only by invitation from that tool's maintainers, one tool at a time.

Today itlackey maintains all three supported tools. [How fwdslsh works](/about.html) says who holds which keys.

## Propose a tool for support

Support means members help build, review, release and maintain a tool. It is not an endorsement. The tool stays in your account and under your license. akm already works this way: it is supported by fwdslsh and lives in its author's account at [github.com/itlackey/akm](https://github.com/itlackey/akm).

Read the [criteria](/supported.html) first. A tool should meet them or have a dated plan to meet them. None of today's three tools meets every criterion yet, and that page shows where each one stands.

[Propose a tool](https://github.com/fwdslsh/.github/issues/new/choose) with an issue that includes:

- the repo link and its license
- what the tool does today, in one or two sentences, plus its current version and status
- the concrete problem it solves for agents, people or both, and how that fits the next epoch we describe on [the home page](/index.html)
- which criteria it meets now, and a dated plan for the rest
- who can review and release it today, and who else could
- the agent instructions it ships, if any (an AGENTS.md or equivalent)

## List your own repos

Members can also list other repos of their choosing on the members page, under "From our members". Listing is opt-in, and those repos carry this line: "Listed by their authors. Not reviewed or supported by fwdslsh."

## Other ways to help

You don't need to join to help.

- **Try the tools and file issues.** Start with [unify](https://github.com/fwdslsh/unify), [rabit](https://github.com/fwdslsh/rabit) or [akm](https://github.com/itlackey/akm). A clear report with steps to reproduce goes a long way.
- **Review.** Read an open pull request and say what you see.
- **Fix the docs.** Correct anything that is wrong or unclear. rabit's docs have drifted from its CLI, so that is a good place to start.
- **Tell us what agents get wrong.** If an agent misreads our docs, open an issue with what it was given and what it did. unify already tests its authoring rules this way, and those findings have changed the product.

## Leaving

Members can leave at any time by opening an issue. Authors can take a tool off the supported list the same way. Leaving is a normal path.
