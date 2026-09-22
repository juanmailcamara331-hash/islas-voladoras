# ISL — MISSION MAP OS v0.73
Fecha: 2026-09-20
Estado: ACTIVO / CAPA DE ORQUESTACIÓN

## IDEA
Una única ontología para conectar:
DOCS ↔ ENTES ↔ ASSETS ↔ MISIONES ↔ METODOLOGÍA ↔ CALENDARIO ↔ NOTIFICACIONES ↔ EVIDENCIA ↔ DECISIÓN HUMANA.

La misión es la unidad de atención del creador. No reemplaza al documento, asset o bug: los conecta.

## MISSION CONTRACT
Cada misión declara:
- mission_id
- title
- lane
- state
- priority
- source_docs
- entities
- assets
- dependencies
- blockers
- method_gate
- evidence_needed
- human_gate
- calendar_mode
- date_if_real
- notification_event
- channel
- cooldown
- deep_link
- resolves_when
- unlocks
- privacy_class
- canon_effect

## LANES
NOW / NEXT / LATER / WAITING_HUMAN / WAITING_EVIDENCE / BLOCKED / MAINTENANCE / CREATIVE / GROWTH / PLATFORM / PRIVATE

## PRIORIDAD
P0 — bloquea trabajo / humano requerido / release-critical
P1 — siguiente hito real
P2 — trabajo paralelo valioso
P3 — oportunidad / parking / mantenimiento no urgente

## METODOLOGÍA
Toda misión atraviesa sólo los gates que necesite:
INTENT → CHEAP TEST → CQC → HUMAN EVIDENCE → HUMAN DECISION → PROMOTE/ADAPT/ARCHIVE.

Ingeniería usa T0–T8 cuando aplica.
Arte/asset usa provenance + rights + CQC visual.
Encuesta usa evidence snapshot + synthesis + human gate.
Campaña usa evidence + rights + economics + consent.

## ASSETS
Un asset no aparece como tarea suelta si no existe una acción.
ASSET_READY → misión validar asset → CQC → integrate/archive.

Asset metadata:
- asset_id
- source
- version
- rights
- provenance
- current_use
- CQC
- linked_missions
- notification_status

## DOCS
Los docs son fuente y evidencia. No convertir cada documento en misión.
Crear misión sólo si el doc define acción, revela contradicción, queda obsoleto, bloquea el siguiente paso o requiere decisión.

## ORDEN DEL DÍA
Se deriva:
1. P0 unresolved
2. WAITING_HUMAN que desbloquea más nodos
3. P1 con dependencias satisfechas
4. mantenimiento corto de alta palanca
5. una misión creativa opcional

Máximo visual recomendado: 1 AHORA grande, 2–3 SIGUIENTE, resto plegado.

## CALENDARIO
CALENDAR_MODE:
NONE — sin fecha real.
SOFT — ventana orientativa; no Calendar.
HARD — fecha/hora real; puede sincronizarse con Google Calendar.
RECURRING — revisión real periódica.

Regla: no convertir backlog en calendario. Sólo meetings, deadlines, playtests concertados, submissions, publicaciones y revisiones con fecha real.

## NOTIFICATION OS
Mission state changes emit candidates:
BLOCKED → PROJECT_BLOCKER
WAITING_HUMAN + evidence_ready → HUMAN_DECISION_REQUIRED
BUILD_READY → BUILD_READY_PHYSICAL_TEST
SURVEY_THRESHOLD → SURVEY_NEW_EVIDENCE
CQC_READY → CQC_HUMAN_GATE
SOFT_DUE → SOFT_CREATIVE_NUDGE

Notification OS aplica dedupe/cooldown/privacy.

## UNREAL BRIDGE
La taxonomía futura puede mapearse a Gameplay Tags:
Mission.State.Now
Mission.State.Blocked
Mission.Type.Playtest
Asset.State.CQC
Evidence.State.Ready
Human.Action.Required

Gameplay Tags son jerárquicos y permiten filtrar y consultar estados sin acoplar UI.

## STEAM BRIDGE
Steam wishlist/event notifications son canal de plataforma. No duplicarlas indiscriminadamente.
La misión interna registra el hito; Steam decide su entrega a usuarios.

## FUENTES EXTERNAS CRUZADAS
- Unreal Gameplay Tags: https://dev.epicgames.com/documentation/unreal-engine/using-gameplay-tags-in-unreal-engine
- Unreal Asset Manager: https://dev.epicgames.com/documentation/unreal-engine/asset-management-in-unreal-engine
- Steam Wishlists: https://partner.steamgames.com/doc/marketing/wishlist
- Señal de practicantes gamedev: conviene separar documentos, assets y tareas pero enlazarlos; el sistema debe seguir siendo ligero.
- Archive.org: sin fuente primaria suficientemente buena encontrada en esta pasada; hueco abierto, sin inventar autoridad.

## GUARDRAILS
- no CANON automático
- no fechas falsas
- no convertir métricas simuladas en promesas
- no exponer datos privados en panel público
- no duplicar avisos de plataforma
- no notificar cada commit/doc/asset
- no llenar el calendario con backlog

## RESULTADO
El Centro de Mandos debe responder en 5 segundos:
¿QUÉ HAGO AHORA?
¿QUÉ DESBLOQUEA?
¿QUÉ ESPERA DE MÍ?
¿QUÉ ESTÁ BLOQUEADO?
¿QUÉ PUEDE ESPERAR?

## PLAYER-FACING MISSION LADDER · 2026-09-22
Esta clasificación describe experiencia del jugador; NO sustituye las prioridades P0–P3 de producción.

- M0 MICROEVENTO — 10–60 s · observación/gesto/rareza · sin log obligatorio.
- M1 ENCUENTRO — 1–5 min · decisión o interacción pequeña.
- M2 SECUNDARIA — 5–20 min · coste/consecuencia/recurso/vínculo.
- M3 CADENA — varios M1/M2 conectados mediante memoria/callback.
- M4 MISIÓN MAYOR — altera una zona, regla o sistema.
- M5 HITO — cambia lectura, acceso, escala o trayectoria.

### ASCENSO
M0 → M1/M2 sólo por:
- interés demostrado;
- consecuencia real;
- callback;
- relación;
- world state;
- hito narrativo.

No promover por número de clicks.

### DENSITY ROUTER
La presentación puede variar por conducta observable:
- jugador directo → menor interrupción lateral + señal principal más limpia;
- jugador observador → más M0/M1, callbacks, detalles y oportunidades laterales;
- explorador → más rutas/secretos;
- social → más encuentros/vínculos;
- sistémico/artesano → más reparaciones, economía, crafting y consecuencias de sistemas.

Hitos M5 y verdad global del mundo permanecen compartidos.
