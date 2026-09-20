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
 "index.html","rpg-home.html","galeria.html","huellas.html","salon-cortinas-rojas.html",
 "isla-baile-inagotable.html","recreo.html","capsulas.html","capsulas-tv.html",
 "musica.html","ps4.html","air-fishing.html","avisos.html","boss-prototype.html",
 "decision-engine.html","midjourney-lab.html","ningun-sitio.html","playtest-echo.html",
 "reel.html","secret-level.html","storm-route.html","sunday-market.html","encuestas.html",
 "playtest-lab.html","signal-telegraph-lab.html","playtest-review.html"
]
for rel in global_pages:
    p=ROOT/rel
    if not p.exists():
        errors.append(f"missing global surface {p}")
        continue
    s=p.read_text(encoding="utf-8",errors="ignore")
    if "isl-global-shell.css" not in s: errors.append(f"{p}: global shell CSS missing")
    if "isl-global-shell.js" not in s: errors.append(f"{p}: global shell JS missing")
    if "\\n</head>" in s: errors.append(f"{p}: literal \\n shell artifact visible in UI")
    if 'isl-global-shell.css">\\n' in s or 'isl-global-shell.js"></script>\\n' in s: errors.append(f"{p}: literal newline artifact next to global shell")

idx=(ROOT/"index.html").read_text(encoding="utf-8",errors="ignore")
for token in ["resume=1","location.hash==='#calendar'"]:
    if token not in idx: errors.append(f"index resume contract missing: {token}")

caps=(ROOT/"capsulas.html").read_text(encoding="utf-8",errors="ignore")
for token in ["capsuleModal","data-capsule","GUARDAR ECO","VER EN MODO TV"]:
    if token not in caps: errors.append(f"capsules interaction missing: {token}")

route=(ROOT/"route-isl.js").read_text(encoding="utf-8",errors="ignore")
state=(ROOT/"ISL_ROUTE_STATE_CURRENT.json").read_text(encoding="utf-8",errors="ignore")
for token in ["routeStrip","AHORA","SIGUIENTE","Calendario operativo"]:
    if token not in route: errors.append(f"route clarity contract missing: {token}")
if '"current_stop": "r2-human"' not in state: errors.append("route state is not aligned with current R2 gate")

survey=(ROOT/"survey-results.html").read_text(encoding="utf-8",errors="ignore")
for token in ["Pilares","Referencias","/api/survey-lite-state","ACTUALIZAR RESULTADOS"]:
    if token not in survey: errors.append(f"survey results hub missing: {token}")
ref=(ROOT/"poll/referencias-lite-v2.html").read_text(encoding="utf-8",errors="ignore")
for token in ["refVisual","ANCLA VISUAL EXACTA","v0.70.10-ghost-exact-hd","ghost-reference-mobile.jpg"]:
    if token not in ref: errors.append(f"references Lite visual contract missing: {token}")

# Survey hub contract
survey=(ROOT/"encuestas.html").read_text(encoding="utf-8",errors="ignore")
for token in ["PRUEBA CON COLEGAS","pilares-lite-v2.html","referencias-lite-v2.html","app.netlify.com/projects/islas-voladoras-isl"]:
    if token not in survey: errors.append(f"survey hub missing: {token}")
shell=(ROOT/"isl-global-shell.js").read_text(encoding="utf-8",errors="ignore")
if "Encuestas" not in shell or "encuestas.html" not in shell: errors.append("global shell survey access missing")
if shell.count("['Encuestas'") != 1: errors.append("global shell must expose exactly one Encuestas item")


# external lab contract
lab=(ROOT/"external-lab.html").read_text(encoding="utf-8",errors="ignore")
for token in ["EXTERNAL LAB","CANDIDATOS · NO CANON","RUTA PERMANENTE:","PROTOTIPO BARATO","EVIDENCIA HUMANA"]:
    if token not in lab: errors.append(f"external lab missing: {token}")
idx=(ROOT/"index.html").read_text(encoding="utf-8",errors="ignore")
for token in ["CANDIDATO · EXTERNAL LAB","Danzante-Aguja · External Lab","Consejero de Niebla · External Lab","Escarabeo-Registrador · External Lab"]:
    if token not in idx: errors.append(f"gallery external intake missing: {token}")
shell=(ROOT/"isl-global-shell.js").read_text(encoding="utf-8",errors="ignore")
if "external-lab.html" not in shell: errors.append("global shell External Lab access missing")
if "spielberg-lab.html" not in shell: errors.append("global shell Spielberg Lab Feed access missing")
if "playtest-lab.html" not in shell: errors.append("global shell Playtest Lab access missing")
if "signal-telegraph-lab.html" not in shell: errors.append("global shell Signal/Telegraph Lab access missing")
if "playtest-review.html" not in shell: errors.append("global shell human Playtest Review access missing")
review=(ROOT/"playtest-review.html")
if not review.exists(): errors.append("Playtest human review surface missing")
else:
    rv=review.read_text(encoding="utf-8",errors="ignore").lower()
    for token in ["keep","adapt","discard","new_experiment","human_review_only","not_canon"]:
        if token.lower() not in rv: errors.append(f"Playtest human review contract missing: {token}")
playtest=(ROOT/"playtest-lab.html")
if not playtest.exists(): errors.append("Playtest Lab surface missing")
else:
    pt=playtest.read_text(encoding="utf-8",errors="ignore").lower()
    for token in ["juega 3 minutos","lab_only","not_canon","signal-telegraph-lab.html"]:
        if token.lower() not in pt: errors.append(f"Playtest Lab contract missing: {token}")
signal=(ROOT/"signal-telegraph-lab.html")
if not signal.exists(): errors.append("Signal/Telegraph Lab surface missing")
else:
    sg=signal.read_text(encoding="utf-8",errors="ignore").lower()
    for token in ["isl_signal_telegraph_lab_v0.1","lab_only","not_canon","completion_marker","isl_bug_hunt_v0.1","human review"]:
        if token.lower() not in sg: errors.append(f"Signal/Telegraph Lab contract missing: {token}")
spielberg=(ROOT/"spielberg-lab.html")
if not spielberg.exists(): errors.append("Spielberg Lab Feed surface missing")
else:
    st=spielberg.read_text(encoding="utf-8",errors="ignore")
    low=st.lower()
    for token in ["spielberg lab feed","lab_only","not_canon","isl-spielberg-lab-feed.json"]:
        if token.lower() not in low: errors.append(f"Spielberg Lab Feed contract missing: {token}")


# Unified Gallery + production-safe Route ISL
gallery=(ROOT/"galeria.html").read_text(encoding="utf-8",errors="ignore")
for token in ["GALERÍA VIVA · WEB + APP","data/isl-music-current.json","data/isl-external-lab-current.json","command-center.html?full=1#calendar","audio controls"]:
    if token not in gallery: errors.append(f"unified gallery contract missing: {token}")
shell=(ROOT/"isl-global-shell.js").read_text(encoding="utf-8",errors="ignore")
for token in ["command-center.html?full=1','#calendar","galeria.html"]:
    if token not in shell: errors.append(f"global route contract missing: {token}")

if errors:
    print("ISL NAVIGATION/LINK GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)
print(f"ISL NAVIGATION/LINK GATE GREEN · {len(html_files)} HTML surfaces checked")
