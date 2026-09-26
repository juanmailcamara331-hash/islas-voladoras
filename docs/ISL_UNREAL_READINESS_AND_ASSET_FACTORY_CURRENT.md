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
