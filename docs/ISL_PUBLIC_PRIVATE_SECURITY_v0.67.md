# ISL — PUBLIC / PRIVATE SECURITY ARCHITECTURE v0.67
Fecha: 2026-09-19
Estado: ACTIVO · MIGRACIÓN SEGURA

## Objetivo
Evitar que páginas operativas del Centro de Mandos queden expuestas por accidente mientras mantenemos encuestas y superficies de colegas públicas.

## Regla por defecto
TODO ES PRIVATE salvo allowlist explícita PUBLIC.

## PUBLIC
- landing pública;
- encuestas destinadas a colegas;
- página de gracias;
- assets expresamente compartibles;
- endpoints públicos mínimos necesarios para las encuestas.

El build público se genera sólo con netlify-public-build.sh.

## PRIVATE
Incluye, entre otros:
- Command Center;
- Perfil RPG;
- Ruta ISL interna;
- Huellas / Brújula;
- Labs;
- CQC / auditorías;
- estados JSON internos;
- prototipos secretos;
- herramientas de producción.

## Capas
### P0 · Publicación
El build público usa allowlist. Los archivos internos no se copian.

### P1 · Descubribilidad
Mientras el Command Center siga temporalmente en GitHub Pages:
- meta robots noindex/nofollow/noarchive;
- robots.txt Disallow: /;
- enlaces públicos no deben apuntar a superficies privadas.

IMPORTANTE: P1 reduce descubribilidad; NO es autenticación.

### P2 · Aislamiento real
Crear host privado separado para build/private y activar control de acceso real del proveedor.

Objetivo:
- PUBLIC_NETLIFY → landing + surveys.
- PRIVATE_COMMAND_CENTER → build/private + authentication.
- APK → PRIVATE_COMMAND_CENTER, nunca GitHub Pages público.

### P3 · Migración APK
No cambiar HOME Android hasta que:
1. private host responda;
2. acceso esté protegido;
3. cold start funcione;
4. back/resume funcione;
5. rollback URL exista;
6. APK_GREEN + PRIVATE_WEB_GREEN.

## Prohibiciones
- No llamar “seguro” a un password en JS.
- No usar query string secreta como autenticación.
- No esconder contenido con CSS como única protección.
- No poner secretos en repo público.
- No mezclar public y private por conveniencia de deploy.

## Evidencia actual
- netlify-public-build.sh ya es allowlist-only.
- netlify-private-build.sh ya compone el Command Center completo.
- GitHub Pages todavía publica portal completo para la APK actual.
- por tanto, el aislamiento real todavía está PENDIENTE.

## Siguiente cambio seguro
Crear/provisionar site privado separado + access control.
Después mover APK HOME y retirar exposición completa de GitHub Pages.

## Invariante
PUBLIC_BUILD ∩ PRIVATE_ONLY = ∅
