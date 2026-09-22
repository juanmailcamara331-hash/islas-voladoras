#!/usr/bin/env python3
import json, pathlib, sys

ROOT=pathlib.Path(__file__).resolve().parents[1]
manifest=json.loads((ROOT/"docs/ISL_SURFACE_PROPAGATION_MANIFEST_CURRENT.json").read_text(encoding="utf-8"))
runtime=json.loads((ROOT/"portal/data/isl-docs-library-current.json").read_text(encoding="utf-8"))
gallery=(ROOT/"portal/galeria.html").read_text(encoding="utf-8",errors="ignore")
cc=(ROOT/"portal/isl-current-state.js").read_text(encoding="utf-8",errors="ignore")

m={d["id"]:d for d in manifest.get("entries",[])}
r={d["id"]:d for d in runtime.get("docs",[])}
errors=[]

for did,d in m.items():
    if did not in r:
        errors.append(f"{did}: missing from runtime docs registry")
    if "gallery" in d.get("surfaces",[]) and 'data-tab="docs"' not in gallery:
        errors.append(f"{did}: gallery surface requested but DOCS tab missing")
    if "command_center" in d.get("surfaces",[]) and "islSystemsDocsBlock" not in cc:
        errors.append(f"{did}: command_center surface requested but live block missing")

extra=sorted(set(r)-set(m))
if extra:
    errors.append("runtime docs not declared in manifest: "+", ".join(extra))

if errors:
    print("SURFACE PROPAGATION GATE FAILED")
    for x in errors: print(" - "+x)
    sys.exit(1)
print(f"SURFACE PROPAGATION PASS · {len(m)} registered docs")
