# fwdslsh repositioning drafts (for review)

The pages drafted here now live in `src/` (`index.md`, `tools.md`, `supported.md`, `members.md`, `about.md`, `join.md`). This folder keeps the research and the messaging framework behind them. `drafts/` sits outside `src/`, so it never publishes.

| File | What it is |
|---|---|
| [market-research.md](market-research.md) | The research: comparable collectives, foundations and co-ops, and the agentic-web landscape. Covers where unify, rabit and akm fit, with sources. |
| [messaging-framework.md](messaging-framework.md) | Positioning, hero options, word list, voice rules and the page plan the drafts follow. |

Lines starting with **Review note** mark something you need to decide or supply before launch; all of them are listed below.

## Wording choices that differ from your request

- **"collaborative" / "collective", not "co-op".** fwdslsh has no legal entity, no member ownership and no vote. Several jurisdictions restrict "cooperative" in a name, or when a group holds itself out as one (California, Maine, Canada; see research §2.3). "Collaborative" was your other word, so the pages use it and "collective". One sentence says fwdslsh is "not a company, co-op or foundation".
- **"umbrella"** is kept as an idea (a shared name and home where members share work and help maintain each other's tools), not as a word. In this space "umbrella" usually means a fiscal host that holds money.
- **"The next epoch"** is in the hero ("Slash a path to the next epoch"). It is tied to three concrete problems the tools address today, so it reads as a claim, not a slogan.
- **akm** is always "supported by fwdslsh, lives in its author's account", never "a fwdslsh tool".
- **Claims removed from the current site:**
  - "zero deps", which is false for all three tools.
  - rabit as "the Gopher protocol" or "guaranteed to understand".
  - Implying the rabit MCP server can be installed. It is in the repo but not on npm.

## Draft rules

The support and governance rules are marked **Draft** on the pages themselves. That covers the criteria and lifecycle on `supported.md`, decision-making on `about.md`, and the membership rules on `join.md` and `members.md`. fwdslsh is one member today, itlackey, so these rules get tuned as members join. These questions are deferred until then:

- How strict the support criteria are, and when each "No" or "Partial" in the table gets a date
- The succession clause's unreachability period (proposed 90 days) and a second person who can release
- The dormancy period (proposed six months)
- A second steward, lazy consensus, and the objection period (proposed 14 days)
- The interim membership rule (the steward decides until there are three members) and two-member vouching
- A GOVERNANCE.md in `fwdslsh/.github`
- Whether agent-drafted PRs from non-members are welcome (proposed: yes, under the three disclosure rules)
- Funding (proposed: none collectively)

## Still needed before launch

1. **Home title.** Keep "Slash a path to the next epoch". The layout appends " · fwdslsh".
2. **Issue templates.** Create "Membership" and "Tool proposal" in `fwdslsh/.github`, and enable issues there.
3. **Code of conduct.** Adopt Contributor Covenant 2.1 for the org and in akm's repo. None of the three repos has one, and `join.md` links to it.
4. **rabit status.** rabit has no visible commits since 2026-01-15. Record a first check-in with a dated plan:
   - publish rabit-mcp;
   - fix the docs and install drift;
   - relicense the code under an OSI license.

   Otherwise label it Dormant.
5. **"Supported since".** 2026-10 for all three tools.
6. **unify version on the card.** 0.9.0, unless 0.9.1 gets published (fwdslsh/unify#89).
7. **warren.json.** Add akm, and fix the `digthub` tag typo.
8. **"From our members".** Publish it empty until itlackey opts in.
9. **Credential register.** Two holders each for the GitHub org, the npm scope, domain/DNS and hosting. The list stays private.
10. **itlackey's card.** Confirm the display name ("itlackey" or "IT Lackey"), plus bio, website, "member since", and any own repos to list.
