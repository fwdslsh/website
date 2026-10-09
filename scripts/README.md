# Scripts

## gen.mjs

The blog's post-list generator. unify runs it before every build, dev rebuild and audit
(`generate: scripts/gen.mjs` in `unify.yaml`), hands it the source-page inventory, and
builds what it writes into `_generated/` as if it were part of `site/`. It never writes into `site/`.

## check-version-sync.sh

Checks that the website matches the projects it documents, using sibling checkouts
(`../unify`):

- **unify** — the version in `../unify/package.json` against the `@fwdslsh/unify` version in `package-lock.json`.

Exits 1 on any mismatch.

Link checking needs no script: `npm run check` fails on any broken same-site reference, and
`npm run audit:external` also fetches every off-site link.
