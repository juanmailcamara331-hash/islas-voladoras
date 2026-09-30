#!/usr/bin/env python3
from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
fail=[]

# Independent-style contract checks: requirements only, no gameplay assumptions.
required=[
 "include/tempo.h",
 "include/object_biography.h",
 "include/echo.h",
 "schemas/semantic_event.schema.json",
 "TECHNICAL_CLOSURE_GATE_V0_1.md"
]
for p in required:
    if not (ROOT/p).exists():
        fail.append(f"missing:{p}")

schema=json.loads((ROOT/"schemas/semantic_event.schema.json").read_text())
for field in ("tempo","biography","echo"):
    if field not in schema.get("properties",{}):
        fail.append(f"schema-missing:{field}")

# Spoiler/platform leakage guard for neutral schemas/docs.
for p in [ROOT/"schemas/semantic_event.schema.json", ROOT/"ROUNDTRIP_REPLAY_CONTRACT.md"]:
    txt=p.read_text(errors="ignore")
    for token in ["/roms/nds","KEY_A","DRASTIC","boss_name","ending_id"]:
        if token.lower() in txt.lower():
            fail.append(f"neutral-leak:{p.name}:{token}")

if fail:
    print("\n".join(fail))
    sys.exit(1)
print("IVV contract checks passed")
