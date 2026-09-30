#!/usr/bin/env python3
import struct, zlib

MAGIC=0x49534C31
SCHEMA=1
SIZE=92

def fnv1a(buf):
    h=2166136261
    for i,b in enumerate(buf):
        if 8 <= i < 12:
            continue
        h ^= b
        h = (h * 16777619) & 0xffffffff
    return h

def build_blob(events=3,relations=1,seed=0x51A7E123):
    reserved=[0]*16
    blob=bytearray(struct.pack("<IHHIIIII16I",
        MAGIC,SCHEMA,0,0,seed,1234,events,relations,*reserved))
    checksum=fnv1a(blob)
    struct.pack_into("<I",blob,8,checksum)
    return bytes(blob)

def validate(blob):
    if len(blob)!=SIZE: return False
    magic,schema=struct.unpack_from("<IH",blob,0)
    if magic!=MAGIC or schema!=SCHEMA: return False
    stored=struct.unpack_from("<I",blob,8)[0]
    return stored==fnv1a(blob)

def test_roundtrip():
    b=build_blob()
    assert len(b)==SIZE
    assert validate(b)

def test_corruption_detected():
    b=bytearray(build_blob())
    b[20] ^= 0x01
    assert not validate(b)

def test_truncation_detected():
    b=build_blob()[:-1]
    assert not validate(b)

if __name__=="__main__":
    tests=[test_roundtrip,test_corruption_detected,test_truncation_detected]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} save codec tests passed")
