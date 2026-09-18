# ISL PORTAL — COMMAND CENTER UI ARCHITECTURE v0.68
Fecha: 2026-09-19
Estado: FEATURE BRANCH · portal-v068-command-center

## Referencia visual aprobada
La composición visual aportada por el usuario se toma como referencia fuerte de:
- jerarquía;
- densidad;
- modularidad;
- menú con iconos;
- dashboard RPG;
- 3 tarjetas principales;
- 5 puertas de mundo;
- banda de utilidades/plataformas.

No se copia literalmente la imagen: se traslada su lógica al portal funcional existente.

## Jerarquía obligatoria

### A · NAV PRINCIPAL
Una sola línea, nunca wrap.

Orden:
1. Centro
2. Perfil RPG
3. Ruta ISL
4. Aventura
5. Galería
6. Música
7. Más

Cada item lleva icono + texto.
En móvil puede existir scroll horizontal; nunca segunda línea.

### B · AHORA
Bloque temporal operativo.
Máximo 2–3 acciones de fase.
No sustituye la navegación permanente.

### C · QUICK DOCK
Accesos visibles que no deben volver a enterrarse:
- Calendario
- Referencias
- Encuestas
- Registro
- Estado

Regla:
los iconos rápidos son navegación operativa, no decoración.

### D · HERO
Centro de Mandos.
Mensaje:
Un mundo que recuerda tus pasos.

CTA:
Continuar aventura.

### E · DECK PRINCIPAL · 3
Exactamente tres dominios:
1. Tu Perfil RPG
2. Ruta ISL
3. Brújula de las Huellas

#### Perfil RPG
Puede mostrar porcentajes sólo si están etiquetados explícitamente como indicadores RPG visuales.
Nunca presentar stats RPG como analítica real.

#### Ruta ISL
Debe leer portal/ISL_ROUTE_STATE_CURRENT.json.
El porcentaje de ruta se deriva de datos reales de pipeline/estado, no de una cifra decorativa.

#### Brújula
Mantiene lenguaje de:
- Lugares
- Ideas
- Personas
- Historias
- Tu huella

### F · MUNDO · 5
Exactamente cinco puertas de lectura:
1. Islas
2. Escenas
3. Criaturas
4. Reliquias
5. Dialéctica del mundo

Estas cinco categorías forman la fila conceptual central del universo.

### G · CABINA / UTILIDADES
Mantener como mínimo:
- Galería
- PS4 Version
- Música
- Comunidad
- Herramientas
- Recreo

La banda puede evolucionar, pero PS4 Version no debe desaparecer por simplificaciones de UI.

## Reglas responsive
- menu principal: nowrap;
- quick dock: scroll horizontal si no cabe;
- deck 3 → 1 columna en móvil;
- mundos 5 → 2 columnas en móvil;
- utilidades → 2 columnas en móvil;
- targets táctiles >= 40px, objetivo 44px;
- no cover/scale que recorte navegación esencial.

## Truth model
Tres tipos de cifras:
- REAL
- RPG VISUAL
- SIMULADO/PLANEADO

Nunca mezclarlos.

## Regresión visual prohibida
FAIL si:
- desaparecen Calendario o Referencias del acceso visible;
- nav rompe a segunda línea;
- se elimina Perfil/Ruta/Brújula;
- ya no hay exactamente 5 puertas conceptuales;
- PS4 Version desaparece;
- porcentaje de Ruta deja de derivarse del estado real;
- aparecen dos menús principales simultáneos.

## Estado
v0.68 se construye primero en feature branch.
No promover a main hasta:
- static gate GREEN;
- build gate GREEN;
- mobile visual review;
- human approval.
