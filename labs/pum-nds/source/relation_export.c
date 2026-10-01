#include "relation_export.h"
#include <string.h>

int relation_export_from_save(const IslSave* save, NeutralRelationExport* out) {
  if (!save || !out || !save_validate(save)) return 0;
  if (save->relation_entity_id == 0u || save->relation_redefinitions == 0u) return 0;

  memset(out, 0, sizeof(*out));
  out->relation_numeric_id =
      ((uint32_t)save->relation_entity_id << 16) | (uint32_t)save->relation_redefinitions;
  out->entity_a = save->relation_entity_id;
  out->entity_b = 0u; /* neutral system/world counterpart, never a sealed name */
  out->redefinitions = save->relation_redefinitions;
  out->schema_version = 1u;
  out->source_tick = save->play_ticks;
  return 1;
}
