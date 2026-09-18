# ISL — CROSSPLAY / DEVICE SCALABILITY / CAPABILITY CEILING METHOD v0.45
Fecha: 2026-09-18
Estado: ACTIVO — ARQUITECTURA OBJETIVO / CONSOLAS AÚN NO IMPLEMENTADAS

## OBJETIVO
Un solo ISL jugable y coherente entre PC, PS5/PS5 Pro, Xbox Series X|S y dispositivos móviles compatibles, sin degradar el diseño base ni crear ventajas de jugabilidad por hardware.

PRINCIPIO: SAME WORLD / SAME RULES / DIFFERENT CEILINGS.
- misma lógica, progreso, economía, consecuencias y contenido jugable;
- capacidad visual/sensorial se adapta al hardware;
- ninguna plataforma obtiene reglas, loot, daño, IA o ventanas de input ventajosas por potencia;
- extras de hardware son ENHANCEMENTS, no nuevas reglas.

## ESTADO REAL
- PC/web/Android: ruta activa.
- PS5/PS5 Pro: TARGET / BLOCKED hasta PlayStation Partner + SDK + documentación privada/certificación.
- Xbox Series X|S: TARGET / BLOCKED para build final hasta acceso GDK/ID@Xbox/partner, aunque Microsoft publica parte de requisitos.
- Crossplay real: NOT IMPLEMENTED. Arquitectura y gates se preparan ahora; no se declarará disponible hasta pruebas hardware/servicio.

## ARQUITECTURA DE CAPAS
1. GAMEPLAY CORE — determinista/autoritativo donde aplique; nunca depende del preset gráfico.
2. SAVE/PROGRESSION CORE — esquema único versionado; migraciones y rollback.
3. ONLINE ABSTRACTION — interfaz propia ISL sobre EOS / platform services para identidad, sesiones, invites, presence y social.
4. PLATFORM ADAPTERS — PSN/Xbox/PC/mobile, privilegios, overlay, friends, compliance.
5. CAPABILITY PROFILE — presupuesto CPU/GPU/memoria/IO/pantalla/input/audio/haptics/red.
6. PRESENTATION LAYERS — resolución, RT, LOD, sombras, VFX, densidad, audio, haptics, crowd complexity.
7. ACCESSIBILITY LAYER — UI/input/motion/subtitles configurables de forma consistente.

## CROSSPLAY
Arquitectura candidata: EOS como capa transversal + servicios nativos por plataforma cuando corresponda.
- Xbox: comprobar CrossPlay privilege, safety settings, comunicaciones, bloqueo/mute/reporting y disclosure de cross-network.
- PlayStation: implementación final sólo con documentación/SDK de Partner.
- Identidad: separar ISL Account/Profile ID de IDs de plataforma; linking reversible y auditable.
- Matchmaking: nunca emparejar ignorando latencia/ubicación/capacidad de red.
- Cross-progression: save schema central versionado; conflicto resuelto explícitamente; nunca last-write-wins ciego.
- Social: mostrar plataforma cuando sea requerido; respetar privacidad/bloqueos nativos.
- Comunicaciones: voz/texto opcionales, moderables y sujetos a privilegios parentales/plataforma.

## ECUACIÓN DE CALIDAD
Objetivo: maximizar Q = I * L * R * A bajo presupuesto B(device).

I = identidad artística preservada.
L = legibilidad/claridad.
R = responsiveness / frame-pacing / input.
A = accesibilidad y control del jugador.
B = presupuesto CPU + GPU + RAM + IO + red + térmico.

REGLA: sacrificar primero coste invisible/redundante, no identidad.
Orden de reducción recomendado:
1. resolución interna / reconstruction;
2. distancia/LOD secundaria;
3. densidad de partículas/decal/foliage no jugable;
4. calidad de sombras/reflejos secundarios;
5. crowd cosmetic simulation;
6. RT avanzado;
NUNCA reducir primero: silueta, navegación, señales jugables, animación crítica, audio-cues críticos, readability de UI, lógica/IA relevante.

## PERFILES INICIALES
MOBILE LOW/MID:
- 30/60 dinámico según dispositivo; resolución dinámica; RT off; VFX/crowd reducidos; texturas/streaming conservadores.
MOBILE HIGH:
- 60 objetivo cuando sostenible; upscale; VFX medio; haptics si disponibles.
PC SCALABLE:
- presets + auto-detect + benchmark; unlocked/30/60/120; DLSS/FSR/XeSS/PSSR-like reconstruction where available; RT opcional.
XBOX SERIES S:
- baseline de consola para presupuesto visual más estricto; proteger frame pacing y memoria; menor resolución/RT/densidad antes que recortar gameplay.
XBOX SERIES X:
- mayor resolución, sombras/reflejos/VFX/crowd; 60 como modo principal cuando viable; modos alternativos si CQC los justifica.
PS5:
- equivalente de alta calidad de consola; DualSense/haptics como enhancement opcional; no dependencia jugable.
PS5 PRO:
- enhancement profile: mayor claridad/upscaling PSSR, RT y/o estabilidad de fps donde el SDK permita; nunca exclusiva de contenido.

## INPUT / FAIRNESS
- Input abstraction común: keyboard/mouse, gamepad, touch.
- Remapping completo cuando plataforma lo permita.
- Aim assist / lock / timing sólo por tipo de input y diseño, no por marca de consola.
- Crossplay competitivo futuro: estudiar pools por input si la evidencia muestra asimetrías.
- Gameplay PvE/co-op puede priorizar inclusión; PvP exigiría fairness CQC independiente.

## LATENCIA / NETCODE
- authoritative state para sistemas que requieran integridad;
- client prediction/interpolation/reconciliation según mecánica;
- budgets por género/mecánica, no un único ping mágico;
- medir p50/p95/p99 RTT, jitter, loss, server frame, correction magnitude;
- adaptar características no esenciales antes que romper responsiveness;
- telemetría por plataforma sin usar hardware como proxy de habilidad.

## ACCESSIBILITY / DISPLAY
Adoptar Xbox Accessibility Guidelines como baseline público multiplataforma, no sólo Xbox:
- UI consistente y navegable;
- text scaling;
- motion/reduced motion;
- input flexible;
- subtitles/captions;
- dificultad y asistencia configurables;
- documentación pública de features.

## AUTOMATIZACIÓN / CI
Cada commit que toque gameplay/online/rendering debe:
- validar capability matrix JSON;
- impedir declarar PS5/Xbox IMPLEMENTED sin evidence fields;
- exigir fallback para feature no universal;
- comprobar que gameplay_core_invariant=true;
- exigir perf budget y measurement plan para nuevos VFX/render features;
- exigir networking_privacy_review cuando online=true;
- ejecutar Web/Android existentes;
- generar reporte platform-readiness.

Cuando haya SDKs:
- jobs privados separados por plataforma;
- package/cert smoke tests;
- TRC/XR checks donde estén disponibles;
- hardware perf captures;
- save migration/crossplay matrix tests;
- no subir logs con secretos/identificadores sensibles.

## CQC PLATFORM P-00..P-100
P-00 intención/plataformas.
P-10 capability matrix.
P-20 gameplay invariants.
P-30 render/perf budget.
P-40 prototype adapters.
P-50 hardware/network playtest.
P-60 telemetry/QoE.
P-70 accessibility/fairness.
P-80 security/privacy/cert.
P-90 backup/rollback/save migration.
P-100 confirmación humana + platform approval.

## REAUDITORÍA DE LO YA HECHO
A/B shell: NO reset. Sólo comprobar UI scaling, input/focus y assets.
Música: misma composición/mix master; calidad de stream/voice count/ambience puede escalar.
Brújula: lógica/huellas idénticas; partículas/reflejos/animación pueden escalar.
Reliquias: stats/lore idénticos; shaders/materiales/physics cosmetics escalan.
Escenas: blocking/narrativa idénticos; crowd/VFX/RT/audio density escalan.
Islas: geometría navegable y secretos idénticos; LOD/foliage/weather density escalan.
Criaturas: AI/telegraphs/hitboxes idénticos; fur/cloth/secondary animation escalan.
Dialéctica: consecuencias y decisiones idénticas en todos los dispositivos.
Cabaret/entropía: la sensualidad/ritmo/lectura se conserva incluso en low; reducir partículas/reflejos antes que eliminar señal escénica.

## REFERENCIAS PÚBLICAS DE PLATAFORMA
- Xbox CrossPlay privilege: https://learn.microsoft.com/en-us/xbox/gdk/docs/services/fundamentals/identity/privileges/concepts/live-user-privileges-client
- Xbox XR-007 cross-network: https://learn.microsoft.com/en-us/xbox/gdk/docs/store/policies/xr/xr007
- Xbox Accessibility Guidelines: https://learn.microsoft.com/en-us/xbox/accessibility/guidelines
- Xbox Series S specs: https://www.xbox.com/en-US/consoles/xbox-series-s
- Xbox Series X specs: https://www.xbox.com/en-US/consoles/xbox-series-x
- PlayStation Partner route: https://sonyinteractive.com/en/news/blog/showing-your-game-to-playstation/
- PS5 Pro capabilities: https://www.playstation.com/ps5/ps5-pro/
- Epic OSS EOS: https://dev.epicgames.com/documentation/unreal-engine/online-subsystem-eos-plugin-in-unreal-engine

## PAPERS / EVIDENCIA TÉCNICA
- Jindal et al. 2021, ACM TOG, adaptive local shading/refresh rate: https://consensus.app/papers/perceptual-model-for-adaptive-local-shading-and-refresh-jindal-mantiuk/c8b799053a2a5ac3b57962eae3117d26/
- Denes et al. 2020, ACM TOG, adaptive refresh/resolution motion quality: https://consensus.app/papers/a-perceptual-model-of-motion-quality-for-rendering-with-denes-jindal/e8414c2c73945ad3ae9130134d801bdf/
- Liu, Xu, Claypool 2022, ACM Computing Surveys, latency compensation taxonomy: https://consensus.app/papers/a-survey-and-taxonomy-of-latency-compensation-techniques-liu-xu/a6e08d6e3cee523ebbfc8a048452748d/
- Sabet et al. 2020, ACM MMSys, latency compensation/game adaptation: https://consensus.app/papers/a-latency-compensation-technique-based-on-game-sabet-schmidt/37b230718d3a5b66b7a299014d06554f/
- Tan & Moretti 2026, adaptive per-frame rendering optimization on heterogeneous hardware: https://consensus.app/papers/lightweight-realtime-rendering-parameter-optimization-tan-moretti/c617c01141205229a6e5e9a91a3d81dd/

## BLOQUEO
No declarar crossplay PS5/Xbox ni builds consola como disponibles hasta:
1. cuentas/partnership aprobadas;
2. SDKs/config reales;
3. hardware tests;
4. certification/platform review;
5. PC-100 humano y plataforma.
