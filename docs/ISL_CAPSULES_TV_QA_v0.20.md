# ISL — CAPSULES TV QA v0.20
Fecha: 2026-09-18
Estado: PRE-FLIGHT PASS

## Revisado
- carga JSON externa local;
- fallback de imágenes por índice;
- navegación izquierda/derecha;
- pausa;
- fullscreen;
- audio bajo interacción;
- decisiones paran autoplay;
- localStorage sólo para decisión ligera;
- sin backend;
- sin identidad;
- PS4 link presente;
- reduced-motion respetado.

## Riesgos ámbar
- imágenes se repiten al haber más cápsulas que fondos;
- algunos assets pueden no existir en builds recortadas;
- fullscreen depende del navegador PS4.

## Mitigación
- fondo oscuro sigue legible si falla imagen;
- controles siguen disponibles;
- contenido textual no depende del asset.

## Estado
APTO PARA RECREO / NO PRODUCCIÓN FINAL.
