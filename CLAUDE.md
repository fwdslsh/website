# CLAUDE.md

This repo is the fwdslsh website. It is authored as plain HTML and Markdown and built by the Unify static site generator from `@fwdslsh/unify`. Keep the site idiomatic to Unify and do not fight the generator with custom wrappers or template logic. The site should represent the gold standard of using Unify to build a static site.

## 1. Project shape

- The site source lives in `site/`.
- The repo root holds project settings and generator scripts, not published output.
- `unify.yaml` at the repo root stores the build flags that differ from unify's defaults: the production base URL `https://fwdslsh.dev/`, `pretty-urls`, and the generator script `scripts/gen.mjs`. Canonical links come with the base URL and the generator gets unify's page list by default, so neither is written; nor are defaults such as `source: site`.
- `scripts/gen.mjs` creates generated fragments for blog lists and recent posts; it runs before build/audit/dev.
- The publishable output is generated into `dist/` only when checks pass.

## 2. Build and verify

Run from the repo root:

```bash
npm run dev        # unify dev: build + watch + serve
npm run build      # unify build --clean --audit --strict
npm run check      # unify build --dry-run --strict
npm run audit      # unify audit --strict
npm run audit:external
npm test           # Playwright smoke tests
```

Important rules:
- `npm run build` is the release gate.
- `npm run check` is the same quality gate without writing output.
- A non-zero exit means the site did not publish; never report success on a failed build.
- `unify` requires Node >= 22.12.0.

## 3. Authoring rules

Follow Unify’s rules, not other generator conventions:

- Use plain HTML or Markdown. Do not add template variables, props, loops, or custom wrappers.
- A layout is the nearest `_layout.html` in the current or parent folder. Layouts are complete pages, not chained templates.
- Pages do not “wrap” Markdown with HTML to style it; CSS styles the generated markup.
- Reuse shared chrome with `<include src="/_includes/..."></include>` and fragments named `*.fragment.html`.
- Use real file paths in links, e.g. `/rabit/docs.html` rather than a route-like string; pretty URLs are generated at build time.
- Keep underscore-prefixed files and folders (`_includes`, `_layout.html`, `_generated`, `_drafts`, etc.) out of the published site.
- Every page should have its own title, description, and exactly one `<h1>` in the main content.
- Keep CSS in the stylesheet or scope component CSS locally; do not add framework-like behavior.
- Use modern CSS such as custom properties, layers, nesting, etc. to keep CSS clean and understandable.
- The site is a reference implementation of Unify: prefer the generator’s actual mechanisms over custom scripts.
- Blog posts need a date with a time in frontmatter for feed generation; otherwise they are omitted.

## 4. Repo context and related projects

This site is a companion site for the broader fwdslsh toolset:

- `site/unify/` — Unify docs and examples
- `site/rabit/` — Rabit spec and docs
- `site/akm/` — AKM docs
- `site/gutterpress/` — Gutterpress docs

The same project layout and conventions apply across those sections.

## More information

- Unify repo: https://github.com/fwdslsh/unify
- Unify authoring rules: https://github.com/fwdslsh/unify/blob/main/docs/authoring-rules.md
- Unify CLI reference: https://github.com/fwdslsh/unify/blob/main/docs/cli-reference.md
- Unify getting started: https://github.com/fwdslsh/unify/blob/main/docs/getting-started.md
- Unify docs site: https://unify.fwdslsh.dev/
- Rabit repo: https://github.com/fwdslsh/rabit
- AKM repo: https://github.com/itlackey/akm
- Gutterpress repo: https://github.com/dimm-city/gutterpress
- Production site: https://fwdslsh.dev
