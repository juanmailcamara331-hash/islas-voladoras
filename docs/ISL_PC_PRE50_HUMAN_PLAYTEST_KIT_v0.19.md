# ISL — PC-PRE50 HUMAN PLAYTEST KIT v0.19
Fecha: 2026-09-18
Estado: LISTO PARA TESTER HUMANO
Build objetivo: prototypes/pre40-separation/index.html
Commit probado para handoff: 650594d75080487a204e54939116094c2f187995

## PRINCIPIO
No explicar el objetivo real antes de jugar.
No decir que estamos midiendo vínculo, causalidad o pérdida.
No corregir al jugador durante la sesión salvo bloqueo técnico.

## INTRO DEL FACILITADOR
"Juega esta apertura como si fuera la primera vez que arrancas un juego. Haz lo que te parezca natural. Si algo te confunde, puedes decirlo en voz alta, pero no hace falta justificar cada acción."

## OBSERVAR
Registrar sin intervenir:
- tiempo hasta Start;
- si toca accesibilidad;
- si recuerda nombres espontáneamente;
- si detecta contradicción de viento;
- si entiende qué hacen las anclas;
- si duda ante la prioridad;
- qué elige;
- reacción a la ruptura;
- si intenta volver atrás;
- si verbaliza deseo de continuar.

## PREGUNTAS POSTERIORES
Hacer ANTES de pulsar "Revelar huella":
1. ¿Quién recuerdas de la tripulación?
2. ¿Qué estabais intentando hacer?
3. ¿Qué empezó a fallar?
4. ¿Qué decidiste priorizar?
5. ¿Qué crees que perdiste o dejaste atrás?
6. ¿Qué crees que deberías hacer ahora?
7. Describe el tono en tres palabras.
8. ¿Hubo alguna línea o momento que te sonara demasiado escrito, forzado o confuso?
9. ¿Qué crees que es "el cielo" en este mundo: fondo, peligro, sistema, otra cosa?
10. ¿Seguirías jugando? ¿Por qué?

## SCORE
C1 compañero recordado
C2 objetivo previo entendido
C3 fallo entendido
C4 prioridad recordada
C5 coste/pérdida inferida
C6 siguiente objetivo inferido

GREEN = 5–6
AMBER = 3–4
RED = 0–2

## TONO
Marcar por separado:
- humor funciona;
- humor interrumpe emoción;
- poesía funciona;
- poesía parece pretenciosa;
- oscuridad ganada;
- oscuridad brusca;
- identidad propia;
- referencia externa demasiado visible.

## TEST DE FRASES
Especialmente observar reacción a:
- "el cielo tiene la obligación administrativa de quedarse quieto"
- "la popa se está quedando quieta. La proa también. En sitios distintos."
- "El cielo no explota. Se desacuerda."
- "no estamos lejos. Estamos mal colocados."
- "El cielo vuelve a parecer normal. Eso es lo peor."

No defender ninguna frase. Si no funciona, se mata.

## TEST DE ACCESIBILIDAD
Comprobar:
- texto al 140% sin cortes;
- motion al 0% sin perder legibilidad;
- navegación por teclado;
- touch en móvil;
- orientación vertical/horizontal;
- reduced-motion del sistema.

## REGISTRO
El botón "Exportar registro local" genera JSON local sin backend.
No contiene identidad personal.
Adjuntar sólo si el tester consiente compartirlo.

## LIMITACIÓN
Una simulación de IA/heurística no cuenta como PC-PRE50 PASS.
PC-PRE50 sólo puede cerrarse con observación de personas reales.


## PC-30 · VELARIA V2 P0 · DEVICE BLIND CHECK
Estado: READY AFTER TECHNICAL INPUT GATE · HUMAN_DEVICE_GREEN=PENDING
Propósito: obtener evidencia humana mínima de comprensión en dispositivo real sin reabrir diseño.

### PRECONDICIÓN
Sólo ejecutar cuando la secuencia técnica básica funcione en el mismo dispositivo:
moverse → ANCLAR → SUJETAR → MIRAR → pantalla final → volver.
Si cualquiera de esos pasos falla por input/runtime, registrar BLOQUEO TÉCNICO y detener. No reinterpretar el fallo como problema narrativo.

### TESTER
- una persona que no haya participado en el diseño de Velaria;
- dispositivo real;
- una sola pasada inicial;
- sin explicar lore, intención, sistema, contradicción de viento ni “respuesta correcta”.

### INTRO DEL FACILITADOR
"Prueba esto como si te lo encontraras dentro de un juego. Haz lo que te parezca natural. Si dudas, puedes decirlo en voz alta."

No añadir más contexto salvo bloqueo técnico.

### OBSERVAR SIN AYUDAR
Registrar únicamente:
- qué cree que puede hacer al entrar;
- primer gesto espontáneo;
- dónde duda o se atasca;
- qué cree que está ocurriendo;
- qué interpreta que hace ANCLAR / SUJETAR / MIRAR;
- si percibe que algo no cuadra entre señal y viento;
- si quiere continuar al terminar.

No explicar la contradicción durante la prueba.
No dirigir hacia el otro personaje.
No señalar botones salvo bloqueo técnico de accesibilidad/input.

### PREGUNTA ABIERTA FINAL
"¿Qué creías que el juego esperaba de ti?"

Después, sólo si hace falta para aclarar evidencia:
- "¿Qué pensabas que estaba pasando?"
- "¿Hubo algo que no entendieras?"
- "¿Seguirías jugando? ¿Por qué?"

### REGISTRO MÍNIMO
PC30_RESULT:
- device:
- technical_sequence: PASS / FAIL
- inferred_available_action:
- first_hesitation:
- inferred_situation:
- signal_wind_read:
- continue_intent: YES / MAYBE / NO
- final_open_answer:
- severe_blocker: NONE / descripción literal
- facilitator_help_given: NONE / descripción

No guardar identidad personal innecesaria.

### CRITERIO DE SALIDA
GREEN_CANDIDATE:
- secuencia técnica completa sin ayuda;
- navegación/intención básica entendida;
- ningún bloqueo severo;
- evidencia humana literal guardada.

MUTATE_ONE_BLOCKER:
- aparece un primer bloqueo claro de comprensión o interacción;
- corregir sólo ese bloqueo observable;
- repetir PC-30 después del fix.

STOP:
- fallo técnico impide observar comprensión;
- volver a runtime/input antes de tocar narrativa o arquitectura.

PC-30 no promociona contenido a CANON.
Una sola persona sirve para detectar bloqueos; no demuestra universalidad ni valida el diseño completo.
