# ISL · COMMAND CENTER ACTION ROUTER · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · WEB/APP · ISL ONLY

## PROPÓSITO
Conectar las acciones significativas del Centro de Mandos con la metodología sin convertir navegación trivial en burocracia.

## PRINCIPIO
CLICK ≠ DECISIÓN.
Las acciones se clasifican por impacto.

## CLASES
NAVIGATION
- abrir Galería, Docs, Ruta, volver, fullscreen.
- no preflight.

EXPLORE
- mirar assets, escuchar música, abrir escenas, revisar referencia.
- registro local opcional; no gate.

CREATE
- generar/crear asset, prompt, mockup, escena, audio, 3D.
- Quality Layer + Randomizer + Cross-Art + provenance.

TEST
- iniciar playtest, encuesta, revisar evidencia.
- Test Protocol + human gate + evidence snapshot.

DECIDE
- KEEP/ADAPT/DISCARD, elegir variante, confirmar autor.
- PC-30 + SOURCE_OF_TRUTH + human decision package.

PROMOTE
- READY_UNREAL, CANON, PUBLIC, MASTER, release.
- HARD GATE: rights/provenance + CQC + human confirmation + rollback/impact where relevant.

PUBLISH
- web/store/press/marketing.
- Legal/IP + Marketing/SEO + rights + privacy + claim verification.

PHYSICAL
- proveedor, proof, sample, production.
- physical lane + supplier/IP/tooling + sample gate.

SYSTEM
- checkpoint, CURRENT, registry, automation, connectors.
- Trigger Engine + Event Reflex + surface propagation.

## PRE-FLIGHT PACKET
For meaningful actions:
event_id
timestamp
surface
action_class
subject
intent
source_of_truth
primary
layers
rights_gate
human_gate
irreversible
next_state
destination
notes

## RANDOMIZER POLICY
CREATE: normal creative randomizer.
TEST/DECIDE: sober randomizer.
PROMOTE/PUBLISH/PHYSICAL/SYSTEM: no aesthetic randomization; only vary review depth/order/evidence.

## WEB IMPLEMENTATION
Global action router:
portal/isl-action-router.js

It:
- classifies meaningful actions;
- shows a tiny method badge when appropriate;
- stores a bounded local action trail;
- blocks nothing by default except actions explicitly marked HARD_GATE;
- provides a common API window.ISLActionRouter.

## LIMITATION
Browser local state is not visible to bots/automations by itself.
A future telemetry/backend adapter may persist selected high-value events.
Do not pretend every click already reaches the Inconsciente.

## FUTURE ADAPTER GATE
Only add remote event persistence when:
- privacy model defined;
- retention defined;
- auth/source verified;
- cost justified;
- no secrets in payload;
- user control exists.

Preferred future targets:
- internal backend / Supabase;
- PostHog only for product/interaction telemetry after explicit instrumentation gate;
- not GitHub Issues per click.

## STOP RULE
Navigation must remain playful and fast.
Only meaningful state-changing actions receive method friction.
