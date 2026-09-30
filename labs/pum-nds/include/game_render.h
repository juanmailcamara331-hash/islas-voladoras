#pragma once
#include "sealed_game.h"

#ifdef __cplusplus
extern "C" {
#endif

void game_render_init(void);
void game_render_frame(const SealedGameState* g);
void game_render_pause(const SealedGameState* g, int checkpoint_valid);

#ifdef __cplusplus
}
#endif
