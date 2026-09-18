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
