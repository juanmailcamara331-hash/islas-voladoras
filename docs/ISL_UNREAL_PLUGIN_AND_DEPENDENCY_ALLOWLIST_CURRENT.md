# ISL · UNREAL PLUGIN & DEPENDENCY ALLOWLIST CURRENT
Fecha: 2026-09-21
Estado: PRE-ADOPTION POLICY

## PRINCIPLE
No plugin or service enters production because it is fashionable, convenient in one demo, or recommended by an AI.

## STATES
CORE_CANDIDATE
PILOT
WATCH
REJECT
ADOPTED
DEPRECATED

## CORE CANDIDATES FROM EPIC / ENGINE
Evaluate when relevant:
- Enhanced Input
- Gameplay Tags
- Asset Manager / Primary Data Assets
- World Partition / Data Layers / HLOD
- Data Validation
- Automation Framework
- Functional Testing
- Gauntlet
- Unreal Insights
- PCG
- Gameplay Ability System
- CommonUI
- MetaSounds
- StateTree / Smart Objects
- EOS / online stack

Being listed does NOT mean enabled.

## ADMISSION CARD
dependency_id
problem_solved
source_authority
engine_version
maturity
license
platform_support
permissions/network_access
build_cook_impact
runtime_cost
maintenance_risk
data_access
security/privacy
offline_behavior
tests
rollback
owner
decision

## GATES
A dependency is ADOPTED only if:
1. solves demonstrated need;
2. compatible with frozen UE version;
3. rights/license acceptable;
4. platform targets supported;
5. no hidden secret requirement;
6. build/cook/package works;
7. packaged device test passes;
8. rollback exists;
9. human approval.

## EXTERNAL CONNECTORS
ChatGPT/GitHub/Drive/asset generators remain AUTHORING/OPERATIONS tools unless explicitly promoted.
They are not runtime dependencies by default.
Secrets never enter project content, manifests or source control.

## AI-GENERATED CONTENT
Tool output is CANDIDATE.
Required before production:
provenance → rights → human review → master preservation → runtime adaptation → validation.

## VERSION FREEZE
When Unreal migration opens, create exact matrix:
PLUGIN × VERSION × UE VERSION × PLATFORM × STATUS.
Until then, avoid premature lock-in.
