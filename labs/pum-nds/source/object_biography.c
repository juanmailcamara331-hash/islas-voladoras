#include "object_biography.h"
#include <string.h>

void biography_init(BiographyBook* b) {
  memset(b, 0, sizeof(*b));
}

BiographyEntry* biography_touch(BiographyBook* b, uint16_t entity_id, uint32_t tick) {
  if (!b || entity_id == 0u) return 0;
  for (uint16_t i = 0; i < b->count; ++i) {
    if (b->entries[i].entity_id == entity_id) {
      b->entries[i].last_tick_low = (uint16_t)(tick & 0xFFFFu);
      return &b->entries[i];
    }
  }
  if (b->count >= BIO_CAPACITY) {
    b->overflow++;
    return 0;
  }
  BiographyEntry* e = &b->entries[b->count++];
  memset(e, 0, sizeof(*e));
  e->entity_id = entity_id;
  e->last_tick_low = (uint16_t)(tick & 0xFFFFu);
  return e;
}

void biography_record_encounter(BiographyBook* b, uint16_t entity_id, uint32_t tick) {
  BiographyEntry* e = biography_touch(b, entity_id, tick);
  if (e && e->encounters < 0xFFFFu) e->encounters++;
}

void biography_record_use(BiographyBook* b, uint16_t entity_id, uint32_t tick) {
  BiographyEntry* e = biography_touch(b, entity_id, tick);
  if (e && e->uses < 0xFFFFu) e->uses++;
}

void biography_record_redefinition(BiographyBook* b, uint16_t entity_id, uint32_t tick) {
  BiographyEntry* e = biography_touch(b, entity_id, tick);
  if (e && e->redefinitions < 0xFFFFu) e->redefinitions++;
}

const BiographyEntry* biography_find(const BiographyBook* b, uint16_t entity_id) {
  if (!b) return 0;
  for (uint16_t i = 0; i < b->count; ++i)
    if (b->entries[i].entity_id == entity_id) return &b->entries[i];
  return 0;
}
