# Scripts

## check-version-sync.sh

Checks that the website matches the projects it documents, using sibling checkouts
(`../rabit`, `../unify`):

- **rabit** — the version in `../rabit/package.json` against every `rabit/schemas/<version>/` the rabit pages
  and `src/.well-known/*.json` reference.
- **unify** — the version in `../unify/package.json` against the `@fwdslsh/unify` version in `package-lock.json`.

Exits 1 on any mismatch.

Link checking needs no script: `npm run check` fails on any broken same-site reference, and
`npm run audit:external` also fetches every off-site link.
