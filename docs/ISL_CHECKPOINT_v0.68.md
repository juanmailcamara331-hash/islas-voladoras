# ISL CHECKPOINT v0.68 — PREMIUM COMMAND CENTER
Fecha: 2026-09-19
Estado: MERGED · PAGES GREEN · HUMAN R2 CHECK PENDING

## Portal
Reference hierarchy adopted:
- one-line nav with icons;
- visible operational quick dock;
- hero;
- three primary cards;
- five world gates;
- utilities/platform row.

Primary 3:
1. Perfil RPG
2. Ruta ISL
3. Brújula de las Huellas

World 5:
1. Islas
2. Escenas
3. Criaturas
4. Reliquias
5. Dialéctica del mundo

Quick dock:
- Calendario
- Referencias
- Encuestas
- Registro
- Estado

Utilities:
- Galería
- PS4 Version
- Música
- Comunidad
- Herramientas
- Recreo

## Truth model
- RPG percentages are visual role-play indicators, explicitly NOT analytics.
- Route percentage comes from ISL_ROUTE_STATE_CURRENT.json.

## Validation
Feature branch:
- portal-v068-command-center
- audit run 35402646874 SUCCESS

Main:
- audit run 35402740138 SUCCESS
- Pages run 35402742611 SUCCESS

Merge:
f99ee66f0050dcdb741b2acf986efb6d1bdc12fa

## Permanent guards
- docs/ISL_PORTAL_V068_UI_ARCHITECTURE.md
- scripts/portal-v068-ui-gate.py
- .github/workflows/portal-v068-audit.yml
- build-web-preview.yml calls v0.68 gate

## Security state preserved
- PUBLIC/PRIVATE boundary CI GREEN.
- public Netlify v0.67 READY with Lite v2 forms.
- private build audit GREEN.
- ERR-DEPLOY-011 remains external credential blocker for private host deployment.
- current APK still uses GitHub Pages until private host gate is GREEN.

## R2 human check still pending
On Android:
1. nav remains one line;
2. quick dock is readable;
3. drawer Más closes on outside tap;
4. Centro / Perfil / Ruta / Aventura / Galería / Música work;
5. no welcome flash on Back;
6. no desktop zoom-out.

## Pipeline after R1/R2 GREEN
colleagues surveys → dialectical synthesis → 3 creatures → NUDOS → crossed CQC → human decision.
