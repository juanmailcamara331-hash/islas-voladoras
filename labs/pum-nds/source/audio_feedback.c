#include "audio_feedback.h"
#include <nds.h>

static int g_channel = -1;
static uint8_t g_frames = 0;

void audio_feedback_init(void) {
  soundEnable();
}

void audio_feedback_play(SfxKind kind) {
  if (g_channel >= 0) {
    soundKill(g_channel);
    g_channel = -1;
  }

  int freq = 0;
  int vol = 72;
  int pan = 64;
  int frames = 3;

  switch(kind) {
    case SFX_STEP:     freq = 1800; vol = 28; frames = 1; break;
    case SFX_ACTION:   freq = 4200; vol = 48; frames = 2; break;
    case SFX_IMPACT:   freq = 900;  vol = 62; frames = 3; break;
    case SFX_RECOVER:  freq = 2600; vol = 42; frames = 5; break;
    case SFX_COMPLETE: freq = 6200; vol = 52; frames = 8; break;
    default: return;
  }

  g_channel = soundPlayPSG(DutyCycle_25, freq, vol, pan);
  g_frames = (uint8_t)frames;
}

void audio_feedback_tick(void) {
  if (!g_frames) return;
  g_frames--;
  if (!g_frames && g_channel >= 0) {
    soundKill(g_channel);
    g_channel = -1;
  }
}
