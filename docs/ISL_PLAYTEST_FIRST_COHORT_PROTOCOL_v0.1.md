# ISL_PLAYTEST_FIRST_COHORT_PROTOCOL_v0.1
Fecha: 2026-09-20
Estado: READY_FOR_HUMAN_COHORT · LAB_ONLY

## Objetivo
Cerrar el primer ciclo real del Playtest Lab con 3–8 personas sin convertir la prueba en una encuesta de gustos ni en un embudo comercial.

## Instrumento
/playtest
/signal-lab
/playtest-results

Orden:
1. compartir /playtest;
2. no explicar la solución;
3. cada tester juega primero;
4. feedback sólo al final;
5. Bug Hunt opcional;
6. revisar agregado;
7. clasificar humanamente.

## Cohorte
3–8 personas es suficiente para esta primera prueba cualitativa/diagnóstica.
No se busca representatividad estadística.

Mezcla útil:
- 1–2 personas cercanas al proyecto;
- 1–3 jugadores que sepan poco de ISL;
- 1–2 personas con dispositivo móvil modesto si es posible.

No registrar nombres dentro del instrumento.

## Consentimiento
La invitación debe decir claramente:
- es una prueba del juego;
- dura aprox. 3 minutos;
- recoge respuestas y telemetría mínima de la prueba;
- no requiere cuenta;
- no implica suscripción a marketing;
- puede abandonarse sin consecuencias.

No mezclar:
playtesting ≠ marketing consent
learning access ≠ marketing consent
participation ≠ supporter status

## Evidencia mínima
Sessions
Overall accuracy
Reaction time
Cue performance
Understood
Confused
Fun
Bug severity
Bug reproducibility

Free-text:
sirve para revisión interna, no para publicar automáticamente.

## Human Decision Matrix
Cada hallazgo termina en exactamente uno:
KEEP
ADAPT
DISCARD
NEW_EXPERIMENT

KEEP:
la señal cumple su función sin introducir coste o confusión relevante.

ADAPT:
la función parece válida pero necesita cambio de intensidad, timing, posición, combinación o feedback.

DISCARD:
la señal añade ruido, contradice el objetivo o no justifica su coste.

NEW_EXPERIMENT:
la evidencia abre una pregunta que el instrumento actual no puede responder.

## Umbrales orientativos, no automáticos
No usar porcentajes como sentencia.
Ejemplos de señales de revisión:
- un cue falla repetidamente;
- el tiempo de reacción sube mucho en una ronda;
- “no sabía qué hacer” aparece varias veces;
- una señal funciona sólo cuando se mezcla con otra;
- bugs S1/S2 reproducibles.

Todo requiere inspección humana del contexto.

## Revisión
Crear un snapshot de evidencia antes de decidir.
Registrar:
- fecha;
- experiment version;
- sessions;
- finding;
- evidence;
- decision;
- rationale;
- next action;
- author.

## Salida múltiple segura
Una decisión real puede generar:
PLAYTEST EVIDENCE
→ CREATION PROCESS LEDGER
→ DEVLOG NOTE
→ MAKING ISL LESSON
→ SUPPORTER UPDATE
→ DOCUMENTARY ARCHIVE

Pero no:
PLAYTEST EVIDENCE → MARKETING PROFILE
PLAYTEST EVIDENCE → CANON AUTOMÁTICO

## Cierre de cohorte
Cuando haya 3–8 sesiones:
1. congelar snapshot;
2. revisar bugs;
3. clasificar KEEP/ADAPT/DISCARD/NEW_EXPERIMENT;
4. decidir si nace Ruta/Nav Lab o Gamefeel Tuner;
5. documentar la decisión;
6. no cambiar dos sistemas a la vez si no hace falta.

## Próximo experimento posible
A. Ruta/Nav Lab
Pregunta: ¿el jugador entiende adónde ir y cómo volver?

B. Gamefeel Tuner
Pregunta: ¿qué combinación de velocidad, cámara, impacto y timing se siente mejor?

No construir ambos antes de leer la primera cohorte.
