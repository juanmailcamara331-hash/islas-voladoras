# ISL — NUDOS PERSISTENTES PRE-BRIEF v0.65.2
Fecha: 2026-09-18
Estado: PREPARADO · NO IMPLEMENTAR HASTA R1–R3 GREEN + 3 criaturas validadas

## Base preservada
Hereda ISL_DIALECTICA_PERSISTENTE_v1:
- un NUDO aparece sólo cuando hay acción u omisión relevante;
- existe coste real;
- admite más de una lectura defendible;
- produce un cambio verificable;
- no existe barra moral;
- 1 consecuencia principal + hasta 2 ecos.

## Objetivo de esta fase
Demostrar que las 3 criaturas no son eventos aislados: dejan tensiones persistentes que pueden ser revisitadas por mundo, vínculos, ser y Brújula.

## Schema operativo v1
knot_id
tensions[]
source_events[]
world_delta_refs[]
relation_refs[]
unresolved_question
intensity_band
revisit_hooks[]
version

## Guardrails
- no inferir intención psicológica;
- registrar hechos, costes, omisiones y contexto;
- no sumar puntos de “bondad”;
- no farmear identidad con microacciones repetidas;
- no reescribir historial al migrar;
- ninguna consecuencia extra sin nueva causa;
- misma lógica en high/low tier.

## Primer set de NUDOS candidatos
### NUDO-A · MEMORIA / CONFIANZA
Fuente: criatura que recuerda.
Tensión candidata: intimidad / distancia; memoria / reinicio.
Cambio verificable: conducta futura de criatura + 1 eco relacional máximo.

### NUDO-B · REGLA / ADAPTACIÓN
Fuente: criatura que altera regla local.
Tensión candidata: disciplina / improvisación; claridad / exceso.
Cambio verificable: zona conserva una modificación o ruta asociada.

### NUDO-C · COSTE / PRIORIDAD
Fuente: criatura contradictoria.
Tensión candidata: cuidado / explotación; hogar / deriva; singularidad / pensamiento único.
Cambio verificable: una oportunidad futura aparece, cambia o desaparece por prioridad asumida.

## Revisit hook
Cada NUDO debe tener al menos una forma de reaparecer después:
- ruta modificada;
- gesto o silencio;
- affordance de reliquia;
- cambio ambiental;
- frase breve;
- criatura que responde de otra manera.

## Test metamórfico
- cambiar densidad visual no cambia NUDO;
- low/high tier produce mismo estado;
- reabrir sesión conserva causa y cambio;
- repetir microacción equivalente no aumenta intensidad indefinidamente;
- omitir una acción sólo crea NUDO si la omisión tenía coste/contexto real.

## Gate
No pasa a integración mayor hasta demostrar:
1. causalidad legible;
2. persistencia;
3. ausencia de moral score;
4. 1 principal + <=2 ecos;
5. rollback/migración;
6. reconocimiento humano de causa tardía.
