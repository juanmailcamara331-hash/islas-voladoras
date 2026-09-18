# ISL — ENGINEERING RESEARCH LEDGER v0.61
Fecha de revisión: 2026-09-18
Objetivo: cruzar metodología ISL con testing de videojuegos, Unreal, eval-driven development y práctica de ingeniería.

## Epic / Unreal Engine 5.8
1. Automation Test Framework
https://dev.epicgames.com/documentation/unreal-engine/automation-test-framework-in-unreal-engine
Aporta:
- unit;
- feature;
- smoke;
- content stress;
- screenshot comparison.

2. Gauntlet Automation Framework
https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine
Aporta:
- sesiones multi-proceso/plataforma;
- device/build/app abstractions;
- logs, crashes y saved data;
- smoke/end-to-end.

3. Horde Automation Hub
https://dev.epicgames.com/documentation/unreal-engine/horde-automation-hub-for-unreal-engine
Aporta:
- historial de tests;
- metadata por plataforma, configuración, target, rendering API;
- screenshots, logs y callstacks.

## OpenAI
4. Evals drive the next chapter
https://openai.com/es-ES/index/evals-drive-next-chapter-of-ai/
Aporta:
- especificar → medir → mejorar;
- análisis de errores;
- taxonomía y frecuencia;
- medición en condiciones reales.

5. Trustworthy third-party evaluations
https://openai.com/es-ES/index/trustworthy-third-party-evaluations-foundations/
Aporta:
- el harness/entorno modifica el resultado;
- evaluar sistema completo, no componente aislado.

## Anthropic
6. Demystifying evals for AI agents
https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
Aporta:
- eval-driven development;
- capability suite separada de regression suite;
- mantenimiento rutinario de evals;
- tests end-to-end multi-step.

7. Property-based testing with Claude
https://www.anthropic.com/research/property-based-testing
Aporta:
- propiedades generales;
- fuzz/property testing;
- buscar invariantes en lugar de enumerar sólo casos.

8. Claude prompting / long-running engineering guidance
https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables
Aporta:
- escribir tests antes;
- mantener tests estructurados;
- no editar/borrar pruebas para hacer pasar;
- ejecutar integración fundamental al retomar contexto.

## Papers / literatura
9. Deriving and Evaluating a Detailed Taxonomy of Game Bugs (2023)
https://arxiv.org/abs/2311.16645
Aporta 63 categorías; primer nivel:
- Gaming Balance
- Implementation Response
- Network
- Sound
- Temporal
- Unexpected Crash
- Navigational
- Non-Temporal

10. A Survey of Video Game Testing (2021)
https://arxiv.org/abs/2103.06431
Aporta:
- fuerte dependencia histórica del playtest manual;
- necesidad de automatización específica para juegos;
- dificultad de generalizar técnicas.

11. Video Game Automated Testing Approaches: An Assessment Framework
https://ieeexplore.ieee.org/document/9234724/
Aporta:
- selección de técnica según atributos y contexto;
- no existe una única estrategia universal.

12. Metamorphic Testing: A Simple Method for Alleviating the Test Oracle Problem
https://ieeexplore.ieee.org/document/7166267/
Aporta:
- relaciones invariantes para sistemas donde no hay un único output correcto.

13. A Taxonomy of Failures in Tool-Augmented LLMs (AST 2025)
https://ieeexplore.ieee.org/document/11081716/
Aporta:
- clasificar fallos de herramientas/agentes por tipo y causa raíz;
- relevante para pipelines con ChatGPT/agentes/conectores.

## Práctica / comunidad
14. Reddit r/gamedev — automated testing / regressions
https://www.reddit.com/r/gamedev/comments/1ts07jj/automated_testing_in_game_dev/
https://www.reddit.com/r/gamedev/comments/1rpxq31/how_common_are_automated_tests_in_the_gaming/
https://www.reddit.com/r/gamedev/comments/1sd8wan/whats_your_process_for_testing_before_a_release/
Patrones útiles:
- packaged build != editor;
- fresh-eye playtests encuentran fallos emergentes;
- suites automatizadas existen, pero se degradan si nadie las mantiene;
- screenshots/inputs grabados se usan en práctica.

## Síntesis ISL
No copiar una metodología externa entera.
ISL adopta:
- taxonomía específica de juego;
- selección de tests por impacto;
- capability + regression suites;
- property/metamorphic checks;
- packaged/device testing;
- error registry recurrente;
- human/CQC para experiencia;
- metadata de entidad/plataforma/configuración;
- blast radius y rollback.
