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

cp -a portal/. build/site/
cp -a build/web/. build/site/game/
mkdir -p build/site/game/lab
cp web/index.html build/site/game/lab/index.html
cp web/README.md build/site/game/lab/README.md
touch build/site/.nojekyll

python3 - <<'PY'
from pathlib import Path
import re
p=Path('build/site/index.html')
s=p.read_text(encoding='utf-8')
for ident in ['isl-mobile-entry-hotfix','isl-mobile-media-hotfix','isl-responsive-viewport-hotfix']:
    s=re.sub(r'<style id="'+re.escape(ident)+r'">.*?</style>\s*','',s,flags=re.S)
s=re.sub(r'<script id="isl-mobile-media-hotfix-js">.*?</script>\s*','',s,flags=re.S)
s=re.sub(r'<link[^>]+href="isl-polish\.css"[^>]*>\s*','',s)
s=re.sub(r'<script[^>]+src="isl-polish\.js"[^>]*></script>\s*','',s)
s=re.sub(r'<script[^>]+src="isl-media-gestures\.js"[^>]*></script>\s*','',s)
media='''
<style id="isl-mobile-media-hotfix">
#lbMedia{display:flex;align-items:center;justify-content:center;max-width:96%;max-height:86vh;min-width:0;min-height:0;touch-action:none;overscroll-behavior:contain}
#lbMedia img,#lbMedia video{display:block!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:82vh!important;object-fit:contain!important;background:#02070b;transform-origin:50% 50%}
@media(max-width:900px){
 #lightbox{padding:0!important;background:#02070b!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;overflow:hidden!important}
 #lightbox figure{width:100%!important;height:100dvh!important;max-width:100%!important;max-height:100dvh!important;justify-content:center!important;overflow:hidden!important}
 #lbMedia{width:100%!important;height:calc(100dvh - 70px)!important;max-width:100%!important;max-height:calc(100dvh - 70px)!important;overflow:hidden!important}
 #lbMedia img,#lbMedia video{max-width:100%!important;max-height:100%!important;border-radius:0!important;box-shadow:none!important}
}
</style>
'''
script='''
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
s=s.replace('</head>','<link rel="stylesheet" href="isl-polish.css">\n'+media+'\n</head>')
s=s.replace('</body>',script+'\n<script defer src="isl-polish.js"></script>\n<script defer src="isl-media-gestures.js"></script>\n</body>')
p.write_text(s,encoding='utf-8')
PY

test -f build/site/index.html
test -f build/site/ps4.html
test -f build/site/reel.html
test -f build/site/isl-polish.css
test -f build/site/isl-polish.js
test -f build/site/isl-media-gestures.js
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
grep -q 'isl-mobile-media-hotfix' build/site/index.html
grep -q 'isl-polish.css' build/site/index.html
grep -q 'isl-polish.js' build/site/index.html
grep -q 'isl-media-gestures.js' build/site/index.html
grep -q 'prefers-reduced-motion' build/site/isl-polish.css
grep -q 'islAmbientParticles' build/site/isl-polish.js
grep -q 'pointerdown' build/site/isl-media-gestures.js
! grep -q 'isl-mobile-entry-hotfix' build/site/index.html
! grep -R -q "image-rendering:[[:space:]]*pixelated\|image-rendering:[[:space:]]*crisp-edges" build/site/index.html build/site/ps4.html build/site/reel.html

echo "ISL build completed: adaptive responsive + pinch zoom + fullscreen exit placement passed."
