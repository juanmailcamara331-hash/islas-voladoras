#!/usr/bin/env python3
from pathlib import Path
import hashlib, os, struct, tempfile

WIRE_MAGIC=0x49535731
WIRE_SCHEMA=1
R36,TABLET=1,2

def fnv32(data):
    h=2166136261
    for b in data:
        h^=b
        h=(h*16777619)&0xffffffff
    return h

def wire_packet(generation,src,dst,payload):
    head=struct.pack("<IHHIBBH",WIRE_MAGIC,WIRE_SCHEMA,0,generation,src,dst,0)
    return head+struct.pack("<I",fnv32(payload))+payload

def parse_wire(blob):
    if len(blob)<20: return None
    magic,schema,flags,generation,src,dst,reserved=struct.unpack("<IHHIBBH",blob[:16])
    checksum=struct.unpack("<I",blob[16:20])[0]
    payload=blob[20:]
    if magic!=WIRE_MAGIC or schema!=WIRE_SCHEMA: return None
    if src not in (R36,TABLET) or dst not in (R36,TABLET) or src==dst: return None
    if fnv32(payload)!=checksum: return None
    return {"generation":generation,"from":src,"to":dst,"checksum":checksum,"payload":payload}

class Mailbox:
    def __init__(self,root,name):
        self.root=Path(root)/name
        self.inbox=self.root/"inbox"
        self.archive=self.root/"archive"
        self.conflicts=self.root/"conflicts"
        for p in (self.inbox,self.archive,self.conflicts): p.mkdir(parents=True,exist_ok=True)

def atomic_put(folder,name,data,cut=False):
    tmp=folder/(name+".tmp"); final=folder/name
    tmp.write_bytes(data[:len(data)//2] if cut else data)
    if cut: return False
    os.replace(tmp,final); return True

def deliver(src,dst,name,duplicate=False,cut=False):
    data=(src.inbox/name).read_bytes()
    ok=atomic_put(dst.inbox,name,data,cut=cut)
    if ok and duplicate: atomic_put(dst.inbox,name+".dup",data)
    return ok

def consume(box,seen,current):
    accepted=[]
    for p in sorted(box.inbox.iterdir()):
        if p.suffix==".tmp": continue
        data=p.read_bytes(); parsed=parse_wire(data)
        if not parsed:
            os.replace(p,box.conflicts/p.name); continue
        ident=(parsed["generation"],parsed["checksum"],parsed["from"],parsed["to"])
        if ident in seen:
            p.unlink(); continue
        if parsed["to"]!=current["owner"]:
            os.replace(p,box.conflicts/p.name); continue
        if parsed["generation"]<current["generation"]:
            p.unlink(); continue
        if parsed["generation"]==current["generation"] and parsed["checksum"]!=current["checksum"]:
            os.replace(p,box.conflicts/p.name); continue
        if parsed["generation"]>current["generation"]+1:
            os.replace(p,box.conflicts/p.name); continue
        seen.add(ident); current["generation"]=parsed["generation"]; current["checksum"]=parsed["checksum"]
        accepted.append(parsed); os.replace(p,box.archive/p.name)
    return accepted

def main():
    with tempfile.TemporaryDirectory() as td:
        r36=Mailbox(td,"r36"); tablet=Mailbox(td,"tablet")
        p2=wire_packet(2,R36,TABLET,b"portable-save-generation-2")
        assert parse_wire(p2)["generation"]==2
        assert atomic_put(r36.inbox,"g2.isw",p2)

        assert not deliver(r36,tablet,"g2.isw",cut=True)
        assert not (tablet.inbox/"g2.isw").exists()
        (tablet.inbox/"g2.isw.tmp").unlink()

        assert deliver(r36,tablet,"g2.isw",duplicate=True)
        tstate={"owner":TABLET,"generation":1,"checksum":0}
        seen=set(); got=consume(tablet,seen,tstate)
        assert len(got)==1 and got[0]["generation"]==2
        assert consume(tablet,seen,tstate)==[]

        conflict=wire_packet(2,R36,TABLET,b"different-same-generation")
        atomic_put(tablet.inbox,"g2-conflict.isw",conflict)
        assert consume(tablet,seen,tstate)==[]
        assert (tablet.conflicts/"g2-conflict.isw").exists()

        p4=wire_packet(4,TABLET,R36,b"gap-generation-4")
        atomic_put(tablet.inbox,"g4.isw",p4); deliver(tablet,r36,"g4.isw")
        rstate={"owner":R36,"generation":2,"checksum":got[0]["checksum"]}
        assert consume(r36,set(),rstate)==[]
        assert (r36.conflicts/"g4.isw").exists()

        p3=wire_packet(3,TABLET,R36,b"portable-save-generation-3")
        atomic_put(tablet.inbox,"g3.isw",p3); deliver(tablet,r36,"g3.isw")
        got3=consume(r36,set(),rstate)
        assert len(got3)==1 and rstate["generation"]==3

        print("real-wire folder interruption/retry/conflict roundtrip PASS")

if __name__=="__main__": main()
