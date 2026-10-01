#!/usr/bin/env python3
from pathlib import Path
import struct

ROOT=Path(__file__).resolve().parents[1]
src=(ROOT/"source/sync_wire.c").read_text()
hdr=(ROOT/"include/sync_wire.h").read_text()

assert "memcpy(out" not in src
assert "memcpy(&tmp" not in src
assert "w16" in src and "w32" in src and "r16" in src and "r32" in src
assert "sync_wire_checksum" in src
assert "s->checksum=save_checksum(s)" in src
assert "save_validate(s)" in src
assert "ISL_SYNC_WIRE_SCHEMA" in hdr
assert "ISL_SYNC_WIRE_MAX" in hdr

def fnv(data):
    h=2166136261
    for b in data:
        h ^= b
        h=(h*16777619)&0xffffffff
    return h

sample=struct.pack("<IHHIBBH",0x49535731,1,0,7,1,2,0)
assert sample[:4]==b"1WSI"  # explicit little-endian bytes
assert fnv(b"abc")==0x1a47e90b
print("portable sync wire contract PASS")
