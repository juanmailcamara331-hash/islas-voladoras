#!/usr/bin/env python3
from pathlib import Path
import re, sys

ROOT=Path(__file__).resolve().parents[1]
fail=[]

main=(ROOT/"source/main.cpp").read_text()
display=(ROOT/"DISPLAY_LAW_V0_1.md").read_text()
closure=(ROOT/"GLOBAL_DIALECTICAL_CLOSURE_MATRIX_V1.md").read_text()

# PASS 1 — contradiction / generic bloat guards
permanent_keys=set(re.findall(r"KEY_[A-Z0-9_]+", main))
allowed={"KEY_UP","KEY_DOWN","KEY_LEFT","KEY_RIGHT","KEY_A","KEY_B","KEY_X","KEY_SELECT","KEY_TOUCH"}
extra=sorted(permanent_keys-allowed)
if extra:
    fail.append("unexpected controls: "+",".join(extra))

for forbidden in [
    "TECH VERTICAL",
    "DEBUG MENU",
    "TELEMETRY",
    "TEMPO BUTTON",
    "ECHO BUTTON",
    "SERENDIPITY BUTTON",
]:
    if forbidden.lower() in main.lower():
        fail.append("player-facing debug/bloat token: "+forbidden)

if "THE GAME IS ONE SCREEN" not in display:
    fail.append("display law missing single-screen root")

if "always-on second screen" not in closure.lower():
    fail.append("closure matrix lost second-screen kill rule")

if fail:
    print("\n".join(fail))
    sys.exit(1)

print("blind dialectical pass 1: PASS")
print({"controls":sorted(permanent_keys),"bloat_guards":"pass"})
