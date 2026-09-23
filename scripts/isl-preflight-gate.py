#!/usr/bin/env python3
from pathlib import Path
import argparse, json, sys

ROOT=Path(__file__).resolve().parents[1]

STATUS_PASS="PASS"
STATUS_NEED_RECOVERY="NEED_RECOVERY"
STATUS_AUTHORITY_DRIFT="AUTHORITY_DRIFT"
STATUS_HUMAN_GATE="HUMAN_GATE"
STATUS_BLOCKED="BLOCKED"

REQUIRED_FILES=[
    ROOT/"docs/ISL_CURRENT_WORK_POINTER.md",
    ROOT/"docs/ISL_SAFE_HARBOR_AND_RED_BUTTON_CURRENT.md",
    ROOT/"docs/ISL_META_LAYER_ORCHESTRATOR_CURRENT.md",
    ROOT/"docs/ISL_RECURSIVE_DIALECTIC_QUALITY_ROUTER_CURRENT.md",
    ROOT/"docs/ISL_QUALITY_ROUTER_MATRIX_CURRENT.json",
]

SUBSTANTIVE_OPS={"create","edit","mutate","test","decide","promote","publish","physical","system"}
HUMAN_GATE_OPS={"promote","publish","physical"}

def fail(status, problems):
    print(f"ISL PREFLIGHT {status}")
    for p in problems:
        print(" -",p)
    sys.exit(1)

def main():
    ap=argparse.ArgumentParser(description="Executable ISL preflight. Reuses existing authority/router contracts; creates no new authority.")
    ap.add_argument("--authority-only",action="store_true",help="Check repository-side authority/preflight invariants only.")
    ap.add_argument("--subject")
    ap.add_argument("--operation",choices=sorted(SUBSTANTIVE_OPS|{"explore","navigate"}))
    ap.add_argument("--source-of-truth")
    ap.add_argument("--layers",nargs="*",default=[])
    ap.add_argument("--human-approved",action="store_true")
    args=ap.parse_args()

    missing=[str(p.relative_to(ROOT)) for p in REQUIRED_FILES if not p.exists()]
    if missing:
        fail(STATUS_NEED_RECOVERY,["missing required file: "+p for p in missing])

    pointer=(ROOT/"docs/ISL_CURRENT_WORK_POINTER.md").read_text(encoding="utf-8")
    harbor=(ROOT/"docs/ISL_SAFE_HARBOR_AND_RED_BUTTON_CURRENT.md").read_text(encoding="utf-8")
    orch=(ROOT/"docs/ISL_META_LAYER_ORCHESTRATOR_CURRENT.md").read_text(encoding="utf-8")
    matrix=json.loads((ROOT/"docs/ISL_QUALITY_ROUTER_MATRIX_CURRENT.json").read_text(encoding="utf-8"))

    drift=[]
    if "CONTRADICTION LAB v0.92" not in pointer:
        drift.append("CURRENT_WORK_POINTER does not expose active CONTRADICTION LAB v0.92 note")
    if "Velaria V2 P0" not in pointer or "HUMAN_DEVICE_GREEN=PENDING" not in pointer.replace(" ",""):
        drift.append("PRIMARY / HUMAN_DEVICE_GREEN invariant missing from CURRENT_WORK_POINTER")
    if "BOTÓN ROJO · VOLVER A CASA" not in harbor:
        drift.append("SAFE HARBOR red-button command missing")
    if "424fe4a51e8bfdb297917d124cace8604fcd1288" not in harbor:
        drift.append("SAFE HARBOR friendly baseline missing")
    if "ALWAYS-ON PROMPT PREFLIGHT" not in orch:
        drift.append("Orchestrator silent preflight contract missing")
    if not matrix.get("mandatory_preflight"):
        drift.append("Quality router matrix mandatory_preflight is not true")
    if drift:
        fail(STATUS_AUTHORITY_DRIFT,drift)

    if args.authority_only:
        print("ISL PREFLIGHT PASS")
        print(" - repository-side authority invariants present")
        print(" - Drive↔GitHub authority alignment remains the scheduled authority audit's responsibility")
        return

    problems=[]
    op=args.operation
    if not args.subject:
        problems.append("subject/entity required")
    if not op:
        problems.append("operation required")
    if op in SUBSTANTIVE_OPS and not args.source_of_truth:
        problems.append("SOURCE_OF_TRUTH required for substantive work")
    if len(args.layers)>4:
        problems.append("activate at most 4 relevant meta-layers")
    if op in SUBSTANTIVE_OPS and not args.layers:
        problems.append("select 1-4 relevant meta-layers for substantive work")
    if problems:
        fail(STATUS_NEED_RECOVERY,problems)

    if op in HUMAN_GATE_OPS and not args.human_approved:
        fail(STATUS_HUMAN_GATE,[f"{op} requires explicit human approval"])

    print("ISL PREFLIGHT PASS")
    print(f" - subject: {args.subject}")
    print(f" - operation: {op}")
    if args.source_of_truth:
        print(f" - source_of_truth: {args.source_of_truth}")
    if args.layers:
        print(" - layers:",", ".join(args.layers))
    print(" - smallest useful action may proceed; no CANON promotion is implied")

if __name__=="__main__":
    main()
