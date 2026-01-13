# Website Update Workflow Guide

This is the complete workflow documentation for the update-website skill.

> **Note:** This is a copy of the main workflow documentation for reference within the OpenCode skill context.

---

# Website Update Workflow: Keeping Documentation in Sync

**Purpose:** Repeatable process for synchronizing the fwdslsh website with changes in project repositories

**Modes:**
- **Full Sync** - Review all projects, update all pages
- **Targeted Sync** - Review specific projects, update related pages only

**Frequency:** Run after significant project changes, or on a regular schedule (monthly/quarterly)

---

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Pre-Requisites](#pre-requisites)
3. [Phase 1: Discovery](#phase-1-discovery)
4. [Phase 2: Analysis](#phase-2-analysis)
5. [Phase 3: Planning](#phase-3-planning)
6. [Phase 4: Implementation](#phase-4-implementation)
7. [Phase 5: Verification](#phase-5-verification)
8. [Phase 6: Deployment](#phase-6-deployment)
9. [Maintenance & Automation](#maintenance--automation)
10. [Appendices](#appendices)

---

## Workflow Overview

```
┌─────────────┐
│ Discovery   │ → Find changed projects and extract current state
└─────────────┘
       ↓
┌─────────────┐
│ Analysis    │ → Compare against website content, identify gaps
└─────────────┘
       ↓
┌─────────────┐
│ Planning    │ → Create update checklist and content outline
└─────────────┘
       ↓
┌─────────────┐
│Implementa-  │ → Update website pages with new content
│tion         │
└─────────────┘
       ↓
┌─────────────┐
│Verification │ → Test build, validate links, review content
└─────────────┘
       ↓
┌─────────────┐
│ Deployment  │ → Commit, push, deploy, monitor
└─────────────┘
```

**Estimated Time:**
- Full Sync: 4-8 hours
- Targeted Sync (1-2 projects): 1-3 hours

---

## Pre-Requisites

### Environment Setup

```bash
# Navigate to website directory
cd /home/founder3/code/github/fwdslsh/website

# Verify git status is clean
git status

# Pull latest changes
git pull origin main

# Ensure dependencies installed
npm install

# Verify build works
npm run build
```

### Required Information

- [ ] List of projects to review (for targeted sync)
- [ ] Access to project repositories
- [ ] Current website structure map
- [ ] Change log or release notes (if available)

### Project Repository Locations

**Core Monorepo Projects:**
- `disclose`: `/home/founder3/code/github/fwdslsh/core/packages/disclose/`
- `gather`: `/home/founder3/code/github/fwdslsh/core/packages/gather/`
- `catalog`: `/home/founder3/code/github/fwdslsh/core/packages/catalog/`
- `inscribe`: `/home/founder3/code/github/fwdslsh/core/packages/inscribe/`
- `reflect`: `/home/founder3/code/github/fwdslsh/core/packages/reflect/`
- `inform`: `/home/founder3/code/github/fwdslsh/core/packages/inform/`
- `hyphn`: `/home/founder3/code/github/fwdslsh/core/packages/hyphn/`
- `hyphn-*`: `/home/founder3/code/github/fwdslsh/core/packages/hyphn-*/`

**Standalone Projects:**
- `dispatch`: `/home/founder3/code/github/fwdslsh/dispatch/`
- `rabit`: `/home/founder3/code/github/itlackey/rabit/`

**Website:**
- Website root: `/home/founder3/code/github/fwdslsh/website/`
- Source files: `/home/founder3/code/github/fwdslsh/website/src/`

---

## Phase 1: Discovery

**Goal:** Identify what has changed in projects and extract current state

### Step 1.1: Select Projects to Review

**For Full Sync:**
```bash
# List all projects with documentation
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "core/packages/catalog"
  "core/packages/inform"
  "core/packages/hyphn"
  "dispatch"
  "rabit"
)
```

**For Targeted Sync:**
```bash
# Specify only projects to review
PROJECTS=(
  "core/packages/disclose"
  "dispatch"
)
```

### Step 1.2: Extract Project Metadata

For each project, gather:

**Checklist per project:**
- [ ] Package name and version
- [ ] Description (one-line and detailed)
- [ ] Installation method(s)
- [ ] Prerequisites/dependencies
- [ ] Key features list
- [ ] Primary commands/API
- [ ] Quick start example
- [ ] Integration points with other tools
- [ ] Recent changes (from CHANGELOG if available)

**Extraction Script:**

```bash
#!/bin/bash
# save as: scripts/extract-project-info.sh

PROJECT_DIR=$1
OUTPUT_FILE=$2

echo "# Project Information for $(basename $PROJECT_DIR)" > $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

# Package info
if [ -f "$PROJECT_DIR/package.json" ]; then
  echo "## Package Metadata" >> $OUTPUT_FILE
  jq -r '{name, version, description}' "$PROJECT_DIR/package.json" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
fi

# README content
if [ -f "$PROJECT_DIR/README.md" ]; then
  echo "## README Content" >> $OUTPUT_FILE
  cat "$PROJECT_DIR/README.md" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
fi

# CHANGELOG (recent entries)
if [ -f "$PROJECT_DIR/CHANGELOG.md" ]; then
  echo "## Recent Changes" >> $OUTPUT_FILE
  head -100 "$PROJECT_DIR/CHANGELOG.md" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
fi

# CLAUDE.md (developer guidance)
if [ -f "$PROJECT_DIR/CLAUDE.md" ]; then
  echo "## Developer Documentation" >> $OUTPUT_FILE
  head -200 "$PROJECT_DIR/CLAUDE.md" >> $OUTPUT_FILE
  echo "" >> $OUTPUT_FILE
fi

echo "Extracted info for $PROJECT_DIR to $OUTPUT_FILE"
```

**Usage:**
```bash
# Full sync
for project in "${PROJECTS[@]}"; do
  PROJECT_PATH="/home/founder3/code/github/fwdslsh/$project"
  OUTPUT="website-sync/$(basename $project)-info.md"
  ./scripts/extract-project-info.sh "$PROJECT_PATH" "$OUTPUT"
done

# Review extracted files
ls -la website-sync/
```

### Step 1.3: Identify Changes Since Last Sync

**Track last sync date:**
```bash
# Create or read sync tracking file
SYNC_LOG="website-sync/last-sync.log"

if [ -f "$SYNC_LOG" ]; then
  LAST_SYNC=$(cat "$SYNC_LOG")
  echo "Last sync: $LAST_SYNC"
else
  echo "No previous sync recorded"
  LAST_SYNC="2024-01-01"
fi
```

**Find changes per project:**
```bash
#!/bin/bash
# For each project, check git log since last sync

for project in "${PROJECTS[@]}"; do
  PROJECT_PATH="/home/founder3/code/github/fwdslsh/$project"

  if [ -d "$PROJECT_PATH/.git" ] || git -C "$PROJECT_PATH" rev-parse --git-dir > /dev/null 2>&1; then
    echo "=== Changes in $(basename $project) ==="
    git -C "$PROJECT_PATH" log --since="$LAST_SYNC" --oneline --no-merges
    echo ""
  fi
done
```

**Discovery Phase Output:**
- [ ] List of projects reviewed
- [ ] Extracted metadata files (one per project)
- [ ] Change summary (commits since last sync)
- [ ] Notes on major changes or breaking changes

---

## Phase 2: Analysis

**Goal:** Compare project state against current website content, identify gaps and outdated information

### Step 2.1: Map Projects to Website Pages

**Project → Website Page Mapping:**

```yaml
# website-sync/page-mapping.yaml

disclose:
  pages:
    - src/disclose/index.html
    - src/disclose/getting-started.html
    - src/disclose/docs.html
    - src/disclose/examples.html
  shared_pages:
    - src/index.html (tool card)
    - src/ecosystem/index.html
    - src/_includes/base/nav.html

gather:
  pages:
    - src/gather/index.html
    - src/gather/getting-started.html
    - src/gather/docs.html
    - src/gather/examples.html
  shared_pages:
    - src/index.html (tool card)
    - src/ecosystem/index.html
    - src/_includes/base/nav.html

dispatch:
  pages:
    - src/dispatch/index.html
    - src/dispatch/getting-started.html
    - src/dispatch/docs.html
    - src/dispatch/examples.html
  shared_pages:
    - src/index.html (tool card)
    - src/ecosystem/index.html
    - src/_includes/base/nav.html

# ... repeat for all projects
```

### Step 2.2: Compare Content

**For each project, compare:**

#### A. Version Numbers
```bash
# Extract current version from website
WEBSITE_VERSION=$(grep -oP 'version["\s:]+\K[0-9.]+' src/disclose/index.html | head -1)

# Extract version from project
PROJECT_VERSION=$(jq -r '.version' ../core/packages/disclose/package.json)

echo "Website: $WEBSITE_VERSION"
echo "Project: $PROJECT_VERSION"

if [ "$WEBSITE_VERSION" != "$PROJECT_VERSION" ]; then
  echo "⚠️  Version mismatch detected!"
fi
```

#### B. Feature Lists

**Checklist:**
- [ ] Compare feature bullets on index.html vs README.md
- [ ] Check for new features not mentioned on website
- [ ] Check for removed/deprecated features still on website
- [ ] Verify feature descriptions match

**Analysis Template:**

```markdown
# Content Gap Analysis: [Project Name]

## Version
- Website: X.Y.Z
- Project: A.B.C
- Status: [✓ Match | ⚠️ Outdated]

## Features
### Missing on Website:
- [ ] Feature A (added in v0.2.0)
- [ ] Feature B (added in v0.3.0)

### Outdated on Website:
- [ ] Feature C (description changed)
- [ ] Feature D (deprecated in v0.4.0)

### Removed from Project:
- [ ] Feature E (no longer present)

## Commands/API
### New Commands:
- `command-new --flag` - Description

### Changed Commands:
- `command-old` → `command-new` (renamed)

### Deprecated Commands:
- `command-deprecated` (use `replacement` instead)

## Installation Instructions
- [ ] Installation method changed
- [ ] New prerequisites added
- [ ] Breaking changes in setup

## Examples
- [ ] Examples need updating
- [ ] New use cases to add
- [ ] Integration examples outdated

## Priority: [High | Medium | Low]
## Estimated Effort: [Small | Medium | Large]
```

### Step 2.3: Generate Gap Report

**Create comprehensive report:**

```bash
# Generate analysis report
cat > website-sync/gap-report.md <<EOF
# Website Content Gap Report
Generated: $(date)
Last Sync: $LAST_SYNC

## Projects Reviewed
$(for p in "${PROJECTS[@]}"; do echo "- $(basename $p)"; done)

## Summary Statistics
- Projects analyzed: ${#PROJECTS[@]}
- Pages reviewed: [count]
- Gaps identified: [count]
- Outdated content: [count]
- New content needed: [count]

## High Priority Updates
[List critical gaps requiring immediate attention]

## Medium Priority Updates
[List important but non-critical gaps]

## Low Priority Updates
[List nice-to-have improvements]

## Detailed Analysis
[Include per-project analysis using template above]

EOF
```

**Analysis Phase Output:**
- [ ] Page mapping document
- [ ] Per-project content gap analysis
- [ ] Comprehensive gap report
- [ ] Prioritized update list

---

## Phase 3: Planning

**Goal:** Create actionable update plan with specific tasks

### Step 3.1: Prioritize Updates

**Priority Matrix:**

| Impact | Effort | Priority | Timeline |
|--------|--------|----------|----------|
| High | Small | Critical | Immediate |
| High | Medium | High | This week |
| High | Large | High | This sprint |
| Medium | Small | Medium | This sprint |
| Medium | Medium | Medium | Next sprint |
| Medium | Large | Low | Backlog |
| Low | Small | Low | Backlog |
| Low | Medium | Low | Backlog |
| Low | Large | Very Low | Future |

**Scoring Criteria:**

**Impact:**
- High: Critical information (version, breaking changes, security, installation)
- Medium: Important information (new features, changed APIs, examples)
- Low: Nice-to-have (polish, minor updates, optimization)

**Effort:**
- Small: <30 min (text changes, small corrections)
- Medium: 30min-2hrs (section rewrites, new examples)
- Large: 2hrs+ (new pages, major restructuring)

### Step 3.2: Create Update Checklist

**Template:**

```markdown
# Website Update Checklist
Sync Date: [YYYY-MM-DD]
Mode: [Full | Targeted]
Projects: [list]

## Critical Updates (Do First)
- [ ] [Project]: Update version number in index.html (5min)
- [ ] [Project]: Add breaking change notice to getting-started.html (15min)
- [ ] [Project]: Fix incorrect installation command (5min)

## High Priority Updates
- [ ] [Project]: Add new feature section (30min)
- [ ] [Project]: Update command reference table (45min)
- [ ] [Project]: Refresh examples with new API (1hr)

## Medium Priority Updates
- [ ] [Project]: Update integration examples (1hr)
- [ ] [Project]: Add new use case (45min)
- [ ] [Project]: Refresh screenshots/demos (30min)

## Low Priority Updates
- [ ] [Project]: Polish feature descriptions (30min)
- [ ] [Project]: Add more examples (1hr)
- [ ] [Project]: Update ecosystem narrative (45min)

## Shared Content Updates
- [ ] Update home page tool cards (15min each)
- [ ] Update navigation links (5min)
- [ ] Update footer (5min)
- [ ] Update ecosystem page (30min)

## Total Estimated Time: [X hours]
```

### Step 3.3: Create Content Outlines

**For each page to update:**

```markdown
# Content Outline: [Project]/[Page]

## Current State
[Brief description of current content]

## Required Changes
1. **Section: [Name]**
   - Current: [what it says now]
   - New: [what it should say]
   - Reason: [why the change]
   - Source: [where to get new info]

2. **Section: [Name]**
   - Action: [Add | Update | Remove]
   - Content: [specific text or outline]
   - Source: [project README, CLAUDE.md, etc.]

## Examples to Update
- Example 1: [description]
  - Old code: `old command`
  - New code: `new command`
  - Source: [project docs]

## Links to Verify
- [ ] GitHub repository link
- [ ] npm/package registry link
- [ ] API documentation link
- [ ] Related project links

## Acceptance Criteria
- [ ] Version numbers match project
- [ ] All commands tested and working
- [ ] Examples demonstrate current features
- [ ] Links verified and working
- [ ] No references to deprecated features
```

### Step 3.4: Coordinate Dependencies

**Check for cross-project impacts:**

```markdown
# Dependency Impact Matrix

## If updating [Project A]:
- Also review: [Project B] (integration examples)
- Also review: ecosystem page (workflow diagram)
- Also review: home page (tool card)

## If updating [Project B]:
- Also review: [Project A] (mentions B in examples)
- Also review: [Project C] (shares similar use cases)

## Shared Components Affected:
- Navigation (if adding/removing tools)
- Footer (if changing links)
- Home page (if changing descriptions)
- Ecosystem page (if changing integrations)
```

**Planning Phase Output:**
- [ ] Prioritized update checklist
- [ ] Per-page content outlines
- [ ] Time estimates
- [ ] Dependency map
- [ ] Assigned owner(s) if team-based

---

## Phase 4: Implementation

**Goal:** Execute updates systematically and track progress

### Step 4.1: Setup Implementation Environment

```bash
# Create feature branch
git checkout -b website-sync-$(date +%Y%m%d)

# Create backup of current content
mkdir -p website-sync/backup-$(date +%Y%m%d)
cp -r src/ website-sync/backup-$(date +%Y%m%d)/

# Setup progress tracking
touch website-sync/progress-$(date +%Y%m%d).log
```

### Step 4.2: Implementation Loop

**For each item in checklist:**

#### Process per Update:

1. **Read Current Content**
```bash
# Read the page to update
cat src/[project]/[page].html
```

2. **Read Source Material**
```bash
# Reference the project documentation
cat ../core/packages/[project]/README.md
cat ../core/packages/[project]/CLAUDE.md
```

3. **Make Changes**
```bash
# Edit the file
$EDITOR src/[project]/[page].html

# Or use sed/awk for simple replacements
sed -i 's/old-version/new-version/g' src/[project]/[page].html
```

4. **Verify Change**
```bash
# Review the diff
git diff src/[project]/[page].html

# Test build
npm run build
```

5. **Mark Complete**
```bash
# Log progress
echo "[$(date)] ✓ Updated [project]/[page]" >> website-sync/progress.log
```

6. **Commit Incrementally**
```bash
# Commit after each logical unit
git add src/[project]/[page].html
git commit -m "docs: update [project]/[page] - [brief description]"
```

### Step 4.3: Common Update Patterns

#### Pattern A: Update Version Number

**Find and replace:**
```bash
# In index.html or getting-started.html
sed -i 's/v0\.1\.0/v0\.2\.0/g' src/disclose/index.html
sed -i 's/version 0\.1\.0/version 0.2.0/g' src/disclose/getting-started.html
```

#### Pattern B: Update Feature List

**Before:**
```html
<ul class="feature-list">
  <li>Feature A</li>
  <li>Feature B</li>
</ul>
```

**After:**
```html
<ul class="feature-list">
  <li>Feature A</li>
  <li>Feature B</li>
  <li>Feature C - New in v0.2.0</li>
</ul>
```

#### Pattern C: Update Command Examples

**Before:**
```html
<pre class="code-snippet">$ old-command --flag
$ another-command</pre>
```

**After:**
```html
<pre class="code-snippet">$ new-command --flag value
$ another-command --new-option
$ newly-added-command</pre>
```

#### Pattern D: Add New Section

**Template:**
```html
<!-- New Section: [Feature Name] -->
<section class="feature-section">
  <h2>[Feature Name]</h2>
  <p>[Description]</p>

  <div class="code-example">
    <pre><code>$ [command-example]</code></pre>
  </div>

  <p>[Additional explanation]</p>
</section>
```

#### Pattern E: Update Integration Examples

**Before:**
```html
<p>Use with catalog:</p>
<pre>$ catalog build --input docs</pre>
```

**After:**
```html
<p>Use with catalog and disclose:</p>
<pre>$ catalog build --input docs --output index
$ disclose pack --query "topic" --scope context</pre>
```

### Step 4.4: Update Shared Content

**Home Page Tool Cards:**

```html
<!-- Template for tool card update -->
<div class="tool-card">
  <div class="tool-header">
    <div class="tool-icon">[letter]</div>
    <div>
      <h3>[tool-name]</h3>
      <div class="subtitle">[updated subtitle]</div>
    </div>
  </div>
  <p>[updated description reflecting new features]</p>

  <pre class="code-snippet">$ [updated commands showing latest API]</pre>

  <p><strong>Why we built it:</strong> [updated reasoning if changed]</p>

  <div class="tool-links">
    <a href="/[tool]">Documentation →</a>
    <a href="[verified-github-link]">GitHub →</a>
  </div>
</div>
```

**Navigation Updates:**

```html
<!-- src/_includes/base/nav.html -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/[tool]">[Tool Name]</a></li>
    <!-- Update display names if needed -->
    <!-- Add new tools -->
    <!-- Remove deprecated tools -->
  </ul>
</nav>
```

**Footer Updates:**

```html
<!-- src/_includes/base/footer.html -->
<footer>
  <div class="footer-links">
    <h3>Tools</h3>
    <ul>
      <li><a href="/[tool]">[Updated Tool Name]</a></li>
      <!-- Verify all links current -->
    </ul>
  </div>
</footer>
```

### Step 4.5: Track Progress

**Progress Log Format:**

```
[2026-01-13 10:00] ✓ Updated disclose/index.html - added v0.2.0 features
[2026-01-13 10:15] ✓ Updated disclose/getting-started.html - new installation steps
[2026-01-13 10:45] ✓ Updated disclose/docs.html - command reference table
[2026-01-13 11:00] ⚠️  Skipped disclose/examples.html - needs project maintainer input
[2026-01-13 11:30] ✓ Updated gather/index.html - version bump and new feed mode
[2026-01-13 12:00] ✓ Updated home page - refreshed disclose and gather tool cards
```

**Implementation Phase Output:**
- [ ] All planned updates completed
- [ ] Incremental git commits
- [ ] Progress log
- [ ] Notes on any deviations from plan
- [ ] List of items needing follow-up

---

## Phase 5: Verification

**Goal:** Ensure all changes are correct, complete, and working

### Step 5.1: Build Verification

```bash
# Clean build
npm run build

# Check for errors
if [ $? -eq 0 ]; then
  echo "✓ Build successful"
else
  echo "✗ Build failed - check errors above"
  exit 1
fi
```

### Step 5.2: Link Validation

**Check all links:**

```bash
#!/bin/bash
# scripts/validate-links.sh

echo "Checking internal links..."
find src/ -name "*.html" -exec grep -H 'href="/' {} \; | \
  while read line; do
    file=$(echo $line | cut -d: -f1)
    link=$(echo $line | sed 's/.*href="\([^"]*\)".*/\1/')
    target="src${link%/}/index.html"

    if [ ! -f "$target" ] && [ ! -f "src${link}" ]; then
      echo "⚠️  Broken link in $file: $link"
    fi
  done

echo "Checking external links..."
find src/ -name "*.html" -exec grep -oP 'href="https?://[^"]+' {} \; | \
  sort -u | \
  while read url; do
    url=${url#href=\"}
    if ! curl -s -f -o /dev/null "$url"; then
      echo "⚠️  Broken external link: $url"
    fi
  done
```

### Step 5.3: Content Review Checklist

**Per-project review:**

```markdown
# Content Review: [Project Name]

## Accuracy
- [ ] Version numbers match project
- [ ] Feature descriptions accurate
- [ ] Commands tested and working
- [ ] API references correct
- [ ] Prerequisites/dependencies correct

## Completeness
- [ ] All major features mentioned
- [ ] Installation instructions complete
- [ ] Quick start example works
- [ ] Integration points documented
- [ ] Links to additional resources

## Consistency
- [ ] Tone matches site voice
- [ ] Formatting consistent with other pages
- [ ] Code examples use same style
- [ ] Terminology consistent across pages

## Technical Verification
- [ ] All code examples tested
- [ ] Installation commands work
- [ ] Links point to correct repositories
- [ ] Version-specific info accurate

## Cross-References
- [ ] Tool mentioned correctly in home page
- [ ] Navigation links work
- [ ] Footer links work
- [ ] Ecosystem page updated
- [ ] Related tools reference this tool correctly
```

### Step 5.4: Visual Review

**Test in browser:**

```bash
# Start development server
npm run dev

# Open in browser
# Visit http://localhost:[port]
```

**Visual Checklist:**
- [ ] Home page renders correctly
- [ ] Tool cards display properly
- [ ] Navigation works on all pages
- [ ] Footer appears correctly
- [ ] Code examples have proper formatting
- [ ] Responsive layout works (mobile, tablet, desktop)
- [ ] No console errors in browser
- [ ] Images/assets load correctly

### Step 5.5: Comparison Review

**Compare before/after:**

```bash
# Generate diff report
git diff website-sync/backup-$(date +%Y%m%d)/src/ src/ > website-sync/changes.diff

# Review specific pages
git diff website-sync/backup-$(date +%Y%m%d)/src/disclose/ src/disclose/
```

### Step 5.6: Peer Review (Optional but Recommended)

**For team environments:**

1. **Create review document:**
```markdown
# Review Request: Website Sync [Date]

## Changes Summary
- Updated [X] projects
- Modified [Y] pages
- [Z] commits

## Key Changes
- [Project A]: Added feature X, updated version to Y
- [Project B]: Updated command reference, new examples
- Home page: Refreshed tool cards for A and B

## Review Needed For
- [ ] Technical accuracy of new content
- [ ] Tone and messaging consistency
- [ ] Example code correctness
- [ ] Link validity

## Testing Done
- [x] Build successful
- [x] Links validated
- [x] Commands tested
- [x] Visual review complete

## Branch: website-sync-YYYYMMDD
## Estimated Review Time: 30-60 min
```

2. **Request review from:**
- Project maintainers (for their respective tools)
- Technical writers (for clarity and consistency)
- QA/Testing (for functionality)

**Verification Phase Output:**
- [ ] Build successful
- [ ] All links validated
- [ ] Content review checklist completed
- [ ] Visual review passed
- [ ] Changes documented
- [ ] Peer review completed (if applicable)

---

## Phase 6: Deployment

**Goal:** Safely deploy updates to production

### Step 6.1: Pre-Deployment Checklist

```markdown
# Pre-Deployment Checklist

## Code Quality
- [ ] All git commits have clear messages
- [ ] No uncommitted changes (`git status` clean)
- [ ] No TODO or FIXME comments left
- [ ] No debug code left in files

## Testing
- [ ] Build successful locally
- [ ] All verification checks passed
- [ ] Manual testing completed
- [ ] Peer review approved (if applicable)

## Documentation
- [ ] Update log recorded
- [ ] Breaking changes noted (if any)
- [ ] Screenshots updated (if needed)

## Backup
- [ ] Previous version backed up
- [ ] Rollback plan ready
```

### Step 6.2: Commit and Push

```bash
# Review all changes
git status
git log --oneline -20

# If commits are messy, consider squashing
git rebase -i HEAD~[number-of-commits]

# Final commit message (if needed)
git commit --allow-empty -m "docs: website sync $(date +%Y-%m-%d)

Updated content for:
- [Project A]: version X.Y.Z
- [Project B]: new features
- [Project C]: command reference

Full details in individual commits."

# Push to remote
git push origin website-sync-$(date +%Y%m%d)
```

### Step 6.3: Create Pull Request (if using PR workflow)

**PR Template:**

```markdown
# Website Sync: [Date]

## Summary
Synchronized website documentation with latest project changes.

## Projects Updated
- **[Project A]** - v0.1.0 → v0.2.0
  - Added feature X
  - Updated command reference
  - New examples

- **[Project B]** - v1.0.0 → v1.1.0
  - Updated installation instructions
  - Refreshed integration examples

## Changes Made
- [X] Project pages updated
- [X] Home page tool cards refreshed
- [X] Ecosystem page updated
- [X] Navigation/footer verified

## Testing
- [x] Build successful
- [x] Links validated
- [x] Commands tested
- [x] Visual review completed

## Review Notes
[Any specific areas needing attention]

## Deployment
Ready for immediate deployment after approval.

## Rollback Plan
Previous state backed up at: `website-sync/backup-[date]/`
```

### Step 6.4: Deploy to Production

**Deployment methods vary by hosting. Examples:**

**Static host (Netlify, Vercel, GitHub Pages):**
```bash
# Merge to main branch
git checkout main
git merge website-sync-$(date +%Y%m%d)
git push origin main

# Hosting service auto-deploys from main
```

**Manual deployment:**
```bash
# Build production
npm run build

# Deploy build/ directory to hosting
rsync -avz build/ user@server:/var/www/fwdslsh/

# Or use hosting-specific deploy command
```

**Docker-based:**
```bash
# Build container
docker build -t fwdslsh/website:latest .

# Push to registry
docker push fwdslsh/website:latest

# Deploy on server
ssh server "docker pull fwdslsh/website:latest && docker-compose up -d"
```

### Step 6.5: Post-Deployment Verification

**Smoke test production site:**

```bash
# Basic availability
curl -I https://fwdslsh.dev/

# Check specific updated pages
curl -I https://fwdslsh.dev/disclose/
curl -I https://fwdslsh.dev/gather/

# Verify no 404s
# (use link checker or manual spot checks)
```

**Post-Deployment Checklist:**
- [ ] Homepage loads correctly
- [ ] Updated tool pages accessible
- [ ] Navigation works
- [ ] External links work
- [ ] No console errors
- [ ] Mobile view works
- [ ] Search works (if applicable)

### Step 6.6: Record Sync

```bash
# Update sync log
echo "$(date +%Y-%m-%d)" > website-sync/last-sync.log

# Create sync record
cat > website-sync/sync-$(date +%Y%m%d)-complete.md <<EOF
# Website Sync Complete
Date: $(date)
Branch: website-sync-$(date +%Y%m%d)
Deployed: Yes

## Projects Synced
$(cat website-sync/gap-report.md | grep "Projects analyzed" -A 5)

## Changes Applied
$(git log --oneline HEAD~10..HEAD)

## Next Sync
Recommended: [date 1 month from now]

## Notes
[Any observations, issues, or improvements for next time]
EOF

# Clean up temporary files
# (Keep backups and logs for reference)
```

**Deployment Phase Output:**
- [ ] Code pushed to repository
- [ ] Pull request created/merged (if using PR workflow)
- [ ] Production site updated
- [ ] Post-deployment checks passed
- [ ] Sync completion recorded
- [ ] Team notified (if applicable)

---

## Maintenance & Automation

### Regular Sync Schedule

**Recommended:**
- **Full Sync:** Monthly or after major releases
- **Targeted Sync:** Weekly or as-needed for critical updates
- **Emergency Sync:** Immediately for security issues or critical bugs

### Automation Opportunities

#### A. Scheduled Sync Checks

**Cron job to detect changes:**

```bash
#!/bin/bash
# scripts/auto-detect-changes.sh
# Run daily via cron

LAST_SYNC=$(cat website-sync/last-sync.log 2>/dev/null || echo "2024-01-01")
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "dispatch"
)

CHANGES_DETECTED=0

for project in "${PROJECTS[@]}"; do
  PROJECT_PATH="/home/founder3/code/github/fwdslsh/$project"

  if git -C "$PROJECT_PATH" log --since="$LAST_SYNC" --oneline --no-merges | grep -q .; then
    echo "Changes detected in $(basename $project)"
    CHANGES_DETECTED=1
  fi
done

if [ $CHANGES_DETECTED -eq 1 ]; then
  echo "Website sync recommended"
  # Send notification
  # Create GitHub issue
  # Or send email
fi
```

#### B. Version Monitoring

**Script to check version mismatches:**

```bash
#!/bin/bash
# scripts/check-version-sync.sh

declare -A PROJECT_VERSIONS

# Extract project versions
PROJECT_VERSIONS[disclose]=$(jq -r '.version' ../core/packages/disclose/package.json)
PROJECT_VERSIONS[gather]=$(jq -r '.version' ../core/packages/gather/package.json)

# Extract website versions
WEBSITE_VERSIONS[disclose]=$(grep -oP 'version["\s:]+\K[0-9.]+' src/disclose/index.html | head -1)
WEBSITE_VERSIONS[gather]=$(grep -oP 'version["\s:]+\K[0-9.]+' src/gather/index.html | head -1)

# Compare
for project in "${!PROJECT_VERSIONS[@]}"; do
  if [ "${PROJECT_VERSIONS[$project]}" != "${WEBSITE_VERSIONS[$project]}" ]; then
    echo "⚠️  Version mismatch in $project:"
    echo "   Project: ${PROJECT_VERSIONS[$project]}"
    echo "   Website: ${WEBSITE_VERSIONS[$project]}"
  fi
done
```

#### C. Link Validation CI

**GitHub Action example:**

```yaml
# .github/workflows/link-check.yml
name: Link Validation

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Validate links
        run: ./scripts/validate-links.sh
      - name: Create issue on failure
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Broken links detected on website',
              body: 'Automated link validation found broken links. Run sync workflow.'
            })
```

### Sync Workflow Improvements

**Continuous improvement checklist:**

After each sync, consider:
- [ ] What took longer than expected?
- [ ] What could be automated?
- [ ] What information was hard to find?
- [ ] What pattern repeats across projects?
- [ ] What tooling would help?

**Document improvements:**
```markdown
# Workflow Improvement Log

## [Date]
- **Issue:** Extracting feature lists from READMEs was manual
- **Solution:** Created script to parse markdown headers and bullets
- **Impact:** Saved 30 minutes per project

## [Date]
- **Issue:** Version numbers in multiple places on each page
- **Solution:** Centralized version in frontmatter, use template variables
- **Impact:** Single point of update per project
```

---

## Appendices

### Appendix A: Quick Reference Commands

```bash
# Full sync in one go (for experienced users)
./scripts/full-sync.sh

# Targeted sync
./scripts/targeted-sync.sh disclose gather

# Check for changes
./scripts/auto-detect-changes.sh

# Validate links
./scripts/validate-links.sh

# Check version sync
./scripts/check-version-sync.sh

# Extract project info
./scripts/extract-project-info.sh [project-path] [output-file]
```

### Appendix B: File Structure

```
website/
├── src/                          # Website source files
│   ├── [tool]/                   # Per-tool directories
│   │   ├── index.html
│   │   ├── getting-started.html
│   │   ├── docs.html
│   │   └── examples.html
│   ├── _includes/                # Shared components
│   └── assets/                   # Styles, images, etc.
├── website-sync/                 # Sync working directory
│   ├── last-sync.log            # Last sync timestamp
│   ├── [project]-info.md        # Extracted project info
│   ├── gap-report.md            # Analysis report
│   ├── progress.log             # Implementation progress
│   ├── backup-[date]/           # Content backups
│   └── sync-[date]-complete.md  # Completion record
└── scripts/                      # Automation scripts
    ├── extract-project-info.sh
    ├── auto-detect-changes.sh
    ├── validate-links.sh
    └── check-version-sync.sh
```

### Appendix C: Project Information Sources

**Priority order for information:**

1. **README.md** - Primary documentation, features, quick start
2. **package.json** - Version, dependencies, commands
3. **CHANGELOG.md** - Recent changes, breaking changes
4. **CLAUDE.md** - Developer guidance, architecture, patterns
5. **docs/** directory - Detailed documentation
6. **examples/** directory - Usage examples
7. **GitHub releases** - Release notes, version history

### Appendix D: Troubleshooting

**Common issues:**

**Build fails after updates:**
```bash
# Clear cache and rebuild
rm -rf .svelte-kit/ node_modules/
npm install
npm run build
```

**Links broken after restructuring:**
```bash
# Find all broken internal links
./scripts/validate-links.sh
# Update hrefs in source files
```

**Version numbers out of sync:**
```bash
# Use check script to find all mismatches
./scripts/check-version-sync.sh
# Update systematically
```

**Content conflicts:**
- Always prefer project source over website
- If in doubt, consult project maintainer
- Document ambiguities in sync notes

### Appendix E: Style Guide Quick Reference

**Tone:** Technical but accessible, focus on problems solved

**Code examples:**
- Always use real, tested commands
- Show expected output when helpful
- Use `$` for shell prompts
- Use proper syntax highlighting

**Formatting:**
- Use `<pre><code>` for multi-line code
- Use `<code>` for inline code
- Use semantic HTML (h2, h3, p, ul, etc.)
- Follow existing indentation style

**Terminology:**
- Be consistent across pages
- Use project's preferred terms
- Link to glossary if needed

---

## Workflow Execution Summary

### Full Sync Workflow
```bash
# 1. Setup (10 min)
cd /home/founder3/code/github/fwdslsh/website
git checkout main && git pull
mkdir -p website-sync
./scripts/extract-all-projects.sh

# 2. Analysis (1-2 hours)
./scripts/auto-detect-changes.sh
./scripts/check-version-sync.sh
# Review gap-report.md
# Create update checklist

# 3. Implementation (3-5 hours)
git checkout -b website-sync-$(date +%Y%m%d)
# Update pages systematically
# Commit incrementally
# Track progress

# 4. Verification (30 min)
npm run build
./scripts/validate-links.sh
# Manual visual review
# Peer review if available

# 5. Deployment (30 min)
git push origin website-sync-$(date +%Y%m%d)
# Create PR or merge directly
# Deploy to production
# Post-deployment checks

# 6. Record (10 min)
echo "$(date +%Y-%m-%d)" > website-sync/last-sync.log
# Create completion record
```

### Targeted Sync Workflow
```bash
# Same as full sync, but:
# - Only extract specified projects
# - Only update related pages
# - Shorter analysis phase
# - Estimated time: 1-3 hours total
```

---

**Document Version:** 1.0
**Last Updated:** 2026-01-13
**Maintained By:** fwdslsh team
**Review Frequency:** After each sync, update workflow as needed
