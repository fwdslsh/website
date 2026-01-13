#!/bin/bash
# Extract project information for website sync
# Usage: ./extract-project-info.sh <project-dir> <output-file>

set -e

PROJECT_DIR=$1
OUTPUT_FILE=$2

if [ -z "$PROJECT_DIR" ] || [ -z "$OUTPUT_FILE" ]; then
  echo "Usage: $0 <project-dir> <output-file>"
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Error: Project directory not found: $PROJECT_DIR"
  exit 1
fi

# Create output directory if needed
mkdir -p "$(dirname "$OUTPUT_FILE")"

echo "Extracting info from: $PROJECT_DIR"
echo "Output to: $OUTPUT_FILE"

# Start output file
echo "# Project Information for $(basename "$PROJECT_DIR")" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Extracted: $(date)" >> "$OUTPUT_FILE"
echo "Path: $PROJECT_DIR" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Package info (if exists)
if [ -f "$PROJECT_DIR/package.json" ]; then
  echo "## Package Metadata" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  echo '```json' >> "$OUTPUT_FILE"
  jq '{name, version, description, keywords, homepage, repository}' "$PROJECT_DIR/package.json" >> "$OUTPUT_FILE"
  echo '```' >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
fi

# README content
if [ -f "$PROJECT_DIR/README.md" ]; then
  echo "## README Content" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  cat "$PROJECT_DIR/README.md" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
fi

# CHANGELOG (recent entries)
if [ -f "$PROJECT_DIR/CHANGELOG.md" ]; then
  echo "## Recent Changes (from CHANGELOG)" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  head -100 "$PROJECT_DIR/CHANGELOG.md" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
fi

# CLAUDE.md (developer guidance)
if [ -f "$PROJECT_DIR/CLAUDE.md" ]; then
  echo "## Developer Documentation (from CLAUDE.md)" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  echo "First 200 lines:" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
  head -200 "$PROJECT_DIR/CLAUDE.md" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
fi

echo "✓ Extracted info for $(basename "$PROJECT_DIR") to $OUTPUT_FILE"
