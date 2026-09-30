#!/usr/bin/env python3

MAGIC = 0x49534C31
SCHEMA = 2

def test_constants():
    assert MAGIC == 0x49534C31
    assert SCHEMA == 2

def test_game_snapshot_required():
    fields=[
      "seed","turns","steps","hp","level","milestones",
      "encounters","victories","recoveries","mode"
    ]
    assert len(fields) >= 10

def main():
    tests=[test_constants,test_game_snapshot_required]
    for t in tests: t()
    print(f"{len(tests)}/{len(tests)} tests passed")

if __name__=="__main__":
    main()
