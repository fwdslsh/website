#!/bin/bash
# Validate internal and external links in website
# Usage: ./validate-links.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$WEBSITE_DIR/src"

echo "Validating links in website..."
echo ""

BROKEN_LINKS=0

# Check internal links
echo "Checking internal links..."
while IFS= read -r line; do
  file=$(echo "$line" | cut -d: -f1)
  link=$(echo "$line" | sed 's/.*href="\([^"]*\)".*/\1/')

  # Skip external links, anchors, and mailto
  if [[ "$link" =~ ^https?:// ]] || [[ "$link" =~ ^# ]] || [[ "$link" =~ ^mailto: ]]; then
    continue
  fi

  # Build target path
  if [[ "$link" =~ ^/ ]]; then
    # Absolute path from src root
    target="$SRC_DIR${link}"
  else
    # Relative path from file directory
    file_dir=$(dirname "$file")
    target="$file_dir/$link"
  fi

  # Normalize path and check if exists
  target=$(realpath -m "$target")

  # Try as directory with index.html, or as file
  if [ ! -f "$target" ] && [ ! -f "${target}/index.html" ] && [ ! -f "${target}.html" ]; then
    echo "⚠️  Broken link in $file:"
    echo "   Link: $link"
    echo "   Expected: $target"
    BROKEN_LINKS=$((BROKEN_LINKS + 1))
  fi
done < <(find "$SRC_DIR" -name "*.html" -exec grep -H 'href="[^"]*"' {} \; 2>/dev/null)

echo ""
echo "Checking external links..."
echo "(This may take a while...)"

# Extract unique external links
EXTERNAL_LINKS=$(find "$SRC_DIR" -name "*.html" -exec grep -oP 'href="https?://[^"]+' {} \; 2>/dev/null | \
  sed 's/href="//' | sort -u)

EXTERNAL_CHECKED=0
EXTERNAL_BROKEN=0

while IFS= read -r url; do
  EXTERNAL_CHECKED=$((EXTERNAL_CHECKED + 1))

  # Use curl to check if URL is accessible
  if curl -s -f -o /dev/null --max-time 10 "$url" 2>/dev/null; then
    # Link is good
    :
  else
    echo "⚠️  Broken external link: $url"
    EXTERNAL_BROKEN=$((EXTERNAL_BROKEN + 1))
    BROKEN_LINKS=$((BROKEN_LINKS + 1))
  fi

  # Show progress every 10 links
  if [ $((EXTERNAL_CHECKED % 10)) -eq 0 ]; then
    echo "  Checked $EXTERNAL_CHECKED external links..."
  fi
done <<< "$EXTERNAL_LINKS"

echo ""
echo "Link validation complete"
echo "External links checked: $EXTERNAL_CHECKED"
echo ""

if [ $BROKEN_LINKS -gt 0 ]; then
  echo "================================================"
  echo "⚠️  $BROKEN_LINKS broken link(s) found"
  echo "================================================"
  exit 1
else
  echo "✓ All links valid"
  exit 0
fi
