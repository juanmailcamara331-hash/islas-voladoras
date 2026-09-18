#!/usr/bin/env python3
from pathlib import Path
import json, sys

ROOT=Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/"docs/ISL_ROUTE_VISIBILITY_v0.67.json").read_text(encoding="utf-8"))
public_root=ROOT/"build/public"

errors=[]
def fail(msg): errors.append(msg)

if not public_root.exists():
    fail("build/public missing; run netlify-public-build.sh first")
else:
    public_files={p.relative_to(public_root).as_posix() for p in public_root.rglob("*") if p.is_file()}

    # Explicitly private file basenames / relative paths that must never appear in public build.
    private_exact=set()
    private_prefixes=[]
    for item in manifest.get("private_patterns",[]):
        rel=item.removeprefix("portal/")
        if rel.endswith("/**"):
            private_prefixes.append(rel[:-3].rstrip("/"))
        else:
            private_exact.add(rel)

    for f in sorted(public_files):
        if f in private_exact:
            fail(f"PRIVATE route leaked into public build: {f}")
        for pref in private_prefixes:
            if f==pref or f.startswith(pref+"/"):
                fail(f"PRIVATE prefix leaked into public build: {f}")

    # Internal-state catch-all. Public decisions are the single explicit exception.
    for f in sorted(public_files):
        name=Path(f).name
        if name.startswith("ISL_") and name.endswith(".json") and name!="ISL_PUBLIC_DECISIONS_CURRENT.json":
            fail(f"internal ISL JSON leaked into public build: {f}")

    # These operational surfaces must never be public even if someone forgets manifest maintenance.
    deny_names={
        "command-center.html","rpg-home.html","huellas.html","secret-level.html",
        "boss-prototype.html","salon-cortinas-rojas.html","isla-baile-inagotable.html",
        "route-isl.js","decision-engine.html","decision-studio.js","lifecycle-studio.js"
    }
    for f in sorted(public_files):
        if Path(f).name in deny_names:
            fail(f"hard-deny operational surface leaked: {f}")

if errors:
    print("ROUTE VISIBILITY GATE FAILED")
    for e in errors:
        print(" -",e)
    sys.exit(1)

print("ROUTE VISIBILITY GATE GREEN: public build contains no private routes")
