#!/usr/bin/env bash
set -euo pipefail

VERSION="${GODOT_VERSION:-4.7.2}"
GODOT_DIR="/tmp/godot"
TEMPLATES_DIR="$HOME/.local/share/godot/export_templates/${VERSION}.stable"

rm -rf "$GODOT_DIR" build/web build/site /tmp/godot.zip /tmp/templates.tpz /tmp/templates
mkdir -p "$GODOT_DIR" build/web build/site/game "$TEMPLATES_DIR"

wget -q "https://github.com/godotengine/godot/releases/download/${VERSION}-stable/Godot_v${VERSION}-stable_linux.x86_64.zip" -O /tmp/godot.zip
unzip -q /tmp/godot.zip -d "$GODOT_DIR"
GODOT_BIN="$GODOT_DIR/Godot_v${VERSION}-stable_linux.x86_64"
chmod +x "$GODOT_BIN"

wget -q "https://github.com/godotengine/godot/releases/download/${VERSION}-stable/Godot_v${VERSION}-stable_export_templates.tpz" -O /tmp/templates.tpz
unzip -q /tmp/templates.tpz -d /tmp/templates
cp -a /tmp/templates/templates/. "$TEMPLATES_DIR/"

cat > /tmp/export_presets.cfg <<'EOF'
[preset.0]
name="Web"
platform="Web"
runnable=true
custom_features=""
export_filter="all_resources"
include_filter=""
exclude_filter=""
export_path="build/web/index.html"
patch_list=Array[String]([])

[preset.0.options]
custom_template/debug=""
custom_template/release=""
variant/export_type=0
variant/thread_support=false
vram_texture_compression/for_desktop=true
vram_texture_compression/for_mobile=false
html/custom_html_shell=""
html/head_include="res://web/fullscreen.js"
html/canvas_resize_policy=2
html/focus_canvas_on_start=true
html/experimental_virtual_keyboard=false
progressive_web_app/enabled=false
EOF

cp /tmp/export_presets.cfg export_presets.cfg
"$GODOT_BIN" --headless --path . --export-release "Web" build/web/index.html

# Portal ISL como raíz pública.
cp -a portal/. build/site/

# Juego Godot dentro del mismo sitio.
cp -a build/web/. build/site/game/

# Mantener el laboratorio web histórico del proyecto dentro del juego.
mkdir -p build/site/game/lab
cp web/index.html build/site/game/lab/index.html
cp web/README.md build/site/game/lab/README.md

touch build/site/.nojekyll

# CQC MEDIA: producción nunca presenta placeholders de pocos KB como contenido premium.
python3 - <<'PY'
from pathlib import Path
p=Path('build/site/index.html')
s=p.read_text(encoding='utf-8')
s=s.replace('<a href="game/">Juego Web</a><a href="reel.html">Reel dinámico</a><a href="assets/isl-tv-reel-pages.mp4">Reel MP4</a>',
            '<a href="game/">Juego Web</a><a href="reel.html">Reel Espectáculo HQ</a>')
s=s.replace('<article class="card media-card" data-help="Previs de cámara, nubes y respiración ambiental."><video data-lightbox-video poster="assets/island-a.svg" muted playsinline preload="metadata"><source src="assets/previs-pages.mp4"></video><div class="pad"><b>Previs flotante</b><span>Vídeo / referencia</span></div></article>',
            '<a class="card" href="reel.html" data-help="Movimiento y atmósfera sin degradar la imagen."><img src="assets/island-a.svg" alt="ISL HQ"><div class="pad"><b>Previs / Espectáculo HQ</b><span>Vector · fullscreen · resolución independiente</span></div></a>')
s=s.replace('<a class="card text-card" href="assets/isl-tv-reel-pages.mp4" data-help="MP4 ligero H.264/AAC para dispositivos y PS4."><span class="eyebrow">PS4 / TV</span><strong>Reel MP4</strong><p>Derivado fiable para pantalla completa.</p></a>',
            '<a class="card text-card" href="reel.html" data-help="Modo espectáculo HQ para PS4, TV, móvil y PC."><span class="eyebrow">PS4 / TV / ANDROID</span><strong>Espectáculo HQ</strong><p>Calidad visual independiente de resolución. Sin placeholders comprimidos.</p></a>')
s=s.replace('Los vídeos también.','El modo Espectáculo también.')
p.write_text(s,encoding='utf-8')
PY

# Retirar del artefacto publicado los antiguos derivados degradados.
rm -f build/site/assets/isl-tv-reel-pages.mp4 \
      build/site/assets/airships-last-waltz-pages.mp3 \
      build/site/assets/previs-pages.mp4

# CQC mínimo antes de publicar.
test -f build/site/index.html
test -f build/site/ps4.html
test -f build/site/reel.html
test -f build/site/labs/wind.html
test -f build/site/labs/method.html
test -f build/site/game/index.html
test -f build/site/assets/island-a.svg
test -f build/site/assets/island-b.svg
grep -q "ISL" build/site/index.html
grep -q "MODO ESPECTÁCULO HQ" build/site/reel.html
! grep -R -q "isl-tv-reel-pages.mp4\|airships-last-waltz-pages.mp3\|previs-pages.mp4" build/site/index.html build/site/ps4.html build/site/reel.html build/site/content-manifest.json

# Calidad visual: nunca usar nearest-neighbour/pixelated en la interfaz pública.
! grep -R -q "image-rendering:[[:space:]]*pixelated\|image-rendering:[[:space:]]*crisp-edges" build/site/index.html build/site/ps4.html build/site/reel.html build/site/styles.css

echo "ISL unified Netlify build completed: HQ media CQC passed."
