---
title: Specification
description: The rabit burrow manifest, its entry kinds, and how clients discover burrows and warrens.
class: rabit-spec
---

# Specification

The burrow manifest, its entries, and how clients find it.

## Burrow manifest

A burrow is a JSON document describing one collection of content. Every document carries a `specVersion` and a `kind`; everything else is optional except the `entries` list. A `docs/.burrow.json` might read:

```json
{
  "$schema": "fwdslsh.dev/rabit/schemas/0.4.0/burrow",
  "specVersion": "fwdslsh.dev/rabit/schemas/0.4.0/burrow",
  "kind": "burrow",
  "title": "Documentation Burrow",
  "description": "Documentation menu for agents.",
  "updated": "2026-01-13T00:00:00Z",
  "agents": {
    "context": "Technical documentation for Example Project.",
    "entryPoint": "start",
    "hints": ["Start with the quickstart guide"]
  },
  "entries": [
    { "id": "start", "kind": "file", "uri": "quickstart.md",
      "title": "Getting Started", "mediaType": "text/markdown", "priority": 10 },
    { "id": "api", "kind": "burrow", "uri": "api/",
      "title": "API Reference", "summary": "Endpoints, schemas, examples." }
  ]
}
```

## Entries

Each entry needs an `id` (unique within the burrow), a `kind`, and a `uri`. Optional fields include `title`, `summary`, `mediaType`, `sizeBytes`, `modified`, `sha256`, `tags`, `priority` (higher is more prominent), and `metadata`.

- **`file`**: a single document or resource.
- **`dir`**: a small directory with no burrow file of its own.
- **`burrow`**: a sub-directory with its own manifest; `uri` points at the directory.
- **`map`**: another burrow file; `uri` points at the JSON file itself.
- **`link`**: an external URI or cross-burrow reference.

## Discovery

Clients try each name in order at a location and stop at the first that answers:

1. `.burrow.json`: dotfile, recommended for git repositories
2. `burrow.json`: for web servers that block dotfiles
3. `.well-known/burrow.json`: the RFC 8615 location (this site uses it)

Warrens follow the same pattern with `.warren.json`, `warren.json`, and `.well-known/warren.json`. When both exist at a location, it is both a registry and a browsable collection. Relative `uri` values resolve against `baseUri` when present, otherwise against the manifest's own location.

The full specification lives in the [rabit repository](https://github.com/fwdslsh/rabit/blob/main/docs/rabit-spec.md).
