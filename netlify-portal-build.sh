#!/usr/bin/env bash
set -euo pipefail

rm -rf build/site
mkdir -p build/site

# Publica el Centro de Mandos completo tal como vive en /portal.
cp -a portal/. build/site/
touch build/site/.nojekyll

# CQC del Centro de Mandos y de la encuesta pública.
test -f build/site/index.html
test -f build/site/ps4.html
test -f build/site/ps4-runtime-hotfix.js
test -f build/site/poll/molino.html
test -f build/site/poll/gracias.html
test -d build/site/assets
test -f build/site/assets/floating-island-level.png
test -f build/site/assets/floating-ruins-guide.png

# PS4: genera un puente MP4/H.264 + AAC dedicado a partir de la música maestra.
# Es un extra del panel PS4: si la conversión falla, NO bloquea el Centro de Mandos.
if [ -f build/site/assets/airships-last-waltz-master.mp3 ] && [ -f ps4-audio-build.sh ]; then
  if bash ps4-audio-build.sh; then
    echo "PS4 audio bridge OK"
  else
    echo "AVISO: no se pudo regenerar el puente de audio PS4; el portal se publica igualmente." >&2
  fi
fi

echo "ISL Command Center build OK: portal completo + encuesta + assets. Godot fuera del pipeline."
