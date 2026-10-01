#pragma once
#include <stdint.h>
#include "sealed_game.h"

#define ISL_SAVE_MAGIC 0x49534C31u
#define ISL_SAVE_SCHEMA 3u

typedef struct {
  uint32_t magic;
  uint16_t schema;
  uint16_t flags;
  uint32_t checksum;
  uint32_t world_seed;
  uint32_t play_ticks;
  uint32_t event_count;
  uint32_t relation_count;
  uint16_t relation_entity_id;
  uint16_t relation_redefinitions;
  SealedGameState game;
  uint32_t reserved[8];
} IslSave;

#ifdef __cplusplus
extern "C" {
#endif

void save_init(IslSave* s);
uint32_t save_checksum(const IslSave* s);
int save_validate(const IslSave* s);

#ifdef __cplusplus
}
#endif
