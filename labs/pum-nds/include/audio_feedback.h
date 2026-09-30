#pragma once
#include <stdint.h>

typedef enum {
  SFX_NONE = 0,
  SFX_STEP,
  SFX_ACTION,
  SFX_IMPACT,
  SFX_RECOVER,
  SFX_COMPLETE
} SfxKind;

#ifdef __cplusplus
extern "C" {
#endif

void audio_feedback_init(void);
void audio_feedback_play(SfxKind kind);
void audio_feedback_tick(void);

#ifdef __cplusplus
}
#endif
