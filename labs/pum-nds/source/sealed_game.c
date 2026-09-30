#include "sealed_game.h"
#include <string.h>

#define WORLD_W 12u
#define WORLD_H 12u
#define TARGET_MILESTONES 9u

static uint32_t next_rng(SealedGameState* g) {
  uint32_t x = g->rng ? g->rng : 0xA341316Cu;
  x ^= x << 13;
  x ^= x >> 17;
  x ^= x << 5;
  g->rng = x;
  return x;
}

static uint16_t clamp_u16(int v, int lo, int hi) {
  if (v < lo) return (uint16_t)lo;
  if (v > hi) return (uint16_t)hi;
  return (uint16_t)v;
}

static void start_encounter(SealedGameState* g) {
  uint32_t r = next_rng(g);
  g->mode = GAME_COMBAT;
  g->encounters++;
  g->enemy_power = (uint16_t)(2u + g->level + ((r >> 3) % 3u));
  g->enemy_hp = (uint16_t)(5u + g->level * 2u + (r % 5u));
  g->combo = 0;
}

static void gain_progress(SealedGameState* g, uint16_t amount) {
  g->xp = (uint16_t)(g->xp + amount);
  uint16_t need = (uint16_t)(5u + g->level * 3u);
  if (g->xp >= need) {
    g->xp = (uint16_t)(g->xp - need);
    g->level++;
    g->hp_max = (uint16_t)(g->hp_max + 2u);
    g->focus_max = (uint16_t)(g->focus_max + 1u);
    g->hp = g->hp_max;
    g->focus = g->focus_max;
  }
}

static void explore(SealedGameState* g, GameAction action) {
  int moved = 0;
  if (action == GAME_ACT_UP)    { g->y = clamp_u16((int)g->y - 1, 0, WORLD_H-1); moved = 1; }
  if (action == GAME_ACT_DOWN)  { g->y = clamp_u16((int)g->y + 1, 0, WORLD_H-1); moved = 1; }
  if (action == GAME_ACT_LEFT)  { g->x = clamp_u16((int)g->x - 1, 0, WORLD_W-1); moved = 1; }
  if (action == GAME_ACT_RIGHT) { g->x = clamp_u16((int)g->x + 1, 0, WORLD_W-1); moved = 1; }

  if (moved) {
    g->steps++;
    uint32_t r = next_rng(g);
    uint32_t cell = (uint32_t)g->x * 17u + (uint32_t)g->y * 31u + g->seed;

    if (((cell ^ r) % 13u) == 0u) {
      uint16_t bit = (uint16_t)(1u << ((g->x + g->y) & 15u));
      if (!(g->route_flags & bit)) {
        g->route_flags |= bit;
        g->milestones++;
        gain_progress(g, 2u);
      }
    }

    if (g->milestones >= TARGET_MILESTONES)
      g->closure_ready = 1;

    if ((r % 7u) == 0u || (g->steps % 11u) == 0u)
      start_encounter(g);
  }

  if (action == GAME_ACT_CONTEXT && g->closure_ready) {
    g->mode = GAME_COMPLETE;
  }
}

static void combat(SealedGameState* g, GameAction action) {
  if (action != GAME_ACT_PRIMARY &&
      action != GAME_ACT_SECONDARY &&
      action != GAME_ACT_CONTEXT) return;

  uint32_t r = next_rng(g);
  uint16_t damage = 0;
  uint16_t enemy_damage = 0;

  if (action == GAME_ACT_PRIMARY) {
    damage = (uint16_t)(2u + g->level + (r % 3u));
    g->combo++;
  } else if (action == GAME_ACT_SECONDARY) {
    if (g->focus) {
      g->focus--;
      damage = (uint16_t)(4u + g->level + (r % 4u));
      g->combo = (uint16_t)(g->combo + 2u);
    } else {
      damage = 1u;
    }
  } else {
    if (g->combo >= 2u) {
      damage = (uint16_t)(3u + g->combo);
      g->combo = 0u;
    } else if (g->focus < g->focus_max) {
      g->focus++;
    }
  }

  if (damage >= g->enemy_hp) {
    g->enemy_hp = 0;
    g->victories++;
    gain_progress(g, 2u);
    if ((g->victories % 3u) == 0u && g->milestones < TARGET_MILESTONES)
      g->milestones++;
    if (g->milestones >= TARGET_MILESTONES)
      g->closure_ready = 1;
    g->mode = GAME_EXPLORE;
    return;
  }

  g->enemy_hp = (uint16_t)(g->enemy_hp - damage);
  enemy_damage = (uint16_t)(1u + (g->enemy_power / 3u) + ((r >> 8) % 2u));

  if (enemy_damage >= g->hp) {
    g->hp = 0;
    g->mode = GAME_RECOVER;
  } else {
    g->hp = (uint16_t)(g->hp - enemy_damage);
  }
}

static void recover(SealedGameState* g, GameAction action) {
  if (action == GAME_ACT_PRIMARY || action == GAME_ACT_CONTEXT) {
    g->recoveries++;
    g->hp = (uint16_t)((g->hp_max + 1u) / 2u);
    g->focus = g->focus_max;
    g->x = (uint16_t)((g->x + 3u) % WORLD_W);
    g->y = (uint16_t)((g->y + 5u) % WORLD_H);
    g->mode = GAME_EXPLORE;
  }
}

void sealed_game_init(SealedGameState* g, uint32_t seed) {
  memset(g, 0, sizeof(*g));
  g->seed = seed ? seed : 1u;
  g->rng = g->seed ^ 0x9E3779B9u;
  g->x = 5u;
  g->y = 5u;
  g->hp_max = 12u;
  g->hp = g->hp_max;
  g->focus_max = 3u;
  g->focus = g->focus_max;
  g->level = 1u;
  g->mode = GAME_EXPLORE;
}

void sealed_game_step(SealedGameState* g, GameAction action) {
  if (!g || g->mode == GAME_COMPLETE) return;
  g->turns++;

  if (g->mode == GAME_EXPLORE) explore(g, action);
  else if (g->mode == GAME_COMBAT) combat(g, action);
  else if (g->mode == GAME_RECOVER) recover(g, action);
}

int sealed_game_complete(const SealedGameState* g) {
  return g && g->mode == GAME_COMPLETE;
}

uint32_t sealed_game_signature(const SealedGameState* g) {
  if (!g) return 0u;
  uint32_t h = 2166136261u;
  const uint8_t* p = (const uint8_t*)g;
  for (unsigned i = 0; i < sizeof(*g); ++i) {
    h ^= p[i];
    h *= 16777619u;
  }
  return h;
}
