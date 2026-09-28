# ISL — CRIATURAS v1
Fecha: 2026-09-18
Estado: PROVISIONAL FUERTE

## Regla
Criatura ISL = comportamiento legible + función ecológica/social + contradicción. No es enemigo con skin rara. IA, telegraphs, hitboxes y timings jugables son invariantes.

## 01 · Danzante-Aguja
Rol: rítmica.
Silueta: cuerpo fino, patas de compás y aguja móvil.
Conducta: lee patrones del entorno y anticipa cambios. Busca sincronía o cambia de referencia cuando aparece una variación.
Interacción: guía hacia nodos de pulso o complica rutas al unir patrones incompatibles.
Telegraph: dos pulsos claros antes de acción crítica.
Tensión: disciplina/improvisación.
No es hostil por defecto.

## 02 · Consejero de Niebla
Rol: social/poder.
Silueta: volumen ancho parcialmente oculto; varios apéndices entregan fichas o sellos.
Conducta: intermedia accesos, ofrece atajos y recuerda deudas. Su poder depende de relaciones, no de daño.
Interacción: aceptar favor abre ruta y crea dependencia; revelar una contradicción puede debilitar su influencia; ayudarle puede estabilizar un sistema local.
Telegraph: fichas visibles y señal sonora antes de cambiar un acceso.
Tensión: cuidado/explotación; acceso/dependencia.
No representa a una persona o partido real.

## 03 · Escarabeo-Registrador
Rol: archivo.
Silueta: caparazón-sello.
Conducta: sigue cambios de mundo de alta significancia y conserva uno; ignora ruido trivial.
Interacción: permite demostrar que algo cambió, pero sólo mantiene una cadena a la vez.
Telegraph: despliega placas antes de registrar.
Tensión: archivo/vida.

## IA común
Estados mínimos: idle, observe, commit, recover, relation_response.
El comportamiento central debe ser reproducible y depurable.

## Escalado
High: telas, microgestos, partículas y sombras.
Low: rig mínimo + animación de silueta + señal visual/sonora.
Gameplay idéntico.

## CQC
Lectura de intención antes del efecto; función real en mundo; al menos una interacción no violenta; tensión dialéctica; comportamiento reproducible; low-spec sin pérdida de señal.


## Ejecución interactiva · 2026-09-22
Estado: SOURCE IMPLEMENTED · HUMAN EVIDENCE PENDING · NO CANON PROMOTION.

Integración real en `portal/isla-baile-inagotable.html`:
- Danzante-Aguja: telegraph de dos pulsos antes de comprometer movimiento; sincroniza o cambia de referencia según el pulso del distrito.
- Consejero de Niebla: favor abre atajo con deuda; contradicción sólo reduce influencia si existe evidencia visible en el estado del distrito.
- Escarabeo-Registrador: despliega placas antes de registrar; conserva una sola cadena significativa e ignora ruido cuando no hay cambio de mundo.
- Las interacciones persisten dentro de `isl_dance_island_v1` y escriben en `isl_huellas_events_v2`.
- CI protege presencia de las tres criaturas, sus acciones y la integración con Huellas.

Siguiente bloque B: NUDOS persistentes. Después: CQC cruzado B × A. Velaria V2 P0 sigue PRIMARY y HUMAN_DEVICE_GREEN sigue pendiente.


## LIVING CREATURE ARC · EVOLUCIÓN LIGERA POR ACTO / RELACIÓN · 2026-09-28
Estado: ACTIVE DESIGN DIRECTION · PROVISIONAL · COLOR LANE · NO MAIN MECHANIC · NO AUTO-CANON

### INTENCIÓN HUMANA
Cada isla puede tener criaturas con lore propio que no existan sólo como obstáculos o decoración.
Las criaturas deben poder cambiar con el viaje y dejar ver que el mundo también está viviendo.

La evolución puede responder a:
- ACTO / fase narrativa;
- protagonista / rol o trayectoria jugada;
- amigos, companions o tripulación presentes;
- Huellas / decisiones persistentes;
- cambios ecológicos/sociales locales;
- acontecimientos relevantes del argumento.

Debe sentirse como una curva creativa bonita y descubrible, NO como una mecánica principal, colección obligatoria, árbol de estadísticas o sistema de domesticación.

### FUNCIÓN ANTES QUE SUPERFICIE
Referencia funcional permitida de juegos de evolución/creature systems:
VARIACIÓN VISIBLE + HERENCIA + CONTEXTO + SORPRESA.

No copiar:
- criaturas reconocibles;
- taxonomías/franquicias;
- interfaz;
- progresión;
- coleccionismo;
- breeding;
- estética o siluetas ajenas.

ISL mutation:
WORLD MEMORY + RELATION ECHO + ECOLOGICAL CHANGE + LIGHT LORE.

### MODELO LIGERO
Cada familia/localidad de criatura puede tener:

CREATURE_FAMILY
+ ISLAND_LORE
+ BASE_BEHAVIOR
+ ACT_STATE
+ RELATION_ECHO
+ FRIEND_IMPRINT
+ WORLD_DELTA
→ CURRENT EXPRESSION.

No hace falta que todos los campos cambien siempre.

Regla:
UNA criatura no “sube de nivel” porque el jugador la farmee.
CAMBIA porque el mundo, una relación o el acto han cambiado.

### CURVA PROPUESTA
C0 · FIRST READ
La criatura presenta su gramática base y su contradicción.

C1 · RECOGNITION
La criatura reconoce una Huella, presencia, objeto, rol o amigo relevante.

C2 · ADAPTATION
Aparece una variación pequeña de comportamiento, material, sonido, hábitat o relación.

C3 · CONSEQUENCE
Tras un cambio real del acto/isla, su conducta o lugar en el ecosistema/social cambia de forma legible.

C4 · RETURN / MEMORY
Al revisitar, la criatura conserva una señal del viaje: cicatriz, rutina, ausencia, nueva alianza, nueva ruta, cambio de nido, canto, miedo, confianza, migración, objeto, descendencia simbólica/ecológica o relación distinta con otra especie.

No todas llegan a C4.
La mayoría deben permanecer en C0–C2 para evitar sobrecarga.

### RELACIÓN CON EL PROTAGONISTA Y LOS AMIGOS
La criatura puede reaccionar de forma diferente según QUIÉN llega, sin convertir esto en afinidad numérica.

Ejemplos funcionales:
- un amigo produce calma donde el protagonista produce curiosidad;
- una criatura recuerda un gesto concreto y cambia su telegraph;
- una especie evita a un miembro de tripulación por un acontecimiento anterior;
- una presencia abre un comportamiento social no visible con otra composición de grupo;
- la misma criatura sirve de espejo lateral a un conflicto entre dos amigos.

Regla:
PERSONAJE/AMIGO ≠ BUFF.
Su presencia cambia RELACIÓN, LECTURA o CONTEXTO antes que poder bruto.

### INTEGRACIÓN NARRATIVA LIVIANA
Las criaturas pueden transportar lore mediante:
- conducta;
- hábitat;
- cambios de ruta;
- relación con objetos/reliquias;
- sonidos;
- restos/nidos;
- interacción entre especies;
- pequeñas escenas;
- rumores/NPC interpretation;
- Huellas;
- aparición/ausencia.

Evitar:
- bestiario obligatorio con párrafos enormes;
- exposición enciclopédica;
- misión secundaria por cada criatura;
- “lore dump”.

Principio:
LORE SE VE ANTES DE EXPLICARSE.

### INTEGRACIÓN CON NUDOS / ACTOS
Un NUDO o cambio de ACTO puede tener una consecuencia ecológica/social secundaria.

Ejemplo de forma:
ACT_EVENT
→ WORLD_DELTA
→ 1–3 CREATURE RESPONSES
→ optional player recognition
→ persistent trace.

La respuesta de criatura nunca debe ser el único canal para comprender un evento crítico del argumento.

### CREATIVITY CURVE
Objetivo:
familiaridad → pequeña desviación → sorpresa coherente → memoria.

No:
cada visita = forma nueva.

Sí:
la criatura conserva identidad y sólo muta 1–2 ejes significativos.

Ejes posibles:
- comportamiento;
- relación;
- ubicación/hábitat;
- sonido;
- material/estado físico;
- función social/ecológica;
- interacción con otra especie;
- memoria del jugador;
- timing/telegraph;
- ritual/rutina.

Guard:
SILHOUETTE / CORE CONTRADICTION / PRIMARY FUNCTION deben mantenerse reconocibles salvo evento narrativo excepcional + Human Gate.

### OPTIONAL DELIGHT · NO CHECKLIST
El jugador puede disfrutar de:
- reencontrar una criatura cambiada;
- descubrir una variante rara porque viaja con cierto amigo;
- ver una especie desplazarse tras una decisión;
- reconocer una familia en otra isla bajo distinta presión;
- encontrar una criatura que recuerda algo sin texto.

No debe existir obligación de:
- capturarlas todas;
- completar porcentajes;
- alimentarlas diariamente;
- optimizar genes;
- grindear evoluciones.

### HUMAN TRACE / SOUL GRAMMAR
Las criaturas pueden recibir función abstracta desde Human Trace:
gesture · waiting · vigilance · care · contradiction · rhythm · material imperfection.

Nunca convertir directamente una persona/animal real en criatura final sin transformación y distancia suficiente.

Human source = SOURCE.
Creature final = FICTIONAL MUTATION.

### WORLD / GUIDED PLAY CROSS
Una criatura puede ser breadcrumb causal:
PAST EVENT / RELATION
→ CREATURE CHANGE
→ PLAYER NOTICES
→ MEMORY / HYPOTHESIS
→ OPTIONAL ROUTE OR RELATIONAL CHOICE.

No debe convertirse en flecha de misión disfrazada.
Accesibilidad puede añadir backup explícito cuando la información importe.

### IMPLEMENTATION SHAPE · FUTURE DATA
Si alguna vez se implementa de forma sistémica, preferir datos simples y versionados:

creature_family_id
island_id
base_state
act_state
world_delta_tags[]
relation_echo_tags[]
friend_imprint_tags[]
visible_variation
behavior_delta
lore_trace
persistence_key
human_gate

No construir este schema completo antes de necesitarlo en una criatura real.

### CHEAP TEST
Usar UNA familia ya existente.

Baseline A:
misma criatura en dos actos sin cambio.

Variant B:
misma criatura + UN world delta + UNA relation echo.

Test humano:
1. ¿parece la misma criatura?
2. ¿notaste que algo había cambiado?
3. ¿qué crees que ocurrió?
4. ¿te dio curiosidad reencontrarla?
5. ¿sentiste “sistema” o “mundo vivo”?

PASS:
- identidad reconocible;
- cambio legible;
- curiosidad;
- no sensación de tarea/checklist;
- no necesidad de explicación larga.

### GUARDS
- NO nueva mecánica núcleo.
- NO creature-management game dentro de ISL.
- NO auto-CANON.
- NO evolución puramente cosmética si pretende representar consecuencia.
- NO mutación aleatoria sin causa.
- NO sobreexplicar.
- NO convertir todas las criaturas en companions.
- NO hacer que cada amigo tenga “su criatura”.
- NO usar evolución para sustituir argumento o relaciones humanas.
- NO romper telegraphs, hitboxes, timings o low-spec readability.

### RELACIÓN CON LAS TRES CRIATURAS ACTUALES
Danzante-Aguja:
puede variar su referencia rítmica, sincronía social o lugar dentro del distrito según actos/Huellas.

Consejero de Niebla:
puede acumular/perder redes de influencia, deudas visibles, aliados o aislamiento según relaciones y cambios del mundo.

Escarabeo-Registrador:
puede cambiar qué considera “significativo”, dónde archiva o qué rastro conserva según una cadena de acontecimientos, sin convertirse en narrador omnisciente.

Estas posibilidades son DIRECCIÓN, no implementación automática.

### REGLA FINAL
CREATURE EVOLUTION SHOULD FEEL LIKE:
“VOLVÍ Y EL MUNDO SE ACORDABA.”

No:
“he desbloqueado la skin 3.”
