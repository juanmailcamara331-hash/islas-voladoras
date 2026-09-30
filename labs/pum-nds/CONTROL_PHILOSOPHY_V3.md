# ISL PUM · Control Philosophy v3

Goal: skatepark-like input — few controls, intuitive mastery, no HUD clutter.

Hardware confirmed on R36 Ultra:
- D-pad
- dual analog sticks
- A/B/X/Y
- Start/Select/FN
- four rear triggers: L1/L2/R1/R2

Design rule:
Rear triggers are NOT four permanent new commands.
They are contextual modifiers / fast layers.

Default mental model:
- LEFT STICK / D-PAD = move / choose
- A = primary action / confirm
- B = back / defend / cancel
- X/Y = context actions only when useful
- RIGHT STICK = pointer / stylus surrogate / camera-like contextual control
- L1/R1 = soft context modifiers
- L2/R2 = deep context / hold-to-shift layer
- START = compact system / boxes / run
- SELECT = PUM / contextual meta input

No mandatory chord should require awkward finger gymnastics.

Control priority:
1. one-thumb legibility
2. two-thumb fluency
3. shoulder modifiers only when mastery benefits
4. no mechanic requires memorizing hidden combos

Every control must pass:
- discoverable
- reversible
- readable
- usable without staring at HUD

Contextual input mapping should be data-driven so the same semantic action can map to:
- R36 buttons
- DS touch
- tablet touch
- optional voice
- future Unreal Enhanced Input

Do not expose hardware differences to gameplay logic.
