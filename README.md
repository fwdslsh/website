# fwdslsh.dev

The website for [fwdslsh](https://github.com/fwdslsh): documentation for
[rabit](https://github.com/fwdslsh/rabit), built with [unify](https://github.com/fwdslsh/unify).

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

Build flags shared by every command live in `src/unify.yaml`. Source is plain HTML in `src/`: one layout
(`src/_layout.html`), shared pieces in `src/_includes/`, and the rabit docs in `src/rabit/`. See
[CLAUDE.md](CLAUDE.md) for how the site is put together, and unify's
[authoring rules](https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md) for the composition model.
