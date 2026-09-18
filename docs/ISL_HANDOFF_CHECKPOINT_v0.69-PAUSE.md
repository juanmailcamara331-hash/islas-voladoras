# ISL HANDOFF CHECKPOINT v0.69-PAUSE
Fecha: 2026-09-19
Estado: PARÓN MAGISTRAL SOLICITADO POR EL AUTOR

## Posición exacta
Venimos de CHECKPOINT v0.68.2 y de la ronda v0.69 de continuidad global/navegación.

### Implementado en v0.69
- shell global nuevo:
  - portal/isl-global-shell.css
  - portal/isl-global-shell.js
- shell inyectado en:
  - index
  - rpg-home
  - huellas
  - Salón de las Cortinas Rojas
  - Isla del Baile Inagotable
  - Recreo
  - Cápsulas
  - Cápsulas TV
  - Música
  - PS4
- navegación global base:
  Centro / Ruta / Perfil / Brújula / Cápsulas / Recreo / Más
- Más:
  Cápsulas TV / PS4 / Música / Salón Rojo / Isla Baile / Centro técnico
- resume=1 + session marker para no reabrir Welcome al volver al Centro.
- index reconoce #home y #calendar como reanudación interna.
- Cápsulas:
  - tarjetas abribles/focuseables
  - modal de lectura
  - Guardar Eco
  - acceso a Modo TV
  - cierre tocando fuera
- Ruta ISL:
  - ISL_ROUTE_STATE_CURRENT.json actualizado a v0.69
  - current_stop=r2-human
  - pipeline visible:
    R1 → R2 → Lite v2 colegas → síntesis → 3 criaturas → NUDOS → CQC B×A → decisión humana
  - route-isl.js simplificado a AHORA → SIGUIENTE → DESPUÉS
  - calendario degradado a capa secundaria
- nuevo scripts/navigation-link-gate.py
- build-web-preview ejecuta auditor global de enlaces/navegación.

### Hallazgos de CI
Primer Pages build con navigation-link-gate falló correctamente al detectar dos referencias de assets inexistentes:
- ../assets/isl-summary-v1.jpg
- ../assets/isl-mutate-v1.jpg

Se corrigieron por assets existentes:
- pilares Lite v2 → island-a-master.jpg
- referencias Lite v2 → wind-lab-sunset.png

Último estado observado antes del parón:
- nuevo Pages build relanzado tras las correcciones.
- varios workflows todavía estaban en progreso/cola en ese momento.
- NO declarar R2 HUMAN GREEN hasta prueba física Android.
- NO declarar Pages final GREEN sin comprobar conclusión del último run.

## Pendiente inmediato al volver
1. comprobar conclusión del último Pages run y gates.
2. terminar extensión real del shell global a todas las pantallas HTML secundarias que aún no se habían actualizado:
   air-fishing / avisos / boss-prototype / decision-engine / midjourney-lab / ningun-sitio / playtest-echo / reel / secret-level / storm-route / sunday-market.
3. reauditar todos los href/action internos con navigation-link-gate.
4. prueba física Android:
   - menú global presente en cada superficie
   - Atrás vuelve al punto anterior / Centro sin Welcome
   - Cápsulas responden
   - Ruta ISL legible
   - no doble fila / no overflow raro
5. sólo entonces R2 HUMAN GREEN.
6. después: Lite v2 colegas → síntesis dialéctica → 3 criaturas → NUDOS → CQC B×A → decisión humana.

## Regla de frontera
El nuevo proyecto LIL se desarrolla en Drive/repos/conectores separados.
No importar nombres, assets, lore, código ni decisiones específicas de ISL.
Sólo se permite transferir principios abstractos/metodológicos explícitamente generalizados.

## Commits clave v0.69
- d77522bd6b42b2352a28996507f6f8375fd76f19 global shell CSS
- bfca42d762c5a5d2c3b45d83280a60587f458495 global shell JS
- 657337af59029f687791be0012e76fb8ec52f3ba resume without Welcome
- 792196c92f19fb4cb22120f843ad9d6f521a5b15 capsules interaction
- ed80b1a698570099550905fd454a4c88325f81a0 route state v0.69
- 529d20f73ff97e3d41c0e35b4ea7c7c0a448817 route UX simplification
- 9443e92d5ef949e62908807501d2f6a4c4feef28 navigation/link gate
- 228a74618dd443b75256ef82741ff2b1056add2c CI runs nav gate
- f79b539f31327ca946b9e5695d3032d91dc073bc Lite pillars broken asset fix
- bf51c491c6de3522c97b625eac5b17eed6bc04aa Lite references broken asset fix
- 83756b08fb72bb31a84f6898fb5bb27367a2b1db work pointer v0.69

## Freeze
No hacer cambios adicionales en ISL durante el arranque de LIL salvo que el usuario regrese explícitamente a ISL.
