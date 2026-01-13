# Update Website Skill

OpenCode skill for automated website synchronization with project repositories.

## Overview

This skill provides a structured, repeatable workflow for keeping the fwdslsh website documentation synchronized with changes in project repositories.

**Skill ID:** `update-website`
**Version:** 1.0.0
**Category:** Documentation

## Structure

```
.opencode/skill/update-website/
├── SKILL.md                    # Main skill definition (OpenCode reads this)
├── README.md                   # This file
├── scripts/                    # Automation scripts
│   ├── full-sync.sh           # Complete discovery automation
│   ├── auto-detect-changes.sh # Change detection
│   ├── check-version-sync.sh  # Version comparison
│   ├── validate-links.sh      # Link validation
│   └── extract-project-info.sh # Info extraction
└── docs/                       # Supporting documentation
    ├── workflow-guide.md      # Complete workflow
    ├── migration-guide.md     # Major migrations
    ├── quick-start.md         # Fast reference
    └── content-guidelines.md  # Writing standards
```

## How It Works

### For OpenCode Agents

When an agent needs to update the website:

1. **Detection:** OpenCode recognizes trigger phrases like "update the website"
2. **Skill Loading:** The agent loads this skill's instructions from SKILL.md
3. **Execution:** The agent follows the structured workflow:
   - Discovery (automated via scripts)
   - Analysis (review reports)
   - Planning (create checklist)
   - Implementation (update pages)
   - Verification (test and validate)
   - Deployment (commit and push)

### For Humans

The same workflow can be executed manually:

```bash
# Navigate to website directory
cd /home/founder3/code/github/fwdslsh/website

# Run discovery
./.opencode/skill/update-website/scripts/full-sync.sh

# Follow the workflow in SKILL.md
```

## Key Features

### Automated Discovery
- Extracts project information automatically
- Detects changes since last sync
- Compares version numbers
- Validates links
- Generates comprehensive reports

### Structured Workflow
- Clear phases with decision points
- Checklists for each step
- Templates for common updates
- Verification steps built-in

### Repeatable Process
- Same steps every time
- Consistent results
- Easy to train new contributors
- Documented decisions

### Flexible Modes
- **Full Sync:** All projects, all pages (~4-8 hours)
- **Targeted Sync:** Specific projects only (~1-3 hours)
- **Quick Check:** Just run discovery (~5 minutes)

## Usage

### As an OpenCode Skill

In OpenCode, simply say:
```
"update the website"
"sync website with latest projects"
"check if website needs updating"
```

The agent will load this skill and execute the workflow.

### Manual Execution

```bash
# Check what needs updating
./scripts/full-sync.sh

# Review reports
cat website-sync/sync-summary-*.md

# Follow workflow in SKILL.md phases
```

### Automated Checks

Setup daily check via cron:
```bash
crontab -e

# Add:
0 9 * * * cd /path/to/website && ./.opencode/skill/update-website/scripts/auto-detect-changes.sh
```

## Scripts

All scripts are in `scripts/` directory:

| Script | Purpose |
|--------|---------|
| `full-sync.sh` | Run complete discovery & analysis |
| `auto-detect-changes.sh` | Detect project changes |
| `check-version-sync.sh` | Compare version numbers |
| `validate-links.sh` | Check all links |
| `extract-project-info.sh` | Extract project documentation |

Run any script with `--help` for usage details.

## Documentation

Supporting docs in `docs/` directory:

| Doc | Description |
|-----|-------------|
| `workflow-guide.md` | Complete step-by-step workflow |
| `migration-guide.md` | Adding/removing entire tools |
| `quick-start.md` | Fast reference guide |
| `content-guidelines.md` | Writing and style standards |

## Prerequisites

Before using this skill:

1. **Environment:**
   - Located in website directory
   - Git working directory clean
   - npm dependencies installed

2. **Access:**
   - All project repositories accessible
   - Permissions to commit and push

3. **Tools:**
   - bash (for scripts)
   - npm (for build)
   - git (for version control)

## Workflow Phases

### 1. Discovery (Automated)
Run scripts to extract current state and detect changes.

### 2. Analysis (Semi-Automated)
Review reports and identify what needs updating.

### 3. Planning (Manual)
Create prioritized checklist and content outlines.

### 4. Implementation (Manual)
Update pages following guidelines and patterns.

### 5. Verification (Semi-Automated)
Test build, validate links, review visually.

### 6. Deployment (Manual)
Commit, push, and deploy to production.

## Integration with OpenCode

This skill integrates with OpenCode's skill system:

**Frontmatter in SKILL.md:**
```yaml
name: update-website
version: 1.0.0
triggers:
  - "update the website"
  - "sync website with projects"
category: documentation
```

**When triggered:**
1. OpenCode loads SKILL.md
2. Agent follows structured instructions
3. Scripts provide automation
4. Docs provide reference
5. Agent guides human through manual steps

## Output

After skill execution:

**Generated Reports:**
- `website-sync/sync-summary-*.md` - Overall summary
- `website-sync/*-info.md` - Project information
- `website-sync/changes-detected-*.md` - Change details

**Updated Files:**
- Project documentation pages
- Home page tool cards
- Navigation/footer links
- Version numbers synchronized

**Git History:**
- Feature branch with incremental commits
- Clear commit messages
- Ready for review/deployment

## Time Estimates

| Mode | Time Required |
|------|---------------|
| Quick Check | 5 minutes |
| Targeted Sync (1-2 projects) | 1-3 hours |
| Full Sync (all projects) | 4-8 hours |

## Success Criteria

✅ After successful execution:
- All changed projects have updated documentation
- Version numbers synchronized
- Build successful
- No broken links
- Changes committed and ready to deploy
- Sync timestamp recorded

## Troubleshooting

**Build fails:**
```bash
rm -rf .svelte-kit/ node_modules/
npm install
npm run build
```

**Scripts not found:**
```bash
cd /home/founder3/code/github/fwdslsh/website
pwd  # Verify location
ls .opencode/skill/update-website/scripts/
```

**Permission denied:**
```bash
chmod +x .opencode/skill/update-website/scripts/*.sh
```

## Contributing

To improve this skill:

1. **Add new scripts:**
   - Place in `scripts/` directory
   - Make executable
   - Document in README.md

2. **Update workflow:**
   - Edit SKILL.md
   - Update version number
   - Test thoroughly

3. **Add documentation:**
   - Place in `docs/` directory
   - Link from SKILL.md
   - Keep focused and actionable

## Version History

**v1.0.0** (2026-01-13)
- Initial release
- Full workflow automation
- Complete documentation
- All scripts functional

## Related Skills

This skill may be used with:
- `commit-changes` - For committing updates
- `create-pull-request` - For PR creation
- `deploy-website` - For deployment (if exists)

## Support

**Issues:** Report in website repository issues
**Questions:** Ask in team chat or documentation channel
**Improvements:** Submit PR with proposed changes

---

**Ready to use?**
```bash
cd /home/founder3/code/github/fwdslsh/website
./.opencode/skill/update-website/scripts/full-sync.sh
```

Then follow SKILL.md for next steps!
