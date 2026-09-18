#!/usr/bin/env bash
set -euo pipefail
# Private Command Center inherits the proven portal build and security gates.
bash netlify-portal-build.sh
rm -rf build/private
mv build/site build/private
cp private-site/access-probe.html build/private/access-probe.html

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
echo "ISL PRIVATE build OK: full Command Center."
