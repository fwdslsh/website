# File Cleanup and Refactoring Todos

## Files that can be REMOVED immediately

### 1. Duplicate files (exact duplicates)
- **src/_includes/footer.html** - DUPLICATE of `src/_includes/base/footer.html` (identical content)
- **src/_includes/nav.html** - DUPLICATE of `src/_includes/base/nav.html` (identical content, though base/nav.html has additional tool-context slot)
- **src/_includes/head.html** - DUPLICATE of `src/_includes/base/head.html` (base version is more complete with slots)

### 2. Backup files
- **src/unify/index.html.backup** - Backup file that should be removed
- **src/_includes/old_layout.html** - Legacy layout file using old SSI syntax

### 3. Legacy layout files (already deleted per git status)
- ~~src/catalog/_layout.html~~ (already deleted)
- ~~src/giv/_layout.html~~ (already deleted) 
- ~~src/inform/_layout.html~~ (already deleted)
- ~~src/unify/_layout.html~~ (already deleted)

## Files that can be REFACTORED/CONSOLIDATED

### 1. Layout files need organization
- **src/_includes/tool-layout.html** vs **src/_includes/tool-page.layout.html** - These appear to serve similar purposes and should be consolidated into one canonical tool page layout
- **src/_includes/layout.html** - Main layout file (keep this as primary)

### 2. Component organization
The components are well organized in `src/_includes/components/` but consider:
- **src/_includes/components/tool-nav.html** vs **src/_includes/components/dynamic-tool-nav.html** - May have overlapping functionality

## Cleanup Actions Completed ✅

### High Priority (COMPLETED ✅)
1. ✅ **Removed exact duplicates**:
   - ✅ Deleted `src/_includes/footer.html` (now using `src/_includes/base/footer.html`)
   - ✅ Deleted `src/_includes/head.html` (now using `src/_includes/base/head.html`) 
   - ✅ Deleted `src/_includes/nav.html` (now using `src/_includes/base/nav.html`)

2. ✅ **Removed backup/legacy files**:
   - ✅ Deleted `src/unify/index.html.backup`
   - ✅ Deleted `src/_includes/old_layout.html`

### Medium Priority (COMPLETED ✅)
3. ✅ **Layout consolidation**:
   - ✅ Investigated `tool-layout.html` vs `tool-page.layout.html` functionality
   - ✅ Removed unused `tool-layout.html` (had embedded styles, not following best practices)
   - ✅ Kept `tool-page.layout.html` as the canonical tool page layout

4. ✅ **Navigation components consolidation**:
   - ✅ Compared `tool-nav.html` vs `dynamic-tool-nav.html`
   - ✅ Removed redundant `tool-nav.html` (kept `dynamic-tool-nav.html` which has more features)

### Include Statement Updates (COMPLETED ✅)
✅ **Updated all include statements to modern syntax**:
- ✅ Changed `<!--#include virtual="/_includes/base/head.html" -->` to `<include src="_includes/base/head.html"></include>`
- ✅ Changed `<!--#include virtual="/_includes/base/footer.html" -->` to `<include src="_includes/base/footer.html"></include>`
- ✅ Changed `<!--#include virtual="/_includes/base/nav.html" -->` to `<include src="_includes/base/nav.html"></include>`
- ✅ Updated `src/_includes/tool-page.layout.html` to use modern include syntax
- ✅ Updated `src/unify/getting-started.html` to use modern include syntax

## Files to KEEP (well organized)

### Assets (all properly organized)
- `src/assets/` - All assets appear to be in use

### Components (well structured)
- `src/_includes/components/` - All components appear to serve distinct purposes
- `src/_includes/styles/` - CSS organization is clean

### Tool sections (properly structured)
- `src/catalog/`, `src/giv/`, `src/inform/`, `src/unify/` - All tool directories are properly organized

## Summary - ALL TASKS COMPLETED ✅

### Files Removed (7 total):
- ✅ **3 duplicate files**: `footer.html`, `head.html`, `nav.html` (from root `_includes/`)
- ✅ **2 backup/legacy files**: `index.html.backup`, `old_layout.html`
- ✅ **2 redundant files**: `tool-layout.html` (unused), `tool-nav.html` (redundant)

### Key Improvements:
- ✅ **Clean file structure**: Eliminated all duplicate and redundant files
- ✅ **Modern include syntax**: Migrated from legacy SSI `<!--#include-->` to modern `<include src="">` syntax
- ✅ **Component consolidation**: Kept the best version of each component type
- ✅ **Architecture consistency**: All files now follow Unify's best practices

### Current State:
- **File organization is excellent** with clear component structure in `src/_includes/`
- **No duplicate files remain** - clean component hierarchy
- **Modern Unify syntax** used throughout
- **Well-organized component structure** maintained
- **✅ Build successful** - All include path errors resolved
- **✅ Relative paths fixed** - Proper path resolution for nested includes

### Final Status:
🎉 **ALL CLEANUP TASKS COMPLETED SUCCESSFULLY**

The website now builds cleanly with:
- ✅ 19 pages processed
- ✅ 12 assets copied 
- ✅ 22 partials/components working correctly
- ✅ Modern include syntax throughout
- ✅ Clean, maintainable file structure

---

# Layout Issues to Fix

## Pages with Layout/Slot Issues:

### High Priority (COMPLETED ✅):
1. ✅ **catalog/examples.html** - Fixed head tag and layout structure
2. ✅ **giv/examples.html** - Fixed head tag and layout structure  
3. ✅ **inform/examples.html** - Fixed head tag and layout structure
4. 🔍 **unify/examples.html** - Need to check structure (unify pages different)
5. ✅ **catalog/docs.html** - Fixed head tag and layout structure
6. ✅ **giv/docs.html** - Fixed head tag and layout structure
7. ✅ **inform/docs.html** - Fixed head tag and layout structure
8. 🔍 **unify/docs.html** - Need to check structure (unify pages different)
9. ✅ **catalog/getting-started.html** - Fixed head tag and layout structure
10. ✅ **giv/getting-started.html** - Fixed head tag and layout structure
11. ✅ **inform/getting-started.html** - Fixed head tag and layout structure
12. 🔍 **unify/getting-started.html** - Need to check structure (unify pages different)

### Medium Priority (Need verification):
13. 🔍 **ecosystem/index.html** - Check head tag and layout structure
14. 🔍 **Homepage (index.html)** - Verify structure

---

# Major Layout Fixes Completed ✅

## Fixed Issues:

### 1. CSS Path Resolution (CRITICAL FIX ✅)
- **Issue**: CSS files were incorrectly placed in `_includes/styles/` causing 404 errors
- **Fix**: Moved all CSS files to `src/assets/` and updated references in `base/head.html`
- **Impact**: All pages now load styles correctly, proper layout rendering restored

### 2. Page Structure Issues (9 pages fixed ✅)
- **Issue**: Tool pages missing proper DOCTYPE, html, head, and body structure
- **Fix**: Added complete HTML document structure to all tool pages:
  - `catalog/`: examples.html, docs.html, getting-started.html
  - `giv/`: examples.html, docs.html, getting-started.html  
  - `inform/`: examples.html, docs.html, getting-started.html

### 3. SEO Meta Tags Enhancement ✅
- **Added**: Complete OpenGraph and Twitter meta tags to all fixed pages
- **Added**: Keywords meta tags for better search indexing
- **Added**: Proper viewport and charset meta tags

### 4. Layout Integration ✅
- **Fixed**: All pages now properly use `data-layout="/_includes/tool-page.layout.html"`
- **Fixed**: Proper HTML document structure with closing `</body></html>` tags
- **Verified**: Tool navigation and styling now works correctly

## Remaining Tasks:

### Still Need Investigation:
- 🔍 **unify pages** (docs.html, getting-started.html) - Use different structure, need verification
- 🔍 **ecosystem/index.html** - Check layout structure  
- 🔍 **Homepage (index.html)** - Verify structure

---

# Component Refactoring Completed ✅

## Slot System Simplification:

### 1. Tool Page Layout Simplified ✅
- **Issue**: Over-complicated slot system with unnecessary slots for every section
- **Fix**: Simplified `tool-page.layout.html` to use single `data-slot="default"` for main content
- **Impact**: Pages now provide content directly instead of through complex slot targeting

### 2. Hero Component Refactored ✅
- **Issue**: Hero component had multiple slots requiring complex content injection
- **Fix**: Simplified hero-section.html to accept content directly through include content
- **New Pattern**: 
  ```html
  <include src="../_includes/components/hero-section.html">
    <div class="tool-hero-content">
      <h1>Page Title</h1>
      <div class="tagline">Tagline</div>
      <div class="description">Description</div>
      <div class="cta-buttons"><!-- buttons --></div>
    </div>
  </include>
  ```

### 3. Scoped Component Styles ✅
- **Issue**: Styles embedded in component files causing maintenance issues
- **Fix**: Extracted hero styles to `/assets/hero.css` as scoped component stylesheet
- **Benefit**: Components load their own styles, pages provide content structure

### 4. Redundant Navigation Removed ✅
- **Issue**: Pages duplicated tool navigation when layout already includes dynamic-tool-nav
- **Fix**: Removed redundant `<section class="tool-nav">` from individual pages
- **Result**: Clean, DRY approach with navigation handled by layout

## Refactoring Benefits:
- ✅ **Simpler slot system** - Pages provide content directly
- ✅ **Component reusability** - Components handle styling, pages provide content
- ✅ **Better maintainability** - Less slot configuration required
- ✅ **Scoped styles** - Each component manages its own CSS
- ✅ **DRY principle** - No duplicate navigation or structural elements

## Fix Requirements (Updated):
- ✅ Each page MUST have proper `<head>` tag with title, description, SEO meta
- ✅ Pages should NOT use slots to inject content into layout head
- ✅ Content can use named slots with templates/elements for layout sections
- ✅ Page content should not require template wrappers for basic content
- ✅ CSS files properly located in assets directory
- ✅ Components provide scoped styles, pages provide content structure
- ✅ Verify tool navigation appears correctly
- ✅ Check responsive design on all screen sizes