#pragma once
#include <stdint.h>

#define ISL_TRACE_VERSION 1u

typedef enum {
  TRACE_NONE = 0,
  TRACE_PRIMARY,
  TRACE_SECONDARY,
  TRACE_PUM,
  TRACE_GESTURE
} TraceKind;

typedef struct {
  uint16_t version;
  uint16_t kind;
  uint32_t tick;
  int16_t a;
  int16_t b;
  uint32_t value;
} TraceEvent;
