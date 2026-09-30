#pragma once
#include <stdint.h>
#include "save_state.h"
#include "handoff_state.h"

#define ISL_SYNC_MAGIC 0x50554D31u
#define ISL_SYNC_SCHEMA 1u

typedef struct {
  uint32_t magic;
  uint16_t schema;
  uint16_t flags;
  uint32_t generation;
  uint32_t save_checksum;
  uint8_t from_owner;
  uint8_t to_owner;
  uint16_t reserved;
  IslSave save;
} SyncPacket;

#ifdef __cplusplus
extern "C" {
#endif

int sync_packet_pack(SyncPacket* out, const IslSave* save, uint32_t generation,
                     RunOwner from_owner, RunOwner to_owner);
int sync_packet_unpack(const SyncPacket* packet, IslSave* out);
int sync_packet_same_identity(const SyncPacket* a, const SyncPacket* b);

#ifdef __cplusplus
}
#endif
