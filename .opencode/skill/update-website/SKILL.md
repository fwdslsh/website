---
name: update-website
version: 1.0.0
description: Comprehensive workflow for synchronizing website documentation with project changes
triggers:
  - "update the website"
  - "sync website with projects"
  - "check website status"
  - "website needs updating"
  - "update documentation site"
category: documentation
author: fwdslsh team
tags:
  - documentation
  - website
  - sync
  - automation
---

# Website Update Skill

Automated workflow for keeping the fwdslsh website synchronized with project repositories.

## When to Use This Skill

Use this skill when:
- Projects have been updated and website documentation needs to reflect changes
- Version numbers on the website are outdated
- New features need to be documented on the website
- Monthly/quarterly full website sync is due
- User explicitly requests website update or sync

**Trigger phrases:**
- "update the website"
- "sync the website with latest projects"
- "check if website needs updating"
- "website documentation is outdated"

## Skill Overview

This skill automates the discovery and analysis phases of website synchronization, then guides through manual content updates following a structured workflow.

### Modes

**1. Full Sync (4-8 hours)**
- Reviews all projects
- Updates all affected pages
- Comprehensive analysis

**2. Targeted Sync (1-3 hours)**
- Reviews specific projects only
- Updates related pages only
- Focused updates

## Prerequisites

Before running this skill:
- [ ] Clean git working directory (no uncommitted changes)
- [ ] Located in website directory
- [ ] All project repositories accessible
- [ ] npm dependencies installed

## Execution Steps

### Phase 1: Automated Discovery (15-30 minutes)

**Step 1.1: Check Current Status**

Run the automated discovery script:

```bash
cd /home/founder3/code/github/fwdslsh/website
./scripts/full-sync.sh
```

**Expected Output:**
- Project information extracted to `website-sync/`
- Change detection report
- Version synchronization status
- Summary report generated

**Step 1.2: Review Discovery Reports**

Read the generated reports:

```bash
# Overall summary
cat website-sync/sync-summary-*.md

# Project-specific info
ls -la website-sync/*-info.md

# Change details
cat website-sync/changes-detected-*.md
```

**Decision Point:** Based on reports, determine:
- Are there changes? → Continue to Phase 2
- No changes? → Stop, website is up to date
- Version mismatches only? → Quick targeted sync

### Phase 2: Analysis & Planning (30-60 minutes)

**Step 2.1: Identify Affected Pages**

For each changed project, identify website pages to update:

**Project → Page Mapping:**
```
disclose → src/disclose/index.html
          src/disclose/getting-started.html
          src/disclose/docs.html
          src/disclose/examples.html
          src/index.html (tool card)
          src/ecosystem/index.html

gather → src/gather/index.html
        src/gather/getting-started.html
        src/gather/docs.html
        src/gather/examples.html
        src/index.html (tool card)
        src/ecosystem/index.html

dispatch → src/dispatch/index.html
          src/dispatch/getting-started.html
          src/dispatch/docs.html
          src/dispatch/examples.html
          src/index.html (tool card)
          src/ecosystem/index.html

# Similar mappings for other projects
```

**Step 2.2: Create Update Checklist**

Generate a prioritized checklist:

```markdown
# Website Update Checklist
Date: [YYYY-MM-DD]
Projects: [list]

## Critical (Do First)
- [ ] [Project]: Update version number (5min)
- [ ] [Project]: Fix incorrect commands (10min)

## High Priority
- [ ] [Project]: Add new feature section (30min)
- [ ] [Project]: Update command reference (45min)

## Medium Priority
- [ ] [Project]: Refresh examples (1hr)
- [ ] [Project]: Update integration docs (1hr)

## Low Priority
- [ ] [Project]: Polish descriptions (30min)

Total Time: [X hours]
```

**Step 2.3: Prepare Content Outlines**

For each page to update, create outline:

```markdown
# Update Outline: [project]/[page]

## Current State
[Brief description]

## Required Changes
1. Section: [Name]
   - Current: [text]
   - New: [text]
   - Source: [project README/CLAUDE.md]

2. Section: [Name]
   - Action: [Add|Update|Remove]
   - Content: [outline]

## Examples to Update
- Old: `old command`
- New: `new command`
```

### Phase 3: Implementation (2-5 hours)

**Step 3.1: Create Feature Branch**

```bash
git checkout -b website-sync-$(date +%Y%m%d)
```

**Step 3.2: Update Pages Systematically**

For each item in checklist:

1. **Read current content:**
```bash
cat src/[project]/[page].html
```

2. **Read source material:**
```bash
cat ../core/packages/[project]/README.md
cat ../core/packages/[project]/CLAUDE.md
```

3. **Make changes:**
Edit files following content guidelines (see docs/content-guidelines.md)

4. **Verify changes:**
```bash
git diff src/[project]/[page].html
```

5. **Test build:**
```bash
npm run build
```

6. **Commit incrementally:**
```bash
git add src/[project]/[page].html
git commit -m "docs: update [project]/[page] - [description]"
```

**Common Update Patterns:**

**Pattern A: Version Number**
```bash
sed -i 's/v0\.1\.0/v0\.2\.0/g' src/[project]/index.html
```

**Pattern B: Feature List**
```html
<!-- Add new feature -->
<li>Feature C - New in v0.2.0</li>
```

**Pattern C: Command Examples**
```html
<pre class="code-snippet">$ new-command --flag value
$ updated-command --new-option</pre>
```

**Pattern D: Tool Card (Home Page)**
```html
<div class="tool-card">
  <div class="tool-header">
    <div class="tool-icon">[letter]</div>
    <div>
      <h3>[tool]</h3>
      <div class="subtitle">[updated subtitle]</div>
    </div>
  </div>
  <p>[updated description]</p>
  <pre class="code-snippet">$ [updated commands]</pre>
  <p><strong>Why we built it:</strong> [updated reason]</p>
  <div class="tool-links">
    <a href="/[tool]">Documentation →</a>
    <a href="[github-url]">GitHub →</a>
  </div>
</div>
```

### Phase 4: Verification (30-60 minutes)

**Step 4.1: Build Verification**

```bash
npm run build
```

Expected: No errors, clean build

**Step 4.2: Version Check**

```bash
./scripts/check-version-sync.sh
```

Expected: All versions match

**Step 4.3: Link Validation**

```bash
./scripts/validate-links.sh
```

Expected: No broken links

**Step 4.4: Visual Review**

```bash
npm run dev
```

Then manually check:
- [ ] Home page renders correctly
- [ ] Updated tool pages work
- [ ] Navigation functional
- [ ] Mobile responsive
- [ ] No console errors

### Phase 5: Deployment (30 minutes)

**Step 5.1: Final Commit**

```bash
git log --oneline -10
git push origin website-sync-$(date +%Y%m%d)
```

**Step 5.2: Create Pull Request (if using)**

Title: `docs: website sync - [date]`

Body:
```markdown
## Summary
Synchronized website with latest project changes.

## Projects Updated
- **[Project A]**: v0.1.0 → v0.2.0
- **[Project B]**: New features added

## Changes
- [X] Project pages updated
- [X] Home page refreshed
- [X] Versions synchronized

## Testing
- [x] Build successful
- [x] Links validated
- [x] Visual review complete
```

**Step 5.3: Deploy**

Follow project-specific deployment process.

**Step 5.4: Record Sync**

```bash
echo "$(date +%Y-%m-%d)" > website-sync/last-sync.log
```

## Agent Guidance

### Information Sources Priority

When updating content, reference in this order:
1. **README.md** - Primary features and usage
2. **package.json** - Version and metadata
3. **CHANGELOG.md** - Recent changes
4. **CLAUDE.md** - Architecture and patterns
5. **docs/** directory - Detailed documentation

### Content Guidelines

**Tone:** Technical but accessible, focused on problems solved

**Code Examples:**
- Use real, tested commands
- Show expected output when helpful
- Use `$` for shell prompts

**Formatting:**
- Maintain existing HTML structure
- Use semantic tags (h2, h3, p, ul, etc.)
- Follow project's indentation style

**Key Sections:**
- Installation instructions
- Quick start example
- Feature list
- Command reference
- Integration examples

### Decision Points

**Q: Changes detected but not significant?**
A: Update only version numbers and minor text, skip full content refresh.

**Q: Major breaking changes?**
A: Add prominent notice, update all examples, document migration path.

**Q: New features added?**
A: Create new section, add to feature list, provide examples.

**Q: Examples need updating?**
A: Test commands first, verify output, then update.

**Q: Unsure about technical accuracy?**
A: Flag for project maintainer review, don't guess.

## Success Criteria

After skill execution:
- [ ] All changed projects have updated documentation
- [ ] Version numbers synchronized
- [ ] Build successful
- [ ] No broken links
- [ ] Visual review passed
- [ ] Changes committed and pushed
- [ ] Sync timestamp recorded

## Common Issues & Solutions

**Issue: Build fails after updates**
```bash
rm -rf .svelte-kit/ node_modules/
npm install
npm run build
```

**Issue: Version mismatch persists**
Check all locations:
- Page title
- Getting started section
- Installation commands
- Changelog section

**Issue: Links broken after restructuring**
```bash
./scripts/validate-links.sh
# Fix hrefs in source files
```

**Issue: Git conflicts**
```bash
git status
git diff
# Resolve conflicts manually
```

## Files Modified by This Skill

**Always Modified:**
- `website-sync/last-sync.log`
- `website-sync/*-info.md`
- `website-sync/sync-summary-*.md`

**Potentially Modified:**
- `src/[project]/index.html`
- `src/[project]/getting-started.html`
- `src/[project]/docs.html`
- `src/[project]/examples.html`
- `src/index.html` (home page tool cards)
- `src/ecosystem/index.html`
- `src/_includes/base/nav.html`
- `src/_includes/base/footer.html`

## Skill Output

This skill produces:

**Discovery Reports:**
- Project information files
- Change detection reports
- Version comparison results
- Link validation results
- Comprehensive summary

**Updated Website Content:**
- Synchronized documentation pages
- Updated version numbers
- Current feature descriptions
- Working code examples
- Valid links

**Git History:**
- Feature branch with incremental commits
- Clear commit messages
- Ready for review/deployment

## Time Estimates

| Task | Estimated Time |
|------|---------------|
| Discovery (automated) | 15-30 min |
| Analysis & Planning | 30-60 min |
| Implementation (1 project) | 30-90 min |
| Implementation (all projects) | 2-5 hours |
| Verification | 30-60 min |
| Deployment | 30 min |
| **Total (targeted)** | **1-3 hours** |
| **Total (full sync)** | **4-8 hours** |

## Related Documentation

- **docs/workflow-guide.md** - Complete workflow details
- **docs/migration-guide.md** - Adding/removing tools
- **docs/content-guidelines.md** - Writing standards
- **scripts/README.md** - Script documentation

## Continuous Improvement

After each sync:
- Note what took longer than expected
- Document new patterns discovered
- Update templates if needed
- Improve automation scripts

## Skill Metadata

**Version:** 1.0.0
**Last Updated:** 2026-01-13
**Maintained By:** fwdslsh team
**Review Frequency:** After each major sync

---

## Quick Reference Commands

```bash
# Check status
./scripts/full-sync.sh

# Verify versions
./scripts/check-version-sync.sh

# Validate links
./scripts/validate-links.sh

# Create branch
git checkout -b website-sync-$(date +%Y%m%d)

# Build test
npm run build

# Dev server
npm run dev

# Deploy
git push origin website-sync-$(date +%Y%m%d)

# Record sync
echo "$(date +%Y-%m-%d)" > website-sync/last-sync.log
```

---

**Ready to execute?**
1. Ensure prerequisites met
2. Run `./scripts/full-sync.sh`
3. Follow phases systematically
4. Document as you go
5. Verify thoroughly before deploying
