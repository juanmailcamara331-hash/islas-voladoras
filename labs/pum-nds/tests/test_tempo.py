#!/usr/bin/env python3

def band(actions,pauses,speed,repetition):
    score=actions*3+speed*2+repetition
    score=max(0,score-pauses)
    return 0 if score<3 else 1 if score<8 else 2 if score<16 else 3

def test_quiet():
    assert band(0,4,0,0)==0

def test_flow():
    assert band(2,0,2,0)==2

def test_fast():
    assert band(4,0,3,1)==3

if __name__=="__main__":
    tests=[test_quiet,test_flow,test_fast]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} tempo tests passed")
