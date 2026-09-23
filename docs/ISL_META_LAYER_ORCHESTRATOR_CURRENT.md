# ISL · META-LAYER ORCHESTRATOR CURRENT
Fecha: 2026-09-21
Estado: ACTIVE · ISL ONLY
Rol: mapa de capas + router de acciones. NO sustituye a los protocolos especializados.

## POR QUÉ EXISTE
ISL ya tiene múltiples capas transversales y lanes especializadas. El riesgo ya no es falta de método sino:
- olvidar qué capa debe activarse;
- duplicar acciones;
- abrir servicios externos sin necesidad;
- dejar una decisión sin pasar por seguridad, memoria de entes, calidad o persistencia;
- confundir una lane temporal con el PRIMARY.

Este documento actúa como META-CAPA: detecta el tipo de trabajo y activa sólo las capas necesarias.

## REGLA MAESTRA
EVENTO / IDEA / CAMBIO
→ IDENTIFICAR PRIMARY
→ CLASIFICAR TIPO
→ ACTIVAR 1–4 CAPAS RELEVANTES
→ EJECUTAR
→ VERIFICAR
→ PERSISTIR
→ VOLVER AL PRIMARY

NO activar todas las capas para cada acción.

## CAPAS ACTUALES

### M0 · NAVIGATION / PRIMARY / CHECKPOINT
Función: saber dónde estamos, qué bloquea, qué hacemos ahora y cuándo cerrar.
Fuentes:
- ISL_CURRENT_WORK_POINTER
- ISL_CHECKPOINT_MASTER_CURRENT
- checkpoints versionados
Trigger: inicio/cambio de bloque/cierre.
Salida: PRIMARY + gate + NEXT_ACTION.

### M1 · QUALITY / DIALECTIC ROUTER
Función: someter entregables y decisiones al perfil de calidad adecuado.
Fuentes:
- ISL_RECURSIVE_DIALECTIC_QUALITY_ROUTER_CURRENT
- ISL_QUALITY_ROUTER_MATRIX_CURRENT.json
Trigger: entregable significativo, promoción de estado, contradicción.
Salida: PASS / ITERATE / PARK / KILL.

### M2 · ENTITY MEMORY / SOURCE OF TRUTH / CONTEXT HYGIENE
Función: no duplicar ni contaminar referencias.
Fuentes:
- ISL_ENTITY_MEMORY_AND_ANTI_DUPLICATION_PROTOCOL_CURRENT
- ISL_CONTEXT_HYGIENE_AND_REFERENCE_AUTHORITY_PROTOCOL_CURRENT
- registros de entidades.
Trigger: creación, edición, regeneración, conversación larga.
Salida: ENTITY + OPERATION + SOURCE_OF_TRUTH + LOCKED/MUTABLE.

### M3 · HUMAN TRACE / PARTICIPATION / TESTING
Función: incorporar respuesta humana sin convertirla automáticamente en canon.
Fuentes:
- ISL_WORLD_HUMAN_TRACE_CAPTURE_PROTOCOL_CURRENT
- ISL_PARTICIPATORY_WORLD_LOOP_CANON_v1.0
- ISL_CARRILLO_HUMAN_LAB_CURRENT
- tester/playtest protocols.
Trigger: feedback, amigos/familia/testers, sesiones participativas.
Salida: TRACE_RAW / evidence / candidate decision.

### M4 · CREATIVE MOMENTUM / ARTIFACT / SURPRISE
Función: preservar energía, diversión, sorpresa y cierres visibles.
Fuentes:
- ISL_MAGISTRAL_LAZY_CREATIVE_SESSION_PROTOCOL_CURRENT
- ISL_CREATIVE_MOMENTUM_AND_ARTIFACT_LOOP_CURRENT
- ISL_META_GIFTS_MAKING_OF_AND_EASTER_EGG_TRACE_PROTOCOL_CURRENT
Trigger: sesión creativa, regalo, making-of, Easter egg, bloqueo por exceso de gestión.
Salida: artifact / trace / one pleasant next action.

### M5 · SECURITY / ACCESS / CONNECTORS / PRIVACY / PROVENANCE
Función: proteger cuentas, permisos, material privado y derechos.
Fuentes:
- ISL_SECURITY_CONNECTOR_AND_ACCESS_PROTOCOL_CURRENT
- ISL_ACCOUNT_ACCESS_AND_REMINDER_PROTOCOL_CURRENT
- provenance/rights ledgers.
Trigger: servicio nuevo, conector, publicación, colaborador, asset externo, secreto.
Salida: ADOPT / PILOT / WATCH / REJECT + permission model.

### M6 · BACKUP / STORAGE / RESILIENCE
Función: asegurar restauración y evitar dependencia de un solo soporte.
Fuentes:
- ISL_OFFLINE_BACKUP_AND_DEDUP_PROTOCOL_CURRENT
- ISL_BACKUP_RESTORE_POLICY_v0.18
- ISL_STORAGE_RESILIENCE_ARCHITECTURE_CURRENT
Trigger: asset master, release, checkpoint, migración, nueva infraestructura.
Salida: durable copy + restore path + dedup.

### M7 · PHYSICAL MATERIALIZATION
Función: pasar artefactos a objetos físicos mediante sample → CQC → decisión.
Fuentes:
- ISL_PHYSICAL_ENTITY_REGISTRY_CURRENT.json
- manufacturing specs / RFQ.
Trigger: objeto físico aprobado.
Salida: supplier pack → sample → physical CQC.
Guard: no fabricación grande antes de muestra.

### M8 · UNREAL READINESS
Función: preparar datos/assets/testing para futura migración sin iniciar Unreal antes de tiempo.
Fuentes:
- ISL_UNREAL_READINESS_MASTER_CURRENT
- ISL_UNREAL_ASSET_CONTRACT_CURRENT
- ISL_ENTITY_TO_UNREAL_MAPPING_CURRENT.json
- import/test/plugin contracts.
Trigger: entidad o sistema significativo con futuro Unreal.
Salida: readiness metadata; NO production.

### M9 · BUILD SCIENCE / TEST / REGRESSION / DEVICE
Función: que builds y superficies no rompan lo ya validado.
Fuentes:
- ISL_BUILD_SCIENCE_v0.61
- playable quality system
- virtual device testing
- regression/error registries.
Trigger: build/cambio técnico/UX/performance.
Salida: reproducible evidence + regression status.

### M10 · WORLD / CAUSAL / KNOWLEDGE GRAPH
Función: preservar relaciones, contradicciones y causalidad del mundo.
Fuentes:
- ISL_KNOWLEDGE_GRAPH_AND_RECURSIVE_AUDIT_CURRENT
- world/region/entity protocols
- participatory world loop.
Trigger: nuevo ente, región, mecánica, reliquia, regla de mundo.
Salida: relaciones + dependencies + contradictions + consequences.

### M11 · MEDIA / GALLERY / MUSIC / ASSET LIFECYCLE
Función: administrar master/runtime, galería, música, assets y publicación.
Fuentes:
- gallery library
- music CQC/provenance
- asset health / content manifests.
Trigger: imagen/audio/video/3D/publicación.
Salida: MASTER + derivative/runtime + provenance + placement.

### M12 · RULES / FORMULAS / PARAMETERS
Estado: DISTRIBUIDO — NECESITA CONSOLIDACIÓN LIGERA.
Función: fórmulas, parámetros, balances y reglas declarativas deben ser datos legibles y versionables en vez de lógica escondida.
Actualmente aparece repartido entre contratos, matrices, gameplay docs y reglas de sistemas.
Trigger: fórmula nueva, balance, probabilidad, economía, regla cuantitativa.
Salida deseada: FORMULA_ID + inputs + units + bounds + version + test + dependent systems.
Acción futura: crear registry específico sólo cuando aparezca la próxima fórmula real. No inventar trabajo ahora.

## LANES / SUPERFICIES, NO META-CAPAS
Estas NO deben confundirse con capas transversales:
- Velaria V2 P0 (PRIMARY actual)
- Recreativa / Arcade
- Physical Color Lane
- Galería 3D
- Música
- App / Web / Centro de Mandos
- PS4/PS5/Xbox targets
- Making-of
Son superficies o carriles que consumen las meta-capas anteriores.

## ROUTING RÁPIDO
Nuevo asset → M2 + M1 + M11 (+M8 si relevante).
Regalo/Easter egg → M4 + M2 + M5 + M3 si se prueba.
Nuevo conector → M5 + M6 sólo si almacena datos críticos.
Build → M9 + M1.
Objeto físico → M7 + M2 + M1 + M5.
Feedback humano → M3 + M1.
Nueva regla/fórmula → M12 + M1 + M9.
Futuro Unreal → M8, sin desplazar PRIMARY.
Cambio de PRIMARY/checkpoint → M0.
Nueva pieza de mundo → M10 + M2 + M1.

## SERVICIOS EXTERNOS — DECISIÓN ACTUAL
### GitHub
OPERACIONAL / estructura, protocolos, código, matrices, automatización reproducible.

### Google Drive
OPERACIONAL / memoria humana, briefs, artefactos, documentos y making-of.

### ChatGPT Automations
OPERACIONAL / nudges, condition watches y revisiones de baja fricción.

### Google Calendar
RESERVA / usar sólo para eventos humanos reales con fecha: pruebas, proveedor, sesiones, reuniones, hitos. No usar como motor del sistema.

### Slack / Discord / similares
NO NECESARIOS AHORA.
Sólo adoptar cuando exista equipo humano que realmente necesite un canal compartido. Un canal vacío añade ruido y otra superficie que asegurar.
Si llega ese gate, evaluar mensajería con M5 antes de conectar.

## META-BOT
Debe revisar periódicamente:
1. PRIMARY actual.
2. nuevas decisiones/entes desde última revisión.
3. capas que deberían haberse activado y no se activaron.
4. duplicaciones/conflictos.
5. documentos CURRENT desactualizados.
6. automatizaciones redundantes.
7. conectores/servicios sin función.
8. si alguna lane temporal intenta desplazar PRIMARY.
9. si hay algo que celebrar/simplificar.
10. UNA acción correctiva máxima por revisión.

No ejecutar cambios irreversibles ni crear nuevas capas automáticamente.

## ANTI-BUROCRACY RULE
Si el meta-sistema tarda más que la creación que protege, está fallando.
Una acción simple no debe pasar por doce protocolos.
Activar sólo las capas que cambian una decisión, un riesgo o una experiencia perceptible.

## META STOP RULE
Si todo está coherente:
NO HACER NADA.


## ALWAYS-ON PROMPT PREFLIGHT
For every substantive ISL prompt, run this silently before acting:
1. PRIMARY
2. ENTITY / SUBJECT
3. OPERATION
4. SOURCE_OF_TRUTH
5. 1–4 relevant meta-layers
6. irreversible-risk check
7. duplication/context-contamination check
8. smallest useful action

Do not expose this checklist unless a conflict, risk, ambiguity or gate requires human attention.

## NEW-CONVERSATION BOOT
When starting a fresh ISL conversation, reading ISL_CURRENT_WORK_POINTER + ISL_META_LAYER_ORCHESTRATOR_CURRENT is enough to reactivate the routing model before loading only the task-relevant CURRENT docs.


## AUTO-CLOSE RULE · HUMAN TRACE → VISUAL ASSET
When a significant human trace produces a visual artifact during the session:
M3 HUMAN TRACE + M2 SOURCE OF TRUTH + M11 MEDIA/GALLERY (+M4 when gift/making-of applies)
→ persist the asset in Drive/Gallery
→ record provenance and state
→ cross-link it to the originating human trace
→ never auto-promote it to CANON
→ return to PRIMARY.
The user should not need to manually remind the system to close this loop.


## EXECUTABLE PREFLIGHT GATE · 2026-09-23
The existing ALWAYS-ON PROMPT PREFLIGHT is now executable through:
`scripts/isl-preflight-gate.py`

Purpose:
- enforce the existing contract, not create a new meta-layer;
- verify repository-side authority invariants before substantive work;
- require SUBJECT / OPERATION / SOURCE_OF_TRUTH / 1–4 relevant layers for substantive mutations;
- return explicit states: PASS / NEED_RECOVERY / AUTHORITY_DRIFT / HUMAN_GATE / BLOCKED;
- require explicit human approval for PROMOTE / PUBLISH / PHYSICAL;
- never auto-promote CANON or redefine SAFE HARBOR.

CI mode:
`python3 scripts/isl-preflight-gate.py --authority-only`

Task mode example:
`python3 scripts/isl-preflight-gate.py --subject "secondary piece" --operation mutate --source-of-truth "docs/..." --layers M2 M1 M10`

Important boundary:
This executable checks the GitHub/repository side. Drive↔GitHub MASTER alignment remains covered by the scheduled authority audit and human-visible recovery when drift is detected.

Guard:
NO_BOOT_NO_WORK · RECENCY_NOT_AUTHORITY · NO_SOURCE_NO_MUTATION.


## GUIDED WORLD / MINIMAL HUD INHERITANCE · 2026-09-23
For world/zone/HUD/navigation/combat/replay creation, inherit:
docs/ISL_GUIDED_WORLD_HUD_AND_PLAYFLOW_DIRECTION_CURRENT.md

Orchestrator rule:
- WORLD should carry orientation before HUD;
- semi-open authored zones outrank generic open-world expansion;
- diegetic progression gates outrank arbitrary locks;
- local archetype/Huella/replay variation may mutate interior experience without destroying macro-rumbo;
- reference family remains functional, never surface authority.

This is a design direction, not a new meta-layer.


## ORGANISM HEALTH / CURATION INHERITANCE · 2026-09-23
Use docs/ISL_ORGANISM_CURATION_AND_VISUAL_HEALTH_CURRENT.md when:
- current docs become redundant;
- boot grows noisy;
- authority duplicates;
- automation prompts overlap;
- a new surface needs project-health visualization;
- a major generation risks inheriting too much context.

Routing rule:
load only relevant organ health + strongest locks + one risk + one unresolved question.
Do not dump the full organism into every task.


## SESSION / WORK ORDER ROUTING · 2026-09-23
Purpose:
keep every working session —human-active or automated/night— oriented by:
FROM → NOW → BLOCKER → SAFE NEXT → HUMAN GATE → AFTER.

This is NOT a new meta-layer. It extends M0 NAVIGATION and coordinates existing layers.

At the start of every substantive session:
1. FROM: identify the last verified state and relevant preserved baseline.
2. NOW: identify the single active lane.
3. BLOCKER: identify the nearest unresolved gate.
4. SAFE NEXT: choose the smallest action that actually reduces that blocker.
5. HUMAN GATE: mark any point requiring taste, authority, privacy, publication, money or irreversible change.
6. AFTER: keep at most 1–3 queued next actions; everything else stays PARKED.

Rules:
- one active construction lane by default;
- one prepared next lane allowed;
- one background maintenance lane allowed only if it cannot mutate the active creative decision;
- historical/recovered ideas are PARKED until explicitly reactivated;
- a strong old artifact may remain reference without re-entering production;
- no new lane may jump ahead of an unresolved HUMAN GATE merely because it is exciting or recent.

Night Shift inheritance:
- each automated pass re-runs this order from persistent authority;
- automated work may advance SAFE NEXT only;
- if BLOCKER is HUMAN GATE, background work switches to READ_ONLY / preparation / verification;
- last pass produces morning handoff using FROM / NOW / BLOCKER / DONE / NEEDS HUMAN / NEXT.

Checkpoint rule:
session-order cleanup alone does not justify a checkpoint.
Checkpoint only when existing structural thresholds are met.

Anti-chaos shorthand:
ONE ACTIVE · ONE NEXT · REST PARKED.
