# ISL_STORAGE_RESILIENCE_ARCHITECTURE_CURRENT

Estado: ACTIVO · NO ABRIR INFRAESTRUCTURA NUEVA SIN NECESIDAD
Fecha: 2026-09-21

## OBJETIVO
Evitar que el crecimiento de ISL dependa de una sola conversación, servicio o copia.

## CAPAS ACTUALES
### DRIVE — MEMORIA HUMANA / CREATIVA
- checkpoints maestros;
- briefs;
- huellas humanas;
- dossiers;
- documentos largos;
- assets de trabajo y exports;
- material para compartir.

### GITHUB — VERDAD OPERATIVA
- código;
- docs canónicas operativas;
- protocolos;
- guards/CI;
- historial versionado;
- current work pointer.

### CHAT — MESA DE TRABAJO
No es memoria única ni fuente de verdad.

## REGLA DE DOBLE ANCLA
Toda decisión o metodología importante debe quedar en al menos:
1. Drive o artefacto persistente humano;
2. GitHub cuando afecte operación, canon metodológico, código, guard o continuidad técnica.

## TERCER ALMACÉN
NO añadir Dropbox, Supabase Storage, R2, S3 u otro sistema sólo “por si acaso”.
Activarlo únicamente si aparece una necesidad verificable:
- binarios demasiado grandes para GitHub;
- biblioteca 3D/audio/vídeo de alto volumen;
- CDN/runtime;
- versionado de masters binarios;
- compartir grandes activos;
- restauración independiente.

## PREFERENCIA SI SE ACTIVA
Separar:
- MASTER/RAW;
- RUNTIME/CDN;
- BACKUP;
- PROVENANCE/METADATA.

El proveedor se decide por coste, límites, versionado, recuperación, permisos, CDN y portabilidad. Nunca por moda.

## BACKUP RULE
Para material crítico:
SOURCE → SECOND COPY → CHECKSUM/IDENTIDAD → RESTORE TEST → INDEX.

Una copia que nunca se ha probado restaurar no cuenta como backup fuerte.

## BOUNDARY
Todo almacén nuevo debe ser exclusivo de ISL o tener partición/namespace inequívoco.
Nunca mezclar assets, identidades o datos de otros proyectos.

## PRIMARY GUARD
La resiliencia de almacenamiento es QUALITY LANE.
No desplaza Velaria P0 ni abre G00–G07.

## TRIGGER DE ESCALADO
Reevaluar tercer almacén cuando:
- Drive/GitHub no soporten volumen o formato;
- haya masters > límites cómodos;
- runtime necesite entrega CDN;
- restauración independiente tenga valor real.
