#!/bin/bash
# Full website sync workflow automation
# Usage: ./full-sync.sh [--skip-extraction] [--skip-validation]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
SYNC_DIR="$WEBSITE_DIR/website-sync"

# Parse arguments
SKIP_EXTRACTION=false
SKIP_VALIDATION=false

for arg in "$@"; do
  case $arg in
    --skip-extraction)
      SKIP_EXTRACTION=true
      shift
      ;;
    --skip-validation)
      SKIP_VALIDATION=true
      shift
      ;;
    --help|-h)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --skip-extraction   Skip project info extraction"
      echo "  --skip-validation   Skip link validation (faster)"
      echo "  --help, -h         Show this help message"
      echo ""
      echo "This script automates the full website sync workflow:"
      echo "  1. Setup and cleanup"
      echo "  2. Extract project information"
      echo "  3. Detect changes"
      echo "  4. Check version synchronization"
      echo ""
      echo "After running, review the reports in website-sync/ directory"
      echo "and follow the manual update process in WEBSITE_UPDATE_WORKFLOW.md"
      exit 0
      ;;
  esac
done

echo "================================================"
echo "Website Sync: Discovery & Analysis Phase"
echo "================================================"
echo ""

# Create sync directory
mkdir -p "$SYNC_DIR"

echo "Step 1: Setup"
echo "-------------"
cd "$WEBSITE_DIR"

# Verify git status
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: Uncommitted changes detected"
  echo "   Consider committing or stashing before sync"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

echo "✓ Git status checked"
echo ""

# Define projects
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "core/packages/catalog"
  "core/packages/inform"
  "core/packages/hyphn"
  "dispatch"
)

REPO_ROOT="/home/founder3/code/github/fwdslsh"

if [ "$SKIP_EXTRACTION" = false ]; then
  echo "Step 2: Extract Project Information"
  echo "------------------------------------"

  for project in "${PROJECTS[@]}"; do
    PROJECT_PATH="$REPO_ROOT/$project"
    PROJECT_NAME=$(basename "$project")
    OUTPUT_FILE="$SYNC_DIR/${PROJECT_NAME}-info.md"

    if [ -d "$PROJECT_PATH" ]; then
      echo "Extracting $PROJECT_NAME..."
      "$SCRIPT_DIR/extract-project-info.sh" "$PROJECT_PATH" "$OUTPUT_FILE"
    else
      echo "⚠️  Project not found: $PROJECT_PATH"
    fi
  done

  echo ""
  echo "✓ Project information extracted to website-sync/"
  echo ""
else
  echo "Step 2: Extract Project Information"
  echo "------------------------------------"
  echo "⊘ Skipped (--skip-extraction flag)"
  echo ""
fi

echo "Step 3: Detect Changes"
echo "----------------------"
"$SCRIPT_DIR/auto-detect-changes.sh" || CHANGES_DETECTED=$?

if [ "${CHANGES_DETECTED:-0}" -eq 1 ]; then
  echo ""
  echo "✓ Changes detected (see above)"
else
  echo ""
  echo "✓ No changes detected"
fi
echo ""

echo "Step 4: Check Version Synchronization"
echo "--------------------------------------"
"$SCRIPT_DIR/check-version-sync.sh" || VERSION_MISMATCHES=$?

if [ "${VERSION_MISMATCHES:-0}" -eq 1 ]; then
  echo ""
  echo "✓ Version mismatches detected (see above)"
else
  echo ""
  echo "✓ All versions synchronized"
fi
echo ""

if [ "$SKIP_VALIDATION" = false ]; then
  echo "Step 5: Validate Links (Optional)"
  echo "----------------------------------"
  echo "Note: This can take several minutes..."
  echo ""

  read -p "Run link validation? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    "$SCRIPT_DIR/validate-links.sh" || LINK_ISSUES=$?

    if [ "${LINK_ISSUES:-0}" -eq 1 ]; then
      echo ""
      echo "✓ Link issues detected (see above)"
    else
      echo ""
      echo "✓ All links valid"
    fi
  else
    echo "⊘ Link validation skipped"
  fi
  echo ""
else
  echo "Step 5: Validate Links"
  echo "----------------------"
  echo "⊘ Skipped (--skip-validation flag)"
  echo ""
fi

echo "================================================"
echo "Discovery & Analysis Complete"
echo "================================================"
echo ""

# Generate summary report
SUMMARY_FILE="$SYNC_DIR/sync-summary-$(date +%Y%m%d-%H%M%S).md"

cat > "$SUMMARY_FILE" <<EOF
# Website Sync Summary
Generated: $(date)

## Status

### Changes Detected
$(if [ "${CHANGES_DETECTED:-0}" -eq 1 ]; then echo "Yes - See changes-detected-*.md"; else echo "No"; fi)

### Version Mismatches
$(if [ "${VERSION_MISMATCHES:-0}" -eq 1 ]; then echo "Yes - Run check-version-sync.sh for details"; else echo "No"; fi)

### Link Validation
$(if [ "$SKIP_VALIDATION" = true ]; then echo "Skipped"; elif [ "${LINK_ISSUES:-0}" -eq 1 ]; then echo "Issues found"; else echo "All valid"; fi)

## Next Steps

### If changes or mismatches detected:
1. Review extracted project info in website-sync/
2. Review change reports
3. Create update plan (see WEBSITE_UPDATE_WORKFLOW.md Phase 3)
4. Implement updates
5. Test and deploy

### If no changes:
- Website is up to date
- No action needed

## Files Generated
- Project info: website-sync/*-info.md
- Changes report: website-sync/changes-detected-*.md
- This summary: $SUMMARY_FILE

## Manual Workflow
See: WEBSITE_UPDATE_WORKFLOW.md for complete update process
EOF

echo "Summary Report"
echo "--------------"
cat "$SUMMARY_FILE"
echo ""

echo "Next Steps:"
echo "-----------"

if [ "${CHANGES_DETECTED:-0}" -eq 1 ] || [ "${VERSION_MISMATCHES:-0}" -eq 1 ]; then
  echo "1. Review reports in: website-sync/"
  echo "2. Follow WEBSITE_UPDATE_WORKFLOW.md for manual updates"
  echo "3. Create update branch: git checkout -b website-sync-$(date +%Y%m%d)"
  echo "4. Implement changes systematically"
  echo "5. Test and deploy"
else
  echo "✓ Website is up to date - no action needed"
fi

echo ""
echo "All reports saved in: $SYNC_DIR"
