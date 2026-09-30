# ISL · Software Assurance / NASA-Inspired Method v0.1

Status: METHODOLOGY · ADAPTED FROM PUBLIC NASA SOFTWARE ENGINEERING / ASSURANCE GUIDANCE
Not a claim of NASA certification or affiliation.

## Source principles
NASA distinguishes:
- Verification: are we building the product right?
- Validation: are we building the right product?

NASA software assurance and IV&V guidance emphasizes:
- objective evidence;
- independence where risk justifies it;
- lifecycle assurance;
- nominal and off-nominal behavior;
- progression from unit -> integration -> system testing;
- boundary, stress and robustness testing;
- explicit limits of simulation.

## ISL translation

### VERIFY
Does the artifact meet its stated contract?
Examples:
- build
- schema
- save
- checksum
- deterministic replay
- input mapping
- no forbidden leakage

### VALIDATE
Does it work for the human purpose?
Examples:
- fun
- readability
- intuitive controls
- emotional effect
- device ergonomics
- surprise preserved

### INDEPENDENT CHECK
Where practical:
- separate verifier/agent;
- requirement-based checks;
- no reliance on implementation assumptions;
- evidence attached to conclusion.

### OFF-NOMINAL TESTING
Simulate:
- corrupted state
- disconnect
- stale sync
- duplicate event
- reordered event
- missing optional subsystem
- slow/fast input
- power-loss equivalents
- storage pressure
- incompatible version

### SIMULATION LIMIT
A simulated pass must never be promoted to physical-device validation.

Labels:
STATIC_GREEN
LOGIC_GREEN
FAULT_GREEN
EMULATOR_GREEN
DEVICE_GREEN
HUMAN_GREEN

## Evidence packet
Each important gate should retain:
- requirement/version
- build hash
- test version
- environment
- result
- failure log
- recovery behavior
- unresolved risk
- human decision when applicable

## Risk-based rigor
Not every subsystem needs the same assurance burden.

HIGH:
save integrity
sync/handoff
data provenance
automatic transformations
Unreal migration

MEDIUM:
input adapters
UI transitions
creative panel

LOW:
cosmetic experiments
reversible local visual variants

## Relation to ISL methodology
RECOVER
-> PREFLIGHT
-> RESEARCH
-> SYNTHESIS
-> PROTOTYPE
-> VERIFY
-> VALIDATE
-> HUMAN GATE
-> KEEP / MUTATE / PARK / KILL

## Rule
DO NOT ADD ORGANS. IMPROVE CIRCULATION.

Assurance should reduce uncertainty, not create bureaucracy.
