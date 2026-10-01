#!/usr/bin/env python3
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
schema=json.loads((ROOT/"schemas/neutral_relation.schema.json").read_text())
src=(ROOT/"source/relation_export.c").read_text()
hdr=(ROOT/"include/relation_export.h").read_text()
saveh=(ROOT/"include/save_state.h").read_text()

def export_fixture(entity_id,redefs,tick):
    assert entity_id>0 and redefs>0
    rid=((entity_id&0xffff)<<16)|(redefs&0xffff)
    return {
      "relation_id":f"REL_{rid:08X}",
      "entity_a":f"ENTITY_{entity_id:04X}",
      "entity_b":"SYSTEM_WORLD",
      "context":"RUNTIME_RELATION",
      "old_functions":[],
      "new_relation":"REDEFINED",
      "gameplay_effect":"PERSISTENT_RELATION_STATE",
      "state_requirements":["SAVE_SCHEMA_3"],
      "input_requirements":["SEMANTIC_CONTEXT"],
      "provenance":{"origin":"PUM_NDS_RUN","tick":tick,"schema_version":1},
      "evidence":{"redefinitions":redefs},
      "human_status":"CANDIDATE"
    }

def validate_minimal(record):
    for key in schema["required"]:
        assert key in record,key
    enum=schema["properties"]["human_status"]["enum"]
    assert record["human_status"] in enum
    assert isinstance(record["old_functions"],list)
    raw=json.dumps(record,sort_keys=True)
    forbidden=["KEY_A","KEY_B","KEY_X","KEY_Y","/roms/nds","DRASTIC","fat:/"]
    assert not any(x.lower() in raw.lower() for x in forbidden)
    return raw

def main():
    assert "relation_entity_id" in saveh and "relation_redefinitions" in saveh
    assert "relation_export_from_save" in hdr
    assert "save_validate(save)" in src
    assert "relation_numeric_id" in src
    raw=validate_minimal(export_fixture(1,3,420))
    decoded=json.loads(raw)
    assert decoded["relation_id"]=="REL_00010003"
    assert decoded["evidence"]["redefinitions"]==3
    print("neutral relation Unreal handoff PASS")

if __name__=="__main__": main()
