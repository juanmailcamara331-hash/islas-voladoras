#!/usr/bin/env python3
"""Execute the actual C gameplay/save code for one persistent encounter."""
from pathlib import Path
import subprocess
import tempfile

root = Path(__file__).resolve().parents[1]
harness = r"""
#include <assert.h>
#include <stdint.h>
#include "sealed_game.h"
#include "save_state.h"

int main(void) {
  IslSave s;
  save_init(&s);
  SealedGameState* g = &s.game;
  assert(g->reserved == 0u);
  g->x = 6u; g->y = 5u; // immediately adjacent, no random encounter
  uint16_t before = g->milestones;
  sealed_game_step(g, GAME_ACT_PRIMARY);
  assert((g->reserved & 1u) != 0u);
  assert(g->milestones == before + 1u);
  uint16_t once = g->milestones;
  sealed_game_step(g, GAME_ACT_PRIMARY);
  assert(g->milestones == once); // no spammable rewards

  g->x = 0u; g->y = 1u;
  sealed_game_step(g, GAME_ACT_UP);
  assert((g->reserved & 2u) != 0u); // departure is remembered

  g->x = 6u; g->y = 5u; g->mode = GAME_EXPLORE;
  g->hp = 1u; g->focus = 0u;
  sealed_game_step(g, GAME_ACT_PRIMARY);
  assert((g->reserved & 4u) != 0u);
  assert(g->milestones == once + 1u);
  assert(g->hp == g->hp_max && g->focus == g->focus_max);

  s.checksum = save_checksum(&s);
  assert(save_validate(&s));
  IslSave loaded = s;
  assert(save_validate(&loaded));
  assert((loaded.game.reserved & 7u) == 7u);
  uint16_t after = loaded.game.milestones;
  sealed_game_step(&loaded.game, GAME_ACT_PRIMARY);
  assert(loaded.game.milestones == after);
  return 0;
}
"""
with tempfile.TemporaryDirectory(prefix="pum-reencounter-") as d:
    tmp = Path(d)
    source = tmp / "check.c"
    target = tmp / "check"
    source.write_text(harness)
    subprocess.run(
        ["cc", "-std=c11", "-Wall", "-Wextra", "-Werror",
         "-I", str(root / "include"), str(source),
         str(root / "source" / "sealed_game.c"),
         str(root / "source" / "save_state.c"), "-o", str(target)],
        check=True, capture_output=True, text=True,
    )
    subprocess.run([str(target)], check=True, capture_output=True, text=True)
print("real C gameplay + save re-encounter PASS")
