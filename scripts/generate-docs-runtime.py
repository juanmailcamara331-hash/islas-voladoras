#!/usr/bin/env python3
import json, pathlib, sys

ROOT=pathlib.Path(__file__).resolve().parents[1]
MANIFEST=ROOT/"docs/ISL_SURFACE_PROPAGATION_MANIFEST_CURRENT.json"
OUT=ROOT/"portal/data/isl-docs-library-current.json"

data=json.loads(MANIFEST.read_text(encoding="utf-8"))
entries=data.get("entries",[])
errors=[]
seen=set()

for e in entries:
    for key in ("id","title","group","kind","status","source","url","surfaces","canon_state"):
        if key not in e:
            errors.append(f"{e.get('id','?')}: missing {key}")
    if e.get("id") in seen:
        errors.append(f"duplicate id: {e.get('id')}")
    seen.add(e.get("id"))
    p=e.get("path","")
    if p and not p.startswith("DRIVE:"):
        fp=ROOT/p
        if not fp.exists():
            errors.append(f"{e.get('id')}: source path missing: {p}")

if errors:
    print("\n".join("ERROR "+x for x in errors))
    sys.exit(2)

out={
  "schema_version":data.get("schema_version","0.1"),
  "project":data.get("project","ISLAS_VOLADORAS_ISL"),
  "generated_at":data.get("generated_at"),
  "status":"DOCS_LIBRARY_CURRENT",
  "boundary":"ISL_ONLY",
  "rules":{
    "gallery_is_not_canon":True,
    "docs_do_not_auto_promote_canon":True,
    "registry_is_generated_from_manifest":True,
    "source_docs_remain_authoritative":True
  },
  "docs":[{k:v for k,v in e.items() if k!="surfaces" and k!="path"} | {"surfaces":e["surfaces"]} for e in entries]
}
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(json.dumps(out,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(f"wrote {OUT.relative_to(ROOT)} with {len(entries)} docs")
