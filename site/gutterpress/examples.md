---
title: Examples
description: Common gutterpress patterns, from a two-column spread and running page headers to a print-ready PDF/X build in CI.
class: gp-examples
---

# Examples

The patterns you'll use first. The repo's [`examples/`](https://github.com/dimm-city/gutterpress/tree/main/examples) directory has complete projects to copy; `with-design-guide` is the most complete reference.

## A chapter with a two-column section

```markdown
@chapter

# Bestiary

Creatures of the lower districts, in alphabetical order.

@section {.gp-columns-2}

## Gutter hound

A lean scavenger with a nose for warm metal...

@end-section
```

`.gp-columns-2` and `.gp-columns-3` are the built-in column runs. Add `.gp-columns-flow` for a run that continues across pages, or `.gp-columns-balanced` for one that fits on a page with even columns.

## Page size, margins and bleed

Everything about the page is CSS. A letter-with-bleed page for print-on-demand:

```css
@page {
  size: 8.625in 11.25in;
  margin: 0.75in 0.625in;
  bleed: 0.125in;
}
```

The manifest's `page:` block is the size the built PDF is checked against, so keep the two matching.

## Running headers and page numbers

```css
@page {
  @top-center { content: string(chapter); }
  @bottom-center { content: counter(page); }
}
h1 { string-set: chapter content(); }
```

Each page's header picks up the current chapter title; the footer counts pages. No script, no manual placement.

## Embedding fonts

```css
@font-face {
  font-family: "Alegreya";
  src: url("../assets/fonts/Alegreya-Regular.woff2") format("woff2");
}
body { font-family: "Alegreya", serif; }
```

Embedded fonts measure the same in the preview and the PDF, and print services require them.

## A print-ready build in CI

The CLI is a single binary, so a GitHub Actions job can build the PDF/X on every push:

```yaml
- run: npm install -g gutterpress
- run: sudo apt-get install -y ghostscript qpdf
- run: gutterpress build ./my-book --format pdfx --icc assets/profile.icc
- uses: actions/upload-artifact@v4
  with: { name: book, path: dist/*.pdf }
```

A Chromium-based browser is required on the runner; the [Docker guide](https://github.com/dimm-city/gutterpress/blob/main/docs/docker.md) covers an image with every print tool preinstalled.

## Adding a look or a plugin

```sh
gutterpress ext add clean-book my-book --look     # a bundled stylesheet package
gutterpress ext add markdown-it-footnote my-book  # any markdown-it plugin
```

Both land under `extensions:` in the manifest. Your own `styles/book.css` stays the top layer.
