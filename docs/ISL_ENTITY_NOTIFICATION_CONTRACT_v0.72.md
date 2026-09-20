# ISL — ENTITY × NOTIFICATION CONTRACT v0.72
Fecha: 2026-09-20
Estado: ACTIVO

## OBJETIVO
Integrar Notification OS con la metodología completa de ISL.

Toda entidad/proceso/checkpoint relevante debe declarar:
- entity_id
- entity_type
- owner_surface
- current_state
- dependencies
- blockers
- human_gate
- evidence_source
- notification_event
- channel
- importance
- cooldown
- expires_at
- deep_link
- dedupe_key
- privacy_class
- resolved_when

## TIPOS DE ENTIDAD
MILESTONE / BUILD / PLAYTEST / SURVEY / CQC / ASSET / RIGHTS / BUG / CHECKPOINT / CAMPAIGN / FUNDING / COMMUNITY / DOCUMENT / PLATFORM / BIOGRAPHICAL_SEED / CREATIVE_LAB

## REGLA
ENTITY STATE CHANGE
→ dependency evaluation
→ relevance evaluation
→ notification candidate
→ dedupe/cooldown/privacy
→ IN_APP / LOCAL / AUTOMATION / CALENDAR / PUSH / PLATFORM
→ HUMAN ACTION
→ resolve/snooze/archive.

## PATRONES
### HUMAN GATE
Si human_gate=true y evidencia suficiente:
HUMAN_DECISION_REQUIRED → Decisions.

### BLOCKER
Si blocker impide siguiente hito:
PROJECT_BLOCKER → Ahora.
Si blocker rompe release:
RELEASE_BLOCKER → Release.

### EVIDENCIA
Survey/playtest sólo dispara cuando:
nueva evidencia + cambio útil o umbral de revisión.

### ASSET
Generación IA individual no notifica.
Asset que llega a CQC / rights / integración sí.

### DOCUMENTACIÓN
Doc nuevo no notifica.
CURRENT contradictorio, obsoleto o que bloquea una acción sí.

### CAMPAÑA
Señales comerciales nunca alteran CANON.
Notificación comercial usa canal separado.

### BIOGRAPHICAL
Sólo privado.
Nunca incluir detalle personal sensible en cuerpo de push.

## CHECKPOINT TEMPLATE ADDENDUM
Cada nuevo checkpoint debe incluir:
NOTIFICATION IMPACT
- generates_event:
- event_type:
- channel:
- human_action_required:
- cooldown:
- expiry:
- deep_link:
- dedupe_key:
- privacy:

## ANTI-OLVIDO
Un pendiente puede reaparecer sólo si:
- sigue unresolved;
- no fue dismissed permanentemente;
- supera cooldown;
- continúa desbloqueando valor;
- no existe otro evento más reciente que lo sustituya.

## DIGEST
El digest semanal se genera recorriendo entidades unresolved y las agrupa:
BLOQUEA
ESPERA HUMANO
PRUEBA FÍSICA
EVIDENCIA
DEUDA TÉCNICA
DEUDA DOCUMENTAL
RIGHTS/PRIVACIDAD
ASSETS
CAMPAÑA
CREATIVIDAD NO URGENTE
ARCHIVABLE

## DECISIÓN HUMANA
Las notificaciones organizan atención.
No toman decisiones.
