#pragma once
#include <stddef.h>
#include <stdint.h>
#include "sync_packet.h"

#define ISL_SYNC_WIRE_MAGIC 0x49535731u /* ISW1 */
#define ISL_SYNC_WIRE_SCHEMA 1u
#define ISL_SYNC_WIRE_MAX 192u

#ifdef __cplusplus
extern "C" {
#endif

size_t sync_wire_encode(const SyncPacket* packet, uint8_t* out, size_t cap);
int sync_wire_decode(SyncPacket* out, const uint8_t* data, size_t len);
uint32_t sync_wire_checksum(const uint8_t* data, size_t len);

#ifdef __cplusplus
}
#endif
