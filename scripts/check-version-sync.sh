#!/bin/bash
# Check that the website matches the current version of unify
# Usage: ./check-version-sync.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$WEBSITE_DIR/src"

# Sibling checkouts of the fwdslsh repositories (e.g. ../unify)
REPO_ROOT="$(cd "$WEBSITE_DIR/.." && pwd)"

echo "Checking version synchronization..."
echo ""

MISMATCHES=0

compare() {
  local name="$1" project="$2" website="$3"
  if [ "$project" = "$website" ]; then
    echo "✓ $name: $project (in sync)"
  else
    echo "✗ $name: MISMATCH"
    echo "  Project: $project"
    echo "  Website: $website"
    MISMATCHES=$((MISMATCHES + 1))
  fi
}

# unify: the repo version vs the version the website builds with
if [ -f "$REPO_ROOT/unify/package.json" ]; then
  PROJECT_VERSION=$(jq -r '.version' "$REPO_ROOT/unify/package.json")
  WEBSITE_VERSION=$(jq -r '.packages["node_modules/@fwdslsh/unify"].version' "$WEBSITE_DIR/package-lock.json")
  compare "unify (package-lock.json)" "$PROJECT_VERSION" "$WEBSITE_VERSION"
else
  echo "⚠️  unify: Project not found at $REPO_ROOT/unify"
fi

echo ""

if [ $MISMATCHES -gt 0 ]; then
  echo "================================================"
  echo "⚠️  $MISMATCHES version mismatch(es) found"
  echo "================================================"
  exit 1
else
  echo "✓ All versions in sync"
  exit 0
fi
