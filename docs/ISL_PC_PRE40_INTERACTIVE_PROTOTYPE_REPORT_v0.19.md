# ISL — PC-PRE40 INTERACTIVE PROTOTYPE REPORT v0.19
Fecha: 2026-09-18
Estado: IMPLEMENTADO / PENDIENTE PLAYTEST
Ruta: prototypes/pre40-separation/index.html
Commit: b322df202e8d5c98ae7c5073ca716d734e7133d7

## QUÉ EXISTE
Prototipo web autónomo, fuera de portal/ y fuera del deploy automático de Netlify.

Incluye:
- first-boot accessibility;
- logo/bienvenida;
- prólogo;
- 3 compañeros: Mara, Taro, Lena;
- humor de pandilla/institucional;
- anomalía de viento;
- anclas;
- incompatibilidad;
- 3 prioridades físicas;
- ruptura híbrida;
- eco imposible;
- silencio;
- despertar;
- resumen de la huella.

## DECISIONES DE IMPLEMENTACIÓN
- una sola página HTML;
- Canvas 2D;
- sin dependencias externas;
- sin assets finales;
- responsive;
- prefers-reduced-motion respetado;
- teclado/touch;
- sin backend;
- sin telemetría;
- sin PostHog;
- sin Netlify deploy automático.

## TONO DEMOSTRADO
Calidez/pandilla:
"Si ese cubo vuelve a rodar por cubierta, queda oficialmente ascendido a marinero."

Institucional absurdo:
"Según el manual, ahora el cielo tiene la obligación administrativa de quedarse quieto."

Oscuridad:
"La popa se está quedando quieta. La proa también. En sitios distintos."

Poesía/eco:
"El cielo no explota. Se desacuerda."

Regla:
estas líneas son prototipo funcional, no diálogo final ni CANON.

## PRIORIDADES
PERSON:
- protege vínculo;
- pierde integridad de nave.

CORE:
- preserva hogar/supervivencia;
- pierde contacto.

SIGNAL:
- prioriza misterio/ruta;
- pierde cercanía humana.

No hay opción correcta.

## TEST PC-PRE50
Sin explicar el propósito, pedir al tester que juegue y luego responder:
1. nombra/describe al menos un compañero;
2. explica qué estaban intentando hacer;
3. explica qué falló;
4. recuerda qué priorizó;
5. identifica qué perdió;
6. dice qué querría hacer después;
7. describe el tono en 3 palabras.

## UMBRALES
GREEN:
- 5/6 de comprensión causal;
- al menos 1 compañero recordado;
- prioridad recordada;
- pérdida reconocida;
- intención de continuar clara.

AMBER:
- 3–4/6;
- repetir con cambios pequeños.

RED:
- <=2/6;
- reescribir flujo/lectura antes de producir arte.

## CQC TONAL
Preguntar:
- ¿te hizo gracia algo sin parecer una comedia?
- ¿La Separación llegó como sorpresa o la viste venir demasiado?
- ¿el momento oscuro se sintió ganado?
- ¿la línea "El cielo no explota. Se desacuerda." funciona o parece escrita para lucirse?
- ¿el silencio posterior necesita más tiempo?
- ¿algún personaje suena a referencia externa en vez de ISL?

## RIESGOS ABIERTOS
- el prototipo es simbólico, no 3D;
- la elección todavía se ejecuta por botones, no acción espacial;
- falta firma sonora real;
- logo es placeholder;
- compañeros son nombres/voz, no presencia física;
- la ruptura debe probarse en movimiento real más adelante.

## PRÓXIMO GATE
PC-PRE50:
playtest de los primeros minutos.
No producir logo final, cinemática final ni arte de personajes antes de aprender de ese test.
