#!/usr/bin/env python3

INVALID,ACCEPT,DUPLICATE,CONFLICT,GAP,WRONG_TARGET,STALE=range(7)
R36,TABLET=1,2

def ident(p):
    return (p["generation"],p["checksum"],p["from"],p["to"])

def decide(i,c,local):
    if not i.get("valid",False): return INVALID
    if i["to"]!=local: return WRONG_TARGET
    if c is None: return ACCEPT
    if not c.get("valid",False): return INVALID
    if ident(i)==ident(c): return DUPLICATE
    if i["generation"]<c["generation"]: return STALE
    if i["generation"]==c["generation"]:
        return DUPLICATE if i["checksum"]==c["checksum"] else CONFLICT
    if i["generation"]>c["generation"]+1: return GAP
    return ACCEPT

def pkt(gen,checksum,fr,to):
    return {"valid":True,"generation":gen,"checksum":checksum,"from":fr,"to":to}

def main():
    cur=pkt(4,100,TABLET,R36)
    assert decide(pkt(5,200,R36,TABLET),cur,TABLET)==ACCEPT
    assert decide(pkt(4,100,TABLET,R36),cur,R36)==DUPLICATE
    assert decide(pkt(4,999,TABLET,R36),cur,R36)==CONFLICT
    assert decide(pkt(7,300,R36,TABLET),cur,TABLET)==GAP
    assert decide(pkt(3,80,R36,TABLET),cur,TABLET)==STALE
    assert decide(pkt(5,200,R36,TABLET),cur,R36)==WRONG_TARGET
    bad=pkt(5,200,R36,TABLET); bad["valid"]=False
    assert decide(bad,cur,TABLET)==INVALID
    print("sync receive decision model PASS")

if __name__=="__main__": main()
