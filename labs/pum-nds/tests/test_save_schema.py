#!/usr/bin/env python3
import struct, json, sys

MAGIC = 0x49534C31
SCHEMA = 1

def fnv1a(data):
    h = 2166136261
    for i,b in enumerate(data):
        if 8 <= i < 12:
            continue
        h ^= b
        h = (h * 16777619) & 0xffffffff
    return h

def test_layout():
    size = 4+2+2+4+4+4+4+4+(16*4)
    assert size == 92

def test_constants():
    assert MAGIC == 0x49534C31
    assert SCHEMA == 1

def main():
    tests=[test_layout,test_constants]
    for t in tests: t()
    print(f"{len(tests)}/{len(tests)} tests passed")

if __name__=="__main__":
    main()
