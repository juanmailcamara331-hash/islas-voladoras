# ISL · UNREAL FAILURE SIMULATION & HISTORICAL LESSONS · CURRENT
Fecha: 2026-09-24
Estado: ACTIVE METHOD · PREPARATION / SIMULATION ONLY · NO AUTO-CANON

## PURPOSE
Stress-test the future ISL Unreal production process before full migration by combining:
- current official Unreal guidance;
- historical game-development failure patterns;
- community-reported failure modes;
- software reliability / SRE;
- systems engineering;
- FMEA/FMECA;
- STPA/CAST;
- secure software supply-chain practice;
- fuzzing / fault injection;
- ISL's own Meta-Layer Orchestrator, U0–U8 production simulation, T0–T8 regression ladder, Visual Fidelity Ladder and human testing.

This is not a new meta-layer. It is a risk-analysis routine routed mainly through M8 + M9 + M1, with M0/M2/M5/M12/M3/M11 when materially relevant.

## SOURCE HIERARCHY
1. official Unreal/Epic docs, release notes and source/tool behavior;
2. standards/research: NASA, NIST, MIT STPA, Google SRE/research and equivalent primary sources;
3. credible production postmortems / conference talks / archived historical material;
4. community evidence such as Reddit/forums for recurring failure modes, never as sole technical authority;
5. ISL simulation and target-device evidence;
6. human playtest evidence.

Archive.org is a historical evidence reservoir, not an authority by itself.
Community anecdotes generate hypotheses; official docs/tests decide engine truth.

## HISTORICAL FAILURE LESSONS ABSTRACTED
Recurring community patterns worth simulating:
- packaging only near release exposes hidden editor-vs-package differences too late;
- stale/missing asset references and redirectors can break cook/package/startup;
- moving/renaming content late can produce large dependency and recovery costs;
- prototype/marketplace/test content mixed into production creates ambiguity and build pollution;
- visual/animation polish can become coupled to feature logic too early;
- manual long-session testing creates fatigue and misses reproducible guards;
- bugs fixed without regression tests recur;
- refactors that detach systems without contract tests can create long repair tails.

These are hypothesis inputs, not universal laws.

## SCIENCE / ENGINEERING CROSS

### FMEA / FMECA
For each milestone/entity/system:
FUNCTION → FUNCTIONAL FAILURE → FAILURE MODE → CAUSE → EFFECT → DETECTION → MITIGATION → REGRESSION GUARD → ROLLBACK.

Use severity / likelihood / detectability qualitatively unless evidence supports numbers.
Do not invent false precision.

### STPA
Use when failure emerges from interactions rather than one broken component.
Model:
CONTROLLER → CONTROL ACTION → CONTROLLED PROCESS → FEEDBACK.
Ask:
- action not provided when needed;
- unsafe action provided;
- action too early/late/out of order;
- action lasts too long/stops too soon.

Useful for:
save/load, streaming, quest/world state, input/UI, multiplayer later, build/deploy, external connectors and human-in-the-loop tooling.

### SRE
Translate:
- SLO → milestone reliability target;
- error budget → tolerated instability before feature work freezes;
- incident → reproducible bug/regression;
- blameless postmortem → causal learning;
- toil → repeated manual work to eliminate.

ISL version:
if reliability budget is exhausted by repeat build/save/import failures, stop adding features and repair the pipeline.

### FAULT INJECTION / FUZZING
Perturb interfaces and state, not creative identity:
- missing asset;
- wrong tag;
- duplicate isl_id;
- stale version;
- malformed row;
- absent optional dependency;
- save from previous schema;
- interrupted write;
- renamed/moved asset;
- slow device;
- memory pressure;
- network/external connector unavailable;
- corrupted cache/runtime derivative.

Expected result:
FAIL LOUDLY + TRACEABLY + RECOVERABLY.

### SOFTWARE SUPPLY CHAIN
Maintain a lightweight dependency/provenance bill:
PLUGIN / PACKAGE / VERSION / SOURCE / LICENSE / PLATFORM SUPPORT / LAST VERIFIED / ROLLBACK.
Do not let plugin state become tribal knowledge.

## ADVERSARIAL SIMULATION DECK
Before each production milestone, draw/select only relevant attacks.

A · DATA
- duplicate ISL_ID;
- missing required field;
- incompatible schema;
- wrong units/axis;
- invalid Gameplay Tag;
- dangling soft/hard reference.

B · ASSET
- moved/renamed source;
- redirector/stale reference;
- missing texture/material slot;
- oversized mesh/texture;
- bad collision/pivot;
- MASTER unavailable but runtime exists.

C · SAVE
- previous schema;
- partial/corrupt save;
- removed entity referenced by save;
- repeated save/load;
- interrupted save;
- downgrade/rollback.

D · BUILD
- clean checkout;
- empty cache;
- cook/package;
- Shipping config;
- missing plugin;
- platform-specific path/case issue;
- Android/PC divergence.

E · WORLD
- enter/leave/re-enter;
- streaming interruption;
- state change while unloaded;
- checkpoint during transition;
- quest/encounter repeated unexpectedly.

F · UI / INPUT
- controller/touch/keyboard switch;
- focus loss;
- safe-area/extreme aspect ratio;
- pause/resume;
- input context missing or duplicated.

G · PERFORMANCE
- low tier device;
- shader/asset cold start;
- worst-case crowd/particles;
- memory pressure;
- repeated level transition.

H · EXTERNAL
- Drive/GitHub/provider unavailable;
- schema/API changes;
- expired URL;
- failed upload;
- duplicate webhook/import;
- public export out of sync.

I · HUMAN
- blind tester misunderstands goal;
- skips tutorial;
- tries unintended order;
- repeats weird action;
- gets bored before expected payoff;
- discovers exploit more fun than intended path.

## PREMORTEM TEMPLATE
Before a milestone:
1. Assume the milestone failed badly.
2. Name 5 plausible causes.
3. Map each to earliest observable signal.
4. Add cheapest prevention/detection.
5. Decide which risks are accepted.
6. Simulate the top 1–3.
7. Record expected recovery path.

## INCIDENT / BUG POSTMORTEM TEMPLATE
ID:
BUILD / ENGINE / DEVICE:
SYMPTOM:
USER IMPACT:
FIRST BAD VERSION:
LAST GOOD:
REPRO STEPS:
TRIGGER:
CONTRIBUTING CONDITIONS:
WHY DETECTION MISSED IT:
FIX:
REGRESSION GUARD:
DATA/SAVE MIGRATION IMPACT:
ROLLBACK:
FOLLOW-UP:
WHAT NOT TO GENERALIZE:

No blame. Prefer multiple contributing causes over single “root cause” stories when system interaction matters.

## MILESTONE FAILURE SIMULATIONS

### U0 BOOT
Simulate:
- clean checkout;
- no derived cache;
- plugin missing;
- wrong config;
- package from CI.
Pass only when reproducible from scratch.

### U1 ENTITY
Simulate:
- duplicate id;
- missing runtime asset;
- changed master hash;
- rename/move;
- bad material/collision;
- re-import twice.
Pass only when sync is idempotent and validation catches drift.

### U2 ENCOUNTER
Simulate:
- retry 20 times;
- exit mid-state;
- save in each meaningful beat;
- reload after failure;
- kill/park entity in source.
Pass only when encounter state cannot poison later runs.

### U3 WORLD CELL
Simulate:
- streaming edge;
- re-entry;
- state mutation unloaded;
- device memory pressure;
- fast travel/resume.
Pass only when state and performance remain coherent.

### U4 GOLDEN PATH
Simulate:
- blind play;
- weird order;
- skip dialogue;
- deliberate misuse;
- controller/touch differences.
Pass only when human can finish without developer rescue.

### U5 SCALE
Simulate:
- 10x content count;
- duplicate names;
- missing refs;
- cold cook;
- schema upgrade.
Pass only when content scale does not multiply manual work.

### U6 REGRESSION
Simulate:
- old bugs;
- save migrations;
- screenshot/lighting drift;
- packaging from clean machine.
Pass only when known failures stay fixed.

### U7 FUN
Simulate:
- first-time tester;
- tired tester;
- no-lore tester;
- repeat session.
Observe voluntary replay, remembered moments, confusion and boredom separately.

### U8 VERTICAL SLICE
Run the whole deck selectively:
DATA + ASSET + SAVE + BUILD + WORLD + UI + PERF + HUMAN.
No GO if rollback/build provenance/device evidence are weak.

## FUN / ROBUSTNESS DIALECTIC
Technical robustness can make a game stable but dull.
Creative chaos can make it memorable but fragile.
Target:
SAFE CORE + EXPERIMENTAL SURFACE.

Keep deterministic:
IDs, saves, builds, migrations, permissions, core progression invariants.
Allow creative variation:
encounter parameters, visual brackets, human-test orders, optional world reactions.

## RANDOMIZER CONTRACT
Use the Human Variation Randomizer for robustness scenarios only when:
- seed is recorded;
- variables are bounded;
- failure can be reproduced.
Never randomize production identity or migration truth.

## RESEARCH INTAKE
For every external lesson:
SOURCE
→ CLAIM
→ EVIDENCE TYPE
→ APPLICABLE ISL RISK
→ CONTRADICTION / LIMIT
→ CHEAP TEST
→ DECISION
→ ARCHIVE.

Never import a “best practice” without a falsifiable ISL test.

## PERIODIC REVIEW
Monthly light pass:
- official Unreal changes;
- new recurring community failures;
- historical/postmortem evidence;
- reliability/security/system-engineering developments;
- one candidate improvement maximum.

Milestone pass:
- U0/U1/U4/U8;
- engine freeze;
- save-schema change;
- plugin adoption;
- platform addition;
- import/export pipeline change.

NO CHANGE is a successful result.

## PRINCIPLE
THE GOAL IS NOT A BUG-FREE FANTASY.
THE GOAL IS A SYSTEM THAT FINDS FAILURES EARLY, EXPLAINS THEM, RECOVERS, AND KEEPS THE HUMAN FUN LOOP ALIVE.
