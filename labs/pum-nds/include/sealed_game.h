#pragma once
#include <stdint.h>

typedef enum {
  GAME_EXPLORE = 0,
  GAME_COMBAT = 1,
  GAME_RECOVER = 2,
  GAME_COMPLETE = 3
} GameMode;

typedef enum {
  GAME_ACT_NONE = 0,
  GAME_ACT_UP,
  GAME_ACT_DOWN,
  GAME_ACT_LEFT,
  GAME_ACT_RIGHT,
  GAME_ACT_PRIMARY,
  GAME_ACT_SECONDARY,
  GAME_ACT_CONTEXT
} GameAction;

typedef struct {
  uint32_t seed;
  uint32_t rng;
  uint32_t turns;
  uint32_t steps;
  uint16_t x, y;
  uint16_t hp, hp_max;
  uint16_t focus, focus_max;
  uint16_t level;
  uint16_t xp;
  uint16_t milestones;
  uint16_t encounters;
  uint16_t victories;
  uint16_t recoveries;
  uint16_t enemy_hp;
  uint16_t enemy_power;
  uint16_t combo;
  uint16_t route_flags;
  uint8_t mode;
  uint8_t closure_ready;
  uint16_t reserved;
} SealedGameState;

#ifdef __cplusplus
extern "C" {
#endif

void sealed_game_init(SealedGameState* g, uint32_t seed);
void sealed_game_step(SealedGameState* g, GameAction action);
int sealed_game_complete(const SealedGameState* g);
uint32_t sealed_game_signature(const SealedGameState* g);

#ifdef __cplusplus
}
#endif
