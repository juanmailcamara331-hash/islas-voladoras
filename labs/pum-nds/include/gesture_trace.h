#pragma once
#include <stdint.h>

typedef struct {
  uint16_t samples;
  uint16_t min_x, min_y, max_x, max_y;
  uint32_t distance;
  uint16_t direction_changes;
  uint16_t duration_frames;
  uint8_t active;
  uint8_t reserved;
  int16_t last_x, last_y;
  int8_t last_dx_sign, last_dy_sign;
} GestureTrace;

#ifdef __cplusplus
extern "C" {
#endif

void gesture_reset(GestureTrace* g);
void gesture_begin(GestureTrace* g, int x, int y);
void gesture_sample(GestureTrace* g, int x, int y);
void gesture_end(GestureTrace* g);

#ifdef __cplusplus
}
#endif
