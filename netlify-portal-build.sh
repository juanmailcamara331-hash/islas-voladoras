#!/usr/bin/env bash
set -euo pipefail

rm -rf build/site
mkdir -p build/site

# Publica el portal completo tal como vive en /portal.
cp -a portal/. build/site/

# Mantén disponible el pequeño laboratorio web si existe.
if [ -d web ]; then
  mkdir -p build/site/game/lab
  [ -f web/index.html ] && cp web/index.html build/site/game/lab/index.html || true
  [ -f web/README.md ] && cp web/README.md build/site/game/lab/README.md || true
fi

touch build/site/.nojekyll

# CQC mínimo del portal y de la encuesta pública.
test -f build/site/index.html
test -f build/site/poll/molino.html
test -f build/site/poll/gracias.html
test -d build/site/assets

# Las imágenes fuente usadas por la encuesta deben viajar con el deploy.
test -f build/site/assets/floating-island-level.png
test -f build/site/assets/floating-ruins-guide.png

echo "ISL portal build OK: portal + poll + assets publicados sin bloquear por Godot/PS4."
