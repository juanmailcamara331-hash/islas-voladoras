#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/out/R36_PACKAGE"
ROM="${1:-$ROOT/ISL_PUM_TECH_PREVIEW.nds}"
PACKAGE_NAME="${2:-ISL_PUM_R36_TECH_PREVIEW_PACKAGE.zip}"
test -f "$ROM" || { echo "ROM not found: $ROM" >&2; exit 1; }
rm -rf "$OUT"
mkdir -p "$OUT/roms/nds" "$OUT/ISL_PUM"
cp "$ROM" "$OUT/roms/nds/ISL_PUM.nds"
[ -f "$ROOT/PLAYER_README.md" ] && cp "$ROOT/PLAYER_README.md" "$OUT/ISL_PUM/PLAYER_README.txt"
printf '%s\n' "${GITHUB_SHA:-local}" > "$OUT/ISL_PUM/VERSION.txt"
cat > "$OUT/ISL_PUM/RUN_COLLECTION.txt" <<'TXT'
TECH PREVIEW SAVE NOTE

This homebrew does not rely on a normal commercial-game DraStic .dsv save.
When FAT/DLDI storage is exposed by the launcher/emulator, the ROM writes:
  ISL_PUM_SAVE.bin
and may preserve:
  ISL_PUM_SAVE.bin.bak

Do not rename, move, or overwrite either file during a run.
If the files are not created, persistence on that device is NOT yet verified.
The game should still run; report the device/emulator setup instead of fabricating a save.
TXT
(cd "$ROOT/out" && rm -f "$PACKAGE_NAME" && zip -qr "$PACKAGE_NAME" R36_PACKAGE)
echo "$ROOT/out/$PACKAGE_NAME"
