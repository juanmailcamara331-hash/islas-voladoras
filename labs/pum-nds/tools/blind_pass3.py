#!/usr/bin/env python3
from pathlib import Path
import re, sys

ROOT=Path(__file__).resolve().parents[1]
main=(ROOT/"source/main.cpp").read_text()
fail=[]

# Square-screen readability guard: literal player-facing lines should stay compact.
for m in re.finditer(r'iprintf\("([^"\\]*(?:\\.[^"\\]*)*)"', main):
    raw=m.group(1)
    try:
        text=bytes(raw,"utf8").decode("unicode_escape")
    except Exception:
        text=raw
    for line in text.split("\n"):
        # Dynamic-format strings get a small allowance.
        limit=28 if "%" in line else 24
        if len(line)>limit:
            fail.append(f"wide-ui:{len(line)}:{line[:40]}")

# No giant permanent control vocabulary.
keys=set(re.findall(r"KEY_[A-Z0-9_]+",main))
if len(keys)>9:
    fail.append(f"control-bloat:{len(keys)}")

# Core player screen should not display instrumentation names.
for t in ["TEMPO","BIOGRAPHY","PLAYTRACE","CHECKSUM","SERENDIPINATOR","ORCHESTRATOR"]:
    if re.search(r'iprintf\([^\n]*'+t,main,re.I):
        fail.append("instrumentation-visible:"+t)

if fail:
    print("\n".join(fail))
    sys.exit(1)

print("blind dialectical pass 3: PASS")
print({"screen":"compact","controls":len(keys),"telemetry":"hidden"})
