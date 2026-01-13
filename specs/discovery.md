
#### Layout Discovery Process

Unify uses a hierarchical layout discovery system with both automatic and explicit layout selection:

**1. Explicit Layout Override (Highest Priority)**

- HTML pages: `data-layout` attribute on root element OR `<link rel="layout">` in document head
- Markdown pages: `layout` key in frontmatter
- Layout files can be located anywhere in the src directory with any filename
- Layout path resolution supports:

**Full Path Syntax:**

- `data-layout="custom.html"` → Look relative to current page directory
- `data-layout="/path/to/layout.html"` → Look from source root (absolute path)
- `data-layout="../shared/layout.html"` → Look relative to current page

**Link Element Layout Discovery (Full HTML Documents Only):**

- `<link rel="layout" href="custom.html">` → Look relative to current page directory
- `<link rel="layout" href="/path/to/layout.html">` → Look from source root (absolute path)
- `<link rel="layout" href="../shared/layout.html">` → Look relative to current page
- Uses typical layout discovery on the `href` value (same path resolution as `data-layout`)
- Only applies to full HTML documents with `<head>` element
- Takes precedence over `data-layout` attribute if both are present

**Short Name Syntax (Convenience Feature):**

- `data-layout="blog"` → Searches for `_blog.layout.html` or `_blog.layout.htm`
- `<link rel="layout" href="blog">` → Same search pattern as `data-layout="blog"`
- Short names drop the underscore prefix (`_`), layout segment (`.layout`), and file extension
- Search order for short names:
  1. Current directory up through parent directories to source root
  2. Then `_includes` directory
- **Important**: Files must have `.layout.html` or `.layout.htm` suffix to be found via short name
- If no matching file found, a warning is produced
- Examples:
  - `data-layout="blog"` finds `_blog.layout.html` in directory hierarchy
  - `data-layout="docs"` finds `_docs.layout.htm` in directory hierarchy or `_includes`
  - `data-layout="api"` finds `_api.layout.html` in directory hierarchy

**2. Automatic Layout Discovery (Default Behavior)**

- **Only applies to files named exactly `_layout.html` or `_layout.htm`**
- Start in the page's directory
- Look for `_layout.html` or `_layout.htm`
- If not found, move up to parent directory and repeat
- Continue climbing the directory tree until reaching source root
- **Note**: Other layout files (e.g., `_blog.layout.html`, `_custom.html`) are NOT automatically applied

**3. Site-wide Fallback Layout (Lowest Priority)**

- If no `_layout.htm(l)` found in directory tree, look for `src/_includes/layout.html` or `src/_includes/layout.htm`
- Note: Files in `_includes` directory do **NOT** require underscore prefix
- This serves as the default site layout for all pages

**4. No Layout**

- If no layout is found at any level, render page content as-is

#### Layout Naming Convention

**Automatic Layout Discovery:**

- Only `_layout.html` or `_layout.htm` files are automatically applied
- These files must be named exactly as shown (with underscore prefix)
- Automatically discovered by climbing directory hierarchy

**Named Layouts (Referenced Explicitly):**

- Can be located anywhere in src directory
- Can have any filename (e.g., `header.html`, `blog-template.html`, `_custom.html`)
- Must be referenced explicitly via `data-layout` or frontmatter `layout`
- For short name discovery, must follow naming pattern `_[name].layout.htm(l)`
- Layouts in the `_includes` folder do not require the `_` prefix for short name discovery

**For regular directories:**

- Layout files should start with underscore (`_`) to be excluded from build output, unless in the `_includes` folder.
- Including `.layout.` in the filename is **required** for short name discovery
- Without `.layout.` suffix, layouts must be referenced by full path

**Examples:**

- `_layout.html` (auto-discovered default layout)
- `_blog.layout.html` (named layout, findable via `data-layout="blog"`)
- `_documentation.layout.html` (named layout, findable via `data-layout="documentation"`)
- `custom-template.html` (must reference via full path like `data-layout="custom-template.html"`)
- `_sidebar.html` (must reference via full path, not findable via short name)

**For `_includes` directory:**

- Layout files do NOT require underscore prefix (entire directory is excluded)
- `layout.html` or `layout.htm` serves as site-wide fallback
- Named layouts should follow pattern `[name].layout.htm(l)` for short name discovery

**Examples in `_includes`:**

- `layout.html` (site-wide fallback)
- `blog.layout.html` (findable via `data-layout="blog"`)
- `docs.layout.html` (findable via `data-layout="docs"`)

#### Example Directory Structure

```
src/
├── _includes/
│   ├── layout.html              # Site-wide fallback (no _ prefix needed)
│   ├── blog.layout.html         # Named blog layout in _includes
│   └── docs.layout.html         # Named docs layout in _includes
├── _layout.html                 # Root layout for all pages in src/
├── blog/
│   ├── _blog.layout.html        # Blog-specific layout
│   ├── post1.html               # Uses _blog.layout.html
│   └── post2.html               # Uses _blog.layout.html
├── docs/
│   ├── api/
│   │   ├── _api.layout.html     # API docs layout
│   │   └── endpoints.html       # Uses _api.layout.html
│   ├── _docs.layout.html        # General docs layout
│   └── guide.html               # Uses _docs.layout.html
├── about.html                   # Uses src/_layout.html
└── index.html                   # Uses src/_layout.html
```

**Layout Discovery Examples:**

- `blog/post1.html` uses `blog/_layout.html` if it exists (auto-discovery)
- `docs/api/endpoints.html` uses `docs/api/_layout.html` if it exists (auto-discovery)
- `docs/guide.html` uses `docs/_layout.html` if it exists (auto-discovery)
- `about.html` and `index.html` use `src/_layout.html` if it exists (auto-discovery)
- If `src/_layout.html` doesn't exist, they use `src/_includes/layout.html` (fallback)

**Short Name Reference Examples:**

- `<html data-layout="blog">` → Finds `_blog.layout.html` or `_blog.layout.htm` in directory hierarchy or `_includes`
- `<html data-layout="docs">` → Finds `_docs.layout.html` or `_docs.layout.htm` in directory hierarchy or `_includes`
- `<html data-layout="api">` → Finds `_api.layout.html` or `_api.layout.htm` in directory hierarchy or `_includes`
- If short name doesn't resolve to a `.layout.htm(l)` file, a warning is produced

**Full Path Reference Examples:**

- `<html data-layout="/shared/base.html">` → Uses `src/shared/base.html`
- `<html data-layout="../layouts/blog.html">` → Uses layout relative to page
- `<html data-layout="custom.html">` → Uses `custom.html` in same directory as page