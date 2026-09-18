#!/usr/bin/env python3
from pathlib import Path
import json, sys

errors=[]

def need(cond,msg):
    if not cond: errors.append(msg)

pkg=json.loads(Path("package.json").read_text(encoding="utf-8"))
for name,version in pkg.get("dependencies",{}).items():
    need(version not in ("latest","*"), f"dependency {name} is not pinned")
    need(not str(version).startswith(("^","~",">","<")), f"dependency {name} must be exact for production baseline")

toml=Path("netlify.toml").read_text(encoding="utf-8")
for token in [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "X-Frame-Options",
    "Permissions-Policy",
    "X-Content-Type-Options",
]:
    need(token in toml, f"missing security header: {token}")

poll=Path("netlify/functions/poll-state.mts").read_text(encoding="utf-8")
for token in ["rateLimit", "sameOrigin(req", "payload_too_large", "unsupported_media_type"]:
    need(token in poll, f"poll API hardening missing: {token}")

for path in [
    "SECURITY.md",
    "portal/ISL_SECURITY_OS_CURRENT.json",
    ".github/workflows/codeql.yml",
    ".github/workflows/dependency-review.yml",
    ".github/dependabot.yml",
]:
    need(Path(path).exists(), f"missing security artifact: {path}")

# PUBLIC/PRIVATE build separation
pub_build=Path("netlify-public-build.sh").read_text(encoding="utf-8")
need("pilares-lite-v2.html" in pub_build, "public build missing Pilares Lite v2")
need("referencias-lite-v2.html" in pub_build, "public build missing Referencias Lite v2")
for forbidden in ["command-center.html","rpg-home.html","route-isl.js","huellas.html","secret-level.html"]:
    need(forbidden in pub_build, f"public build must explicitly forbid private surface: {forbidden}")

portal_index=Path("portal/index.html").read_text(encoding="utf-8")
need('name="robots" content="noindex' in portal_index, "Command Center must be noindex")
need(Path("portal/robots.txt").exists(), "missing portal robots.txt")

if errors:
    print("SECURITY GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)

print("SECURITY GATE OK: pinned deps + headers + poll abuse controls + security artifacts + PUBLIC/PRIVATE build separation")
