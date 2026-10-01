#pragma once
#include <stdint.h>
#include "save_state.h"

typedef struct {
  uint32_t relation_numeric_id;
  uint16_t entity_a;
  uint16_t entity_b;
  uint16_t redefinitions;
  uint16_t schema_version;
  uint32_t source_tick;
} NeutralRelationExport;

#ifdef __cplusplus
extern "C" {
#endif

int relation_export_from_save(const IslSave* save, NeutralRelationExport* out);

#ifdef __cplusplus
}
#endif
