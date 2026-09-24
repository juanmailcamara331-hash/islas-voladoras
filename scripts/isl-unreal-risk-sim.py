#!/usr/bin/env python3
"""ISL Unreal readiness adversarial simulator.

Deterministic, dependency-free helper. It does not mutate project data.
It reads a manifest-like JSON file (optional) and emits a bounded risk deck
for a selected U0-U8 milestone.

Usage:
  python3 scripts/isl-unreal-risk-sim.py --milestone U1
  python3 scripts/isl-unreal-risk-sim.py --milestone U5 --manifest docs/ISL_UNREAL_IMPORT_MANIFEST_SCHEMA_CURRENT.json --seed 42
"""
from __future__ import annotations

import argparse
import json
import random
from pathlib import Path

DECK = {
    "DATA": [
        "duplicate_isl_id", "missing_required_field", "schema_version_mismatch",
        "invalid_gameplay_tag", "dangling_reference", "wrong_units_or_axis",
    ],
    "ASSET": [
        "source_moved_or_renamed", "stale_redirect_or_reference",
        "missing_texture_or_material_slot", "bad_collision_or_pivot",
        "runtime_without_master", "oversized_asset",
    ],
    "SAVE": [
        "previous_schema_save", "partial_or_corrupt_save", "removed_entity_in_save",
        "repeated_save_load", "interrupted_write", "rollback_save",
    ],
    "BUILD": [
        "clean_checkout", "empty_cache", "shipping_package",
        "missing_plugin", "platform_path_case_issue", "pc_android_divergence",
    ],
    "WORLD": [
        "enter_leave_reenter", "streaming_interruption", "state_change_while_unloaded",
        "checkpoint_during_transition", "unexpected_encounter_repeat",
    ],
    "UI_INPUT": [
        "input_device_switch", "focus_loss", "extreme_aspect_ratio",
        "pause_resume", "missing_input_context", "duplicated_input_context",
    ],
    "PERF": [
        "low_tier_device", "cold_start", "worst_case_fx_density",
        "memory_pressure", "rapid_level_transition",
    ],
    "EXTERNAL": [
        "provider_unavailable", "schema_or_api_change", "expired_url",
        "failed_upload", "duplicate_import_event", "public_export_drift",
    ],
    "HUMAN": [
        "goal_misunderstood", "tutorial_skipped", "unexpected_order",
        "repeated_weird_action", "bored_before_payoff", "fun_exploit_found",
    ],
}

MILESTONE_CATEGORIES = {
    "U0": ["DATA", "BUILD", "EXTERNAL"],
    "U1": ["DATA", "ASSET", "SAVE", "BUILD"],
    "U2": ["DATA", "SAVE", "WORLD", "UI_INPUT", "HUMAN"],
    "U3": ["SAVE", "WORLD", "PERF", "BUILD"],
    "U4": ["SAVE", "WORLD", "UI_INPUT", "PERF", "HUMAN"],
    "U5": ["DATA", "ASSET", "BUILD", "PERF", "EXTERNAL"],
    "U6": ["DATA", "ASSET", "SAVE", "BUILD", "WORLD", "UI_INPUT", "PERF"],
    "U7": ["UI_INPUT", "HUMAN", "PERF"],
    "U8": list(DECK.keys()),
}

def inspect_manifest(path: Path | None) -> list[str]:
    if not path:
        return []
    data = json.loads(path.read_text(encoding="utf-8"))
    warnings = []
    if isinstance(data, dict):
        version = data.get("schema_version")
        if not version:
            warnings.append("manifest_missing_schema_version")
        template = data.get("template", {})
        rules = data.get("rules", {})
        if rules and rules.get("identity_key") != "isl_id":
            warnings.append("identity_key_not_isl_id")
        if template:
            target = template.get("target", {})
            sync = target.get("sync", {}) if isinstance(target, dict) else {}
            if sync and sync.get("mode") != "CREATE_OR_UPDATE_BY_ISL_ID":
                warnings.append("sync_mode_not_idempotent_by_isl_id")
    return warnings

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--milestone", choices=sorted(MILESTONE_CATEGORIES), required=True)
    ap.add_argument("--manifest", type=Path)
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--per-category", type=int, default=2)
    args = ap.parse_args()

    rng = random.Random(args.seed)
    per = max(1, min(args.per_category, 4))
    scenarios = []
    for category in MILESTONE_CATEGORIES[args.milestone]:
        pool = list(DECK[category])
        rng.shuffle(pool)
        for failure in pool[:per]:
            scenarios.append({
                "category": category,
                "failure": failure,
                "expected": "fail_loudly_traceably_recoverably",
                "required_evidence": [
                    "reproduction",
                    "detection_or_validation",
                    "rollback_or_recovery",
                    "regression_guard_if_practical",
                ],
            })

    out = {
        "project": "ISLAS_VOLADORAS_ISL",
        "mode": "SIMULATION_ONLY",
        "milestone": args.milestone,
        "seed": args.seed,
        "manifest_warnings": inspect_manifest(args.manifest),
        "scenarios": scenarios,
        "human_gate": args.milestone in {"U2", "U4", "U7", "U8"},
        "rule": "No scenario result promotes CANON or changes production state.",
    }
    print(json.dumps(out, indent=2, ensure_ascii=False))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
