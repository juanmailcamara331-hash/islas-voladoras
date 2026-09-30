#!/usr/bin/env python3

def test_biography_accumulates():
    b={}
    def touch(e):
        b.setdefault(e,{"encounters":0,"uses":0,"redefinitions":0})
        return b[e]
    touch(7)["encounters"]+=1
    touch(7)["uses"]+=2
    touch(7)["redefinitions"]+=1
    assert b[7]=={"encounters":1,"uses":2,"redefinitions":1}

def test_entities_remain_separate():
    b={1:{"uses":1},2:{"uses":3}}
    assert b[1]["uses"]!=b[2]["uses"]

if __name__=="__main__":
    tests=[test_biography_accumulates,test_entities_remain_separate]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} biography tests passed")
