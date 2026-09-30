#include "sync_packet.h"
#include <string.h>

static int valid_owner(RunOwner owner) {
  return owner == OWNER_R36 || owner == OWNER_TABLET;
}

int sync_packet_pack(SyncPacket* out, const IslSave* save, uint32_t generation,
                     RunOwner from_owner, RunOwner to_owner) {
  if (!out || !save || !save_validate(save)) return 0;
  if (!valid_owner(from_owner) || !valid_owner(to_owner) || from_owner == to_owner) return 0;

  memset(out, 0, sizeof(*out));
  out->magic = ISL_SYNC_MAGIC;
  out->schema = ISL_SYNC_SCHEMA;
  out->generation = generation;
  out->save_checksum = save->checksum;
  out->from_owner = (uint8_t)from_owner;
  out->to_owner = (uint8_t)to_owner;
  out->save = *save;
  return 1;
}

int sync_packet_unpack(const SyncPacket* packet, IslSave* out) {
  if (!packet || !out) return 0;
  if (packet->magic != ISL_SYNC_MAGIC || packet->schema != ISL_SYNC_SCHEMA) return 0;
  if (!valid_owner((RunOwner)packet->from_owner) || !valid_owner((RunOwner)packet->to_owner)) return 0;
  if (packet->from_owner == packet->to_owner) return 0;
  if (packet->save_checksum != packet->save.checksum) return 0;
  if (!save_validate(&packet->save)) return 0;
  *out = packet->save;
  return 1;
}

int sync_packet_same_identity(const SyncPacket* a, const SyncPacket* b) {
  if (!a || !b) return 0;
  return a->generation == b->generation &&
         a->save_checksum == b->save_checksum &&
         a->from_owner == b->from_owner &&
         a->to_owner == b->to_owner;
}
