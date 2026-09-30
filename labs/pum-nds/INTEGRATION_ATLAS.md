# ISL PUM · Integration Atlas v0.1

Status: LAB ONLY · SPOILER SAFE · NO AUTO-CANON

Purpose:
Make the project easier to run by connecting existing services around one event/data spine.

## Core spine
PLAYER / FAMILY / CREATOR
-> R36 / TABLET / DESKTOP
-> SAVE + PLAYTRACE
-> LOCAL/WIFI HANDOFF
-> GITHUB / DRIVE
-> ORCHESTRATOR
-> HUMAN GATE
-> UNREAL / CREATIVE TOOLS / RESEARCH / COMMUNICATION

## Integration families

### SOURCE / MEMORY
- Google Drive: documents, source files, approvals, event subscriptions.
- GitHub: code, CI, artifacts, releases, version hashes.
- ChatGPT plugins/apps: connected tools and reusable workflows.

### AUTOMATION BUS
Preferred role:
- webhooks / event triggers;
- queues;
- retries;
- notifications;
- lightweight routing.

Candidate services:
- Make
- n8n
- Zapier
- Supabase Edge Functions / Realtime

Do not let the automation bus become authority.
It transports state; it does not decide canon.

### UNREAL
Use neutral records as the boundary.
Candidate transports:
- files / JSON
- editor automation
- Remote Control API for controlled live experiments
- later custom tooling only if justified

Never expose production editor endpoints publicly without authentication/network controls.

### MARKETING / DISCOVERY
SEO:
- Search Console
- analytics
- Semrush-class data

Social:
- Metricool
- scheduled publishing
- campaign analytics

Commerce:
- Shopify / Stripe class systems

Crowdfunding:
- Kickstarter campaign assets, rewards, updates, budget, delivery planning.
- Do not assume unofficial automation endpoints are stable.

### CREATIVE PRODUCTION
- ChatGPT
- Canva
- image/video/audio generation services
- Drive provenance
- GitHub versioning
- Unreal ingestion

Every generated asset should retain:
source -> tool -> prompt/spec version -> human decision -> downstream use.

### FAMILY MODE
Contributors should be able to participate through:
- play
- reaction
- drawing
- voice
- gifts
- simple approvals

No prompt-engineering knowledge required.

### RESEARCH
Every exported run can feed:
- reproducibility package
- design evidence
- paper figures
- anonymized/synthetic datasets
- controlled study protocols

No automatic medical inference.

## Event vocabulary
BUILD_GREEN
BUILD_RED
SAVE_EXPORTED
RUN_INGESTED
RELATION_CANDIDATE
HUMAN_KEEP
HUMAN_PARK
UNREAL_READY
RESEARCH_NOTE
CAMPAIGN_READY

These events can move between services without exposing sealed content.

## One-screen principle
Morning dashboard should receive summaries from integrations, not require opening each service.
