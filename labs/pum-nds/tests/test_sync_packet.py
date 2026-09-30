#!/usr/bin/env python3
import struct

MAGIC=0x50554D31
SCHEMA=1
R36=1
TABLET=2

def ident(p):
    return (p["generation"],p["checksum"],p["from"],p["to"])

def valid(p):
    return (p["magic"]==MAGIC and p["schema"]==SCHEMA and
            p["from"] in (R36,TABLET) and p["to"] in (R36,TABLET) and
            p["from"]!=p["to"] and p["checksum"]==p["save_checksum"])

def main():
    a={"magic":MAGIC,"schema":SCHEMA,"generation":7,"checksum":1234,
       "save_checksum":1234,"from":R36,"to":TABLET}
    b=dict(a)
    assert valid(a)
    assert ident(a)==ident(b)
    b["generation"]=8
    assert ident(a)!=ident(b)
    bad=dict(a); bad["save_checksum"]=999
    assert not valid(bad)
    bad=dict(a); bad["to"]=R36
    assert not valid(bad)
    print("sync packet model PASS")

if __name__=="__main__": main()
