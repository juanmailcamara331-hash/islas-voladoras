#pragma once
#include "sealed_game.h"

#ifdef __cplusplus
extern "C" {
#endif

void game_render_init(void);
void game_render_frame(const SealedGameState* g);

#ifdef __cplusplus
}
#endif
