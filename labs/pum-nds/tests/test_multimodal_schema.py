#!/usr/bin/env python3
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
schema=json.loads((ROOT/"schemas/semantic_event.schema.json").read_text())

def test_multimodal_present():
    assert "multimodal" in schema["properties"]

def test_consent_tiers():
    tiers=schema["properties"]["multimodal"]["properties"]["consent_tier"]["enum"]
    assert tiers==["C0_LOCAL","C1_PRIVATE","C2_AGGREGATED","C3_CAMPAIGN","C4_PUBLIC"]

def test_no_diagnosis_fields():
    txt=json.dumps(schema).lower()
    for forbidden in ["diagnosis","mental_illness","intelligence_score","hidden_intent"]:
        assert forbidden not in txt

if __name__=="__main__":
    tests=[test_multimodal_present,test_consent_tiers,test_no_diagnosis_fields]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} multimodal schema tests passed")
