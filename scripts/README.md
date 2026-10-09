# Scripts

## gen.mjs

The blog's post-list generator. unify runs it before every build, dev rebuild and audit
(`generate: scripts/gen.mjs` in `unify.yaml`), hands it the source-page inventory, and
builds what it writes into `_generated/` as if it were part of `site/`. It never writes into `site/`.

The list also carries articles members publish elsewhere. `external-articles.json` names the
accounts: dev.to usernames under `devto`, Medium handles (without the `@`) under `medium`.

```json
{ "devto": ["fwdslsh"], "medium": ["someone"] }
```

Each account's articles are fetched at build time (dev.to's public API, Medium's RSS feed) and
listed by date beside this blog's posts, linking out, marked "on dev.to" or "on Medium". A dev.to
article whose canonical URL is on fwdslsh.dev is this blog's own cross-post and is left out. A
source that cannot be reached is reported and skipped, so an outage elsewhere never stops a build.

## crosspost-devto.mjs

Publishes this blog's posts to dev.to. CI runs it after every deploy of `main`
(`.github/workflows/swa.yml`): each post in `site/blog/posts/` that the dev.to account does
not carry yet is published there, its canonical URL set to the post's address here, so search
engines credit fwdslsh.dev. A post is matched by canonical URL and never posted twice; a post dated
in the future waits for a deploy after its date. Root-relative links and images become absolute
fwdslsh.dev addresses, and the leading `# Title` is dropped, since dev.to prints the title.

It needs a dev.to API key in the `DEVTO_API_KEY` repository secret (dev.to → Settings →
Extensions → DEV Community API Keys, for the fwdslsh account); without one it reports that and
publishes nothing. `npm run crosspost -- --dry-run` lists what it would publish.

`npm run test:scripts` tests both scripts against recorded dev.to and Medium responses.

## check-version-sync.sh

Checks that the website matches the projects it documents, using sibling checkouts
(`../unify`):

- **unify** — the version in `../unify/package.json` against the `@fwdslsh/unify` version in `package-lock.json`.

Exits 1 on any mismatch.

Link checking needs no script: `npm run check` fails on any broken same-site reference, and
`npm run audit:external` also fetches every off-site link.
