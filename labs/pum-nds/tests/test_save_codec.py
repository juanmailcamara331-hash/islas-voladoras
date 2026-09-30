#!/usr/bin/env python3
import struct, hashlib

MAGIC=0x49534C31
SCHEMA=2

def fnv1a(buf,checksum_offset=8):
    h=2166136261
    for i,b in enumerate(buf):
        if checksum_offset <= i < checksum_offset+4:
            continue
        h ^= b
        h = (h * 16777619) & 0xffffffff
    return h

def build_blob(payload=b"sealed-game-snapshot"):
    # header mirrors magic/schema/flags/checksum and a neutral payload
    blob=bytearray(struct.pack("<IHHI",MAGIC,SCHEMA,0,0)+payload)
    checksum=fnv1a(blob)
    struct.pack_into("<I",blob,8,checksum)
    return bytes(blob)

def validate(blob):
    if len(blob)<12:return False
    magic,schema=struct.unpack_from("<IH",blob,0)
    if magic!=MAGIC or schema!=SCHEMA:return False
    stored=struct.unpack_from("<I",blob,8)[0]
    return stored==fnv1a(blob)

def test_roundtrip():
    b=build_blob()
    assert validate(b)

def test_corruption_detected():
    b=bytearray(build_blob())
    b[-1]^=1
    assert not validate(b)

def test_truncation_detected():
    b=build_blob()[:10]
    assert not validate(b)

def test_schema_mismatch_detected():
    b=bytearray(build_blob())
    struct.pack_into("<H",b,4,1)
    assert not validate(b)

if __name__=="__main__":
    tests=[test_roundtrip,test_corruption_detected,test_truncation_detected,test_schema_mismatch_detected]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} save codec model tests passed")
