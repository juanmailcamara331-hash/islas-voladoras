#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
main=(ROOT/"source/main.cpp").read_text()

assert "static SemanticAction map_semantic" in main
assert "static GameAction game_action_from_semantic" in main
assert "SemanticAction semantic = map_semantic(down);" in main
assert "GameAction action = game_action_from_semantic(semantic);" in main
assert "sealed_game_step(&g_game, action);" in main
assert "ACT_PUM" in main and "KEY_SELECT" in main
assert "ACT_MENU" in main and "KEY_START" in main
assert "ACT_CONTEXT_L1" in main and "KEY_X" in main
assert "ACT_CONTEXT_R1" in main and "KEY_Y" in main
assert "trace_kind_from_semantic" in main
assert "if (kind != TRACE_NONE) push_trace" in main
assert "static GameAction map_action" not in main
print("semantic runtime routing PASS")
