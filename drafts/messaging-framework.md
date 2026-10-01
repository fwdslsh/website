# fwdslsh messaging framework (draft for owner review, 2026-10-01)

Authority order: (1) the owner's intent, (2) facts.json safeClaims, (3) the report's recommendations. When the report disagrees with the owner, follow the owner and word it accurately. For example, "next epoch" goes in the hero, backed by specific claims.

---

## 1. Positioning statement

> **fwdslsh is a collective of independent developers building open-source tools for the next epoch of the web, where AI agents and people both publish, find and navigate it. Members share their work under one name and help each other build and maintain the tools "supported by fwdslsh". Today that is three: unify, rabit and akm.**

Short form (meta, footer, social): *A collective of independent developers building open tools for a web that agents and people both use.*

"Umbrella", as the owner means it: fwdslsh is a shared name and a shared home. Members list their work here and help each other maintain the supported tools. The tools stay with their authors. fwdslsh holds no money, no IP and no legal responsibility. Never use the word "umbrella" in copy.

"Open-source" covers the collective's aim, and unify and akm qualify (MPL-2.0). rabit's code is under CC-BY-4.0, which is not an OSI licence. Never call rabit itself "open-source software"; state its licence plainly instead.

---

## 2. Hero options

**A (recommended):**
- **H1:** Slash a path to the next epoch of the web.
- **Subhead:** Agents now read, build and navigate the web alongside people, on pages that were made for eyes. fwdslsh is a collective of independent developers building small, open tools for that shift, and helping each other maintain them. Today we support unify, rabit and akm.

Why A: it keeps the "/" path identity and evolves the current "Slash a path through the bloat". It puts the owner's "next epoch" in the hero. The subhead names a concrete problem and the three tools.

**B:**
- **H1:** The web's next reader is an agent.
- **Subhead:** fwdslsh is a collective of independent developers building open tools so AI agents, and the people using them, can publish, find and navigate the web. unify builds plain-HTML sites agents can author. rabit gives a site a map. akm gives agents one library of skills.

**C:**
- **H1:** / small tools for the next epoch
- **Subhead:** Pages built for eyes. Sites with no map. Agent skills scattered across every tool. We're independent developers fixing those one small, open tool at a time, together.

All three can be checked against the claims in section 3. None uses a number.

---

## 3. "The next epoch" in concrete terms

| # | The problem (checkable) | What a supported tool does today | Source (facts.json safeClaims) | Status |
|---|---|---|---|---|
| 1 | **Pages are built for eyes, and agents must parse them.** Script-heavy pages and guessed metadata make content hard to read reliably. | **unify** outputs the author's own HTML and adds no JavaScript of its own. It builds sitemap.xml, an Atom feed and JSON-LD only from facts the page declares, and nothing is guessed. `--catalog` and `--search-corpus` write machine-readable JSON about every page. | unify safeClaims 1, 7, 8 | Shipped (npm 0.9.0, pre-1.0) |
| 2 | **Authors have no map of what exists.** Agents crawl and guess where content lives. | **rabit** is a small JSON manifest convention (`.burrow.json` / `.warren.json`). It tells agents what content exists and where, so they don't have to crawl. An optional `agents` block gives a context line, a suggested entry point and hints, and an optional `.burrow.md` gives people the same map. fwdslsh.dev publishes its own burrow and warren at `/.well-known/`. | rabit safeClaims 1, 4, 5, 7 | Shipped as a **draft** spec (0.4.0) plus a Bun client/CLI on npm. The MCP server and OpenCode plugin are in the repo but **not published**. Publishing them is an aspiration. |
| 3 | **Agent capabilities are scattered.** Skills, scripts and instructions live per tool, per agent and per project. | **akm** is a local-first CLI that gives any coding agent that can run shell commands one searchable library of skills, scripts, workflows and knowledge. It indexes existing Claude Code/OpenCode directories and Agent Skills packages in place, read-only. Agents curate a shortlist, then show by ref, loading only what the task needs. | akm safeClaims 1, 2, 3 | Shipped (akm-cli 0.9.21, pre-1.0) |
| 4 | **Tools are documented for people, and agents guess wrong.** | **unify**'s whole authoring surface is five things, with rules that fit in sixty lines. Those rules were tested by giving AI agents only the rules in isolated sandboxes and judging the result with the real build, and the findings changed the product. `unify init` writes an AGENTS.md. **akm** writes its own agent instructions (`akm help agents >> AGENTS.md`). | unify 2, 3, 4, 5; akm 6 | Shipped |
| 5 | **Agents need results machines can check, not prose to scrape.** | `unify audit` can emit JSON and SARIF 2.1.0 with stable fingerprints per finding. A unify build that finds a problem publishes nothing, and exit 0 means the output folder is the complete site. akm improvements are proposed for review, not applied silently. | unify 6, 9; akm 5 | Shipped |

**Aspirations. Label them as such ("next", "planned", "we want"), never as features:**
- The three tools working together: unify emitting a rabit burrow, akm reading burrows or unify feeds. None of this exists in code today.
- rabit's MCP server published to npm.
- At least two people able to review and release each supported tool. No tool meets this today.

"Humans by extension" holds for all three, and pages may say so: unify's output is ordinary HTML, rabit has `.burrow.md`, and akm keeps capabilities as ordinary files and proposes changes for people to review.

---

## 4. Vocabulary

**Use:**
- collective; collaborative / "we build collaboratively"; independent developers
- members; "help each other build and maintain"
- supported by fwdslsh; the next epoch of the web; agents and people
- publish, find, navigate; path / "/"
- draft (rabit); pre-1.0 (unify, akm); lives in its author's account (akm)

**Avoid, and why:**

| Avoid | Why |
|---|---|
| co-op, cooperative, co-operative (noun, name, title or self-description) | Legally restricted in names and "holding out" in several jurisdictions. fwdslsh has no entity, no ownership and no vote. |
| foundation, institute, company, Inc., member-owned, democratically governed | Each implies a legal form or process that doesn't exist. |
| umbrella / umbrella entity | Means a fiscal host that holds money. fwdslsh holds none. |
| official, endorsed, certified | Implies a review or authority fwdslsh doesn't exercise. "Official" is allowed only inside a quotation. |
| a fwdslsh tool / built by fwdslsh (for akm) | akm lives at itlackey/akm. |
| standard, protocol, RFC (rabit); "Gopher protocol for the AI age"; "guaranteed to understand" | rabit is a draft convention. Its own docs say "not an RFC". |
| zero deps / zero dependencies | False for all three tools. |
| stable, 1.0, production-ready | All three are pre-1.0 or draft. |
| agent-first SSG / AI SSG (unify) | unify's stated audience is front-end designers and hobbyists. Say "designed so agents author it correctly too". |
| revolutionary, game-changing, next-gen, unleash, supercharge, seamless, cutting-edge, guaranteed | Banned hype. |
| any download, star, user or adoption numbers | None verified. |
| any AAIF, Linux Foundation, Anthropic or OpenAI affiliation or logo | None exists. Naming MCP, AGENTS.md or Agent Skills as formats is fine. |
| "Retrieval Augmented Bits" / "RBT" | The two expansions conflict and neither is verified. Use plain "rabit". |
| Windows binary (unify); Node / single binary (rabit); MCP server (akm); "integrates with unify/rabit" (akm) | All false. |

**Fixed phrases (use verbatim):**
- **Affiliation line (pages and READMEs):** "{tool} is supported by fwdslsh. [What that means](/supported.html)." In READMEs, use `https://fwdslsh.dev/supported/` as the link.
- **akm line:** "akm is supported by fwdslsh. It lives in its author's account at github.com/itlackey/akm."
- **Non-endorsement line (members' own repos):** "Listed by their authors. Not reviewed or supported by fwdslsh."
- **How fwdslsh is organized:**
  > fwdslsh is a collective, not a company, co-op or foundation. It has no legal entity, holds no money and owns no member's code. Supported tools stay with their authors and under their licences. Members share their work here and help each other review, release and maintain the tools we support. If we ever accept money, we will use a public fiscal host and say so on this page.

---

## 5. Voice rules

Keep the old voice's terseness, the "/" path, and craft over hype. Drop its false claims. Every sentence should be something a reader could check in a repo.

| Do | Don't |
|---|---|
| "A collective of independent developers." | "An open-source co-op uniting indie devs worldwide." |
| "unify adds no JavaScript of its own to your site." | "Zero deps, instant setup." |
| "rabit is a small JSON manifest convention, a draft at 0.4.0." | "The Gopher protocol for the AI age." |
| "The repo includes an MCP server; it isn't published to npm yet." | "Install the rabit MCP server." |
| "akm is supported by fwdslsh; it lives in its author's account." | "akm, a fwdslsh tool." |
| "Works with formats like MCP, AGENTS.md and Agent Skills." (name the specific one per tool) | "Aligned with the Agentic AI Foundation." |
| "We help each other review, release and hand over tools." | "Your project will never fall out of maintenance." |
| "Agents now navigate the web alongside people. Here's what we built for that." | "Unleash the agentic future." |

Mechanics:
- Short sentences.
- Lowercase tool names: fwdslsh, unify, rabit, akm.
- "license" (US spelling, matching LICENSE files and "organized").
- No exclamation marks, no emoji.

---

## 6. Page plan

All pages follow these rules:
- Frontmatter has only `title` and `description` (120–160 chars). Quote any value containing a colon.
- One `# ` heading.
- Internal links point to `.html` files.
- Review notes use the form `> **Review note:** ...`.

### index (`/index.html`)
- **title:** `fwdslsh`. Alternative: `Slash a path to the next epoch of the web`.
- **description:** "fwdslsh is a collective of independent developers building open-source tools that help AI agents and people publish, find and navigate the web." (143)
- **Purpose:** state the positioning and send readers to tools, members and join.
- **Audience:** developers and agent builders arriving cold. Agents too: keep the text plain.
- **Key messages:**
  1. The next epoch: agents and people both use the web.
  2. We are a collective of independent developers.
  3. Three supported tools, each solving a concrete problem.
  4. Members help each other maintain them.
  5. Join.
- **Sections in order:**
  1. Hero (option A).
  2. "What's broken, what we built": problems 1–3 from section 3, one line each, each linked to its tool.
  3. "Supported by fwdslsh": three short cards (name, one line, status), linking to /tools.html.
  4. "A collective, not a company": a short version of the organized statement, linking to /about.html.
  5. "Members": "Founding member: itlackey", linking to /members.html.
  6. Call to action.
- **Calls to action:** "See the tools" → /tools.html. "Join" → /join.html. Secondary: "Read the rabit docs" → /rabit/index.html.
- **Review notes:** none required. Optional: confirm hero A.

### tools (`/tools.html`)
- **title:** `Tools`
- **description:** "The tools supported by fwdslsh: unify, rabit and akm. What each one does today, its status, license, version, and who maintains it." (131, quote it)
- **Purpose:** an honest card for each supported tool, then members' other repos, kept visibly separate.
- **Key messages:**
  1. Exactly three tools are supported.
  2. Each states its status honestly.
  3. akm lives in its author's account.
  4. Members' other repos are listed but not supported.
- **Sections in order:**
  1. Intro: one line plus a link to /supported.html.
  2. "Supported by fwdslsh": the unify, rabit and akm cards.
  3. "How they fit": three layers (publishing, discovery, agent-side capability). Say they are independent today and meet only on fwdslsh.dev (built with unify, publishing a rabit burrow).
  4. "From our members": empty or opt-in entries, with the non-endorsement line.
- **Card fields:** name, one-line description, status label, license, version (as of 2026-10-01), where it lives, maintainers, links, affiliation line.

| Field | unify | rabit | akm |
|---|---|---|---|
| One line | HTML-native static site generator: plain HTML in, plain HTML out, no JavaScript of its own, rules an agent can author from. | A small JSON manifest convention that tells agents what content exists and where, so they don't have to crawl. | akm (Agent Knowledge Manager): a local-first CLI that gives any shell-capable coding agent one searchable library of skills, scripts, workflows and knowledge. |
| Status label | Active · pre-1.0 | Draft spec · 0.4.0 (see review note) | Active · pre-1.0 |
| License | MPL-2.0 | CC-BY-4.0 (spec and code) | MPL-2.0 |
| Version (2026-10-01) | 0.9.0 on npm (`@fwdslsh/unify`, 2026-08-26) | Spec 0.4.0, draft, dated 2026-01-13; `@fwdslsh/rabit-client` 0.4.0 | 0.9.21 on npm (`akm-cli`, 2026-10-01) |
| Lives at | github.com/fwdslsh/unify | github.com/fwdslsh/rabit | github.com/itlackey/akm (a member's repo) |
| Maintainers | itlackey | itlackey | itlackey (author) |
| Install | `npm install -g @fwdslsh/unify` or the Linux/macOS binary script | No install needed to publish a manifest (it's a JSON file); client: `bun add -g @fwdslsh/rabit-client` (requires Bun) | `npm install -g akm-cli` (Node >= 22) or the binary for Linux, macOS or Windows |
| Links | Docs https://unify.fwdslsh.dev/, repo, npm | /rabit/index.html, repo, npm (client) | Repo, npm |
| Agent-facing note | Rules ratified by agent trials; `init` writes AGENTS.md; audit as JSON/SARIF | `agents` block; MCP server and OpenCode plugin in repo, not on npm | `akm help agents >> AGENTS.md`; curate → show |

- **Calls to action:** each card's docs and repo links. "Propose a tool" → /join.html.
- **Review notes (required):**
  - **rabit status.** The last visible commit is 2026-01-15, docs have drifted from the CLI, and the code is CC-BY-4.0 (not OSI). Decide whether rabit is "Active (draft)" or "Dormant". Recommended default: "Draft spec · 0.4.0" now, with a dated plan to publish rabit-mcp, fix the README and install drift, and relicense the code packages to an OSI licence (keeping CC-BY-4.0 for the spec text).
  - **"Supported since" dates.** No record exists. Recommended default: the launch month of this page (2026-10) for all three.
  - **unify 0.9.1.** It is in the repo but not on npm. Publish it, or keep the card at 0.9.0.

### supported (`/supported.html`)
- **title:** `Supported by fwdslsh`
- **description:** "What 'supported by fwdslsh' means: the criteria a tool meets, what members commit to, and how a tool joins, goes dormant or leaves." (131, quote it)
- **Purpose:** define the umbrella idea precisely enough that it can't be read as endorsement, ownership or a guarantee.
- **Key messages:**
  1. Support means members help build, review, release and maintain the tool.
  2. Not every member repo is supported. Today only three tools are.
  3. Tools stay with their authors.
  4. There are written criteria, and today's gaps are stated.
  5. Leaving is normal.
- **Sections in order:**
  1. What it means: a definition paragraph and the affiliation line.
  2. What it does not mean: no ownership, no money, no guarantee of fixes, not an endorsement or certification.
  3. Criteria, from report 4.3:
     - OSI licence for code
     - README, CHANGELOG and versioning policy
     - SECURITY.md with an acknowledgement window
     - CI
     - code of conduct
     - agent instructions
     - two people who can release
     - succession clause
  4. Where each tool stands today: an honest table. No tool meets the two-releasers rule. None has a code of conduct. rabit's code licence is CC-BY-4.0. akm's SECURITY.md promises acknowledgement within 72 hours.
  5. What supporting members commit to: review on request, acknowledge security reports, an annual check-in. No push access by default.
  6. What a supported tool gets: a listing here and in warren.json, review help, a second pair of eyes on releases, shared promotion.
  7. Lifecycle: Active, Dormant (six months with no release and no check-in), Withdrawn (dated notice).
  8. How to propose or leave: a link to /join.html.
- **Calls to action:** "Propose a tool" → /join.html. "See the tools" → /tools.html.
- **Review notes (required):**
  - **Criteria.** Adopt, trim or soften the criteria list. Recommended default: publish all eight, marked "target", with a dated plan.
  - **Succession clause.** The unreachability period is undecided. Recommended default: 90 days.

### members (`/members.html`)
- **title:** `Members`
- **description:** "The independent developers in the fwdslsh collective, with links to their GitHub profiles and the repositories they choose to list." (131)
- **Purpose:** the owner wants this page now. Present it honestly as a founding member plus an open invitation, not styled as a crowd.
- **Key messages:**
  1. Members are independent developers who share their work here.
  2. Members write their own bios.
  3. Members' own repos are not supported unless listed on /tools.html.
- **Sections in order:**
  1. Intro: two lines.
  2. "Founding member": itlackey's card.
  3. "From our members": repos the member chooses to list, under the non-endorsement line.
  4. "Become a member" → /join.html.
  5. The template, as an HTML comment or a Review note for the owner.
- **itlackey card (verifiable facts only):**
  - **Name:** itlackey ([github.com/itlackey](https://github.com/itlackey))
  - **Bio:** *Placeholder: itlackey to write one line.*
  - **Maintains (supported):** unify, rabit, akm (author of akm; npm maintainer of `@fwdslsh/unify`, `@fwdslsh/rabit-client` and `akm-cli`)
  - **Website:** *placeholder*
  - **Member since:** *placeholder* (founding member)
  - **Own repos listed:** *none yet, itlackey to choose*
- **Member template (for the owner):**
  ```
  - **Name:** {display name} ([github.com/{handle}](https://github.com/{handle}))
  - **Bio:** {one line, written by the member}
  - **Maintains (supported):** {supported tools only, or "—"}
  - **Website:** {optional URL}
  - **Member since:** {YYYY-MM}
  - **Own repos listed:** {opt-in links; shown under "From our members"}
  ```
- **Review notes (required):**
  - **Display name.** Confirm itlackey's display name (commit history also shows "IT Lackey") and get the bio from him.
  - **fwdslsh-dev.** Confirm whether fwdslsh-dev is a separate person. Default: don't list it.
  - **Other members.** Add the other members you know using the template, each with their consent and their own bio. Default: list no one unconfirmed.
- **Never:** invent members, bios, quotes, locations, stats or avatars beyond the GitHub link.

### about (`/about.html`)
- **title:** `How fwdslsh works`
- **description:** "How fwdslsh is organized: a collective with no legal entity, no money and no ownership of members' code, and how we work with AI agents." (136, quote it)
- **Purpose:** state the organization plainly, including the bus factor and the AI-contribution stance.
- **Key messages:**
  1. A collective, not a company, co-op or foundation.
  2. The "/" means a path: plain, comprehensible, composable tools.
  3. Who holds the keys today.
  4. We build with AI agents, and say so.
  5. Funding: none collectively.
- **Sections in order:**
  1. The organized statement, verbatim.
  2. Why "/": the principles, rewritten. Keep "comprehensible, reliable, composable". Drop "zero deps" and "ship binaries, not ecosystems".
  3. Stewards and credentials.
  4. How we use AI agents. Say openly that most visible unify commits are authored by Claude. Proposed policy: disclosure, a named accountable human, no autonomous-agent PRs.
  5. Funding: none collectively; members may use their own GitHub Sponsors.
  6. Contact: GitHub.
- **Calls to action:** "Join" → /join.html. "What supported means" → /supported.html.
- **Review notes (required):**
  - **Second steward.** Name one. Default: state honestly that itlackey is the only steward today, with a target date for a second.
  - **AI-contribution policy.** Decide whether agent-drafted PRs from outsiders are welcome. Default: welcome with disclosure and a named human; no autonomous PRs.
  - **Funding.** Default: "none collectively".

### join (`/join.html`)
- **title:** `Join`
- **description:** "How to join fwdslsh as a member or propose a tool for support. Both paths start with a public GitHub issue and are decided in the open." (135)
- **Purpose:** two clear paths, kept separate.
- **Key messages:**
  1. Membership and tool support are separate.
  2. Requirements are written down: a human as best we can tell, expressed interest, accept the code of conduct.
  3. Membership is not push access.
  4. Proposing a tool means meeting, or planning to meet, the criteria.
- **Sections in order:**
  1. Two paths at a glance.
  2. Become a member: requirements, two existing members vouch, what you get, what you commit to.
  3. Propose a tool for support: link to the /supported.html criteria; the tool stays in your account.
  4. List your own repos: opt-in, shown with the non-endorsement line.
  5. Leaving: any time, by issue.
- **Calls to action:** "Open a membership issue". "Propose a tool".
- **Review notes (required):**
  - **Where the issues go.** No issue templates exist yet. Pick the repo. Default: github.com/fwdslsh/.github with two templates.
  - **Vouching.** The two-voucher rule can't work with one member. Default: "the stewards decide" until there are three members.
  - **Code of conduct.** None exists. Default: adopt Contributor Covenant 2.1 before launch.

---

## 7. Facts every page must keep consistent

- **Names:** fwdslsh, unify, rabit, akm, always lowercase. The akm long form is "akm (Agent Knowledge Manager)". Don't expand "rabit". The site is "fwdslsh.dev".
- **Supported tools:** exactly unify, rabit and akm. unify and rabit are in the fwdslsh GitHub org; akm is at itlackey/akm.
- **Versions as of 2026-10-01:**
  - unify: 0.9.0 on npm (`@fwdslsh/unify`). The repo has 0.9.1, which is not on npm.
  - rabit: spec 0.4.0, status Draft, dated 2026-01-13. `@fwdslsh/rabit-client` 0.4.0 is the only package on npm.
  - akm: `akm-cli` 0.9.21, released 2026-10-01.
- **Licenses:** unify MPL-2.0; akm MPL-2.0; rabit CC-BY-4.0 (spec and code); site content CC-BY-4.0.
- **Install commands:**
  - unify:
    - `npm install -g @fwdslsh/unify`
    - `npx @fwdslsh/unify build`
    - `bun add -g @fwdslsh/unify`
    - binary (Linux/macOS, x86_64 and arm64): `curl -fsSL https://raw.githubusercontent.com/fwdslsh/unify/main/install.sh | bash`
    - No Windows binary.
  - rabit: no install needed to publish a manifest. Client: `bun add -g @fwdslsh/rabit-client` or `bunx @fwdslsh/rabit-client <command>` (Bun only; the CLI is `rabit`). No npm install exists for rabit-mcp or opencode-rabit.
  - akm:
    - `npm install -g akm-cli` (Node >= 22; uses Bun when present)
    - binary on Linux/macOS: `curl -fsSL https://github.com/itlackey/akm/releases/latest/download/install.sh | bash`
    - binary on Windows: `irm https://github.com/itlackey/akm/releases/latest/download/install.ps1 | iex`
    - The CLI is `akm`.
- **Runtimes:** unify runs on Node >= 22.12.0 or Bun >= 1.2.0 with byte-identical output. rabit tooling is Bun only. akm needs Node >= 22 or a binary.
- **URLs:**
  - https://fwdslsh.dev
  - https://unify.fwdslsh.dev/
  - https://github.com/fwdslsh
  - https://github.com/fwdslsh/unify
  - https://github.com/fwdslsh/rabit
  - https://github.com/itlackey/akm
  - https://github.com/itlackey
  - npm: https://www.npmjs.com/package/@fwdslsh/unify, https://www.npmjs.com/package/@fwdslsh/rabit-client, https://www.npmjs.com/package/akm-cli
  - fwdslsh.dev's own manifests: `/.well-known/burrow.json` and `/.well-known/warren.json`
- **Don't link Docker Hub images.** They are unchecked. The current nav has a Docker Hub icon; flag it to the owner.
- **Verified members:** only itlackey.
- **Cross-page follow-ups to flag (not page copy):**
  - The footer "rabit • unify" should become "unify • rabit • akm".
  - Add akm to warren.json and fix its `digthub` tag typo.
  - The site-wide default meta description in `_includes/base/head.html` still says "Zero deps".
  - The website CLAUDE.md says the site lists two tools.
  - The org profile has "where" for "were" and "tatical" for "tactical", and claims "Zero deps".
