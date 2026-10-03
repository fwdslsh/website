---
title: Examples
description: Worked rabit examples, from a multi-repository warren to nested burrows and the manifest this site publishes.
class: rabit-examples
---

# Examples

Warrens, nested burrows, and the manifest this site publishes.

## Multi-repository warren

A central `.warren.json` that points at the burrows in other repositories:

```json
{
  "specVersion": "fwdslsh.dev/rabit/schemas/0.4.0/warren",
  "kind": "warren",
  "title": "My Organization Docs",
  "burrows": [
    { "id": "frontend", "title": "Frontend", "uri": "https://github.com/org/frontend" },
    { "id": "backend", "title": "Backend", "uri": "https://github.com/org/backend" }
  ]
}
```

## Nested burrows

A root burrow points into a sub-burrow, so an agent loads only what it needs at each level. The root `/.burrow.json`:

```json
{
  "specVersion": "fwdslsh.dev/rabit/schemas/0.4.0/burrow",
  "kind": "burrow",
  "title": "Project Root",
  "entries": [
    { "id": "readme", "kind": "file", "uri": "README.md" },
    { "id": "docs", "kind": "burrow", "uri": "docs/", "summary": "Documentation collection" }
  ]
}
```

And `/docs/.burrow.json`, which the `docs` entry leads to:

```json
{
  "specVersion": "fwdslsh.dev/rabit/schemas/0.4.0/burrow",
  "kind": "burrow",
  "title": "Documentation",
  "entries": [
    { "id": "getting-started", "kind": "file", "uri": "getting-started.md" },
    { "id": "api", "kind": "burrow", "uri": "api/", "summary": "API reference" }
  ]
}
```

## This site

fwdslsh.dev publishes its own burrow at [`/.well-known/burrow.json`](/.well-known/burrow.json) and a warren at [`/.well-known/warren.json`](/.well-known/warren.json).
