# ISL PUM · Generation Router v0.1
Status: LAB ONLY · MOBILE-FIRST · SPOILER-SAFE

## One-button goal
From tablet/mobile, user can press a small set of actions:
GENERATE IMAGE
GENERATE VIDEO
GENERATE 3D
GENERATE MUSIC BRIEF
GENERATE PROMPT PACK

The router decides whether the target supports:
A) DIRECT API/MCP execution
B) CONNECTED CHAT TOOL
C) PREPARE + OPEN/COPY workflow only

## Current target policy

### Gemini / Google generative media
Mode: DIRECT API candidate
Use official Gemini/Google APIs where available.
Keep secrets server-side.
Queue expensive generations.
Store prompt/spec + model + settings + result IDs + human status.

### Meshy
Mode: DIRECT API / MCP candidate
Official REST API + MCP available.
Target outputs:
GLB / FBX for Unreal
preview first -> refine only after gate
Store task ID, credits, source image/prompt, output hash.

### ChatGPT
Mode: CONNECTED TOOL
Use project prompts, image/video capable connected tools, and GitHub/Drive provenance.
Human-triggered generation remains preferred.

### Midjourney
Mode: PREPARE + OPEN/COPY
No unauthorized automation.
Generate a ready-to-paste prompt pack and open the official surface manually.

### Suno
Mode: PREPARE + OPEN/COPY until an official supported automation/API is verified.
Generate:
music brief
structure
negative constraints
reference/function notes
versioned prompt packet

## Secret handling
API keys never live in:
- ROM
- GitHub source
- prompt packs
- screenshots

Use hosted secrets only.

## Result return
Every generation result returns through:
RESULT
-> provenance
-> cheap QA
-> HUMAN KEEP/MUTATE/PARK/KILL
-> pillar router
-> optional Unreal ingestion
