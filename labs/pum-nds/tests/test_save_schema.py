#!/usr/bin/env python3
from pathlib import Path
import re

ROOT=Path(__file__).resolve().parents[1]
save_h=(ROOT/"include/save_state.h").read_text()
game_h=(ROOT/"include/sealed_game.h").read_text()

def macro(name,text):
    m=re.search(rf"#define\s+{name}\s+([^\s]+)",text)
    assert m, f"missing {name}"
    return m.group(1)

def test_constants():
    assert macro("ISL_SAVE_SCHEMA",save_h)=="3u"
    assert macro("ISL_SAVE_MAGIC",save_h)=="0x49534C31u"

def test_game_snapshot_required():
    required=[
      "seed","turns","steps","hp","hp_max",
      "rings_mask","pens_mask","lighters_mask",
      "milestones","encounters","victories","recoveries","mode"
    ]
    for field in required:
        assert re.search(rf"\b{field}\b",game_h), f"missing field: {field}"

def test_old_grind_removed():
    for forbidden in ["uint16_t level;","uint16_t xp;"]:
        assert forbidden not in game_h, f"obsolete grind field returned: {forbidden}"

if __name__=="__main__":
    tests=[test_constants,test_game_snapshot_required,test_old_grind_removed]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} save/schema tests passed")
