#!/usr/bin/env python3
import copy, hashlib, json, random

def checksum(s):
    return hashlib.sha256(json.dumps(s,sort_keys=True,separators=(",",":")).encode()).hexdigest()

def make_slot(payload,generation,committed=False):
    return {
      "magic":"JSL1","schema":1,"generation":generation,
      "payload":copy.deepcopy(payload),"sum":checksum(payload),
      "valid":True,"committed":committed
    }

def valid(slot):
    return bool(slot and slot.get("valid") and slot.get("magic")=="JSL1" and
                slot.get("schema")==1 and slot.get("sum")==checksum(slot["payload"]))

def recover(j):
    first=j["a"] if j["committed"]=="a" else j["b"]
    second=j["b"] if j["committed"]=="a" else j["a"]
    if valid(first): return first["payload"]
    if valid(second): return second["payload"]
    return None

def test_power_loss_before_commit():
    old={"tick":100,"value":"old"}
    new={"tick":200,"value":"new"}
    j={"a":make_slot(old,1,True),"b":make_slot(new,2,False),"committed":"a"}
    assert recover(j)==old

def test_power_loss_after_commit_marker():
    old={"tick":100}
    new={"tick":200}
    j={"a":make_slot(old,1,False),"b":make_slot(new,2,True),"committed":"b"}
    assert recover(j)==new

def test_committed_corrupt_falls_back():
    old={"tick":100}
    new={"tick":200}
    j={"a":make_slot(old,1,False),"b":make_slot(new,2,True),"committed":"b"}
    j["b"]["payload"]["tick"]=999
    assert recover(j)==old

def test_both_corrupt_refuses():
    j={"a":make_slot({"x":1},1,False),"b":make_slot({"x":2},2,True),"committed":"b"}
    j["a"]["payload"]["x"]=8
    j["b"]["payload"]["x"]=9
    assert recover(j) is None

def test_random_single_slot_damage_never_returns_corrupt():
    rng=random.Random(42)
    for _ in range(1000):
        a={"tick":rng.randrange(10000)}
        b={"tick":rng.randrange(10000)}
        j={"a":make_slot(a,1,False),"b":make_slot(b,2,True),"committed":"b"}
        target=rng.choice(["a","b"])
        j[target]["payload"]["tick"]+=1
        got=recover(j)
        assert got in ([a,b] if got is not None else [])

if __name__=="__main__":
    tests=[
      test_power_loss_before_commit,
      test_power_loss_after_commit_marker,
      test_committed_corrupt_falls_back,
      test_both_corrupt_refuses,
      test_random_single_slot_damage_never_returns_corrupt
    ]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} save journal tests passed")
