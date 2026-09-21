# ISL_OFFLINE_BACKUP_AND_DEDUP_PROTOCOL_CURRENT

Estado: ACTIVO · ISL ONLY
Fecha: 2026-09-21

## OBJETIVO
Integrar un USB/SSD offline como tercera capa de persistencia de ISL sin convertirlo en otro sistema manual caótico.

## ARQUITECTURA
Drive = memoria humana/creativa.
GitHub = verdad operativa/versionada.
Offline USB/SSD = caja negra de recuperación.

## PRINCIPIO
El USB no es fuente primaria ni espacio de trabajo.
Es una réplica verificable, desconectada la mayor parte del tiempo.

## EVENTOS QUE DISPARAN SNAPSHOT
- checkpoint mayor;
- release/build importante;
- incorporación de assets master;
- cambio relevante de cuentas/integraciones;
- antes de una migración;
- antes de cambios destructivos;
- revisión mensual.

## ESTRUCTURA
ISL_BACKUP_FULL/
  00_MANIFEST/
  01_DRIVE_EXPORTS/
  02_GITHUB_REPO/
  03_DOCS_CANON/
  04_ASSETS_MASTER/
  05_BUILDS/
  06_AUDIO/
  07_IMAGES/
  08_3D/
  09_ACCOUNT_INDEX_NO_SECRETS/
  10_RESTORE_TEST/
  99_ARCHIVE/

## DEDUPLICACIÓN
No duplicar ciegamente.
Cada snapshot mantiene manifiesto con:
- ruta relativa;
- tamaño;
- fecha;
- hash SHA-256;
- origen;
- versión/checkpoint;
- estado VERIFIED / CHANGED / MISSING.

Si hash idéntico, no crear otra copia física salvo que la política de snapshot lo exija.

## VERSIONADO
Snapshots nombrados:
YYYY-MM-DD__ISL__CHECKPOINT_<version>__FULL

Mantener:
- latest verified;
- último checkpoint mayor;
- al menos una copia histórica adicional mientras haya espacio.

## BACKUP FUERTE
SOURCE → COPY → HASH → MANIFEST → RESTORE TEST.

Una copia sin restore test no cuenta como backup fuerte.

## RESTORE TEST
Mensual:
- escoger al menos 1 doc;
- 1 asset;
- 1 bloque de código/repo;
- 1 build o binario cuando exista;
- restaurarlos a una carpeta temporal;
- abrir/verificar;
- registrar PASS/FAIL.

## SEGURIDAD
Nunca guardar en claro:
- passwords;
- tokens;
- recovery codes;
- secretos API;
- claves privadas.

Un export de password manager, si alguna vez existe, debe ir cifrado y separado del backup ordinario.

## AUTOMATIZACIÓN LOCAL
Cuando el USB/SSD se conecte a un ordenador confiable:
1. detectar volumen ISL_BACKUP;
2. exportar/sincronizar fuentes autorizadas;
3. calcular hashes;
4. copiar sólo nuevos/cambiados;
5. escribir manifiesto;
6. ejecutar verificación;
7. producir resumen de cambios;
8. desmontar con seguridad.

La automatización debe fallar de forma segura si:
- el volumen no coincide;
- falta espacio;
- hay corrupción;
- falta una fuente;
- aparece un secreto potencial.

## GUARD DE CAPACIDAD
64 GB es válido mientras:
- uso < 75%;
- queden > 10 GB libres;
- assets grandes no obliguen a sacrificar snapshots críticos.

Al superar umbral:
- mover masters pesados a SSD mayor;
- mantener USB 64 GB como copia crítica compacta.

## INTEGRACIÓN
Checkpoint → Drive/GitHub persist → Backup Queue → USB snapshot al conectar → hash/manifest → restore test → registro PASS/FAIL.

## PRIMARY GUARD
Este sistema no desplaza Velaria P0 ni abre G00–G07.
