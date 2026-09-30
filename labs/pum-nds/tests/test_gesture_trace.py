#!/usr/bin/env python3

def trace(points):
    if not points:
        return dict(samples=0,distance=0,changes=0)
    min_x=max_x=points[0][0]
    min_y=max_y=points[0][1]
    last_x,last_y=points[0]
    last_sx=last_sy=0
    distance=0
    changes=0
    samples=1
    frames=0
    for x,y in points[1:]:
        dx=x-last_x; dy=y-last_y
        distance += abs(dx)+abs(dy)
        frames += 1
        samples += 1
        min_x=min(min_x,x); max_x=max(max_x,x)
        min_y=min(min_y,y); max_y=max(max_y,y)
        sx=(dx>0)-(dx<0); sy=(dy>0)-(dy<0)
        if ((sx and last_sx and sx!=last_sx) or
            (sy and last_sy and sy!=last_sy)):
            changes += 1
        if sx: last_sx=sx
        if sy: last_sy=sy
        last_x,last_y=x,y
    return dict(samples=samples,distance=distance,changes=changes,
                min_x=min_x,max_x=max_x,min_y=min_y,max_y=max_y,
                frames=frames)

def test_line():
    r=trace([(10,10),(20,10),(30,10)])
    assert r["samples"]==3
    assert r["distance"]==20
    assert r["changes"]==0

def test_turn_back():
    r=trace([(10,10),(20,10),(15,10)])
    assert r["distance"]==15
    assert r["changes"]==1

def test_box():
    r=trace([(2,3),(8,3),(8,9),(2,9)])
    assert (r["min_x"],r["max_x"],r["min_y"],r["max_y"])==(2,8,3,9)

if __name__=="__main__":
    tests=[test_line,test_turn_back,test_box]
    for t in tests: t()
    print(f"{len(tests)}/{len(tests)} gesture tests passed")
