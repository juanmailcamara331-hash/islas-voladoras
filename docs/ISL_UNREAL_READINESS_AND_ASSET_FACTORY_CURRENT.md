# COLD PREP NOTE · 2026-09-26 · THREE.JS LOCAL ASSET LAB STAGED, NOT ACTIVE
- Activation condition remains unchanged: Gallery HUMAN/DEVICE validation must close first.
- Gallery media machine completeness rechecked before staging:
  - Distant Milestones video runtime chunks: 11/11 present.
  - Seven Thousand Paces audio runtime chunks: 9/9 present.
  - runtime MIME contracts remain video/mp4 and audio/mpeg.
- Therefore remaining Gallery blocker is HUMAN sensory confirmation only, not missing media packaging.
- Three.js lab must reuse this existing organ; DO NOT create a new app/organ before activation.
- First activation packet, once Gallery passes:
  1. Load ONE representative GLB only: Gift Token 01 / Human Trace derivative, never the source authority.
  2. Package Three.js + GLTFLoader locally under private CSP; zero CDN runtime dependency.
  3. Modes: neutral studio / ISL cinematic bracket / harsh validation / silhouette / material-debug / wireframe-normals / mobile-low.
  4. Controls: touch orbit + pinch zoom + reset view; no ornamental UI.
  5. Record: GLB bytes, geometry/vertex-face counts, texture bytes, material count, draw calls, cold load, first interaction, FPS/frame time where measurable.
  6. Compare against existing poster/sheet baseline; web preview validates defects, it does not replace source/master authority.
  7. Human gate: KEEP / MUTATE / PARK before any second asset family.
- First asset family = HERO RELIC only. Static prop/environment/creature remain parked until the pipeline proves itself.
- No mass generation. No Unreal import yet. No CANON change.

# ISL · UNREAL READINESS + ASSET FACTORY CURRENT
Fecha: 2026-09-26
Estado: TRANSVERSAL IMPLEMENTATION PACK · ISL ONLY · NO NEW ORGAN · NO AUTO-CANON

## AUTHORITY
PRIMARY = Velaria V2 P0 · HUMAN_DEVICE_GREEN=PENDING.
SAFE HARBOR intacto.
Esto pertenece a M8 Unreal Readiness + M11 Media/Asset Lifecycle + M6 Resilience + M1 Quality.
DO NOT ADD ORGANS. IMPROVE CIRCULATION.

## GOAL
Llegar a Unreal con assets, escenas, audio y datos que ya hayan pasado:
SOURCE LOCK → MULTIVIEW → 3D → WEB PREVIEW → CQC → PERFORMANCE BUDGET → HUMAN GATE → UNREAL IMPORT → DEVICE TEST.

La web/Three.js no sustituye Unreal. Es un laboratorio barato para detectar antes:
- silueta débil
- material incorrecto
- escala
- iluminación
- clipping
- roughness/metalness
- densidad
- peso
- legibilidad táctil
- problemas de cámara.

## OFFICIAL ENGINE BASELINE · UE 5.8
- Unreal Units: 1 uu = 1 cm.
- FBX pipeline target: FBX 2020.2.
- FBX soporta Static Mesh, Skeletal Mesh, Animation, Morph Targets, materiales/texturas, UVs, vertex colors y LODs.
- glTF 2.0 / GLB: formato abierto compacto útil para runtime/interchange y previsualización.
- USD: útil para composición de escenas y pipelines no destructivos; sigue marcado Beta en documentación y no debe ser dependencia de shipping sin validación.
- Interchange Framework: pipeline extensible/asíncrono y personalizable mediante Blueprint/Python.
- Nanite: candidato para geometría estática de alto detalle; mantener fallback/casos no-Nanite.
- Lumen: evaluar por plataforma; no asumir que todos los targets compartirán el mismo perfil.
- World Partition + Data Layers + HLOD: preparar mundo grande, organización y streaming desde temprano.
- Device Profiles + Scalability: definir perfiles por hardware en lugar de una única configuración.
- PSO Precaching: integrar antes de shipping para reducir stutter de compilación.
- Animation Budget Allocator: candidato para controlar coste de personajes/crew.
- Niagara: VFX modular basado en systems/emitters/modules/parameters.
- MetaSounds: audio procedural e interactivo; explorar para viento, nave, máquinas y sistemas reactivos.
- Mobile: optimización debe empezar pronto y repetirse; no dejarla al final.

## ASSET SOURCE CONTRACT
Cada ente 3D relevante debe poder producir, cuando aplique:
1. SOURCE MASTER (DCC / generator source).
2. Neutral geometry export.
3. Unreal import export.
4. Web preview export.
5. Texture source set.
6. Preview poster.
7. Provenance + hashes cuando sea crown-jewel.
8. CQC record.
9. Human gate.

### Preferred interchange
STATIC / HARD SURFACE:
- FBX 2020.2 for UE ingestion where useful.
- GLB/glTF 2.0 for Three.js/Web preview and portable inspection.
- optional USD for assembled scenes / non-destructive composition.

CHARACTER / CREATURE:
- FBX 2020.2 skeletal mesh.
- skeleton/root naming stable.
- animation clips separated and named.
- morph targets/blendshapes where required.
- GLB preview derivative allowed, not authority.

## REQUIRED MODEL VIEWS BEFORE 3D GENERATION WHEN RELEVANT
Minimum:
- front
- back
- left
- right
- 3/4 front
- 3/4 rear
- top/bottom if silhouette or mechanics require it
- scale reference

Technical companion views:
- neutral lighting
- material-ID / color-block view
- silhouette view
- wireframe after geometry exists
- collision/debug view
- UV inspection
- pivot/origin axes
- turntable

Characters additionally:
- A/T pose when rigging
- facial neutral
- hands/feet close-up
- face profile
- expression/morph targets if needed
- clothing/accessory separation.

Mechanical assets additionally:
- moving-part separation
- hinge/pivot axes
- closed/open states
- collision volumes
- interaction points.

## STATIC MESH QA
Check:
- scale in cm
- pivot/origin
- transforms clean
- normals/tangents
- watertight only when function requires
- UV0
- UV1/lightmap if relevant
- vertex colors if design uses them
- material slots minimal/coherent
- collision strategy
- Nanite suitability
- fallback mesh
- silhouette at gameplay distance
- texel density
- triangle/vertex count recorded
- material count recorded
- texture memory estimate
- world-space bounds
- LOD/HLOD role.

## MATERIAL / TEXTURE CONTRACT
Preserve source maps separately.
Typical PBR family:
- Base Color
- Normal
- Roughness
- Metallic
- AO when useful
- Emissive only when physically/narratively justified
- masks as needed

Do not bake lighting into authoritative Base Color.
Web preview may use derived/compressed textures.

WEB:
- prefer KTX2/Basis when scale justifies it
- GLTFLoader + KTX2Loader
- Draco/Meshopt only if measured benefit outweighs decode/runtime cost.

## THREE.JS / WEBGL PRE-UNREAL LAB
Package libraries locally under Private Vault CSP.
No CDN runtime dependency.

Viewer modes:
1. neutral studio
2. ISL cinematic bracket
3. harsh validation light
4. silhouette
5. material-debug
6. wireframe / normals
7. mobile low profile

Keep same:
- camera focal family
- world scale
- light positions
- exposure
for A/B comparisons.

Measure:
- GLB bytes
- decoded geometry
- texture bytes
- draw calls
- material count
- load time
- first interaction time
- FPS / frame time
- GPU memory when measurable.

## LIGHTING TRANSLATION
Web preview purpose:
validate RELATIONAL lighting, not fake Unreal fidelity.

ISL floor:
deep local blacks
+ modeled midtones
+ controlled highlights
+ warm/cool functional separation
+ atmospheric depth
+ material separation
+ human/world readability.

For Unreal:
build equivalent lighting intent using Lumen/non-Lumen profile by target.
Do not lock a single renderer solution before device evidence.

## WORLD READINESS
Prepare naming and schemas for:
- world regions
- islands
- subzones
- level instances
- Data Layers
- runtime states
- HLOD groups
- streaming sources
- navigation
- encounters
- interactive objects
- crew/NPC spawn sets
- audio zones
- VFX zones.

Guided-world principle remains compatible:
local freedom + controlled transitions + curtains/air boundaries where design requires.

## PERFORMANCE / DEVICE MATRIX
No single "A++" preset.
Targets need evidence.

Maintain profiles for at least:
- development PC
- target PC low / medium / high
- PS-class console candidate
- Android tablet real device
- Android phone real device
- Web preview
- Carrillo PC/mobile/tablet human lane.

For each milestone record:
- target FPS
- resolution/internal resolution
- CPU frame
- GPU frame
- memory
- VRAM
- draw calls where meaningful
- visible actor count
- skeletal actor count
- VFX load
- streaming spikes
- package/build size
- shader/PSO stalls.

## ASSET BUDGET MODEL
Every major family receives:
COUNT × AVG SOURCE SIZE
COUNT × AVG RUNTIME SIZE
TEXTURE MEMORY
MESH MEMORY
AUDIO
VIDEO/PROMO
BUILD OVERHEAD
BACKUP MULTIPLIER.

Re-estimate at milestones, not once.
Use real sample distributions once 10–20 representative assets exist.

## GENERATION CADENCE
ONE ACTIVE FAMILY · ONE NEXT FAMILY · REST PARKED.

For each active family:
REFERENCE / SOURCE LOCK
→ views
→ generation
→ geometry QA
→ controlled texture mutation
→ Three.js lab
→ human test
→ UE import smoke
→ KEEP/MUTATE/PARK/KILL.

Avoid producing hundreds of unvalidated assets.
A bad pipeline multiplied by 500 is not progress.

## CREATIVE DNA CROSSING
Reusable abstraction only:
SEED
+ separable layers
+ relations
+ mutation rules
+ provenance
+ human response
+ distance/reencounter.

Every important entity may become a deep subsystem only when evidence justifies it.
Do not expand every entity automatically.

## BUG → METHOD
When a bug is found:
OBSERVE
→ ROOT CAUSE
→ FIX
→ REGRESSION TEST
→ ABSTRACT RULE
→ PROPAGATE TO BUILD/CQC
→ RETURN TO CREATION.

Gallery CSP bug example becomes:
NO EXTERNAL RUNTIME DEPENDENCY ON PRIVATE SURFACES WITHOUT CSP DECLARATION + OFFLINE FALLBACK.

## BACKUP / RESILIENCE
GitHub source of truth is not itself a backup.
Required:
- Git mirror backup
- LFS objects if used
- Drive archive
- second independent repository or offline media
- periodic restore drill
- Netlify deploy/config inventory
- secrets inventory without copying secrets into docs
- generated masters archive
- checksum for crown jewels.

Apply 3-2-1 logic where practical:
3 copies / 2 storage types / 1 off-site-independent copy.

## SECURITY / LEGAL
Before public commercial launch:
- contributor rights
- music/image/video/3D provenance
- AI service terms
- trademarks
- privacy
- licenses
- third-party asset licenses
- voice/likeness if any
- music rights
- Kickstarter claims
- supplier agreements
- platform requirements.

Do not "roce la legalidad" by violating terms.
Optimize aggressively only inside written rules and documented APIs.

## RELEASE / CAMPAIGN READINESS
Campaign and game are separate gates.
Kickstarter:
PREVIEW → close-human feedback → PRELAUNCH → audience warm-up → launch → mid-campaign plan → updates → close → fulfillment communication.
No date until production evidence and campaign assets reach gate.

SEO public surfaces:
people-first content
+ descriptive titles/headings
+ crawlable links
+ image/video structured hygiene
+ no spam tactics
+ public/private boundary.

## ONE ACTIVE
Gallery Runtime Repair:
top-quality image viewer + local thumbnails + local audio/video + 3D local-viewer strategy.

## ONE NEXT
Three.js Local Asset Lab:
GLB + local loaders + neutral/cinematic/debug lighting + measured asset budget.

## AFTER THAT
Representative Unreal ingestion smoke:
1 static prop
1 hero relic
1 environment module
1 skeletal/creature asset when source is ready
1 audio reactive prototype
1 VFX prototype.

No mass asset factory until these five lanes pass.


## CROSS-STANDARD GAP AUDIT · 2026-09-26
Comparado contra NASA Systems Engineering / V&V / Configuration Management, Google SRE, Twitch Extension/Broadcast operational constraints y Unreal Engine 5.8 official testing/profiling docs.

No crear órganos nuevos. Estos son contratos faltantes a insertar gradualmente en capas existentes.

### GAP 1 · REQUIREMENT → VERIFICATION → VALIDATION TRACE
Estado: PARTIAL.
Ya existen U0–U8 / T0–T8, human gates y tests, pero falta una matriz mínima que distinga:
- REQUIREMENT / INTENT
- VERIFICATION METHOD
- VALIDATION METHOD
- TARGET ENVIRONMENT
- EVIDENCE
- STATUS
- OWNER/HUMAN GATE.

Regla:
VERIFICATION = “¿lo construimos conforme al contrato?”
VALIDATION = “¿sirve de verdad al humano en el entorno previsto?”

Aplicar primero a:
Gallery
Velaria P0
save/state
Unreal import
input
cross-device
audio/video/3D runtime.

### GAP 2 · INTERFACE CONTROL CONTRACT
Estado: PARTIAL.
Cada frontera material debe tener un contrato pequeño:
SOURCE → FORMAT → ID → VERSION → AUTHORITY → FAILURE MODE → FALLBACK → TEST.

Primeras interfaces:
Drive ↔ Gallery
GitHub ↔ Netlify
Gallery ↔ local media runtime
3D source ↔ GLB web ↔ FBX/UE
Web/app ↔ localStorage/save
Unreal ↔ external derived exports.

No duplicar datos por conveniencia sin autoridad explícita.

### GAP 3 · SLO / ERROR BUDGET FOR DEVELOPMENT SURFACES
Estado: MISSING FORMALIZATION.
No usar “99.99%” ficticio.
Definir sólo SLOs humanos y medibles cuando exista suficiente evidencia.

Ejemplos de SLIs:
- Gallery card opens correct asset
- thumbnail visible
- media starts
- wrong-content rate
- broken-button rate
- cold load time
- device crash rate
- save/reload correctness.

Policy:
if repeated regressions exceed agreed tolerance, freeze feature expansion on that surface and spend the next cycle on reliability/security/regression fixes.

### GAP 4 · CANARY / STAGED DELIVERY
Estado: PARTIAL.
Carrillo/private preview already acts as human canary, but formalize:
BUILD
→ automated smoke
→ private device canary
→ second device/profile
→ broader private cohort
→ public only after explicit gate.

Rollback must be known before promotion.
Never use production/public as first realistic test.

### GAP 5 · INCIDENT / BUG POSTMORTEM THRESHOLD
Estado: PARTIAL.
BUG → METHOD exists.
Add lightweight postmortem only for:
- repeated user-visible regression
- data loss/corruption
- security/privacy boundary failure
- rollback required
- monitoring/test failed to detect a major issue.

Template:
IMPACT
→ TIMELINE
→ ROOT/CONTRIBUTING CAUSES
→ WHAT WORKED
→ WHAT FAILED
→ WHERE WE GOT LUCKY
→ ONE PREVENTIVE GUARD.

Blameless: fix system/process, not person.

### GAP 6 · SCREENSHOT / CONTENT-STRESS REGRESSION
Estado: MISSING EXECUTION.
Unreal Automation supports unit / feature / smoke / content stress / screenshot comparison.

Adopt when Unreal lane opens:
- load all critical maps/packages
- compile/load representative Blueprints/assets
- screenshot baseline for lighting/UI/gameplay gates
- resolution/device-profile checks
- save/load golden path.

Do not baseline unstable art prematurely.

### GAP 7 · LOCAL STATE MIGRATION / EXPORT
Estado: MISSING.
Collector/Passport/Gallery experiments use browser-local state.
Before human history matters:
- version local schema
- provide export/import
- define reset
- define migration
- distinguish ephemeral sensor state from durable human trace.

Never let browser clear/cache loss silently destroy a HUMAN TRACE that was supposed to persist.

### GAP 8 · STORAGE / RESTORE EVIDENCE
Estado: MISSING EXECUTION, METHOD PRESENT.
Git mirror / second backup / Drive are planned, but restore evidence is not yet demonstrated.

Required future drill:
1. fresh empty workspace
2. restore repo from independent copy
3. restore one crown-jewel media master
4. rebuild private surface
5. verify hashes/IDs
6. record result.

BACKUP WITHOUT RESTORE TEST = UNVERIFIED BACKUP.

### GAP 9 · DEPENDENCY / BUILD REPRODUCIBILITY
Estado: PARTIAL.
Before Unreal scale-up:
- pin critical tool/runtime versions when feasible
- archive dependency manifests
- record Unreal engine version once frozen
- record plugin versions
- preserve build scripts
- produce build receipt.

No hidden “works on my machine” dependency.

### GAP 10 · STREAM / TWITCH-STYLE REVIEW MODE
Estado: PREPARED CONCEPT ONLY.
Lessons transferable without adopting Twitch as architecture:
- sandbox/CSP explicit
- media/audio controls visible; avoid surprise autoplay
- mobile readability/accessibility
- review build must load without secret manual setup
- bandwidth/test mode for stream integration
- production credentials/stream keys never in client/repo.

Use only if streaming surface becomes active.

### GAP 11 · RESOURCE ENVELOPE / SATURATION
Estado: PARTIAL.
Asset budget exists; add milestone resource envelope based on real measurements:
- repo bytes
- Drive bytes
- build bytes
- media runtime bytes
- texture memory
- VRAM/RAM
- shader/PSO growth
- package time
- upload/deploy time.

No arbitrary panic threshold.
After 10–20 representative assets, fit real distributions and project P50/P90 growth.

### GAP 12 · LAUNCH READINESS MATRIX
Estado: PARTIAL.
Campaign/SEO/legal/security exist in separate methods, but before public milestone produce ONE compact launch matrix:
PRODUCT
BUILD
DEVICE
PERFORMANCE
ACCESSIBILITY
PRIVACY
SECURITY
IP/RIGHTS
STORE/PLATFORM
CAMPAIGN CLAIMS
SEO/PUBLIC METADATA
BACKUP/ROLLBACK
SUPPORT/COMMUNICATION
FULFILLMENT if physical.

Public gate remains HUMAN.

## PRIORITY
Do not execute all gaps now.

P0 NOW:
1. Gallery runtime + top-quality view + local previews.
2. local-state/runtime correctness.
3. real-device validation.

P1 NEXT:
4. Three.js asset lab.
5. first Requirement→V&V trace rows.
6. interface contracts for GLB/FBX/runtime.

P2 WHEN UNREAL OPENS:
7. screenshot/content-stress automation.
8. Device Profiles/perf envelope.
9. staged/canary packaged builds.

P3 BEFORE PUBLIC CAMPAIGN:
10. launch matrix.
11. IP/rights ledger.
12. restore drill + verified independent mirror.

ANTI-BUREAUCRACY:
If a matrix is not changing a decision, reducing risk or proving readiness, do not fill it in.
