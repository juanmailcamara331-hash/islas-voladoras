#!/usr/bin/env python3
import random, statistics

EXPLORE,COMBAT,RECOVER,COMPLETE=0,1,2,3
UP,DOWN,LEFT,RIGHT,PRIMARY,SECONDARY,CONTEXT=1,2,3,4,5,6,7

class G:
    def __init__(self,seed):
        self.seed=seed or 1; self.rng=random.Random(seed)
        self.x=self.y=5; self.hpmax=12; self.hp=12; self.focusmax=3; self.focus=3
        self.level=1; self.xp=0; self.m=0; self.enc=0; self.vic=0; self.rec=0
        self.mode=EXPLORE; self.enemyhp=0; self.enemy_power=0; self.combo=0
        self.flags=0; self.steps=0; self.turns=0; self.closure=False

def step(g,a):
    g.turns+=1
    if g.mode==RECOVER:
        if a in (PRIMARY,CONTEXT):
            g.rec+=1; g.hp=(g.hpmax+1)//2; g.focus=g.focusmax; g.mode=EXPLORE
        return
    if g.mode==COMBAT:
        r=g.rng.randrange(1<<30); dmg=0
        if a==PRIMARY: dmg=2+g.level+r%3; g.combo+=1
        elif a==SECONDARY:
            if g.focus: g.focus-=1; dmg=4+g.level+r%4; g.combo+=2
            else: dmg=1
        elif a==CONTEXT:
            if g.combo>=2: dmg=3+g.combo; g.combo=0
            elif g.focus<g.focusmax: g.focus+=1
        else: return
        if dmg>=g.enemyhp:
            g.vic+=1; g.mode=EXPLORE
            if g.vic%3==0 and g.m<9: g.m+=1
            if g.m>=9:g.closure=True
        else:
            g.enemyhp-=dmg
            ed=1+g.enemy_power//3+(r>>8)%2
            g.hp-=ed
            if g.hp<=0:g.hp=0;g.mode=RECOVER
        return
    if g.mode==EXPLORE:
        if a==CONTEXT and g.closure:g.mode=COMPLETE;return
        if a not in (UP,DOWN,LEFT,RIGHT):return
        if a==UP:g.y=max(0,g.y-1)
        if a==DOWN:g.y=min(11,g.y+1)
        if a==LEFT:g.x=max(0,g.x-1)
        if a==RIGHT:g.x=min(11,g.x+1)
        g.steps+=1
        r=g.rng.randrange(1<<30)
        bit=1<<((g.x+g.y)&15)
        if (((g.x*17+g.y*31+g.seed)^r)%13)==0 and not g.flags&bit:
            g.flags|=bit;g.m+=1
        if g.m>=9:g.closure=True
        if r%7==0 or g.steps%11==0:
            g.mode=COMBAT;g.enc+=1;g.enemy_power=2+g.level+(r>>3)%3;g.enemyhp=5+g.level*2+r%5

def policy(g,r):
    if g.mode==RECOVER:return PRIMARY
    if g.mode==COMBAT:
        if g.focus and r.random()<.35:return SECONDARY
        if g.combo>=2 and r.random()<.25:return CONTEXT
        return PRIMARY
    if g.closure and g.turns>160:return CONTEXT
    return r.choice([UP,DOWN,LEFT,RIGHT])

def run(seed,limit=5000):
    g=G(seed);r=random.Random(seed^0xABC)
    for _ in range(limit):
        step(g,policy(g,r))
        if g.mode==COMPLETE:return g
    return g

def main():
    runs=[run(i+1) for i in range(300)]
    assert all(g.mode==COMPLETE for g in runs), "non-terminating run"
    turns=[g.turns for g in runs]
    assert min(turns)>100, min(turns)
    assert max(turns)<1200, max(turns)
    assert statistics.median(turns)>=160
    assert sum(g.enc for g in runs)>0
    print("sealed simulation PASS")
    print({"min_turns":min(turns),"median_turns":statistics.median(turns),"max_turns":max(turns)})

if __name__=="__main__":main()
