# fwdslsh.dev

The website for [fwdslsh](https://github.com/fwdslsh), a small group of indie devs: our tools, short [unify](https://github.com/fwdslsh/unify), [fhold](https://github.com/fwdslsh/fhold), [akm](https://github.com/itlackey/akm) and [gutterpress](https://github.com/dimm-city/gutterpress) guides, and a blog. Built with [unify](https://github.com/fwdslsh/unify).

## Develop

Requires Node >= 22.12.0.

```bash
npm install
npm run dev      # http://localhost:3000, rebuilds and reloads on save
```

## Build and check

```bash
npm run check    # full build and every check, writes nothing
npm run audit    # page-level findings
npm run build    # writes dist/
npm test         # Playwright smoke tests
```

Build flags shared by every command live in `unify.yaml` at the repository root. Source is plain HTML and Markdown
in `site/` (with its layouts and `_includes/`), and the post-list generator is `scripts/gen.mjs`.
The look is the fwdslsh theme from [unify-docs-template](https://github.com/fwdslsh/unify/tree/main/templates/docs),
which `unify.yaml` extends; this site's own components are in `site/assets/site.css`.
To write a blog post, copy `site/blog/posts/_template.md`. After it deploys, CI cross-posts it to
the fwdslsh dev.to account; the blog list also shows articles from the dev.to and Medium accounts in
`scripts/external-articles.json` (see [scripts/README.md](scripts/README.md)). See [CLAUDE.md](CLAUDE.md) for how the site is put
together, and unify's
[authoring rules](https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md) for the composition model.
