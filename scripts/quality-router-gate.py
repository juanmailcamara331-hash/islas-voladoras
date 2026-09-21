#!/usr/bin/env python3
from pathlib import Path
import json,sys
ROOT=Path(__file__).resolve().parents[1]
md=ROOT/"docs/ISL_RECURSIVE_DIALECTIC_QUALITY_ROUTER_CURRENT.md"
js=ROOT/"docs/ISL_QUALITY_ROUTER_MATRIX_CURRENT.json"
errors=[]
if not md.exists(): errors.append("missing recursive quality router")
if not js.exists(): errors.append("missing router matrix")
if js.exists():
    d=json.loads(js.read_text(encoding="utf-8"))
    if not d.get("mandatory_preflight"): errors.append("mandatory_preflight must be true")
    required={"playable","narrative_scene","timeline_or_lore","creature_or_character","ui_surface","music_or_audio","visual_asset_or_3d","presentation_or_print"}
    missing=required-set(d.get("entity_profiles",{}))
    if missing: errors.append("missing entity profiles: "+",".join(sorted(missing)))
    for name,p in d.get("entity_profiles",{}).items():
        weights=p.get("weights",{})
        for critical in ("identity","regressions","canon_authority"):
            if weights.get(critical,0)<2: errors.append(f"{name}: weak {critical} weight")
if errors:
    print("ISL QUALITY ROUTER GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)
print("ISL QUALITY ROUTER GATE GREEN")
