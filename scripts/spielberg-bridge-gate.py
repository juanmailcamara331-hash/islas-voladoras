#!/usr/bin/env python3
from pathlib import Path
import json, sys

errors=[]
root=Path("portal")
feed_path=root/"data/isl-spielberg-lab-feed.json"
page=root/"spielberg-lab.html"
protocol=Path("docs/ISL_SPIELBERG_EXTERNAL_CREATIVE_RESEARCH_BRIDGE_v0.1.md")
packet_schema=root/"data/spielberg-transfer-packet.schema.json"
candidate_schema=root/"data/isl-translation-candidate.schema.json"

for p in [feed_path,page,protocol,packet_schema,candidate_schema]:
    if not p.exists(): errors.append(f"missing bridge artifact: {p}")

if feed_path.exists():
    d=json.loads(feed_path.read_text(encoding="utf-8"))
    if d.get("source")!="SPIELBERG_CREATIVE_GAMEVERSE": errors.append("wrong bridge source")
    if d.get("boundary")!="ABSTRACT_SYSTEMIC_DISCOVERIES_ONLY": errors.append("boundary contract missing")
    gates=d.get("gates",{})
    for k in ["automatic_canon_promotion","automatic_production_promotion","automatic_ready_unreal_promotion"]:
        if gates.get(k) is not False: errors.append(f"{k} must stay false")
    if gates.get("human_decision_required") is not True: errors.append("human decision gate must stay true")
    if gates.get("r2_human_unchanged") is not True: errors.append("R2 HUMAN must remain unchanged")
    for item in d.get("items",[]):
        if item.get("status") in {"CANON","PRODUCTION","READY_UNREAL","APPROVED"}:
            errors.append("forbidden promoted status inside Spielberg Lab Feed")
        if item.get("contains_spielberg_specific_expression") is True:
            errors.append("Spielberg-specific expression leaked into ISL feed")

if page.exists():
    s=page.read_text(encoding="utf-8")
    for token in ["SPIELBERG CREATIVE GAMEVERSE","LAB_ONLY","NOT_CANON","decisión humana","isl-spielberg-lab-feed.json"]:
        if token not in s: errors.append(f"bridge page missing: {token}")

if protocol.exists():
    s=protocol.read_text(encoding="utf-8")
    for token in ["Never import directly","HUMAN_DECISION","EXTERNAL_RESEARCH_CANDIDATE","Danzante-Aguja"]:
        if token not in s: errors.append(f"protocol missing guard: {token}")

if errors:
    print("ISL SPIELBERG BRIDGE GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)
print("ISL SPIELBERG BRIDGE GATE GREEN · boundary and human promotion guards intact")
