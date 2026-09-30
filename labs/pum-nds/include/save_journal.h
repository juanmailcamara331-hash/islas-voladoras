#pragma once
#include <stdint.h>
#include "save_state.h"

#define ISL_JOURNAL_MAGIC 0x4A534C31u
#define ISL_JOURNAL_SCHEMA 1u

typedef struct {
  uint32_t magic;
  uint16_t schema;
  uint16_t flags;
  uint32_t generation;
  uint32_t payload_checksum;
  IslSave payload;
} SaveSlot;

typedef struct {
  SaveSlot a;
  SaveSlot b;
  uint32_t committed_generation;
  uint8_t committed_slot; /* 0=A, 1=B */
  uint8_t reserved[3];
} SaveJournal;

#ifdef __cplusplus
extern "C" {
#endif

void save_journal_init(SaveJournal* j, const IslSave* initial);
int save_slot_validate(const SaveSlot* slot);
int save_journal_stage(SaveJournal* j, const IslSave* next);
int save_journal_commit(SaveJournal* j);
int save_journal_recover(const SaveJournal* j, IslSave* out);

#ifdef __cplusplus
}
#endif
