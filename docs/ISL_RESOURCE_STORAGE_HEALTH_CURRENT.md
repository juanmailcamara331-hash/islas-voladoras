# ISL · RESOURCE / STORAGE HEALTH · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · OBSERVABILITY · ISL ONLY

## OBJETIVO
Ver desde Centro de Mandos qué recursos usamos, qué límites importan y qué todavía no podemos medir.

## SNAPSHOT
GitHub repository API size: 95,888 KB (~93.64 MiB).
GitHub repo visibility: PUBLIC.
Google Drive ISL workspace visible direct listing: 253 items, 32 folders, ~5.59 GiB summed visible size.
Google account quota remaining: UNKNOWN from current connector.
Unreal project/DDC real disk usage: UNKNOWN until Unreal lane is instrumented.

## REGLA
No comprar/migrar infraestructura por ansiedad.
Escalar sólo cuando:
- volumen real;
- rendimiento;
- restore;
- colaboración;
- coste;
- límites;
- o seguridad
lo justifiquen.

## GITHUB
Good for:
code, docs, small runtime assets, CI, version history.

Guard:
avoid large binary history.
Use LFS/external storage when binary weight becomes material.
Public repo means secrets/private material stay out.

## DRIVE
Good for:
masters, provenance, briefs, physical packs, source media, backups.

Guard:
Drive is not runtime CDN.
Actual account quota must be checked in Google storage UI because connector does not expose it.

## UNREAL
Separate:
source assets
vs
Derived Data Cache.
DDC is disposable/regenerable and should not live in ordinary source control.
When project/team grows, evaluate shared Zen/Cloud DDC and Virtual Assets.

## FALLBACK
Primary:
surface-propagation.yml

Fallback:
surface-propagation-fallback.yml
- runs after a primary failure;
- also audits every 6 hours;
- regenerates runtime registry;
- retries gate;
- opens one GitHub issue only if still broken.

## NEXT OBSERVABILITY
Add when technically visible:
- GitHub Actions artifact usage;
- Google remaining quota;
- Unreal Content/DDC sizes;
- Netlify bandwidth/build usage;
- CDN/object storage usage.
