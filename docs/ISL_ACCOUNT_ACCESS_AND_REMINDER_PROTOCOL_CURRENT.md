# ISL_ACCOUNT_ACCESS_AND_REMINDER_PROTOCOL_CURRENT

Estado: ACTIVO · ISL ONLY
Fecha: 2026-09-21

## PRINCIPIO
El autor no debe depender de memoria humana para saber qué cuenta existe, para qué sirve, dónde está conectada o qué revisar.
Pero los secretos nunca se guardan en documentación del proyecto.

## CAPAS

### 1. PASSWORD MANAGER / VAULT EXTERNO
Único lugar autorizado para:
- contraseñas;
- passkeys;
- recovery codes;
- TOTP/2FA cuando proceda;
- notas de recuperación sensibles.

Nunca copiar secretos a:
- ChatGPT;
- Google Drive;
- GitHub;
- issues;
- commits;
- PDFs;
- capturas;
- Centro de Mandos.

### 2. ISL ACCOUNT INDEX · SIN SECRETOS
Drive puede registrar por servicio:
- nombre del servicio;
- función dentro de ISL;
- URL/login page;
- email/identidad de acceso sólo si no es sensible;
- propietario/rol;
- tipo de autenticación;
- si 2FA está activado: sí/no;
- método de recuperación existente: sí/no;
- ubicación del secreto: “vault externo”, nunca el secreto;
- coste/plan;
- fecha de revisión;
- dependencia que rompería si falla;
- estado ACTIVE / WATCH / DEPRECATED.

### 3. GITHUB
Sólo:
- nombres de variables de entorno;
- adapters;
- docs de integración;
- CI;
- guards;
- instrucciones de rotación sin valores secretos.

Nunca tokens, claves, passwords ni recovery codes.

### 4. RECORDATORIOS
Automatizar:
- revisión mensual de cuentas activas;
- recuperación/2FA;
- servicios sin uso;
- caducidad/rotación cuando aplique;
- coste;
- accesos de terceros;
- backups y restore test.

## ZERO-MEMORY LOGIN RULE
Para cada servicio crítico:
1. existe entrada en Account Index;
2. secreto está en vault;
3. recuperación está configurada;
4. 2FA/passkey cuando sea compatible;
5. no depende de una única sesión de navegador;
6. sabemos qué se rompe si desaparece;
7. existe plan de salida/export cuando el proveedor lo permite.

## CONNECT EVERYTHING, NOT EVERYTHING TO EVERYTHING
Integrar por interfaces explícitas:
SERVICIO → ADAPTER/CONNECTOR → ISL ENTITY → LOG/PROVENANCE → GUARD.
No crear acoplamiento circular entre servicios.

## BUS DE ENTIDADES
Toda integración debe declarar:
- qué entidad ISL produce/consume;
- autoridad de la fuente;
- formato;
- permisos;
- frecuencia;
- fallo esperado;
- fallback;
- rollback;
- privacidad.

## BOT DE GUARDIA
En cada cambio de cuentas/integraciones:
- ¿se creó una cuenta nueva?
- ¿está en Account Index?
- ¿el secreto quedó sólo en vault?
- ¿2FA/recovery están definidos?
- ¿qué sistema depende de ella?
- ¿hay alternativa/export?
- ¿hay coste recurrente?
- ¿requiere recordatorio?
- ¿hay acceso innecesario que revocar?
- ¿hay que actualizar Drive/GitHub?

## REGLA DE VAGANCIA MAGISTRAL
Si una tarea repetitiva puede resolverse de forma segura con:
- connector;
- automation;
- CI;
- checklist;
- reminder;
- export/backup;
se automatiza.
La intervención humana se reserva para:
- decisiones creativas;
- permisos sensibles;
- pagos;
- recuperación;
- CANON;
- acciones irreversibles.

## PRIMARY GUARD
Esta infraestructura no desplaza Velaria P0.
