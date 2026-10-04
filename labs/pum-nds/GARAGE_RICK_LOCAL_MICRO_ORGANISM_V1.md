# ISL PUM NDS · GARAGE RICK LOCAL MICRO-ORGANISM v1

Fecha: 2026-10-04
Estado: LAB ONLY · NO CANON · HUMAN-GATED · REVERSIBLE · SPOILER-LOCKED
Hardware target: laptop RTX 5060 + 32 GB RAM
Scope: companion local process for the portable blind lab. It may observe and derive candidates; it may never overwrite ISL authority.

## 0 · PURPOSE

Mientras el humano juega, Garage Rick puede correr localmente y convertir trazas observables en relaciones candidatas.

Objetivo:
hacer visible una parte mayor de la RUTA ASOCIATIVA sin fingir lectura del inconsciente.

Puede investigar:
- qué entradas precedieron una asociación espontánea;
- qué ideas aparecieron cerca en el tiempo;
- qué motivos visuales, verbales o jugables reaparecen;
- qué conexiones sobreviven entre sesiones;
- qué cambió después de un estímulo;
- qué relación inesperada merece un test barato.

No puede afirmar:
- "esto es lo que pensó tu inconsciente";
- diagnóstico;
- intención oculta;
- verdad emocional;
- personalidad;
- canon.

## 1 · EPISTEMIC LAW

UNCONSCIOUS CONNECTIONS ARE NOT DIRECTLY OBSERVABLE.

Sí son observables:
stimulus
→ latency
→ spontaneous utterance
→ gesture / drawing / voice features
→ game action
→ later recall
→ repeated association
→ human confirmation/rejection.

Garage Rick guarda el recorrido y produce:
ASSOCIATION_CANDIDATE

con:
confidence
provenance
uncertainty
human_status.

Nunca:
INFERENCE = FACT.

## 2 · LOCAL ARCHITECTURE

INGEST
→ NORMALIZE
→ EMBED
→ TEMPORAL GRAPH
→ ASSOCIATION CANDIDATES
→ DEDUP
→ CHEAP LOCAL RANK
→ PROCESS POOL
→ OPTIONAL EXTERNAL REASONING
→ HUMAN GATE.

Componentes locales por defecto:
- file/event watcher;
- SQLite append-only event store;
- embeddings;
- vector index;
- temporal/semantic graph;
- small local LLM for tagging/summarization;
- deterministic rules;
- queue/scheduler;
- compact local status surface.

OpenAI/ChatGPT:
optional external reasoning.
Never permanent authority.
Never required for the local fast loop.

## 3 · HARDWARE STRATEGY

Target machine:
- RTX 5060 Laptop GPU;
- 32 GB system RAM.

Use the GPU for:
- embeddings;
- local inference;
- partial/full layer offload where model size permits.

Use system RAM for:
- vector index;
- event store;
- larger quantized model spill/partial offload;
- process pool;
- caches.

Default policy:
small/medium quantized model first.
Do not chase the largest model that technically loads.

Priority:
LOW LATENCY
+ LOW HEAT
+ LOW POWER
+ STABILITY
+ ENOUGH REASONING.

## 4 · WHY NOT TRAIN CHATGPT LOCALLY

Do not attempt to train a frontier ChatGPT model locally.

The laptop is for:
- inference;
- embeddings;
- clustering;
- retrieval;
- classification;
- summarization;
- graph building;
- evals;
- later, optional small LoRA/adapters on an appropriate local open model.

Before any weight update:
1. establish retrieval baseline;
2. establish eval suite;
3. collect Human-approved positive/negative examples;
4. prove prompt + retrieval is insufficient;
5. train only a reversible derivative model;
6. compare to baseline;
7. never replace authority files.

## 5 · SOUL / HEART / SKIN / ORGANS PROTECTION

SOUL
- human root meaning / non-negotiable intention.

HEART
- recurring emotional/relational function accepted by Human Gate.

SKIN
- presentation / aesthetic expression; can mutate more freely.

ORGANS
- mechanics / systems / pipelines.

RICK may:
- observe;
- retrieve;
- compare;
- suggest;
- trace;
- stage cheap experiments.

RICK may not:
- rewrite SOUL;
- declare HEART;
- silently mutate protected grammar;
- create new ORGANS if an existing organ can carry the function;
- promote SKIN experiments to identity;
- overwrite PRIMARY / SAFE HARBOR / CANON authority.

Every candidate carries:
protected_layers_touched[]
risk_to_identity
rollback
human_gate=true.

## 6 · EVENT SCHEMA

event_id
timestamp_monotonic
wall_clock
session_id
source_type
source_ref
stimulus_hash
modality
raw_ref
transcript_if_any
observable_features
game_context
latency_from_prior_salient_event
privacy_class
spoiler_class
provenance
confidence=OBSERVATION.

Derived interpretation never contaminates raw fields.

## 7 · ASSOCIATION EDGE

edge_id
from_event
to_event
relation_types[]
temporal_distance
embedding_similarity
recurrence_count
cross_session_count
human_confirmations
human_rejections
causal_status=UNKNOWN|SUPPORTED|REJECTED
novelty
usefulness
memorability
test_cost
human_status=PENDING|KEEP|MUTATE|PARK|KILL
derivation_version
provenance[].

Raw evidence is preserved.
Edges are disposable.

## 8 · MULTIMODAL INPUT

Possible inputs:
- gameplay events / save / Playtrace;
- screenshots or referenced images;
- spontaneous text;
- voice transcript;
- acoustic features;
- drawing trace;
- gesture timing;
- notes;
- prompts/results from external services;
- explicit human reactions.

Acoustic/drawing features remain observational.

Never infer:
diagnosis
latent emotion as fact
hidden motive
personality truth.

## 9 · SPONTANEOUS ASSOCIATION CAPTURE

One-tap / one-utterance capture records:

NOW
+ previous salient N events
+ short following window
+ voice/text/photo optional
+ zero mandatory questionnaire.

The human should not need to stop playing.

Later Rick may ask only if useful:
"¿esta conexión te parece real o casual?"

Default:
do not interrupt.

## 10 · PROCESS POOL

Local states:
SENSED
CLASSIFIED
READY_LOCAL
WAITING_EXTERNAL
WAITING_HUMAN
RUNNING
VERIFY
PARKED
FAILED_SAFE
DONE.

Rick fast loop may run every minute or faster internally, but:
- no external generation is implied;
- no paid call is implied;
- no new creative branch is implied;
- no notification is implied.

Default tick:
READ
→ DEDUP
→ UPDATE GRAPH
→ SELECT MAX ONE CHEAP LOCAL JOB
→ VERIFY
→ STOP.

## 11 · LOCAL JOB TYPES

TRACE_INGEST
TRANSCRIPT_INGEST
EMBED_NEW
TEMPORAL_LINK
SEMANTIC_LINK
RECURRENCE_CHECK
CONTRADICTION_CHECK
ASSOCIATION_CANDIDATE
MILESTONE_MATCH
HIT0_MATCH
PAPER_EVIDENCE_PACKET
PROMPT_PREP
EXTERNAL_REASONING_REQUEST
HUMAN_READ_REQUEST.

No autonomous CANON_WRITE.
No autonomous MASTER_EDIT.
No autonomous PUBLISH.

## 12 · HITO MATCHING

Every new event/candidate is compared against:
LAB_MILESTONE_TRACE_V1.json

Possible result:
- supports existing hito;
- contradicts existing hito;
- extends existing hito;
- possible new hito candidate;
- noise/no-op.

A new hito is never auto-promoted.

## 13 · REACTIVOS METAFÍSICOS

Rick can detect candidate collisions among:
visual
text
voice
gameplay
memory
scientific idea
pop-culture association
error
material reference
human joke
unexpected external result.

It may propose:
REACTANT_SET
+ why these might collide
+ cheapest test
+ protected grammar
+ risk
+ return path.

It cannot:
fire expensive generation automatically
or declare the collision meaningful.

## 14 · EXTERNAL SERVICES

External adapters are optional accelerators.

Default routing:
LOCAL FIRST.

Use external reasoning/generation only when:
- local confidence is insufficient;
- task materially benefits;
- cost is known/bounded;
- provenance can be preserved;
- Human Gate allows the class of operation.

Return path:
OUTPUT
→ VERIFY
→ NORMALIZE
→ PROVENANCE
→ COMPARE
→ HUMAN
→ KEEP/MUTATE/PARK/KILL.

## 15 · LEARNING WITHOUT CORRUPTING ISL

Rick learns primarily through:
RETRIEVAL + GRAPH + HUMAN FEEDBACK.

Human feedback examples:
KEEP
MUTATE
PARK
KILL
REAL_CONNECTION
COINCIDENCE
USEFUL
PRETTY_BUT_EMPTY
TOO_LITERAL
TOO_CLEVER
WRONG_SOUL.

These labels train ranking before they ever train weights.

Weight training is optional and late.

## 16 · EVALS BEFORE TRAINING

Minimum eval pack:

A. identity preservation
Does candidate preserve protected grammar?

B. provenance
Can every claim trace to evidence?

C. uncertainty
Does model distinguish observation from inference?

D. usefulness
Does candidate create a cheap useful test?

E. repetition
Does it avoid rediscovering same relation?

F. spoiler discipline
Does it avoid exposing sealed game content?

G. human alignment
Does historical KEEP/MUTATE/PARK/KILL predictably affect ranking?

H. no authority escalation
Can model ever overwrite protected files? Expected: NO.

## 17 · POWER / BACKGROUND MODE

While human plays:
- CPU/GPU target should stay modest;
- no high-batch generations;
- no long video/image generation locally;
- embeddings and graph updates preferred;
- queue work bounded;
- thermal/power budget configurable;
- heavy jobs wait for IDLE mode.

Modes:

PLAY_MODE
low power, low latency, no heavy training.

IDLE_MODE
larger local inference, re-indexing, clustering, evals.

HUMAN_PRESENT
may surface one meaningful candidate.

SLEEP
persist queue and stop compute.

## 18 · MINIMAL FIRST IMPLEMENTATION

Phase 0:
- SQLite event ledger;
- folder/file watcher;
- JSONL ingestion;
- local embedding model;
- vector search;
- temporal graph;
- process queue;
- CLI status.

Phase 1:
- R36 Playtrace ingestion;
- tablet/drawing/voice packets;
- association candidates;
- milestone matching.

Phase 2:
- compact dashboard;
- optional local LLM;
- OpenAI external reasoning adapter;
- human KEEP/MUTATE/PARK/KILL feedback.

Phase 3:
- only if evals prove need:
small local LoRA/adaptation.

## 19 · CURRENT OPERATIONAL LAW

Garage Rick is not another project.

It is a small local support organism for the blind lab.

It exists to:
NOTICE
→ CONNECT
→ TRACE
→ TEST
→ RETURN.

It does not exist to:
WRITE THE GAME FOR EVER
or
REPLACE THE HUMAN.

## ROOT LINE

MAKE THE ASSOCIATION PATH VISIBLE.
NEVER PRETEND TO SEE THE MIND.

AND:

LOCAL FIRST.
TRACE EVERYTHING.
HUMAN OWNS MEANING.
