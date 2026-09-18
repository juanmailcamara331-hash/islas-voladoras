# ISL — PC-30 DIALECTICAL REVIEW · VELARIA v0.18
Fecha: 2026-09-18
Estado: COMPLETADO / NO CANON
Objeto: viento + Anclaje + mentira del Molino + 3 soluciones + retorno al barco.

## 0. HIPÓTESIS
Velaria puede demostrar la promesa central de ISL en 12–20 minutos si el jugador:
- lee una regla física sin tutorial pesado;
- coopera con un amigo cambiado;
- detecta una contradicción entre sistema oficial y realidad;
- interviene físicamente de tres formas genuinamente distintas;
- ve una consecuencia inmediata;
- reconoce un eco al volver al barco.

## 1. AUTOR / ARQUITECTO
Valor:
- concentra aventura, cultura, sistema, relación y consecuencia;
- convierte el Molino en conflicto real, no minijuego;
- permite probar A/B/C sin construir tres campañas.

Sacrificio aceptado:
- el primer slice no demuestra combate, economía ni mutación completa.

## 2. RED TEAM
Riesgo A: READ_WIND puede degenerar en un "modo detective" que pinta flechas.
Falsación:
- si el jugador sólo entiende el viento cuando activa una capa UI explícita, falla.

Riesgo B: ANCLAJE puede sentirse como botón de compañero/llave de color.
Falsación:
- si sólo existe un objeto que acepta Anclaje, falla.

Riesgo C: la mentira del Molino puede entenderse sólo porque un NPC la explica.
Falsación:
- si el jugador no puede sospechar el falseo antes de la explicación verbal, falla.

Riesgo D: REPAIR/FORCE/REINTERPRET pueden ser tres botones al final del mismo puzzle.
Falsación:
- si comparten la misma secuencia de acciones y sólo cambia la cinemática/estado, falla.

Riesgo E: el retorno al barco puede sentirse como epílogo textual.
Falsación:
- si el eco no afecta navegación/espacio/acción futura, falla.

## 3. SYSTEM DESIGN
### Viento
No crear "escáner".
El viento debe ser un campo continuo con señales redundantes:
- tela;
- partículas;
- cables;
- audio;
- objetos ligeros;
- respuesta del personaje.
READ_WIND debe significar aprender a leer el mundo, no activar visión especial.

### Anclaje
Definirlo como verbo sistémico:
ANCHOR(target, duration/condition)
Efectos potenciales:
- inmovilizar masa;
- crear punto fijo;
- permitir transferencia de tensión;
- resistir corriente.
En greybox sólo usar 2 aplicaciones:
1. estabilizar una plataforma;
2. fijar un contrapeso durante una maniobra.
Eso basta para demostrar generalidad sin inflar scope.

### Molino
Representar una discrepancia observable:
- indicador oficial = corriente estable;
- telas/cables/partículas = deriva real;
- mecanismo de compensación = falsea/absorbe lectura.
El jugador debe poder inferir "algo no cuadra" antes del diálogo explicativo.

### Tres soluciones
REPAIR:
- diagnosticar → exponer lectura real → recalibrar;
- verbo dominante: entender/ajustar.

FORCE:
- bloquear seguridad → sobrecargar → abrir flujo;
- verbo dominante: imponer/aguantar.

REINTERPRET:
- reorientar captador → crear circuito nuevo → usar salida distinta;
- verbo dominante: recombinar/redirigir.

Regla:
cada ruta necesita al menos un input/orden espacial distinto.

### Retorno
El barco debe expresar el eco mediante una affordance:
- REPAIR → mapa/corriente estable nueva;
- FORCE → módulo funcional pero con tensión/limitación;
- REINTERPRET → ruta lateral nueva/no prevista.
No sólo diálogo.

## 4. PLAYER / UX
Lo que debe entender sin contexto:
1. el viento "dice" cosas;
2. Velaria quiere controlar el movimiento;
3. el indicador oficial contradice lo que veo;
4. el amigo sabe hacer algo que yo no;
5. mi forma de resolver cambia algo real.

Puntos de confusión probables:
- demasiadas señales simultáneas del viento;
- no saber qué objetos admiten Anclaje;
- confundir REINTERPRET con "opción secreta mejor";
- no percibir el coste de FORCE antes de abandonar el Molino.

Correcciones:
- introducir señales del viento de una en una y combinarlas después;
- lenguaje visual consistente para superficies/objetos anclables;
- REINTERPRET debe tener coste visible inmediato;
- FORCE debe mostrar estrés estructural antes de ser elegido, no sólo después.

## 5. UNREAL / ENGINE
Dirección futura:
- viento: actor/component + datos, no lógica dispersa;
- Anclaje: Gameplay Ability candidata;
- estados de interacción: Gameplay Tags;
- soluciones: Data Assets/State data;
- consecuencias: WorldState/SaveGame explícito.

Greybox:
- NO necesita aún GAS completo;
- mantener nombres/contratos compatibles para migrar después;
- evitar arquitectura temporal que obligue a reescribir reglas narrativas.

## 6. RESEARCH
Evidencia aplicada:
- los juegos contemporáneos enseñan mediante estrategias repetibles de señales visuales, no sólo tutoriales explícitos;
- las cues funcionan para indicar qué es interactuable, dónde mirar y dónde ir;
- por tanto viento y Anclaje deben leerse principalmente desde mundo/affordances y no desde HUD explicativo.

## 7. SÍNTESIS
### SOBREVIVE
- viento diegético;
- Anclaje sistémico;
- Molino como contradicción perceptible;
- tres rutas;
- amigo 01 coopera pero no es recluta automático;
- retorno al barco con eco funcional.

### CAMBIA
1. READ_WIND deja de ser concebido como acción/modo separado.
   Ahora: competencia perceptiva apoyada por señales del mundo.
2. ANCLAJE debe tener mínimo dos usos antes/durante Molino.
3. La mentira del Molino debe ser detectable antes del NPC.
4. Las tres soluciones necesitan secuencias físicas diferentes.
5. REINTERPRET recibe un coste inmediato para evitar que parezca "true ending".
6. el eco del barco debe ser jugable/funcional.

### SE RECHAZA/APARCA
- overlay especial de visión del viento;
- árbol complejo de habilidad Anclaje;
- explicación enciclopédica del Molino;
- consecuencia sólo en diálogo;
- elegir A/B/C de campaña antes del playtest.

## 8. EXPERIMENTO MÍNIMO PC-40
Construir una microsección de 3–5 minutos ANTES del greybox completo:

E0:
- corriente lateral;
- 3 señales de viento;
- 1 plataforma;
- amigo 01;
- Anclaje;
- indicador falso.

Objetivo:
un tester debe:
1. decir hacia dónde sopla;
2. usar/entender Anclaje;
3. detectar que indicador y mundo no coinciden.

Sin NPC explicándolo antes.

Gate:
- 2 de 3 comprensiones sin ayuda = ÁMBAR, iterar;
- 3 de 3 = VERDE para integrar en greybox;
- 0–1 de 3 = ROJO, rediseñar lenguaje físico.

## 9. CAMPAÑAS A/B/C
PC-30 decide NO elegir arquitectura.
Mantener las tres como marcos del mismo slice.
La información que necesitamos del greybox:
- A: ¿el reencuentro sostiene suficiente emoción?
- B: ¿el slice deja ganchos que permitan orden flexible?
- C: ¿el regreso al barco tiene suficiente peso para sostener la campaña?

## 10. ESTADO PC
PC-00 Inicio: PASS
PC-10 Hipótesis: PASS
PC-20 Variantes: PASS
PC-30 Segunda IA/Evidencia: PASS
PC-40 Prototipo: NEXT
PC-50 Playtest: PENDIENTE
PC-60 Feedback: PENDIENTE
PC-70 CQC: PENDIENTE
PC-80 Seguridad/Rendimiento/Regresión: PENDIENTE
PC-90 Backup/Checkpoint: requerido tras PC-40 relevante
PC-100 Confirmación humana: PENDIENTE

Semáforo global: VERDE PARA PC-40 MICROPROTOTIPO.
No implica CANON ni READY_UNREAL.
