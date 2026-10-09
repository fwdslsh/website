---
title: Getting started
description: Install gutterpress, scaffold a book, preview it live and export your first PDF.
class: t-start
---

# Getting started

From install to a PDF in four steps. The desktop app needs nothing else installed; the CLI needs a Chromium-based browser on the machine.

## 1. Install

Download the desktop app or a standalone CLI binary from the [latest release](https://github.com/dimm-city/gutterpress/releases/latest) for Windows, macOS or Linux. Or use a package manager for the CLI:

```sh
brew tap dimm-city/gutterpress https://github.com/dimm-city/gutterpress.git
brew install dimm-city/gutterpress/gutterpress   # macOS and Linux

npm install -g gutterpress                       # needs Node 22+
```

Check it with `gutterpress --version`. The downloads are unsigned for now; each release ships SHA-256 checksums and first-run notes for Gatekeeper and SmartScreen.

## 2. Scaffold a book

```sh
gutterpress new "My Book" --preset book
```

`--preset` is required and names what the book is designed for: `book` is a neutral 6×9in trade book, `dtrpg` is DriveThruRPG's letter-with-bleed page with print checks on, and `custom` takes your own `--page-width` and `--page-height` in points. You get a `manifest.yaml` filled in with your title, a starter chapter, a stylesheet and a git repo with the first snapshot recorded.

In the desktop app, the same thing is **Open a folder** on any directory with Markdown files in it.

## 3. Write and preview

```sh
gutterpress preview ./my-book
```

It prints a local URL and reloads on every save. Open it in a Chromium-based browser only: the PDF always renders in Chromium, so a preview in Firefox or Safari would place page breaks the PDF won't reproduce. The desktop app previews in its own bundled Chromium, so it always matches.

Add chapters as numbered files (`01-intro.md`, `02-rules.md`) or list them under `source.files` in the manifest.

## 4. Export

```sh
gutterpress build ./my-book                          # dist/my-book.pdf
gutterpress build ./my-book --format pdfx --icc profile.icc   # print-ready PDF/X
```

In the app it's **Export → PDF**. PDF/X output needs Ghostscript and qpdf installed; the CLI tells you up front if a chosen target can't be verified yet.

## Where to go next

[How it works](/gutterpress/concepts.html) covers the project shape and the layout directives, and [Examples](/gutterpress/examples.html) shows the common patterns. The complete [user guide](https://github.com/dimm-city/gutterpress/tree/main/examples/gutterpress-user-guide) is a gutterpress book itself, built with the commands it documents.
