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
