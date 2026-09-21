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
