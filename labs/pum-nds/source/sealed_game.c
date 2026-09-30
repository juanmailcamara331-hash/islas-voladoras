#include "sealed_game.h"
#include <string.h>

#define WORLD_W 12u
#define WORLD_H 12u
#define TARGET_MILESTONES 9u
#define COLLECTION_VARIANTS 12u

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

static unsigned pop16(uint16_t v) {
  unsigned n=0;
  while(v){ n += v & 1u; v >>= 1; }
  return n;
}

static uint16_t add_variant(uint16_t mask, uint32_t r) {
  unsigned start = (unsigned)(r % COLLECTION_VARIANTS);
  for (unsigned i=0;i<COLLECTION_VARIANTS;i++) {
    unsigned idx=(start+i)%COLLECTION_VARIANTS;
    uint16_t bit=(uint16_t)(1u<<idx);
    if(!(mask&bit)) return (uint16_t)(mask|bit);
  }
  return mask;
}

static void refresh_derived_stats(SealedGameState* g) {
  unsigned rings=pop16(g->rings_mask);
  unsigned pens=pop16(g->pens_mask);
  g->hp_max=(uint16_t)(12u + (rings>6u?6u:rings));
  g->focus_max=(uint16_t)(3u + (pens>4u?4u:pens/2u));
  if(g->hp>g->hp_max) g->hp=g->hp_max;
  if(g->focus>g->focus_max) g->focus=g->focus_max;
}

static void reward_collection(SealedGameState* g) {
  uint32_t r=next_rng(g);
  switch(r%3u){
    case 0: g->rings_mask=add_variant(g->rings_mask,r>>3); break;
    case 1: g->pens_mask=add_variant(g->pens_mask,r>>3); break;
    default:g->lighters_mask=add_variant(g->lighters_mask,r>>3); break;
  }
  refresh_derived_stats(g);
}

static unsigned challenge(const SealedGameState* g) {
  return 1u + g->milestones/3u + g->victories/5u;
}

static void start_encounter(SealedGameState* g) {
  uint32_t r = next_rng(g);
  unsigned ch=challenge(g);
  g->mode = GAME_COMBAT;
  g->encounters++;
  g->enemy_power = (uint16_t)(2u + ch + ((r >> 3) % 3u));
  g->enemy_hp = (uint16_t)(5u + ch * 2u + (r % 5u));
  g->combo = 0;
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
        reward_collection(g);
      }
    }

    if (g->milestones >= TARGET_MILESTONES) g->closure_ready = 1;
    if ((r % 7u) == 0u || (g->steps % 11u) == 0u) start_encounter(g);
  }

  if (action == GAME_ACT_CONTEXT && g->closure_ready) g->mode = GAME_COMPLETE;
}

static void combat(SealedGameState* g, GameAction action) {
  if (action != GAME_ACT_PRIMARY &&
      action != GAME_ACT_SECONDARY &&
      action != GAME_ACT_CONTEXT) return;

  uint32_t r = next_rng(g);
  uint16_t damage = 0;
  uint16_t enemy_damage = 0;
  unsigned lighter_bonus = pop16(g->lighters_mask) ? 1u : 0u;
  unsigned pen_bonus = pop16(g->pens_mask) ? 1u : 0u;

  if (action == GAME_ACT_PRIMARY) {
    damage = (uint16_t)(2u + lighter_bonus + (r % 3u));
    g->combo++;
  } else if (action == GAME_ACT_SECONDARY) {
    if (g->focus) {
      g->focus--;
      damage = (uint16_t)(4u + pen_bonus + (r % 4u));
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
    if ((g->victories % 2u) == 0u) reward_collection(g);
    if ((g->victories % 3u) == 0u && g->milestones < TARGET_MILESTONES) g->milestones++;
    if (g->milestones >= TARGET_MILESTONES) g->closure_ready = 1;
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
  g->rings_mask = 1u;
  g->pens_mask = 1u;
  g->lighters_mask = 1u;
  g->ring_slot_a = 0u;
  g->ring_slot_b = 0u;
  g->active_pen = 0u;
  g->active_lighter = 0u;
  refresh_derived_stats(g);
  g->hp = g->hp_max;
  g->focus = g->focus_max;
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
