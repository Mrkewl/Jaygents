#!/bin/bash
# Fires after Write/Edit tool calls on docs/specs/ or ADR files.
# Appends a capture entry to wiki/inbox/decisions.md.

INPUT=$(cat)
TOOL=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name',''))" 2>/dev/null)

if [[ "$TOOL" != "Write" && "$TOOL" != "Edit" ]]; then
  exit 0
fi

FILE_PATH=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

# Only capture specs, ADRs, and conductor decisions
if [[ "$FILE_PATH" != *"docs/specs/"* && "$FILE_PATH" != *"conductor/"* ]]; then
  exit 0
fi

INBOX="wiki/inbox/decisions.md"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')

# Create inbox file if it doesn't exist
if [ ! -f "$INBOX" ]; then
  echo "# Decision Capture Log" > "$INBOX"
  echo "" >> "$INBOX"
fi

echo "- [$TIMESTAMP] \`$FILE_PATH\`" >> "$INBOX"
