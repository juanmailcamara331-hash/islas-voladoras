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

# Android/mobile production hotfixes. Keep them build-time so the canonical portal
# stays readable while production gets compatibility fixes for Chrome/WebView.
python3 - <<'PY'
from pathlib import Path
p = Path('build/site/index.html')
s = p.read_text(encoding='utf-8')
entry = '''
<style id="isl-mobile-entry-hotfix">
@media (max-width: 900px){
  #welcome{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
  body{overflow:auto!important}
  .app{visibility:visible!important;opacity:1!important}
}
</style>
'''
media = '''
<style id="isl-mobile-media-hotfix">
#lbMedia{display:flex;align-items:center;justify-content:center;max-width:96vw;max-height:86vh;min-width:0;min-height:0}
#lbMedia img,#lbMedia video{display:block!important;width:auto!important;height:auto!important;max-width:94vw!important;max-height:82vh!important;object-fit:contain!important;background:#02070b}
@media(max-width:900px){
 #lightbox{padding:0!important;background:#02070b!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 #lightbox figure{width:100vw!important;height:100dvh!important;max-width:none!important;max-height:none!important;justify-content:center!important}
 #lbMedia{width:100vw!important;height:calc(100dvh - 70px)!important;max-width:none!important;max-height:none!important}
 #lbMedia img,#lbMedia video{max-width:100vw!important;max-height:calc(100dvh - 70px)!important;border-radius:0!important;box-shadow:none!important}
}
</style>
'''
script = '''
<script id="isl-mobile-media-hotfix-js">
(function(){
 var lb=document.getElementById('lightbox'),med=document.getElementById('lbMedia'),cap=document.getElementById('lbCaption');
 if(!lb||!med)return;
 function showNode(node,caption){med.innerHTML='';node.style.display='block';node.style.objectFit='contain';med.appendChild(node);if(cap)cap.textContent=caption||'';lb.classList.add('show')}
 function showImage(img){var clone=img.cloneNode(true);clone.removeAttribute('srcset');clone.removeAttribute('sizes');clone.removeAttribute('loading');clone.src=img.getAttribute('src')||img.src;clone.onerror=function(){med.innerHTML='<div style="padding:24px;color:#fff;text-align:center">No se pudo mostrar esta imagen.</div>'};showNode(clone,img.alt||'ISL')}
 function showVideo(v){var el=document.createElement('video');el.controls=true;el.autoplay=true;el.playsInline=true;el.preload='auto';el.src=v.getAttribute('src')||v.currentSrc||v.src;el.onerror=function(){med.innerHTML='<div style="padding:24px;color:#fff;text-align:center">No se pudo mostrar este vídeo.</div>'};showNode(el,v.getAttribute('data-caption')||'ISL');var pr=el.play();if(pr&&pr.catch)pr.catch(function(){})}
 document.addEventListener('click',function(e){var v=e.target.closest&&e.target.closest('[data-fullmedia]'),img=e.target.closest&&e.target.closest('.asset img,.hero img');if(!v&&!img)return;e.preventDefault();e.stopImmediatePropagation();if(v)showVideo(v);else showImage(img)},true);
})();
</script>
'''
if 'isl-mobile-entry-hotfix' not in s: s = s.replace('</head>', entry + '\n</head>')
if 'isl-mobile-media-hotfix' not in s: s = s.replace('</head>', media + '\n</head>')
if 'isl-mobile-media-hotfix-js' not in s: s = s.replace('</body>', script + '\n</body>')
p.write_text(s, encoding='utf-8')
PY

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
grep -q 'isl-mobile-entry-hotfix' build/site/index.html
grep -q 'isl-mobile-media-hotfix' build/site/index.html
grep -q 'isl-mobile-media-hotfix-js' build/site/index.html
! grep -R -q "image-rendering:[[:space:]]*pixelated\|image-rendering:[[:space:]]*crisp-edges" build/site/index.html build/site/ps4.html build/site/reel.html

echo "ISL unified Netlify build completed: master media + mobile entry/media CQC passed."
