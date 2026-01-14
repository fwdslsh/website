# Website Sync Quick Start Guide

**New to website sync?** Start here for a fast introduction to keeping the website up to date.

---

## 🎯 What You Need to Know

The website documents multiple projects (disclose, gather, dispatch, etc.). When these projects change, the website needs to be updated. This guide helps you do that efficiently.

---

## 🚀 Quick Sync (5 minutes)

**Just want to check if updates are needed?**

```bash
cd /home/founder3/code/github/fwdslsh/website

# Run automated discovery
./scripts/full-sync.sh

# Review the summary
cat website-sync/sync-summary-*.md
```

**Output tells you:**
- ✓ Changes detected → Follow manual update process
- ✓ No changes → You're done!

---

## 📚 Three Key Documents

### 1. **WEBSITE_UPDATE_WORKFLOW.md** (Main Guide)
The comprehensive, step-by-step process for syncing the website.

**Use when:** You need to actually update website content.

**Covers:**
- Full sync (all projects, ~4-8 hours)
- Targeted sync (specific projects, ~1-3 hours)
- 6 phases: Discovery → Analysis → Planning → Implementation → Verification → Deployment

### 2. **WEBSITE_MIGRATION_PLAN.md** (Reference)
Historical document showing how to migrate from old tools (giv/unify) to new tools (hyphn/rabit/dispatch/disclose/gather).

**Use when:**
- Removing/adding entire tools from the website
- Understanding the complete change scope
- Planning major website restructuring

### 3. **scripts/README.md** (Automation)
Documentation for the automation scripts that speed up the sync process.

**Use when:**
- Understanding what each script does
- Setting up automated checks
- Troubleshooting script issues

---

## 🛠️ Available Scripts

Located in `scripts/` directory:

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `full-sync.sh` | Run complete discovery & analysis | **Start here** - checks everything |
| `auto-detect-changes.sh` | Check for project changes | Daily/weekly automated checks |
| `check-version-sync.sh` | Compare versions | Before/after updates |
| `validate-links.sh` | Check all links | Before deployment |
| `extract-project-info.sh` | Get project docs | Manual info extraction |

**Most common usage:**
```bash
# Check what needs updating
./scripts/full-sync.sh

# Then follow WEBSITE_UPDATE_WORKFLOW.md for manual updates
```

---

## 🔄 Typical Workflow

### Discovery (Automated)
```bash
# What changed since last sync?
./scripts/full-sync.sh
```

### Planning (Manual)
```bash
# Review generated reports
ls -la website-sync/

# Read extracted project info
cat website-sync/disclose-info.md

# Create update checklist
# (See WEBSITE_UPDATE_WORKFLOW.md Phase 3)
```

### Implementation (Manual)
```bash
# Create feature branch
git checkout -b website-sync-$(date +%Y%m%d)

# Update pages systematically
# (See WEBSITE_UPDATE_WORKFLOW.md Phase 4)

# Commit incrementally
git add src/disclose/index.html
git commit -m "docs: update disclose to v0.2.0"
```

### Verification (Semi-Automated)
```bash
# Build test
npm run build

# Check versions
./scripts/check-version-sync.sh

# Validate links
./scripts/validate-links.sh

# Manual visual review
npm run dev
```

### Deployment (Manual)
```bash
# Push and deploy
git push origin website-sync-$(date +%Y%m%d)

# (Follow your deployment process)
```

---

## 📋 Common Scenarios

### Scenario 1: "I need to update one project"

```bash
# 1. Check what changed
./scripts/full-sync.sh

# 2. Review specific project
cat website-sync/disclose-info.md

# 3. Update related pages manually
# Edit: src/disclose/index.html
# Edit: src/disclose/getting-started.html
# Edit: src/index.html (tool card)

# 4. Verify
npm run build
./scripts/check-version-sync.sh

# 5. Deploy
git add . && git commit -m "docs: update disclose to v0.2.0"
git push
```

**Time:** 1-2 hours

---

### Scenario 2: "Monthly full sync"

```bash
# 1. Run complete discovery
./scripts/full-sync.sh

# 2. Create comprehensive plan
# (See WEBSITE_UPDATE_WORKFLOW.md Phase 3)

# 3. Update all affected pages
# (Work through checklist systematically)

# 4. Full verification
npm run build
./scripts/check-version-sync.sh
./scripts/validate-links.sh

# 5. Deploy
git push
```

**Time:** 4-8 hours

---

### Scenario 3: "Automated daily check"

Add to crontab:
```bash
0 9 * * * cd /home/founder3/code/github/fwdslsh/website && ./scripts/auto-detect-changes.sh >> logs/sync-check.log 2>&1
```

If changes detected, you'll get exit code 1 → triggers notification/issue creation.

---

### Scenario 4: "Adding a new tool to the website"

Follow **WEBSITE_MIGRATION_PLAN.md** for complete process:

1. Create tool directory: `src/new-tool/`
2. Create 4 pages: index, getting-started, docs, examples
3. Update navigation and footer
4. Update home page tool card
5. Update ecosystem page
6. Test and deploy

**Time:** 4-5 hours

---

## 🔍 Understanding the Reports

After running `./scripts/full-sync.sh`, you'll find:

```
website-sync/
├── disclose-info.md              # Project documentation
├── gather-info.md                # Project documentation
├── changes-detected-*.md         # Git commit history
├── sync-summary-*.md             # Overall summary
└── last-sync.log                 # Last sync timestamp
```

**Read these to understand:**
- What changed in each project
- Which pages need updates
- Priority of updates

---

## ⚠️ Common Pitfalls

### ❌ Don't: Edit without checking source
Always read the project's README/CLAUDE.md first.

### ❌ Don't: Update versions without testing
Test commands and examples before publishing.

### ❌ Don't: Skip verification
Always run build and link checks.

### ✅ Do: Commit incrementally
One logical change per commit.

### ✅ Do: Update related pages together
If you update disclose/index.html, also check:
- src/index.html (tool card)
- src/ecosystem/index.html
- src/_includes/base/nav.html

### ✅ Do: Record your sync
Update `website-sync/last-sync.log` when done.

---

## 🎓 Learning Path

**Beginner:**
1. Start with scripts: `./scripts/full-sync.sh`
2. Read generated reports
3. Follow WEBSITE_UPDATE_WORKFLOW.md step-by-step
4. Do a targeted sync (1 project)

**Intermediate:**
5. Do a full sync (all projects)
6. Set up automated checks
7. Customize scripts for your workflow

**Advanced:**
8. Contribute improvements to workflow
9. Add new automation
10. Mentor others on the process

---

## 📞 Getting Help

**Script not working?**
- Check scripts/README.md for troubleshooting
- Verify paths in script match your directory structure

**Unsure what to update?**
- Review WEBSITE_UPDATE_WORKFLOW.md Phase 2 (Analysis)
- Look at project's CHANGELOG.md
- Ask project maintainer

**Content questions?**
- Refer to project's README.md and CLAUDE.md
- Check existing website pages for style/tone
- Follow content guidelines in WEBSITE_UPDATE_WORKFLOW.md

---

## 🚦 Status Indicators

When running scripts:

- `✓` Success - All good
- `⚠️` Warning - Attention needed, but not critical
- `✗` Error - Must be fixed
- `⊘` Skipped - Intentionally not run

Exit codes:
- `0` - Success (no action needed)
- `1` - Action needed (changes detected, mismatches found)
- `2` - Usage error (wrong arguments)

---

## 🎯 Quick Decision Tree

```
Need to update website?
│
├─ Don't know what changed?
│  └─ Run: ./scripts/full-sync.sh
│     ├─ No changes → Done!
│     └─ Changes found → Continue below
│
├─ Know exactly what to update?
│  └─ Skip to: WEBSITE_UPDATE_WORKFLOW.md Phase 4
│
├─ Adding/removing entire tool?
│  └─ Use: WEBSITE_MIGRATION_PLAN.md
│
└─ Setting up automation?
   └─ Read: scripts/README.md
```

---

## 📅 Recommended Schedule

**For Active Development:**
- Daily: Auto-check for changes (cron)
- Weekly: Quick review of changes
- Monthly: Full sync

**For Stable Projects:**
- Weekly: Auto-check for changes
- After releases: Targeted sync
- Quarterly: Full sync

---

## 🔗 Quick Links

- **[Full Workflow](WEBSITE_UPDATE_WORKFLOW.md)** - Complete process
- **[Migration Guide](WEBSITE_MIGRATION_PLAN.md)** - Major changes
- **[Script Docs](scripts/README.md)** - Automation reference

---

## ✨ Pro Tips

1. **Keep scripts up to date**
   - Add new projects to `auto-detect-changes.sh`
   - Adjust paths if repo structure changes

2. **Use git branches**
   - Always create feature branch for updates
   - Name: `website-sync-YYYYMMDD`

3. **Test locally first**
   - Run `npm run dev` and review changes
   - Check mobile view

4. **Batch related updates**
   - Update all pages for a project together
   - Don't mix different project updates in one commit

5. **Document what you learn**
   - Add notes to workflow doc
   - Share tips with team

---

**Ready to sync? Run this:**
```bash
cd /home/founder3/code/github/fwdslsh/website
./scripts/full-sync.sh
```

Then follow the summary report for next steps!

---

**Last Updated:** 2026-01-13
**Questions?** Check the full docs or ask the team.
