# ISL · GIFT COMBINATION ENGINE · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · TRANSVERSAL · ISL ONLY

## PROPÓSITO
Hacer que los regalos de Buenos días / Buenas noches no sean una pieza aislada ni una fórmula repetida.
Cada regalo nace de una combinación controlada de capas y puede vivir en varios destinos.

## REGLA
ANTES DE PRODUCIR:
PROFILE
→ CALAS
→ ASSET FAMILY
→ DESTINATION
→ TOOL/PROMPT
→ CROSS-ART PRINCIPLE
→ REFERENCE DISTANCE
→ HUMAN TEXTURE
→ SECOND LIFE
→ EVENT REFLEX LOOP.

## CALAS
1 = pieza
2 = pieza + destino
3 = pieza + destino + herramienta/prompt
4 = pieza + destino + herramienta + integración ISL
5 = pieza + destino + herramienta + integración + segunda vida
6+ = sólo hitos/sesiones explícitas

## ASSET FAMILIES
- image/postcard/keyframe
- video/previs
- music/audio/ambience
- 3D/Meshy/prop
- physical/mockup/gift
- micro-scene/dialogue
- UI/sign/fourth-wall
- code/microinteraction
- making-of
- Easter egg/callback
- dossier/teaser
- neuroperceptual experiment
- real-world capture mutation
- worldbuilding functional

## DESTINATIONS
- game
- Velaria
- Recreativa
- Gallery
- making-of
- Easter egg
- fourth wall
- physical
- father/Carrillo/friends
- music
- video
- 3D
- future level
- archive
- teaser
- human test

## TOOL/PROMPT LAYER
When useful, produce one ready-to-use prompt for:
- Gemini video/audio
- Midjourney
- Meshy
- Kiri / scan
- Unreal implementation brief
- coding micro-prototype
- physical supplier/mockup
- image generation

Never add a tool just to look sophisticated.

## CROSS-ART DRAW
Select:
- 1 nearby craft
- optionally 1 distant craft
Examples:
cinema, architecture, music, theatre, painting, sculpture, UX, literature, comics, photography, craft, dance, illusion, museography, science, engineering, anthropology, perception.

Extract FUNCTION → CONTRAST → MUTATE TO ISL.

## REFERENCE DISTANCE
If references are used:
- evoke era/function/emotion, not signature;
- avoid identifiable melody/hook/riff/character/iconography;
- historical/public-domain references still need source/edition/recording checks.

## HUMAN TEXTURE
Optional:
- asymmetry
- silence
- wear
- awkward little gesture
- lateral joke
- imperfect material
- handwritten trace
Never fake human authorship or factual errors.

## SECOND LIFE
At least occasionally ask:
"Where could this return later?"
Examples:
image → physical card → scene prop → Easter egg → making-of
sound → room ambience → trailer texture → relic interaction
real object → scan → 3D prop → lore seed → physical replica

## ANTI-REPETITION
Track recent:
- profile
- number of calas
- asset family
- destination
- craft pair
- tool
- emotional temperature
Avoid repeating the same combination.

## OUTPUT FORMAT
Do not dump internal machinery unless useful.
User-facing gift should feel simple:
1. gift
2. why it belongs in ISL
3. optional ready prompt / exact next step
4. optional second life

## COMMIT
If meaningful:
Event Reflex Loop → provenance → registry/gallery/trace → return PRIMARY.

## STOP
A small beautiful gift beats a forced six-layer contraption.


## PROMPT ORCHESTRATION / HANDOFF CHAIN · 2026-09-22

### PRINCIPIO
Un regalo no es una colección de prompts independientes.
Debe existir una cadena clara de autoridad y herencia:

SEED / GIFT INTENT
→ MASTER BRIEF
→ TOOL-SPECIFIC CANDIDATES
→ HUMAN/CQC SELECTION
→ SELECTED VISUAL REFERENCE
→ MOTION / 3D / PHYSICAL / MAKING-OF DERIVATIVES
→ SECOND LIFE DECISION
→ EVENT REFLEX LOOP
→ RETURN PRIMARY.

Cada prompt derivado debe heredar lo que ya fue validado y NO volver a inventar identidad, material, proporciones, composición o tono salvo que el objetivo explícito sea explorar una variante.

### PROMPT ROLES

#### P0 · SEED
Define:
- emoción;
- función;
- contradicción;
- por qué pertenece a ISL;
- posible destino.

Puede ser una sola cala.
No contiene necesariamente especificaciones técnicas.

#### P1 · MASTER BRIEF
Fuente de verdad creativa del regalo.
Define:
- núcleo;
- materialidad;
- composición;
- restricciones;
- reference distance;
- human texture;
- posibles segundas vidas.

Los prompts de herramientas derivan de P1.

#### P2 · IMAGE CANDIDATES
Imagegen / Midjourney / Gemini Image pueden producir candidatos A/B/C.
No son MASTER automáticamente.

Cada candidato debe indicar:
- tool;
- prompt version;
- seed/reference si existe;
- strengths;
- failures;
- CQC result.

#### P3 · SELECTED VISUAL REFERENCE
Sólo tras comparación humana/CQC.
Una imagen seleccionada puede convertirse en VISUAL_REFERENCE_CURRENT para derivados.

Regla:
TEXT BRIEF sigue siendo autoridad semántica.
SELECTED IMAGE se convierte en autoridad visual para:
- composición;
- material;
- proporción;
- desgaste;
- iluminación;
- placement;
- camera relation.

Si imagen y brief chocan:
brief gana salvo decisión humana explícita.

#### P4 · VIDEO / MOTION
El vídeo NO debe regenerar el diseño desde cero si existe VISUAL_REFERENCE_CURRENT.

Input recomendado:
1. imagen seleccionada;
2. motion brief;
3. restricciones de continuidad;
4. audio/mood brief.

El prompt de vídeo debe describir principalmente:
- movimiento;
- cámara;
- viento;
- luz temporal;
- microacciones;
- duración;
- sonido;
- qué NO debe cambiar.

No volver a describir exhaustivamente la apariencia ya fijada salvo para bloquear drift.

Ejemplo de continuidad:
"Use the supplied image as the visual source of truth. Preserve the mug design, wear, teal mark, brass hook, camera position, ship geometry and lighting identity. Animate only..."

#### P5 · 3D
Meshy / scan / modeling prompt debe partir de:
- MASTER BRIEF;
- SELECTED VISUAL REFERENCE;
- vistas adicionales si existen;
- escala física;
- material contract.

No inferir parte trasera o interior crítico sin referencia cuando importe.
Generar vistas/turnaround antes si desbloquea calidad.

#### P6 · PHYSICAL
El objeto físico consume:
- MASTER BRIEF;
- dimensiones;
- materiales;
- arte/inscripción aprobada;
- supplier constraints;
- proof/sample gate.

Nunca usar una imagen generativa como plano de fabricación suficiente.

#### P7 · MAKING-OF
El making-of consume la cadena real:
SEED → decisiones → descartes → candidato elegido → segunda vida.
No inventar una historia de proceso que no ocurrió.

#### P8 · CAMPAIGN / PUBLIC
Sólo tras readiness:
- rights/provenance;
- product truth;
- human evidence cuando proceda;
- no claims sobre funciones no implementadas.

### REFERENCE PASSING RULE
Cada derivación debe decidir qué tipo de referencia recibe:

- TEXT_ONLY: exploración temprana.
- IMAGE_REFERENCE: continuidad visual.
- IMAGE + TEXT: continuidad + función.
- MULTI_VIEW: 3D/physical.
- AUDIO_REFERENCE: continuidad sonora.
- REAL_CAPTURE: materialidad/forma real.
- NO_REFERENCE: sólo cuando buscamos deliberadamente una rama nueva.

No usar NO_REFERENCE por defecto una vez existe una referencia seleccionada.

### SYNERGY ROUTER
Regalo visual → posible vídeo:
selected image + motion prompt.

Regalo visual → 3D:
selected image + extra views + scale/material prompt.

Regalo real → 3D:
real capture + scan + cleanup brief.

Regalo 3D → físico:
3D master + manufacturing spec + sample gate.

Regalo físico → juego:
photo/scan + function extraction + runtime adaptation.

Regalo → making-of:
actual process trace only.

Regalo → Easter egg:
preserve recognition cue but reduce exposition.

Regalo → marketing:
only after product/readiness gate.

### VERSION / NAMING
Para un regalo significativo:
GIFT_ID
- seed_v1
- master_brief_v1
- image_A_<tool>
- image_B_<tool>
- image_C_<tool>
- visual_selected_v1
- video_prompt_v1
- video_candidate_v1
- 3d_prompt_v1
- physical_spec_v1
- makingof_v1

No es obligatorio materializar todos los pasos.
Sólo crear los que existan.

### STOP RULE
Si el regalo funciona como una sola pieza:
PARAR.

Si una segunda vida mejora claramente el objeto:
abrir UNA.

No encadenar imagen → vídeo → 3D → físico → campaña sólo porque sea técnicamente posible.
