# ISL · COMPANION EVOLUTION BRANCH · CURRENT
Fecha: 2026-09-22
Estado: PRODUCT HYPOTHESIS · PROVISIONAL FUERTE · ISL ONLY

## IDEA
ISL no necesita un sistema de colección de mascotas.
La hipótesis fuerte es UNA compañera principal con vínculo, autonomía y evolución legible.

Origen visual/dirección ya existente:
- compañera rara tipo zorro/perro/delfín;
- expresiva, tierna y ligeramente desquiciada;
- visual final NO CANON todavía.

Germen runtime ya existente:
- Recreativa: PASEO CON MASCOTA;
- trae chatarra, semillas, rumores, rarezas y puede descubrir rutas;
- rango local actual: NOVATA → DESPIERTA → CURIOSA → LEGENDARIA.

## GUARD PRINCIPAL
NO PET COLLECTION LOOP.
No gacha.
No Pokédex.
No docenas de mascotas intercambiables por stats.
No evolución como simple +5% daño.

Puede existir otra criatura/compañero narrativo excepcional si la historia lo exige, pero la mecánica base no es coleccionar.

## FUNCIÓN
La compañera puede:
- acompañar y separarse temporalmente;
- explorar de forma autónoma durante ventanas breves;
- olfatear/señalar rutas, corrientes, objetos o contradicciones;
- recuperar objetos o materiales si tiene sentido físico;
- interactuar con criaturas y NPCs;
- ayudar en navegación, viento, anclaje, sigilo, acceso o lectura del mundo;
- negarse, distraerse, tener miedo, curiosidad o preferencias;
- aprender conductas por experiencia;
- dejar huella relacional y memoria.

No sustituye al jugador.
No resuelve puzzles sola.
No es un dron de loot.

## EVOLUCIÓN
Inspiración funcional: sistemas de crecimiento emergente tipo Spore, pero mutado a ISL.

La evolución debe depender de:
EXPERIENCIAS + ENTORNO + VÍNCULO + USO + CONSECUENCIAS.

Ejemplos:
- mucha exploración de corrientes → lectura del viento más fina;
- rescates/retornos → capacidad de encontrar caminos de vuelta;
- exposición a zonas silenciosas → comportamiento más paciente y perceptivo;
- insistir en usarla para recoger cosas → puede especializarse, cansarse o volverse oportunista;
- dejarla libre → descubre rutas/objetos/relaciones que el jugador no habría visto;
- protegerla demasiado → vínculo seguro pero menor autonomía;
- darle autonomía → más iniciativa con riesgo de imprevisibilidad.

Nunca moral score.
Nunca una evolución única "correcta".
La forma visual debe reflejar función y vida, no árbol de perks arbitrario.

## ESTRUCTURA PROVISIONAL
COMPANION_STATE:
- bond
- autonomy
- curiosity
- wind_reading
- retrieval
- social_reading
- caution
- fatigue
- remembered_places
- learned_behaviours
- visual_mutations[]
- relationship_traces[]

Los nombres/campos son provisionales; no fijan balance.

## LOOP
VIAJE
→ la compañera percibe algo
→ player decide involucrarla / dejarla libre / protegerla / llamarla
→ acción autónoma o conjunta
→ coste/riesgo
→ resultado
→ huella
→ aprendizaje
→ posible mutación funcional/visual
→ mundo reacciona.

## AUTONOMÍA
Tres estados candidatos:
CERCA — sigue al jugador y responde rápido.
LIBRE — explora un radio/ventana limitada y puede traer señal, objeto o problema.
LLAMADA — vuelve si puede; no teleport mágico salvo regla del mundo explícita.

La autonomía debe ser legible y nunca hacer perder al compañero por un bug o por azar opaco.

## ABILITIES
Las habilidades deben nacer de función:
- detectar corriente;
- recuperar objeto;
- señalar retorno;
- distraer criatura;
- pasar por hueco pequeño;
- reconocer olor/huella;
- llevar mensaje pequeño;
- activar una interacción compartida.

Cada habilidad:
TELEGRAPH → COSTE → ACCIÓN → CONSECUENCIA → COOLDOWN/RECUPERACIÓN cuando proceda.

## RELACIÓN CON HUELLAS / BRÚJULA
La compañera no es inventario.
Sus experiencias pueden escribir huellas relacionales.
La Brújula puede leer lo que la relación dejó, no dar una nota moral sobre "buen dueño".

## RELACIÓN CON RECREATIVA
El paseo actual es precursor barato.
Siguiente test futuro, sólo cuando no desplace PRIMARY:
- 3 decisiones: CERCA / LIBRE / LLAMADA;
- 3 tipos de hallazgo: objeto / señal / relación;
- 1 consecuencia de autonomía;
- persistencia simple;
- comprobar si el jugador siente vínculo y curiosidad, no farming.

## UNREAL READINESS
Cuando la rama madure:
- stable isl_id para compañera;
- CompanionState como datos/save versionado;
- AI state machine/behavior tree o StateTree sólo si prototipo lo justifica;
- Gameplay Tags para capacidades aprendidas;
- Enhanced Input para comandos;
- navegación/recall con fallbacks;
- tests T0–T8;
- misma función en tiers bajos/altos;
- visual mutation data-driven, no lógica enterrada en assets.

READY_UNREAL no autorizado aún.

## CAMPAÑA / PRESENTACIÓN
Si el vínculo sobrevive a playtest, puede ser uno de los pilares comunicables:
"tu compañera no se colecciona: crece contigo y aprende del mundo".

No usar en marketing público hasta:
- prototipo real;
- comportamiento demostrable;
- identidad visual suficientemente estable;
- rights/provenance;
- human evidence.

## CQC
Preguntas clave:
1. ¿La quieres por quién es, no por el bonus?
2. ¿Su autonomía produce historias, no tareas?
3. ¿La evolución refleja experiencias?
4. ¿Puedes entender por qué cambió?
5. ¿Hay tensión protección/libertad sin moralina?
6. ¿Aporta jugabilidad sin sustituirte?
7. ¿Funciona sin coleccionismo?
8. ¿Low-spec conserva señales críticas?
9. ¿Persistencia/rollback son seguros?
10. ¿Da ganas de volver a verla?

## ESTADO
No CANON.
No abrir árbol completo.
No producción 3D final.
Primero continuar PRIMARY Velaria y B→NUDOS→CQC B×A.
Esta rama queda preparada para prototipo barato cuando el lane lo permita.


## CURVA DE ESCALA DE LA COMPAÑERA · 2026-09-22
La compañera debe crecer en paralelo a la alfabetización del jugador.

Inicio:
- conducta simple;
- necesidades legibles;
- pocas habilidades;
- aspecto relativamente austero;
- vínculo construido por presencia.

Medio:
- especialización derivada de experiencias;
- autonomía creciente;
- nuevas interacciones con criaturas/mundo;
- mutaciones visuales que comunican función.

Tarde:
- capacidades sorprendentes que combinan reglas ya aprendidas;
- lectura avanzada del mundo;
- decisiones propias con mayor peso;
- posibles transformaciones importantes si están causalmente ganadas.

Nunca:
- transformación gratuita por “nivel”;
- power-up desconectado de historia;
- escalada que borra personalidad;
- forma final obligatoria.

Principio:
cada evolución debe permitir reconocer a la misma compañera que estaba al principio.
La rareza crece; la identidad permanece.


## SALUD / INVOLUCIÓN / RECUPERACIÓN · 2026-09-22
La compañera puede enfermar, fatigarse, lesionarse, contaminarse o sufrir una mutación desfavorable si existe causa legible.

Fuentes posibles:
- entorno;
- sobreuso;
- exposición;
- alimento/recurso;
- combate;
- desastre;
- decisión de riesgo;
- omisión relevante.

No usar enfermedad como castigo moral.
No usar muerte aleatoria opaca.
No convertirla en barra de mantenimiento constante.

Estados candidatos:
- SANA;
- CANSADA;
- ALTERADA;
- ENFERMA;
- RECUPERANDO;
- ADAPTADA.

Una “involución” puede:
- reducir una capacidad;
- cambiar una preferencia;
- alterar su comportamiento;
- hacer que una ruta ya conocida deje de ser viable;
- abrir una adaptación nueva tras recuperación.

### MISIONES EMERGENTES
Si la compañera entra en estado relevante, pueden aparecer secundarios causales:
- buscar refugio;
- conseguir alimento/medicina/material;
- localizar a alguien que entienda la alteración;
- dejarla descansar;
- adaptar la nave;
- investigar la causa;
- aceptar una mutación en vez de revertirla.

Debe haber más de una respuesta defendible cuando sea posible.
No siempre “curarla” es la única salida correcta.

### IDENTIDAD
Incluso enferma o transformada:
- sigue siendo reconocible;
- conserva memoria;
- puede expresar preferencia;
- no se convierte en objeto-puzzle.

La recuperación puede dejar cicatriz visual, habilidad distinta o recuerdo persistente.


## VISUAL AUTHORITY CORRECTION · 2026-09-22
Human correction after recent image drift.

SOURCE_OF_TRUTH DIRECTION for the primary companion:
- one strange, lovable companion; NOT a generic fox and NOT a clean heroic fantasy pet;
- hybrid function remains dolphin + fox + bird + dog + cat, but fused into one believable species;
- face must preserve the earlier silly/tender identity: rounded, teddy-bear-like mouth/muzzle; slightly goofy; expressive; affectionate; capable of looking a little unhinged;
- “tonta punkarra” is a positive identity signal: curiosity, awkward confidence, mischief, warmth, oddness, unpredictable body language;
- silhouette should remain readable and memorable even before detail;
- aquatic/avian traits must affect silhouette/function, not look pasted on;
- no “pretty fox with feathers” fallback;
- no over-polished noble mascot energy;
- no generic Pixar/AAA cute-animal smoothing;
- RECENCY IS NOT AUTHORITY: recent fox-heavy generations are SUPERSEDED as identity reference unless the human explicitly re-promotes one.

The exact earlier approved visual asset should be recovered and locked when available. Until then, this textual authority outranks newer generated candidates.

### PROTAGONIST PAIRING DIRECTION
The protagonist must contrast and rhyme with the companion:
- young woman;
- punk, chaotic, inventive, friendly and dark;
- intelligent but not polished;
- expressive, slightly dishevelled, capable of deadpan and explosive enthusiasm;
- gothic/dark-whimsy function may be informed by references such as Wednesday/Addams/Burton, but must be transformed into original ISL language;
- do NOT copy recognizable costume, face, hairstyle, pose, dialogue or production design from any existing character/film;
- ISL mutation target: sky-world practicality + punk DIY + worn travel gear + strange tenderness + humor + shadow.

PAIR TEST:
If protagonist + companion could be mistaken for a generic fantasy-adventure duo, the design is not specific enough.


## VISUAL IDENTITY RECOVERY · 2026-09-22
Estado: HUMAN CORRECTION · HIGH AUTHORITY

La dirección visual de la compañera se corrige por decisión humana explícita.

AUTHORITATIVE DIRECTION:
- recuperar la mascota anterior aprobada por el usuario como referencia visual superior;
- híbrido orgánico zorro / perro / delfín / pájaro / gato, pero NO debe leerse como un zorro fantasy genérico;
- cara más rara, tierna y ligeramente absurda;
- hocico/boca compacta y redondeada, con lectura de "osito" amable;
- expresión tonta, curiosa, punkarra y un poco desquiciada;
- encanto imperfecto > belleza heroica convencional;
- silueta reconocible incluso al evolucionar;
- ternura + rareza + travesura;
- evitar ojos/gestos excesivamente Disney-like o mascota premium genérica;
- evitar convertirla en criatura noble/épica demasiado pulida.

REFERENCE AUTHORITY:
La referencia humana anterior manda sobre las generaciones recientes de esta conversación.
Las últimas variantes "zorro aventurero premium" quedan SUPERSEDED / DO_NOT_USE como fuente de identidad.

PRE-FLIGHT obligatorio antes de regenerar/derivar compañera:
1. recuperar asset visual aprobado anterior;
2. usarlo como AUTHORITATIVE;
3. bloquear boca/hocico, rareza facial, proporción y energía "tonta-punkarra";
4. generar sólo derivaciones de pose/edad/evolución/función;
5. si el asset no está accesible, NO reconstruir desde memoria textual: pedir/relocalizar referencia.

Esto no asciende el diseño final a CANON; fija autoridad visual provisional para evitar drift.
PRIMARY Velaria sigue mandando.
