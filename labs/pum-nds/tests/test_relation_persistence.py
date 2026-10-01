#!/usr/bin/env python3
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
saveh=(ROOT/"include/save_state.h").read_text()
main=(ROOT/"source/main.cpp").read_text()
wire=(ROOT/"source/sync_wire.c").read_text()

assert "relation_entity_id" in saveh
assert "relation_redefinitions" in saveh
assert "restore_biography_from_save" in main
assert "biography_record_redefinition" in main
assert "g_save.relation_entity_id" in main
assert "g_save.relation_redefinitions" in main
assert "before != (GameMode)g_game.mode || action == GAME_ACT_CONTEXT" in main
assert "checkpoint_save();" in main
assert "w16(w,s->relation_entity_id)" in wire
assert "r16(r,&s->relation_entity_id)" in wire
print("relation persistence + autosave boundary contract PASS")
