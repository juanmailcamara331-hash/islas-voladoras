#!/usr/bin/env python3
import hashlib, json

def digest(obj):
    b=json.dumps(obj,sort_keys=True,separators=(",",":")).encode()
    return hashlib.sha256(b).hexdigest()

def test_roundtrip():
    run={"run_id":"RUN_TEST","generation":1,"events":[]}
    run["events"].append({"event_id":"E1","run_id":"RUN_TEST","device":"R36","kind":"ACTION","tick":10,"payload_version":1,"game":{"semantic":"PRIMARY"}})
    a=digest(run)

    run["generation"]+=1
    run["events"].append({"event_id":"E2","run_id":"RUN_TEST","device":"TABLET","kind":"GESTURE","tick":20,"payload_version":1,"gesture":{"samples":12,"distance":44,"direction_changes":2,"duration_frames":18}})
    b=digest(run)

    assert a != b
    assert run["generation"] == 2
    assert [e["event_id"] for e in run["events"]] == ["E1","E2"]

    replay=[]
    for e in run["events"]:
        replay.append((e["tick"],e["kind"],e["device"]))
    assert replay == [(10,"ACTION","R36"),(20,"GESTURE","TABLET")]

def test_no_platform_leak():
    packet={"event_id":"E","run_id":"R","device":"TABLET","kind":"VOICE","tick":1,"payload_version":1,"voice":{"energy_band":3,"duration_ms":500,"rhythm_class":1,"pitch_change_band":2}}
    raw=json.dumps(packet)
    forbidden=["KEY_A","/roms/nds","DRASTIC","0x02FF"]
    assert not any(x in raw for x in forbidden)

if __name__=="__main__":
    tests=[test_roundtrip,test_no_platform_leak]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} replay tests passed")
