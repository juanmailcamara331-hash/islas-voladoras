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

if errors:
    print("SECURITY GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)

print("SECURITY GATE OK: pinned deps + headers + poll abuse controls + security artifacts")
