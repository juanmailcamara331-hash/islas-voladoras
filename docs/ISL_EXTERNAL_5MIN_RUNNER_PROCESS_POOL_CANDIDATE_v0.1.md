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


## 18 · PRODUCTION PLANNER / A++ CALENDAR & COST SIMULATION · 2026-09-28

Estado:
CANDIDATE EXTENSION · SIMULATION ONLY · NOT A FORECAST · HUMAN APPROVAL REQUIRED

### PURPOSE
El runner externo no sólo debe vigilar procesos.
Debe ayudar a cuadrar:
- documentos;
- recordatorios;
- capacidad de herramientas;
- generaciones;
- pruebas humanas;
- Unreal readiness;
- producción de contenido;
- QA;
- calendario;
- gasto;
- ventanas de revisión.

No puede transformar una simulación en compromiso de fecha o presupuesto sin decisión humana.

### CORE RULE
TIME / COST / QUALITY must be modeled together.

FASTEST ≠ BEST.
CHEAPEST ≠ BEST.
MOST AUTOMATED ≠ BEST.

Target:
highest sustainable quality with visible schedule risk and enough human review.

### MASTER CALENDAR LAYERS

#### L0 · 5-MIN MECHANICAL LOOP
Purpose:
health / queue / dedup / reminders / adapter status.

No creative generation by default.

#### L1 · DAILY PRODUCTION WINDOW
Purpose:
prepared prompts;
small generations;
asset staging;
build verification;
issue triage.

Expected human rhythm:
1–3 focused production blocks/day when active.

#### L2 · WEEKLY HUMAN QUALITY LOOP
Purpose:
playtest;
visual read;
argument coherence;
fun/comprehension;
landing/dossier reads;
KEEP/MUTATE/PARK.

#### L3 · FORTNIGHTLY MILESTONE LOOP
Purpose:
review milestone trajectory;
scope pressure;
Unreal/readiness;
asset backlog;
quality debt;
time/cost drift.

#### L4 · MONTHLY CURATION
Purpose:
docs;
bots;
methods;
entities;
code conventions;
cost ledger;
provider cycles;
Unreal external changes;
stale processes.

### PROVIDER / TOOL CALENDAR

MIDJOURNEY
Verified current monthly plan family exists.
Current ISL ledger: Basic cycle historically day 11.
Reminder:
T-72h before cycle boundary → inspect remaining Fast GPU time / prepared bullets.
Default:
HUMAN_HANDOFF through Discord unless official automation access is explicitly available.

MESHY
Current pricing references:
3D generation commonly uses 20–35 credits depending path/texture/model.
Runner rule:
never spend because credits exist.
T-72h before verified reset → inspect PREPARED 3D jobs.
Prefer:
multiview/source lock → image-to-3D → geometry QA → texture → runtime derivative.
Use webhooks/status rather than 5-minute generation polling where possible.

GEMINI
API is usage-priced by model/modality.
Runner should track:
estimated_input_units
estimated_output_units
model
tier
estimated_cost_before_fire
actual_cost_after
Default:
batch/flex for non-urgent offline work when technically appropriate;
interactive/priority only when latency materially matters.

OPENAI
API is usage-priced.
Use cheaper capable model for:
classification / dedup / routine transforms.
Reserve stronger model for:
complex synthesis / architecture / high-value reasoning.
Track tokens/cost by job.

DISCORD
Notification / handoff surface.
Never SOURCE_OF_TRUTH.
Midjourney prompts may be staged there for human execution.

UNREAL ENGINE
Engine cost should be modeled separately from production labor.
For games under the current royalty threshold, engine access itself is not the dominant cash cost.
Primary Unreal costs:
hardware
human engineering/art time
plugins/assets if selected
build infrastructure
QA/device testing
contractors
platform/certification work where applicable.

### UNREAL A++ ENTRY CONTRACT
Do not count serious Unreal production as started until existing Unreal Readiness gates pass:
- vertical slice stable;
- thesis survives playtest;
- HUMAN_DEVICE_GREEN where relevant;
- world/save model;
- critical entity IDs;
- asset contract;
- exact engine version freeze;
- reproducible build skeleton;
- packaged BootTest;
- validation;
- save migration test;
- screenshot baseline;
- rollback;
- device budget;
- GO humano.

### PRODUCTION PHASE SIMULATION

PHASE A · STABILIZE / HUMAN PROOF
Indicative duration:
2–6 weeks.
Deliverables:
Velaria/device proof;
Gallery/private surface health;
landing journey v1;
first real human cohort;
scope cut list;
authority clean.

PHASE B · GOLDEN VERTICAL SLICE
Indicative duration:
8–14 weeks.
Deliverables:
10–15 minute coherent golden path;
one island/world grammar;
ship/home loop;
one encounter family;
one creature relationship example;
audio/visual quality target;
save/persistence;
mobile/PC evidence;
Unreal entry decision.

PHASE C · UNREAL FOUNDATION
Indicative duration:
6–12 weeks.
May overlap late Phase B after GO.
Deliverables:
engine version freeze;
project skeleton;
entity/data import;
input;
save;
build;
tests;
profiling baseline;
one migrated encounter/cell;
asset roundtrip.

PHASE D · SYSTEM INTEGRATION
Indicative duration:
10–18 weeks.
Deliverables:
exploration;
combat;
ship loop;
roles/progression;
creatures;
world memory/Huellas;
2.5D/3D transitions;
UI/HUD;
audio framework;
content authoring tools.

PHASE E · CONTENT PRODUCTION
Indicative duration:
24–48 weeks.
Largest uncertainty.
Depends on:
number of islands;
quest/encounter count;
cinematics;
creatures;
voice/localization;
bosses;
3D density;
music;
platform targets.
Rule:
scale only grammars proven in vertical slice.

PHASE F · ALPHA / CONTENT COMPLETE
Indicative duration:
8–14 weeks.
Focus:
playthrough;
save migration;
progression;
difficulty/learning curve;
performance;
accessibility;
bug burn-down;
content coherence.

PHASE G · BETA / RELEASE CANDIDATE
Indicative duration:
8–12 weeks.
Focus:
packaged/device matrix;
controller/TV/mobile where targeted;
crash/performance;
store/public truth;
legal/IP;
localization;
support;
release rollback.

PHASE H · LAUNCH BUFFER
Indicative duration:
4–8 weeks.
Do not schedule public launch directly against nominal content-complete date.

### FULL PROJECT DURATION · SIMULATION
These are planning ranges, NOT promises.

Founder-heavy + AI + selective freelancers:
~16–28 months from stable vertical-slice program to launch-quality full game.

Microteam ~3 FTE equivalent:
~14–22 months if scope remains disciplined.

Small team ~5 FTE equivalent:
~12–20 months with higher cash burn but parallel production.

More people may reduce elapsed time only after pipelines and art/game grammar are stable.
Before that, headcount can increase coordination/rework.

### COST MODEL
Use three buckets:

CASH_TOOLS
+ CASH_EXTERNAL
+ LABOR_VALUE.

Never hide labor by calling founder time “free”.

#### SCENARIO 1 · FOUNDER-HEAVY / AI-ASSISTED
Assumption:
1 principal human + AI services + targeted freelance art/audio/engineering/QA.

Indicative external cash:
€2k–€5k/month during light development;
€4k–€8k/month during content/QA-heavy months.

18-month illustrative cash range:
~€36k–€110k.

This excludes founder salary/opportunity cost.

#### SCENARIO 2 · MICROTEAM · ~3 FTE
Illustrative loaded labor assumption:
€3.5k–€5k per FTE/month average cash cost.

Team labor:
~€10.5k–€15k/month.
Plus tools/contractors/devices/services:
~€2k–€6k/month.

18-month illustrative range:
~€225k–€380k.

#### SCENARIO 3 · SMALL A++ INDIE TEAM · ~5 FTE
Illustrative loaded labor assumption:
€3.8k–€5.5k per FTE/month.

Team labor:
~€19k–€27.5k/month.
Plus specialist contractors, audio, QA, hardware, services:
~€4k–€10k/month.

18-month illustrative range:
~€414k–€675k.
24-month range may exceed:
~€550k–€900k.

These are planning bands, not market quotes.

### TOOL CASH BUDGET · PLACEHOLDER BAND
Until real invoices/account caps are connected:

AI / image / video / 3D:
€100–€800/month typical experimental band.

Cloud / CI / storage / hosting:
€25–€300/month early;
higher only with real load.

Marketplace/plugins/reference assets:
€0–€500/month average smoothing;
large one-off purchases require Human Gate.

Devices/test hardware:
reserve €1k–€5k over project depending target matrix.

Audio/music/mastering/VO:
UNKNOWN until content plan.
Model as separate production package, not miscellaneous.

Legal/IP/accounting/store/certification:
UNKNOWN until release/campaign scope.
Must appear as explicit reserve before S6/S8/S9.

### CONTINGENCY
Planning rule:
- vertical slice: +20% schedule contingency;
- integration/content: +30%;
- release/certification/public commitments: +40% contingency until historical velocity exists.

Do not consume contingency as planned feature capacity.

### VELOCITY MODEL
After 4–6 real production weeks, replace generic estimates with measured velocity:

planned_work_units
completed_verified_units
rework_units
human_review_wait
tool_wait
bug/regression load
cost_actual
quality_fail_rate.

Use median / rolling window.
Do not extrapolate from one heroic week.

### QUALITY-TIME CONVERGENCE MATRIX
For each milestone track:

QUALITY_FLOOR
weakest critical dimension.

QUALITY_MEDIAN
middle quality across clarity / agency / feel / desire / robustness.

TIME_TO_VERIFIED
elapsed time from READY to verified.

REWORK_RATIO
rework hours / total milestone hours.

HUMAN_WAIT
time blocked on necessary human read.

TOOL_WAIT
provider/build/render wait.

CASH_BURN
actual cash in milestone.

SCOPE_DELTA
added/removed work after milestone start.

Goal:
reduce TIME_TO_VERIFIED and REWORK_RATIO without lowering QUALITY_FLOOR or HUMAN CREATIVE SIGNATURE.

### RUNNER CALENDAR ACTIONS

Every 5 minutes:
- health/dedup/status only.

Every day:
- identify max 1–3 jobs that are truly READY;
- estimate cost/time before generation;
- prepare provider handoffs;
- update blocked states.

Every week:
- human test due?
- quality weakest link?
- Unreal gate movement?
- provider capacity likely to expire?
- scope added without removing anything?
- one-week cost vs plan.

Every 2 weeks:
- milestone receipt;
- schedule drift;
- rework;
- throughput;
- blockers;
- next milestone;
- explicit scope cut if >20% drift.

Every month:
- provider subscription cycles;
- bots/docs curation;
- Unreal/version/plugin watch;
- budget actual vs simulated;
- forecast range update;
- archive dead jobs.

### REMINDER EVENTS TO ENQUEUE

PROVIDER_CYCLE_T72
PLAYTEST_DUE
HUMAN_READ_DUE
MILESTONE_REVIEW_14D
MONTHLY_CURATION
UNREAL_GATE_REVIEW
UNREAL_VERSION_FREEZE_REVIEW
BUILD_REGRESSION_DUE
BUDGET_VARIANCE_REVIEW
SCOPE_DRIFT_ALERT
LEGAL_IP_GATE
RELEASE_BUFFER_CHECK

No reminder should fire merely because time passed if no relevant state exists.

### DISCORD PRODUCTION BOARD
Discord can receive compact status cards:

READY TO FIRE
WAITING HUMAN
VERIFY
FAILED SAFE
MILESTONE DRIFT
BUDGET DRIFT
PLAYTEST DUE

Each card:
job_id
what
why now
expected time
expected cost
human action
destination
rollback/guard.

No methodology dump.

### CALENDAR OUTPUT
Runner should maintain a machine-readable planning view:

milestone_id
stage
start_window
target_window
confidence
dependencies
human_gates
tool_gates
estimated_person_days
estimated_cash
contingency
quality_floor
status
schedule_variance
cost_variance
next_decision.

### FIRST CALENDAR BASELINE · DO NOT PROMOTE
Starting 2026-09-28:

NOW:
stabilize / human proof / landing / external runner dry-run.

NEXT:
golden vertical slice.

AFTER HUMAN GO:
Unreal foundation.

Only after Unreal foundation evidence:
system integration.

Only after system integration:
content scale.

Do not date LAUNCH yet.
Use date windows only after vertical slice + 4–6 weeks measured production velocity.

### DECISION RULE
A++ is not a deadline adjective.

A++ means:
high quality floor
+ coherent identity
+ reproducible pipeline
+ human evidence
+ controlled scope
+ enough release buffer.

If calendar and quality conflict:
first cut scope;
then adjust sequence;
then add capacity;
deadline compression comes last.

## FINAL PLANNING PRINCIPLE
SCHEDULE THE EVIDENCE, NOT THE HOPE.
