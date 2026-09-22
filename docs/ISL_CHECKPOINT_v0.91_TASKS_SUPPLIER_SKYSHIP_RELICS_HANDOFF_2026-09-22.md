# ISL_CHECKPOINT_v0.91_TASKS_SUPPLIER_SKYSHIP_RELICS_HANDOFF_2026-09-22

Fecha: 2026-09-22
Estado: HANDOFF OPERATIVO · SIN CAMBIO DE RUMBO · PRIMARY INTACTO

## ACTIVE BOOT
Este checkpoint sucede operacionalmente a v0.90 para continuidad, sin borrar ningún checkpoint anterior.

PRIMARY:
Velaria V2 P0 · HUMAN_DEVICE_GREEN=PENDING.

Regla global:
MENOS SISTEMAS NUEVOS · MÁS VIDA ENTRE LOS QUE YA EXISTEN.

## DE DÓNDE VENIMOS
1. Velaria V2 sigue siendo el frente principal. Falta la validación humana real en dispositivo.
2. Prism Worlds abrió una rama experimental fuerte:
   - PRISM_WORLD_001 · GRAVEDAD VIVA
   - PROTOTYPE SEED
   - MUNDOS PRISMA
   - pipeline recursivo ya creado
   - no disparar más recursión hasta nueva evidencia humana/ley/decisión.
3. Making-of / Human Trace con Irene:
   - criatura;
   - vídeo;
   - ojo;
   - isla-cocodrilo;
   - Prism Eye;
   - física imposible + consecuencia humana.
4. Reliquias cotidianas:
   - Mechero 001 · Farol de Regreso
   - visual CANDIDATE
   - guardar estética ISL no hiperreal, no fantasy premium genérico.
5. Skyship combat:
   - research seed creado
   - función tomada de Skies of Arcadia, no copia
   - referencias históricas: periplous, diekplous, raking, ventaja del viento, daño de maniobra
   - prototipo barato definido.
6. Command Center:
   - bug mobile horizontal overflow detectado por captura
   - containment fix en portal/index.html commit caf00a8b29f3effe516f80c9a4e8f0842bd88180
   - necesita comprobación real móvil después de propagación.
7. Private Netlify:
   - despliegue privado sigue BLOQUEADO por token/project visibility
   - GitHub Actions falla con “Project not found”
   - no declarar PRIVATE_DEPLOY_GREEN.
8. Ancla del Regreso:
   - replies completas leídas de CoinsForAnything y The Pins Store
   - gate correcto: MUESTRA → CQC → POSIBLE TIRADA
   - no compra directa.

## PROVEEDORES · COMPARATIVA ACTUAL

### CoinsForAnything
Encaje alto con gate de prototipo:
- propone custom struck brass;
- ~48 mm × 3 mm;
- doble cara;
- relieve + grabado;
- teal + blanco;
- loop integrado;
- antique brass;
- acepta 1–3 prototypes con tooling/setup;
- digital proof antes de producción;
- límites técnicos y precio exacto pendientes de revisar artwork;
- plazo estándar ~5 semanas desde aprobación;
- envío a España pendiente de dirección/cotización.

Siguiente acción:
enviar artwork autoritativo y pedir:
1. tooling exacto;
2. precio 1 / 2 / 3;
3. límites de línea / esmalte / relieve / grabado;
4. shipping;
5. recomendación final de proceso/material;
6. proof digital antes de autorizar físico.

### The Pins Store
- iron o zinc alloy;
- antique brass;
- relief / engraving / enamel;
- digital proof;
- no simplifican sin discutir;
- MOQ 25;
- 25 = USD 650 total;
- 50 ≈ USD 890;
- 100 ≈ USD 1,280;
- shipping Spain incluido;
- 3–4 semanas.
No cumple todavía el gate de 1–3 muestras.
Mantener como benchmark / backup.
Borrador existente: pedir excepción de first article / 1–3 muestras.
No enviar por inercia.

## SKYSHIP COMBAT · SEED ACTUAL
Objetivo:
combate donde POSICIÓN > daño bruto.

Cheap test:
1v1 · 4 beats · 3 maniobras · 2 armas · 1 recurso · viento visible · 1 elección de capitán · 1 sistema dañable no-HP.

PASS:
el tester entiende “estoy creando una posición buena, no sólo vaciando una barra”.

No hacer todavía:
flotas · economía naval · 20 armas · árbol tech · PvP · simulación física grande.

## RELIQUIAS COTIDIANAS · SEED ACTUAL
Mechero 001 · Farol de Regreso
Estado: CANDIDATE · NO CANON.
Regla visual:
stylized cinematic fantasy / ilustración-CG artesanal · no hiperrealismo · no steampunk genérico · no render catálogo.

## TAREAS IMPORTANTES

[ ] P0 · VELARIA
hacer HUMAN_DEVICE_GREEN real.
Salida: una persona entra, navega, llega a Velaria y el loop responde en dispositivo real.

[ ] P0 · ANCLA DEL REGRESO
preparar y enviar paquete autoritativo a CoinsForAnything.
Salida: quote exacto 1/2/3 + tooling + límites + shipping + proof.

[ ] P0 · PRIVATE DEPLOY
resolver credencial/enlace Netlify para que el build privado pueda desplegar.
Salida: URL privada real cargando y protegida.

[ ] P1 · MOBILE OVERFLOW
retest real de Command Center tras commit caf00a8b...
Salida: cero scroll horizontal del documento; docks internos pueden desplazarse.

[ ] P1 · GRAVEDAD VIVA
test humano sin explicar la ley.
Salida PASS: persona verbaliza que la gravedad tira hacia concentraciones de vida.

[ ] P1 · SKYSHIP COMBAT
hacer wireframe/prototipo barato de 4 beats.
Salida: posición, viento y maniobra se entienden antes que daño.

[ ] P2 · MECHERO 001
una iteración visual más con firma ISL correcta.
Salida: deja de leerse como hiperreal/product render y parece objeto del mundo.

[ ] P2 · MAKING-OF
mantener Timeline Humana y consentimiento antes de cualquier uso público.
Salida: origen preservado y privacidad clara.

## REGLAS DE NO-REGRESIÓN
- RECENCY IS NOT AUTHORITY.
- Human Trace no se sustituye por derivado IA.
- No CANON por entusiasmo.
- No comprar 25 unidades para “probar”.
- No abrir sistema naval grande antes del cheap test.
- No usar private deploy como green hasta comprobar URL real.
- No hacer del Command Center el objetivo.
- No desplazar Velaria por Color Lane.

## SIGUIENTE PASO REAL
1. draft CoinsForAnything con artwork/spec;
2. validar paquete;
3. enviar sólo con aprobación explícita del usuario;
4. en paralelo, retest móvil del overflow cuando la superficie esté accesible;
5. volver a Velaria HUMAN_DEVICE_GREEN.
