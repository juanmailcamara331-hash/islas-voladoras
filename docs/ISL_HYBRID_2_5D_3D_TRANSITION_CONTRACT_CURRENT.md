# ISL · HYBRID 2.5D ↔ 3D TRANSITION CONTRACT · CURRENT
Fecha: 2026-09-24
Estado: ACTIVE PREPARATION · PROTOTYPE CONTRACT · NO CANON · NO ENGINE FREEZE

## PURPOSE
Define and rehearse any transition in ISL where gameplay changes representation, dimensionality, camera grammar, input grammar, simulation density or scene ownership.

Primary example:
3D exploration/travel → 2.5D combat presentation → 3D world return.

This contract exists because the dangerous part is not the pretty transition itself. The danger is losing or duplicating state across the boundary:
player/world position, party, enemy identity, damage, inventory, world state, camera, input, save, audio, streaming and consequences.

## PRINCIPLE
SAME WORLD · SAME STATE · DIFFERENT PRESENTATION.

A 2.5D combat mode must not secretly become a second disconnected game.

## GENERAL TRANSITION TEMPLATE
Every representation transition declares:

TRANSITION_ID
FROM_MODE
TO_MODE
TRIGGER
SOURCE_OF_TRUTH
WORLD_CONTEXT
ENTITY_SET
STATE_SNAPSHOT
STATE_OWNERSHIP
CAMERA_FROM
CAMERA_TO
INPUT_FROM
INPUT_TO
MOVEMENT_CONSTRAINT
SPATIAL_MAPPING
TIME_POLICY
AUDIO_POLICY
FX_POLICY
UI_POLICY
SAVE_POLICY
STREAMING_POLICY
PERFORMANCE_BUDGET
FAILURE_RECOVERY
EXIT_CONDITIONS
RETURN_MAPPING
TESTS
HUMAN_READ
ROLLBACK

## MODE STATE MACHINE
Default rehearsal:
EXPLORE_3D
→ PREPARE_TRANSITION
→ COMBAT_ENTRY
→ COMBAT_2_5D
→ RESOLVE_COMBAT
→ RETURN_TRANSITION
→ EXPLORE_3D

No state may be skipped implicitly.
Every transition has a timeout/failure path.

## THREE IMPLEMENTATION HYPOTHESES

### A · 3D WORLD + 2.5D PRESENTATION CONSTRAINT
Keep the encounter in 3D.
Change:
- camera rig;
- movement plane/rails;
- input context;
- encounter framing;
- animation/combat rules;
- HUD.

Benefits to test:
- fewer cross-scene state copies;
- same actors/assets/world;
- easier continuity of lighting/materials;
- easier return to exploration.

Risks:
- camera/occlusion;
- collision assumptions;
- background/world clutter;
- combat logic accidentally coupled to exploration actor logic.

FIRST PROTOTYPE CANDIDATE because it minimizes state duplication, not because it is final truth.

### B · SEPARATE 3D COMBAT INSTANCE
Snapshot relevant world/entity state, enter a dedicated combat arena/level instance, resolve, then merge delta back.

Benefits:
- strong control of combat staging/performance;
- cleaner encounter composition.

Risks:
- snapshot/merge bugs;
- duplicated actors;
- save during transition;
- mismatched transforms/world consequences;
- loading interruption.

Use only if A cannot achieve required readability/performance.

### C · PAPER 2D / SPRITE-HYBRID PRESENTATION
Use Paper2D/2D assets mixed with 3D world where the art direction specifically benefits.

Benefits:
- strong authored 2.5D visual grammar;
- potentially distinct animation/readability language.

Risks:
- asset duplication;
- two animation/render pipelines;
- lighting/material mismatch;
- more conversion work;
- state and scale consistency.

Do not adopt because “2.5D” sounds like Paper2D. Use only after an art/gameplay test.

## TRANSITION DATA CONTRACT
A transition should be data-driven where possible.

Example source object:

{
  "transition_id": "TR_COMBAT_001",
  "from_mode": "EXPLORE_3D",
  "to_mode": "COMBAT_2_5D",
  "camera_profile": "CAM_COMBAT_SIDE_A",
  "input_context": "IMC_COMBAT_2_5D",
  "movement_constraint": "PLANE_LOCAL_ENCOUNTER",
  "state_fields": [
    "party",
    "enemy_set",
    "inventory",
    "health",
    "status_effects",
    "world_flags",
    "encounter_seed"
  ],
  "save_allowed": "SAFE_POINTS_ONLY",
  "return_policy": "MERGE_DELTA_TO_WORLD",
  "failure_policy": "ROLLBACK_TO_PREPARE_TRANSITION"
}

Names are illustrative; stable IDs outrank display labels.

## STATE OWNERSHIP
Before implementation, every state field must have ONE owner.

Examples:
- global progression → persistent world/save system;
- encounter temporary state → encounter controller;
- actor transform → world actor / transition mapper;
- presentation-only camera state → camera system;
- input mapping → player/input subsystem;
- combat result → encounter result object before merge.

Forbidden:
two systems both believing they own the same mutable field.

## SPATIAL MAPPING
For 3D → 2.5D:
- define encounter origin;
- define combat plane/rail;
- map world participants to stable slots or projected coordinates;
- preserve original world transforms for return;
- record any intentional displacement as explicit delta.

For 2.5D → 3D:
- resolve surviving entities;
- merge damage/status/inventory/world flags;
- restore or intentionally update world transforms;
- re-evaluate streaming/nav/collision;
- only then return control.

## CAMERA CONTRACT
Camera transition must preserve:
- subject readability;
- orientation comprehension;
- motion comfort;
- no sudden control inversion;
- no occlusion surprise during handover.

Current Unreal 5.8 Gameplay Camera System is an EXPERIMENTAL candidate for camera rigs/directors/transitions and must not be locked for shipping before version freeze and prototype evidence.
Fallback remains conventional camera actors/components and explicit blends.

## INPUT CONTRACT
Enhanced Input candidate:
- exploration context;
- combat context;
- transition lock context;
- accessibility/remap preservation.

During PREPARE_TRANSITION:
- suppress conflicting actions;
- preserve cancel/pause policy;
- never leave two mutually exclusive gameplay contexts active accidentally.

## AUDIO / LIGHT / FX CONTINUITY
The transition should feel like one world.
Test:
- ambient sound does not hard-cut unless intentional;
- music stem/cue can pivot without double-trigger;
- exposure/lighting change has motivation;
- particles/VFX do not hide the handover;
- 2.5D staging does not erase the world atmosphere.

## SAVE / RESUME CONTRACT
Explicitly test:
- save before transition;
- save at allowed combat safe point;
- quit/reload in combat if supported;
- crash/restart around transition;
- schema migration with active encounter;
- rollback if transition cannot complete.

Default early prototype:
NO arbitrary save during the 1–2 second handover itself.
Persist either BEFORE or AFTER a committed transition state until evidence supports more.

## FAILURE INJECTION DECK · TRANSITION
Simulate:
- combat trigger fires twice;
- enemy removed during prepare;
- player dies during handover;
- input context not removed;
- camera blend interrupted;
- streaming level delayed;
- missing animation;
- asset load fails;
- save requested mid-transition;
- app suspended/resumed;
- controller disconnect/reconnect;
- low FPS during camera blend;
- world actor moved while combat owns a proxy;
- result merge applied twice;
- return spawn point obstructed.

Expected:
FAIL LOUDLY + TRACEABLY + RECOVERABLY.

## CQC / HUMAN QUESTIONS
Technical:
- did any entity duplicate/disappear?
- did any mutable state diverge?
- can retry/re-entry corrupt the encounter?
- does package/device behave like editor?
- does save/load preserve the boundary?

Perceptual:
- did the player understand combat began?
- did they understand spatial relationship to the world?
- did controls feel continuous or arbitrary?
- did the transition feel exciting or merely cinematic?
- did the return feel like returning to the same place?
- does repeated use become annoying?

Fun:
- does the 2.5D framing improve tactical readability?
- does it add anticipation?
- does it preserve agency?
- would the player voluntarily want another encounter?

## ABALATION TESTS
Test:
A. no cinematic transition, instant mode switch;
B. short camera/input transition;
C. richer staged transition.

If C is prettier but less readable/slower/annoying after repetition, it loses.
The transition earns complexity only if it improves comprehension, emotion or play.

## RANDOMIZER BOUNDARY
May vary:
- encounter camera bracket;
- enemy arrangement;
- transition duration within safe bounds;
- human test ordering;
- environmental presentation.

Must never vary:
- state owner;
- identity mapping;
- save schema;
- merge semantics;
- deterministic transition contract.

## U0–U8 INTEGRATION
U0:
mode state machine + two camera/input states in a test map.

U1:
one entity crosses boundary and returns unchanged.

U2:
one real combat loop + retry + merge result.

U3:
combat transition inside a streamed world cell.

U4:
10–15 minute golden path with at least one transition; blind human completion.

U5:
many encounters/data-driven transition profiles; no manual setup explosion.

U6:
transition regression suite, save migration and device matrix.

U7:
Carrillo/friends repeated-use test: first impression + fifth repetition.

U8:
vertical slice transition judged with final-like art/audio/performance.

## PRODUCTION EMPLOYEE / NIGHT-SHIFT WORK PACKETS
Night work may prepare READ-ONLY or reversible evidence packets by discipline:

SYSTEMS DESIGN:
- state ownership map;
- transition invariants;
- encounter data schema.

TECH ART:
- asset/lighting continuity risks;
- material/scale constraints;
- camera occlusion test matrix.

GAMEPLAY ENGINEERING:
- state machine;
- input/camera contracts;
- save/merge invariants;
- automation targets.

QA:
- adversarial deck;
- regression matrix;
- packaged/device cases.

UX:
- control continuity;
- tutorial/feedback minimalism;
- accessibility.

PERFORMANCE:
- streaming/load budget;
- shader/FX spikes;
- low-tier device scenarios.

PRODUCTION:
- dependencies;
- milestone gates;
- rollback;
- evidence receipt.

HUMAN LAB:
- blind test script;
- non-leading questions;
- raw trace capture.

No night worker may:
- promote CANON;
- change stable IDs;
- change engine version;
- change save schema;
- adopt plugin;
- publish;
- cross a human gate.

## EXTERNAL REVIEW PACK
When asking a developer/creator/Unreal specialist, send:
1. one-page problem statement;
2. current transition hypothesis A/B/C;
3. state ownership diagram;
4. one cheap prototype video/build;
5. failure cases already tested;
6. 3–5 precise questions.

Do not send the whole methodology dump.
External advice enters RESEARCH INTAKE:
SOURCE → CLAIM → EVIDENCE → ISL RISK → CHEAP TEST → DECISION.

## SUCCESS
The transition is successful when:
- technically reversible;
- data/state ownership is explicit;
- repeated transitions do not accumulate bugs;
- packaged/device behavior is stable;
- human understands it without explanation;
- it improves play enough to justify itself;
- implementation remains lazy-magistral: data-driven, reusable and low-toil.
