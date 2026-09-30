#!/usr/bin/env python3
import struct

MAGIC=0x53594E31
SCHEMA=1
HEADER=24

def fnv(b):
    h=2166136261
    for x in b:
        h^=x
        h=(h*16777619)&0xffffffff
    return h

def enc(gen,checksum,fr,to,payload):
    h=bytearray(HEADER)
    struct.pack_into("<IHHII",h,0,MAGIC,SCHEMA,0,gen,checksum)
    h[16]=fr;h[17]=to
    struct.pack_into("<H",h,18,len(payload))
    struct.pack_into("<I",h,20,fnv(payload))
    return bytes(h)+payload

def valid(b):
    if len(b)<HEADER:return False
    magic,schema=struct.unpack_from("<IH",b,0)
    n=struct.unpack_from("<H",b,18)[0]
    sig=struct.unpack_from("<I",b,20)[0]
    return magic==MAGIC and schema==SCHEMA and len(b)==HEADER+n and sig==fnv(b[HEADER:])

def main():
    payload=b"opaque-versioned-save"
    b=enc(9,123,1,2,payload)
    assert valid(b)
    assert b[:4]==b"1NYS"  # explicit little-endian marker
    bad=bytearray(b);bad[-1]^=1
    assert not valid(bad)
    assert not valid(b[:-1])
    print("sync wire model PASS")

if __name__=="__main__": main()
