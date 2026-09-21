# ISL_RECURSIVE_DIALECTIC_QUALITY_ROUTER_CURRENT

Estado: PROVISIONAL FUERTE · OBLIGATORIO · ISL ONLY
Fecha: 2026-09-21

## PROPÓSITO
Evitar que el usuario tenga que recordar manualmente todos los planos de calidad, recursividad, dialéctica, referencias, regresiones, ciencia, evidencia y coherencia cada vez que se crea o modifica algo en ISL.

Este router debe activarse ANTES de trabajo sustantivo y volver a activarse DESPUÉS del cambio para CQC-R.

## PRE-FLIGHT AUTOMÁTICO
1. IDENTIFICAR TIPO DE ENTE
2. CARGAR PLANOS OBLIGATORIOS SEGÚN TIPO
3. RECUPERAR REGRESIONES / BUGS / DECISIONES PREVIAS
4. RECUPERAR REFERENCIAS FUNCIONALES RELEVANTES
5. DECIDIR SI HACE FALTA EVIDENCIA EXTERNA
6. DEFINIR REPRESENTACIÓN MÁS BARATA QUE PUEDA FALSAR LA HIPÓTESIS
7. EJECUTAR PRIMARY LANE + QUALITY LANES ACOTADAS
8. CQC-R
9. EVIDENCIA HUMANA CUANDO CORRESPONDA
10. CERRAR / MUTAR / PARK / KILL

## PLANOS DISPONIBLES
- identidad / alma ISL;
- experiencia humana;
- claridad / ergonomía;
- agencia / acción;
- game feel / feedback;
- narrativa;
- causalidad;
- cronología / líneas temporales;
- personajes / vínculos;
- mundo / geografía / cultura;
- transformación Δ;
- humor / sátira / ternura;
- referencias funcionales;
- ciencia / papers;
- web / archive / comunidad;
- visual / composición / material / iluminación;
- audio / música / SFX;
- 3D / asset pipeline;
- rendimiento / dispositivo;
- accesibilidad;
- persistencia / memoria;
- seguridad / privacidad;
- procedencia / derechos;
- build / CI / deploy;
- regresiones conocidas;
- costes / complejidad / rollback;
- evidencia humana;
- integración sistémica;
- presentación externa;
- canon / autoridad.

## REGLA DE PESOS
Los pesos indican PRIORIDAD DE REVISIÓN, no una puntuación absoluta.
0 = normalmente irrelevante
1 = chequeo ligero
2 = importante
3 = crítico / bloqueante

Un plano crítico fallido bloquea cierre aunque otros estén excelentes.

## RECURSIVIDAD
Cada vuelta pregunta:
- ¿qué aprendimos?
- ¿qué contradicción apareció?
- ¿qué regla o hipótesis cambia?
- ¿qué parte anterior debe reauditarse?
- ¿qué nueva evidencia sería capaz de refutar lo que creemos?

STOP cuando otra vuelta:
- no cambia decisiones;
- no descubre riesgo;
- no mejora perceptiblemente;
- o cuesta más de lo que puede aportar al hito actual.

## DIALÉCTICA
TESIS → ANTÍTESIS → EVIDENCIA EXTERNA → SÍNTESIS PROVISIONAL → PROTOTIPO → CQC → HUMANO → DECISIÓN

No se fuerza una síntesis “bonita”.
Puede terminar en:
- conservar tesis;
- adoptar antítesis;
- síntesis;
- coexistencia contextual;
- PARK;
- KILL.

## REFERENCIAS
Siempre:
REFERENCIA → FUNCIÓN → CONTRASTE → MUTACIÓN ISL → TEST

Cuando una referencia tenga obra extensa:
- estudiar recurrencia y evolución;
- reglas estables vs excepciones;
- callbacks y consecuencias;
- manejo de personajes recurrentes;
- tono y transición entre comedia/stakes;
- coherencia interna a largo plazo.

Ejemplo Terry Pratchett:
usar humanidad, sátira, absurdo reglado, ternura, callbacks y coherencia acumulativa;
nunca copiar voz, chiste, personaje, trama o apariencia.

## EVIDENCIA EXTERNA
Activar sólo si reduce incertidumbre real.

Orden preferido:
1. documentación / estándares / fuentes primarias;
2. papers / Consensus cuando la cuestión sea científica o empírica;
3. web actual para tecnología/producto;
4. archive.org para evolución histórica;
5. Reddit/comunidad para experiencia práctica y fricciones repetidas;
6. referencias de proyectos similares;
7. herramientas generativas para candidatos, nunca para verdad.

Registrar:
- pregunta;
- fuente;
- fecha;
- población/contexto;
- qué cambia en nuestra decisión;
- limitaciones.

## IA PARALELA
Gemini / Midjourney / Meshy / otros:
- pueden generar candidatos en quality lanes;
- no bloquean primary lane salvo dependencia real;
- no ascienden a CANON;
- provenance obligatoria;
- comparar antes de adoptar;
- MASTER != RUNTIME.

## OBLIGACIÓN DE REGRESIÓN
Antes de cerrar un cambio, consultar:
- registro de errores;
- rutas afectadas;
- cache/SW;
- Android/device;
- navegación/back/resume;
- audio/fullscreen;
- visual móvil;
- save;
- seguridad;
- CI/deploy;
- decisiones congeladas.

## SALIDA MÍNIMA DEL ROUTER
Para cada tarea debe poder resumirse en:
- ENTE:
- HIPÓTESIS:
- PLANOS CRÍTICOS:
- PLANOS SECUNDARIOS:
- REGRESIONES:
- REFERENCIAS:
- EVIDENCIA EXTERNA:
- QUALITY LANES:
- HUMAN GATE:
- STOP RULE:
