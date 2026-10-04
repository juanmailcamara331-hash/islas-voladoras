#!/usr/bin/env python3
"""Garage Rick campaign portfolio planner v0.1.

Local planning only. It does not publish ads, spend money or call remote APIs.
"""

from __future__ import annotations
import argparse
import json
from pathlib import Path


def clamp(v, lo, hi):
    return max(lo, min(hi, v))


def build_portfolio(brief: dict, exploration_factor: float) -> dict:
    total = float(brief["budget"]["total"])
    enabled = [c for c in brief["channels"] if c.get("enabled", False)]
    if not enabled:
        raise ValueError("at least one enabled channel is required")

    weights = []
    for c in enabled:
        w = max(0.0, float(c.get("weight", 1.0)))
        weights.append(w)
    if sum(weights) <= 0:
        weights = [1.0] * len(enabled)

    raw = [total * (w / sum(weights)) for w in weights]
    alloc = {}
    for c, amount in zip(enabled, raw):
        lo = float(c.get("min_spend", 0) or 0)
        hi = c.get("max_spend")
        hi = float(hi) if hi is not None else total
        alloc[c["name"]] = round(clamp(amount, lo, hi), 2)

    current = sum(alloc.values())
    drift = round(total - current, 2)
    if enabled and abs(drift) >= 0.01:
        name = enabled[0]["name"]
        alloc[name] = round(max(0.0, alloc[name] + drift), 2)

    objective = brief["objective"]
    tone = brief.get("tone", "natural")
    queue = []
    for channel in alloc:
        queue.extend([
            {"channel": channel, "asset": "hook_set", "variants": 3},
            {"channel": channel, "asset": "static_image", "variants": 2},
            {"channel": channel, "asset": "short_video", "variants": 2},
            {"channel": channel, "asset": "copy", "variants": 3},
        ])

    return {
        "objective": objective,
        "tone": tone,
        "exploration_factor": exploration_factor,
        "budget_total": total,
        "allocation": alloc,
        "creative_queue": queue,
        "measurement_contract": {
            "required": ["spend", "impressions", "clicks", "conversions"],
            "optional": ["ctr", "cvr", "cpa", "roas", "retention"],
            "return_loop": "RESULT -> HUMAN_CORRECTION -> DELTA -> SMALL_ADJUSTMENT"
        },
        "human_gate_required": True
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("brief")
    p.add_argument("-o", "--output", default="campaign_portfolios.json")
    args = p.parse_args()

    brief = json.loads(Path(args.brief).read_text(encoding="utf-8"))
    portfolios = {
        "id": brief["id"],
        "status": "PLAN_ONLY",
        "portfolios": {
            "conservative": build_portfolio(brief, 0.10),
            "balanced": build_portfolio(brief, 0.25),
            "exploratory": build_portfolio(brief, 0.45)
        }
    }
    Path(args.output).write_text(json.dumps(portfolios, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"CAMPAIGN PLAN PASS -> {args.output}")


if __name__ == "__main__":
    main()
