# Website Migration Guide

This guide covers major website changes like adding or removing entire tools.

> **Note:** This is a copy of the migration documentation for reference within the OpenCode skill context.

---

# Website Migration Plan: Remove giv & unify, Add hyphn, rabit, dispatch, disclose, gather

**Date:** 2026-01-13
**Status:** Planning
**Estimated Effort:** 8-12 hours

## Executive Summary

This document outlines the comprehensive changes needed to migrate the fwdslsh website from showcasing `giv` and `unify` to instead highlighting the Hyph3n ecosystem tools: `hyphn`, `rabit`, `dispatch`, `disclose`, and `gather`.

## Current State Analysis

### Tools to Remove

#### 1. **giv** - AI-Powered Git Assistant
- **Location:** `src/giv/` directory
- **Pages:** index.html, docs.html, examples.html, getting-started.html
- **Description:** CLI tool for generating commit messages, changelogs, and release notes using AI
- **Status:** Being phased out in favor of Hyph3n ecosystem

#### 2. **unify** - Static Site Generator
- **Location:** `src/unify/` directory
- **Pages:** index.html, docs.html, about.html, features.html, getting-started.html
- **Description:** Zero-boilerplate, convention-based static site generator
- **Status:** Being phased out in favor of Hyph3n ecosystem

### Tools to Add

#### 1. **hyphn** - Agent, Command & Skill Sharing System
- **Package:** `@fwdslsh/hyphn`
- **Runtime:** Node.js/npm
- **Description:** CLI for sharing agents, commands, and skills between AI coding tools (OpenCode and Claude Code)
- **Key Features:**
  - Initialize `~/.hyphn/` directory with examples
  - Configure OpenCode and Claude Code
  - Add team sources for shared assets
  - MCP server integration for Claude Code
- **Installation:** `npm install -g @fwdslsh/hyphn`
- **Commands:** `hyphn init`, `hyphn setup`, `hyphn serve`, `hyphn list`, `hyphn sources add/rm`

#### 2. **rabit** - Burrows for the Agentic Web
- **Package:** N/A (specification + client libraries)
- **Runtime:** N/A (convention-based)
- **Description:** Simple convention for publishing content that both humans and AI agents can navigate reliably using manifest files
- **Key Features:**
  - `.burrow.json` manifest files for content navigation
  - Transport-agnostic (HTTP, Git, local files)
  - Warren system for registry of burrows
  - Agent-friendly structured content discovery
- **Comparison:** Modern evolution of Gopher protocol for AI age
- **Packages:** rabit-client (TypeScript/Bun), rabit-server (Docker), rabit-mcp (MCP plugin)

#### 3. **dispatch** - Secure Sandboxed Execution Environment
- **Package:** Docker container + CLI
- **Runtime:** Docker + Node.js 22
- **Description:** Containerized development environment for safely running Claude AI code assistance and CLI agents without risking host system
- **Key Features:**
  - Enterprise-grade security (sandboxed containers, bcrypt auth, OAuth support)
  - Resume anywhere with event-sourced architecture
  - Multiple session types (Terminal, Claude AI, File Editor)
  - Cron job management with real-time monitoring
  - VS Code Remote Tunnel integration
  - Git worktree support
- **Installation:** `curl -fsSL https://raw.githubusercontent.com/fwdslsh/dispatch/main/install.sh | bash`
- **Tech Stack:** SvelteKit 5, Socket.IO, node-pty, SQLite

#### 4. **disclose** - Learning Retrieval & Context Bundling
- **Package:** `@fwdslsh/disclose` (part of core monorepo)
- **Runtime:** Bun ≥1.3.0
- **Description:** CLI tool for retrieving and assembling context from the Hyph3n learning system
- **Key Features:**
  - Learning retrieval with FTS5 full-text search
  - Context bundling with token budget management
  - Session context generation for AI platforms
  - Multi-source discovery (context, history, skills)
  - Hybrid semantic + keyword search
  - Feedback-weighted ranking system
- **Commands:** `disclose learnings`, `disclose session-context`, `disclose pack`, `disclose locate`
- **Integration:** Works with inscribe (capture), catalog (indexing), reflect (feedback)

#### 5. **gather** - High-Performance Web Crawler
- **Package:** `@fwdslsh/gather` (part of core monorepo)
- **Runtime:** Bun ≥1.0.0
- **Description:** CLI tool that crawls websites, downloads Git repositories, and ingests social feeds, converting everything to Markdown
- **Key Features:**
  - Three operating modes: web crawl, git download, feed ingestion
  - Concurrent crawling with rate limiting
  - Robots.txt compliance
  - HTML → Markdown conversion with Turndown
  - Feed support: RSS/Atom, YouTube, X/Twitter, Bluesky
  - YAML configuration for batch operations
- **Commands:** `gather <url>`, `gather --feed <url>`, `gather <github-url>`
- **Integration:** Works with catalog for content indexing

**Note:** `catalog` and `inform` remain on the website but are NOT being modified in this migration.

## Detailed Migration Tasks

### Phase 1: Content Removal (2-3 hours)

#### 1.1 Remove giv Directory Structure
- **Action:** Delete `src/giv/` directory entirely
- **Files to remove:**
  - `src/giv/index.html`
  - `src/giv/docs.html`
  - `src/giv/examples.html`
  - `src/giv/getting-started.html`
  - `src/giv/index.html.backup`

#### 1.2 Remove unify Directory Structure
- **Action:** Delete `src/unify/` directory entirely
- **Files to remove:**
  - `src/unify/index.html`
  - `src/unify/docs.html`
  - `src/unify/about.html`
  - `src/unify/features.html`
  - `src/unify/getting-started.html`

#### 1.3 Update Navigation Components
- **File:** `src/_includes/base/nav.html`
- **Changes:**
  - Remove giv nav link
  - Remove unify nav link
  - Add hyphn nav link
  - Add rabit nav link
  - Add dispatch nav link
  - Add disclose nav link
  - Add gather nav link (if not present)
  - Keep catalog and inform links

- **File:** `src/_includes/components/dynamic-tool-nav.html`
- **Changes:** Update tool list to reflect new tool set

- **File:** `src/_includes/example.nav.html`
- **Changes:** Remove references to giv and unify examples

#### 1.4 Update Footer
- **File:** `src/_includes/base/footer.html`
- **Changes:**
  - Remove giv and unify from tool links
  - Add hyphn, rabit, dispatch, disclose, gather

### Phase 2: Home Page Updates (1-2 hours)

#### 2.1 Update Main Landing Page
- **File:** `src/index.html`
- **Current state:** Features 4 tool cards (giv, unify, inform, catalog)
- **Target state:** Feature 5-7 tool cards (hyphn, rabit, dispatch, disclose, gather, catalog, inform)

**Changes needed:**

1. **Hero Section:** Update tagline if it specifically references old tools
2. **Terminal Demo:** Replace commands that use `giv` and `unify`
   - Current includes: `unify build`, `giv message`
   - Replace with: `hyphn init`, `gather <url>`, `disclose session-context`, `dispatch start`

3. **Tool Cards:** Replace giv and unify cards entirely

**Tool Card Structure (reference existing):**
```html
<div class="tool-card">
  <div class="tool-header">
    <div class="tool-icon">[letter]</div>
    <div>
      <h3>[tool-name]</h3>
      <div class="subtitle">[one-line description]</div>
    </div>
  </div>
  <p>[paragraph description]</p>
  <pre class="code-snippet">$ [example commands]</pre>
  <p><strong>Why we built it:</strong> [reason]</p>
  <div class="tool-links">
    <a href="/[tool]">Documentation →</a>
    <a href="https://github.com/fwdslsh/[tool]">GitHub →</a>
  </div>
</div>
```

**Proposed New Tool Cards:**

1. **hyphn** (h icon)
   - Subtitle: "Share agents, commands & skills between AI tools"
   - Description: CLI for sharing extensible assets across OpenCode and Claude Code platforms
   - Commands: `$ hyphn init`, `$ hyphn setup`, `$ hyphn sources add ~/team-hyphn`
   - Why: AI coding tools shouldn't silo your custom workflows

2. **rabit** (r icon)
   - Subtitle: "Manifest-based navigation for AI agents"
   - Description: Simple convention for publishing content that both humans and AI can reliably navigate using .burrow.json manifests
   - Commands: `$ cat .burrow.json`, `$ rabit validate`, `$ rabit-client fetch`
   - Why: AI agents need structured paths, not HTML soup

3. **dispatch** (d icon)
   - Subtitle: "Secure sandboxed execution environment"
   - Description: Containerized dev environment for safely running Claude AI and CLI agents without risking your host system
   - Commands: `$ dispatch init`, `$ dispatch start`, `$ dispatch attach`
   - Why: Run AI assistants in complete isolation with enterprise-grade security

4. **disclose** (x icon - for context)
   - Subtitle: "Learning retrieval & context assembly"
   - Description: CLI tool for retrieving and bundling relevant context from the Hyph3n learning system with token budget management
   - Commands: `$ disclose learnings --query "auth"`, `$ disclose session-context`, `$ disclose pack`
   - Why: AI needs the right context, not everything

5. **gather** (g icon)
   - Subtitle: "High-performance web crawler"
   - Description: Crawl websites, download Git repos, ingest feeds - all converted to clean Markdown
   - Commands: `$ gather https://docs.example.com`, `$ gather github.com/owner/repo/tree/main/docs`
   - Why: Documentation migration shouldn't require frameworks

**Layout consideration:**
- Current grid is 2x2 for 4 tools
- New grid could be 3x2 for 6 tools, or 4x2 for 7+ tools
- Consider responsive breakpoints (reference existing CSS)

4. **Philosophy Section ("The Path Forward"):** Update if it specifically calls out old tools

### Phase 3: Create New Tool Pages (4-5 hours)

For each new tool, create a complete page set following the existing pattern.

#### 3.1 hyphn Pages

**Directory:** `src/hyphn/`

**Files to create:**
- `index.html` - Overview page
- `getting-started.html` - Installation and basic usage
- `docs.html` - Complete documentation
- `examples.html` - Usage examples and workflows

**Content outline for index.html:**
- Hero section with description
- Key features grid
- Installation instructions
- Quick start commands
- Integration examples (OpenCode + Claude Code)
- Links to docs and GitHub

**Content outline for getting-started.html:**
- Prerequisites (Node.js)
- Installation via npm
- First commands (`hyphn init`, `hyphn setup`)
- Understanding `~/.hyphn/` directory structure
- Adding sources
- Basic usage workflow

**Content outline for docs.html:**
- Complete command reference
- Configuration options (HYPHN_HOME, HYPHN_PATH)
- Directory structure explanation
- Integration with AI tools
- Troubleshooting

**Content outline for examples.html:**
- Team collaboration workflow
- Custom agent sharing
- Skill development and distribution
- Multi-project setup

#### 3.2 rabit Pages

**Directory:** `src/rabit/`

**Files to create:**
- `index.html`
- `getting-started.html`
- `docs.html`
- `examples.html`

**Content outline for index.html:**
- Comparison to Gopher protocol (heritage explanation)
- Core principles (convention over specification, transport agnostic)
- Burrow and Warren concepts
- Visual diagram of .burrow.json structure
- Use cases (documentation, knowledge bases, research)

**Content outline for getting-started.html:**
- Creating your first burrow
- Writing a .burrow.json manifest
- Optional .burrow.md companion file
- Testing with client tools
- Publishing your burrow

**Content outline for docs.html:**
- Specification overview
- Entry schema (id, kind, uri, title, etc.)
- File naming conventions (.burrow.json vs burrow.json vs .well-known/)
- Warren registries
- Agent instructions
- Discovery order

**Content outline for examples.html:**
- Documentation site burrow
- API reference burrow
- Multi-repository warren
- Local development burrow
- Integration with gather and catalog

#### 3.3 dispatch Pages

**Directory:** `src/dispatch/`

**Files to create:**
- `index.html`
- `getting-started.html`
- `docs.html`
- `examples.html`

**Content outline for index.html:**
- Security features highlight (sandboxing, auth, isolation)
- Resume anywhere concept (event sourcing)
- Session types (Terminal, Claude AI, File Editor)
- Architecture diagram
- Tech stack showcase

**Content outline for getting-started.html:**
- Prerequisites (Docker, bash)
- CLI installation via curl
- First run: `dispatch init` and `dispatch start`
- Accessing web interface (localhost:3030)
- Authentication setup
- Creating first session

**Content outline for docs.html:**
- Complete CLI command reference
- Configuration variables
- Docker setup details
- VS Code Remote Tunnel integration
- API documentation links
- Security best practices

**Content outline for examples.html:**
- Long-running AI tasks
- Multi-device workflows (laptop → desktop)
- Team shared environments
- Cron job automation
- Integration with Claude Code

#### 3.4 disclose Pages

**Directory:** `src/disclose/`

**Files to create:**
- `index.html`
- `getting-started.html`
- `docs.html`
- `examples.html`

**Content outline for index.html:**
- Learning system overview
- Context bundling concept
- Token budget management
- Integration points (inscribe, catalog, reflect)
- Architecture diagram

**Content outline for getting-started.html:**
- Prerequisites (Bun, Hyph3n ecosystem)
- Installation from monorepo
- First commands: `disclose learnings`, `disclose session-context`
- Understanding output formats
- Basic filtering

**Content outline for docs.html:**
- Complete command reference
- Configuration files (disclose.yaml)
- Environment variables (HYPHN_*, FWD_*)
- Output formats (Markdown, JSON, JSON envelope)
- Advanced features (semantic search, feedback ranking)
- Integration guide

**Content outline for examples.html:**
- Session initialization workflow
- Task-specific context assembly
- Learning discovery
- CI/CD integration
- Multi-source bundling

#### 3.5 gather Pages

**Directory:** `src/gather/`

**Files to create:**
- `index.html`
- `getting-started.html`
- `docs.html`
- `examples.html`

**Content outline for index.html:**
- Three operating modes (web, git, feed)
- Key features (concurrency, rate limiting, robots.txt)
- Performance characteristics
- Bun native APIs benefits
- Integration with catalog

**Content outline for getting-started.html:**
- Prerequisites (Bun)
- Installation options (Docker, npm, binary)
- Basic web crawl
- GitHub repo download
- Feed ingestion

**Content outline for docs.html:**
- Complete CLI reference
- Mode detection logic
- Configuration files (gather.yaml)
- Environment variables
- File filtering with glob patterns
- Output formats

**Content outline for examples.html:**
- Documentation site crawl
- Git repository subdirectory download
- YouTube channel ingestion
- RSS/Atom feed processing
- Batch operations with config files
- Integration with catalog workflow

### Phase 4: Update Ecosystem & Supporting Pages (1 hour)

#### 4.1 Ecosystem Page
- **File:** `src/ecosystem/index.html`
- **Changes:**
  - Remove giv and unify from tool descriptions
  - Add hyphn, rabit, dispatch, disclose, gather
  - Update integration workflow diagrams/descriptions
  - Update tool philosophy section to reflect Hyph3n ecosystem

#### 4.2 Shared Components

**File:** `src/_includes/components/hero-section.html`
- Review and update if it references specific tools

**File:** `src/_includes/components/feature-grid.html`
- Update feature descriptions if they call out old tools

**File:** `src/_includes/components/install-grid.html`
- Update installation examples to show new tools

**File:** `src/_includes/components/stats-section.html`
- Update statistics if they reference tool counts or features

**File:** `src/_includes/components/cta-section.html`
- Review CTA messaging for tool-specific references

#### 4.3 Layout Files

**File:** `src/_includes/layout.html`
- Verify no hardcoded references to old tools
- Update any metadata or SEO tags

**File:** `src/_includes/tool-page.html`
- Used by tool-specific pages, likely no changes needed
- Verify template still works for new tools

**File:** `src/_includes/example.layout.html`, `src/_includes/example.page.html`
- Update if they contain tool-specific examples

### Phase 5: Assets & Styling (1 hour)

#### 5.1 Icon Assets
- Create tool icons for new tools (if using custom icons)
- Existing tools use single-letter icons in CSS gradients
- New tools: h (hyphn), r (rabit), d (dispatch), x (disclose), g (gather)

#### 5.2 CSS Updates
- **File:** `src/assets/styles.css` (or inline styles)
- Verify tool card grid handles new tool count
- Update responsive breakpoints if needed
- Add any tool-specific color schemes

### Phase 6: Testing & Validation (1 hour)

#### 6.1 Build Verification
```bash
cd website/
npm run build
```
- Verify no broken links
- Check all new pages render
- Validate navigation works

#### 6.2 Manual Testing Checklist
- [ ] Home page loads and displays new tools
- [ ] Navigation links to all new tool pages work
- [ ] Each tool page (index, getting-started, docs, examples) renders correctly
- [ ] Footer links updated
- [ ] Ecosystem page reflects new tool set
- [ ] No 404s for old tool pages (they should be removed)
- [ ] Terminal demo commands are accurate
- [ ] Tool cards have correct GitHub links
- [ ] Mobile responsive layout works with new tool count
- [ ] Search functionality (if present) works

#### 6.3 Content Review
- [ ] All descriptions accurate and compelling
- [ ] Command examples tested and correct
- [ ] Installation instructions match current release
- [ ] GitHub links point to correct repositories
- [ ] Integration examples make sense
- [ ] No references to removed tools (giv, unify)

### Phase 7: Deployment (30 min)

#### 7.1 Pre-Deployment
- Review CHANGELOG or create migration notes
- Update website README if it lists tools
- Verify any CI/CD configuration

#### 7.2 Deployment Steps
- Commit changes with clear message
- Push to repository
- Deploy to hosting (process depends on hosting setup)
- Verify production site

#### 7.3 Post-Deployment
- Smoke test production site
- Update any external references (social media, docs)
- Monitor for broken links or issues

## File Change Summary

### Files to DELETE (2 directories, ~10 files)
```
src/giv/index.html
src/giv/docs.html
src/giv/examples.html
src/giv/getting-started.html
src/giv/index.html.backup
src/unify/index.html
src/unify/docs.html
src/unify/about.html
src/unify/features.html
src/unify/getting-started.html
```

### Files to CREATE (5 directories, ~20 files)
```
src/hyphn/index.html
src/hyphn/getting-started.html
src/hyphn/docs.html
src/hyphn/examples.html

src/rabit/index.html
src/rabit/getting-started.html
src/rabit/docs.html
src/rabit/examples.html

src/dispatch/index.html
src/dispatch/getting-started.html
src/dispatch/docs.html
src/dispatch/examples.html

src/disclose/index.html
src/disclose/getting-started.html
src/disclose/docs.html
src/disclose/examples.html

src/gather/index.html
src/gather/getting-started.html
src/gather/docs.html
src/gather/examples.html
```

### Files to MODIFY (20+ files)
```
src/index.html                                    # Major update (tool cards, terminal demo)
src/ecosystem/index.html                          # Update tool descriptions
src/_includes/base/nav.html                       # Update navigation links
src/_includes/base/footer.html                    # Update footer links
src/_includes/components/dynamic-tool-nav.html    # Update tool list
src/_includes/example.nav.html                    # Update example navigation
src/_includes/components/hero-section.html        # Review for tool mentions
src/_includes/components/feature-grid.html        # Update features
src/_includes/components/install-grid.html        # Update installation examples
src/_includes/components/stats-section.html       # Update statistics
src/_includes/components/cta-section.html         # Review CTA messaging
src/catalog/index.html                            # Update integration mentions
src/catalog/docs.html                             # Update workflow examples
src/catalog/getting-started.html                  # Update example commands
src/catalog/examples.html                         # Update integration examples
src/inform/index.html                             # Update integration mentions
src/inform/docs.html                              # Update workflow examples
src/inform/getting-started.html                   # Update example commands
src/inform/examples.html                          # Update integration examples
```

## Content Guidelines

### Tone & Voice
- Maintain existing fwdslsh brand voice: "Sharp tools for hackers who remember when software didn't fight you"
- Emphasize minimalism, readability, effectiveness
- Technical but accessible
- Focus on Unix philosophy and composability

### Tool Descriptions
- Lead with the problem being solved
- Highlight key differentiators
- Include concrete examples
- Show integration points with other tools
- Keep "Why we built it" sections short and compelling

### Code Examples
- Use real, tested commands
- Show full workflows, not just isolated commands
- Include expected output when helpful
- Demonstrate composability with other fwdslsh tools

## Risk Assessment & Mitigation

### High Risk
1. **Breaking existing links**
   - Mitigation: Add redirects from /giv/* and /unify/* to /ecosystem or home
   - Consider adding a migration notice for users

2. **Incomplete tool documentation**
   - Mitigation: Use README files from each project as source
   - Get content review from tool maintainers

3. **Broken integration examples**
   - Mitigation: Test all command examples before publishing
   - Verify GitHub repository links

### Medium Risk
1. **Layout issues with more tools**
   - Mitigation: Test responsive breakpoints thoroughly
   - Consider prioritizing 5-6 key tools over showing all

2. **Inconsistent tool page structure**
   - Mitigation: Create templates first, then fill content
   - Use existing catalog/inform pages as references

3. **SEO impact from removing tools**
   - Mitigation: Add proper redirects
   - Update sitemap if present

### Low Risk
1. **Asset loading issues**
   - Mitigation: Test build process
   - Verify all relative paths

2. **Navigation becoming cluttered**
   - Mitigation: Consider dropdown or grouped navigation
   - Prioritize core tools in main nav

## Open Questions

1. **Tool Priority:** Should all 5 new tools get equal prominence, or should some be secondary?
   - Recommendation: Feature hyphn, dispatch, and gather prominently; rabit and disclose as supporting tools

2. **Redirects:** Should /giv and /unify redirect to specific pages or just to ecosystem?
   - Recommendation: Redirect both to /ecosystem with an anchor to "Legacy Tools" section

3. **GitHub Links:** What's the canonical GitHub location for each tool?
   - hyphn: github.com/fwdslsh/hyphn
   - rabit: github.com/itlackey/rabit (needs clarification)
   - dispatch: github.com/fwdslsh/dispatch
   - disclose: github.com/fwdslsh/core/tree/main/packages/disclose
   - gather: github.com/fwdslsh/core/tree/main/packages/gather

4. **Ecosystem Narrative:** How should the website tell the Hyph3n ecosystem story vs individual tools?
   - Recommendation: Home page shows tools, ecosystem page explains how they work together

5. **Installation Instructions:** Some tools are in monorepo, some standalone - how to present consistently?
   - Recommendation: Show the simplest install path, link to detailed docs for monorepo packages

## Success Criteria

- [ ] Website builds without errors
- [ ] All navigation links work
- [ ] No references to giv or unify remain
- [ ] All 5 new tools have complete documentation
- [ ] Mobile responsive layout works
- [ ] Integration examples make sense
- [ ] SEO metadata updated
- [ ] External links verified
- [ ] Content reviewed by stakeholders
- [ ] Deployed to production successfully

## Timeline Estimate

| Phase | Estimated Time |
|-------|---------------|
| Phase 1: Content Removal | 2-3 hours |
| Phase 2: Home Page Updates | 1-2 hours |
| Phase 3: Create New Tool Pages | 4-5 hours |
| Phase 4: Update Supporting Pages | 1 hour |
| Phase 5: Assets & Styling | 1 hour |
| Phase 6: Testing & Validation | 1 hour |
| Phase 7: Deployment | 30 minutes |
| **Total** | **10-12.5 hours** |

## Next Steps

1. **Review & Approve Plan:** Stakeholder sign-off on approach
2. **Content Preparation:** Gather all README files and documentation sources
3. **Create Templates:** Build page templates for new tools first
4. **Incremental Development:** Work phase by phase with testing between phases
5. **Content Review:** Have tool maintainers review their respective pages
6. **Final Review:** Complete content and link audit
7. **Deploy:** Push to production with monitoring

## Appendices

### A. Repository URLs
- **hyphn:** https://github.com/fwdslsh/hyphn (assumed)
- **rabit:** https://github.com/itlackey/rabit (needs confirmation)
- **dispatch:** https://github.com/fwdslsh/dispatch
- **disclose:** https://github.com/fwdslsh/core (monorepo)
- **gather:** https://github.com/fwdslsh/core (monorepo)

### B. README Source Files
- hyphn: `/home/founder3/code/github/fwdslsh/core/packages/hyphn/README.md`
- rabit: `/home/founder3/code/github/itlackey/rabit/README.md`
- dispatch: `/home/founder3/code/github/fwdslsh/dispatch/README.md`
- disclose: `/home/founder3/code/github/fwdslsh/core/packages/disclose/README.md`
- gather: `/home/founder3/code/github/fwdslsh/core/packages/gather/README.md`

### C. Existing Tool Pages for Reference
- catalog: `src/catalog/` (keep as-is, minor updates only)
- inform: `src/inform/` (keep as-is, minor updates only)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-13
**Author:** Migration Planning Team
**Status:** Ready for Review
