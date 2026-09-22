# ISL · WATCHDOG DRIFT REVIEW · CURRENT
Fecha: 2026-09-22
Estado: ACTIVE · ISL ONLY

## FUNCIÓN
Detectar drift entre creación y memoria operativa sin convertirse en un segundo proyecto.

## REVISA
- assets nuevos sin registry/galería;
- huellas sin enlace;
- CURRENT/checkpoints desactualizados;
- outputs significativos sin provenance;
- duplicados o SOURCE_OF_TRUTH conflictivo;
- lanes temporales desplazando PRIMARY;
- supplier/build/playtest states sin reflejo en CURRENT.

## REGLA
Máximo UNA corrección propuesta por revisión.
No promover CANON.
No ejecutar acciones irreversibles.
Si todo está coherente: NO HACER NADA.

## CADENCIA
Se puede ejecutar:
- al cierre de una sesión significativa;
- tras varios artefactos;
- antes de un checkpoint;
- periódicamente mediante automation de baja frecuencia.
