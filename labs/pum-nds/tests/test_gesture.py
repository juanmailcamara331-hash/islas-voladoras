#!/usr/bin/env python3

def analyse(points):
    distance=0
    changes=0
    last_sx=last_sy=0
    for (x0,y0),(x1,y1) in zip(points, points[1:]):
        dx=x1-x0; dy=y1-y0
        distance += abs(dx)+abs(dy)
        sx=(dx>0)-(dx<0); sy=(dy>0)-(dy<0)
        if (sx and last_sx and sx!=last_sx) or (sy and last_sy and sy!=last_sy):
            changes += 1
        if sx: last_sx=sx
        if sy: last_sy=sy
    return distance,changes

def test_straight():
    d,c=analyse([(0,0),(2,0),(4,0),(6,0)])
    assert d==6 and c==0

def test_turnback():
    d,c=analyse([(0,0),(4,0),(2,0)])
    assert d==6 and c==1

if __name__=="__main__":
    tests=[test_straight,test_turnback]
    [t() for t in tests]
    print(f"{len(tests)}/{len(tests)} gesture tests passed")
