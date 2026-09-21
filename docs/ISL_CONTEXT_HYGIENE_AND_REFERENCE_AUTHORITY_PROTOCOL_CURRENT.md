# ISL · CONTEXT HYGIENE & REFERENCE AUTHORITY PROTOCOL CURRENT
Fecha: 2026-09-21
Estado: OBLIGATORIO · ISL ONLY

## PROBLEMA
Conversaciones largas y generaciones sucesivas pueden introducir contaminación contextual:
- una variante reciente parece más importante que una referencia aprobada;
- una descripción verbal sustituye accidentalmente un asset real;
- un modelo regenera en vez de editar;
- se mezclan decisiones históricas con el estado actual.

## SOLUCIÓN
Trabajar con un CONTEXT WINDOW OPERATIVO ACOTADO por tarea.

### 1. ANCLA DE TAREA
Antes de actuar:
PROJECT = ISL
ENTITY = ente concreto
OPERATION = acción concreta
SOURCE_OF_TRUTH = archivo/asset/doc autorizado
FORBIDDEN = lo que no puede cambiar

### 2. CONTEXT FILTER
Sólo cargar:
- estado actual;
- referencias del ente;
- dependencias directas;
- regresiones relevantes;
- metodología necesaria.

No cargar ni usar como autoridad:
- variantes descartadas;
- assets superseded;
- otras piezas visuales;
- otros proyectos;
- exploraciones que no afecten a la tarea.

### 3. REFERENCE AUTHORITY
Etiqueta obligatoria:
AUTHORITATIVE
SUPPORTING
CANDIDATE
SUPERSEDED
DO_NOT_USE

AUTHORITATIVE manda.
SUPPORTING ayuda sin alterar.
CANDIDATE no sustituye.
SUPERSEDED y DO_NOT_USE se excluyen de generación.

### 4. IMAGE GENERATION RULE
Si existe imagen AUTHORITATIVE y la tarea es modificación/derivación:
usar esa imagen como target.
No generar “otra versión parecida”.
No componer desde memoria textual cuando existe asset visual real.

### 5. SESSION RESET SIN PERDER MEMORIA
No hace falta abrir conversación nueva para cada paso.
Hacer mini-reset lógico:
TASK ANCHOR → LOAD ONLY RELEVANT ENTITY → EXECUTE → VERIFY → REGISTER.

Abrir nueva conversación sólo cuando:
- cambia bloque grande;
- el contexto visible se vuelve confuso;
- se cierra checkpoint;
- o cambia PRIMARY.

### 6. ERROR RECOVERY
Si se detecta contaminación:
STOP → IDENTIFY LAST GOOD → MARK WRONG OUTPUT SUPERSEDED → RESTORE SOURCE_OF_TRUTH → RESUME FROM LAST GOOD.

## PRINCIPIO
RECENCY IS NOT AUTHORITY.
THE APPROVED ASSET WINS.
