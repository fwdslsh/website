# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **fwdslsh website** - the official documentation and marketing site for the fwdslsh ecosystem. Built using the Unify static site generator, it serves as both a product showcase and a **demonstration of Unify's capabilities** combined with modern HTML/CSS/JS best practices. The site showcases how to create beautiful, easily maintained websites using Unify's component-based architecture without framework complexity.

## Purpose & Philosophy

This website demonstrates:
- **Modern web standards** with Unify's lightweight approach
- **Component-based architecture** without JavaScript frameworks
- **Clean, maintainable code** using convention over configuration
- **Performance-first design** with static HTML output
- **Progressive enhancement** with minimal JavaScript

## Development Commands

```bash
# Development server with live reload (powered by Unify's built-in server)
npm run dev

# Build static site to dist/ (using Unify's build system)
npm run build
```

## Unify Features Demonstrated

This website showcases key Unify capabilities:

### 1. Component Architecture
- **Reusable includes**: Components in `_includes/` using `<include src="...">` tags (resolved at build time)
- **DOM cascade composition**: Pages declare `data-unify="/_includes/layout.html"` on `<html>` and Unify merges page body into layout areas (e.g., `.unify-content`, `.unify-nav-links`).
- **Layout inheritance**: Layouts can themselves use `data-unify` for nested composition.

### 2. Build-Time Processing
- **Server-side includes**: Components resolved at build time for zero runtime overhead
- **Asset optimization**: Automatic tracking and copying of referenced assets
- **Pretty URLs**: SEO-friendly URL structure (when enabled)

### 3. Developer Experience
- **Live reload**: Automatic browser refresh during development
- **File watching**: Instant rebuilds on file changes
- **Zero configuration**: Works out of the box with sensible defaults

## Architecture

### Site Structure
The website leverages Unify's conventions:

- **src/** - Source files (Unify's default source directory)
  - **_includes/** - Non-emitting directory for reusable components
    - **base/** - Core layout components (head, nav, footer, scripts)
    - **components/** - UI components (hero sections, CTAs, feature grids)
    - **styles/** - CSS modules demonstrating modern CSS patterns
    - **layout.html** - Main site layout demonstrating slot-based composition
    - **tool-page.layout.html** - Specialized layout for tool documentation
  - **assets/** - Static assets automatically tracked and copied by Unify
  - **[tool-name]/** - Tool-specific sections showing content organization
    - Each contains: index.html, docs.html, examples.html, getting-started.html

### Template System

**IMPORTANT**: Use modern `<include>` elements (not SSI) and the `data-unify` attribute for layouts:

```html
<!-- Page declares its layout -->
<html lang="en" data-unify="/_includes/layout.html">
  <head>...</head>
  <body>...page content...</body>
</html>

<!-- Includes are resolved at build time -->
<include src="_includes/components/header.html"></include>
```

DOM Cascade rules applied by Unify:
- `data-unify` on `<html>` or `<body>` points to a layout file
- Page body content flows into layout areas by class (e.g., `.unify-content` for main, `.unify-nav-links` for tool nav)
- Head elements are merged (styles, scripts, meta) with layout head

### Modern CSS Practices
The site demonstrates:
- **CSS Custom Properties**: Theme variables for consistent styling
- **Component scoping**: Using modern CSS features like `@scope`
- **Responsive design**: Mobile-first approach with CSS Grid and Flexbox
- **Performance**: Minimal CSS with build-time optimization

## Key Implementation Patterns

### Leveraging Unify Features

#### 1. Component Composition
```html
<!-- Page declares layout via data-unify -->
<html lang="en" data-unify="/_includes/layout.html">
  <head>...</head>
  <body>
    <div class="unify-content">
      <h1>Page Content</h1>
    </div>
  </body>
</html>
```

#### 2. Reusable Components
```html
<!-- Using Unify's include system for DRY principles -->
<include src="_includes/components/hero-section.html"></include>
<include src="_includes/components/feature-grid.html"></include>
```

#### 3. Layout Hierarchy
- Unify automatically discovers `_layout.html` files
- Pages declare layouts with `data-unify="/path/to/layout.html"`
- Layouts themselves can cascade with their own `data-unify`

### Adding New Tool Pages
1. Create directory under `src/[tool-name]/` (follows Unify conventions)
2. Include standard pages leveraging Unify's fragment support
3. Use `tool-page.layout.html` to demonstrate layout reuse
4. Components automatically resolve through Unify's include system

### Best Practices Demonstrated

#### Modern HTML
- **Semantic markup**: Proper use of HTML5 elements
- **Accessibility**: ARIA labels and semantic structure
- **Progressive enhancement**: Works without JavaScript

#### Modern CSS
- **Custom properties**: Dynamic theming without preprocessors
- **Grid and Flexbox**: Modern layout techniques
- **Clamp() for typography**: Responsive sizing without media queries
- **Animation**: CSS-only animations for performance

#### Minimal JavaScript
- **Progressive enhancement**: Site works without JS
- **Event delegation**: Efficient event handling
- **Intersection Observer**: For scroll-triggered animations
- **No framework dependency**: Vanilla JS for maintainability

## Unify-Specific Considerations

### File Organization
Following Unify conventions:
- **Underscore prefix**: `_includes/` and `_layout.html` are non-emitting
- **Source directory**: All source in `src/` (Unify default)
- **Output directory**: Builds to `dist/` (Unify default)

### Build Optimizations
The site leverages:
- **Asset tracking**: Only referenced assets are copied
- **Incremental builds**: Development efficiency
- **Live reload**: Instant feedback via Server-Sent Events
- **Head deduplication**: Smart merging of meta tags and styles

### Migration Strategy
**IMPORTANT**: Always use modern `<include>` syntax for new content:
- ✅ `<include src="_includes/nav.html"></include>`
- ❌ `<!--#include virtual="/_includes/nav.html" -->`

Legacy SSI syntax is being phased out. When updating files, migrate to modern syntax.

### Known Issues
- Footer anchor links need absolute paths on non-homepage pages
- Some pages still use legacy SSI syntax (being migrated)

## Content Guidelines

### Tool Documentation Structure
Each tool section demonstrates Unify's capabilities:
1. **Overview page** (index.html) - Shows slot-based content injection
2. **Getting Started** - Demonstrates fragment pages with layouts
3. **Documentation** - Showcases component reuse
4. **Examples** - Illustrates code organization patterns

### Terminal Demonstrations
Showcasing CLI tools with styled components:
```html
<div class="terminal-demo">
  <div class="terminal-line">
    <span class="prompt">$</span> <span class="command">unify build</span>
    <span class="comment"> # Build with Unify</span>
  </div>
</div>
```

### Code Snippets
Using semantic HTML and CSS for syntax highlighting:
```html
<div class="code-snippet">
  <!-- Code examples demonstrating Unify usage -->
</div>
```

## Testing & Validation

### Local Development with Unify
1. Run `npm run dev` - Starts Unify's dev server with live reload
2. Test Unify's features:
   - Component hot reloading
   - Slot content updates
   - Asset reference tracking
3. Verify responsive design across devices
4. Test progressive enhancement (disable JS)

### Build Verification
1. Run `npm run build` - Unify builds static site
2. Check `dist/` for:
   - Resolved includes
   - Processed slots
   - Copied assets
3. Verify no build-time artifacts remain
4. Test production output performance

## Performance Showcases

This site demonstrates Unify's performance benefits:
- **Zero runtime overhead**: All processing at build time
- **Minimal JavaScript**: Only for progressive enhancements
- **Optimized assets**: Only referenced files included
- **Fast builds**: Leveraging Bun's speed
- **Instant feedback**: Live reload during development

## Why This Architecture Matters

This website serves as a reference implementation showing:
1. **How Unify simplifies development** without sacrificing power
2. **Modern web standards** working harmoniously with SSG
3. **Component reuse** without framework complexity
4. **Maintainability** through clear conventions
5. **Performance** through build-time optimization

When working on this site, always consider how changes can better demonstrate Unify's advantages and modern web best practices.
- It is VERY important to check the app-spec.md for implementation details when using Unify features
- use scoped styles in components to prevent global style leaks. only provide layout in component styles. let the global css apply the styles to them. organize the truly global css into the src/assets/styles.css. remove redundant CSS. refactor common ui elements to components. ensure pages include a head element with SEO best practices. ensure all designs work well on all screen sizes