# ISL — REGRESSION AUDIT v0.20
Fecha: 2026-09-18
Estado: COMPLETADO

## Alcance
Cambios recientes:
- portal/capsulas.html
- portal/isl-capsules-current.json
- portal/playtest-echo.html
- prototypes/pre40-separation/index.html
- docs/ISL_SOUNDTRACK_PLAYLIST_BIBLE_v0.20.md
- docs/ISL_RECREO_TANDA_DURA_PROTOCOL_v0.20.md

## Riesgos revisados
1. Navegación PS4 / enlaces.
2. Contaminación del playtest.
3. Dependencia externa de Jotform.
4. Fallo del feed de cápsulas.
5. Estado local / decisiones ligeras.
6. Audio no intrusivo.
7. Bloqueo metodológico PRE50.
8. Seguridad / datos.

## Hallazgos
### GREEN
- Cápsulas están separadas de CANON.
- Decisiones ligeras se guardan sólo en localStorage.
- Playtest mantiene regla de responder antes de revelar huella.
- Jotform sigue sin pedir identidad personal.
- Audio es opcional y no bloquea interacción.
- Feed de cápsulas tiene fallback si JSON falla.
- No se añadió PostHog ni backend.
- PRE50 sigue marcado como pendiente humano.

### AMBER
- El iframe de Jotform depende de servicio externo.
Mitigación:
  - mantener enlace directo alternativo documentado;
  - si iframe falla, abrir formulario externo.
- La música maestra se usa como ambientación sin control de duración.
Mitigación:
  - volumen moderado;
  - nunca auto-reproducir sin interacción del usuario.

### RED
Ninguno.

## Regla de no-regresión
Cualquier futuro cambio en cápsulas o playtest debe preservar:
- no identidad;
- no CANON automático;
- no revelar respuesta antes del cuestionario;
- no telemetría sin gate;
- no decisiones pesadas durante recreo.
