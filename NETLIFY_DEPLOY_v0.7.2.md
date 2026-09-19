# ISL Netlify Deploy v0.7.2

Production trigger after verified master-media import.

Expected portal masters:
- `portal/assets/island-a-master.jpg` — 408030 bytes
- `portal/assets/island-b-master.jpg` — 493778 bytes
- `portal/assets/previs-premium-1080p-L41.mp4` — 8288164 bytes

The Netlify build must fail rather than publish degraded substitutes.


## Release trigger · v0.65 native visual surveys
Fecha: 2026-09-18
Motivo:
- publicar encuesta visual ISL de Pilares;
- publicar encuesta visual ISL de Referencias;
- registrar ambos formularios en Netlify Forms;
- mantener Jotform sólo como backup técnico.


## Release trigger · v0.67 public/private security + Lite v2
Fecha: 2026-09-19
Motivo:
- publicar Pilares Lite v2 y Referencias Lite v2;
- mantener v1 como rollback;
- eliminar redirects públicos hacia el Command Center interno;
- aplicar allowlist pública reforzada;
- publicar 404 pública neutra;
- preparar separación PUBLIC / PRIVATE;
- conservar Command Center completo fuera del build público.


## Release trigger · v0.69.3 survey visual + results fix
Fecha: 2026-09-19
Motivo:
- publicar la ilustración original del fantasma marítimo en Referencias Lite v2;
- asegurar que el asset forma parte del allowlist público;
- corregir el acceso a resultados usando la URL canónica del proyecto Netlify;
- conservar las encuestas Lite v2 como superficie pública mínima.


## Release trigger · v0.69.4 exact approved ghost
Fecha: 2026-09-19
Motivo:
- sustituir el fantasma provisional por el recorte exacto de la lámina aprobada por el autor;
- publicar ghost-reference-exact-hd.webp en la allowlist pública;
- mantener la encuesta Referencias Lite v2 con el mismo instrumento v0.69-lite-visual.


## Release trigger · v0.69.5 HD ghost repair
Fecha: 2026-09-19
Motivo:
- sustituir blob truncado/pixelado por ghost-reference-exact-hd.webp 1200x688;
- render sin aspect-ratio forzado;
- mantener el mismo estímulo visual, sólo corregir calidad.


## Release trigger · v0.69.6 verified ghost + External Lab
Fecha: 2026-09-19
Motivo:
- sustituir el WebP corrupto por ghost-reference-mobile.jpg verificado;
- no escalar el recorte por encima de 320 px;
- publicar la corrección de Referencias Lite v2;
- External Lab permanece fuera del allowlist público y sólo vive en Command Center/Drive.


## Release trigger · v0.69.9 knowledge graph + exact ghost production sync
Fecha: 2026-09-19
Motivo:
- sincronizar producción con main actual;
- publicar ghost-reference-mobile.jpg exacto y Referencias Lite v2 v0.69.7-ghost-exact;
- publicar External Lab con pipeline completo;
- publicar Knowledge Health y snapshot isl-knowledge-health-v0.1.json;
- verificar commit_ref de Netlify antes de cerrar gate móvil.

RELEASE 2026-09-19T17:45Z
- publish safe survey-results aggregate view
- add copy-to-ChatGPT survey summary
- publish Commercial Health simulated-money view
- ship exact HD ghost asset

RELEASE 2026-09-19T17:50Z
- show survey aggregate results inline
- demote Netlify to technical-detail link

RELEASE 2026-09-19T18:00Z
- expand Commercial Health with initial investment and variable-cost breakdown
- add simulated campaigns by channel
- add scenario table, funnel targets and visual cash charts

RELEASE 2026-09-19T18:10Z
- reset Lite v2 survey snapshot to zero
- show survey questions beside aggregated results
- add refresh-view control with explicit snapshot semantics

RELEASE 2026-09-19T18:20Z
- survey results show full answer options with vote counters
- Lite v2 remains reset at zero for clean testing
- Commercial Health switches to staged €1k → €5k → €15k → €50k+ investment ladder
- proof-tranche campaign reduced to €1k simulated test budget

RELEASE 2026-09-19T18:35Z
- add live anonymous survey aggregate endpoint
- mirror Lite v2 submissions to live aggregate store
- make survey results refresh truly live
- preserve full questions, options, vote counts and open answers

RELEASE 2026-09-19T18:50Z
- rebuild Commercial Health as AI-first zero-production-cost model
- use verified platform publication fees as small baseline
- allocate cash primarily to campaigns/discovery
- add natural-language summaries and clearer visual charts

RELEASE 2026-09-19T20:30+02:00
- add short WhatsApp-safe survey routes /pilares and /referencias
- recover malformed/trailing survey paths from public 404
- adaptive Android icon uses transparent foreground over native dark background

RELEASE 2026-09-19T20:40+02:00
- remove broken public preload from Referencias survey
- add WebP ghost with JPG fallback and eager loading
- disable ghost asset caching during validation

RELEASE 2026-09-19T20:45+02:00
- use JPG ghost directly in Referencias for maximum mobile/WhatsApp compatibility
