# ISL CHECKPOINT v0.88 · GIFT ENGINE / REFERENCE DISTANCE / ACTION ROUTER / RACE-SAFE SURFACES
Fecha: 2026-09-22
Estado: CURRENT HANDOFF · ISL ONLY

## PRIMARY
Velaria V2 P0.
HUMAN_DEVICE_GREEN = PENDING.
No further source polish unless materially useful before device test.

## HUMAN NEXT ACTION
Two valid human lanes:
A. while outside / breakfast:
- capture ONE object/place/detail that matters;
- 3–8 photos;
- optional 10–30 s audio/video;
- one sentence: “me importa porque…”
- privacy first.
B. when convenient:
- human-device test Velaria.

No obligation to do both now.

## ANCLA DEL REGRESO
Locked source-of-truth faces.
48 mm / ~3 mm / antique brass + teal.
RFQ sent to four suppliers.
Await replies.
No redesign while waiting.

## GIFT SYSTEM
NEW:
docs/ISL_GIFT_COMBINATION_ENGINE_CURRENT.md

Gift flow:
PROFILE
→ 1–5 CALAS
→ ASSET FAMILY
→ DESTINATION
→ TOOL/PROMPT
→ CROSS-ART PRINCIPLE
→ REFERENCE DISTANCE
→ HUMAN TEXTURE
→ SECOND LIFE
→ EVENT REFLEX LOOP.

Buenos días / Buenas noches should not default to “generate one image”.
They must rotate combinations and avoid recent repetition.

Buenos días ISL automation is active.
Because it was configured after today’s 08:00 slot, its first automatic scheduled run is 2026-09-23 ~08:00 Europe/Madrid.

## REFERENCE DISTANCE / RIGHTS
NEW:
docs/ISL_REFERENCE_DISTANCE_AND_LICENSE_AVOIDANCE_PROTOCOL_CURRENT.md

Principle:
REFERENCE != MATERIAL.
INSPIRATION != REPRODUCTION.
EVOKE FUNCTION, NOT SIGNATURE.

Music may evoke:
tempo range, meter, groove family, density, broad instrumentation, era, emotional arc, mix space, dynamics.

Do not reproduce:
melody, hook, riff, lyric, distinctive bassline, sample, stem, vocal identity, recognizable arrangement.

Final question:
“¿Recuerda una época/función o recuerda una canción concreta?”
If concrete song/work is too identifiable → move farther away.

Historical / secondary references:
- low weight unless functionally important;
- public-domain status must be checked per work/edition/recording;
- no automatic license assumption.

## CROSS-ART
Active:
docs/ISL_CROSS_ART_CRAFT_AND_PRACTICE_LAYER_CURRENT.md

Pattern:
PROBLEM
→ CRAFT
→ PRINCIPLE
→ CONTRAST
→ ISL MUTATION
→ MINIMUM PROTOTYPE
→ HUMAN EVIDENCE.

No prestige collage.

## REAL-WORLD CAPTURE
Active:
docs/ISL_REAL_WORLD_SCAN_AND_MUTATION_PROTOCOL_CURRENT.md

Event:
REAL_WORLD_CAPTURED
→ privacy check
→ provenance
→ function/emotion/materiality
→ desidentify
→ mutate
→ candidate outputs
→ human gate
→ Event Reflex Loop
→ return PRIMARY.

## COMMAND CENTER ACTION ROUTER
NEW:
docs/ISL_COMMAND_CENTER_ACTION_ROUTER_CURRENT.md
portal/data/isl-command-action-map-current.json
portal/isl-action-router.js

Global shell now loads Action Router.

Action classes:
NAVIGATION — no gate.
EXPLORE — no gate.
CREATE — Quality + Randomizer + Cross-Art + provenance.
TEST — evidence + human gate.
DECIDE — PC-30 + SOT + human package.
PROMOTE — HARD gate: CQC + rights + human confirmation + impact.
PUBLISH — HARD gate: legal + rights + privacy + marketing + claims.
PHYSICAL — HARD gate: supplier/IP + proof/sample + human.
SYSTEM — Trigger Engine + Event Reflex + surface propagation.

Command Center displays recent meaningful action trail.

LIMITATION:
Current action trail is browser-local.
Bots/automations cannot see every click yet.
Do not claim remote persistence until a privacy/auth/retention backend adapter is intentionally activated.

## SURFACE PROPAGATION
Primary:
.github/workflows/surface-propagation.yml

Fallback:
.github/workflows/surface-propagation-fallback.yml

Observed failures on 2026-09-22 were NOT content/gate defects:
- generator completed;
- propagation gate passed;
- push failed due to non-fast-forward race while another commit advanced main.

FIX:
- concurrency groups;
- update to latest main;
- race-safe retry/rebase/regenerate;
- simple concurrent push no longer treated as system failure;
- fallback escalates only actual propagation defect.

Latest observed fallback after earlier failures:
SUCCESS.

Old failed emails can be treated as historical noise once latest workflows remain green.

## AUTOMATIONS
Active:
- Buenos días ISL
- Buenas noches ISL
- Inconsciente ISL
- PC-30
- Auditar automatizaciones ISL

Inconsciente additionally watches:
- Action Router coverage drift;
- new meaningful Command Center actions not mapped;
- known-reference production/publication candidates missing Distance Test/rights gate;
- supplier email;
- deferred queue;
- runtime surface drift.

## LEGAL/IP
NOT FINISHED.
Architecture and first audit exist.

Main remaining P1:
1. trademark clearance;
2. MASTER RIGHTS LEDGER;
3. collaborator IP/confidentiality executable template;
4. supplier IP/tooling clause;
5. release legal gate;
6. evidence-registration strategy for high-value milestones.

Do not mass-register or spend heavily until stage/value warrants it.

## PHRASE BANK
Runtime:
portal/data/isl-phrase-bank-current.json
Gallery has FRASES tab.

Important current phrases:
- “No hace falta terminar el cielo esta mañana. Sólo dejar una corriente bien puesta.”
- “Si hoy no sabes por dónde ir, mira qué mueve el viento antes que tú.”
- “A veces la grandeza no llega cuando conquistas algo, sino cuando te paras a mirar el cielo con los tuyos.”
- “Perfecto. Ahora el cartel discute con el viento.”
- “NO COPIAMOS, MUTAMOS.”
- “COMPLEJIDAD POR DENTRO · CLARIDAD POR FUERA.”

Phrase bank != automatic game CANON.

## RESOURCE HEALTH
GitHub repo public.
Observed repo API size ~93.64 MiB.
Drive visible ISL workspace ~5.59 GiB.
User reports ~2 TB Drive plan; connector cannot independently verify account quota.
Unreal Content/DDC sizes not yet instrumented.

No storage migration needed now.
Drive is master/archive, not runtime CDN.

## SURFACES
Gallery:
- archive
- external lab
- 3D
- video
- music
- DOCS / BRIEFS
- FRASES

Command Center surfaces:
- systems/docs;
- resource health;
- Action Router status;
- phrase-of-cabin;
- project states / missions / surveys / evidence as applicable.

## B → A CONTINUITY
Do not restart.
B remains first when returning to main design work:
- creatures;
- NUDOS;
- crossed CQC B×A.
Then A as reference/contrast matrix.

## ABSOLUTE GUARDS
- ISL only.
- Do not mix identities/assets/lore/code/data from other projects.
- Recency is not authority. Approved asset wins.
- No auto CANON.
- Gallery != CANON.
- Reference != material.
- Real-world trace != literal reproduction.
- Navigation stays frictionless; meaningful actions get method.
- Events trigger consequences.
- Complexity inside, clarity outside.
- If meta-system costs more than what it protects, simplify.

## BOOT NEXT CONVERSATION
Read in order:
1. ISL_CHECKPOINT_MASTER_CURRENT
2. ISL_CHECKPOINT_v0.88_GIFT_ENGINE_REFERENCE_DISTANCE_ACTION_ROUTER_RACE_SAFE_SURFACES_2026-09-22
3. ISL_CURRENT_WORK_POINTER
4. ISL_GIFT_COMBINATION_ENGINE_CURRENT
5. ISL_REFERENCE_DISTANCE_AND_LICENSE_AVOIDANCE_PROTOCOL_CURRENT
6. ISL_COMMAND_CENTER_ACTION_ROUTER_CURRENT
7. ISL_METHOD_TRIGGER_ENGINE_CURRENT
8. ISL_STAGE_AWARE_DEFERRED_WORK_QUEUE_CURRENT
9. ISL_META_LAYER_ORCHESTRATOR_CURRENT

Then:
- verify latest surface-propagation workflows are green;
- check supplier replies only if new;
- preserve PRIMARY = Velaria V2 P0 / HUMAN_DEVICE_GREEN pending;
- if user is out/creative, process one real-world capture;
- otherwise resume actual production, not more meta-layers.
