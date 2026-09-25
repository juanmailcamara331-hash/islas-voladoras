# ISL · UX HYGIENE & CONFUSION CULL CURRENT

**Status:** ACTIVE METHOD · UX/CIRCULATION · NO CANON  
**Scope:** app · web · Gallery · Velaria · Command Center · playable surfaces  
**Principle:** DO NOT ADD ORGANS. IMPROVE CIRCULATION.

## Mother rule
**ONE ACTION · ONE PLACE · CLEAR RETURN · NO FAKE INTERACTIVITY · NO DUPLICATE NOISE**

If a human has to stop and ask “what does this do?”, the surface is a candidate for curation.

## Trigger
Run this pass whenever a human device test reveals:
- duplicated buttons or menus;
- repeated information that competes for attention;
- ambiguous hierarchy;
- unclear back/home behavior;
- buttons that look active but do nothing;
- controls that lead somewhere unexpected;
- automatic escapes to external services;
- placeholders that look like bugs;
- navigation shells stacked on top of local navigation;
- multiple controls that perform nearly the same action;
- mechanics whose affordance is not legible without explanation.

## Classification
Use these labels:
1. VISUAL_DUPLICATION — same control/message appears more than once without purpose.
2. FUNCTIONAL_DUPLICATION — different controls perform the same action.
3. HIERARCHY_DUPLICATION — several elements claim to be the primary action.
4. ROUTE_AMBIGUITY — user cannot predict where a control goes.
5. RETURN_AMBIGUITY — back/home behavior is inconsistent.
6. DEAD_AFFORDANCE — looks interactive but is not.
7. EXTERNAL_LEAK — opens Drive/Google/another surface unexpectedly.
8. PLACEHOLDER_AMBIGUITY — pending state looks broken instead of intentional.
9. MECHANIC_OPACITY — mechanic needs explanation before first use.
10. INFORMATION_ECHO — repeated copy reduces clarity instead of reinforcing it.

## Decision flow
For each confusing element:

OBSERVE
→ NAME THE CONFUSION
→ IDENTIFY THE ONE USER INTENT
→ KEEP ONE PRIMARY PATH
→ REMOVE / DEMOTE / MERGE DUPLICATES
→ MAKE RETURN PATH EXPLICIT
→ MARK PENDING STATES HONESTLY
→ HUMAN DEVICE CHECK
→ KEEP / MUTATE LIGHTLY / ROLLBACK

## Navigation contract
- **ISL** = home / principal surface.
- **←** = return to the exact previous ISL surface whenever possible.
- **Android Back** = same semantic intention as ← before raw WebView history.
- **JUGAR / CREAR / VER / DECIDIR / MÁS** = one global primary grammar, not repeated in multiple layers.
- Local page tabs may exist only when they navigate within that page’s content.
- A local control must not duplicate a global control unless the duplication is required by context/accessibility and has a distinct role.

## Interaction contract
Every visible action must be one of:
- ACTIVE — does the promised thing now.
- PENDING — visibly says what is missing.
- SOURCE — explicit external/open-source action.
- DISABLED — visually and semantically disabled.
- HIDDEN — not shown until relevant.

Never use “looks active, does nothing”.

## Gallery/media contract
- Prefer internal runtime/preview.
- External Drive/source links are secondary and explicit.
- Never auto-open Google/Drive as a silent fallback.
- 3D without runtime must show clear pending state.
- Missing thumbnail must say preview pending, not look like unexplained failure.

## Mechanic readability
For gameplay/UI mechanics:
- first-use affordance should be legible without explanation;
- one perceptual cue should dominate;
- avoid competing icons/text/shape cues;
- test by asking the human what they think will happen before they press;
- if interpretation differs from outcome, classify as MECHANIC_OPACITY.

## CQC
A surface passes only if:
- one obvious primary action exists;
- no duplicate primary menu is visible;
- every visible button has a clear outcome;
- back/home semantics are predictable;
- no unexpected external navigation occurs;
- pending states are honest;
- information is not repeated without functional reason;
- tablet/mobile read remains clear;
- human can describe the next action without facilitator explanation.

## Human gate
This method never promotes CANON or PRIMARY.
It only improves circulation and removes friction.
All structural removals should remain reversible until human device read confirms the change.

## Current evidence
Physical tablet testing on 2026-09-25 exposed:
- repeated global/local navigation;
- duplicated CREATE/VIEW/DECIDE entry points on home;
- Android/back routes unexpectedly landing in Cartographer/RPG;
- Gallery Drive fallbacks escaping to Google;
- 3D cards with no visible runtime/preview behavior;
- music cards that looked dead when source was not wired.

These observations justify the active UX HYGIENE lane.

## Safe next
Continue tablet pass with one confusion at a time:
1. observe;
2. label;
3. apply one reversible simplification;
4. deploy;
5. re-test on device;
6. only then move to the next ambiguity.
