#!/usr/bin/env python3
import random

R36,TABLET=1,2

def apply(state,p):
    key=(p["gen"],p["sum"],p["from"],p["to"])
    if key in state["seen"]:
        return "DUP"
    if p["gen"]<state["gen"]:
        return "STALE"
    if p["gen"]==state["gen"] and p["sum"]!=state["sum"]:
        state["conflicts"].append(dict(p))
        return "CONFLICT"
    if p["gen"]>state["gen"]+1:
        return "GAP"
    state["gen"]=p["gen"]; state["sum"]=p["sum"]; state["seen"].add(key)
    return "ACCEPT"

def main():
    state={"gen":1,"sum":10,"seen":set(),"conflicts":[]}
    packets=[
      {"gen":2,"sum":20,"from":R36,"to":TABLET},
      {"gen":2,"sum":20,"from":R36,"to":TABLET}, # retry duplicate
      {"gen":2,"sum":21,"from":R36,"to":TABLET}, # same-gen conflict
      {"gen":4,"sum":40,"from":TABLET,"to":R36}, # gap
      {"gen":3,"sum":30,"from":TABLET,"to":R36},
      {"gen":4,"sum":40,"from":R36,"to":TABLET},
    ]
    outcomes=[apply(state,p) for p in packets]
    assert outcomes==["ACCEPT","DUP","CONFLICT","GAP","ACCEPT","ACCEPT"],outcomes
    assert state["gen"]==4 and state["sum"]==40
    assert len(state["conflicts"])==1
    # randomized replay of exact duplicates must not advance state
    rng=random.Random(42)
    dupes=[dict(packets[-1]) for _ in range(25)]
    rng.shuffle(dupes)
    assert all(apply(state,p)=="DUP" for p in dupes)
    print("sync retry/conflict stress PASS")

if __name__=="__main__": main()
