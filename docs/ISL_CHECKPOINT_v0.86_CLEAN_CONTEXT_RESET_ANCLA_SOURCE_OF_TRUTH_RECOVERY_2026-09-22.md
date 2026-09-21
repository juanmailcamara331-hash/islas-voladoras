# ISL CHECKPOINT v0.86 · CLEAN CONTEXT RESET / ANCLA SOURCE-OF-TRUTH RECOVERY
Fecha: 2026-09-22
Estado: CHECKPOINT · ISL ONLY

## MOTIVO
La conversación acumuló contaminación contextual durante la Physical Color Lane:
- se repitieron fichas ya resueltas;
- una variante reciente ganó peso por recencia;
- se usó una medalla/frontal incorrecto para una extracción técnica;
- el usuario detectó correctamente que no correspondía al Ancla aprobada.

Este checkpoint aplica:
STOP → LAST GOOD → SUPERSEDE WRONG OUTPUT → RESTORE SOURCE_OF_TRUTH → NEW CHAT.

## PRIMARY
Velaria V2 P0
HUMAN_DEVICE_GREEN = PENDING

La Physical Color Lane sigue siendo temporal y no desplaza el PRIMARY.

## ANCLA DEL REGRESO · ESTADO

### REVERSO
AUTHORITATIVE / LOCKED:
La lámina técnica reconfirmada por el usuario el 2026-09-22:
- rosa/estrella central de navegación;
- teal + latón antiguo;
- isla flotante inferior;
- nubes/viento;
- 48 mm;
- texto visible:
  SIEMPRE HAY UN LUGAR
  AL QUE VOLVER
- lenguaje técnico editorial blanco;
- referencia visual que manda para el reverso.

Archivo visual actual en conversación:
user-uploaded 1000042696.jpg

### FRONTAL
SOURCE_OF_TRUTH = PENDING HUMAN RECONFIRMATION IN NEXT CHAT.

IMPORTANTE:
No inferir el frontal correcto desde generaciones recientes.
No usar como autoridad:
- la medalla con cuerda;
- la medalla con composición alternativa;
- ninguna extracción técnica posterior si no está anclada explícitamente por el usuario.

En la nueva conversación, el usuario debe adjuntar/reconfirmar el frontal correcto del Ancla y ese archivo se marcará AUTHORITATIVE antes de cualquier extracción.

## OUTPUTS SUPERSEDED / DO NOT USE
- ISL_ANCLA_FRONT_MANUFACTURING_v0.4.zip
- ANCLA_FRONT_MANUFACTURING_PREVIEW_v0.4.png
- sus máscaras/SVG derivados

Razón:
se derivaron de un frontal/medalla incorrecto.

Estos outputs pueden conservarse sólo como evidencia de error metodológico, nunca como input de fabricación.

## LO QUE SÍ QUEDA VIGENTE
- ISL_ENTITY_MEMORY_AND_ANTI_DUPLICATION_PROTOCOL_CURRENT
- ISL_CONTEXT_HYGIENE_AND_REFERENCE_AUTHORITY_PROTOCOL_CURRENT
- ISL_PHYSICAL_ENTITY_REGISTRY_CURRENT.json
- ISL_META_LAYER_ORCHESTRATOR_CURRENT
- ISL_CREATIVE_MOMENTUM_AND_ARTIFACT_LOOP_CURRENT
- ISL_META_GIFTS_MAKING_OF_AND_EASTER_EGG_TRACE_PROTOCOL_CURRENT
- Unreal Readiness current docs
- Security / connector / backup / quality router current docs
- Supplier shortlist + RFQs
- manufacturing philosophy: 1–3 samples → CQC → decision
- physical sequence: Ancla → Pasaporte → Credencial → Gracias Máquina Rara → return to Velaria HUMAN_DEVICE_GREEN

## NEW CHAT BOOT
Leer:
1. ISL_CHECKPOINT_MASTER_CURRENT
2. ISL_CHECKPOINT_v0.86_CLEAN_CONTEXT_RESET_ANCLA_SOURCE_OF_TRUTH_RECOVERY_2026-09-22.md
3. ISL_CURRENT_WORK_POINTER.md
4. ISL_META_LAYER_ORCHESTRATOR_CURRENT.md
5. ISL_ENTITY_MEMORY_AND_ANTI_DUPLICATION_PROTOCOL_CURRENT.md
6. ISL_CONTEXT_HYGIENE_AND_REFERENCE_AUTHORITY_PROTOCOL_CURRENT.md
7. ISL_PHYSICAL_ENTITY_REGISTRY_CURRENT.json
8. ISL_PHYSICAL_001_ANCLA_DEL_REGRESO_MANUFACTURING_SPEC_v0.1

## FIRST ACTION IN NEW CHAT
1. User attaches/reconfirms the exact correct FRONT reference of Ancla del Regreso.
2. Mark it AUTHORITATIVE / LOCKED.
3. Compare it against the locked reverse only for shared manufacturing language, not for redesign.
4. Extract manufacturing assets from the exact front:
   CUTLINE / BASE_METAL / ENAMEL / RELIEF / ENGRAVING.
5. Human visual check.
6. Then derive reverse manufacturing assets from the locked star/compass sheet.
7. Merge both into supplier pack.
8. Digital CQC.
9. Request 1–3 samples.
10. Physical CQC.

## GUARD
RECENCY IS NOT AUTHORITY.
THE APPROVED ASSET WINS.
IF FRONT SOURCE IS UNCLEAR: STOP, DO NOT GENERATE.

## META-LESSON
This failure validates the need for:
- entity memory;
- source-of-truth authority;
- context hygiene;
- clean resets when long chats accumulate candidate variants.

Do not treat this as a failure of the whole process; treat it as a caught regression.
