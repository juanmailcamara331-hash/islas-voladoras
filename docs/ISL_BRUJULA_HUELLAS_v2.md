# ISL — BRÚJULA DE LAS HUELLAS v2
Fecha: 2026-09-18
Estado: PROVISIONAL FUERTE · diseño ejecutable
Hereda: A/B congelado, 1A/1B PASS, motor de huella, 1 principal + hasta 2 ecos.

## Promesa
“No señala dónde ir. Señala de dónde vienes.”
La Brújula no da objetivos ni moraliza. Lee patrones persistentes producidos por conducta, ausencias, vínculos, contagio colectivo, acceso al poder y cruces de umbral.

## Hipótesis falsable
Un jugador externo puede usarla para formular una lectura útil de su trayectoria sin verla como GPS, barra moral o detector de quest.
Falla si: sólo explica lore, se puede farmear, predice la opción correcta o reduce la identidad a un número.

## Gramática de huellas
1. MEMORIA — lo hecho y lo omitido que dejó cambio verificable.
2. DESEO — patrones de aproximación, insistencia, renuncia y coste aceptado.
3. MÁSCARA — diferencia entre actuación pública, rito social y conducta fuera de mirada.
4. CONTAGIO — cuánto y cómo el jugador entra, rompe o redirige ritmos colectivos.
5. PODER — acceso, favores, dependencias, deuda, intermediación y captura.
6. UMBRAL — momentos donde una lectura del mundo deja de bastar y cambia la relación con él.

## Seis modos
- SENDERO: ordena 3–5 huellas recientes por causalidad, nunca por bien/mal.
- ECO: muestra una consecuencia secundaria o tardía que ya existe.
- MÁSCARA: compara conducta observada vs conducta en intimidad sin emitir veredicto.
- CONSEJO: superpone huellas de vínculos relevantes y revela desacuerdos de lectura.
- TRANCE: lee sincronía/ruptura con multitudes, música y sistemas rítmicos.
- UMBRAL: sólo se activa ante contradicciones de alta intensidad; no resuelve, abre una nueva pregunta jugable.

## Input y salida
Input mínimo versionado: event_id, context_id, actor, action_class, cost, reversibility, witness_scope, relation_ids, world_state_delta, timestamp, significance_band.
Output: TraceCluster[] con evidencia legible + confidence interna + una formulación diegética breve.
No guardar una personalidad final. Guardar hechos, contexto y relaciones.

## Significancia / anti-farming
La repetición trivial pierde peso contextual. Una huella gana relevancia por coste real, oportunidad perdida, irreversibilidad, vínculo, novedad, riesgo y cambio de mundo.
No usar contadores visibles de virtud.

## Primera huella histórica-performativa
HUELLA: El ritmo que aceptaste.
Se registra cuando el jugador entra en una escena colectiva y modifica su conducta por sincronía social.
Puede quedar como adhesión, resistencia, conducción o fuga; ninguna variante es moralmente superior por defecto.

## Persistencia
save schema: trace_schema_version = 2.
Migración desde v1: conservar eventos previos como MEMORY/UNKNOWN_CONTEXT; jamás inventar intención retroactiva.
Rollback: snapshot previo a migración + reconstrucción determinista de clusters.

## UI / diegesis
Dos agujas CANON se conservan:
- aguja A: lo que hiciste;
- aguja B: la consecuencia de lo que no hiciste.
Los seis modos se expresan por anillos/surcos, no por menú de estadísticas.
Accesibilidad: icono + patrón + texto; nunca color como único canal.

## Invariantes de plataforma
Mismo input de huellas, mismos clusters, mismas consecuencias, mismos secretos y mismos timings de lectura.
Escalable: partículas, reflejos, shader de metal/vidrio, secondary animation, audio tails.
Low-spec: 2 agujas + 1 anillo + vibración/sonido simple + texto breve.

## CQC
PASS si:
- el jugador distingue causa de interpretación;
- puede citar al menos una huella real que él produjo;
- no pregunta cuántos puntos buenos tengo;
- el modo Eco revela una consecuencia ya causada, no una sorpresa arbitraria;
- low-tier conserva exactamente la misma información jugable.
CAB-10..50 y P-00..P-100 aplican.

## Experimento mínimo
Una sesión de 12–15 min con 3 decisiones físicamente distintas, una omisión y una escena rítmica. Al final, probar SENDERO + ECO + TRANCE.
Promoción: sólo tras playtest humano y PC-70/90/100.
