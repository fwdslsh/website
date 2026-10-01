# fwdslsh repositioning drafts (for review)

Nothing here is live. `drafts/` sits outside `src/`, so it never publishes.

| File | What it is |
|---|---|
| [market-research.md](market-research.md) | The research: comparable collectives, foundations and co-ops, and the agentic-web landscape. Covers where unify, rabit and akm fit, with sources. |
| [messaging-framework.md](messaging-framework.md) | Positioning, hero options, word list, voice rules and the page plan the drafts follow. |
| [pages/index.md](pages/index.md) | New home page |
| [pages/tools.md](pages/tools.md) | Supported tools: unify, rabit, akm, plus a separate "From our members" section |
| [pages/supported.md](pages/supported.md) | What "supported by fwdslsh" means: criteria, where each tool stands, lifecycle, leaving |
| [pages/members.md](pages/members.md) | Members list: itlackey as founding member, plus an open invitation |
| [pages/about.md](pages/about.md) | How fwdslsh works: organization, stewards, AI-contribution policy, funding |
| [pages/join.md](pages/join.md) | Two paths: become a member, or propose a tool for support |
| [pages/_member-template.md](pages/_member-template.md) | Card template for adding members |

Each page is a valid unify Markdown page. A scratch build with them dropped into `src/` passes `build --strict` and `audit --strict`. Lines starting with **Review note** mark something you need to decide or supply; all of them are listed below.

## Wording choices that differ from your request

- **"collaborative" / "collective", not "co-op".** fwdslsh has no legal entity, no member ownership and no vote. Several jurisdictions restrict "cooperative" in a name, or when a group holds itself out as one (California, Maine, Canada; see research §2.3). "Collaborative" was your other word, so the pages use it and "collective". One sentence says fwdslsh is "not a company, co-op or foundation".
- **"umbrella"** is kept as an idea (a shared name and home where members share work and help maintain each other's tools), not as a word. In this space "umbrella" usually means a fiscal host that holds money.
- **"The next epoch"** is in the hero ("Slash a path to the next epoch"). It is tied to three concrete problems the tools address today, so it reads as a claim, not a slogan.
- **akm** is always "supported by fwdslsh, lives in its author's account", never "a fwdslsh tool".
- **Claims removed from the current site:**
  - "zero deps", which is false for all three tools.
  - rabit as "the Gopher protocol" or "guaranteed to understand".
  - Implying the rabit MCP server can be installed. It is in the repo but not on npm.

## Decisions for you

Each item has the recommended default from the drafts.

1. **Home title.** Use "Slash a path to the next epoch", because the layout appends " · fwdslsh".
2. **Issue templates.** Create "Membership" and "Tool proposal" templates in `fwdslsh/.github`, and enable issues there.
3. **Code of conduct.** Adopt Contributor Covenant 2.1 for the org and in akm's repo. None of the three repos has one today.
4. **Support criteria.** Publish all eight criteria as targets. Date every "No" or "Partial" before launch. Add a SECURITY.md to unify, and update rabit's, which still lists 0.3.x.
5. **Succession clause.** 90 days of unreachability. Agree it with itlackey and name a second person who can release.
6. **Dormancy period.** Six months with no release and no check-in.
7. **rabit status.** Last visible commit 2026-01-15; code licensed CC-BY-4.0, which is not an OSI licence. Keep it Active with a dated plan:
   - publish rabit-mcp;
   - fix the docs and install drift;
   - relicense the code under an OSI licence, keeping CC-BY-4.0 for the spec.

   Otherwise label it Dormant.
8. **"Supported since".** 2026-10 for all three tools.
9. **unify version on the card.** 0.9.0, the npm latest, unless 0.9.1 gets published (fwdslsh/unify#89).
10. **warren.json.** Add akm, and fix the `digthub` tag typo.
11. **"From our members".** Publish it empty until a member opts in.
12. **Second steward.** Say honestly that itlackey is the only one, with a target of 2027-01.
13. **Decision-making.** Lazy consensus with a 14-day objection period.
14. **Interim membership rule.** The steward decides until there are three members; after that, two members vouch for each new one.
15. **Credential register.** Two holders each for the GitHub org, the npm scope, domain/DNS and hosting. Keep the list private; the About page says only that it exists.
16. **No push access by default.** Also write this into a GOVERNANCE.md in `fwdslsh/.github`.
17. **Agent-drafted PRs from non-members.** Welcome, if they follow the three disclosure rules.
18. **Funding.** None collectively; members use their own GitHub Sponsors pages.
19. **Members page launch.** "Founding member plus open invitation". Switch to "Current members" once a second person confirms.
20. **itlackey's card.** Confirm the display name ("itlackey" or "IT Lackey"), plus bio, website and "member since".
21. **Other members.** You know who they are; I could only verify itlackey. List only people who have confirmed and written their own bio. Leave the `fwdslsh-dev` account off unless it is a separate person.

## When these become site pages

- Move `pages/*.md` into `src/`. `index.md` replaces `src/index.html`.
- Point the nav and footer links at `/tools.html` and `/about.html`. They currently use `/#tools` and `/#about`, anchors the new home page drops; the scratch build reports exactly those 20 broken links.
- Remove the current rabit overclaims from `src/rabit/index.html`: its meta description ("The Gopher protocol for the AI age") and "agents are guaranteed to understand". Research §3 also suggests a short "how rabit relates to llms.txt, AGENTS.md and MCP" section.
- Update the website's CLAUDE.md, the org profile README (typos "where" and "tatical", and its "zero deps" claim), and unify's GitHub description.
