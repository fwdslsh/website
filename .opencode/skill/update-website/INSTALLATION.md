# Installation & Setup

Quick setup guide for the update-website OpenCode skill.

## What Was Created

This skill has been installed at:
```
/home/founder3/code/github/fwdslsh/website/.opencode/skill/update-website/
```

## Directory Structure

```
.opencode/skill/update-website/
├── SKILL.md                      # Main skill definition (OpenCode reads this)
├── README.md                     # Skill overview and usage
├── INSTALLATION.md               # This file
├── .gitignore                    # Ignore temporary files
│
├── scripts/                      # Automation scripts
│   ├── full-sync.sh             # Complete discovery automation
│   ├── auto-detect-changes.sh   # Detect project changes
│   ├── check-version-sync.sh    # Compare version numbers
│   ├── validate-links.sh        # Validate all links
│   ├── extract-project-info.sh  # Extract project info
│   └── README.md                # Script documentation
│
└── docs/                         # Supporting documentation
    ├── workflow-guide.md        # Complete workflow (600+ lines)
    ├── migration-guide.md       # Major migrations guide
    ├── quick-start.md           # Fast reference
    └── content-guidelines.md    # Content writing standards
```

## Files Created

**Total:** 12 files
- 1 Main skill definition (SKILL.md)
- 5 Automation scripts (.sh files)
- 4 Documentation files (.md)
- 2 Support files (README, .gitignore)

## How to Use

### For OpenCode Agents

OpenCode will automatically discover this skill. When you say:
```
"update the website"
"sync the website with latest projects"
"check if website needs updating"
```

The agent will load and execute this skill.

### Manual Execution

From the website directory:

```bash
cd /home/founder3/code/github/fwdslsh/website

# Quick check - What needs updating?
./.opencode/skill/update-website/scripts/full-sync.sh

# Or use the scripts directly
./.opencode/skill/update-website/scripts/auto-detect-changes.sh
./.opencode/skill/update-website/scripts/check-version-sync.sh
```

### Read the Docs

```bash
# Main workflow
cat .opencode/skill/update-website/SKILL.md

# Complete guide
cat .opencode/skill/update-website/docs/workflow-guide.md

# Quick reference
cat .opencode/skill/update-website/docs/quick-start.md

# Content standards
cat .opencode/skill/update-website/docs/content-guidelines.md
```

## Verification

Check that everything is installed correctly:

```bash
# Verify directory structure
ls -la .opencode/skill/update-website/

# Verify scripts are executable
ls -l .opencode/skill/update-website/scripts/*.sh

# Test a script
./.opencode/skill/update-website/scripts/full-sync.sh --help
```

Expected output:
- Directory contains all files listed above
- Scripts have execute permissions (rwxr-xr-x)
- Help message displays for scripts

## First Run

To test the skill:

```bash
cd /home/founder3/code/github/fwdslsh/website

# Run discovery
./.opencode/skill/update-website/scripts/full-sync.sh

# Review the summary
cat website-sync/sync-summary-*.md
```

This will:
1. Extract information from all projects
2. Detect changes since last sync
3. Check version synchronization
4. Generate comprehensive reports
5. Tell you if updates are needed

## Integration with OpenCode

### Skill Discovery

OpenCode looks for skills in `.opencode/skill/*/SKILL.md`

This skill is at:
```
.opencode/skill/update-website/SKILL.md
```

So OpenCode will automatically discover it.

### Trigger Phrases

Defined in SKILL.md frontmatter:
- "update the website"
- "sync website with projects"
- "check website status"
- "website needs updating"
- "update documentation site"

### Skill Execution

When triggered:
1. OpenCode loads SKILL.md
2. Agent follows the structured workflow
3. Scripts provide automation
4. Docs provide reference
5. Agent completes the task or guides human

## Troubleshooting

### Scripts Not Executable

```bash
chmod +x .opencode/skill/update-website/scripts/*.sh
```

### Can't Find Scripts

Verify you're in the website directory:
```bash
pwd
# Should show: /home/founder3/code/github/fwdslsh/website
```

### OpenCode Doesn't See Skill

Check file location:
```bash
ls .opencode/skill/update-website/SKILL.md
# Should exist
```

Check frontmatter format in SKILL.md (must be valid YAML).

### Scripts Fail

Check repository paths in scripts:
```bash
# Edit scripts if repo structure differs
nano .opencode/skill/update-website/scripts/auto-detect-changes.sh
# Verify REPO_ROOT path
```

## Customization

### Add New Projects

Edit `scripts/auto-detect-changes.sh` and `scripts/check-version-sync.sh`:

```bash
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "your-new-project"  # Add here
)
```

### Adjust Paths

If your repo structure differs, update `REPO_ROOT` in scripts:

```bash
REPO_ROOT="/your/custom/path"
```

### Add New Scripts

1. Create script in `scripts/`
2. Make executable: `chmod +x scripts/your-script.sh`
3. Document in `scripts/README.md`
4. Reference in SKILL.md if part of workflow

## Maintenance

### Update Skill

To update the skill:

1. **Edit files** in `.opencode/skill/update-website/`
2. **Update version** in SKILL.md frontmatter
3. **Test changes** manually
4. **Document changes** in README.md

### Sync with Source

If the source workflow documents change:

```bash
# Copy updated workflow
cp WEBSITE_UPDATE_WORKFLOW.md .opencode/skill/update-website/docs/workflow-guide.md

# Copy updated scripts
cp scripts/*.sh .opencode/skill/update-website/scripts/

# Ensure executable
chmod +x .opencode/skill/update-website/scripts/*.sh
```

## Related Documentation

**In website root:**
- `WEBSITE_UPDATE_WORKFLOW.md` - Source workflow
- `WEBSITE_MIGRATION_PLAN.md` - Source migration plan
- `SYNC_QUICK_START.md` - Source quick start
- `scripts/` - Source scripts

**In skill directory:**
- `SKILL.md` - Main skill definition
- `README.md` - Skill overview
- `docs/` - Complete documentation
- `scripts/` - Automation tools

## Getting Help

**Skill not working?**
1. Check INSTALLATION.md (this file)
2. Read README.md
3. Review SKILL.md
4. Check scripts/README.md

**Content questions?**
- Read docs/content-guidelines.md
- Check existing website pages
- Ask project maintainers

**Workflow questions?**
- Read docs/workflow-guide.md
- Review docs/quick-start.md
- Follow SKILL.md step-by-step

## Success Indicators

✅ Installation successful when:
- All files present in `.opencode/skill/update-website/`
- Scripts are executable
- Running `full-sync.sh` generates reports
- OpenCode recognizes trigger phrases
- Documentation is accessible

## Next Steps

After installation:

1. **Test manually:**
   ```bash
   ./.opencode/skill/update-website/scripts/full-sync.sh
   ```

2. **Review output:**
   ```bash
   cat website-sync/sync-summary-*.md
   ```

3. **Try with OpenCode:**
   Say: "update the website"

4. **Setup automation (optional):**
   Add to crontab for daily checks

---

**Installation complete!**

You can now use this skill with OpenCode or execute it manually.

Start with: `./.opencode/skill/update-website/scripts/full-sync.sh`
