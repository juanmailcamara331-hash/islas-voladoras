#!/usr/bin/env python3
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
main=(ROOT/"source/main.cpp").read_text()
render=(ROOT/"source/game_render.c").read_text()

assert '#include "save_journal.h"' in main
assert 'save_journal_init(&g_journal, &g_save);' in main
assert 'if (down & KEY_START)' in main
assert 'if (g_paused)' in main
assert 'down & KEY_A' in main and 'checkpoint_save()' in main
assert 'down & KEY_Y' in main and 'checkpoint_load()' in main
assert 'down & KEY_B' in main
assert 'save_journal_stage(&g_journal, &g_save)' in main
assert 'save_journal_commit(&g_journal)' in main
assert 'save_journal_recover(&g_journal, &restored)' in main
assert main.index('if (g_paused)') < main.index('g_save.play_ticks++')
assert 'game_render_pause' in render
print("runtime checkpoint/menu contract PASS")
