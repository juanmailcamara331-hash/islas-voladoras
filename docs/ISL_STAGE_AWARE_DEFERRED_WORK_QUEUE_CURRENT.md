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


## DEFERRED · ISL MULTI-AGENT BRIDGE / NIGHT STUDIO
Estado: PARKED · HIGH VALUE · NO IMPLEMENTAR TODAVÍA
Fecha: 2026-09-23

Idea:
materializar en el futuro un puente web/backend neutral entre varias sesiones/agentes para trabajo nocturno coordinado, sin convertir varias cuentas o agentes en múltiples escritores compitiendo.

Principio:
MANY READERS · ONE WRITER.

Objetivo:
que varios agentes especializados puedan colaborar mediante estado persistente estructurado en vez de depender de conversaciones cruzadas.

Arquitectura mínima futura:
- ORCHESTRATOR / WRITER: único actor autorizado para mutar estado operativo.
- RESEARCH / CQC: lectura, contraste, papers/docs, antítesis, evaluación; sin autoridad de escritura.
- ASSET / 3D: GLB, hashes, material, runtime, Gallery; prepara pero no aprueba HUMAN GATES.
- BUILD / WEB: CI, Gallery, cache, deploy state, regresiones; no CANON.
- ARCHIVIST: Drive/Library/provenance/dedup/restore paths.

Bridge contract sugerido:
TASK_ID
PRIMARY
ACTIVE_LANE
SOURCE_OF_TRUTH
OPERATION
RISK_CLASS
INPUT_REFS
EXPECTED_OUTPUT
HUMAN_GATE
STATUS
RESULT_HASH

Concurrency guard:
- task lease / lock para cualquier WRITE;
- sólo un writer posee la mutación durante el lease;
- lectores pueden trabajar en paralelo;
- ninguna cuenta/chat/modelo se considera autoridad por sí mismo.

Persistencia:
- MASTER + CURRENT_WORK_POINTER + checkpoint + task contract son la reconstrucción de estado;
- conversaciones son evidencia/contexto, no autoridad;
- registrar before/after hash, actor, tool, result, verification y rollback cuando aplique.

Estados:
PREPARED / COMMITTED / VERIFIED / HUMAN_GATE / BLOCKED.

Integración con Night Shift:
- ventana elegida por humano cada día;
- pases independientes;
- RECOVER en cada pase;
- PARALLEL READ · SERIAL WRITE;
- una WRITE reversible máxima por pase;
- último pase = morning handoff;
- si HUMAN GATE, sólo preparar/verificar.

Seguridad:
- no usar varias cuentas para saltarse límites/plataforma;
- diseñar el sistema como multiagente legítimo con roles, permisos y trazas;
- no compartir secretos en prompts/logs;
- production/publication/spend/external contact = HUMAN GATE;
- stop on ambiguity / partial writes / auth errors / rate limits.

Roadmap recomendado:
PHASE 0: Night Shift actual + MASTER/POINTER.
PHASE 1: bridge mínimo con tasks / locks / results / human_gates / runs.
PHASE 2: sólo 2 agentes: Writer/Orchestrator + Reader/CQC.
PHASE 3: añadir especialistas sólo si la evidencia demuestra ganancia real.

Criterio de éxito:
menos fricción humana + más trabajo seguro verificado + cero carreras de autoridad.
Anti-goal:
crear una empresa de agentes administrándose entre sí mientras ISL no avanza.

Regla:
AGENTS EXIST TO REDUCE HUMAN FRICTION, NOT TO CREATE AGENT MANAGEMENT.

No crear órgano nuevo ahora.
No activar ni implementar hasta que el Night Shift simple haya producido evidencia útil.


## LADDER-AWARE DEFERRED WORK · 2026-09-24
Deferred items may now declare:
ladder_domain
current_rung
target_rung
wake_evidence
last_good
rollback.

Wake only when:
- prior rung PASS evidence exists;
- a failed rung has a specific repair;
- a dependency becomes available;
- Human Gate is explicitly ready;
- stage changes make the target rung relevant.

Do NOT wake because:
- later rung sounds more exciting;
- new reference/image appeared;
- recency suggests progress;
- another subsystem is ahead.

Example:
SKYSHIP representative combat slice
status: PARKED
wake: R5 SKYSHIP SENSOR + R6 1v1 HUMAN_READ evidence
not: “we found a cool ship image”.

Example:
protagonist paradise/late-life world
status: PARKED
wake: earlier relationship/reunion beats demonstrate remembered emotional causality
not: “we have a spectacular heaven concept”.

Queue principle:
DEFERRED RUNG != LOST RUNG.
It is protected ambition waiting for earned evidence.
