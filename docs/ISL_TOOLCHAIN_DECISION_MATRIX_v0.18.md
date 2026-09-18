# ISL — TOOLCHAIN DECISION MATRIX v0.18
Fecha: 2026-09-18
Estado: ACTIVO / INTEGRAR BAJO DEMANDA

## Regla maestra
Una herramienta entra al núcleo sólo si:
1. reduce trabajo repetitivo;
2. detecta errores caros antes;
3. aporta evidencia que no tenemos;
4. simplifica producción/handoff/distribución;
5. o resuelve una necesidad demostrada por una build real.

## NÚCLEO TÉCNICO FUTURO
### Unreal GAS + patrones de Lyra — ADOPTAR AL ENTRAR EN UNREAL
Razón:
- GAS modela abilities, effects, attributes, costs, cooldowns, tags e interacción;
- soporta replicación/predicción;
- Lyra demuestra Ability Sets, Gameplay Tags, Game Feature plugins y modularidad.
Uso ISL:
- viento;
- ANCLAJE;
- técnicas/magias;
- mutaciones temporales/persistentes;
- sinergias de tripulación;
- costes/estados;
- interacciones contextuales.
Regla:
- copiar patrones, no convertir ISL en un fork de Lyra.

Fuentes:
- Epic Gameplay Ability System
- Epic Abilities in Lyra
- Epic Game Features and Modular Gameplay
- Epic Action RPG sample

## ONLINE
### Epic Online Services — PREPARADO / NO IMPLEMENTAR
Activar sólo si una build real necesita identidad, amigos, invites, crossplay o presencia.

### Nakama — BACKEND OPCIONAL PREFERENTE
Evaluar si aparecen necesidades reales de:
- cuentas/saves remotos;
- social/chat/parties;
- matchmaking;
- estado persistente servidor.
Existe cliente Unreal oficial.

### Open Match — COLD STORAGE
Sólo si matchmaking propio a escala se convierte en problema real.

### Agones — COLD STORAGE
Sólo si ISL necesita dedicated servers y operación de fleets Kubernetes.
No introducir antes.

## PLAYTEST / ANALYTICS
### Jotform — ACTIVO
Playtest Dialéctico Continuo; feedback estructurado.

### PlaytestCloud — ACTIVAR EN PRIMER PLAYTEST EXTERNO SERIO
Uso:
- vídeo;
- voz/think-aloud;
- comportamiento no guiado;
- percepción de causa/coste/consecuencia.

### PostHog — CONECTADO / ESPERAR BUILD JUGABLE
Instrumentar después del primer greybox que funcione.
Eventos iniciales candidatos:
- enter_region;
- detect_wind_lie;
- friend_encounter;
- mill_solution;
- consequence_seen;
- ship_echo_seen;
- session_complete.
No inferir personalidad con una métrica aislada.

### Steam Playtest — ESCALÓN POSTERIOR
Usar cuando exista una build suficientemente estable para cohortes mayores.

## MARKETING
### Metricool — CONECTADO / ON-DEMAND
Activar cuando haya campaña real y contenido aprobado.

### Windsor.ai — CONECTADO / ON-DEMAND
Unificar GA4, YouTube y futuros canales cuando exista suficiente volumen para justificarlo.

## NARRATIVA / AUTORÍA
### Ink — REFERENCIA / NO ADOPTAR TODAVÍA
Útil como referencia de narrativa ramificada y autoría reproducible.
No introducir runtime adicional mientras Decision Studio + datos propios cubran el problema.

### Runtime LLM narrative — EXPERIMENTO FUTURO, NO NÚCLEO
Literatura reciente muestra potencial de emergencia narrativa, pero también problemas de coherencia/control.
ISL debe priorizar consecuencias authored + sistémicas; LLM runtime sólo si aporta algo imposible de lograr de forma más controlable.

## CONSEJO DIALÉCTICO DE IA
No usar "5 IAs votan y gana mayoría".
Usar roles distintos:
1. AUTOR/ARQUITECTO — preserva intención.
2. ANTÍTESIS — intenta romper la propuesta.
3. DISEÑADOR SISTÉMICO — loops, exploits, combinatoria.
4. JUGADOR/UX — qué entiende sin contexto.
5. TÉCNICO UNREAL — coste, GAS, save, rendimiento.
6. INVESTIGADOR — papers + documentación + precedentes.
7. SÍNTESIS — desacuerdos + experimento mínimo para resolverlos.

Reglas:
- cada rol argumenta de forma independiente antes de leer al resto cuando sea posible;
- registrar desacuerdos, no sólo consenso;
- ninguna IA fija CANON;
- evidencia externa > seguridad verbal del modelo;
- si el desacuerdo puede resolverse con un prototipo barato, prototipo > debate adicional.

## PAPERS QUE CAMBIAN NUESTRA FORMA DE TRABAJAR
- Liang et al. (2023): multi-agent debate puede fomentar pensamiento divergente, pero el juez puede sesgar.
- Hegazy (2024): diversidad de modelos/razonamientos puede aportar más que clones homogéneos.
- Choi et al. (2025): parte importante de las mejoras atribuidas al debate puede venir de ensembling/votación; debatir por debatir no garantiza corrección.
- Hertzum (2024): think-aloud concurrente y retrospectivo tienen trade-offs distintos.
- Pellicone et al. (2022): Play Aloud adapta el think-aloud a cultura real de juego.
- Paraschos & Koulouriotis (2022): revisión de 109 trabajos sobre adaptación/personalización; player modeling puede mejorar experiencia, pero requiere diseño cuidadoso.
- Hooshyar et al. (2018): player modeling data-driven aporta valor, pero tiene retos de interpretación/generalización.
- Peng et al. (2024): LLMs pueden producir emergencia narrativa interesante, especialmente para jugadores exploradores, pero esto no implica sustituir autoría sistémica.

## DECISIÓN OPERATIVA
AHORA:
- construir Velaria greybox;
- diseñar contratos pensando en GAS/Data Assets/Gameplay Tags;
- Jotform manual;
- Consensus/documentación para decisiones complejas.

DESPUÉS DEL PRIMER GREYBOX:
- PostHog mínimo;
- PlaytestCloud si merece tester externo;
- Consejo Dialéctico para las decisiones que bloqueen producción.

NO AHORA:
- EOS;
- Nakama;
- Open Match;
- Agones;
- narrativa LLM runtime;
- infra multiagente propia.
