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

# Canonical portal + generated game.
cp -a portal/. build/site/
cp -a build/web/. build/site/game/
mkdir -p build/site/game/lab
cp web/index.html build/site/game/lab/index.html
cp web/README.md build/site/game/lab/README.md
touch build/site/.nojekyll

# Production compatibility + adaptive layout fixes.
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
#lbMedia{display:flex;align-items:center;justify-content:center;max-width:96%;max-height:86vh;min-width:0;min-height:0}
#lbMedia img,#lbMedia video{display:block!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:82vh!important;object-fit:contain!important;background:#02070b}
@media(max-width:900px){
 #lightbox{padding:0!important;background:#02070b!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
 #lightbox figure{width:100%!important;height:100dvh!important;max-width:none!important;max-height:none!important;justify-content:center!important}
 #lbMedia{width:100%!important;height:calc(100dvh - 70px)!important;max-width:100%!important;max-height:none!important}
 #lbMedia img,#lbMedia video{max-width:100%!important;max-height:calc(100dvh - 70px)!important;border-radius:0!important;box-shadow:none!important}
}
</style>
'''

responsive = '''
<style id="isl-responsive-viewport-hotfix">
*,*:before,*:after{box-sizing:border-box}
html{width:100%;max-width:100%;overflow-x:hidden;-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{width:100%;max-width:100%;min-width:0;overflow-x:hidden}
.app,main,.view,.view.active,.hero,.panel,.card,.gallery,.grid,.two,.three,.statsgrid,.compare,.topbar,.actions,.toolbar{min-width:0;max-width:100%}
.app{width:100%;grid-template-columns:minmax(0,86px) minmax(0,1fr)}
main{width:100%;margin-inline:auto}
img,video,canvas,svg{max-width:100%}
h1,h2,h3,.sub,.heroQuote,.meta,.callout{overflow-wrap:break-word;word-break:normal}

@media(max-width:900px){
  html,body{overflow-x:hidden!important}
  .app{display:block!important;width:100%!important;max-width:100%!important;overflow:hidden!important}
  .rail{position:sticky!important;top:0!important;left:auto!important;right:auto!important;width:100%!important;max-width:100%!important;height:auto!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:4px!important;padding:6px max(6px,env(safe-area-inset-left))!important;overflow-x:auto!important;overflow-y:hidden!important;overscroll-behavior-x:contain;scrollbar-width:none}
  .rail::-webkit-scrollbar{display:none}
  .logo{flex:0 0 auto!important;writing-mode:horizontal-tb!important;transform:none!important;margin:0 4px 0 0!important;font-size:11px!important}
  .rail button{flex:0 0 42px!important;min-width:42px!important;width:42px!important;height:42px!important;border-radius:12px!important;font-size:17px!important}
  .drawer{left:0!important;top:54px!important;width:min(360px,100%)!important;max-width:100%!important}
  main{width:100%!important;max-width:100%!important;padding:10px max(10px,env(safe-area-inset-right)) calc(82px + env(safe-area-inset-bottom)) max(10px,env(safe-area-inset-left))!important;margin:0!important}
  .view,.view.active{width:100%!important;max-width:100%!important}
  .hero{width:100%!important;max-width:100%!important;min-height:0!important;height:auto!important;border-radius:18px!important}
  .hero img{width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important}
  .heroText{width:100%!important;max-width:100%!important;padding:clamp(28px,8dvh,72px) clamp(16px,5vw,48px) clamp(30px,8dvh,76px)!important}
  h1{font-size:clamp(34px,9.4vw,58px)!important;line-height:.98!important;letter-spacing:-.035em!important}
  h2{font-size:clamp(22px,6vw,30px)!important}
  .heroQuote{font-size:clamp(17px,4.7vw,26px)!important}
  .sub{font-size:clamp(12px,3.6vw,15px)!important}
  .actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;gap:7px!important}
  .actions .btn{width:100%!important;min-width:0!important;text-align:center!important;white-space:normal!important;padding:10px 8px!important}
  .actions .btn:last-child:nth-child(odd){grid-column:1/-1}
  .toolbar{width:100%!important;display:flex!important;flex-wrap:wrap!important}
  .toolbar .control{flex:1 1 140px!important;min-width:0!important}
  .grid,.gallery,.statsgrid{width:100%!important;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))!important}
  .two,.three,.compare{width:100%!important;grid-template-columns:1fr!important}
  .card,.panel,.asset{width:100%!important;max-width:100%!important}
  .thumbwrap{width:100%!important;aspect-ratio:16/10!important}
  .asset img{width:100%!important;height:100%!important;object-fit:cover!important}
  .topbar{width:100%!important;flex-wrap:wrap!important}
  .metric{grid-template-columns:minmax(82px,120px) minmax(0,1fr) 38px!important;gap:6px!important}
  .calendar{width:100%!important;grid-template-columns:repeat(7,minmax(0,1fr))!important;min-width:0!important}
  .day{min-width:0!important;overflow:hidden!important}
  .event{overflow:hidden!important;text-overflow:ellipsis!important}
  .roadmapMap{width:100%!important;max-width:100%!important;overflow:hidden!important}
  .island{max-width:42%!important}
  .track{left:10px!important;right:10px!important;width:auto!important;max-width:none!important}
}

@media(max-width:560px){
  main{padding-left:8px!important;padding-right:8px!important}
  .rail{gap:3px!important;padding-left:5px!important;padding-right:5px!important}
  .logo{font-size:10px!important;margin-right:2px!important}
  .rail button{flex-basis:40px!important;min-width:40px!important;width:40px!important;height:40px!important}
  h1{font-size:clamp(32px,10.5vw,48px)!important}
  .heroText{padding-left:18px!important;padding-right:18px!important}
  .grid,.gallery,.statsgrid{grid-template-columns:1fr!important}
  .actions{grid-template-columns:1fr 1fr!important}
  .btn,.control{font-size:12px!important}
  .kpi{font-size:clamp(24px,9vw,34px)!important}
}

@media(max-width:380px){
  .rail button{flex-basis:38px!important;min-width:38px!important;width:38px!important;height:38px!important;font-size:15px!important}
  .actions{grid-template-columns:1fr!important}
  .actions .btn{grid-column:auto!important}
  .metric{grid-template-columns:1fr!important}
  .metric>*{min-width:0!important}
}

@media(orientation:landscape) and (max-height:620px){
  .rail{position:sticky!important;padding-top:4px!important;padding-bottom:4px!important}
  .rail button{height:38px!important;min-width:38px!important;flex-basis:38px!important}
  main{padding-top:8px!important;padding-bottom:56px!important}
  .hero{min-height:calc(100dvh - 70px)!important}
  .heroText{padding:clamp(18px,6dvh,34px) clamp(24px,5vw,70px)!important}
  h1{font-size:clamp(30px,5.7vw,58px)!important;line-height:.94!important}
  .heroQuote{font-size:clamp(15px,2.6vw,22px)!important;margin:14px 0!important}
  .sub{font-size:clamp(11px,1.8vw,14px)!important;line-height:1.35!important}
  .actions{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important}
  .actions .btn{padding:8px 6px!important;font-size:11px!important}
  .actions .btn:last-child:nth-child(odd){grid-column:auto!important}
  .grid,.gallery,.statsgrid{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))!important}
}

@media(min-width:901px) and (max-width:1250px){
  .app{grid-template-columns:72px minmax(0,1fr)!important}
  .rail button{width:52px!important;height:50px!important}
  main{padding-left:16px!important;padding-right:16px!important}
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

# Remove any previous generated versions before injecting the current ones.
import re
for ident in ['isl-mobile-entry-hotfix','isl-mobile-media-hotfix','isl-responsive-viewport-hotfix']:
    s = re.sub(r'<style id="'+re.escape(ident)+r'">.*?</style>\s*','',s,flags=re.S)
s = re.sub(r'<script id="isl-mobile-media-hotfix-js">.*?</script>\s*','',s,flags=re.S)

s = s.replace('</head>', entry + '\n' + media + '\n' + responsive + '\n</head>')
s = s.replace('</body>', script + '\n</body>')
p.write_text(s, encoding='utf-8')
PY

# Hard CQC: never publish degraded placeholders or a broken adaptive shell.
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
grep -q 'isl-responsive-viewport-hotfix' build/site/index.html
grep -q 'isl-mobile-media-hotfix-js' build/site/index.html
! grep -q 'width:100vw!important' build/site/index.html
! grep -R -q "image-rendering:[[:space:]]*pixelated\|image-rendering:[[:space:]]*crisp-edges" build/site/index.html build/site/ps4.html build/site/reel.html

echo "ISL build completed: master media + adaptive container-safe responsive layout passed."
