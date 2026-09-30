#pragma once
#include <stdint.h>

typedef enum {
  TEMPO_STILL = 0,
  TEMPO_SLOW = 1,
  TEMPO_FLOW = 2,
  TEMPO_FAST = 3
} TempoBand;

typedef struct {
  uint16_t recent_actions;
  uint16_t recent_pauses;
  uint16_t recent_gesture_speed;
  uint16_t recent_repetition;
  uint16_t sample_window;
  uint8_t band;
  uint8_t reserved;
} TempoState;

#ifdef __cplusplus
extern "C" {
#endif

void tempo_init(TempoState* t);
void tempo_observe_action(TempoState* t, uint16_t frames_since_last);
void tempo_observe_gesture(TempoState* t, uint32_t distance, uint16_t duration_frames, uint16_t direction_changes);
void tempo_decay(TempoState* t);
TempoBand tempo_band(const TempoState* t);

#ifdef __cplusplus
}
#endif
