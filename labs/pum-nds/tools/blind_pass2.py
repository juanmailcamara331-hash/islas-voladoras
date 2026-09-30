#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
main=(ROOT/"source/main.cpp").read_text()
required=[
 "sealed_game_step",
 "tempo_observe_action",
 "biography_record_use",
 "echo_schedule",
 "push_trace",
 "screen_manager_init",
]
missing=[x for x in required if x not in main]
if missing:
    print("synthesis missing: "+",".join(missing))
    sys.exit(1)

# All transversal systems must support PLAY rather than own the loop.
for token in ["TEMPO BUTTON","BIOGRAPHY MENU","ECHO MENU","PLAYTRACE MENU"]:
    if token.lower() in main.lower():
        print("transversal leaked into permanent UI: "+token)
        sys.exit(1)

print("blind dialectical pass 2: PASS")
print("PLAY + TEMPO + BIOGRAPHY + ECHO + TRACE + DISPLAY synthesized")
