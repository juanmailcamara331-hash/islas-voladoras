#!/usr/bin/env python3
from pathlib import Path
import hashlib, json, re, sys
root=Path("portal")
assets=root/"assets"
rows=[]
by_hash={}
for p in assets.rglob("*"):
    if not p.is_file(): continue
    data=p.read_bytes()
    h=hashlib.sha256(data).hexdigest()
    row={"path":str(p),"bytes":len(data),"sha256":h}
    rows.append(row); by_hash.setdefault(h,[]).append(row)
big=[r for r in rows if r["bytes"]>1_000_000]
dups=[v for v in by_hash.values() if len(v)>1]
viol=[]
for p in root.rglob("*"):
    if p.suffix.lower() not in {".html",".js"}: continue
    txt=p.read_text(encoding="utf-8",errors="ignore")
    if 'preload="auto"' in txt or ".preload='auto'" in txt or '.preload="auto"' in txt:
        viol.append({"file":str(p),"rule":"heavy_media_preload_auto"})
report={
  "asset_count":len(rows),
  "asset_bytes":sum(r["bytes"] for r in rows),
  "assets_over_1mb":sorted(big,key=lambda r:r["bytes"],reverse=True),
  "duplicate_groups":dups,
  "hard_violations":viol,
  "policy":{
    "masters":"retain source quality; do not serve in hot paths",
    "derivatives":"responsive Image CDN or generated lightweight variants",
    "heavy_media":"load only after explicit user intent",
    "release":"Netlify production only through release airlock"
  }
}
Path("build").mkdir(exist_ok=True)
Path("build/asset-budget.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(f"ISL asset audit: {report['asset_count']} files / {report['asset_bytes']/1_000_000:.1f} MB / {len(big)} >1MB / {len(dups)} duplicate groups")
for d in dups:
    print("DUP:",", ".join(x["path"] for x in d))
if viol:
    print("COST VIOLATIONS:",json.dumps(viol,indent=2))
    sys.exit(2)
