#!/bin/bash
# Check version numbers between projects and website
# Usage: ./check-version-sync.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$WEBSITE_DIR/src"

# Try to find repo root
REPO_ROOT=""
if [ -d "$WEBSITE_DIR/../core" ]; then
  REPO_ROOT="$(cd "$WEBSITE_DIR/.." && pwd)"
else
  REPO_ROOT="/home/founder3/code/github/fwdslsh"
fi

echo "Checking version synchronization..."
echo ""

MISMATCHES=0

# Define project to page mappings
declare -A PROJECT_PATHS=(
  ["disclose"]="$REPO_ROOT/core/packages/disclose"
  ["gather"]="$REPO_ROOT/core/packages/gather"
  ["catalog"]="$REPO_ROOT/core/packages/catalog"
  ["inform"]="$REPO_ROOT/core/packages/inform"
  ["dispatch"]="$REPO_ROOT/dispatch"
)

declare -A WEBSITE_PAGES=(
  ["disclose"]="$SRC_DIR/disclose/index.html"
  ["gather"]="$SRC_DIR/gather/index.html"
  ["catalog"]="$SRC_DIR/catalog/index.html"
  ["inform"]="$SRC_DIR/inform/index.html"
  ["dispatch"]="$SRC_DIR/dispatch/index.html"
)

for project in "${!PROJECT_PATHS[@]}"; do
  PROJECT_PATH="${PROJECT_PATHS[$project]}"
  WEBSITE_PAGE="${WEBSITE_PAGES[$project]}"

  # Skip if project or page doesn't exist
  if [ ! -d "$PROJECT_PATH" ]; then
    echo "⚠️  $project: Project not found at $PROJECT_PATH"
    continue
  fi

  if [ ! -f "$WEBSITE_PAGE" ]; then
    echo "⚠️  $project: Website page not found at $WEBSITE_PAGE"
    continue
  fi

  # Extract project version
  PROJECT_VERSION=""
  if [ -f "$PROJECT_PATH/package.json" ]; then
    PROJECT_VERSION=$(jq -r '.version' "$PROJECT_PATH/package.json" 2>/dev/null || echo "unknown")
  fi

  # Extract website version (try multiple patterns)
  WEBSITE_VERSION=$(grep -oP 'version["\s:]+\K[0-9.]+' "$WEBSITE_PAGE" 2>/dev/null | head -1 || echo "")
  if [ -z "$WEBSITE_VERSION" ]; then
    WEBSITE_VERSION=$(grep -oP 'v\K[0-9.]+' "$WEBSITE_PAGE" 2>/dev/null | head -1 || echo "unknown")
  fi

  # Compare
  if [ "$PROJECT_VERSION" = "$WEBSITE_VERSION" ]; then
    echo "✓ $project: $PROJECT_VERSION (in sync)"
  else
    echo "✗ $project: MISMATCH"
    echo "  Project: $PROJECT_VERSION"
    echo "  Website: $WEBSITE_VERSION"
    MISMATCHES=$((MISMATCHES + 1))
  fi
done

echo ""

if [ $MISMATCHES -gt 0 ]; then
  echo "================================================"
  echo "⚠️  $MISMATCHES version mismatch(es) found"
  echo "================================================"
  echo ""
  echo "Run website sync to update versions"
  exit 1
else
  echo "✓ All versions in sync"
  exit 0
fi
