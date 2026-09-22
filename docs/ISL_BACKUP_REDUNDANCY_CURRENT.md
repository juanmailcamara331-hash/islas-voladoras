# ISL_BACKUP_REDUNDANCY_CURRENT

Estado: ACTIVE · SIMPLE · NO SINGLE POINT OF FAILURE
Fecha: 2026-09-22

## PRINCIPIO
No depender de una sola cuenta, nube o proveedor.

ISL usa separación de responsabilidades:
- GitHub = código, automatización, docs técnicas, historial de commits.
- Google Drive = checkpoints humanos, briefs, documentos maestros, material de colaboración.
- Dropbox = segunda copia de snapshots/exportables cuando se conecte.
- Copia local/offline = snapshots importantes descargados por el autor.

No sincronizar todo en tiempo real entre todos los proveedores.
Preferir SNAPSHOTS INMUTABLES por checkpoint para no propagar borrados/corrupciones.

## QUÉ DUPLICAR
Por checkpoint mayor:
- checkpoint master/current exportado;
- CURRENT_WORK_POINTER;
- RUMBO ISL PDF;
- briefs activos;
- inventario/registro de assets;
- manifests;
- assets maestros imprescindibles que no existan ya en otra fuente;
- export de evidencia humana importante;
- ZIP ligero de docs/config crítico.

No duplicar secretos/tokens/credenciales en carpetas de proyecto.

## CADENCIA
- Micro-checkpoint: GitHub + Drive.
- Checkpoint global/fase: GitHub + Drive + Dropbox snapshot + copia local opcional.
- Assets pesados: segunda nube sólo para masters/approved/strong reference, no cada iteración.

## NOMBRES
YYYY-MM-DD__ISL__CHECKPOINT_<version>__SNAPSHOT

Cada snapshot contiene:
- README_RECOVERY.md
- CHECKPOINT
- POINTER
- MANIFEST
- documentos/exports relevantes

## RECOVERY ORDER
1. Leer último CHECKPOINT global.
2. Leer POINTER.
3. Verificar GitHub commit SHA conocido.
4. Comparar Drive/Dropbox snapshot por fecha/version.
5. Recuperar sólo desde fuente más reciente y coherente.
6. Nunca mezclar versiones a ciegas.

## REGLA
RECENCY != AUTHORITY.
Una copia más nueva no sustituye una referencia aprobada si contradice el source of truth.

## DROPBOX
Estado: AVAILABLE CONNECTOR · NOT CONNECTED.
Cuando se conecte:
- crear carpeta /ISL_BACKUP/
- subcarpetas /CHECKPOINTS /PDF /ASSET_MASTERS /HUMAN_EXPORTS
- usar uploads por snapshot, no sync destructivo bidireccional.
