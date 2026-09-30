#!/usr/bin/env python3

CAP=64

def push(buf, dropped, ev):
    if len(buf) < CAP:
        buf.append(ev)
        return buf,dropped
    return buf[1:]+[ev],dropped+1

def test_capacity():
    b=[]; d=0
    for i in range(80):
        b,d=push(b,d,i)
    assert len(b)==64
    assert d==16
    assert b[0]==16
    assert b[-1]==79

if __name__=="__main__":
    test_capacity()
    print("1/1 trace buffer tests passed")
