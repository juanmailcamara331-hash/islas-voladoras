# ISL CHECKPOINT v0.71.4 — PLAYTEST LAB CENTRAL EVIDENCE + VIRTUAL PREFLIGHT
Fecha: 2026-09-20
Proyecto: ISLAS VOLADORAS (ISL)

## CIERRE DE TANDA
Playtest Lab pasa de prototipo local a superficie pública-segura con transporte central de evidencia aislado.

## REPO / RELEASE
Production deploy commit:
59c9a5ffade3b232060cc221c67308013683d7ee

Netlify production deploy:
6aafabc3ca653b0008f0d9f9
Estado Netlify: READY
Commit_ref verificado: 59c9a5ffade3b232060cc221c67308013683d7ee

Netlify reporta:
- 2 páginas nuevas: playtest-lab.html y signal-telegraph-lab.html
- 5 redirects procesados
- 12 reglas de headers procesadas
- 3 functions desplegadas
- nueva function playtest-evidence disponible en /api/playtest-evidence
- secret scan sin matches

## PLAYTEST LAB
Superficies:
- portal/playtest-lab.html
- portal/signal-telegraph-lab.html

Rutas públicas cortas:
- /playtest
- /signal-lab

Principio:
PLAY FIRST → SHORT FEEDBACK → BUG/EVIDENCE CAPTURE → HUMAN REVIEW

Todo resultado:
LAB_ONLY
NOT_CANON
HUMAN_REVIEW_REQUIRED

## SIGNAL / TELEGRAPH LAB v0.1
Seis rondas:
- light
- motion
- sound
- direction
- danger/reward
- mixed

Evidencia:
- choice
- target
- correct
- reaction_ms
- viewport
- reduced_motion
- sound_enabled
- understood
- confused
- fun
- optional bug
- optional note
- completion marker

No recoge:
- nombre
- email
- cuenta
- marketing consent
- commercial preference
- fingerprint propio

## CENTRAL EVIDENCE TRANSPORT
Nueva function:
netlify/functions/playtest-evidence.mts

Store separado:
isl-playtest-evidence

Producción usa global store fuerte.
Non-production usa deploy store separado.

Hardening:
- same-origin POST
- JSON content type required
- payload limit
- input sanitization
- rate limit
- fixed experiment allowlist
- completion marker for playtest sessions
- aggregate GET returns counts/metrics, not free-text notes

Separation rule:
GAMEPLAY EVIDENCE != MARKETING DATA
GAMEPLAY EVIDENCE != COMMERCIAL PREFERENCE
GAMEPLAY EVIDENCE != CANON AUTHORITY

## BUG HUNT
?mode=bug

Centralización incluida:
- action
- result
- reproducibility
- severity

Aggregate GET only surfaces:
- bug count
- severity distribution
- reproducibility distribution

Free bug text is not returned in public aggregate.

Method:
symptom
→ reproducibility
→ version/commit
→ root cause
→ fix
→ regression test
→ generalized lesson

## PUBLIC / PRIVATE BOUNDARY
netlify-public-build.sh copies the same Playtest Lab source files, then strips:
- isl-global-shell.css
- isl-global-shell.js

Therefore:
- same HTML source is reused
- public testers do not receive Command Center navigation
- private Command Center remains outside public allowlist
- marginal maintenance remains low

Playtest pages:
- no-store
- noindex
- nofollow
- noarchive

## VIRTUAL DEVICE PREFLIGHT
New workflow:
.github/workflows/playtest-preflight.yml

Cost-aware trigger:
only relevant playtest/API/build/security paths.

Profiles currently simulated:
- WEB_LOW_END 360x640
- ANDROID_MID 393x873
- WEB_TABLET 768x1024
- WEB_DESKTOP 1366x768

Checks:
- public-safe build
- internal shell stripped
- required experiment contracts
- 404 behavior
- screenshots for comparison
- pinned Playwright 1.55.0 used only in CI
- Chromium not added to production dependencies

CI_EVIDENCE_PENDING:
Current connector cannot return push-triggered GitHub Actions runs.
Do not claim this workflow GREEN until run evidence is observed.

## SECURITY
scripts/security-gate.py now requires:
- playtest API rateLimit
- sameOrigin
- payload limit
- content-type check
- separate blob store
- automatic_canon_promotion=false
- public Playtest Lab allowlist
- public internal-shell stripping

## SPIELBERG BOUNDARY
UNCHANGED.
No assets, code, UI, branding, lore, world names, music, narrative decisions or project-specific visuals imported.

Only:
SPIELBERG_TO_ISL_CREATIVE_TRANSFER_PACKET
→ abstraction
→ ISL_TRANSLATION_CANDIDATE
→ LAB_ONLY
→ isolated experiment
→ playtest
→ human decision

## HUMAN GATES
R2 HUMAN remains OPEN.
Danzante-Aguja remains CANDIDATE / R1 / BLOCKED.
No Playtest Lab result changes this automatically.

## CREATION PROCESS LEDGER ENTRY
Question:
Can ISL gather real play evidence without adding a second manual workflow or mixing it with marketing?

Action:
Reused existing Netlify Blobs/function architecture, but created a separate store and endpoint for gameplay evidence.

Result:
One real development experiment now produces reusable structured evidence while preserving human creative authority and privacy boundaries.

Reversal avoided:
Did not expose the internal Command Center shell on the public Netlify surface.

Cost decision:
Playwright lives only in path-filtered CI rather than production dependencies.

## NEXT
1. Observe first real Signal Lab sessions.
2. Add compact Playtest Evidence view to Command Center.
3. Run 3–8 human testers.
4. Classify findings: KEEP / ADAPT / DISCARD / NEW EXPERIMENT.
5. Feed accepted lessons into Creation Process Ledger.
6. Generate safe devlog/course/supporter outputs from the same ledger entry.
7. Build next microexperiment only after first evidence: Ruta/Nav or Gamefeel Tuner.
