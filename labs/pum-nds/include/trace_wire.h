#pragma once
#include <stddef.h>
#include <stdint.h>
#include "trace_buffer.h"

#define ISL_TRACE_WIRE_MAGIC 0x49545731u /* ITW1 */
#define ISL_TRACE_WIRE_SCHEMA 1u
#define ISL_TRACE_WIRE_MAX (16u + TRACE_BUFFER_CAPACITY * 16u)

#ifdef __cplusplus
extern "C" {
#endif

size_t trace_wire_encode(const TraceBuffer* buffer, uint8_t* out, size_t cap);
int trace_wire_decode(TraceBuffer* out, const uint8_t* data, size_t len);

#ifdef __cplusplus
}
#endif
