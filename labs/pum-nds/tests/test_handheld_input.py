#!/usr/bin/env python3
"""Guard against D-pad one-tap movement and held-A action spam."""
from pathlib import Path
main = (Path(__file__).resolve().parents[1] / "source/main.cpp").read_text()
assert "keysSetRepeat(16, 5)" in main
assert "const int repeated = keysDownRepeat();" in main
assert main.count("keysDownRepeat()") == 1, "repeat state must be read once"
assert "const int input = (down & ~direction_mask) | (repeated & direction_mask);" in main
assert "SemanticAction semantic = map_semantic(input);" in main
assert "if (down & KEY_START)" in main, "menu should not repeat on hold"
assert "if (down & KEY_A)" in main, "save must stay edge-triggered"
print("handheld D-pad repeat and one-shot actions PASS")
