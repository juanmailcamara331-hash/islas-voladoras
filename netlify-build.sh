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

# v0.7.2: portal/ is canonical. Never rewrite, downsample or substitute its media.
cp -a portal/. build/site/
cp -a build/web/. build/site/game/
mkdir -p build/site/game/lab
cp web/index.html build/site/game/lab/index.html
cp web/README.md build/site/game/lab/README.md
touch build/site/.nojekyll

# Hard CQC: a deploy must fail rather than publish degraded placeholders.
test -f build/site/index.html
test -f build/site/ps4.html
test -f build/site/reel.html
test -f build/site/labs/wind.html
test -f build/site/labs/method.html
test -f build/site/game/index.html
test -f build/site/assets/island-a-master.jpg
test -f build/site/assets/island-b-master.jpg
test -f build/site/assets/previs-premium-1080p-L41.mp4
test "$(stat -c%s build/site/assets/island-a-master.jpg)" -gt 300000
test "$(stat -c%s build/site/assets/island-b-master.jpg)" -gt 300000
test "$(stat -c%s build/site/assets/previs-premium-1080p-L41.mp4)" -gt 8000000
grep -q 'assets/island-a-master.jpg' build/site/index.html
grep -q 'assets/previs-premium-1080p-L41.mp4' build/site/index.html
! grep -R -q "image-rendering:[[:space:]]*pixelated\|image-rendering:[[:space:]]*crisp-edges" build/site/index.html build/site/ps4.html build/site/reel.html

echo "ISL unified Netlify build completed: v0.7.2 master-media CQC passed."
