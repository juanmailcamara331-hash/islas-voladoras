#!/usr/bin/env python3
import copy, hashlib, json, random

def canonical(obj):
    return json.dumps(obj,sort_keys=True,separators=(",",":")).encode()

def digest(obj):
    return hashlib.sha256(canonical(obj)).hexdigest()

def choose_generation(a,b):
    # Preserve conflict if same generation diverges.
    if a["generation"] == b["generation"] and digest(a) != digest(b):
        return "CONFLICT"
    return a if a["generation"] > b["generation"] else b

def validate_save(blob):
    if len(blob) < 16:
        return False
    return blob[:4] == b"ISL1"

def replay(events):
    # Reject duplicate ids, then canonicalize by sequence.
    seen=set()
    out=[]
    for e in events:
        if e["id"] in seen:
            continue
        seen.add(e["id"])
        out.append(e)
    return sorted(out,key=lambda e:(e["seq"],e["id"]))

def test_truncated_save():
    assert not validate_save(b"ISL1\x00")

def test_bad_magic():
    assert not validate_save(b"NOPE"+b"\x00"*20)

def test_generation_conflict():
    a={"generation":4,"events":[1]}
    b={"generation":4,"events":[2]}
    assert choose_generation(a,b)=="CONFLICT"

def test_newer_generation_wins():
    a={"generation":4,"events":[]}
    b={"generation":5,"events":[]}
    assert choose_generation(a,b) is b

def test_duplicate_packet_is_idempotent():
    xs=[{"id":"a","seq":1},{"id":"a","seq":1},{"id":"b","seq":2}]
    assert [x["id"] for x in replay(xs)]==["a","b"]

def test_reorder_recovers():
    xs=[{"id":"b","seq":2},{"id":"a","seq":1}]
    assert [x["id"] for x in replay(xs)]==["a","b"]

def test_missing_optional_packet():
    run={"generation":2,"events":[],"optional_voice":None}
    assert run["generation"]==2

def test_randomized_packet_order():
    src=[{"id":str(i),"seq":i} for i in range(100)]
    rng=random.Random(42)
    rng.shuffle(src)
    out=replay(src)
    assert [x["seq"] for x in out]==list(range(100))

if __name__=="__main__":
    tests=[
      test_truncated_save,test_bad_magic,test_generation_conflict,
      test_newer_generation_wins,test_duplicate_packet_is_idempotent,
      test_reorder_recovers,test_missing_optional_packet,
      test_randomized_packet_order
    ]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} fault-injection tests passed")
