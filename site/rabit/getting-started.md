---
title: Getting started
description: Set up rabit and publish your first burrow, so people and AI agents can find their way around your content.
class: rabit-start
---

# Getting started

Build your first burrow in three steps.

## 1. Create a manifest

Create a `.burrow.json` file in the root of your project or documentation directory:

```json
{
  "specVersion": "fwdslsh.dev/rabit/schemas/0.4.0/burrow",
  "kind": "burrow",
  "title": "My Project",
  "description": "Documentation for My Project",
  "entries": [
    {
      "id": "readme",
      "kind": "file",
      "uri": "README.md",
      "title": "README",
      "mediaType": "text/markdown"
    },
    {
      "id": "api",
      "kind": "burrow",
      "uri": "api/",
      "title": "API Docs"
    }
  ]
}
```

Or generate one from an existing directory with `rabit map ./docs --title "My Docs"`.

## 2. Add content

Make sure every file an entry's `uri` names exists relative to the manifest. A `burrow` entry's directory needs its own `.burrow.json`. Optionally add a `.burrow.md` beside the manifest: a human-readable guide to the same content.

## 3. Validate and explore

The reference client ships a `rabit` CLI. It runs on [Bun](https://bun.sh):

```sh
bun add -g @fwdslsh/rabit-client

rabit validate .burrow.json
rabit list ./ --format tree
rabit traverse https://example.com/docs --strategy priority
```
