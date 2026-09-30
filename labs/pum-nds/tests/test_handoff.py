#!/usr/bin/env python3

NONE,R36,TABLET=0,1,2

class H:
    def __init__(self):
        self.owner=NONE
        self.lease=0
        self.gen=0
        self.flags=0
        self.checksum=0

def claim(h,who,now,ttl):
    if h.owner not in (NONE,who):
        if h.lease and now <= h.lease:
            return "BUSY"
        h.flags |= 1
    h.owner=who
    h.lease=now+ttl
    h.gen+=1
    return "STALE" if h.flags&1 else "OK"

def release(h,who,checksum):
    if h.owner!=who: return "CONFLICT"
    h.checksum=checksum
    h.owner=NONE
    h.lease=0
    return "OK"

def test_clean_roundtrip():
    h=H()
    assert claim(h,R36,100,30)=="OK"
    assert release(h,R36,111)=="OK"
    assert claim(h,TABLET,140,30)=="OK"
    assert release(h,TABLET,222)=="OK"
    assert claim(h,R36,180,30)=="OK"
    assert h.checksum==222

def test_simultaneous_writer_blocked():
    h=H()
    assert claim(h,R36,100,30)=="OK"
    assert claim(h,TABLET,110,30)=="BUSY"

def test_stale_lease_preserved():
    h=H()
    assert claim(h,R36,100,10)=="OK"
    assert claim(h,TABLET,120,10)=="STALE"
    assert h.flags&1

if __name__=="__main__":
    tests=[test_clean_roundtrip,test_simultaneous_writer_blocked,test_stale_lease_preserved]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} handoff tests passed")
