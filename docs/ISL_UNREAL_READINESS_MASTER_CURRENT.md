# ISL · UNREAL READINESS MASTER CURRENT
Fecha: 2026-09-21
Estado: ACTIVE PREPARATION · NO UNREAL PRODUCTION · ISL ONLY

## PROPÓSITO
Preparar ISLAS VOLADORAS para una futura entrada en Unreal sin abrir producción Unreal antes de tiempo.
Este documento consolida la preparación técnica que antes estaba distribuida entre UNREAL_PRODUCTION_BLUEPRINT_CURRENT, ISL_UNREAL_ENGINEERING_SOURCE_MAP_v0.62, BUILD SCIENCE, TOOLCHAIN y plantillas.

## PRIMARY GUARD
- PRIMARY actual sigue siendo Velaria V2 P0.
- HUMAN_DEVICE_GREEN sigue siendo gate pendiente.
- Esta preparación es infraestructura silenciosa.
- No autoriza crear proyecto Unreal serio, migrar contenido masivo ni cambiar el roadmap.
- READY_UNREAL != CANON y != PRODUCCIÓN.

## PRINCIPIO
CREATE ONCE → DESCRIBE ONCE → TRANSLATE LATER.
Todo ente importante de ISL debe poder traducirse a Unreal sin depender de recordar conversaciones antiguas.

## PASAPORTE UNREAL MÍNIMO POR ENTE
Cada criatura, reliquia, isla, región, escena, interacción, UI, audio o asset relevante debe poder declarar:
- isl_id
- entity_type
- title
- canon_state
- source_authority
- gameplay_function
- dependencies
- synergies
- conflicts
- persistent_state
- platform_scope
- master_asset_refs
- runtime_asset_refs
- unreal_target
- gameplay_tags
- performance_class
- provenance
- tests
- rollback
- version

No es obligatorio rellenarlo todo durante exploración creativa. Se completa progresivamente al acercarse a READY_UNREAL.

## TRADUCCIÓN BASE
- datos de contenido → Data Assets / Primary Data Assets cuando proceda;
- identidad runtime y relaciones → Gameplay Tags + IDs estables;
- habilidades/costes/efectos → GAS sólo si el prototipo demuestra beneficio;
- input → Enhanced Input;
- regiones/islas grandes → World Partition;
- estados del mundo → Data Layers cuando encaje;
- paisaje distante → HLOD cuando aporte;
- poblamiento procedural → PCG sólo bajo dirección artística y evidencia;
- persistencia → SaveGame/versionado/migraciones;
- UI cross-device → UMG/CommonUI cuando se justifique;
- automatización → Data Validation + Automation + Functional + Screenshot + Gauntlet;
- profiling → Unreal Insights / Memory / GPU profiling;
- build → UAT/BuildGraph cuando producción real lo requiera.

## MASTER != RUNTIME
MASTER:
máxima calidad, editable, preserva fuente/procedencia.

RUNTIME:
optimizado para plataforma y contexto, con escala/pivot/colisión/materiales/LOD o Nanite cuando proceda, memoria estimada y test.

Nunca sustituir MASTER por RUNTIME.
Nunca promover un candidato visual IA directamente a runtime sin QA, procedencia y adaptación.

## REGLA C++ / BLUEPRINT / DATA
- DATA: configuración y contenido declarativo.
- C++/COMPONENTS: lógica reusable, crítica, testable o de coste/rendimiento relevante.
- BLUEPRINTS: ensamblaje, iteración, prototipo, secuencias e interacción legible.
- Evitar Blueprints-monstruo y singletons opacos.
- No convertir todo a C++ por dogma.

## WORLD READINESS
Pensar mundo ISL como:
WORLD → REGION → ISLAND → DISTRICT → CELL/STREAMING UNIT → ENCOUNTER/POI.
Separar siempre:
WORLD RULES != VISUAL DENSITY.
Esto protege SAME WORLD / SAME RULES / DIFFERENT CEILINGS.

## AUTOMATION LADDER
Mapeo ISL T0–T8:
T0 static/config/source guards
T1 low-level/unit/property
T2 feature
T3 smoke/boot
T4 integration/functional
T5 content/performance stress
T6 screenshot/visual regression
T7 packaged/device/Gauntlet
T8 human/CQC

## ENTRY GATE A UNREAL SERIO
No abrir producción Unreal hasta:
1. vertical slice estable;
2. tesis jugable superviviente a playtest;
3. HUMAN_DEVICE_GREEN correspondiente;
4. modelo de mundo/save documentado;
5. entidades críticas con ISL_ID;
6. asset contract vigente;
7. versión exacta de UE congelada y source map revalidado;
8. build skeleton reproducible;
9. BootTest packaged;
10. asset validation;
11. save migration test;
12. screenshot baseline;
13. rollback verificable;
14. presupuesto inicial por dispositivo;
15. GO humano.

## ENGINE VERSION RULE
La documentación oficial consultada en 2026-09-21 muestra UE 5.8.
Eso NO fija UE 5.8 para ISL.
Al abrir migración:
SOURCE MAP → ENGINE VERSION FREEZE → DEPRECATION AUDIT → PILOT → DECISION.

## PLUGIN RULE
Todo plugin entra como:
NEED → OFFICIAL/MATURE SOURCE → VERSION → PERMISSIONS → BUILD IMPACT → PLATFORM SUPPORT → TEST → ROLLBACK → ADOPT/PILOT/WATCH/REJECT.
No plugins “porque molan”.

## LAZY CREATIVE INTEGRATION
La preparación debe reducir trabajo futuro, no añadir burocracia.
Automatizar:
- IDs;
- manifests;
- naming checks;
- import validation;
- metadata;
- test selection;
- build logs;
- regression guards.
No automatizar:
- canon;
- gusto;
- consentimiento;
- irreversible production choices.

## CURRENT ACTION
Desde ahora, cuando se cierre una entidad importante, adjuntar su pasaporte Unreal mínimo sólo si aporta valor y sin retrasar PRIMARY.
La tanda física actual continúa separada.
Después: volver a Velaria HUMAN_DEVICE_GREEN.

## DOCUMENTOS RELACIONADOS
- docs/UNREAL_PRODUCTION_BLUEPRINT_CURRENT.md
- docs/ISL_UNREAL_ENGINEERING_SOURCE_MAP_v0.62.md
- docs/ISL_ENTITY_TO_UNREAL_MAPPING_CURRENT.json
- docs/ISL_UNREAL_ASSET_CONTRACT_CURRENT.md
- docs/ISL_UNREAL_IMPORT_MANIFEST_SCHEMA_CURRENT.json
- docs/ISL_UNREAL_TEST_AND_REGRESSION_BRIDGE_CURRENT.md
- docs/ISL_UNREAL_PLUGIN_AND_DEPENDENCY_ALLOWLIST_CURRENT.md


## UNREAL TRANSFER SIMULATION · COPY-ONCE / PASTE-LIGHT · 2026-09-24
Estado: ACTIVE PREPARATION · SIMULATION ONLY · NO MASS IMPORT

Human concern addressed:
ISL must not arrive at Unreal as a pile of prose, screenshots and manual copy/paste.
The goal is:
CREATE ONCE → STRUCTURE ONCE → EXPORT → IMPORT → VALIDATE → PLAYTEST → ITERATE.

### CORE TRANSLATION MODEL
ISL SOURCE_OF_TRUTH
→ ENTITY PASSPORT
→ MACHINE-READABLE MANIFEST
→ UNREAL TARGET CLASS
→ GENERATED/IMPORTED DATA
→ VALIDATION
→ AUTOMATION
→ PLAYABLE BUILD
→ HUMAN READ
→ DELTA BACK TO SOURCE.

### WHAT SHOULD BE DATA VS CODE VS BLUEPRINT
Use DATA for:
- IDs;
- tuning values;
- relationships;
- costs;
- thresholds;
- tags;
- spawn/config references;
- dialogue/state metadata;
- asset references;
- encounter definitions.

Use C++ / reusable components for:
- deterministic reusable logic;
- save/versioning;
- core state transitions;
- performance-critical systems;
- validators/import helpers;
- systems requiring strong tests.

Use Blueprints for:
- composition;
- prototyping;
- level scripting;
- readable assembly;
- interaction glue;
- designer iteration.

Do not encode content truth in random Blueprint nodes when it can live in data.

### ZERO-PASTE TARGET
Manual copy/paste from ChatGPT/docs into Unreal should be an exception.

Preferred routes:
1. JSON/CSV/structured source generated from ISL manifests.
2. Unreal import tool or Editor Utility reads that source.
3. It creates/updates DataTable rows or Data Assets/Primary Data Assets.
4. Stable isl_id decides identity; display names may change safely.
5. Import is idempotent where practical: rerunning updates known entities instead of duplicating them.
6. Validation reports missing fields/references before packaging.
7. Human approves gameplay/art state separately.

### CURRENT UNREAL DATA SHAPES
Recommended mapping:
- tuning/mass tabular values → DataTable / CurveTable when row-shaped;
- content entities with richer structure/asset refs → Data Asset;
- loadable top-level content families → Primary Data Asset + Asset Manager;
- classification/state/event vocabulary → Gameplay Tags;
- runtime instance state → Actor/Component/SaveGame, never hidden in source content tables;
- cross-system identity → immutable ISL_ID independent of asset/display name.

### SIMULATED IMPORT RECIPE
For every READY_UNREAL entity:
A. Validate SOURCE_OF_TRUTH + canon_state.
B. Emit/update manifest entry.
C. Normalize:
   - units to cm;
   - axis;
   - path;
   - tags;
   - asset refs;
   - platform tier;
   - save impact.
D. Choose target:
   DataTable / PrimaryDataAsset / Actor / Component / Level / UI / Audio.
E. Import/create/update by isl_id.
F. Run Data Validation.
G. Run relevant Automation/Functional tests.
H. Open cheap test map.
I. Package smoke build.
J. Device run.
K. Human play/read.
L. Record delta and rollback path.

### SIMULATION BULLETS
These bullets simulate the future game production now, without opening full Unreal production.

BULLET U0 · BOOT SKELETON
- empty project;
- one map;
- one PrimaryDataAsset;
- one Gameplay Tag dictionary seed;
- one SaveGame schema version;
- one test;
- one package.
PASS = reproducible boot/package/test.

BULLET U1 · ONE ENTITY END-TO-END
Example class: Gift Token or one creature.
- one manifest entry;
- one import;
- one runtime representation;
- one interaction;
- save/load;
- screenshot regression;
- packaged device test.
PASS = no manual re-entry of core metadata.

BULLET U2 · ONE ENCOUNTER
- player + one creature or one skyship interaction;
- data-driven tuning;
- entry/exit;
- fail/retry;
- save checkpoint;
- functional test.
PASS = loop survives repeated runs without state corruption.

BULLET U3 · ONE WORLD CELL
- one small island/zone;
- one streaming boundary if useful;
- one world-state variant;
- one audio/light state;
- one device performance pass.
PASS = enter/play/leave/re-enter/save/load without bug.

BULLET U4 · GOLDEN PATH 10–15 MIN
- arrival;
- traversal;
- dialogue/social beat;
- one mechanic;
- one encounter;
- reward/consequence;
- save/load/resume.
PASS = blind human can finish without developer rescue.

BULLET U5 · CONTENT SCALE TEST
- import N entities from manifests;
- load/validate all;
- detect duplicates/missing refs;
- stress asset loading;
- compile Blueprints;
- package.
PASS = scaling content does not become manual chaos.

BULLET U6 · REGRESSION WEEK
- repeated packaged runs;
- save migration;
- screenshot baselines;
- performance budgets;
- known-bug guards.
PASS = fixes stay fixed.

BULLET U7 · FUN / COMPREHENSION GATE
- Carrillo/friend blind test;
- minimal explanation;
- record where they hesitate, laugh, explore, quit or exploit;
- separate bugs from boredom from confusion.
PASS = humans understand core loop and voluntarily want one more action.

BULLET U8 · VERTICAL SLICE GO/NO-GO
- only after lower bullets pass;
- representative art + audio + gameplay + save + device build;
- one stable golden path;
- reproducible build pipeline;
- rollback.
PASS = this is credible evidence for serious Unreal production.

### BUG-PREVENTION MODEL
Every milestone asks four questions:
1. DATA: is the content valid and uniquely identified?
2. LOGIC: does the state transition behave under repetition/failure?
3. BUILD: does packaged/device behavior match editor assumptions?
4. HUMAN: is it understandable and fun?

A bug is not closed until the cheapest relevant regression guard exists when practical.

### FUN IS A TEST DIMENSION
Automated tests cannot prove fun.
Track human observations separately:
- comprehension;
- intention;
- surprise;
- boredom;
- frustration;
- voluntary replay;
- remembered moment;
- exploit/creative use.
Do not collapse these into one score.

### CARRILLO / HUMAN TEST ROLE
Carrillo/friends may enter at U2/U4/U7:
- blind or semi-blind depending question;
- no methodology dump;
- observe first;
- ask non-leading questions after;
- preserve raw trace;
- findings inform iteration but do not auto-CANON.

### ENGINE FREEZE RULE
Before real implementation:
- choose exact UE version;
- re-check current official docs;
- verify plugin/platform support;
- freeze import schema version;
- create migration/rollback note.

### STOP RULE
Simulation should expose risk, not create fake production.
Do not implement U4+ before U0/U1 evidence exists.


## UNREAL ECOSYSTEM READINESS AUDIT · 2026-09-24
Estado: ACTIVE RECURRING METHOD · PREPARATION ONLY · NO AUTO-ADOPTION

## WHY
Unreal readiness is a strategic weak point with high leverage. A stale pipeline can silently create manual work, data drift, import duplication, broken saves, build regressions, connector lock-in and late production rewrites.

Therefore Unreal readiness is not a one-time document. It is a recurring ecosystem audit.

## AUDIT SCOPE
Review, when relevant:
- Unreal release notes / migration notes / deprecations;
- Interchange import/export framework and pipeline-stack changes;
- Asset Manager / Primary Assets / Data Assets / DataTables;
- Data Registries and data-source/override patterns;
- Gameplay Tags / Enhanced Input / CommonUI;
- World Partition / Data Layers / HLOD / PCG;
- SaveGame / versioning / migration patterns;
- Automation / Functional Tests / Screenshot Comparison / Gauntlet;
- BuildGraph / UAT / packaging / CI;
- Insights / memory / GPU / device profiles / scalability;
- audio / MetaSounds;
- animation / StateTree / Behavior Trees / AI systems;
- Python / Blueprint / C++ editor automation;
- supported import formats, glTF/MaterialX/FBX status and asset pipeline changes;
- official MCP/assistant/editor automation features when they materially affect production;
- plugin maturity / platform support / licensing / rollback.

## EXTERNAL ECOSYSTEM SCOPE
Evaluate adapters around Unreal, never let them become implicit core dependencies:
- ISL web / Gallery / 3D viewers;
- SEO / public metadata / structured content;
- Kickstarter / campaign media / rewards / public-facing asset export;
- Netlify / web deployment;
- Drive / GitHub / Library provenance and artifact storage;
- image/video/3D generation providers;
- analytics/telemetry when adopted;
- console/mobile packaging and distribution surfaces;
- future connectors/plugins only after M5 security and dependency review.

Rule:
EXTERNAL SURFACE → ADAPTER/EXPORT CONTRACT → ISL SOURCE_OF_TRUTH
never
EXTERNAL SURFACE → hidden gameplay truth.

## CURRENT WATCH CANDIDATES · VERIFIED 2026-09-24
- Interchange is Unreal's extensible import/export framework; it is format-agnostic, asynchronous and customizable, with pipeline stacks and Blueprint/Python/C++ extension points. Treat as a strong candidate for future ISL import automation, not an automatic production choice.
- Data Registries can aggregate structured read-only data from multiple sources with fallback/override behavior. Treat as a candidate when ISL needs layered or context-specific content lookup; do not use for mutable session/save state.
- Unreal 5.8 release notes include additional tooling changes across rendering, worldbuilding, PCG and other areas, plus MCP-related animation assistant tooling. This is WATCH evidence only until an ISL use case, version freeze and support test exist.

## FULL-METHOD CROSS
Every significant Unreal ecosystem change routes through the existing system, not a parallel methodology:
M0 NAVIGATION
→ M2 SOURCE / ENTITY
→ M12 DATA / FORMULAS / PARAMETERS when schema or tuning changes
→ M8 UNREAL READINESS
→ M5 SECURITY / PLUGINS / CONNECTORS when external
→ M9 BUILD / TEST / DEVICE
→ M1 QUALITY / DIALECTIC
→ M3 HUMAN TEST when experience changes
→ M11 ASSET / GALLERY / MEDIA when visual/runtime assets move.

Use:
- Meta-Layer Orchestrator;
- Recursive Dialectic Quality Router;
- Human Variation Randomizer only for creative/perceptual variants, never for IDs/schemas/build determinism;
- Visual Fidelity Ladder for graphics/runtime;
- U0–U8 Unreal production simulation;
- T0–T8 regression ladder;
- M12 formula/parameter versioning;
- Organism Radiography / Curation to prevent duplicated infrastructure;
- Context Hygiene / Authority Pruning to prevent recency from becoming truth.

## RANDOMIZER BOUNDARY
Randomizer MAY perturb:
- visual brackets;
- human test order;
- non-destructive creative alternatives;
- scenario combinations for robustness testing.

Randomizer MUST NOT perturb:
- stable IDs;
- save schema versions;
- import paths after freeze;
- build configuration;
- security permissions;
- canonical data migrations;
- deterministic regression expectations.

## ECOSYSTEM SIMULATION MATRIX
For every new integration or important Unreal capability, simulate:
1. SOURCE: what ISL truth enters?
2. ADAPTER: what transformation occurs?
3. TARGET: which Unreal/external structure receives it?
4. ROUNDTRIP: can we export/read it back without ambiguity?
5. FAILURE: what happens if provider/plugin/schema disappears?
6. TEST: what automated guard catches breakage?
7. HUMAN: does this reduce work or add ceremony?
8. ROLLBACK: can we return to last good state?
9. PROVENANCE: can we prove what source/version generated it?
10. COST: build time, runtime cost, maintenance and cognitive load.

Reject integrations that add more hidden state than leverage.

## SEO / KICKSTARTER / VIEWER CONTRACT
Public/campaign/presentation systems receive derived exports, never become AUTHORITATIVE gameplay databases.

Example:
ENTITY PASSPORT / GALLERY REGISTRY
→ PUBLIC EXPORT LAYER
→ SEO metadata / campaign page / 3D web viewer / press kit.

Any public edits that matter to the game must return through an explicit intake/review path before affecting SOURCE_OF_TRUTH.

## PERIODIC CADENCE
Run a light audit approximately monthly and a focused audit at:
- Unreal version freeze;
- plugin adoption;
- platform target change;
- vertical-slice gate;
- major data-schema change;
- new external connector;
- large asset-pipeline change;
- save/persistence redesign.

Each audit returns at most:
- meaningful external changes;
- one compatibility risk;
- one reversible recommendation;
- one doc/schema update if justified.
NO CHANGE is a valid outcome.

## DEFINITION OF LAZY-MAGISTRAL
The Unreal pipeline is successful when:
- content is described once;
- imports are repeatable;
- updates are syncable by stable ID;
- validation is automatic;
- packaging is reproducible;
- regressions are caught early;
- humans spend time on play, art and decisions rather than transcription.

More automation is not automatically better.
The best pipeline removes repeated work while preserving human authority.


## FAILURE-SIMULATION BRIDGE · 2026-09-24
Detailed cross-domain method:
- docs/ISL_UNREAL_FAILURE_SIMULATION_AND_HISTORICAL_LESSONS_CURRENT.md

Deterministic rehearsal helper:
- scripts/isl-unreal-risk-sim.py

Purpose:
turn historical/community/scientific lessons into bounded, reproducible U0–U8 failure scenarios rather than accumulating advice.

Use external evidence as:
CLAIM → ISL RISK → CHEAP TEST → DECISION.
Never as “best practice therefore adopt”.

Current source families:
- Epic official engine/release documentation;
- NASA systems engineering + FMEA/FMECA;
- MIT STPA/CAST;
- Google SRE / reliability / fuzzing research;
- NIST SSDF / software supply-chain provenance;
- Reddit/forums as failure-mode sensors;
- Archive.org / historical postmortems when discoverable and relevant.


## HYBRID MODE-TRANSITION BRIDGE · 2026-09-24
Dedicated contract:
- docs/ISL_HYBRID_2_5D_3D_TRANSITION_CONTRACT_CURRENT.md

Use it whenever gameplay changes presentation/runtime mode: 3D ↔ 2.5D, traversal ↔ combat, world ↔ tactical scene, vehicle ↔ on-foot, cinematic handover with input ownership changes, or any future representation boundary.

Core invariant:
SAME WORLD · SAME STATE · DIFFERENT PRESENTATION.

First prototype hypothesis for 3D exploration → 2.5D combat:
keep the encounter physically 3D and constrain camera/movement/input before testing separate combat instances or a Paper2D-specific pipeline. This is a complexity-reduction hypothesis, not CANON.

Official 5.8 watch:
- Gameplay Camera System supports camera rigs/directors/transitions but is experimental;
- Enhanced Input supports runtime mapping-context changes;
- Paper2D supports hybrid 2D/3D projects.
Revalidate on engine-version freeze.
