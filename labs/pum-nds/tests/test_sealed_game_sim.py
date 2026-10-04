#!/usr/bin/env python3
import statistics

EXPLORE, COMBAT, RECOVER, COMPLETE = 0, 1, 2, 3
UP, DOWN, LEFT, RIGHT, PRIMARY, SECONDARY, CONTEXT = 1, 2, 3, 4, 5, 6, 7

WORLD_W = 12
WORLD_H = 12
TARGET_MILESTONES = 9
COLLECTION_VARIANTS = 12


def xorshift32(x):
    x &= 0xFFFFFFFF
    if x == 0:
        x = 0xA341316C
    x ^= (x << 13) & 0xFFFFFFFF
    x ^= x >> 17
    x ^= (x << 5) & 0xFFFFFFFF
    return x & 0xFFFFFFFF


def pop16(v):
    return v.bit_count()


class G:
    def __init__(self, seed):
        self.seed = seed or 1
        self.rng = self.seed ^ 0x9E3779B9
        self.turns = 0
        self.steps = 0
        self.x = 5
        self.y = 5
        self.rings_mask = 1
        self.pens_mask = 1
        self.lighters_mask = 1
        self.hpmax = 13
        self.hp = self.hpmax
        self.focusmax = 3
        self.focus = self.focusmax
        self.m = 0
        self.enc = 0
        self.vic = 0
        self.rec = 0
        self.enemyhp = 0
        self.enemy_power = 0
        self.combo = 0
        self.flags = 0
        self.mode = EXPLORE
        self.closure = False


def next_rng(g):
    g.rng = xorshift32(g.rng)
    return g.rng


def add_variant(mask, r):
    start = r % COLLECTION_VARIANTS
    for i in range(COLLECTION_VARIANTS):
        idx = (start + i) % COLLECTION_VARIANTS
        bit = 1 << idx
        if not mask & bit:
            return mask | bit
    return mask


def refresh(g):
    g.hpmax = 12 + min(pop16(g.rings_mask), 6)
    g.focusmax = 3 + min(pop16(g.pens_mask) // 2, 4)
    g.hp = min(g.hp, g.hpmax)
    g.focus = min(g.focus, g.focusmax)


def reward(g):
    r = next_rng(g)
    kind = r % 3
    if kind == 0:
        g.rings_mask = add_variant(g.rings_mask, r >> 3)
    elif kind == 1:
        g.pens_mask = add_variant(g.pens_mask, r >> 3)
    else:
        g.lighters_mask = add_variant(g.lighters_mask, r >> 3)
    refresh(g)


def challenge(g):
    return 1 + g.m // 3 + g.vic // 5


def start_encounter(g):
    r = next_rng(g)
    ch = challenge(g)
    g.mode = COMBAT
    g.enc += 1
    g.enemy_power = 2 + ch + ((r >> 3) % 3)
    g.enemyhp = 5 + ch * 2 + (r % 5)
    g.combo = 0


def step(g, action):
    if g.mode == COMPLETE:
        return

    g.turns += 1

    if g.mode == RECOVER:
        if action in (PRIMARY, CONTEXT):
            g.rec += 1
            g.hp = (g.hpmax + 1) // 2
            g.focus = g.focusmax
            g.x = (g.x + 3) % WORLD_W
            g.y = (g.y + 5) % WORLD_H
            g.mode = EXPLORE
        return

    if g.mode == COMBAT:
        if action not in (PRIMARY, SECONDARY, CONTEXT):
            return

        r = next_rng(g)
        damage = 0
        lighter_bonus = 1 if pop16(g.lighters_mask) else 0
        pen_bonus = 1 if pop16(g.pens_mask) else 0

        if action == PRIMARY:
            damage = 2 + lighter_bonus + (r % 3)
            g.combo += 1
        elif action == SECONDARY:
            if g.focus:
                g.focus -= 1
                damage = 4 + pen_bonus + (r % 4)
                g.combo += 2
            else:
                damage = 1
        else:
            if g.combo >= 2:
                damage = 3 + g.combo
                g.combo = 0
            elif g.focus < g.focusmax:
                g.focus += 1

        if damage >= g.enemyhp:
            g.enemyhp = 0
            g.vic += 1
            if g.vic % 2 == 0:
                reward(g)
            if g.vic % 3 == 0 and g.m < TARGET_MILESTONES:
                g.m += 1
            if g.m >= TARGET_MILESTONES:
                g.closure = True
            g.mode = EXPLORE
            return

        g.enemyhp -= damage
        enemy_damage = 1 + g.enemy_power // 3 + ((r >> 8) % 2)
        if enemy_damage >= g.hp:
            g.hp = 0
            g.mode = RECOVER
        else:
            g.hp -= enemy_damage
        return

    if g.mode == EXPLORE:
        moved = False
        if action == UP:
            g.y = max(0, g.y - 1)
            moved = True
        elif action == DOWN:
            g.y = min(WORLD_H - 1, g.y + 1)
            moved = True
        elif action == LEFT:
            g.x = max(0, g.x - 1)
            moved = True
        elif action == RIGHT:
            g.x = min(WORLD_W - 1, g.x + 1)
            moved = True

        if moved:
            g.steps += 1
            r = next_rng(g)
            cell = g.x * 17 + g.y * 31 + g.seed

            if ((cell ^ r) % 13) == 0:
                bit = 1 << ((g.x + g.y) & 15)
                if not g.flags & bit:
                    g.flags |= bit
                    g.m += 1
                    reward(g)

            if g.m >= TARGET_MILESTONES:
                g.closure = True

            if (r % 7) == 0 or (g.steps % 11) == 0:
                start_encounter(g)

        if action == CONTEXT and g.closure:
            g.mode = COMPLETE


def policy_rng(seed):
    x = seed or 1
    while True:
        x = xorshift32(x)
        yield x


def policy(g, rng):
    r = next(rng)

    if g.mode == RECOVER:
        return PRIMARY

    if g.mode == COMBAT:
        if g.focus and (r % 100) < 35:
            return SECONDARY
        if g.combo >= 2 and ((r >> 8) % 100) < 25:
            return CONTEXT
        return PRIMARY

    if g.closure and g.turns > 160:
        return CONTEXT

    return (UP, DOWN, LEFT, RIGHT)[r % 4]


def run(seed, limit=5000):
    g = G(seed)
    rng = policy_rng(seed ^ 0xABC)
    for _ in range(limit):
        step(g, policy(g, rng))
        if g.mode == COMPLETE:
            return g
    return g


def main():
    runs = [run(i + 1) for i in range(300)]
    assert all(g.mode == COMPLETE for g in runs), "non-terminating run"

    turns = [g.turns for g in runs]
    encounters = [g.enc for g in runs]

    assert min(turns) > 100, min(turns)
    assert max(turns) < 1200, max(turns)
    assert statistics.median(turns) >= 160
    assert min(encounters) > 0
    assert len({g.rings_mask for g in runs}) > 1
    assert len({g.pens_mask for g in runs}) > 1
    assert len({g.lighters_mask for g in runs}) > 1

    print("sealed simulation PASS")
    print({
        "min_turns": min(turns),
        "median_turns": statistics.median(turns),
        "max_turns": max(turns),
    })


if __name__ == "__main__":
    main()
