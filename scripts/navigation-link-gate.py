#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import urlsplit
import re, sys

ROOT=Path("portal")
errors=[]
html_files=list(ROOT.rglob("*.html"))
generated={"command-center.html"}

for p in html_files:
    s=p.read_text(encoding="utf-8",errors="ignore")
    for attr,val in re.findall(r'\b(href|action)=["\']([^"\']+)["\']',s,re.I):
        v=val.strip()
        if not v or v.startswith(("#","http://","https://","mailto:","tel:","javascript:","data:")):
            continue
        path=urlsplit(v).path
        if not path or path=="/":
            continue
        if path.startswith("/"):
            target=ROOT/path.lstrip("/")
        else:
            target=(p.parent/path).resolve()
        if path.endswith("/") or "." not in Path(path).name:
            continue
        if Path(path).suffix.lower() not in {".html",".js",".css",".json",".png",".jpg",".jpeg",".webp",".svg",".mp3",".mp4",".webmanifest"}:
            continue
        try:
            exists=target.exists()
        except OSError:
            exists=False
        if not exists and Path(path).name not in generated:
            errors.append(f"{p}: missing {attr} target {v}")

# Surfaces that must feel like one internal Command Center.
global_pages=[
 "index.html","rpg-home.html","huellas.html","salon-cortinas-rojas.html",
 "isla-baile-inagotable.html","recreo.html","capsulas.html","capsulas-tv.html",
 "musica.html","ps4.html","air-fishing.html","avisos.html","boss-prototype.html",
 "decision-engine.html","midjourney-lab.html","ningun-sitio.html","playtest-echo.html",
 "reel.html","secret-level.html","storm-route.html","sunday-market.html","encuestas.html"
]
for rel in global_pages:
    p=ROOT/rel
    if not p.exists():
        errors.append(f"missing global surface {p}")
        continue
    s=p.read_text(encoding="utf-8",errors="ignore")
    if "isl-global-shell.css" not in s: errors.append(f"{p}: global shell CSS missing")
    if "isl-global-shell.js" not in s: errors.append(f"{p}: global shell JS missing")
    if 'isl-global-shell.css">\\\\n' in s or 'isl-global-shell.js"></script>\\\\n' in s: errors.append(f"{p}: literal newline artifact next to global shell")

idx=(ROOT/"index.html").read_text(encoding="utf-8",errors="ignore")
for token in ["resume=1","isl_center_entered","location.hash==='#calendar'"]:
    if token not in idx: errors.append(f"index resume contract missing: {token}")

caps=(ROOT/"capsulas.html").read_text(encoding="utf-8",errors="ignore")
for token in ["capsuleModal","data-capsule","GUARDAR ECO","VER EN MODO TV"]:
    if token not in caps: errors.append(f"capsules interaction missing: {token}")

route=(ROOT/"route-isl.js").read_text(encoding="utf-8",errors="ignore")
state=(ROOT/"ISL_ROUTE_STATE_CURRENT.json").read_text(encoding="utf-8",errors="ignore")
for token in ["routeStrip","AHORA","SIGUIENTE","Calendario operativo"]:
    if token not in route: errors.append(f"route clarity contract missing: {token}")
if '"current_stop": "r2-human"' not in state: errors.append("route state is not aligned with current R2 gate")

if errors:
    print("ISL NAVIGATION/LINK GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)
print(f"ISL NAVIGATION/LINK GATE GREEN · {len(html_files)} HTML surfaces checked")

# Survey hub contract
survey=(ROOT/"encuestas.html").read_text(encoding="utf-8",errors="ignore")
for token in ["PRUEBA CON COLEGAS","pilares-lite-v2.html","referencias-lite-v2.html","app.netlify.com/sites/islas-voladoras-isl/forms"]:
    if token not in survey: errors.append(f"survey hub missing: {token}")
shell=(ROOT/"isl-global-shell.js").read_text(encoding="utf-8",errors="ignore")
if "Encuestas" not in shell or "encuestas.html" not in shell: errors.append("global shell survey access missing")
