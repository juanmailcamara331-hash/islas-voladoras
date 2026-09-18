#!/usr/bin/env bash
set -euo pipefail
python3 scripts/security-gate.py
rm -rf build/public
mkdir -p build/public/poll build/public/assets

cp public-site/index.html build/public/index.html
cp portal/poll/index.html build/public/poll/index.html
cp portal/poll/molino.html build/public/poll/molino.html
cp portal/poll/pilares-argumento.html build/public/poll/pilares-argumento.html
cp portal/poll/referencias-amigos.html build/public/poll/referencias-amigos.html
cp portal/poll/gracias.html build/public/poll/gracias.html
cp portal/poll-live.js build/public/poll-live.js
cp portal/ISL_PUBLIC_DECISIONS_CURRENT.json build/public/ISL_PUBLIC_DECISIONS_CURRENT.json

for f in molino-a-top.jpg molino-b-top.jpg molino-c-top.jpg; do
  cp "portal/assets/$f" "build/public/assets/$f"
done

touch build/public/.nojekyll

# Security: public build is allowlist-only. Internal state must never leak here.
for forbidden in   ISL_PROJECT_STATE_CURRENT.json ISL_DECISION_CATALOG_CURRENT.json ISL_GAMEDEV_OS_CURRENT.json   ISL_SECURITY_OS_CURRENT.json ISL_STRESS_AUDIT_CURRENT.json decision-engine.html decision-studio.js lifecycle-studio.js; do
  test ! -e "build/public/$forbidden"
done

bytes=$(du -sb build/public | cut -f1)
echo "ISL PUBLIC build size: $bytes bytes"
if [ "$bytes" -gt 5000000 ]; then
  echo "ERROR: public Netlify payload exceeds 5 MB budget" >&2
  exit 3
fi
echo "ISL PUBLIC build OK: minimal landing + polls only."
