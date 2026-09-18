#!/usr/bin/env bash
set -euo pipefail
python3 scripts/asset-budget.py

python3 scripts/security-gate.py

rm -rf build/site
mkdir -p build/site

# Publica el portal completo tal como vive en /portal.
cp -a portal/. build/site/
touch build/site/.nojekyll

# RPG HOME v1 pasa a ser la entrada principal.
# Conservamos el Centro de Mandos técnico intacto en command-center.html.
cp build/site/index.html build/site/command-center.html
cp build/site/rpg-home.html build/site/index.html

# Recupera la capa responsive/interaction del Centro de Mandos técnico.
python3 - <<'PY'
from pathlib import Path
import re

p=Path('build/site/command-center.html')
s=p.read_text(encoding='utf-8')

for ident in ['isl-mobile-media-hotfix','isl-responsive-command-center-fix']:
    s=re.sub(r'<style id="'+re.escape(ident)+r'">.*?</style>\s*','',s,flags=re.S)
for src in ['isl-polish.js','isl-media-gestures.js','media-clean.js','isl-current-state.js','decision-studio.js','lifecycle-studio.js','creative-head.js']:
    s=re.sub(r'<script[^>]+src="'+re.escape(src)+r'"[^>]*></script>\s*','',s)
s=re.sub(r'<link[^>]+href="isl-polish\.css"[^>]*>\s*','',s)

responsive='''
<style id="isl-responsive-command-center-fix">
html,body{width:100%;max-width:100%;overflow-x:hidden}
#welcome{overflow:hidden!important;max-width:100vw!important;contain:layout paint}
#welcomeWind{overflow:hidden!important;max-width:100vw!important}
.windstroke{max-width:330px!important}
.mediaCard,.mediaCard>*{min-width:0!important;max-width:100%!important}
.mediaCard video{width:100%!important;max-width:100%!important;height:210px!important;object-fit:cover!important}
@media(max-width:900px){
 html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
 .app{width:100%!important;max-width:100%!important}
 main{width:100%!important;max-width:100%!important;min-width:0!important}
 .view,.view.active,.grid,.gallery,.card,.panel{min-width:0!important;max-width:100%!important}
}
</style>
'''

media='''
<style id="isl-mobile-media-hotfix">
#lightbox{padding:0!important;background:#02070b!important;overflow:hidden!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
#lightbox figure{position:absolute!important;inset:0!important;width:100%!important;height:100dvh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
#lbMedia{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important;touch-action:none;overscroll-behavior:contain}
#lbMedia img,#lbMedia video{display:block!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;background:#02070b!important;transform-origin:50% 50%;border:0!important;border-radius:0!important;box-shadow:none!important;margin:0!important}
#lbCaption{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}
</style>
'''

s=s.replace('</head>','<link rel="stylesheet" href="isl-polish.css">\n'+responsive+'\n'+media+'\n</head>')
s=s.replace('</body>','<script defer src="isl-polish.js"></script>\n<script defer src="isl-media-gestures.js"></script>\n<script defer src="media-clean.js"></script>\n<script defer src="isl-current-state.js"></script>\n<script defer src="decision-studio.js"></script>\n<script defer src="lifecycle-studio.js"></script>\n<script defer src="creative-head.js"></script>\n</body>')
p.write_text(s,encoding='utf-8')

poll=Path('build/site/poll/molino.html')
ps=poll.read_text(encoding='utf-8')
ps=re.sub(r'<script[^>]+src="\.\./poll-live\.js"[^>]*></script>\s*','',ps)
ps=ps.replace('</body>','<script defer src="../poll-live.js"></script>\n</body>')
poll.write_text(ps,encoding='utf-8')

ps4=Path('build/site/ps4.html')
ps=ps4.read_text(encoding='utf-8')
ps=re.sub(r'<script[^>]+src="ps4-runtime-hotfix\.js"[^>]*></script>\s*','',ps)
ps=ps.replace('</body>','<script defer src="ps4-runtime-hotfix.js"></script>\n</body>')
ps4.write_text(ps,encoding='utf-8')
PY

test -f build/site/index.html
test -f build/site/rpg-home.html
test -f build/site/command-center.html
test -f build/site/ps4.html
test -f build/site/ps4-runtime-hotfix.js
test -f build/site/poll/molino.html
test -f build/site/poll/gracias.html
test -f build/site/poll-live.js
test -f build/site/isl-polish.css
test -f build/site/isl-polish.js
test -f build/site/isl-media-gestures.js
test -f build/site/media-clean.js
test -f build/site/isl-current-state.js
test -f build/site/decision-studio.js
test -f build/site/lifecycle-studio.js
test -f build/site/creative-head.js
test -f build/site/ISL_STRESS_AUDIT_CURRENT.json
test -f build/site/ISL_SECURITY_OS_CURRENT.json
test -f build/site/ISL_GAMEDEV_OS_CURRENT.json
test -f build/site/ISL_DECISION_CATALOG_CURRENT.json
test -f build/site/ISL_PUBLIC_DECISIONS_CURRENT.json
test -f build/site/poll/index.html
test -d build/site/assets
test -f build/site/assets/floating-island-level.png
test -f build/site/assets/floating-ruins-guide.png
grep -q 'Cabina de Expedición' build/site/index.html
grep -q 'isl-polish.css' build/site/command-center.html
grep -q 'isl-polish.js' build/site/command-center.html
grep -q 'isl-current-state.js' build/site/command-center.html
grep -q 'decision-studio.js' build/site/command-center.html
grep -q 'lifecycle-studio.js' build/site/command-center.html
grep -q 'creative-head.js' build/site/command-center.html
grep -q 'isl-responsive-command-center-fix' build/site/command-center.html
grep -q '../poll-live.js' build/site/poll/molino.html
grep -q 'ps4-runtime-hotfix.js' build/site/ps4.html

if [ -f build/site/assets/airships-last-waltz-master.mp3 ] && [ -f ps4-audio-build.sh ]; then
  if bash ps4-audio-build.sh; then
    echo "PS4 audio bridge OK"
  else
    echo "AVISO: no se pudo regenerar el puente de audio PS4; el portal se publica igualmente." >&2
  fi
fi

echo "ISL build OK: RPG HOME v1 + Command Center técnico + responsive polish + live poll + Decision Studio + portal + assets."
