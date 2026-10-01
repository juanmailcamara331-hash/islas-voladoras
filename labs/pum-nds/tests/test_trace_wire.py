#!/usr/bin/env python3
from pathlib import Path
import struct
ROOT=Path(__file__).resolve().parents[1]
src=(ROOT/"source/trace_wire.c").read_text()
hdr=(ROOT/"include/trace_wire.h").read_text()

assert "memcpy(out" not in src
assert "ISL_TRACE_WIRE_MAGIC" in hdr
assert "TRACE_BUFFER_CAPACITY" in src
assert "e->version!=ISL_TRACE_VERSION" in src
assert "n!=len" in src

MAGIC=0x49545731
SCHEMA=1
def enc(events,dropped=0):
    b=bytearray(struct.pack("<IHHHH",MAGIC,SCHEMA,len(events),dropped,0))
    for e in events:
        b+=struct.pack("<HHIhhI",*e)
    return bytes(b)
def dec(blob):
    magic,schema,count,dropped,_=struct.unpack_from("<IHHHH",blob,0)
    assert magic==MAGIC and schema==SCHEMA and count<=64
    off=12; out=[]
    for _ in range(count):
        e=struct.unpack_from("<HHIhhI",blob,off); off+=16
        assert e[0]==1
        out.append(e)
    assert off==len(blob)
    return out,dropped

events=[(1,1,10,0,0,0),(1,4,20,2,18,44),(1,7,140,1,2,9)]
blob=enc(events,3)
out,dropped=dec(blob)
assert out==events and dropped==3
bad=blob+b"X"
try:
    dec(bad)
    raise AssertionError("trailing bytes accepted")
except AssertionError as e:
    if str(e)=="trailing bytes accepted": raise
print("trace wire encode/decode roundtrip PASS")
