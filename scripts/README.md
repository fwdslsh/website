# Website Sync Automation Scripts

This directory contains scripts to automate the website synchronization workflow.

## Available Scripts

### extract-project-info.sh
Extracts documentation from project repositories for website updates.

**Usage:**
```bash
./extract-project-info.sh <project-dir> <output-file>
```

**Example:**
```bash
./extract-project-info.sh ../core/packages/disclose website-sync/disclose-info.md
```

**What it extracts:**
- package.json metadata (name, version, description)
- README.md content
- CHANGELOG.md (recent entries)
- CLAUDE.md (developer documentation)

---

### auto-detect-changes.sh
Automatically detects changes in project repositories since last sync.

**Usage:**
```bash
./auto-detect-changes.sh
```

**What it does:**
- Reads last sync date from `website-sync/last-sync.log`
- Checks git logs for each project
- Reports which projects have changes
- Creates detailed report in `website-sync/changes-detected-*.md`
- Exits with code 1 if changes found (useful for CI)

**Example output:**
```
Last sync: 2026-01-01
Checking for changes in projects...

Checking disclose...
  ✓ Changes found
Checking gather...
  No changes
...

⚠️  CHANGES DETECTED - Website sync recommended
```

---

### check-version-sync.sh
Compares version numbers between projects and website pages.

**Usage:**
```bash
./check-version-sync.sh
```

**What it checks:**
- Extracts version from project package.json
- Extracts version from website page
- Reports mismatches

**Example output:**
```
Checking version synchronization...

✓ disclose: 0.2.0 (in sync)
✗ gather: MISMATCH
  Project: 0.3.0
  Website: 0.2.0
✓ catalog: 1.0.0 (in sync)

⚠️  1 version mismatch(es) found
```

---

### validate-links.sh
Validates all internal and external links on the website.

**Usage:**
```bash
./validate-links.sh
```

**What it checks:**
- Internal links (href="/..." and relative links)
- External links (href="https://...")
- Reports broken links

**Note:** External link checking can take several minutes.

**Example output:**
```
Validating links in website...

Checking internal links...
⚠️  Broken link in src/disclose/index.html:
   Link: /old-tool/
   Expected: /home/.../website/src/old-tool

Checking external links...
  Checked 10 external links...
  Checked 20 external links...
⚠️  Broken external link: https://github.com/old/repo

Link validation complete
External links checked: 25

⚠️  2 broken link(s) found
```

---

## Automation Examples

### Daily Change Detection (Cron)

Add to crontab to check for changes daily:

```bash
# Check for project changes daily at 9 AM
0 9 * * * cd /home/founder3/code/github/fwdslsh/website && ./scripts/auto-detect-changes.sh >> logs/change-detection.log 2>&1
```

### Pre-Deployment Check

Run before deploying website:

```bash
#!/bin/bash
# pre-deploy-check.sh

echo "Running pre-deployment checks..."

# Check for version mismatches
./scripts/check-version-sync.sh
VERSION_CHECK=$?

# Validate links
./scripts/validate-links.sh
LINK_CHECK=$?

# Build test
npm run build
BUILD_CHECK=$?

if [ $VERSION_CHECK -ne 0 ] || [ $LINK_CHECK -ne 0 ] || [ $BUILD_CHECK -ne 0 ]; then
  echo "⚠️  Pre-deployment checks failed"
  exit 1
fi

echo "✓ All pre-deployment checks passed"
exit 0
```

### Weekly Sync Reminder

GitHub Action to create issue when changes detected:

```yaml
# .github/workflows/sync-reminder.yml
name: Website Sync Reminder

on:
  schedule:
    - cron: '0 9 * * 1'  # Monday 9 AM
  workflow_dispatch:

jobs:
  check-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for changes
        id: changes
        run: |
          cd website
          ./scripts/auto-detect-changes.sh
        continue-on-error: true

      - name: Create issue if changes found
        if: steps.changes.outcome == 'failure'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('website/website-sync/changes-detected-*.md', 'utf8');

            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Website sync needed - project changes detected',
              body: `Changes detected in project repositories since last website sync.\n\n${report}\n\n**Action needed:** Run website sync workflow.`,
              labels: ['documentation', 'website']
            });
```

---

## Script Locations

All scripts assume this directory structure:

```
fwdslsh/
├── website/
│   ├── scripts/           # This directory
│   ├── src/              # Website source files
│   └── website-sync/     # Sync working directory
├── core/
│   └── packages/         # Core monorepo packages
│       ├── disclose/
│       ├── gather/
│       └── ...
└── dispatch/             # Standalone projects
```

If your structure is different, update the `REPO_ROOT` path in each script.

---

## Development

### Adding a New Project

To add a new project to sync tracking:

1. Edit `auto-detect-changes.sh`:
```bash
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "core/packages/your-new-project"  # Add here
)
```

2. Edit `check-version-sync.sh`:
```bash
declare -A PROJECT_PATHS=(
  # ...existing...
  ["your-project"]="$REPO_ROOT/path/to/your-project"
)

declare -A WEBSITE_PAGES=(
  # ...existing...
  ["your-project"]="$SRC_DIR/your-project/index.html"
)
```

3. Test:
```bash
./scripts/auto-detect-changes.sh
./scripts/check-version-sync.sh
```

### Troubleshooting

**Script fails with "command not found":**
- Ensure scripts are executable: `chmod +x scripts/*.sh`
- Check shebang line is correct: `#!/bin/bash`

**"Project not found" errors:**
- Verify `REPO_ROOT` path in scripts
- Adjust paths to match your directory structure

**External link validation too slow:**
- Comment out external link checking for faster runs
- Or reduce timeout in curl command: `--max-time 5`

**Version extraction not working:**
- Check version format in website pages
- Adjust grep pattern in `check-version-sync.sh`

---

## Related Documentation

- [Website Update Workflow](../WEBSITE_UPDATE_WORKFLOW.md) - Complete sync process
- [Migration Plan](../WEBSITE_MIGRATION_PLAN.md) - Historical migration reference

---

**Last Updated:** 2026-01-13
**Maintained By:** fwdslsh team
