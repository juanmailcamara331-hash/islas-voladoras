# ISL CHECKPOINT v0.66.1 — R2 PHYSICAL + SURVEYS LITE
Fecha: 2026-09-19
Estado: SAFE CHECKPOINT

## Estado de gates
R3: GREEN para surveys v1.
- Netlify Forms operativo.
- 1/1 submission de prueba recuperada en Pilares.
- 1/1 submission de prueba recuperada en Referencias.
- cohort=friends-01.
- survey_version=v0.65-r3.
- survey_source=isl-native-netlify.

R2: AMBER cercano a GREEN.
Verificado físicamente:
- Atrás desde encuesta vuelve correctamente al Centro de Mandos.
- flash de bienvenida eliminado y verificado.

Pendiente de recheck físico:
- drawer Más cierra al tocar fuera;
- bloque AHORA visible y útil;
- navegación primaria responde;
- finalNav nunca rompe a dos líneas.

R1: AMBER por cierre físico completo.
Pendiente:
- 3 cold starts consecutivos;
- shell navegable <=2s;
- back/resume sin estado muerto;
- viewport sin zoom-out desktop.

## Bugs cerrados / activos
ERR-UI-007
- drawer Más no cerraba tocando fuera.
- fix: setDrawer(), outside pointerdown, selección y Escape.
- status: FIXED_PENDING_HUMAN.

ERR-UX-008
- tareas temporales enterradas.
- fix: #currentActions con máximo 2–3 acciones de fase.
- status: FIXED_PENDING_HUMAN.

ERR-ANDROID-009
- flash de bienvenida al volver atrás.
- fix pre-render native-entered.
- status: FIXED_VERIFIED.
- verified_on_physical_android: 2026-09-19.

ERR-FORM-010
- submit parecía muerto si faltaba required fuera del viewport.
- fix: feedback inline + scroll/focus + estado GUARDANDO.
- status: FIXED_PENDING_HUMAN.

## Surveys Lite v2
Publicadas en código main, paralelas a v1:
- portal/poll/pilares-lite-v2.html
- portal/poll/referencias-lite-v2.html

UX:
- 1 pregunta por pantalla;
- cards grandes;
- chips táctiles;
- progreso;
- microfeedback;
- mobile-first;
- reduced-motion;
- campos abiertos mínimos;
- metadata v0.66-lite;
- campos estáticos para detección Netlify.

Command Center:
- #currentActions apunta a las Lite v2.
- v1 se conserva en drawer como rollback.

## Imágenes
Aprobadas visualmente:
- ISL summary poster.
- NO COPIAMOS, MUTAMOS poster.

Estado:
- generadas y optimizadas localmente;
- integración binaria repo pendiente;
- v2 tiene fallback de asset para no romper.

## Código / commits relevantes
- 9d7caf024daddd7a239d724940c8482d0d22befa — drawer + current actions.
- 4b819f3b710d2ff0299ebbbe001f85ec7886d5ae — no welcome flash on back.
- 231446a78ac5b3985b0b45d55689482393b9f2cd — Referencias submit feedback.
- a109b7f4cbe83e60f7680c5b692aba3f72ea0e76 — Pilares submit feedback.
- dacccfc31f69e43de43e31e1f9643d359b6871c3 / 1a6f7968... — CSS cleanup.
- 8190087478b3645f012820cd71adcf61f6d40fb9 — Pilares Lite v2 main.
- 6836e8842c8dbcf3c7b8bf73fb380b41ac609a6b — Referencias Lite v2 main.
- 3e4d6b1c73bdda368cc94717e04e60ab06322ebd — currentActions promotes Lite + v1 rollback.
- 77999b7f20e2a52b9a49f85d321685a16d581d5f — CI guards Lite.
- cdb537acdd3f2db8feb5b94f49a8af968745770c — R2 audit update.
- 33f14297363428244865e5d4d6f02d9badc225c4 — current work pointer update.
- 85d186096606ba7dbc1a7911baf551881f480026 — mark ERR-ANDROID-009 verified.

## Netlify
Site:
- islas-voladoras-isl
- site_id c743d925-3898-45f4-b8f4-b2565f60e8c1

Current deploy still observed:
- 6aadaaa8426764ffe5174cb3
- READY
- old known-good v0.65 survey deploy.

Important:
Current Netlify deploy has NOT yet picked up the v0.66.1 main changes.
Do not interpret current live behavior as proof of failure of un-deployed code.

## Pipeline lock
Do not open major new systems until R1/R2 GREEN.

After R1/R2 GREEN:
1. colleagues fill Lite surveys;
2. retrieve/synthesize evidence;
3. dialectical synthesis worksheet;
4. 3 creatures prototypes;
5. NUDOS;
6. CQC B×A;
7. human decision.

## Principle
Scientific rigor protects creative brutality.
