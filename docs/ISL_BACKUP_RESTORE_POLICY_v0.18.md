# ISL — BACKUP & RESTORE POLICY v0.18
Fecha: 2026-09-18
Estado: ACTIVO
Objetivo: poder volver a un estado conocido de ISL sin depender de memoria humana ni de una única plataforma.

## PRINCIPIO
No añadir una nueva plataforma de infraestructura si GitHub + Drive + Netlify ya cubren el riesgo.
La copia de seguridad debe responder a una pregunta simple:
"Si algo se rompe hoy, ¿qué commit, qué checkpoint y qué deploy restauramos?"

## CAPA 1 · FUENTE DE CÓDIGO
Proveedor: GitHub
Repo: juanmailcamara331-hash/islas-voladoras
Main snapshot actual:
- commit: 184db436ad85e533a3b7a5a53ea7ca43b75c4a38
- significado: Velaria greybox flow definido
- rama de snapshot: backup/2026-09-18-v0.18-greybox

Regla:
- antes de cambios estructurales o producción real, crear snapshot por commit/branch;
- no usar la rama backup como rama de trabajo;
- restaurar desde un commit conocido, no "a ojo".

## CAPA 2 · MEMORIA EXTERNA / CHECKPOINTS
Proveedor: Google Drive
Raíz: ISLAS_VOLADORAS_ISL
Carpeta: 05_BACKUPS/2026-09-18_v0.18_GREYBOX

Incluye:
- BACKUP_ISL_CHECKPOINT_MASTER_CURRENT_2026-09-18_v0.18
- BACKUP_ISL_CHECKPOINT_v0.17.0_OLYMPUS_TOOLCHAIN_2026-09-18

Función:
- conservar decisiones, reglas, contexto, dependencias y punto de reanudación;
- permitir reconstruir qué significaba un commit si GitHub no lo explica por sí solo.

## CAPA 3 · DEPLOY RESTAURABLE
Proveedor: Netlify
Sitio público: islas-voladoras-isl
Sitio privado: islas-voladoras-isl-private

Regla:
- production deploys sólo para cambios reales de sitio;
- previews para revisión;
- conservar referencia del último deploy conocido estable en cada checkpoint importante;
- un deploy estable es rollback operativo, no sustituto del source backup.

## CAPA 4 · ARCHIVO HISTÓRICO
Drive ya contiene:
- MASTER_CHECKPOINTS
- 04_ARCHIVO_HISTORICO
- 03_EXPORTS_Y_ENTREGABLES
- snapshots/ZIP históricos

Regla:
- REJECTED no se borra;
- versiones antiguas útiles migran a histórico;
- producción vigente no se mezcla con archivo.

## CADENCIA
MICRO SNAPSHOT
- tras una sesión que cambia gameplay o datos relevantes;
- guardar commit estable;
- sólo crear branch backup si el cambio es difícil de reproducir.

CHECKPOINT MAESTRO
- cierre de fase;
- cambio de arquitectura;
- promoción a CANON;
- antes de producción/Unreal;
- antes de cambios de seguridad, pipeline o migraciones;
- antes de cambiar de conversación cuando haya trabajo importante sin consolidar.

## RESTORE DRILL
Cada cierto bloque importante:
1. identificar commit;
2. identificar checkpoint Drive;
3. identificar deploy estable;
4. comprobar que el documento explica cómo reanudar;
5. si una pieza no puede localizarse en menos de unos minutos, el backup se considera incompleto.

## RESTAURACIÓN DE EMERGENCIA
Si el portal se rompe:
1. NO seguir parcheando a ciegas.
2. elegir último deploy production estable.
3. contrastar con commit asociado.
4. restaurar main desde commit/snapshot conocido.
5. ejecutar Security Gate y build regression.
6. verificar encuestas y Command Center.
7. documentar la causa como BUG_REGRESION.

Si la narrativa/diseño se contradice:
1. abrir MASTER_CURRENT;
2. abrir el snapshot Drive de la fase;
3. comparar con docs del commit;
4. preservar CANON y PROVISIONAL FUERTE;
5. lo no confirmado vuelve a VARIANTES/ESPERA.

## LIMITACIÓN CONOCIDA
La rama backup de GitHub sigue dentro del mismo proveedor y no es una copia off-provider completa del repositorio.
Drive mantiene la memoria/decisiones, y Netlify mantiene artefactos desplegados, pero un ZIP completo y periódico del source fuera de GitHub sería una capa adicional deseable antes de entrar en producción seria.
No se abre ahora otra infraestructura sólo por completismo; se activa cuando el volumen de código/arte haga material ese riesgo.

## ESTADO ACTUAL
BACKUP LAYER: ACTIVA
RESTORE POINTERS: DEFINIDOS
OFF-PROVIDER FULL SOURCE ARCHIVE: PENDIENTE CUANDO SEA NECESARIO
