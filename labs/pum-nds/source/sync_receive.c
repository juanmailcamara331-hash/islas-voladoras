#include "sync_receive.h"

static int packet_valid(const SyncPacket* p) {
  IslSave tmp;
  return p && sync_packet_unpack(p, &tmp);
}

SyncReceiveResult sync_receive_decide(const SyncPacket* incoming,
                                      const SyncPacket* current,
                                      RunOwner local_owner) {
  if (!packet_valid(incoming)) return SYNC_RX_INVALID;
  if (incoming->to_owner != (uint8_t)local_owner) return SYNC_RX_WRONG_TARGET;

  if (!current) return SYNC_RX_ACCEPT;
  if (!packet_valid(current)) return SYNC_RX_INVALID;

  if (sync_packet_same_identity(incoming, current)) return SYNC_RX_DUPLICATE;

  if (incoming->generation < current->generation) return SYNC_RX_STALE;

  if (incoming->generation == current->generation) {
    return incoming->save_checksum == current->save_checksum
      ? SYNC_RX_DUPLICATE
      : SYNC_RX_CONFLICT;
  }

  if (incoming->generation > current->generation + 1u) return SYNC_RX_GAP;

  return SYNC_RX_ACCEPT;
}

int sync_receive_apply(const SyncPacket* incoming,
                       const SyncPacket* current,
                       RunOwner local_owner,
                       IslSave* out_save) {
  if (!out_save) return 0;
  if (sync_receive_decide(incoming, current, local_owner) != SYNC_RX_ACCEPT) return 0;
  return sync_packet_unpack(incoming, out_save);
}
