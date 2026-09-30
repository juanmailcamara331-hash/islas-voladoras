#!/usr/bin/env python3
from pathlib import Path
import hashlib, os, random, shutil, tempfile

def sha(b): return hashlib.sha256(b).hexdigest()

class Mailbox:
    def __init__(self,root,name):
        self.root=Path(root)/name
        self.inbox=self.root/"inbox"
        self.archive=self.root/"archive"
        self.conflicts=self.root/"conflicts"
        for p in (self.inbox,self.archive,self.conflicts): p.mkdir(parents=True,exist_ok=True)

def atomic_put(folder,name,data,cut=False):
    tmp=folder/(name+".tmp")
    final=folder/name
    tmp.write_bytes(data[:len(data)//2] if cut else data)
    if cut:
        return False
    os.replace(tmp,final)
    return True

def deliver(src,dst,name,duplicate=False,cut=False):
    data=(src.inbox/name).read_bytes()
    ok=atomic_put(dst.inbox,name,data,cut=cut)
    if ok and duplicate:
        atomic_put(dst.inbox,name+".dup",data)
    return ok

def consume(box,seen,expected_sha):
    accepted=[]
    for p in sorted(box.inbox.iterdir()):
        if p.suffix==".tmp": continue
        data=p.read_bytes()
        sig=sha(data)
        if sig!=expected_sha:
            target=box.conflicts/p.name
            os.replace(p,target)
            continue
        if sig in seen:
            p.unlink()
            continue
        seen.add(sig); accepted.append(data)
        os.replace(p,box.archive/p.name)
    return accepted

def main():
    with tempfile.TemporaryDirectory() as td:
        r36=Mailbox(td,"r36"); tablet=Mailbox(td,"tablet")
        packet=b"SYNC-WIRE-V1:"+bytes(range(64))
        sig=sha(packet)
        assert atomic_put(r36.inbox,"g2.bin",packet)

        # Interrupted transfer must never appear as a complete inbox packet.
        assert not deliver(r36,tablet,"g2.bin",cut=True)
        assert not (tablet.inbox/"g2.bin").exists()
        assert (tablet.inbox/"g2.bin.tmp").exists()
        (tablet.inbox/"g2.bin.tmp").unlink()

        # Retry succeeds; duplicate is harmless.
        assert deliver(r36,tablet,"g2.bin",duplicate=True)
        seen=set()
        got=consume(tablet,seen,sig)
        assert got==[packet]
        assert consume(tablet,seen,sig)==[]

        # Divergent bytes with same logical filename are preserved as conflict.
        bad=packet[:-1]+b"X"
        atomic_put(tablet.inbox,"g2-conflict.bin",bad)
        assert consume(tablet,seen,sig)==[]
        assert (tablet.conflicts/"g2-conflict.bin").exists()

        # Return trip.
        returned=b"SYNC-WIRE-V1-RETURN:"+bytes(range(32))
        rsig=sha(returned)
        atomic_put(tablet.inbox,"g3.bin",returned)
        assert deliver(tablet,r36,"g3.bin")
        seen2=set()
        assert consume(r36,seen2,rsig)==[returned]

        print("folder transport interruption/retry/conflict roundtrip PASS")

if __name__=="__main__": main()
