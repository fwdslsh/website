# fwdslsh: market research and positioning analysis

*Prepared 2026-10-01. This report draws on fact-checked research lanes and a product fact sheet compiled from the fwdslsh, unify, rabit and akm repositories and the npm registry. Some claims rest only on search results or come from hosts the researchers could not reach. Those claims are marked **(unverified)**.*

---

## 1. Executive summary

- **The best-known open-membership maintenance collective is shutting down.** Jazzband announced its sunset on 2026-03-14 and is archiving in early 2027. It gave two reasons. AI-generated spam made "open membership and shared push access untenable", and the group "was always a one-roadie operation". Those are the two failure modes fwdslsh must design against from day one.
- **The groups that are working spread admin power and write their rules down.** Django Commons has 3–10 admins, a rotating super-admin team, a "human as best as we can tell" membership rule, and published entry and exit rules. Vox Pupuli has an elected 5-person PMC and a checklist for handing over credentials. Pallets-Eco publishes a disclaimer saying what community status does *not* guarantee.
- **"Co-op" is a credential, not a description.** Every group in this research that calls itself a co-op is a legally constituted co-operative, checked by a network (CoTech, USFWC, Hypha, Motion Twin, Outlandish). Informal groups say "collective". Several jurisdictions restrict "cooperative" in names, or when a group holds itself out as one.
- **Supporting a repo the collective does not own has precedent.** The Guild keeps libraries under authors' own names. Nuxt lists 3rd-party modules where they live. e18e contributes to projects it does not own. That matches akm staying at `itlackey/akm`.
- **Agent standards are now run by large corporate foundations.** The Linux Foundation's Agentic AI Foundation (AAIF) has hosted MCP, goose and AGENTS.md since 2025-12-09, and an Agent Skills proposal is TC-approved but not yet contributed. fwdslsh is an indie counterpart to that world. It must never imply an affiliation.
- **The market is converging on MCP and AGENTS.md, not static agent text files.** On 2026-04-20 Astro's docs removed llms.txt, citing ~5k requests a week against >3M to their MCP server. This affects how rabit is positioned.
- **Recommended positioning:** *fwdslsh is a small collective of independent developers who build, and help each other maintain, open-source tools that make the web easier for AI agents, and the people using them, to publish, find and navigate.*
- **Risk 1: everything depends on one person.** itlackey is the sole npm maintainer of `@fwdslsh/unify`, `@fwdslsh/rabit-client` and `akm-cli`, and the only verified member. That is Jazzband's "one roadie" and Rome's unreachable credentials, before fwdslsh even launches.
- **Risk 2: the copy overclaims.** Current site and profile copy says "zero deps" (false for all three tools) and calls rabit "the Gopher protocol" with listings "agents are guaranteed to understand". The README implies an installable rabit MCP server (not on npm). Adding "co-op" would add a legal-flavoured overclaim.
- **Risk 3: rabit is the weakest link in the agent story.** It is a Draft 0.4.0 spec with one test file and no visible commits since 2026-01-15. Its code is under CC-BY-4.0, which locks it out of OSI-gated hosts and funds. It sits in a crowded `.well-known` namespace where practitioners are choosing MCP.

---

## 2. The landscape

### 2.1 Shared-maintenance collectives and indie umbrellas

| Name | Kind | Membership model | What "supported" means | Status (as of 2026-10-01) | Source |
|---|---|---|---|---|---|
| Jazzband | Open-membership Python collective | Open signup; every member got push access to every repo | Shared push, shared PyPI release pipeline, CoC, "Implement Jazzband guidelines" checklist | **Sunsetting**: announced 2026-03-14, transfers Jun–Dec 2026, read-only early 2027; 76 repos left | [sunset post](https://raw.githubusercontent.com/jazzband/website/main/docs/news/2026/03/14/sunsetting-jazzband.md), [wind-down](https://raw.githubusercontent.com/jazzband/website/main/docs/news/2026/03/14/wind-down-plan.md) |
| Django Commons | Multi-admin collective | Issue-based join; human, expressed interest, accepted CoC | Lifecycle: Healthy → Dormant → Commons Stewardship → Archived; Contributor Trust Ladder | Active; recruiting admins in 2026 | [member reqs](https://raw.githubusercontent.com/django-commons/membership/main/member_requirements.md), [maintenance](https://raw.githubusercontent.com/django-commons/membership/main/django-commons.org/content/governance/project-maintenance.md) |
| Pallets-Eco | Community org beside a core org | "Anyone can join to get write access" | Explicitly "*not* an official extension repository"; transferring in means "giving up the final say" | Active, 38 repos | [ecosystem](https://raw.githubusercontent.com/pallets/website/main/content/ecosystem.md), [announcement](https://raw.githubusercontent.com/pallets/website/main/content/blog/pallets-community-org.md) |
| Vox Pupuli | Collective, elected PMC | Four participation levels (GitHub teams) | Shared namespace; "someone by your side" during migration | Active; shipped OpenVox 2025-01-21 | [governance](https://raw.githubusercontent.com/voxpupuli/plumbing/master/share/governance.md) |
| UnJS | Lead-curated umbrella | Lead decides hosting; authors keep final say | Hosted projects may use the site and social channels; owners may leave | Active; Nitro graduated out (2024-09-27) | [governance](https://raw.githubusercontent.com/unjs/governance/main/README.md) |
| PyCQA | Loose namespace | Email the mailing list | A shared name: "not actually an authority on anything" | Active | [intro](https://github.com/PyCQA/meta/blob/master/source/introduction.rst) |
| nix-community | Incubator | Ping an admin; maturity bar | Shared ownership; wants no "graveyard"; prefers projects "tended to by at least two people" | Active, 215 repos | [FAQ](https://github.com/nix-community/infra/blob/master/docs/faq.md), [npins thread](https://github.com/orgs/nix-community/discussions/1300) |
| antfu-collective / tinylibs | Small indie collectives | Invite only, undocumented | A shared name and a design value | Active | [antfu-collective](https://github.com/antfu-collective), [tinylibs](https://github.com/tinylibs) |
| mcp-get community-servers | Community MCP listing | PR submission | Listing only | **Archived 2026-06-17**; points users to Smithery | [repo](https://github.com/mcp-get/community-servers), [mcp-get](https://github.com/michaellatman/mcp-get) |

**What the cautionary cases teach:**
- Jazzband's founder wrote that "every project transfer, every lead assignment, every PyPI permission change… it all went through me". Thirteen of 41 onboarding checklists stalled on admin-only steps.
- When Rome Tools Inc. laid off its staff, the lead maintainer had no Discord admin rights, no hosting access and no registry access. The project was forked as Biome on 2023-08-29 ([Biome post](https://raw.githubusercontent.com/biomejs/website/main/src/content/docs/blog/announcing-biome.mdx)).
- tui-rs was archived 2023-08-06 and succeeded by the Ratatui fork ([tui-rs](https://github.com/fdehau/tui-rs)).

**Patterns:**
1. Spread admin power across at least two people.
2. Membership is not write access.
3. Publish entry and exit rules and lifecycle states.
4. Keep the project list as data (Django Commons' `projects.yaml`; Nuxt's module records with a `type` tier and a `maintainers` array, per [nuxt/modules](https://raw.githubusercontent.com/nuxt/modules/main/README.md)).
5. In agent tooling, a community *listing* is not a durable value proposition. mcp-get folded once the official MCP Registry preview arrived (2025-09-08).

One more data point: no comparable indie collective focused on agent tooling, with a public membership model, was found. That is an absence of evidence, not proof the niche is empty.

### 2.2 Foundations and tiered "supported" programs

| Name | Kind | Entry model | What a tier means | Status | Source |
|---|---|---|---|---|---|
| AAIF (Linux Foundation) | Corporate foundation | Paid corporate tiers; projects apply by issue | Sandbox needs an "OSI-approved permissive license" and a transfer of trademarks and assets to the LF. "Sandbox status is not an endorsement". Growth needs "production use by at least two unaffiliated organizations" | Active; MCP, goose and AGENTS.md at Impact | [lifecycle policy](https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md), [charter](https://github.com/aaif/technical-committee/blob/main/governance/charter.md) |
| CNCF | LF sub-foundation | Apache-2.0 required; MAINTAINERS file | Sandbox → Incubating (OpenSSF passing badge, 3+ adopters) → Graduated; fixed homepage affiliation line | Active | [process](https://github.com/cncf/toc/blob/main/process/README.md), [website guidelines](https://github.com/cncf/foundation/blob/main/policies-guidance/website-guidelines.md) |
| OpenJS Foundation | LF foundation | At Large needs 2 sponsors plus an annual review | Impact, Feature-Complete, Sunsetting, Archived | Active | [progression](https://github.com/openjs-foundation/cross-project-council/blob/main/PROJECT_PROGRESSION.md) |
| Apache Incubator | Foundation incubator | Champion plus mentors | "(incubating)" label plus a DISCLAIMER saying the project is not yet fully endorsed | Active | [GraphAr DISCLAIMER](https://github.com/apache/incubator-graphar/blob/main/DISCLAIMER) |
| MCP SDK tiers | Tiered support inside a project | n/a | Tier 1: 100% conformance, triage within 2 business days, critical fix within 7 days. Tier 3: no minimums. Demotion rules | Published 2026-02-23 | [sdk-tiers](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/community/sdk-tiers.mdx) |
| NumFOCUS | Fiscal sponsor | Sponsored vs Affiliated tiers | Affiliates stay legally separate (detail **unverified**) | Active | [affiliated](https://numfocus.org/sponsored-projects/affiliated-projects) |

**Lessons for fwdslsh:**
- Tiers carry measurable commitments, time-boxed reviews and a formal end-of-life stage.
- Two kinds of on-project statement exist. An *affiliation line* (CNCF: "We are a Cloud Native Computing Foundation sandbox project.") and a *non-endorsement disclaimer* (Apache, AAIF Sandbox). Only the second disclaims.
- Big-foundation mechanics need a legal entity: IP transfer, dues-based seats. They are not available to fwdslsh and should not be imitated.

**Money without an entity** (fees per the cited docs):
- **GitHub Sponsors:** no fee on personal-account sponsorships, up to 6% on organization ones. An org's payouts may go to a personal bank account ([GitHub docs](https://github.com/github/docs/blob/main/content/sponsors/receiving-sponsorships-through-github-sponsors/setting-up-github-sponsors-for-your-organization.md)).
- **Liberapay teams:** money goes directly to members, with processor fees only ([Liberapay](https://liberapay.com/about/)).
- **Open Source Collective:** 10% host fee. It wants an organizational repo and an open source licence ([OSC fees](https://docs.oscollective.org/welcome-and-introduction-to-osc/fees)).

**Hosts and programs are volatile:**
- Open Collective Foundation dissolved on 2024-12-31 ([announcement](https://opencollective.com/foundation/updates/announcement-we-are-dissolving-open-collective-foundation-at-the-end-of-this-year)).
- Polar dropped donations in September 2024 ([discussion](https://github.com/orgs/polarsource/discussions/3998)).
- NLnet paused open calls in June 2026 ([NLnet](https://nlnet.nl/news/2026/20260612-NGIZero-stocktaking.html)).

### 2.3 Co-ops and indie collectives

| Name | Kind | Membership model | What membership means | Status | Source |
|---|---|---|---|---|---|
| CoTech | Network of UK worker co-ops | Voting members must be workers.coop worker co-ops | A public directory linking each member's site | Active; became a workers.coop sector arm Sept 2024 | [who can join](https://wiki.coops.tech/wiki/Who_can_join_CoTech) |
| USFWC Tech Peer Network | Informal network of legal co-ops | Worker co-ops meeting the 2016 criteria (one member, one vote, and so on) | Peer support | Active | [criteria PDF](https://usworker.coop/wp-content/uploads/2016/05/Membership-Criteria-2016.pdf) |
| Hypha | Incorporated worker co-op (Ontario, 2019) | Worker-owners | Open handbook | Active | [CWCF article](https://canadianworker.coop/hypha-worker-co-operative-seeks-to-build-bridges/) |
| Nano Collective | Volunteer collective of AI-tool builders | Volunteer contributors | "No investors, no equity"; fiscally hosted by OSC; bounty fund | Active | [support doc](https://docs.nanocollective.org/collective/organisation/support), [nanocoder](https://github.com/Nano-Collective/nanocoder) |
| Hundred Rabbits | Two-person artist collective | n/a | Self-described "artist collective" | Active | [Wikipedia](https://en.wikipedia.org/wiki/Hundred_Rabbits) |
| Merveilles | Informal community and webring | Join the instance or webring | Webring links members' own sites | Active | [XXIIVV](https://wiki.xxiivv.com/site/merveilles.html) |
| Varia | Self-organised collective | Written obligations (workgroup hours, meetings, fee) | Membership defined by commitments | Active (2025 call) | [Varia 2025](https://www.varia.zone/en/new-members-2025.html) |
| The Guild | Bootstrapped company | Company | Libraries stay under developers' own names | Active | [rebranding post](https://the-guild.dev/blog/rebranding-in-open-source) |
| Codeberg e.V. | Registered association | Paying members with dues | Membership confers governance rights | Active; 1,691 paying members (May 2026) | [budget](https://blog.codeberg.org/codebergs-budget-of-2026.html) |

**On the word "co-op":**
- California Corp. Code §12311 bars using "cooperative" or similar "as part of the name or designation under which it does business" unless incorporated under a cooperative law ([FindLaw](https://codes.findlaw.com/ca/corporations-code/corp-sect-12311/)).
- Maine 13 §1976 sets fines ([Maine](https://legislature.maine.gov/statutes/13/title13sec1976.html)).
- Canada's Cooperatives Act s.25 applies where an entity "could reasonably be considered to be holding itself out" as a cooperative ([Justice Canada](https://laws-lois.justice.gc.ca/eng/acts/c-1.7/page-3.html)).
- The risk is concentrated in names and in holding yourself out as a co-op. Adjectives ("we work cooperatively") carry less risk.
- These statutes were confirmed via search summaries and secondary pages, and this is not legal advice.
- `.coop` domains are verified, and individuals cannot register them ([identity.coop](https://identity.coop/faq/eligibility/)).

**"Foundation" and "Institute"** appear only on incorporated bodies in this sample: Small Technology Foundation, Spritely, and Handmade Software Foundation (501(c)(6) per its [2026 post](https://handmade.network/blog/p/9106-welcome_to_2026!)).

**Money forces structure.** Groups that hold funds either incorporate (EleutherAI in 2023, Handmade in 2026) or use a fiscal host (Nano via OSC).

### 2.4 The agentic-web standards landscape

| Name | Kind | Governance | Status | Relevance to fwdslsh | Source |
|---|---|---|---|---|---|
| MCP | Protocol | AAIF (LF) | Stateless spec 2026-07-28; "close to half-a-billion downloads a month" across Tier 1 SDKs | Where agent traffic is going; rabit has an *unpublished* MCP server | [MCP joins AAIF](https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/), [2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/) |
| MCP Server Cards | Proposed `.well-known` discovery | MCP working group | SEP-2127 open; not standardised | Closest MCP analogue to burrow/warren | [PR 2127](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127), [roadmap](https://blog.modelcontextprotocol.io/posts/mcp-roadmap/) |
| AGENTS.md | Convention | AAIF | Founding AAIF project | unify `init` writes it; akm indexes it | [repo](https://github.com/agentsmd/agents.md) |
| Agent Skills (SKILL.md) | Open format | agentskills org; proposed to AAIF | Proposal #47 is TC Approved, but the contribution agreement is unsigned (still open) | akm indexes this format | [proposal #47](https://github.com/aaif/project-proposals/issues/47), [Anthropic post](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) |
| llms.txt | Community proposal | Answer.AI | v2 (modified 2026-08-10); argues *against* `/.well-known/` because shared-host authors cannot write there | rabit's nearest neighbour | [index.qmd](https://raw.githubusercontent.com/AnswerDotAI/llms-txt/main/nbs/index.qmd) |
| A2A | Protocol | Linux Foundation | Spec 1.0.0; Agent Card at `/.well-known/agent-card.json` | Precedent for well-known JSON cards | [spec](https://raw.githubusercontent.com/a2aproject/A2A/main/docs/specification.md) |
| WebMCP | Browser API proposal | W3C WebML CG | Draft; has a declarative API that synthesises tools from `<form>` elements; Chrome origin trial **(unverified)** | Future compatibility for unify's plain HTML | [repo](https://github.com/webmachinelearning/webmcp) |
| NLWeb | Protocol plus implementation | Microsoft-led | MIT; "Every NLWeb instance also acts as an MCP server" | Server-side counterpart to static manifests | [repo](https://github.com/nlweb-ai/NLWeb) |
| IETF AIPREF | Standards WG | IETF | Drafts, not RFCs (vocab -08, 2026-09-14, **search-only**) | The consent layer; rabit should defer to it | [datatracker](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/) |

**Signals that matter:**
- **Publishing is not the same as being read.** Astro removed its llms.txt files in [PR #13538](https://github.com/withastro/docs/pull/13538) (verified on the PR). An Ahrefs study reportedly found 97% of llms.txt files got zero traffic **(search summary only)**. Shopify reportedly redirected `/llms.txt` to `/agents.md` around 2026-05-20 **(unverified, secondary sources)**.
- **Infrastructure is absorbing format conversion.** Cloudflare's Markdown for Agents converts HTML on `Accept: text/markdown` **(search summaries only)**. What remains defensible is author intent and correctness, not conversion.

---

## 3. Where unify, rabit and akm fit

The three tools are independent. None imports, calls or feeds another in code. They are linked by theme (publishing, discovery, agent-side capability) and by one maintainer. The only place two of them meet today is fwdslsh.dev: it is built with unify and hand-publishes a rabit burrow and warren at `/.well-known/`.

### unify (fwdslsh/unify, MPL-2.0, npm 0.9.0)

**Honest differentiator**
- Composition stays HTML-native: five primitives, plain HTML out, "no expression language, no client runtime".
- The authoring rules fit in sixty lines (test-enforced). They were *ratified empirically* by giving isolated AI agents only those rules and judging the result with the real build, and the findings changed the product.
- Agent-relevant output is built from declared facts only: sitemap, Atom feed, JSON-LD, `catalog.json`, `search-corpus.json`.
- `unify audit` emits JSON or SARIF with stable fingerprints. `init` writes an AGENTS.md.
- No surveyed SSG markets a documented agent-trial loop. That is the defensible story: *designed so agents author it correctly too*.

**Adjacent tools.** Starlight, Docusaurus, MkDocs, VitePress, Mintlify and GitBook all generate llms.txt, so llms.txt output is parity, not a differentiator. unify does not generate llms.txt, and copy should not imply it does. The README says unify "does not compete with Hugo, Eleventy, or Astro".

**Interop opportunities.**
- Optional rabit burrow output from the page manifest. *Not built today.*
- A low-priority llms.txt projection.
- A forward-looking note that plain HTML forms align with WebMCP's declarative proposal. No support claim.

**Claims to avoid** (from the fact sheet):
- "zero dependencies" (js-yaml and markdown-it are runtime deps)
- "an AI-agent SSG" or "agent-first" (the stated audience is front-end designers and hobbyists)
- "generates rabit manifests"
- "agents are guaranteed to get it right"
- "Windows binary"
- "under 60 lines" (say "sixty lines")
- "0.9.1 on npm"
- "stable" or "1.0"
- "replaces Hugo/Eleventy/Astro"
- "SEO optimizer" or "rich results"
- "incremental builds"
- "official Docker image" (unchecked)
- the GitHub description "Simple foundations focused SSG" (inconsistent with the README; replace it)

### rabit (fwdslsh/rabit, CC-BY-4.0, spec 0.4.0 Draft)

**Honest differentiator.**
- A small JSON manifest convention (`.burrow.json`, `.warren.json`) that tells agents what exists and where, so they need not crawl.
- Per-entry metadata (summaries, tags, sha256) and an optional `agents` block with context and an entry point.
- Transport-agnostic, with examples for HTTPS, Git and the local filesystem.
- Warrens act as registries of burrows, and `.burrow.md` is a human companion.
- The transport-agnostic design and the warren registry are what llms.txt and MCP Server Cards do not offer.

**Adjacent standards.** llms.txt (v2 argues against `/.well-known/`), MCP Server Cards (SEP-2127, still a working group), A2A Agent Cards, agents.json (Wildcard, 0.1.0), AGENTS.md and NLWeb. The well-known JSON namespace is crowded and largely unregistered.

**Interop opportunities, in priority order:**
1. Publish `@fwdslsh/rabit-mcp` to npm, and ideally to the MCP registry. The code (11 tools) exists in the repo. Given the Astro data, this is the highest-leverage step.
2. Read and emit llms.txt as cheap parity.
3. Track MCP Server Cards as a link-entry target once they settle.
4. Defer to IETF AIPREF for usage preferences instead of adding rights fields.
5. Correct the spec's description of subdirectory `.well-known/burrow.json` as the "RFC 8615 standard location". Recommend the dotfile in subdirectories and `.well-known` only at the root. RFC 8615 itself was not fetched, so this point is medium confidence.
6. State plainly how rabit relates to llms.txt and AGENTS.md on the rabit pages.

**Licence.** CC-BY-4.0 is a Creative Commons content licence. AAIF Sandbox requires an "OSI-approved permissive license", and OSC gates on open source licences. Relicensing the code packages to an OSI licence, while keeping CC-BY-4.0 for the spec text, would remove that blocker.

**Claims to avoid:**
- "a standard", "a protocol" or "an RFC" (the repo's own about.md says "a dotfile convention, not an RFC")
- "The Gopher protocol for the AI age" (current meta description)
- "a directory listing that agents are guaranteed to understand" (current site)
- "install the MCP server from npm"
- "production-ready" or "full client conformance"
- "`rabit validate` checks the schema" (it checks required fields only)
- "zero dependencies" for the toolchain
- "runs on Node" or "single binary" (Bun-only)
- "replaces robots.txt, sitemaps or llms.txt"
- "secures your content"
- "actively developed" (last visible commit 2026-01-15)
- expanding the name as "Retrieval Augmented Bits" (unverified)
- "open source" in the OSI sense
- "official Docker Hub images" (unchecked)

### akm (itlackey/akm, MPL-2.0, akm-cli 0.9.21)

**Honest differentiator.**
- A local-first library and retrieval layer for agent capabilities: skills, scripts, workflows and knowledge.
- Indexes existing Claude Code and OpenCode directories and Agent Skills packages in place, read-only.
- Agents `curate` a shortlist, then `show` by reference, loading only what a task needs (brief results carry `estimatedTokens`).
- No remote telemetry. Improvements arrive as reviewable proposals. Every command has a published stability tier.
- Because SKILL.md is broadly portable (the Agent Skills proposal cites 46 products in its client showcase), lead with retrieval and curation, not portability.

**Adjacent tools.** skills.sh (which akm supports as a registry provider), Claude Code plugin marketplaces, MCP directories, and Cursor rules. Directory counts are unverified; do not cite them.

**Interop opportunities, all untested and not to be claimed as features:**
- akm already says it "complements MCP and assistant-native skills" and uses `/llms.txt` as a fast path when ingesting websites.
- It could index the AGENTS.md files unify writes.
- Its RSS/Atom fetcher could read unify feeds.
- A rabit burrow could describe an akm bundle.

**Claims to avoid:**
- "an fwdslsh tool" or "built by fwdslsh" (say "supported by fwdslsh")
- "stable" or "1.0" (0.9.x patches may break)
- "zero deps" (11 runtime deps)
- "works with every agent and IDE"
- "an MCP server"
- "fully offline"
- "native plugins for Cursor/Windsurf/Aider/Claude Code" (Claude Code plugins are 1.0 roadmap work)
- "self-improving autonomous memory"
- "integrates with rabit or unify"
- any usage or adoption numbers

---

## 4. Recommendations for fwdslsh

### 4.1 Positioning statement

> **fwdslsh is a small collective of independent developers. We build, and help each other maintain, open-source tools that make the web easier for AI agents, and the people using them, to publish, find and navigate. Today we support three: unify, rabit and akm.**

Keep the existing "/ as a path" identity. It extends naturally to agents following paths. Put the "next epoch" idea lower on the page and ground it in a specific problem: web pages are built for people, agents read them constantly, and authors have little say in what agents see. A short essay defining "the agent-navigable web" would do more than a slogan. Ink & Switch's "local-first software" essay is the precedent ([Wikipedia](https://en.wikipedia.org/wiki/Local-first_software)).

### 4.2 Wording for "co-op/collaborative"

**Use:**
- "collective" (noun, in the tagline and on the About page)
- "independent developers"
- "we build collaboratively"
- "members help maintain each other's tools"
- "supported by fwdslsh"

**Avoid, and why:**
- **"co-op", "cooperative", "co-operative" as a noun, a name or a page title.** In this research the word maps to legally constituted, worker- or member-owned bodies. Several jurisdictions restrict it in names or when a group holds itself out as one. fwdslsh has no entity, no member ownership and no voting.
- **"umbrella entity".** In this space "umbrella" usually means a fiscal host that holds money (Open Collective defines fiscal hosts as providing "the legal and financial umbrella"). fwdslsh holds none.
- **"Foundation", "Institute", "Inc.", "member-owned", "democratically governed".** Each implies a legal form or a written process that does not exist.
- **Any `.coop` domain.**

Add a plain "How fwdslsh is organized" paragraph, for example:

> fwdslsh is not a company or a legal entity. It holds no money and owns no member's code. Supported tools stay with their authors. If we ever accept money, we will use a public fiscal host and say so here.

### 4.3 "Supported by fwdslsh": a lightweight, explicit definition

Publish this on one page, linked from every supported tool's README.

**Criteria a tool must meet (or have a dated plan to meet):**
1. An OSI-approved licence for code. rabit's code is CC-BY-4.0 today and needs a relicensing decision. Until then, list it with a dated exception.
2. A README stating what the tool is and isn't, a CHANGELOG, and a stated stability or versioning policy.
3. A `SECURITY.md` with a contact and an *acknowledgement* window. Promise acknowledgement, not fix times, as Django Commons does. akm already promises 72 hours.
4. CI that runs the tests on every change.
5. A code of conduct. None of the three repos has one today.
6. An `AGENTS.md` or equivalent agent instructions, and interop with at least one open agent standard (MCP, AGENTS.md, Agent Skills).
7. **At least two people who can review and release.** No tool meets this today. Be honest about that and set a target date.
8. A written succession clause. If the author is unreachable for a stated period (e.g. 90 days), named stewards may publish security fixes, or point users to a maintained fork. This is the Biome and Ratatui lesson.

**What supporting members commit to:**
- Review pull requests on request.
- Acknowledge security reports within the window.
- Do an annual check-in confirming the tool's status.

**What they do not get:** push access by default. Elevated rights come by invitation, per tool, tied to recent activity (Django Commons' trust ladder; Homebrew's activity rule).

**What the project gets:**
- A listing on fwdslsh.dev and in the site's `warren.json`.
- Review help, a second pair of eyes on releases, and the succession clause.
- Shared promotion through fwdslsh channels (the UnJS pattern).

**How it is shown:**
- A "Supported by fwdslsh" section on a Tools page. Each card shows a status label (Active / Dormant / Withdrawn), a "supported since" date, the maintainers, the licence, and the version taken from the registry at build time.
- One fixed affiliation line in each README, in the CNCF style: "akm is a tool supported by fwdslsh. See what that means: <link>". Avoid "endorsed", "certified" and "official".

**How a project leaves:**
- An author may leave at any time by opening an issue. Leaving is a normal, documented path (Jazzband: "always supposed to be part of the deal").
- A tool becomes **Dormant** after six months with no release and no response to the annual check-in, as Django Commons does.
- Withdrawal uses a short, dated notice modelled on the MCP servers-archived wording: no longer supported, no security guarantees, pointer to alternatives.

**Small fix:** add akm to `warren.json` and correct the `digthub` tag typo.

### 4.4 Members list model

- **What a member card shows:** name, GitHub handle and avatar, a one-line self-written bio, a link to the member's own site, the supported tools they maintain (if any), and "member since". No counts, no rankings.
- **Keep the data in one file.** A `members.yaml` or JSON file, published in the burrow and warren so it is itself agent-readable. Render it with unify's `--generate` step or by hand. unify has no built-in data templating, so do not imply one.
- **Members' own repos go in a separate section,** "From our members", visually distinct from supported tools. Carry a fixed non-endorsement line, for example: "Listed by their authors. Not reviewed or supported by fwdslsh." This follows Pallets-Eco and Apache. Listing is opt-in.
- **Joining:**
  - A GitHub issue template with written requirements, adapted from Django Commons: a human as best as we can tell, expressed interest, accepted CoC.
  - Two existing members vouch, following OpenJS's two-sponsor rule.
  - Joining a tool to "supported" is a separate issue template.
- **Today:** exactly one member is verified, itlackey. Do not list `fwdslsh-dev` as a separate person without confirmation. Do not launch a members page with a single card styled as a crowd. Either wait for a second member, or launch it as "Founding member" with an open invitation.

### 4.5 Site information architecture

| Page | Purpose |
|---|---|
| `/` Home | Positioning sentence, the three supported tools, one paragraph on the collective, a link to Join |
| `/tools/` | "Supported by fwdslsh" (unify, rabit, akm) with status and dates; "From our members" below with the disclaimer |
| `/rabit/…` (existing) | Keep. Add a "How rabit relates to llms.txt, AGENTS.md and MCP" section and fix the overclaims |
| unify | Link out to unify.fwdslsh.dev (as today) |
| akm | Link out to github.com/itlackey/akm, clearly labelled as a member's repo |
| `/members/` | Member cards from the data file |
| `/supported/` | The definition in 4.3: criteria, commitments, lifecycle, leaving |
| `/about/` ("How fwdslsh works") | Organization statement, stewards, funding stance, AI-contribution policy |
| `/join/` | Two paths: become a member; propose a tool for support |

**AI-contribution policy.** Readers will look for one, because Jazzband shut down partly over AI spam. The fitting default is MCP's disclosure rule, plus a named accountable human, plus no autonomous-agent PRs. Apache Magpie's rule is a credible precedent: everything "is _drafted_ by the agent and posted by a person. There is no autonomous mode." Most visible unify commits are authored by "Claude", so say so openly.

**Housekeeping:**
- Update the website's CLAUDE.md, which currently says the site lists two tools.
- Fix the org profile typos ("where" for "were", "tatical" for "tactical").
- Replace unify's GitHub description.
- Label or archive the unsupported org repos: dispatch, warrens, hyphn, pace, crosstrain.

### 4.6 Tone guidance

Keep the terse, craft-over-hype voice. Make every claim checkable. Compute numbers at build time, or link to a query (as AGENTS.md does), or leave them out.

| Do | Don't |
|---|---|
| "A small collective of independent developers." | "An open-source co-op uniting indie devs worldwide." |
| "unify adds no JavaScript of its own to your site." | "Zero deps, instant setup." (false for all three tools) |
| "rabit is a small JSON manifest convention, a draft at 0.4.0." | "The Gopher protocol for the AI age." |
| "The repo includes an MCP server; it is not yet published to npm." | "Install the rabit MCP server." |
| "akm is supported by fwdslsh; it lives in its author's account." | "akm, a fwdslsh tool." |
| "Works with MCP, AGENTS.md and Agent Skills." | Any AAIF/LF logo, "member", or "aligned with the Agentic AI Foundation." |
| "We help each other review, release and hand over tools." | "Your project will never fall out of maintenance." |
| "Designed so agents author it correctly too." | "Revolutionary", "next-gen", "unleash", "universe". |

PyCQA's self-deprecation ("not actually an authority on anything") and antfu-collective's one-sentence description are good registers to aim for.

---

## 5. Risks and open questions for the owner

1. **Legal form.** *Default:* none for now, stated plainly on the About page. Revisit only when money or employment arrives, as EleutherAI and Handmade did. Use a fiscal host before incorporating.
2. **Governance and the bus factor.** *Default:* name at least two stewards before launch. Write a one-page `GOVERNANCE.md`: lazy consensus, either steward can act on membership issues. Keep a credential register in the style of Vox Pupuli's checklist, with two holders each for the GitHub org, the npm `@fwdslsh` scope, the domain and DNS, hosting, Docker Hub and Bluesky. **Open question:** who is the second steward?
3. **akm succession.** *Default:* agree a written clause with itlackey covering the unreachability period, the npm handover, and the fork-to-org path. Note that itlackey is both the author and, today, the only steward. The clause only has teeth once a second person exists.
4. **Admission process.** *Default:* issue templates, the human requirement, two existing members vouching, and no push access by default.
5. **AI-contribution policy.** *Default:* disclosure, a named accountable human, no autonomous-agent PRs. **Owner decision:** whether agent-drafted PRs from outsiders are welcome at all.
6. **Funding.** *Default:* none collectively.
   - Individual members may use GitHub Sponsors, and `FUNDING.yml` can point to them.
   - If pooled funding is wanted, a Liberapay team needs no entity.
   - OSC (10%) comes later. It requires an organizational repo, which akm is not.
   - Promise no pay.
7. **rabit's licence and direction.**
   - *Default:* relicense the code packages to an OSI licence, keeping CC-BY-4.0 for the spec.
   - Publish rabit-mcp, fix the README and install drift, and correct the RFC 8615 wording.
   - **Owner decision:** whether rabit remains "supported" while visible activity has stalled since January. If yes, set a dated plan. If no, use the Dormant label honestly.
8. **The "next epoch" claim.** *Default:* keep it off the hero line and earn it with an essay and working interop (published rabit-mcp first).
9. **The members-page launch threshold.** *Default:* wait for a second confirmed member, or launch as "founding member plus open invitation".
10. **Unsupported org repos.** *Default:* add a one-line "experimental, not supported" label to each, or archive them.
11. **rabit's name expansion.** "Retrieval Augmented Bits" and "Rabit Burrow Traversal (RBT)" conflict. *Default:* drop both expansions from site copy.

---

## 6. Sources

**Section 1–2.1: shared-maintenance collectives**
- https://raw.githubusercontent.com/jazzband/website/main/docs/news/2026/03/14/sunsetting-jazzband.md
- https://raw.githubusercontent.com/jazzband/website/main/docs/news/2026/03/14/wind-down-plan.md
- https://raw.githubusercontent.com/jazzband/website/main/docs/news/2026/03/14/10-years-of-jazzband.md
- https://github.com/jazzband
- https://raw.githubusercontent.com/django-commons/membership/main/member_requirements.md
- https://raw.githubusercontent.com/django-commons/membership/main/django-commons.org/content/governance/django-commons.md
- https://raw.githubusercontent.com/django-commons/membership/main/django-commons.org/content/governance/project-maintenance.md
- https://github.com/django-commons/membership/blob/main/incoming_repo_requirements.md
- https://github.com/django-commons/membership/blob/main/outgoing_repo_requirements.md
- https://github.com/django-commons/membership/blob/main/django-commons.org/content/response-timeframes.md
- https://raw.githubusercontent.com/pallets/website/main/content/blog/pallets-community-org.md
- https://raw.githubusercontent.com/pallets/website/main/content/ecosystem.md
- https://github.com/pallets-eco/.github/blob/main/CONTRIBUTING.md
- https://raw.githubusercontent.com/voxpupuli/plumbing/master/share/governance.md
- https://voxpupuli.org/blog/2025/01/21/openvox-release/
- https://raw.githubusercontent.com/unjs/governance/main/README.md
- https://github.com/nitrojs/community/discussions/3
- https://github.com/PyCQA/meta/blob/master/source/introduction.rst
- https://github.com/nix-community/infra/blob/master/docs/faq.md
- https://github.com/orgs/nix-community/discussions/1300
- https://raw.githubusercontent.com/Homebrew/brew/main/docs/Homebrew-Governance.md
- https://github.com/Homebrew/brew/pull/21156
- https://github.com/antfu-collective
- https://github.com/tinylibs
- https://github.com/e18e
- https://raw.githubusercontent.com/nuxt/modules/main/README.md
- https://raw.githubusercontent.com/biomejs/website/main/src/content/docs/blog/announcing-biome.mdx
- https://github.com/fdehau/tui-rs
- https://github.com/ratatui
- https://github.com/mcp-get/community-servers
- https://github.com/michaellatman/mcp-get
- https://github.com/modelcontextprotocol/servers-archived

**Section 2.2: foundations, tiers and funding**
- https://github.com/aaif/technical-committee
- https://github.com/aaif/technical-committee/blob/main/governance/project-lifecycle-policy.md
- https://github.com/aaif/technical-committee/blob/main/governance/charter.md
- https://github.com/aaif/project-proposals/issues/47
- https://github.com/cncf/toc/blob/main/process/README.md
- https://github.com/cncf/foundation/blob/main/policies-guidance/website-guidelines.md
- https://github.com/cncf/toc/blob/main/.github/ISSUE_TEMPLATE/template-incubation-application.md
- https://github.com/openjs-foundation/cross-project-council/blob/main/PROJECT_PROGRESSION.md
- https://github.com/apache/incubator-graphar/blob/main/DISCLAIMER
- https://github.com/apache/magpie
- https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/community/sdk-tiers.mdx
- https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/AI_POLICY.md
- https://numfocus.org/sponsored-projects/affiliated-projects
- https://github.com/github/docs/blob/main/content/sponsors/receiving-sponsorships-through-github-sponsors/setting-up-github-sponsors-for-your-organization.md
- https://github.com/github/docs/blob/main/data/reusables/sponsors/no-fees.md
- https://liberapay.com/about/
- https://docs.oscollective.org/welcome-and-introduction-to-osc/fees
- https://docs.oscollective.org/interested-in-joining-osc/acceptance-criteria
- https://opencollective.com/foundation/updates/announcement-we-are-dissolving-open-collective-foundation-at-the-end-of-this-year
- https://github.com/orgs/polarsource/discussions/3998
- https://nlnet.nl/news/2026/20260612-NGIZero-stocktaking.html

**Section 2.3: co-ops and indie collectives**
- https://wiki.coops.tech/wiki/Who_can_join_CoTech
- https://forum.workers.coop/t/cotech-is-joining-workers-coop/902
- https://usworker.coop/wp-content/uploads/2016/05/Membership-Criteria-2016.pdf
- https://canadianworker.coop/hypha-worker-co-operative-seeks-to-build-bridges/
- https://docs.nanocollective.org/collective/organisation/support
- https://github.com/Nano-Collective/nanocoder
- https://en.wikipedia.org/wiki/Hundred_Rabbits
- https://wiki.xxiivv.com/site/merveilles.html
- https://www.varia.zone/en/new-members-2025.html
- https://the-guild.dev/blog/rebranding-in-open-source
- https://blog.codeberg.org/codebergs-budget-of-2026.html
- https://handmade.network/blog/p/9106-welcome_to_2026!
- https://x.com/AiEleuther/status/1631198112889839616?lang=en
- https://codes.findlaw.com/ca/corporations-code/corp-sect-12311/
- https://legislature.maine.gov/statutes/13/title13sec1976.html
- https://laws-lois.justice.gc.ca/eng/acts/c-1.7/page-3.html
- https://identity.coop/faq/eligibility/
- https://github.com/opencollective/opencollective-frontend/blob/main/lang/en.json
- https://en.wikipedia.org/wiki/Local-first_software

**Section 2.4: agentic-web standards**
- https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/
- https://blog.modelcontextprotocol.io/posts/2026-07-28/
- https://blog.modelcontextprotocol.io/posts/mcp-roadmap/
- https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/
- https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
- https://github.com/agentsmd/agents.md
- https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- https://raw.githubusercontent.com/AnswerDotAI/llms-txt/main/nbs/index.qmd
- https://github.com/withastro/docs/pull/13538
- https://ahrefs.com/blog/llmstxt-study/ (search summary only)
- https://community.shopify.com/t/shopify-just-killed-llms-txt-for-all-stores-heres-what-to-do/629150 (search summary only)
- https://raw.githubusercontent.com/a2aproject/A2A/main/docs/specification.md
- https://github.com/webmachinelearning/webmcp
- https://github.com/nlweb-ai/NLWeb
- https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/ (search summary only)
- https://developers.cloudflare.com/changelog/post/2026-02-12-markdown-for-agents/ (search summary only)

**Section 3: product facts (registries and local repo files)**
- https://registry.npmjs.org/@fwdslsh/unify
- https://registry.npmjs.org/@fwdslsh/rabit-client
- https://registry.npmjs.org/@fwdslsh%2frabit-mcp (404)
- https://registry.npmjs.org/akm-cli
- https://github.com/fwdslsh/unify
- https://github.com/fwdslsh/rabit
- https://github.com/itlackey/akm
- https://github.com/fwdslsh
- /home/user/unify/README.md
- /home/user/unify/docs/product-spec.md
- /home/user/unify/docs/authoring-rules.md
- /home/user/unify/docs/ratification.md
- /home/user/unify/docs/cli-reference.md
- /home/user/unify/src/templates/shared.js
- /home/user/fwdslsh/rabit/README.md
- /home/user/fwdslsh/rabit/docs/about.md
- /home/user/fwdslsh/rabit/docs/rabit-spec.md
- /home/user/fwdslsh/rabit/packages/rabit-mcp/README.md
- /home/user/itlackey/akm/README.md
- /home/user/itlackey/akm/STABILITY.md
- /home/user/itlackey/akm/SECURITY.md
- /home/user/itlackey/akm/docs/guides/use-with-any-agent.md

**Section 4: messaging and site patterns**
- https://github.com/unifiedjs/unifiedjs.github.io/blob/main/generate/component/member/item.js
- https://github.com/unifiedjs/unifiedjs.github.io/blob/main/generate/page/home.js
- https://github.com/voxpupuli/voxpupuli.github.io/blob/master/index.html
- https://github.com/unjs/website/blob/main/content/0.index.yml
- https://github.com/agentsmd/agents.md/blob/main/components/Hero.tsx
- https://github.com/hundredrabbits/100r.co/blob/main/src/inc/support.htm
- https://github.com/fwdslsh/.github/blob/main/profile/README.md
- /home/user/website/src/index.html
- /home/user/website/src/rabit/index.html
- /home/user/website/src/.well-known/warren.json