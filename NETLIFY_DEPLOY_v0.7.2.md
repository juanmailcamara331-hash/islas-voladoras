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
