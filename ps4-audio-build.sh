#!/usr/bin/env bash
set -euo pipefail

SRC="build/site/assets/airships-last-waltz-master.mp3"
OUT="build/site/assets/airships-last-waltz-ps4.mp4"

if [ ! -f "$SRC" ]; then
  echo "PS4 audio source missing: $SRC" >&2
  exit 1
fi

# PS4 Web Content Guidelines: <audio> playback is not supported in the browser.
# Create a tiny H.264 MP4 whose audio track is AAC-LC and play it through <video>.
npm install --no-save --no-package-lock ffmpeg-static@5 >/dev/null 2>&1
FFMPEG_BIN="$(node -p "require('ffmpeg-static')")"
chmod +x "$FFMPEG_BIN"

"$FFMPEG_BIN" -y \
  -f lavfi -i "color=c=black:s=32x32:r=1" \
  -i "$SRC" \
  -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -preset veryfast -tune stillimage \
  -c:a aac -profile:a aac_low -b:a 192k -ar 44100 -ac 2 \
  -shortest -movflags +faststart \
  "$OUT" >/dev/null 2>&1

test -s "$OUT"

echo "PS4 audio bridge created: MP4/H.264 + AAC-LC"
