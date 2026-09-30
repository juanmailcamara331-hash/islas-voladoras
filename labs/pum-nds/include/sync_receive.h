#pragma once
#include "sync_packet.h"

typedef enum {
  SYNC_RX_INVALID = 0,
  SYNC_RX_ACCEPT = 1,
  SYNC_RX_DUPLICATE = 2,
  SYNC_RX_CONFLICT = 3,
  SYNC_RX_GAP = 4,
  SYNC_RX_WRONG_TARGET = 5,
  SYNC_RX_STALE = 6
} SyncReceiveResult;

#ifdef __cplusplus
extern "C" {
#endif

SyncReceiveResult sync_receive_decide(const SyncPacket* incoming,
                                      const SyncPacket* current,
                                      RunOwner local_owner);
int sync_receive_apply(const SyncPacket* incoming,
                       const SyncPacket* current,
                       RunOwner local_owner,
                       IslSave* out_save);

#ifdef __cplusplus
}
#endif
