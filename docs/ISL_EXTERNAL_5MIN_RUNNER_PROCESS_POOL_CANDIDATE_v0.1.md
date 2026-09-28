# ISL · EXTERNAL 5-MIN RUNNER / PROCESS POOL · CANDIDATE v0.1

Fecha: 2026-09-28
Estado: CANDIDATE · NON-AUTHORITATIVE · NO AUTO-CANON · ISL ONLY
Propósito: definir el dispatcher externo mecánico de 5 minutos que alimenta una pool de procesos y delega sólo a adapters permitidos.
No sustituye al Runner humano/ChatGPT, PRIMARY, SAFE HARBOR, MASTER ni Human Gates.

## 0 · NORTH STAR
El loop de 5 minutos NO es un cerebro creativo.
Es un sensor + dispatcher mecánico.

5-MIN LOOP
→ SENSE
→ CLASSIFY
→ DEDUP
→ ENQUEUE
→ ONE SAFE ADAPTER ACTION OR NO-OP
→ VERIFY
→ STATUS
→ STOP

Toda creatividad de identidad, CANON, gusto, publicación, contacto humano, compra o cambio de autoridad termina en WAITING_HUMAN.

## 1 · CADENCIA
Trigger externo preferente:
GitHub Actions schedule / cron cada 5 minutos.

Uso:
- chequeos mecánicos;
- lectura de estado;
- deduplicación;
- clasificación;
- verificación;
- handoff.

No usar 5 minutos para:
- ideación creativa continua;
- generación cara;
- polling innecesario;
- mensajes repetitivos;
- writes encadenados.

## 2 · PROCESS POOL
Estados:
SENSED
CLASSIFIED
READY_LOW_RISK
WAITING_HUMAN
WAITING_TOOL
RUNNING
VERIFY
PARKED
FAILED_SAFE
DONE

Nunca:
SENSED → DONE
READY_LOW_RISK → DONE sin VERIFY.

## 3 · JOB SCHEMA
Cada job debe contener como mínimo:

{
  "job_id": "stable-unique-id",
  "project": "ISL",
  "created_at": "ISO-8601",
  "updated_at": "ISO-8601",
  "source": "sensor-or-human",
  "type": "HEALTH_CHECK|DOC_DRIFT|BUILD_STATUS|DEPLOY_CHECK|PLAYTEST_REMINDER|ASSET_MISSING|QUEUE_STALE|CURATION_CANDIDATE|GENERATION_HANDOFF",
  "state": "SENSED|CLASSIFIED|READY_LOW_RISK|WAITING_HUMAN|WAITING_TOOL|RUNNING|VERIFY|PARKED|FAILED_SAFE|DONE",
  "authority_ref": "persistent-source",
  "destination": "explicit-destination",
  "adapter": "NONE|OPENAI|GEMINI|MESHY|DISCORD|MIDJOURNEY_HANDOFF",
  "risk": "LOW|MEDIUM|HIGH|CRITICAL",
  "cost_class": "ZERO|LOW|BOUNDED|UNKNOWN",
  "reversible": true,
  "idempotency_key": "stable-key",
  "input_hash": "sha256-or-equivalent",
  "human_gate": true,
  "verify_after": "explicit-check",
  "rollback": "explicit-or-NOT_APPLICABLE",
  "attempt_count": 0,
  "last_error": null,
  "provenance": []
}

## 4 · CLAIMED READY REQUIREMENTS
Un job sólo puede entrar en READY_LOW_RISK si:
- autoridad recuperable;
- destino explícito;
- adapter permitido;
- coste conocido/acotado;
- operación reversible;
- idempotency_key presente;
- verify_after definido;
- no toca CANON / PRIMARY / SAFE HARBOR / master;
- no contacta terceros;
- no publica;
- no compra;
- no depende de gusto creativo.

Si cualquiera falla:
WAITING_HUMAN / WAITING_TOOL / FAILED_SAFE / PARKED.

## 5 · PROCESS TYPES

### HEALTH_CHECK
Read-only.
Repo, artifact, endpoint, file presence, hash, CI state.

### DOC_DRIFT
Detectar ausencia/conflicto/staleness.
No reescribir autoridad automáticamente.

### BUILD_STATUS
Leer workflows/build artifacts.
No promover HUMAN_DEVICE_GREEN.

### DEPLOY_CHECK
Comprobar endpoint/alias esperado.
No hacer deploy final automáticamente.

### PLAYTEST_REMINDER
Detectar que existe pieza/pregunta madura para test humano.
Salida = recordatorio/preparación.
Nunca contactar testers por sí solo.

### ASSET_MISSING
Detectar referencia/asset esperado ausente.
No regenerar automáticamente un master.

### QUEUE_STALE
Detectar job viejo, duplicado, bloqueado o huérfano.
No inventar sustituto.

### CURATION_CANDIDATE
Proponer merge/sleep/archive/update.
No borrar automáticamente.

### GENERATION_HANDOFF
Preparar prompt/spec/input package para adapter generativo.
La ejecución depende de adapter + coste + human gate.

## 6 · ADAPTER CONTRACTS

### OPENAI / CHATGPT
Permitido:
- clasificación;
- síntesis;
- transformar input estructurado;
- preparar prompt;
- QA textual;
- comparar baseline/variant;
- generar schema/metadata auxiliar.

No permitido automáticamente:
- declarar identidad final;
- auto-CANON;
- publicar;
- contactar;
- escribir autoridad;
- decidir KEEP/KILL importante.

### GEMINI
Estado: OFFICIAL API AVAILABLE.
Permitido cuando exista job preparado:
- texto;
- imagen/audio/video/PDF understanding/generation según endpoint y cuenta;
- JSON/function-calling cuando ayude al dispatcher.

Guard:
no enviar material privado innecesario.
Coste/limits deben ser conocidos antes de generation.

### MESHY
Estado: OFFICIAL REST API + WEBHOOKS / MCP AVAILABLE.
Permitido:
- create task sólo con job preparado y coste acotado;
- poll/status;
- webhook completion;
- descargar output a staging;
- registrar task_id, modelo, parámetros, créditos si están disponibles.

Guard:
API key en secret store.
Nunca en repo.
Preferir webhook sobre polling agresivo.
Generation de alto coste → WAITING_HUMAN.

### DISCORD
Estado: OFFICIAL WEBHOOKS AVAILABLE.
Permitido:
- notificaciones de estado;
- human handoff;
- avisos compactos;
- enlaces/IDs de job.

No usar Discord como autoridad.
Webhook secret fuera de repo.

### MIDJOURNEY
Estado: HUMAN_HANDOFF BY DEFAULT.
Razón:
las guías actuales indican que la automatización no autorizada / third-party scripts están prohibidos y no existe API pública general para automatizar el servicio salvo excepciones explícitas.

Permitido:
- preparar prompt;
- preparar reference package;
- enviar al humano por Discord un handoff;
- humano ejecuta /imagine o equivalente;
- resultado vuelve a pool manualmente o por un canal permitido.

Prohibido:
- self-bot;
- browser automation;
- simular usuario;
- scripts no autorizados contra Midjourney;
- scraping de resultados privados.

Si en futuro existe acceso API oficial/expreso:
crear adapter nuevo tras verificación legal/técnica.
No asumirlo por recencia.

## 7 · 5-MIN EXECUTION ALGORITHM
1. READ queue.
2. READ current mechanical signals.
3. DEDUP by idempotency_key/input_hash.
4. CLASSIFY new signals.
5. Sort:
   A. verification due
   B. failed-safe needing read-only diagnosis
   C. ready low-risk mechanical
   D. human/tool waits
6. Select MAX ONE actionable job.
7. Preflight.
8. Execute adapter.
9. Persist output/status.
10. VERIFY.
11. Mark DONE only after verification.
12. STOP.

No chained generation.

## 8 · RATE / COST GUARDS
- 5-minute cadence does NOT imply one external generation every 5 minutes.
- Default external generation budget = ZERO unless job explicitly authorizes bounded cost.
- Same idempotency key cannot generate twice.
- attempt_count max default = 1 for write/generation per run.
- after timeout on write/generation: UNKNOWN_WRITE_STATE → FAILED_SAFE until independent verification.
- polling must back off according to provider/task state; prefer webhooks.

## 9 · SECRET MODEL
Recommended secret separation:
OPENAI_API_KEY
GEMINI_API_KEY
MESHY_API_KEY
DISCORD_WEBHOOK_URL

Rules:
- secrets store only;
- no plaintext repo;
- least privilege;
- one provider key per environment/use where possible;
- rotate independently;
- never echo secret into logs;
- redact errors.

MIDJOURNEY:
no credential automation in this runner by default.

## 10 · AUDIT TRACE
Per execution:
run_id
trigger_time
queue_version/hash
selected_job_id OR NO_OP
adapter
read/write classification
request fingerprint
result status
verification
cost known/unknown
human_gate
error/stop reason

Logs must be sufficient for diagnosis without storing sensitive content unnecessarily.

## 11 · HUMAN NOTIFICATION POLICY
Notify only when:
- WAITING_HUMAN blocks a useful next step;
- FAILED_SAFE needs intervention;
- verified output is ready for human read;
- meaningful playtest is ready;
- cost/permission is needed.

No “still checking” spam.
No duplicate notifications without material state change.

## 12 · SAFETY STOP
Immediate STOP / FAILED_SAFE:
- unexpected 401/403/404;
- conflicting authority;
- truncated/partial provider result;
- duplicate writer detected;
- missing provenance;
- unknown cost for paid generation;
- ambiguous destination;
- missing rollback for a write;
- uncertain previous write;
- provider policy uncertainty;
- suspected secret exposure.

## 13 · INTERACTION WITH CHATGPT RUNNER
External runner = fast mechanical circulation.
ChatGPT/ISL Sigue Runner = reasoning, synthesis, safety, continuity, human-facing interpretation.
Human = authority.

The external runner can enqueue:
NEEDS_REASONING / NEEDS_HUMAN_READ.

It must not pretend to be the creative author.

## 14 · THEMATIC CONTINUITY
A job derived from a human `SIGUE` or active creative lane must carry:
thread_id
active_entity
creative_intent
protected_grammar
human_signature_notes
do_not_touch
next_natural_beat

The 5-minute runner may preserve and route these fields.
It may NOT mutate them by itself.

## 15 · INITIAL POOL
Start with only these mechanical jobs:
P1 REPO_HEALTH
P1 PRIVATE_DEPLOY_HEALTH
P1 BUILD_STATUS
P1 REQUIRED_DOC_PRESENCE
P1 QUEUE_DEDUP
P2 PLAYTEST_DUE_SENSOR
P2 ASSET_STAGING_VERIFY
P2 GENERATION_HANDOFF_PREP

Do not activate creative generation jobs initially.

## 16 · ACCEPTANCE TESTS
A. same signal repeated 20 times → one job, no spam.
B. provider timeout after POST → no blind retry.
C. Midjourney job → HUMAN_HANDOFF, never automated invoke.
D. Meshy completed webhook → VERIFY, not DONE directly.
E. missing authority file → no write/generation.
F. unknown paid cost → WAITING_HUMAN.
G. two workers race → idempotency prevents duplicate action.
H. Discord notification fails → job remains valid; Discord is not authority.
I. human rejects candidate → PARK without changing source.
J. stale task → surfaced once, not resurrected automatically.

## 17 · IMPLEMENTATION ORDER
PHASE 0 — schema + dry-run queue.
PHASE 1 — GitHub mechanical sensors every 5 min.
PHASE 2 — Discord notifications.
PHASE 3 — OpenAI/Gemini read/synthesis adapters.
PHASE 4 — Meshy controlled task adapter + webhook.
PHASE 5 — Midjourney HUMAN_HANDOFF integration.
PHASE 6 — only after real evidence, consider additional adapters.

## FINAL RULE
FAST LOOP MOVES INFORMATION.
SLOW LOOP MOVES DECISIONS.
HUMAN MOVES AUTHORITY.
