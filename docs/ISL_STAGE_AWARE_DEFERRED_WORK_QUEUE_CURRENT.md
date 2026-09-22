# ISL · STAGE-AWARE DEFERRED WORK QUEUE · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · TRANSVERSAL · ISL ONLY

## PROPÓSITO
Evitar que tareas, ideas, revisiones, riesgos y oportunidades de importancia media/baja se pierdan o aparezcan demasiado pronto.

No todo debe ser CANON.
No todo debe ser NOW.
Pero todo lo útil debe tener:
- trigger;
- etapa;
- prioridad;
- condición de despertar;
- destino;
- criterio de cierre.

## PRINCIPIO
DEFERRED != FORGOTTEN.

Una tarea diferida duerme hasta que:
- cambia el stage;
- se cumple una dependencia;
- aparece un asset/build/proveedor/colaborador;
- llega una fecha real;
- una métrica supera umbral;
- una decisión se vuelve irreversible;
- el PRIMARY la necesita.

## ESTADOS
- PARKED
- WAITING_DEPENDENCY
- WAITING_HUMAN
- WAITING_DATE
- READY_SOON
- READY_NOW
- DONE
- DROPPED
- SUPERSEDED

## PRIORIDAD
P0 CRITICAL
P1 HIGH
P2 MEDIUM
P3 LOW
P4 NICE_TO_HAVE

Prioridad no equivale a urgencia.
Urgencia depende de trigger + stage + coste de retraso.

## STAGES
- DISCOVERY
- CORE_VALIDATION
- VERTICAL_SLICE
- CONTENT_PRODUCTION
- PUBLIC_READINESS
- STORE_PREP
- DEMO_FESTIVAL
- PRELAUNCH
- LAUNCH
- POSTLAUNCH
- PHYSICAL_SAMPLE
- PHYSICAL_PRODUCTION
- LEGAL_COMMERCIAL
- COMMUNITY_BUILD

## TRIGGERS
- ON_STAGE_ENTER(stage)
- ON_STAGE_EXIT(stage)
- ON_BUILD_AVAILABLE
- ON_HUMAN_GATE_PENDING
- ON_HUMAN_GATE_PASSED
- ON_SUPPLIER_REPLY
- ON_SAMPLE_RECEIVED
- ON_ASSET_APPROVED
- ON_RIGHTS_CLOSED
- ON_PUBLICATION_CANDIDATE
- ON_MARKETING_SURFACE_READY
- ON_EXTERNAL_RESPONSE
- ON_COLLABORATOR_JOIN
- ON_METRIC_THRESHOLD
- ON_DATE
- ON_CALENDAR_EVENT
- ON_PRIMARY_CHANGE
- ON_RELEASE_CANDIDATE
- ON_SECURITY_OR_LEGAL_RISK

## TASK RECORD
id
title
description
stage_target
priority
status
trigger
dependencies
owner
human_required
legal_gate
rights_gate
calendar_relevant
source
created_at
last_reviewed
expiry_or_revisit
next_action
done_when

## WAKE-UP LOGIC
1. Trigger occurs.
2. Score against Method Trigger Engine.
3. If score >=65 → notify/action.
4. If 35–64 → queue in next suitable briefing or close silently if reversible.
5. If <35 → keep parked unless stage changes.
6. If stage mismatch → do not interrupt.

## CALENDAR
Calendar is not a dumping ground.

Use Calendar only for:
- supplier deadlines;
- scheduled human playtests;
- legal/filing deadlines;
- festival/application deadlines;
- release/store dates;
- calls/meetings;
- sample arrival or production windows;
- actual public campaign dates.

Do NOT create calendar events for:
- vague ideas;
- someday tasks;
- low-priority creative possibilities;
- speculative milestones.

Those remain in this queue.

## RECURRING REVIEW
The Inconsciente checks:
- READY_NOW items;
- missed triggers;
- stage transitions;
- stale WAITING states;
- calendar-linked items approaching.

The monthly automation audits:
- dead queue entries;
- obsolete dependencies;
- duplicated tasks;
- things that should become hooks instead of reminders.

## ANTI-NOISE
Maximum:
- 1 newly surfaced medium/low item per briefing unless several share one dependency.
- no daily nagging;
- no duplicate reminder if already represented by event trigger;
- no resurrection of SUPERSEDED work.

## EXAMPLES
P2 · trademark clearance
Stage: PUBLIC_READINESS
Trigger: ON_STAGE_ENTER(PUBLIC_READINESS)
Status: PARKED
→ should not bother during early gameplay work.

P3 · creator outreach pack
Stage: STORE_PREP
Trigger: ON_MARKETING_SURFACE_READY
→ wake only when public materials are real.

P2 · supplier tooling clause
Stage: PHYSICAL_SAMPLE
Trigger: ON_SUPPLIER_REPLY
→ wake on relevant supplier message.

P3 · making-of short
Stage: CONTENT_PRODUCTION
Trigger: ON_ASSET_APPROVED
→ can surface after a meaningful asset, not before.

## STOP RULE
If a deferred task can be deleted with no plausible future cost, delete it.
The queue is for useful latency, not hoarding.
