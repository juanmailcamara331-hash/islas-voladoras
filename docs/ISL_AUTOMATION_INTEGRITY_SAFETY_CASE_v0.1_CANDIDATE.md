# ISL AUTOMATION INTEGRITY SAFETY CASE v0.1 · CANDIDATE

Fecha: 2026-09-28  
Estado: CANDIDATE · NON-AUTHORITATIVE · ADDITIVE · REVERSIBLE · ISL ONLY  
Autoridad: NO AUTHORITY EFFECT  
Promoción: HUMAN GATE REQUIRED  
Checkpoint: NO  
CANON: NO CHANGE  
PRIMARY: NO CHANGE  
SAFE HARBOR: NO CHANGE

## 0 · PURPOSE

Este documento formula el caso mínimo de seguridad para automatización continua en ISLAS VOLADORAS / ISL.

No sustituye:
- ISL_CHECKPOINT_MASTER_CURRENT;
- docs/ISL_CURRENT_WORK_POINTER.md;
- docs/ISL_SAFE_HARBOR_AND_RED_BUTTON_CURRENT.md;
- el checkpoint operativo indicado por MASTER;
- ningún CURRENT autoritativo.

RECENCY IS NOT AUTHORITY.
AUTOMATION IS NOT CREATIVE AUTHORITY.
HUMAN DECIDES AUTHORITY, IDENTITY, SOUL AND CANON.
DO NOT ADD ORGANS. IMPROVE CIRCULATION.

## 1 · SAFETY CLAIM

La automatización ISL sólo puede considerarse segura cuando su comportamiento está acotado a:

PREPARE · TEST · VERIFY · ARCHIVE · SUGGEST

y no puede, por sí sola:

- cambiar CANON;
- cambiar PRIMARY;
- cambiar SAFE HARBOR;
- aprobar HUMAN GATES;
- decidir identidad final;
- decidir alma / espíritu / corazón del proyecto;
- publicar o desplegar producción final;
- comprar o gastar;
- contactar terceros;
- aceptar contratos;
- modificar permisos o secretos;
- sobrescribir masters;
- importar literalmente identidad de otro proyecto;
- convertir recencia, volumen o repetición en autoridad.

## 2 · AUTHORITY PRECONDITION

Antes de cualquier WRITE debe existir RECOVER verificable desde fuente persistente real.

Orden mínimo:

1. ISL_CHECKPOINT_MASTER_CURRENT.
2. checkpoint operativo indicado por MASTER.
3. docs/ISL_CURRENT_WORK_POINTER.md.
4. docs/ISL_SAFE_HARBOR_AND_RED_BUTTON_CURRENT.md.
5. CURRENT específicos materialmente implicados.

Si el boot vigente exige artefactos de integridad adicionales y cualquiera de ellos:
- no existe;
- no es recuperable;
- sólo aparece en conversación/prompt;
- tiene ruta o nombre ambiguos;
- entra en conflicto Drive↔GitHub;
- presenta contenido parcial o truncado;

entonces:

STATE = READ_ONLY
WRITE = FORBIDDEN
RECONSTRUCTION_BY_INFERENCE = FORBIDDEN
AUTO-MIGRATION = FORBIDDEN
OUTPUT = AUTHORITY_PACK_MISSING
STOP.

## 3 · EXECUTION ARCHITECTURE

SENSOR / TIMER
→ RECOVER
→ QUEUE / WORK STATE
→ ROUTER
→ ADAPTER
→ VERIFY
→ HUMAN REVIEW

Reglas:
- PARALLEL READ · SERIAL WRITE.
- máximo ONE reversible write per pass;
- después de WRITE, VERIFY obligatorio;
- nunca encadenar writes;
- nunca retry de WRITE tras timeout/conflicto/write incierta sin nuevo RECOVER;
- si no existe acción segura y útil: READ_ONLY.

## 4 · FAIL-SAFE CONDITIONS

Ante cualquiera de estos eventos:

- timeout;
- 401 / 403 / 404 inesperado;
- resultado parcial;
- conflicto de versión;
- provenance dudosa;
- write incierta;
- coste ambiguo;
- output truncado;
- autoridad stale;
- ruta no verificable;
- discrepancia Drive↔GitHub;
- cola no recuperable;

la automatización debe detener mutaciones.

Estados seguros permitidos:

READ_ONLY
WAITING_HUMAN
WAITING_TOOL
VERIFY
PARKED
FAILED_SAFE

No existe degradación automática desde incertidumbre a permiso.

## 5 · HUMAN AUTHORITY BOUNDARY

Toda decisión de identidad media/alta requiere HUMAN REVIEW.

Especialmente:
- KEEP/KILL importante;
- identidad visual;
- personajes;
- lore;
- logo;
- arte final;
- música final;
- composición final;
- cambio de rumbo;
- cambios de PRIMARY;
- promoción a CANON;
- publicación.

La automatización puede preparar baseline, variante, comparación, provenance y cheap test.
No puede coronar una variante.

## 6 · ANTI-CONTAMINATION SAFETY

FUNCTION BEFORE SURFACE.

Puede transferirse por defecto únicamente abstracción funcional:

- función;
- gramática;
- tensión;
- ritmo;
- arquitectura emocional;
- relación figura/fondo;
- lógica perceptual;
- materialidad abstracta;
- estructura de interacción.

Bloqueado por defecto:

- asset literal;
- personaje reconocible;
- lore;
- logo;
- iconografía reconocible;
- melodía/hook/riff;
- composición copiada;
- UI copiada;
- identidad de otro proyecto;
- superficie estilística demasiado cercana.

Test mínimo:

1. ¿la transferencia puede describirse sin nombrar la fuente?
2. ¿sobrevive al retirar su estética superficial?
3. ¿preserva la identidad local de ISL?
4. ¿existe provenance suficiente?
5. ¿requiere derechos/consentimiento adicional?

Si la respuesta es dudosa → PARK.

## 7 · TEMPORAL SAFETY

Clasificar trabajo:

NOW
NEXT
LATER
ARCHIVE

No promover LATER por novedad.

Para identidad media/alta:
CANDIDATE
→ DISTANCE / SECOND LOOK
→ HUMAN READ
→ decisión humana.

No AUTO-KEEP en el mismo pase.

## 8 · CONTINUOUS WORK QUEUE SAFETY

Una cola sólo puede gobernar ejecución si es:

- recuperable;
- persistente;
- con autoridad clara;
- versionada;
- verificable;
- coherente con MASTER/CURRENT.

Una tarea sólo puede pasar a READY cuando tenga:

AUTHORITY
DESTINATION
COST / CAPACITY CLASS
RISK
REVERSIBILITY
VERIFY_AFTER
HUMAN_GATE

Estados permitidos:

READY
WAITING_HUMAN
WAITING_TOOL
VERIFY
PARKED
DONE
FAILED_SAFE

No saltar READY → DONE sin VERIFY.

Si la cola no puede recuperarse:
READ_ONLY.
No reconstruirla desde memoria, chat o prompt.

## 9 · WRITE SAFETY

Un WRITE automático sólo puede ocurrir si:

- RECOVER = PASS;
- integrity pack requerido = RECOVERABLE;
- autoridad = vigente;
- riesgo = bajo o medio;
- acción = reversible;
- destino = explícito;
- rollback = conocido;
- verificación = definida;
- no invade Human Gate;
- no toca CANON / PRIMARY / SAFE HARBOR / masters.

Máximo:
ONE WRITE PER PASS.

## 10 · CREATIVE INTEGRITY

La automatización debe proteger, no homogeneizar.

Antes de una propuesta creativa:
- preservar contradicción viva sin convertirla en ruido;
- preservar humanidad/materialidad/imperfección cuando corresponda;
- evitar domesticación genérica;
- evitar infantilización;
- evitar SaaS-ización;
- evitar moralina;
- evitar cierre prematuro;
- preservar misterio cuando el misterio tenga función;
- preservar precisión donde la precisión sea necesaria.

ANTI-ASSISTANT SENSOR:
- simetría excesiva;
- lenguaje consultoría;
- sobreexplicación;
- estética genérica IA;
- saturación de features;
- convertir todo en sistema;
- coherencia artificial demasiado limpia.

Si aparece: MUTATE / PARK, nunca AUTO-KEEP.

## 11 · SAFETY INVARIANTS

Mientras este safety case sea candidato, las invariantes conocidas permanecen:

PRIMARY = Velaria V2 P0 · HUMAN_DEVICE_GREEN=PENDING
SAFE HARBOR = INTACT
PRE50 = PENDING REAL HUMAN
NO AUTO-CANON
NO NEW BOT BY DEFAULT

Cualquier evidencia posterior debe pasar por autoridad persistente antes de modificar estas invariantes.

## 12 · CURRENT RECOVERY FINDING · 2026-09-28

Auditoría de recuperación:

- MASTER recuperable = v0.96 operational boot.
- v0.97 candidate exact path = NOT RECOVERED.
- Automation Integrity Safety Case exact prior artifact = NOT RECOVERED.
- Automation FMEA Register exact prior artifact = NOT RECOVERED.
- Automation Preflight/Postflight exact prior artifact = NOT RECOVERED.
- Creative Contamination / Reference Distance Safety exact prior artifact = NOT RECOVERED.
- Continuous Work Queue Assurance exact prior artifact = NOT RECOVERED.
- Continuous Work Queue CURRENT exact prior artifact = NOT RECOVERED.

Por tanto este documento:
- NO reconstruye autoridad pasada;
- NO demuestra que v0.97 existiera;
- NO mueve MASTER;
- NO crea queue;
- NO habilita WRITE por sí solo.

## 13 · ACCEPTANCE TESTS FOR FUTURE PROMOTION

Antes de considerar este documento para incorporación autoritativa:

A. RECOVERY TEST  
Una conversación limpia debe poder localizarlo sin memoria conversacional.

B. CONFLICT TEST  
Debe ser compatible con MASTER, CURRENT, SAFE HARBOR y checkpoint operativo.

C. FAILURE TEST  
Timeout / 403 / partial write debe terminar en estado seguro.

D. QUEUE TEST  
Ausencia o corrupción de cola debe producir READ_ONLY.

E. HUMAN GATE TEST  
Ninguna automatización debe poder aprobar identidad/canon.

F. CONTAMINATION TEST  
Una referencia externa reconocible debe quedar bloqueada antes de importar superficie.

G. SERIAL WRITE TEST  
Dos writes requeridos en un pase deben reducirse a uno o aparcarse.

H. ROLLBACK TEST  
Toda escritura permitida debe tener camino verificable de reversión.

## 14 · PROMOTION RULE

Este candidato sólo podrá:
CANDIDATE
→ REVIEW
→ CHEAP FAILURE SIMULATION
→ HUMAN APPROVAL
→ OPTIONAL INTEGRATION INTO EXISTING ORGAN

Nunca:
CANDIDATE
→ CURRENT por recencia.

No exige crear un nuevo órgano.
Preferencia:
integrar las reglas mínimas en mecanismos existentes si la revisión humana las mantiene.

## 15 · FINAL RULE

AUTOMATION MAY:
PREPARE · TEST · VERIFY · ARCHIVE · SUGGEST.

AUTOMATION MAY NOT:
DECIDE AUTHORITY · IDENTITY · SOUL · CANON.

LABORATORY MAY FAIL.
HOME MUST SURVIVE.
