#!/usr/bin/env bash
set -euo pipefail
DEST="${1:-/roms/nds/ISL_PUM_RUN_EXPORT}"
mkdir -p "$DEST"
printf 'ISL PUM RUN EXPORT\n' > "$DEST/MANIFEST.txt"
printf 'created_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> "$DEST/MANIFEST.txt"
collect_dir() {
  src="$1"
  [ -d "$src" ] || return 0
  find "$src" -maxdepth 1 -type f -iname '*ISL_PUM*' -print0 2>/dev/null | while IFS= read -r -d '' f; do
    base="$(basename "$f")"
    cp -p "$f" "$DEST/$base"
    printf 'source=%s copied_as=%s\n' "$f" "$base" >> "$DEST/MANIFEST.txt"
  done
}
collect_dir /roms/nds/backup
collect_dir /opt/drastic/backup
collect_dir /roms/nds
if command -v sha256sum >/dev/null 2>&1; then
  find "$DEST" -maxdepth 1 -type f ! -name 'SHA256SUMS.txt' -print0 | xargs -0 sha256sum > "$DEST/SHA256SUMS.txt" || true
fi
echo "Run export prepared at: $DEST"
echo "Original files were copied, never modified."
