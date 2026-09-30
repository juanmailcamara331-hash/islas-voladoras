#pragma once
#include <stdint.h>

#define BIO_CAPACITY 16u

typedef struct {
  uint16_t entity_id;
  uint16_t encounters;
  uint16_t uses;
  uint16_t gifts;
  uint16_t failures;
  uint16_t redefinitions;
  uint16_t returns;
  uint16_t last_tick_low;
} BiographyEntry;

typedef struct {
  BiographyEntry entries[BIO_CAPACITY];
  uint16_t count;
  uint16_t overflow;
} BiographyBook;

#ifdef __cplusplus
extern "C" {
#endif

void biography_init(BiographyBook* b);
BiographyEntry* biography_touch(BiographyBook* b, uint16_t entity_id, uint32_t tick);
void biography_record_encounter(BiographyBook* b, uint16_t entity_id, uint32_t tick);
void biography_record_use(BiographyBook* b, uint16_t entity_id, uint32_t tick);
void biography_record_redefinition(BiographyBook* b, uint16_t entity_id, uint32_t tick);
const BiographyEntry* biography_find(const BiographyBook* b, uint16_t entity_id);

#ifdef __cplusplus
}
#endif
