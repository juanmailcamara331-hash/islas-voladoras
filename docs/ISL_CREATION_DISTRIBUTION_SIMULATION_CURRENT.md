# ISL · SIMULACIÓN INTEGRAL DE CREACIÓN Y DISTRIBUCIÓN

Fecha: 2026-09-18

## Qué se simuló
Se trató ISL como si ya estuviera avanzando desde preproducción hasta post-lanzamiento y se inyectaron cambios tardíos, bugs, migraciones de saves, regresiones de rendimiento, localización, cambios de scope, store assets obsoletos, hotfixes y stretch goals.

Resultado: PASS WITH ACTIONS. La arquitectura aguanta si se respetan gates y Production Lane.

## Hallazgos principales
1. La aventura principal debe permanecer arriba de la jerarquía: demasiada automatización sin contexto podría optimizar el juego equivocado.
2. El receptor del viento no debe rehacerse visualmente; debe revalidarse físicamente cuando vuelva al prototipo.
3. Molino conserva valor como laboratorio, pero debe volver a evaluarse dentro de región/ciudad/aventura.
4. El Centro de Mandos ya era capaz de convertirse en monstruo: la solución es jerarquía visual + pesos + capas, no añadir más botones iguales.
5. Decision Studio y Lifecycle OS son infraestructura crítica; las utilidades antiguas pasan a segundo plano.
6. Todo asset promocional debe guardar build fuente y claim; si cambia la feature, se invalida automáticamente.
7. Cambios de DATA/TAGS/SAVE/PATH deben disparar migraciones y regresión.
8. Release Candidate necesita rollback, save integrity, controller, localization, performance y store parity.
9. Kickstarter/marketing no pueden crear scope nuevo sin pasar por coste/riesgo.
10. Votos por cohortes deben permanecer separados; mayoría pública no equivale a evidencia técnica o narrativa.

## Simulación de coste
La mayor palanca económica no es “automatizar todo”, sino detectar errores antes:
- prototipo antes de producción,
- validación de assets antes de cook,
- smoke/regression en cada build,
- presupuestos de rendimiento desde el vertical slice,
- data-driven + tags + contratos estables,
- reutilización de captures/store assets desde builds aprobadas,
- migraciones de save ensayadas antes de RC,
- hotfix mínimo con rollback.

## Regla anti-monstruo
El Centro de Mandos sólo debe responder cuatro preguntas arriba:
1. ¿Qué estamos intentando demostrar AHORA?
2. ¿Qué decisiones bloquean producción?
3. ¿Qué está listo para producir?
4. ¿Qué riesgo puede hacernos perder tiempo/dinero?

Todo lo demás es herramienta secundaria.

## Stress de lo ya construido
- 1A×1B×1C / huella / mutación: conservar como base; revalidar en experiencia integrada.
- Wind Receiver: cerrado visual; re-test gameplay/física.
- Molino: conservar; revalidar contexto, elección autor y loop de retorno.
- Wind Lab: usar como test harness, no como producto.
- Polls: conservar; añadir cohortes/segmentación.
- Command Center: congelar layout base; mejoras sólo por jerarquía o bugs.
- PS4: separado; no tocar salvo bug.
- Assets visuales: normalizar estado, licencia y elegibilidad de producción.
- Audio de referencia: mantener como referencia, no confundir con asset final.
- Unreal Handoff: arquitectura sí; implementación real tras vertical slice.

## Siguiente aplicación
Volver al juego: aventura principal → regiones/ciudades → loops → Molino contextualizado → vertical slice.
