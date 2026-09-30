#include <nds.h>
#include <stdio.h>
#include "semantic_input.h"
#include "save_state.h"
#include "gesture_trace.h"
#include "trace_buffer.h"
#include "tempo.h"
#include "object_biography.h"
#include "echo.h"
#include "screen_manager.h"
#include "sealed_game.h"
#include "game_render.h"
#include "audio_feedback.h"

static IslSave g_save;
static GestureTrace g_gesture;
static TraceBuffer g_trace;
static TempoState g_tempo;
static BiographyBook g_biography;
static EchoQueue g_echo;
static SealedGameState g_game;

static uint32_t g_last_action_tick = 0;
static uint16_t g_event_seq = 1;
static const uint16_t TECH_ENTITY = 1;

static void push_trace(TraceKind kind, int16_t a, int16_t b, uint32_t value) {
  TraceEvent ev;
  ev.version = ISL_TRACE_VERSION;
  ev.kind = (uint16_t)kind;
  ev.tick = g_save.play_ticks;
  ev.a = a;
  ev.b = b;
  ev.value = value;
  trace_buffer_push(&g_trace, ev);
}

static void observe_action(TraceKind kind) {
  uint32_t dt = g_save.play_ticks - g_last_action_tick;
  if (dt > 0xFFFFu) dt = 0xFFFFu;
  tempo_observe_action(&g_tempo, (uint16_t)dt);
  g_last_action_tick = g_save.play_ticks;
  push_trace(kind, 0, 0, 0);
  push_trace(TRACE_TEMPO, (int16_t)tempo_band(&g_tempo), 0, g_tempo.sample_window);
}

static GameAction map_action(int down) {
  if (down & KEY_UP) return GAME_ACT_UP;
  if (down & KEY_DOWN) return GAME_ACT_DOWN;
  if (down & KEY_LEFT) return GAME_ACT_LEFT;
  if (down & KEY_RIGHT) return GAME_ACT_RIGHT;
  if (down & KEY_A) return GAME_ACT_PRIMARY;
  if (down & KEY_B) return GAME_ACT_SECONDARY;
  if (down & (KEY_X | KEY_SELECT)) return GAME_ACT_CONTEXT;
  return GAME_ACT_NONE;
}

static void render_game(void) {
  game_render_frame(&g_game);
}

static void init_video() {
  screen_manager_init();
  game_render_init();
  audio_feedback_init();
  save_init(&g_save);
  g_game = g_save.game;
  render_game();
}

int main(void) {
  init_video();
  gesture_reset(&g_gesture);
  trace_buffer_init(&g_trace);
  tempo_init(&g_tempo);
  biography_init(&g_biography);
  echo_init(&g_echo);

  touchPosition touch;
  uint32_t decay_tick = 0;

  while (pmMainLoop()) {
    swiWaitForVBlank();
    audio_feedback_tick();
    scanKeys();

    const int down = keysDown();
    const int held = keysHeld();
    const int up = keysUp();

    GameAction action = map_action(down);
    if (action != GAME_ACT_NONE) {
      GameMode before = (GameMode)g_game.mode;
      sealed_game_step(&g_game, action);
      if (before != (GameMode)g_game.mode) {
        if (g_game.mode == GAME_COMBAT) audio_feedback_play(SFX_IMPACT);
        else if (g_game.mode == GAME_RECOVER) audio_feedback_play(SFX_IMPACT);
        else if (g_game.mode == GAME_COMPLETE) audio_feedback_play(SFX_COMPLETE);
        else audio_feedback_play(SFX_ACTION);
      } else if (action >= GAME_ACT_UP && action <= GAME_ACT_RIGHT) {
        audio_feedback_play(SFX_STEP);
      } else {
        audio_feedback_play(SFX_ACTION);
      }
      g_save.event_count++;
      observe_action(action == GAME_ACT_PRIMARY ? TRACE_PRIMARY :
                     action == GAME_ACT_SECONDARY ? TRACE_SECONDARY : TRACE_PUM);

      if (action == GAME_ACT_PRIMARY) {
        biography_record_use(&g_biography, TECH_ENTITY, g_save.play_ticks);
        push_trace(TRACE_BIOGRAPHY, TECH_ENTITY, 1, 0);
      }

      if (action == GAME_ACT_CONTEXT) {
        g_save.relation_count++;
        biography_record_redefinition(&g_biography, TECH_ENTITY, g_save.play_ticks);
        push_trace(TRACE_BIOGRAPHY, TECH_ENTITY, 2, 0);
        echo_schedule(&g_echo, g_event_seq++, (uint16_t)g_trace.count, TECH_ENTITY,
                      ECHO_RELATION, g_save.play_ticks + 180u, g_save.relation_count);
      }

      if (before != (GameMode)g_game.mode || action != GAME_ACT_NONE)
        render_game();
    }

    if (held & KEY_TOUCH) {
      touchRead(&touch);
      if (down & KEY_TOUCH) gesture_begin(&g_gesture, touch.px, touch.py);
      else gesture_sample(&g_gesture, touch.px, touch.py);
    }

    if (up & KEY_TOUCH) {
      gesture_end(&g_gesture);
      g_save.event_count++;
      tempo_observe_gesture(&g_tempo, g_gesture.distance, g_gesture.duration_frames, g_gesture.direction_changes);
      push_trace(TRACE_GESTURE, (int16_t)g_gesture.direction_changes,
                 (int16_t)g_gesture.duration_frames, g_gesture.distance);
      push_trace(TRACE_TEMPO, (int16_t)tempo_band(&g_tempo), 0, g_tempo.sample_window);
      echo_schedule(&g_echo, g_event_seq++, (uint16_t)g_trace.count, TECH_ENTITY,
                    ECHO_GESTURE, g_save.play_ticks + 120u, g_gesture.distance);
    }

    EchoEntry* echo = echo_poll(&g_echo, g_save.play_ticks);
    if (echo) {
      push_trace(TRACE_ECHO, (int16_t)echo->subject_id, (int16_t)echo->kind, echo->source_event);
      echo_mark_fired(echo);
    }

    g_save.game = g_game;
    g_save.play_ticks++;
    if (g_save.play_ticks - decay_tick >= 120u) {
      tempo_decay(&g_tempo);
      decay_tick = g_save.play_ticks;
    }
    g_save.checksum = save_checksum(&g_save);
  }

  return 0;
}
