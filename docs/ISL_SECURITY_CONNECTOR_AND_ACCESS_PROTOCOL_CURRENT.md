# ISL_SECURITY_CONNECTOR_AND_ACCESS_PROTOCOL_CURRENT

Estado: ACTIVE · ISL ONLY
Fecha: 2026-09-21

## OBJETIVO
Reducir riesgo en GitHub, Google Drive, ChatGPT connectors, automatizaciones, hosting y servicios externos sin frenar el trabajo creativo.

## PRINCIPIOS

### 1. LEAST PRIVILEGE
Cada conector/servicio recibe sólo los permisos mínimos necesarios.
Preferir:
- lectura antes que escritura;
- escritura acotada antes que full access;
- scopes separados por función;
- cuentas/credenciales dedicadas cuando proceda.

### 2. SECRET ZERO
Nunca guardar en:
- ChatGPT;
- Drive docs;
- GitHub;
- issues;
- commits;
- PDFs;
- screenshots;
- Centro de Mandos;
passwords, API keys, tokens, recovery codes, private keys o secretos 2FA.

Los secretos viven sólo en vault/password manager externo.

### 3. PUBLIC ≠ PRIVATE
- GitHub Pages/noindex/unlinked no cuenta como privado.
- Material sensible no se publica en builds públicas.
- Private surfaces requieren autenticación real.
- Antes de compartir, aplicar PUBLIC-SAFE / REDACTED gate.

### 4. READ/WRITE SPLIT
Distinguir:
- conectores de lectura;
- conectores de escritura;
- acciones destructivas;
- acciones financieras;
- acciones de publicación.

Las acciones irreversibles o sensibles requieren revisión humana explícita.

### 5. CHANGE SAFETY
Antes de una acción sensible:
- identificar objetivo exacto;
- comprobar permisos;
- registrar impacto;
- tener rollback;
- confirmar que no afecta a otro proyecto;
- verificar destino;
- persistir checkpoint si corresponde.

### 6. CONNECTOR TRUST BOUNDARY
Un conector no hereda confianza por estar instalado.
Cada integración declara:
- qué puede leer;
- qué puede escribir;
- qué datos toca;
- qué identidad usa;
- qué logs deja;
- qué pasa si se compromete;
- cómo se desconecta;
- cómo se rota acceso.

### 7. PROJECT BOUNDARY
ISL usa cuentas, espacios, carpetas, repos o namespaces propios cuando sea viable.
Nunca mezclar secretos/assets/datos de LIL, Mamut, Spielberg, Creator OS, Founder OS u otros proyectos.

### 8. WRITE GUARD
Para GitHub/Drive:
- preferir cambios pequeños y verificables;
- leer estado actual antes de escribir;
- usar revision/SHA cuando exista;
- evitar writes paralelos al mismo recurso;
- re-leer tras escribir;
- conservar rollback.

### 9. HUMAN REVIEW REQUIRED
Siempre revisión humana antes de:
- publicar;
- cambiar DNS;
- borrar;
- mover material crítico;
- rotar secretos;
- cambiar permisos amplios;
- transferir propiedad;
- pagar/comprar;
- compartir con terceros;
- hacer público material privado;
- firmar documentos legales.

### 10. BACKUP BEFORE DESTRUCTIVE
Antes de migración, borrado, cambio de permisos o refactor grande:
checkpoint → Drive/GitHub persist → backup queue → offline snapshot si aplica.

## MATRIZ DE RIESGO

LOW
- lectura;
- búsqueda;
- análisis;
- borrador local.

MEDIUM
- editar docs;
- actualizar código;
- crear archivos;
- añadir automatización.

HIGH
- publicar;
- borrar;
- cambiar permisos;
- compartir externally;
- DNS;
- secretos;
- pagos;
- cuentas;
- ownership.

HIGH siempre requiere human review + rollback.

## CHATGPT / CONNECTORS
- usar conectores sólo para el objetivo declarado;
- no ampliar permisos “por comodidad”;
- revisar plugins/conectores que ya no se usan;
- preferir ask-before-writes para servicios sensibles cuando sea compatible;
- no depender de una sola integración para continuidad;
- registrar servicio en Account Index.

## AUDITORÍA PERIÓDICA
Revisar:
- conectores activos;
- permisos;
- cuentas antiguas;
- accesos de terceros;
- tokens/keys rotables;
- servicios sin uso;
- repos públicos;
- shares Drive;
- DNS;
- backups;
- restore tests.

## INCIDENT RESPONSE
Si hay sospecha:
1. aislar servicio;
2. revocar sesión/token;
3. rotar secreto;
4. revisar logs;
5. verificar cambios;
6. restaurar desde fuente confiable;
7. documentar FALLO → PATRÓN → REGLA → GUARD;
8. actualizar protocolos.

## PRIMARY GUARD
La seguridad protege el proyecto; no se convierte en otro producto.
Velaria P0 sigue PRIMARY.
