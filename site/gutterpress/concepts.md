---
title: How it works
description: The gutterpress model in one page, including the project folder, the manifest, layout directives, CSS Paged Media, extensions and validation.
class: gp-concepts
---

# How it works

A project is a folder, the manifest says what's in it, Markdown carries the words, CSS carries the design, and Chromium prints it. This is the short version; the [user guide](https://github.com/dimm-city/gutterpress/tree/main/examples/gutterpress-user-guide) is the complete one.

## The project

```text
my-book/
├── manifest.yaml       # title, authors, preset, page size, stylesheets, file order
├── 01-introduction.md  # chapters, numbered for order
├── 02-chapter-two.md
├── assets/             # images, fonts, diagrams
├── extensions/         # looks and plugins added with gutterpress ext add
└── styles/
    └── book.css        # your stylesheet
```

Files build in the order the manifest lists them, or alphabetically if it lists none, which is why the numeric prefixes are the convention.

## The manifest

`manifest.yaml` holds the metadata (`title`, `authors`), the `preset` the book is designed for, the `page` size the built PDF is checked against (in points, 72 to the inch), the `styles` to load, the `source.files` order and the publishing `targets`. Anything you set explicitly wins over the preset. `gutterpress new` writes one for you.

## Markdown, plus directives

Chapters are ordinary Markdown with headings, lists, tables, blockquotes and `{#id .class}` attributes on headings. A small set of line-level directives handles what print needs and the web doesn't:

| Directive | What it does |
| --- | --- |
| `@chapter` | Wraps a chapter, with an automatic opener |
| `@page` | Starts a new page |
| `@page-break` | A hard break, no page wrapper |
| `@section .class` … `@end-section` | A styled region, such as `@section {.gp-columns-2}` for two columns |
| `@column-break`, `@spread` | Break a column, or span a two-page spread |
| `@continue` | Split a named section across a break without losing its identity |

A fresh project styles none of this. Headings and sections are plain HTML until your CSS, or a bundled look, gives them a design.

## CSS does the layout

Page size and margins come from `@page`. Bleed, running headers and footers, page numbers, columns and chapter openers are all CSS Paged Media, the W3C spec browsers mostly skip on screen but Chromium honours in print. Embed fonts with `@font-face` so the preview measures exactly what the PDF prints. The recommended way to organise the stylesheet, the [contextual cascade principle](https://github.com/dimm-city/gutterpress/blob/main/docs/contextual-cascade-principle.md), assigns variants by context rather than by class on every element.

## Extensions

A look is a stylesheet package; a plugin is a `markdown-it` plugin. Both are added with `gutterpress ext add <name> my-book` and listed under `extensions:` in the manifest, with your own `styles/book.css` as the layer on top. Hundreds of existing `markdown-it-*` plugins work as they are.

## Validation and output

`gutterpress build` renders through Chromium to a PDF in `dist/`. With `--format pdfx` it produces PDF/X with CMYK and an ICC profile for offset printing, and runs the checks a print service runs: image DPI, colour space, font embedding and the PDF's structure. The `dtrpg` preset turns those on by default; `--format html` writes a self-contained web version instead.
