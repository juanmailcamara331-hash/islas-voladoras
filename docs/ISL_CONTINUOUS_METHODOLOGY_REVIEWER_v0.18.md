# ISL — CONTINUOUS METHODOLOGY REVIEWER v0.18
Fecha: 2026-09-18
Estado: ACTIVO
Propósito: vigilar continuamente que ISL no derive de su metodología, seguridad, rendimiento, diseño y checkpoints.

## REVISIÓN OBLIGATORIA EN CADA HITO
Antes de promover cualquier cambio relevante, revisar:

### 1. METODOLOGÍA
- ¿hay hipótesis falsable?
- ¿existe criterio de éxito y fracaso?
- ¿se compararon alternativas reales?
- ¿se distinguió CANON / PROVISIONAL / EXPERIMENTO / REJECTED-LEARNED?
- ¿hay evidencia suficiente para subir de estado?

### 2. DISEÑO
- ¿sirve a la aventura principal?
- ¿preserva claridad y Cuidado y Mimo?
- ¿evita moralina/binarios obvios?
- ¿la consecuencia es 1 principal + máximo 2 ecos?
- ¿el jugador puede entender causa → coste → consecuencia?

### 3. JUGABILIDAD
- ¿el loop se puede jugar y no sólo explicar?
- ¿la interacción principal tiene lectura física?
- ¿hay aprendizaje por acción antes que por texto?
- ¿una nueva mecánica reabre o transforma contenido previo cuando corresponde?
- ¿el playtest demuestra comprensión sin intervención?

### 3B. MÚSICA / ARCO EMOCIONAL
- ¿la apertura respira antes de crecer?;
- ¿la escala orquestal aumenta por función narrativa/jugable y no por costumbre?;
- ¿el crescendo conserva motivos y memoria del inicio?;
- ¿se evita trailerización y bombasto constante?;
- ¿la referencia histórica se abstrae como función, no como imitación estilística?


## DIRECCIÓN MUSICAL TRANSVERSAL — APERTURA → CRESCENDO
Regla aprobada para el arranque y el arco de intensidad del juego:
- ISL no comienza con épica máxima. El inicio debe respirar: suavidad, nobleza, espacio, melodía clara y sensación de mundo aún por descubrir.
- Referencia funcional: cierta amplitud, elegancia orquestal y lirismo del cine de aventura de los años 60–70, **sin imitar ninguna película, compositor ni partitura concreta**.
- El crecimiento musical debe ganarse con el juego: intimidad / asombro → apertura del horizonte → descubrimiento → aventura → riesgo → crescendo.
- El crescendo no significa "más volumen siempre": puede crecer por orquestación, registro, contrapunto, densidad, pulso, metales cálidos, percusión y amplitud armónica.
- Conservar humanidad y aire incluso en estados grandes; evitar trailerización genérica, bombazos automáticos y grandilocuencia permanente.
- La música del barco-hogar, la Brújula de las Huellas y los primeros compases de exploración son el suelo emocional desde el que debe crecer la escala.
- Cualquier región puede tener su ADN propio, pero debe respetar la macrocurva de intensidad cuando forma parte de la apertura del juego.

CQC musical mínimo:
1. ¿la música deja espacio al mundo y al jugador al principio?;
2. ¿el crescendo está motivado por un cambio real de experiencia?;
3. ¿aumenta identidad antes que volumen?;
4. ¿evita sonar a trailer genérico?;
5. ¿el motivo inicial puede sobrevivir transformado en estados posteriores?;
6. ¿la transición emocional es legible sin imagen?;

### 3C. CROSSPLAY / CAPABILITY CEILINGS
- ¿gameplay/progresión/consecuencias son invariantes entre plataformas?
- ¿el feature nuevo declara qué escala y qué no escala?
- ¿hay fallback para Series S / mobile / low-PC antes de añadir coste?
- ¿se protege frame-pacing/input antes que resolución/RT?
- ¿crossplay respeta privilegios, privacidad, comunicación y bloqueo nativo?
- ¿latencia/fairness se mide por input/mecánica y no por marca de dispositivo?
- ¿save/cross-progression tiene versión, migración y conflicto explícito?
- ¿PS5/Xbox siguen marcados BLOCKED mientras falten SDK/hardware/certificación?

### 3D. CABARET / ENTROPÍA / ECO HISTÓRICO
- aplicar CAB-10..50 de docs/ISL_CABARET_ENTROPY_METHOD_v0.44.md;
- sensualidad debe sumar función/tensión, no ser skin;
- referencias históricas deben conservar contexto y evitar explotación superficial;
- ancla/entropía/cambio de fase deben mejorar lectura jugable;
- esta capa no puede romper A/B congelada ni el macroarco musical aprobado.

### 4. ESTRUCTURA / SCOPE
- ¿esto pertenece al vertical slice actual?
- ¿estamos abriendo infraestructura sin necesidad demostrada?
- ¿podemos resolverlo con algo ya existente?
- ¿hay dependencia circular o combinatoria peligrosa?
- ¿se ha protegido el núcleo single-player antes de online/escala?

### 5. TÉCNICA / UNREAL
- ¿puede mapearse limpiamente a Data Assets / Gameplay Tags / GAS cuando aplique?
- ¿estado/save está explícito?
- ¿hay estrategia de rollback/migración?
- ¿rendimiento y profiling tienen gate antes de producción?
- ¿replicación sólo se introduce cuando exista necesidad real?

### 6. RENDIMIENTO
- ¿añade coste runtime innecesario?
- ¿añade llamadas, ancho de banda o servicios recurrentes?
- ¿se puede medir?
- ¿hay presupuesto o límite?
- ¿una optimización rompe legibilidad o experiencia?

### 7. SEGURIDAD
- ¿se añadió secreto/token/password al lugar equivocado?
- ¿mínimo privilegio?
- ¿superficie pública/privada correcta?
- ¿dependencias nuevas justificadas?
- ¿se mantiene rollback?

### 8. BACKUP / CHECKPOINT
- ¿hay commit estable?
- ¿hay snapshot si el cambio es difícil de reproducir?
- ¿MASTER/Drive refleja el cambio si es estructural?
- ¿deploy estable identificado?
- ¿se puede reanudar sin depender del chat?

### 9. SEGUNDA IA / CONSEJO DIALÉCTICO
Obligatorio si:
- bloquea producción;
- cambia arquitectura;
- cambia campaña/estructura principal;
- introduce sistema global;
- implica coste alto o difícil reversión;
- hay desacuerdo real;
- hay incertidumbre que un experimento barato no resuelve inmediatamente.

Salida mínima:
- tesis;
- antítesis;
- evidencia;
- desacuerdo;
- experimento mínimo;
- condición para cambiar de opinión;
- decisión humana pendiente/final.

### 10. CHECKPOINT HUMANO
No promover a READY_UNREAL / PRODUCCIÓN / CANON sin confirmación humana explícita.

## SEMÁFORO
VERDE = seguir.
ÁMBAR = seguir sólo con experimento barato.
ROJO = parar promoción y corregir.

## PUNTOS DE CONTROL
PC-00 INICIO DE BLOQUE
PC-10 HIPÓTESIS
PC-20 VARIANTES
PC-30 SEGUNDA IA / EVIDENCIA
PC-40 PROTOTIPO
PC-50 PLAYTEST
PC-60 TELEMETRÍA / FEEDBACK
PC-70 CQC
PC-80 SEGURIDAD / RENDIMIENTO / REGRESIÓN
PC-90 BACKUP / CHECKPOINT
PC-100 CONFIRMACIÓN HUMANA / PROMOCIÓN

## REGLA DE MEMORIA
Si un bloque importante termina sin PC-90, el trabajo se considera NO CONSOLIDADO.

## REVISOR CONTINUO
En cada revisión recurrente:
1. mirar cambios desde último checkpoint;
2. identificar huecos de PC-00..PC-100;
3. detectar scope creep;
4. detectar deuda de seguridad/rendimiento;
5. detectar decisiones sin segunda opinión cuando la regla la exige;
6. comprobar backup/checkpoint;
7. devolver sólo anomalías y acciones concretas.
