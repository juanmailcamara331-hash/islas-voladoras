#!/usr/bin/env bash
set -euo pipefail
# Private Command Center inherits the proven portal build and security gates.
bash netlify-portal-build.sh
rm -rf build/private
mv build/site build/private
cp private-site/access-probe.html build/private/access-probe.html
cp private-site/carrillo-human-lab.html build/private/carrillo-human-lab.html

python3 - <<'PY'
from pathlib import Path
for name in ['index.html','command-center.html']:
    p=Path('build/private')/name
    s=p.read_text(encoding='utf-8')
    if 'ISL CARRILLO PRIVATE ENTRY' in s:
        continue
    entry='''<!-- ISL CARRILLO PRIVATE ENTRY -->
<a id="islCarrilloPrivateEntry" href="carrillo-human-lab.html" style="position:fixed;right:12px;bottom:12px;z-index:2147482000;border:1px solid #5e7b84;background:#07151ddd;color:#dff6f7;text-decoration:none;border-radius:999px;padding:9px 11px;font:900 9px/1 system-ui;letter-spacing:.08em;box-shadow:0 8px 26px #0008">CARRILLO · HUMAN LAB</a>
'''
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
grep -q "Carrillo Human Lab" build/private/carrillo-human-lab.html
grep -q "islCarrilloPrivateEntry" build/private/index.html
grep -q "islCarrilloPrivateEntry" build/private/command-center.html

echo "ISL PRIVATE build OK: full Command Center + Carrillo Human Lab."
