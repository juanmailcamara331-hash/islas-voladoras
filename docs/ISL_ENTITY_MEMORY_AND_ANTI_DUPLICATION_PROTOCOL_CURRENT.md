# ISL · ENTITY MEMORY & ANTI-DUPLICATION PROTOCOL CURRENT
Fecha: 2026-09-21
Estado: OBLIGATORIO · ISL ONLY

## PROPÓSITO
Evitar repetir, rediseñar o contradecir entes ya creados cuando el trabajo continúa entre conversaciones, herramientas o generaciones.

## REGLA MAESTRA
ANTES DE GENERAR:
1. IDENTIFICAR ENTE.
2. BUSCAR SI YA EXISTE.
3. RECUPERAR SU SOURCE_OF_TRUTH.
4. LEER ESTADO: CANDIDATE / APPROVED_REFERENCE / LOCKED / SUPERSEDED / PARKED.
5. DECIDIR SI LA TAREA ES CREATE / EXTRACT / EDIT / VECTORIZE / DERIVE / REPLACE.
6. SI ES DERIVE O EDIT, NO REGENERAR EL ENTE COMPLETO.
7. SI HAY CONFLICTO ENTRE REFERENCIAS, LA MÁS RECIENTE EXPLÍCITAMENTE APROBADA POR HUMANO MANDA.
8. REGISTRAR QUÉ CAMBIÓ Y QUÉ NO.

## ANTI-DUPLICATION GUARD
No crear una nueva versión de un ente cuando:
- ya existe una versión aprobada;
- la tarea pide extraer capas, vectorizar, adaptar, preparar proveedor o cambiar formato;
- no existe una instrucción humana explícita de rediseño;
- la nueva generación sólo repite el mismo entregable con apariencia distinta.

## TIPOS DE OPERACIÓN
CREATE_NEW
EDIT_EXISTING
DERIVE_ASSET
FORMAT_CONVERT
TECHNICALIZE
VECTORIZE
OPTIMIZE_RUNTIME
SUPERSEDE
ARCHIVE

Por defecto, si existe APPROVED_REFERENCE:
EDIT_EXISTING o DERIVE_ASSET.
Nunca CREATE_NEW por defecto.

## SOURCE_OF_TRUTH
Cada ente importante debe declarar:
- isl_id
- name
- domain
- current_state
- source_of_truth
- approved_reference
- supersedes
- locked_features
- mutable_features
- forbidden_changes
- last_human_decision
- next_action

## REFERENCIA VISUAL
Una referencia marcada APPROVED_REFERENCE:
- no es “inspiración”;
- no se reinterpretará por estilo;
- no se sustituirá por una generación nueva;
- sirve para extracción, tracing, vectorización y fabricación;
- cualquier desviación debe explicarse y requerir aprobación.

## CONTEXT CONTAMINATION GUARD
Las generaciones recientes NO ganan autoridad por proximidad temporal.
Orden de autoridad:
1. decisión humana explícita actual;
2. SOURCE_OF_TRUTH registrado;
3. checkpoint/current protocol;
4. asset aprobado;
5. candidato reciente;
6. memoria conversacional informal.

Si el contexto reciente contradice 1–4, se ignora.

## PRE-FLIGHT MÍNIMO
ENTE:
OPERACIÓN:
SOURCE_OF_TRUTH:
LOCKED:
MUTABLE:
NO_REGENERATE:
NEXT_ACTION:

Si estos campos no están claros, no generar.

## POST-FLIGHT
Después de producir:
- comprobar que no se creó un duplicado;
- verificar que no cambió un rasgo bloqueado;
- actualizar registro;
- marcar superseded si procede;
- persistir sólo lo aprobado.

## STOP RULE
Si la tarea puede resolverse extrayendo o transformando un asset existente, no generar uno nuevo.

## PRINCIPIO
MEMORIA DE ENTES > MEMORIA DE CHAT.
DERIVAR > REINVENTAR.
