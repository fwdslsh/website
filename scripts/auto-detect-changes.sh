#!/bin/bash
# Auto-detect changes in projects since last sync
# Usage: ./auto-detect-changes.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
SYNC_DIR="$WEBSITE_DIR/website-sync"
SYNC_LOG="$SYNC_DIR/last-sync.log"

# Create sync directory if needed
mkdir -p "$SYNC_DIR"

# Read last sync date
if [ -f "$SYNC_LOG" ]; then
  LAST_SYNC=$(cat "$SYNC_LOG")
  echo "Last sync: $LAST_SYNC"
else
  echo "No previous sync recorded"
  LAST_SYNC="2024-01-01"
  echo "Using default date: $LAST_SYNC"
fi

# Define projects to check (relative to repo root)
PROJECTS=(
  "core/packages/disclose"
  "core/packages/gather"
  "core/packages/catalog"
  "core/packages/inform"
  "core/packages/hyphn"
  "dispatch"
)

# Try to find repo root
REPO_ROOT=""
if [ -d "$WEBSITE_DIR/../core" ]; then
  REPO_ROOT="$(cd "$WEBSITE_DIR/.." && pwd)"
elif [ -d "$WEBSITE_DIR/../../fwdslsh" ]; then
  REPO_ROOT="$(cd "$WEBSITE_DIR/../../fwdslsh" && pwd)"
else
  # Assume current structure
  REPO_ROOT="/home/founder3/code/github/fwdslsh"
fi

echo "Checking for changes in projects..."
echo "Repository root: $REPO_ROOT"
echo ""

CHANGES_DETECTED=0
OUTPUT_FILE="$SYNC_DIR/changes-detected-$(date +%Y%m%d).md"

echo "# Changes Detected Since $LAST_SYNC" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Scan Date: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

for project in "${PROJECTS[@]}"; do
  PROJECT_PATH="$REPO_ROOT/$project"

  if [ ! -d "$PROJECT_PATH" ]; then
    echo "⚠️  Project not found: $PROJECT_PATH"
    continue
  fi

  echo "Checking $(basename "$project")..."

  # Check if it's a git repo or inside one
  if [ -d "$PROJECT_PATH/.git" ] || git -C "$PROJECT_PATH" rev-parse --git-dir > /dev/null 2>&1; then
    CHANGES=$(git -C "$PROJECT_PATH" log --since="$LAST_SYNC" --oneline --no-merges 2>/dev/null || echo "")

    if [ -n "$CHANGES" ]; then
      echo "  ✓ Changes found"
      CHANGES_DETECTED=1

      echo "## $(basename "$project")" >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"
      echo '```' >> "$OUTPUT_FILE"
      git -C "$PROJECT_PATH" log --since="$LAST_SYNC" --oneline --no-merges | head -20 >> "$OUTPUT_FILE"
      echo '```' >> "$OUTPUT_FILE"
      echo "" >> "$OUTPUT_FILE"

      # Get version if package.json exists
      if [ -f "$PROJECT_PATH/package.json" ]; then
        VERSION=$(jq -r '.version' "$PROJECT_PATH/package.json")
        echo "Current version: $VERSION" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
      fi
    else
      echo "  No changes"
    fi
  else
    echo "  ⚠️  Not a git repository"
  fi
done

echo ""
echo "Results written to: $OUTPUT_FILE"

if [ $CHANGES_DETECTED -eq 1 ]; then
  echo ""
  echo "================================================"
  echo "⚠️  CHANGES DETECTED - Website sync recommended"
  echo "================================================"
  echo ""
  echo "Review: $OUTPUT_FILE"
  echo "Then run: ./scripts/full-sync.sh"
  exit 1
else
  echo ""
  echo "✓ No changes detected - website is up to date"
  exit 0
fi
