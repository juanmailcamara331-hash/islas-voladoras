# ISL_BIOGRAPHICAL_WORLD_KERNEL_v0.1
Fecha: 2026-09-20
Estado: LAB_ONLY · NOT_CANON · HUMAN_AUTHORSHIP_REQUIRED

## Propósito
Convertir recuerdos, personas, objetos, pérdidas, amistades, contradicciones, humor y experiencias vitales del creador en material jugable de ISL sin volcar biografía en bruto ni sustituir la ficción.

Regla:
VIDA REAL → NÚCLEO EMOCIONAL → ABSTRACCIÓN → TRADUCCIÓN ISL → LAB → PLAYTEST → DECISIÓN HUMANA

Nunca:
VIDA REAL → CANON AUTOMÁTICO

## Principios
1. La verdad emocional importa más que la literalidad factual.
2. Una persona real no debe convertirse automáticamente en NPC reconocible.
3. Personas vivas: nombres, imagen, voz, frases privadas, intimidad o hechos delicados requieren consentimiento antes de una representación identificable.
4. Fallecidos: homenajear su vida, huella y vínculo; no reducirlos a su muerte.
5. Anécdotas íntimas o humillantes se transforman antes de entrar al mundo.
6. Mezclar rasgos de varias fuentes es preferible cuando mejora ficción y privacidad.
7. Nada de este kernel tiene autoridad comercial ni de CANON por sí solo.

## Distancia de transformación
D1 — homenaje/directo controlado.
D2 — inspirado y ficcionalizado.
D3 — simbólico.
D4 — esencia emocional sin trazabilidad evidente.

Por defecto:
- personas vivas → D2–D4
- experiencias íntimas → D3–D4
- homenaje explícitamente querido → D1–D3 según revisión humana

## Tipos de traducción
- PERSONAJE
- ENTE
- RELIQUIA
- ISLA
- LABERINTO
- SIDE QUEST
- MINIJUEGO
- MECÁNICA
- FRASE / ECO
- EASTER EGG
- MÚSICA / RITMO
- ARQUITECTURA / OBJETO
- EVENTO REJUGABLE

## ISL_LIFE_TO_WORLD_PACKET
Cada semilla usa:
- source_kind
- source_private_summary
- emotional_core
- contradiction
- transformation_distance
- candidate_forms
- tone
- privacy_risk
- consent_requirement
- literal_details_to_remove
- gameplay_question
- lab_experiment
- evidence
- human_decision
- canon_status

Estados:
SEED → ABSTRACTED → ISL_TRANSLATION_CANDIDATE → LAB_ONLY → PLAYTESTED → KEEP / ADAPT / DISCARD → HUMAN_CANON_REVIEW

## Semillas iniciales

### BIO-001 · Abeja de cerámica / homenaje al tío
Fuente:
Objeto comprado como recuerdo y homenaje.

Núcleo:
memoria, cuidado, persistencia, trabajo humilde, polinización, continuidad.

Distancia:
D3.

Traducciones candidatas:
- Reliquia: Abeja de Barro.
- Pequeño ente que aparece en umbrales.
- Marca visual escondida en jardines, ruinas o talleres.
- Cadena de micro-easter-eggs que sólo cobra sentido tras varios encuentros.

Tono:
tierno, misterioso, nunca sentimentalismo obligatorio.

Pregunta de juego:
¿Puede una presencia mínima hacer que el jugador recuerde y cuide un lugar sin explicar su significado?

Estado:
ISL_TRANSLATION_CANDIDATE · LAB_ONLY.

### BIO-002 · Torneo importante de ping-pong no atendido por salir de fiesta
Núcleo:
talento vs deriva, deseo vs disciplina, auto-boicot, juventud, humor y oportunidad perdida.

Distancia:
D2–D3.

Traducciones:
- Isla del Torneo Suspendido.
- Rival que esperó a alguien que nunca llegó.
- Minijuego de rebotes y timing.
- Reliquia provisional: Pala del Umbral Perdido.
- Puzzle donde presentarse importa tanto como ganar.

Pregunta:
¿Puede un fracaso real convertirse en decisión jugable sin moralina?

Estado:
CANDIDATE · LAB_ONLY.

### BIO-003 · Ping-pong con amistades antiguas
Núcleo:
ritual, amistad, repetición, separación, paso del tiempo.

Distancia:
D2–D4.

Traducciones:
- Secundarios dispersos que reaparecen cambiados.
- Mecánica de devolver / dejar pasar / mantener una pelota en juego.
- Encuentros opcionales que pueden perderse.
- Ecos de partidas antiguas en distintos lugares.

Pregunta:
¿Puede una mecánica de ida y vuelta representar vínculo y pérdida?

Estado:
CANDIDATE · LAB_ONLY.

### BIO-004 · Freestyle con amistades actuales
Núcleo:
tribu, improvisación, escucha, respuesta, identidad, juego verbal.

Distancia:
D2–D3.

Traducciones:
- Duelos cooperativos de palabra/ritmo.
- Puertas o criaturas que responden a cadencia.
- Sistema de resonancia verbal.
- Eventos donde la mejor respuesta no es la más agresiva sino la que transforma la situación.

Estado:
CANDIDATE · LAB_ONLY.

### BIO-005 · Episodio corporal humillante ligado a consumo
Núcleo:
pérdida de control, caída del ego, vulnerabilidad, cuerpo, absurdo.

Distancia:
D4 por defecto.

Regla:
No representar consumo de forma aspiracional ni convertir la anécdota literal en espectáculo personal.

Traducciones:
- Escena grotesca/absurda de pérdida de control.
- Zona donde el cuerpo del avatar deja de obedecer.
- Mecánica sobre recuperar agencia.
- Humor corporal sin revelar la fuente real.

Estado:
PRIVATE_SEED · NO_DIRECT_CANON.

### BIO-006 · Padre fallecido
Núcleo:
TBD por el autor; no inferir.

Formas posibles, sin decisión automática:
- lugar de orientación;
- objeto heredado;
- presencia asociada a una regla de vida;
- eco, faro, jardín, gesto o mecánica.

Estado:
MEMORIAL_SEED · HUMAN_DETAIL_REQUIRED.

### BIO-007 · Amigo fallecido
Núcleo:
TBD por el autor.

Regla:
El homenaje debe partir de cómo vivía, qué vínculo existía y qué dejó; no de la muerte como única característica.

Estado:
MEMORIAL_SEED · HUMAN_DETAIL_REQUIRED.

### BIO-008 · Primo fallecido
Misma regla memorial.
Estado:
MEMORIAL_SEED · HUMAN_DETAIL_REQUIRED.

### BIO-009 · Hermanos
Núcleo:
TBD.

Por defecto:
D2–D4 si son vivos; consentimiento si la representación es identificable.

Estado:
RELATIONSHIP_SEED · LAB_ONLY.

## Familias de contenido
A. MEMORIA / HOMENAJE
B. AMISTAD / PÉRDIDA / REENCUENTRO
C. TALENTO / AUTO-BOICOT / CAMBIO
D. CUERPO / RIDÍCULO / HUMANIDAD
E. RITMO / PALABRA / TRIBU
F. OBJETOS / RELIQUIAS / CASA
G. LUGARES / RUTAS / UMBRALES
H. FRASES / BROMAS / GESTOS

## Regla de privacidad y consentimiento
- learning access ≠ marketing consent
- biographical source ≠ permission to publish
- friendship ≠ consent to likeness
- family relation ≠ consent to private anecdote
- memorial intent ≠ automatic use of real name/image
- public recognition ≠ game-canon authority

## Guardrail tonal
Evitar que ISL se convierta en:
- álbum privado incomprensible;
- sucesión de cameos;
- terapia literal gamificada;
- museo de tragedias;
- fan service biográfico.

Objetivo:
que una persona que no conozca al creador disfrute la historia, y que quien conozca las capas encuentre significado adicional.

## Próximo laboratorio biográfico
BIOGRAPHICAL_SEED_LAB_v0.1:
comparar 3 transformaciones de una misma semilla:
A literal
B ficcionalizada
C simbólica
y preguntar cuál funciona mejor como juego sin revelar qué opción es autobiográfica.

Primer candidato recomendado:
BIO-001 Abeja de Barro.

## Autoridad
Los datos informan.
La memoria alimenta.
La ficción transforma.
El autor decide.


## SHADOW INTAKE / VIDA ADULTA · 2026-09-22

Objetivo:
no higienizar en exceso el material humano que alimenta ISL.

Cuando exista confianza/contexto suficiente, el sistema puede pedir al autor UNA pregunta breve sobre material vital real que pueda transformarse en ficción.

Familias de preguntas:
- amistades secas, agresivas, leales o contradictorias;
- discusiones, humillaciones, orgullo, ego, cobardía, valentía;
- deseo, atracción, erotismo adulto, celos, intimidad, rechazo;
- vagancia, disciplina, talento desperdiciado, autoengaño;
- ignorancia, arrogancia, curiosidad, aprendizaje;
- clase, dinero, pobreza, riqueza, trabajo, oportunismo;
- autoridad, burocracia, ideologías, dogmas, propaganda, instituciones;
- crítica política o social nacida de experiencia/observación;
- consumo, exceso, cuerpo, vergüenza, pérdida de control;
- aislamiento, conducta antisocial, tribu, amistad, lealtad;
- muerte, enfermedad, cuidado, deterioro;
- ternura, hogar, reconciliación, humor negro;
- episodios históricos o culturales que produzcan contradicción útil.

Reglas:
- preguntar 1–3 cosas como máximo por ocasión;
- no interrogar por completar una ficha;
- no asumir que una vivencia privada debe entrar en el juego;
- no almacenar detalle íntimo innecesario;
- erotismo sólo entre adultos y con función narrativa;
- crítica política/ideológica entra como conflicto de ideas/sistemas/personajes, no como doctrina obligatoria del juego;
- personas reales vivas requieren transformación/consentimiento si fueran identificables;
- material delicado tiende a D3–D4.

### NPCs DE FRICCIÓN
La pandilla y secundarios pueden incluir:
- gente cortante;
- seca;
- hostil;
- agresiva;
- egoísta;
- cobarde;
- vaga;
- brillante pero insoportable;
- ignorante pero entrañable;
- generosa con límites;
- manipuladora;
- contradictoria.

No todos deben ser simpáticos.
No todos deben tener arco de redención.
No toda rudeza necesita trauma explicativo.

La clave:
COMPORTAMIENTO → CONSECUENCIA → RELACIÓN,
no etiqueta moral.

### REFERENCIAS FUNCIONALES
Rap crítico/satírico, comedia irreverente y sátira social pueden inspirar:
- densidad verbal;
- contradicción;
- hipocresía expuesta;
- mala leche;
- observación de clase/poder;
- humor que nace de una verdad incómoda.

Nunca copiar versos, cadencias, voces, personajes, chistes o estilo reconocible de artistas/obras concretas.
