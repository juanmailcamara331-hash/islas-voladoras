# GARAGE RICK · N8N ORCHESTRATION PLAN V0.1

STATUS: PREPARED · NOT DEPLOYED · NO EXTERNAL SIDE EFFECTS

## Purpose
Move repetitive orchestration out of the human-chat loop.

## Architecture
INPUT EVENT
→ NORMALIZE
→ CLASSIFY SAFE / TASTE / HARD-GATE
→ FAN OUT SAFE WORKERS
→ COLLECT
→ DEDUPE / RANK
→ RETURN PACKET
→ HUMAN ONLY WHEN NEEDED
→ TRACE DELTA

## n8n flow

1. Trigger
- webhook / local file watcher / manual trigger / later chat bridge

2. Normalize
- create task_id
- provenance
- branch
- requested autonomy lane
- budget/spend cap
- project boundary

3. Router
SAFE:
  run immediately
TASTE:
  prepare candidates then wait
HARD-GATE:
  wait before side effect

4. Safe parallel workers
Examples:
- research
- local code/test
- campaign planning
- asset preparation
- metadata/provenance
- comparison/ranking

5. Aggregate
- merge results
- deduplicate
- keep provenance
- produce compact delta

6. Human-in-the-loop
Use n8n Send/Wait approval steps for actual gates.
Capture responder and response time when available.

7. Execute approved side effect
Only after gate.

8. RETURN
Write:
- result
- delta
- evidence
- next safe actions
- whether human is needed

## Queue/scaling
Start single-instance/local.
Use n8n queue mode only when concurrent workloads justify it.
If queue mode later handles binary assets, use supported external storage rather than filesystem-only binary persistence.

## Chat behavior target
The chat should become a steering surface, not a job queue.

Human:
"Sí."
Garage:
continues current safe batch automatically.

Human is interrupted only for:
- taste
- ambiguity with consequence
- spend/publish/send
- irreversible action
- real blocker

## First build target
LOCAL ONLY:
Chat/task packet
→ Garage runner
→ n8n webhook
→ 2 safe mock workers in parallel
→ aggregate
→ RETURN packet
→ no external publication/spend

## Definition of success
One human "sigue" should advance a meaningful batch, not one microscopic step.
