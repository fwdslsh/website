# fwdslsh.dev

The website for [fwdslsh](https://github.com/fwdslsh), a small group of indie devs: our tools, the
[rabit](https://github.com/fwdslsh/rabit) docs, short [unify](https://github.com/fwdslsh/unify), [akm](https://github.com/itlackey/akm) and [gutterpress](https://github.com/dimm-city/gutterpress) guides, and a blog. Built with [unify](https://github.com/fwdslsh/unify).

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

Build flags shared by every command live in `src/unify.yaml`. Source is plain HTML and Markdown in `src/`.
To write a blog post, copy `src/blog/posts/_template.md`. See [CLAUDE.md](CLAUDE.md) for how the site is put
together, and unify's
[authoring rules](https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md) for the composition model.
