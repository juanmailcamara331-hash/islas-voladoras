#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
P=ROOT/"portal"
PLAYABLES=[
 "velaria-v2.html","recreo.html","air-fishing.html","sunday-market.html",
 "ningun-sitio.html","isla-baile-inagotable.html","salon-cortinas-rojas.html",
 "secret-level.html","storm-route.html","boss-prototype.html"
]
errors=[]
def fail(x): errors.append(x)
for name in PLAYABLES:
    p=P/name
    if not p.exists():
        fail(f"missing playable: {name}")
        continue
    t=p.read_text(encoding="utf-8",errors="ignore")
    if "viewport-fit=cover" not in t: fail(f"{name}: mobile viewport missing viewport-fit=cover")
    if "playtest-friends.js" not in t: fail(f"{name}: missing unified friend playtest shell")
    if "<title>" not in t: fail(f"{name}: missing title")

friend=(P/"playtest-friends.js").read_text(encoding="utf-8")
for token in ["isl-friend-play","jugar.html?friends=1","rpg-home.html","display:none!important"]:
    if token not in friend: fail(f"friend shell missing guard token: {token}")

arcade=(P/"jugar.html").read_text(encoding="utf-8")
for token in ["MODO COLEGAS","Hoy: Velaria.","JUGAR VELARIA","friend-browse"]:
    if token not in arcade: fail(f"arcade friend-focus missing: {token}")

velaria=(P/"velaria-v2.html").read_text(encoding="utf-8",errors="ignore")
for token in ["velaria-p0-feel-v084","windReadout","Volver a la Recreativa","jugar.html?friends=1","Perfecto. Ahora el cartel discute con el viento."]:
    if token not in velaria: fail(f"Velaria P0 contract missing: {token}")
if 'id="returnBoat" href="rpg-home.html' in velaria:
    fail("Velaria regression: finish still returns to Cartographer instead of Recreativa")


dance=(P/"isla-baile-inagotable.html").read_text(encoding="utf-8",errors="ignore")
for token in ["Danzante-Aguja","Consejero de Niebla","Escarabeo-Registrador","dancerTelegraph","counselor-favor","archivist-record","isl_huellas_events_v2"]:
    if token not in dance: fail(f"Baile creature interaction contract missing: {token}")

if errors:
    print("PLAYABLE QUALITY GATE FAILED")
    for e in errors: print(" -",e)
    sys.exit(1)
print("PLAYABLE QUALITY GATE GREEN: shared mobile + friend-mode contract present")


# Persistent NUDOS contract
dance=(P/"isla-baile-inagotable.html").read_text(encoding="utf-8")
for token in [
    "dialectic_schema_version",
    "NUDO-A",
    "NUDO-B",
    "NUDO-C",
    "createKnot",
    "maybeKnotA",
    "maybeKnotB",
    "maybeKnotC",
    "consequence_main",
    "revisit_hooks",
    "migrateDialecticState",
    "DIALECTIC_BACKUP_KEY",
]:
    if token not in dance:
        fail(f"Isla Baile missing persistent NUDOS contract token: {token}")


# Delayed NUDO human-return evidence contract
friend=(P/"playtest-friends.js").read_text(encoding="utf-8")
for token in [
    "isl_baile_return_probe_pending",
    "isl_baile_return_evidence_v1",
    "¿Qué crees que cambió?",
    "¿Por qué crees que cambió?",
    "¿Qué esperas que ocurra si vuelves otra vez?",
]:
    if token not in friend:
        fail(f"Playtest friend mode missing delayed NUDO evidence token: {token}")


# Carrillo -> Velaria -> Carrillo closed human-test loop
carrillo=(P.parent/"private-site"/"carrillo-human-lab.html").read_text(encoding="utf-8")
velaria=(P/"velaria-v2.html").read_text(encoding="utf-8")
for token in [
    "velaria-v2.html?friends=1&return=carrillo-human-lab.html",
    "openVelaria",
]:
    if token not in carrillo:
        fail(f"Carrillo Human Lab missing closed-loop token: {token}")
for token in [
    "safeReturnTarget",
    "returnTarget",
]:
    if token not in velaria:
        fail(f"Velaria missing safe return-loop token: {token}")
