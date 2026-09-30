#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/out/R36_PACKAGE"
ROM="${1:-$ROOT/ISL_PUM_PLAYER.nds}"
test -f "$ROM" || { echo "ROM not found: $ROM" >&2; exit 1; }
rm -rf "$OUT"
mkdir -p "$OUT/roms/nds" "$OUT/ISL_PUM"
cp "$ROM" "$OUT/roms/nds/ISL_PUM.nds"
[ -f "$ROOT/PLAYER_README.md" ] && cp "$ROOT/PLAYER_README.md" "$OUT/ISL_PUM/PLAYER_README.txt"
printf '%s\n' "${GITHUB_SHA:-local}" > "$OUT/ISL_PUM/VERSION.txt"
cat > "$OUT/ISL_PUM/RUN_COLLECTION.txt" <<'TXT'
When the run is finished, preserve the original save.
Current R36 DraStic builds commonly store NDS backup data in /roms/nds/backup or /opt/drastic/backup.
Look for files beginning with ISL_PUM. Copy them; do not move or edit them.
TXT
(cd "$ROOT/out" && rm -f ISL_PUM_R36_PLAYER_PACKAGE.zip && zip -qr ISL_PUM_R36_PLAYER_PACKAGE.zip R36_PACKAGE)
echo "$ROOT/out/ISL_PUM_R36_PLAYER_PACKAGE.zip"
