#!/usr/bin/env python3
from pathlib import Path
import re, sys

p=Path("portal/index.html")
s=p.read_text(encoding="utf-8")
errors=[]

def need(cond,msg):
    if not cond: errors.append(msg)

need('id="isl-v068-reference-layout"' in s,"missing v0.68 style layer")
need('class="quickDock"' in s,"missing quick dock")
for label in ["CALENDARIO","REFERENCIAS","ENCUESTAS","REGISTRO","ESTADO"]:
    need(f"<b>{label}</b>" in s,f"missing visible quick action: {label}")

need(len(re.findall(r'class="navI"',s)) >= 7,"main nav icons missing")
need("flex-wrap:nowrap!important" in s,"main nav nowrap guard missing")

need('class="finalCard profileCard"' in s,"Profile RPG primary card missing")
need('class="finalCard routeCard"' in s,"Route primary card missing")
need('class="finalCard compassCard"' in s,"Huellas compass primary card missing")
need(len(re.findall(r'class="profileStat"',s)) == 3,"expected exactly 3 RPG profile stats")
need("Indicadores RPG visuales · no analítica real" in s,"RPG stats truth label missing")

need('id="isl-v068-route-live"' in s,"route live binding missing")
need("ISL_ROUTE_STATE_CURRENT.json" in s,"route state JSON binding missing")
need('id="routePct"' in s,"route percentage output missing")

need(len(re.findall(r'class="worldTile"',s)) == 5,"expected exactly 5 world tiles")
for label in ["Islas","Escenas","Criaturas","Reliquias","Dialéctica del mundo"]:
    need(f"<b>{label}</b>" in s,f"missing world tile: {label}")

need("PS4 VERSION" in s,"PS4 utility missing")
need(len(re.findall(r'class="util"',s)) == 6,"expected 6 utility modules")
need('id="currentActions"' in s,"current actions block missing")
need('id="moreNavBtn"' in s,"single More drawer control missing")

if errors:
    print("ISL PORTAL v0.68 UI GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)

print("ISL PORTAL v0.68 UI GATE GREEN")
