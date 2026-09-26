#!/usr/bin/env bash
set -euo pipefail
# Private Command Center inherits the proven portal build and security gates.
bash netlify-portal-build.sh
rm -rf build/private
mv build/site build/private
cp private-site/access-probe.html build/private/access-probe.html
cp private-site/carrillo-human-lab.html build/private/carrillo-human-lab.html
cp private-site/carrillo-brief.html build/private/carrillo-brief.html
cp private-site/rumbo-isl.html build/private/rumbo-isl.html
cp private-site/irene-bestiary.html build/private/irene-bestiary.html
cp private-site/creative-dna.html build/private/creative-dna.html
mkdir -p build/private/data
cp private-site/data/isl-creative-dna-current.json build/private/data/isl-creative-dna-current.json

python3 - <<'PY'
from pathlib import Path
p=Path('build/private/decidir.html')
s=p.read_text(encoding='utf-8')
needle='<div class="links"><a href="encuestas.html">Encuestas</a><a href="playtest-review.html">Review</a><a href="playtest-lab.html">Playtest</a></div>'
extra='<div class="links"><a href="encuestas.html">Encuestas</a><a href="playtest-review.html">Review</a><a href="playtest-lab.html">Playtest</a><a href="decision-engine.html">Decision Engine</a><a href="creative-dna.html">Found Gold</a></div>'
if needle in s:
    s=s.replace(needle,extra)
p.write_text(s,encoding='utf-8')
PY

python3 - <<'PY'
from pathlib import Path
p=Path('build/private/crear.html')
s=p.read_text(encoding='utf-8')
needle='<a class="card" href="galeria.html"><div class="k">SÓLO MIRAR</div><b>Galería</b><span>Disfrutar lo que ya existe</span></a>'
entry='<a class="card" href="creative-dna.html"><div class="k">REENCUENTRO</div><b>Found Gold</b><span>Algo reaparece · qué te toca · qué función sigue viva</span></a>\\n'+needle
if 'href="creative-dna.html"' not in s and needle in s:
    s=s.replace(needle,entry)
p.write_text(s,encoding='utf-8')
PY

python3 - <<'PY'
from pathlib import Path
for name in ['index.html','command-center.html']:
    p=Path('build/private')/name
    s=p.read_text(encoding='utf-8')
    if 'ISL CARRILLO PRIVATE ENTRY' in s:
        continue
    entry='''<!-- ISL CARRILLO PRIVATE ENTRY -->
<a id="islCarrilloPrivateEntry" href="carrillo-human-lab.html" style="position:fixed;right:12px;bottom:12px;z-index:2147482000;border:1px solid #5e7b84;background:#07151ddd;color:#dff6f7;text-decoration:none;border-radius:999px;padding:9px 11px;font:900 9px/1 system-ui;letter-spacing:.08em;box-shadow:0 8px 26px #0008">CARRILLO · HUMAN LAB</a>\n<a id="islRumboPrivateEntry" href="rumbo-isl.html" style="position:fixed;right:12px;bottom:54px;z-index:2147482000;border:1px solid #8b7448;background:#17130ddd;color:#ffe7b6;text-decoration:none;border-radius:999px;padding:9px 11px;font:900 9px/1 system-ui;letter-spacing:.08em;box-shadow:0 8px 26px #0008">RUMBO ISL</a>\n<a id="islCreativeDnaPrivateEntry" href="creative-dna.html" style="position:fixed;right:12px;bottom:96px;z-index:2147482000;border:1px solid #755c9e;background:#181126dd;color:#eadcff;text-decoration:none;border-radius:999px;padding:9px 11px;font:900 9px/1 system-ui;letter-spacing:.08em;box-shadow:0 8px 26px #0008">CREATIVE DNA</a>\n'''
    s=s.replace('</body>',entry+'</body>')
    p.write_text(s,encoding='utf-8')
PY

# PRIVATE HOST SECURITY HEADERS
cat > build/private/_headers <<'EOF'
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  X-Frame-Options: DENY
  X-Permitted-Cross-Domain-Policies: none
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()
  Cross-Origin-Opener-Policy: same-origin
  X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex
  Cache-Control: no-store, private
  Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self' data:; connect-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; manifest-src 'self'; worker-src 'self' blob:

/*.json
  Cache-Control: no-store, private
  X-Robots-Tag: noindex, nofollow, noarchive

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate
EOF
test -f build/private/carrillo-human-lab.html
test -f build/private/carrillo-brief.html
grep -q "BRIEF DE BOLSILLO" build/private/carrillo-brief.html
grep -q "Carrillo Human Lab" build/private/carrillo-human-lab.html
test -f build/private/rumbo-isl.html
test -f build/private/irene-bestiary.html
test -f build/private/creative-dna.html
grep -q 'href="creative-dna.html"' build/private/crear.html
grep -q 'href="decision-engine.html"' build/private/decidir.html
grep -q 'href="creative-dna.html"' build/private/decidir.html
test -f build/private/data/isl-creative-dna-current.json
grep -q "PRIVATE LAB · REENCUENTRO CREATIVO" build/private/creative-dna.html
grep -q "Equilibrio vivo" build/private/rumbo-isl.html
grep -q "islCarrilloPrivateEntry" build/private/index.html
grep -q "islCarrilloPrivateEntry" build/private/command-center.html
grep -q "islRumboPrivateEntry" build/private/index.html
grep -q "islRumboPrivateEntry" build/private/command-center.html
grep -q "islCreativeDnaPrivateEntry" build/private/index.html
grep -q "islCreativeDnaPrivateEntry" build/private/command-center.html

echo "ISL PRIVATE build OK: full Command Center + Carrillo Human Lab."
