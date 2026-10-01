# Website Sync Scripts

Scripts for keeping the website in step with the projects it documents:
**rabit** (documented under `src/rabit/`) and **unify** (the generator the site is built with).

All scripts expect sibling checkouts of the fwdslsh repositories:

```
fwdslsh/
├── website/          # this repository
│   ├── scripts/      # this directory
│   └── website-sync/ # reports written by the scripts (git-ignored)
├── rabit/
└── unify/
```

## extract-project-info.sh

Extracts a project's `package.json` metadata, README, recent CHANGELOG, and CLAUDE.md into one file.

```bash
./scripts/extract-project-info.sh ../rabit website-sync/rabit-info.md
```

## auto-detect-changes.sh

Lists commits in each project since the date in `website-sync/last-sync.log` and writes
`website-sync/changes-detected-YYYYMMDD.md`. Exits 1 when changes are found (useful in CI).

## check-version-sync.sh

- **rabit** — the version in `../rabit/package.json` against every `rabit/schemas/<version>/` the rabit pages and `.well-known/*.json` reference.
- **unify** — the version in `../unify/package.json` against the `@fwdslsh/unify` version in `package-lock.json`.

Exits 1 on any mismatch.

## full-sync.sh

Runs the three scripts above, then (unless `--skip-validation`) offers to run `npm run audit:external`,
and writes a summary to `website-sync/`. `--skip-extraction` skips the extraction step.

## click-nav.mjs

Smoke-clicks every same-site nav link against a running `npm run dev` server.

## Link checking

There is no separate link checker. `npm run check` fails the build on any broken same-site reference
(unify's reference check), `npm run audit` reports page-level issues, and `npm run audit:external`
additionally fetches every off-site link.
