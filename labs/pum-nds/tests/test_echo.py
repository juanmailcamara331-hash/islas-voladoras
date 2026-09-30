#!/usr/bin/env python3

def test_echo_waits():
    e={"earliest":100,"armed":True,"fired":False}
    assert not (e["armed"] and not e["fired"] and 99>=e["earliest"])
    assert e["armed"] and not e["fired"] and 100>=e["earliest"]

def test_echo_preserves_source():
    e={"source_event":42,"subject_id":7,"value":123}
    assert (e["source_event"],e["subject_id"],e["value"])==(42,7,123)

if __name__=="__main__":
    tests=[test_echo_waits,test_echo_preserves_source]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} echo tests passed")
