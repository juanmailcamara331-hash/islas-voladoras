# ISL PLAYTEST LAB + SIGNAL / TELEGRAPH LAB v0.1

Fecha: 2026-09-20
Estado: IMPLEMENTED_IN_REPO · LAB_ONLY · NOT_CANON
Human gate: REQUIRED

## Objetivo
Crear una capa de microplaytests de 2–5 minutos que observe comportamiento antes de pedir opinión.

Principio:
PLAY FIRST → SHORT FEEDBACK → BUG/EVIDENCE CAPTURE → HUMAN REVIEW

## Superficies
- portal/playtest-lab.html
- portal/signal-telegraph-lab.html
- portal/isl-global-shell.js
- scripts/navigation-link-gate.py

## Signal / Telegraph Lab v0.1
Seis rondas cortas prueban combinaciones de:
- luz
- movimiento
- sonido
- dirección
- peligro / recompensa
- señal mixta

Evidencia mínima:
- tipo de señal
- elección
- objetivo
- acierto
- tiempo de reacción
- viewport
- reduced-motion
- sonido activado
- qué entendió
- qué confundió
- qué divirtió
- bug opcional
- nota opcional
- completion marker

No se recogen nombre, email, cuenta ni fingerprint.

## Persistencia actual
v0.1 guarda evidencia sólo en localStorage del navegador y permite copiar JSON.
Esto permite validar UX sin introducir backend nuevo.

LIMITACIÓN CONOCIDA:
la evidencia aún no está centralizada. Antes de invitar testers externos de forma amplia debe añadirse un transporte público-seguro/consent-aware hacia la infraestructura Netlify existente.

## Bug Hunt
Modo opcional: ?mode=bug

Registro:
symptom → reproducibility → version/commit → root cause → fix → regression test → generalized lesson

Campos v0.1:
- action
- result
- reproducibility
- severity

Capturas de pantalla quedan fuera de v0.1 centralizado para no introducir subida de archivos ni datos innecesarios antes de definir transporte y retención.

## Canon / boundary
Todo resultado permanece:
LAB_ONLY
NOT_CANON
NOT_PRODUCTION
HUMAN_REVIEW_REQUIRED

Supporter preference, commercial interest or external research may not promote gameplay evidence automatically.

SPIELBERG boundary unchanged:
no assets, lore, code, UI, branding, project-specific visuals or concrete decisions imported.

## Regression contract
scripts/navigation-link-gate.py exige:
- ambas superficies
- shell global
- Playtest Lab link
- Signal/Telegraph link
- LAB_ONLY
- NOT_CANON
- completion marker
- Bug Hunt schema
- HUMAN REVIEW

## Creation Process Ledger entry
Problem:
Opinion-only feedback can arrive before players actually understand the mechanic.

Hypothesis:
A three-minute playable task followed by constrained feedback produces more useful evidence with low marginal cost.

Action:
Implemented Playtest Lab hub + first Signal/Telegraph microexperiment + local evidence + optional Bug Hunt + navigation regression gate.

Evidence available now:
technical existence and contract only.

Evidence NOT YET available:
human playtest results.

Human decision:
OPEN. No canon promotion.

Next experiment:
3–8 testers, after centralized safe evidence transport is added or JSON collection is deliberately handled manually for the first tiny cohort.

Transferable lesson:
instrument the smallest playable question, keep evidence and commercial intent separate, and make automation stop before human creative authority.
