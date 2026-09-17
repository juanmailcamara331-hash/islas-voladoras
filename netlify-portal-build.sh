#!/usr/bin/env bash
set -euo pipefail

rm -rf build/site
mkdir -p build/site

# Publica únicamente el portal web de ISL, incluida la encuesta y sus assets.
cp -a portal/. build/site/

touch build/site/.nojekyll

# CQC mínimo del portal y de la encuesta pública.
test -f build/site/index.html
test -f build/site/poll/molino.html
test -f build/site/poll/gracias.html
test -d build/site/assets

# Las imágenes fuente usadas por la encuesta deben viajar con el deploy.
test -f build/site/assets/floating-island-level.png
test -f build/site/assets/floating-ruins-guide.png

echo "ISL portal build OK: portal + encuesta + assets."
