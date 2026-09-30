# ISL PUM · Failure Simulation v3

This is a prospective pre-mortem. No claim that the game is already bug-free.

## Pass 1 — Assume first implementation failed

Likely failures:
- too many controls;
- DS UI too small on square R36;
- gesture mechanic feels gimmicky;
- mic requirement breaks portability;
- save sync conflict between R36 and tablet;
- random weirdness lacks causal memory;
- player cannot tell what is interactive;
- combat becomes slow;
- creative panel steals attention from game;
- too much instrumentation damages surprise.

Corrections:
- reduce permanent controls;
- move functions behind context modifiers;
- zoom combat framing;
- larger typography / fewer simultaneous choices;
- gesture only where it replaces/enriches existing action;
- mic strictly optional;
- single-writer save lease;
- every mutation stores cause;
- implicit affordance grammar;
- turn-speed budget;
- panel mostly hidden during play;
- trace silently.

## Pass 2 — Assume corrected version failed again

Likely second-order failures:
- contextual controls become inconsistent;
- branch system produces clever but unfun content;
- save lease feels cumbersome;
- touch/tablet handoff interrupts flow;
- data schema becomes too rich to migrate;
- Unreal handoff becomes bespoke/manual;
- player behavior gets over-interpreted;
- visual mutation damages identity.

Corrections:
- semantic action map shared across devices;
- FUN gate before SERENDIPITY gate;
- handoff only at natural pauses / optional opportunities;
- schema core + extensible event payloads;
- neutral runtime records independent of engine;
- observation != interpretation;
- MANERA invariant + bounded local mutation;
- migration tests for every schema bump.

## Pass 3 — definitive target architecture

Invariant core:
FUN
READABILITY
SAVE INTEGRITY
REVERSIBILITY
PROVENANCE
HUMAN AUTHORITY

Input layer:
semantic actions
-> device adapters
-> gameplay

Runtime layer:
turn RPG + exploration + contextual expressive mechanics

Memory layer:
versioned save + compact event ledger + remanence

Creative layer:
Portal Gun + Manera + Serendipinator + Orchestrator

Simulation layer:
branch previews only, never silent canon writes

Sync layer:
single-writer local Wi-Fi save handoff with conflict preservation

Research layer:
raw data immutable; derived analysis versioned

Unreal layer:
neutral design/runtime records -> Data Assets / SaveGame / Enhanced Input / tests

Player surface:
minimal HUD
large readable composition
close framing
few controls
surprise preserved

Exit criterion:
A player can understand the core loop quickly, play for long sessions without technical intervention, encounter meaningful surprise, suspend/resume safely, and export one run package that reconstructs the important design history.
