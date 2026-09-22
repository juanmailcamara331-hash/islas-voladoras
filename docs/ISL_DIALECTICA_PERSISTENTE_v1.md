# ISL — DIALÉCTICA PERSISTENTE v1
Fecha: 2026-09-18
Estado: PROVISIONAL FUERTE

## Principio
ISL conserva tensiones vividas y sus efectos; no muestra una barra moral ni asigna una identidad final al jugador.

## Ejes internos
deseo/disciplina; espectáculo/verdad; intimidad/multitud; cuidado/explotación; claridad/exceso; archivo/vida; rito/improvisación; hogar/deriva; singularidad/pensamiento único.

## NUDO persistente
Se crea cuando una acción u omisión relevante tiene coste, admite más de una lectura defendible y produce un cambio verificable.
Schema: knot_id, tensions, source_events, world_delta_refs, relation_refs, unresolved_question, intensity_band, revisit_hooks, version.

## Regla de consecuencia
Cada NUDO: 1 consecuencia principal + hasta 2 ecos. Efectos adicionales requieren una nueva causa registrada.

## Expresión
MUNDO: rutas, objetos, servicios y estados locales.
VÍNCULO: cooperación, gesto, silencio, disponibilidad o desacuerdo.
SER: percepción, hábito, capacidad o cambio tardío sostenido por trayectoria.
BRÚJULA: lectura posterior, nunca veredicto.

## Integración B
Brújula lee NUDOS y eventos. Reliquias crean evidencia o deuda. Salón genera NUDOS de máscara/ritmo. Isla del Baile genera NUDOS de rito/multitud/cuidado. Criaturas responden a hechos y relaciones.

## Save
dialectic_schema_version = 1. Guardar hechos y referencias a cambios. Una migración puede cambiar etiquetas internas, nunca reescribir el historial del jugador.

## Prueba humana
Éxito si al regresar el jugador reconoce que un cambio actual procede de algo que hizo antes, sin que el juego le diga cuál era la respuesta correcta.


## Ejecución interactiva · 2026-09-22
Estado: SOURCE IMPLEMENTED · HUMAN EVIDENCE PENDING · NO CANON PROMOTION.

Integración real en `portal/isla-baile-inagotable.html`:
- NUDO-A · MEMORIA / CONFIANZA → Escarabeo-Registrador tras conservar un cambio significativo;
- NUDO-B · REGLA / ADAPTACIÓN → Danzante-Aguja cuando una variación cambia su referencia y deja ruta persistente;
- NUDO-C · COSTE / PRIORIDAD → Consejero de Niebla cuando un favor deja acceso + deuda o un rechazo sin leverage retira acceso.

Invariantes implementados:
- `dialectic_schema_version = 1`;
- hechos y referencias, no lectura psicológica;
- persistencia local;
- creación única por knot_id para impedir farming de intensidad;
- 1 consecuencia principal;
- máximo 1 eco actual por NUDO;
- pregunta no resuelta + revisit hooks;
- sin moral score.

Pendiente:
- evidencia humana de causalidad tardía;
- rollback/migración explícitos;
- CQC cruzado B×A.
