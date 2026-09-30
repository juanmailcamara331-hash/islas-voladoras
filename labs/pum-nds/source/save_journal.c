#include "save_journal.h"
#include <string.h>

static SaveSlot* inactive_slot(SaveJournal* j) {
  return j->committed_slot == 0u ? &j->b : &j->a;
}

static const SaveSlot* slot_by_index(const SaveJournal* j, uint8_t idx) {
  return idx == 0u ? &j->a : &j->b;
}

static void fill_slot(SaveSlot* slot, const IslSave* s, uint32_t generation) {
  memset(slot, 0, sizeof(*slot));
  slot->magic = ISL_JOURNAL_MAGIC;
  slot->schema = ISL_JOURNAL_SCHEMA;
  slot->generation = generation;
  slot->payload = *s;
  slot->payload.checksum = save_checksum(&slot->payload);
  slot->payload_checksum = slot->payload.checksum;
  slot->flags = 1u; /* staged-valid */
}

int save_slot_validate(const SaveSlot* slot) {
  if (!slot) return 0;
  if (slot->magic != ISL_JOURNAL_MAGIC) return 0;
  if (slot->schema != ISL_JOURNAL_SCHEMA) return 0;
  if (!(slot->flags & 1u)) return 0;
  if (slot->payload_checksum != slot->payload.checksum) return 0;
  return save_validate(&slot->payload);
}

void save_journal_init(SaveJournal* j, const IslSave* initial) {
  memset(j, 0, sizeof(*j));
  fill_slot(&j->a, initial, 1u);
  j->a.flags |= 2u; /* committed */
  j->committed_generation = 1u;
  j->committed_slot = 0u;
}

int save_journal_stage(SaveJournal* j, const IslSave* next) {
  if (!j || !next || !save_validate(next)) return 0;
  SaveSlot* target = inactive_slot(j);
  fill_slot(target, next, j->committed_generation + 1u);
  return save_slot_validate(target);
}

int save_journal_commit(SaveJournal* j) {
  if (!j) return 0;
  SaveSlot* target = inactive_slot(j);
  if (!save_slot_validate(target)) return 0;

  SaveSlot* old = j->committed_slot == 0u ? &j->a : &j->b;
  old->flags &= (uint16_t)~2u;
  target->flags |= 2u;
  j->committed_slot = (uint8_t)(j->committed_slot ? 0u : 1u);
  j->committed_generation = target->generation;
  return 1;
}

int save_journal_recover(const SaveJournal* j, IslSave* out) {
  if (!j || !out) return 0;

  const SaveSlot* committed = slot_by_index(j, j->committed_slot);
  const SaveSlot* other = slot_by_index(j, (uint8_t)(j->committed_slot ? 0u : 1u));

  if (save_slot_validate(committed)) {
    *out = committed->payload;
    return 1;
  }

  if (save_slot_validate(other)) {
    *out = other->payload;
    return 1;
  }

  return 0;
}
