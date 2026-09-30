#include "tempo.h"
#include <string.h>

static void tempo_recompute(TempoState* t) {
  uint32_t score = 0;
  score += (uint32_t)t->recent_actions * 3u;
  score += (uint32_t)t->recent_gesture_speed * 2u;
  score += (uint32_t)t->recent_repetition;
  if (t->recent_pauses > score) score = 0;
  else score -= t->recent_pauses;

  if (score < 3u) t->band = TEMPO_STILL;
  else if (score < 8u) t->band = TEMPO_SLOW;
  else if (score < 16u) t->band = TEMPO_FLOW;
  else t->band = TEMPO_FAST;
}

void tempo_init(TempoState* t) {
  memset(t, 0, sizeof(*t));
}

void tempo_observe_action(TempoState* t, uint16_t frames_since_last) {
  if (!t) return;
  if (t->recent_actions < 255u) t->recent_actions++;
  if (frames_since_last > 120u && t->recent_pauses < 255u) t->recent_pauses += 2u;
  else if (frames_since_last > 45u && t->recent_pauses < 255u) t->recent_pauses += 1u;
  t->sample_window++;
  tempo_recompute(t);
}

void tempo_observe_gesture(TempoState* t, uint32_t distance, uint16_t duration_frames, uint16_t direction_changes) {
  if (!t) return;
  uint16_t speed = duration_frames ? (uint16_t)(distance / duration_frames) : (uint16_t)distance;
  if (speed > 15u) speed = 15u;
  t->recent_gesture_speed = speed;
  t->recent_repetition = direction_changes > 15u ? 15u : direction_changes;
  t->sample_window++;
  tempo_recompute(t);
}

void tempo_decay(TempoState* t) {
  if (!t) return;
  if (t->recent_actions) t->recent_actions--;
  if (t->recent_pauses) t->recent_pauses--;
  if (t->recent_gesture_speed) t->recent_gesture_speed--;
  if (t->recent_repetition) t->recent_repetition--;
  tempo_recompute(t);
}

TempoBand tempo_band(const TempoState* t) {
  return t ? (TempoBand)t->band : TEMPO_STILL;
}
