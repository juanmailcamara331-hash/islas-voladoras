#include "save_state.h"
#include <string.h>

void save_init(IslSave* s) {
  memset(s, 0, sizeof(*s));
  s->magic = ISL_SAVE_MAGIC;
  s->schema = ISL_SAVE_SCHEMA;
  s->world_seed = 0x51A7E123u;
  s->checksum = save_checksum(s);
}

uint32_t save_checksum(const IslSave* s) {
  const uint8_t* p = (const uint8_t*)s;
  uint32_t h = 2166136261u;
  for (unsigned i = 0; i < sizeof(*s); ++i) {
    if (i >= 8 && i < 12) continue;
    h ^= p[i];
    h *= 16777619u;
  }
  return h;
}

int save_validate(const IslSave* s) {
  if (!s) return 0;
  if (s->magic != ISL_SAVE_MAGIC) return 0;
  if (s->schema != ISL_SAVE_SCHEMA) return 0;
  return s->checksum == save_checksum(s);
}
