# ISL — ACCOUNTS REGISTRY TEMPLATE v0.18
Fecha: 2026-09-18
Estado: PLANTILLA SEGURA

## REGLA CRÍTICA
NO guardar:
- passwords;
- API keys;
- access tokens;
- TOTP seeds;
- recovery codes;
- private keys;
- session cookies.

Nunca en:
- GitHub;
- Drive docs;
- frontend;
- screenshots;
- checkpoints;
- chats;
- logs.

Los secretos viven en un gestor de contraseñas cifrado.

## CAMPOS PERMITIDOS
| Servicio | URL/portal | Email/usuario | Propietario | Rol ISL | Plan | Billing owner | MFA | Método MFA | Recovery verificado | Gestor/entrada | Estado | Última revisión |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Ejemplo de "Gestor/entrada":
- "Password Manager → ISL / GitHub / Production"
No copiar el secreto.

## CUENTAS A INVENTARIAR
- correo principal de ISL;
- Google / Drive;
- GitHub;
- Netlify;
- Epic Games / Unreal;
- Epic Online Services si se activa;
- Steamworks cuando exista;
- PostHog;
- Jotform;
- Metricool;
- Windsor.ai;
- PlaytestCloud si se activa;
- Nakama/hosting si se activa;
- Kickstarter si se crea;
- dominios/DNS;
- tiendas/console portals cuando existan;
- servicios 3D/arte/audio usados en producción.

## MFA
Preferencia:
1. passkey/security key;
2. TOTP en gestor seguro;
3. SMS sólo como último recurso.

## RECOVERY
- al menos 2 administradores sólo si el equipo lo requiere;
- recovery codes fuera del repo;
- método de recuperación probado;
- billing separado de credenciales operativas cuando sea posible.

## OFFBOARDING / INCIDENTE
Si una cuenta o secreto se considera comprometido:
1. rotar secreto;
2. revocar sesiones/tokens;
3. revisar logs;
4. comprobar integraciones dependientes;
5. documentar incidente sin copiar el secreto;
6. crear test/checklist para evitar repetición.

## REVISIÓN
Revisar registro:
- antes de lanzamiento;
- al añadir colaborador;
- al cambiar billing;
- después de incidente;
- cada checkpoint de producción importante.
