# ISL — VELARIA GREYBOX BUILD CONTRACT v0.18
Fecha: 2026-09-18
Estado: BORRADOR DE IMPLEMENTACIÓN / NO CANON
Objetivo: definir el mínimo construible del primer vertical slice físico de Velaria sin inflar alcance.

## DURACIÓN
Target de prototipo: 12–20 min.

## ESCENAS / ZONAS
G00_START_CURRENT
- corredor de aproximación;
- viento lateral;
- dos rutas: estable/lenta y rápida/arriesgada.

G01_LOW_DISTRICT
- plaza vertical;
- tres niveles de altura;
- 3 contrapesos interactivos;
- 1 ruta principal bloqueada;
- 1 ruta alternativa legible.

G02_BLOCKED_ROUTE
- indicador "oficial" de viento;
- lectura física que lo contradice;
- acceso al reencuentro.

G03_FRIEND_ENCOUNTER
- amigo 01 placeholder;
- estado: COOPERA_PERO_SE_QUEDA;
- habilidad demostrable: ANCLAJE;
- Anclaje debe demostrarse como verbo sistémico, no llave única: estabilizar plataforma + fijar contrapeso.

G04_COOP_TRAVERSAL
- una barrera;
- requiere lectura de viento + anclaje;
- enseña la combinación antes del Molino.

G05_MILL
- receptor;
- bypass;
- captador/redirector;
- discrepancia observable entre indicador oficial y señales físicas reales;
- 3 rutas funcionalmente distintas y con secuencias físicas diferentes:
  - REPAIR = diagnosticar/recalibrar;
  - FORCE = bloquear/aguantar/sobrecargar;
  - REINTERPRET = reorientar/recombinar/redirigir.

G06_CHANGED_VELARIA
- reutiliza G01/G02 con estado modificado;
- sólo cambia lo necesario para que la consecuencia sea legible.

G07_SHIP_RETURN
- espacio mínimo del barco;
- una consecuencia materializada como affordance funcional, no sólo diálogo;
- REPAIR → mapa/corriente estable;
- FORCE → módulo útil con tensión/limitación;
- REINTERPRET → ruta lateral nueva con coste visible;
- gancho de siguiente destino.

## INTERACCIONES MÍNIMAS
I01_MOVE
I02_JUMP_OR_STEP
I03_READ_ENVIRONMENTAL_WIND_CUES
I04_INTERACT
I05_MOVE_COUNTERWEIGHT
I06_ANCHOR_COMPANION
I07_MILL_REPAIR
I08_MILL_FORCE
I09_MILL_REINTERPRET
I10_RETURN_TO_SHIP

Nada más entra en el primer build salvo que una prueba demuestre que falta una acción imprescindible.

READ_ENVIRONMENTAL_WIND_CUES NO es un botón ni un modo visión: el jugador aprende a leer señales diegéticas redundantes (telas, partículas, cables, audio, objetos ligeros y respuesta corporal).

## ESTADO MÍNIMO
run.approach_style = SAFE | FAST
run.optional_context_seen = bool
friend01.relationship_read = COLLABORATOR | TOOL | AUTHORITY | UNSET
mill.solution = REPAIR | FORCE | REINTERPRET | UNSET
velaria.state = STABLE_TRUTH | TENSIONED | REDIRECTED
ship.echo = SAFE_MAP | STRUCTURAL_DEBT | NEW_ROUTE | NONE

No crear aún sistema genérico de reputación ni quest engine completo.

## REGLA DE CONSECUENCIA
Cada solución del Molino produce:
- 1 consecuencia principal visible;
- máximo 2 ecos;
- al menos 1 eco debe aparecer fuera de la sala del Molino.

## TESTS DE ACEPTACIÓN
T01
Un jugador identifica visualmente la dirección del viento sin leer texto explicativo.

T02
Puede explicar por qué la ruta está cortada antes de entrar al Molino.

T03
Entiende que amigo 01 ha cambiado y que no es un premio/recluta automático.

T04
Puede ejecutar la combinación lectura de viento + anclaje sin tutorial largo.

T05
Las tres soluciones del Molino se sienten distintas por acción, no sólo por botón o diálogo.

T06
Tras resolver, identifica al menos una consecuencia visible causada por su decisión.

T07
En el barco reconoce un eco del resultado anterior.

T08
Puede contar la secuencia "hice X → costó Y → cambió Z".

## CRITERIOS DE FRACASO
- el jugador pregunta "¿cuál es la opción buena?";
- no entiende qué falsea el Molino;
- las tres rutas parecen el mismo puzzle con tres finales;
- el amigo parece un dispensador de habilidad;
- la consecuencia necesita popup explicativo;
- el regreso al barco parece menú y no cierre del loop;
- hacen falta más de 20 minutos para que el prototipo diga algo claro.

## ARTE
Greybox puro.
Sólo usar:
- bloques;
- colores funcionales;
- flechas/telas simples para viento;
- siluetas placeholder;
- audio provisional si ayuda a leer corriente.

No producir arte final, VFX premium, ciudad completa ni cinemáticas.

## AUDIO
Sólo señales funcionales:
- intensidad/dirección de viento;
- tensión de cables;
- cambio de estado tras Molino;
- silencio intencional de 10–20 s después de la consecuencia.

## TELEMETRÍA
Todavía NO instrumentar PostHog.
Primero build local/jugable.
Registrar manualmente:
- tiempo total;
- ruta elegida;
- tiempo en Molino;
- si detectó mentira;
- si entendió coste;
- si recordó el eco al volver.

## PC-40 · MICROPROTOTIPO PREVIO (3–5 min)
Antes del greybox completo construir sólo:
- 1 corriente lateral;
- 3 señales diegéticas de viento;
- 1 plataforma;
- amigo 01;
- 2 usos de Anclaje;
- 1 indicador falso que contradice el mundo.

Gate:
- el tester identifica dirección del viento;
- entiende Anclaje;
- detecta la contradicción indicador/mundo sin explicación previa.

3/3 = VERDE; 2/3 = ÁMBAR/iterar; 0–1/3 = ROJO/rediseñar.

## BUILD ORDER
0. PC-40 microprototipo;
1. movimiento + viento;
2. plaza vertical;
3. ruta cortada;
4. amigo/anclaje;
5. traversal cooperativo;
6. Molino con una solución completa;
7. añadir las otras dos;
8. consecuencia reutilizando zona previa;
9. barco/eco;
10. playtest sin explicación.

## GATE PARA PASAR A ARTE/UNREAL SERIO
Sólo avanzar si T01–T08 sobreviven al playtest y el jugador puede narrar causa → coste → consecuencia sin ayuda.
