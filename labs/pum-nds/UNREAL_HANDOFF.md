# ISL PUM · Unreal Handoff Contract

Status: LAB ONLY · CANDIDATE DATA ONLY

## Purpose
Use the NDS experiment as a low-cost behavioral/system prototype for later ISL Unreal production.

## Three representations of every approved mechanic
Every mechanic/seed that survives Human Gate should be exportable as:

1. DESIGN RECORD
   human-readable Markdown/JSON:
   intent, function, provenance, dependencies, risks, observed play evidence.

2. RUNTIME DATA RECORD
   neutral JSON/CSV/binary schema:
   ids, tags, parameters, relations, state machine inputs/outputs.

3. UNREAL RECORD
   candidate mapping for:
   UPrimaryDataAsset / UDataAsset,
   Gameplay Tags,
   Data Tables where appropriate,
   SaveGame-compatible state,
   Functional/Automation tests.

Epic's Primary Data Assets provide stable IDs and Asset Manager integration; use these for approved ISL gameplay entities/systems.

## Example neutral schema
{
  "seed_id": "REL_0001",
  "origin": "PUM_NDS_RUN",
  "function": "RELATIONAL_MECHANIC",
  "inputs": [],
  "outputs": [],
  "state": {},
  "provenance": {},
  "quality_signals": {},
  "human_status": "CANDIDATE"
}

## Unreal prototype lane
Build a tiny separate Unreal prototype only AFTER the NDS technical vertical proves:
- mechanic is understandable;
- mechanic is fun;
- state can be saved/replayed;
- input mapping has fallback;
- cause/effect is traceable.

Prototype only the top 1-3 approved mechanics at a time.

## Testing
For each promoted mechanic prepare:
- unit/low-level checks where practical;
- feature/functional test;
- smoke test if cheap;
- screenshot comparison if visual behavior matters;
- content-stress test only where relevant.

Never import NDS code directly.
Import FUNCTION + DATA + OBSERVED EVIDENCE.

## Goal
NDS is cheap systemic proving ground.
Unreal is production-scale embodiment.
