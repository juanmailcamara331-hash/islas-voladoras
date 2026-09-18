#!/usr/bin/env bash
set -euo pipefail
# Private Command Center inherits the proven portal build and security gates.
bash netlify-portal-build.sh
rm -rf build/private
mv build/site build/private
cp private-site/access-probe.html build/private/access-probe.html
echo "ISL PRIVATE build OK: full Command Center."
