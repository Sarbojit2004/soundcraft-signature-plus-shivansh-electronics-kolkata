// ─────────────────────────────────────────────────────────────────────────────
// THE TWO DELIVERABLES, assembled.
//
// Durations are DERIVED, never typed: the script's own length decides when the
// narration ends, the outro is a fixed eight seconds after it, and the
// composition is exactly that long. Editing a caption re-times the film.
// ─────────────────────────────────────────────────────────────────────────────

import { REEL_SEGMENTS, VIDEO_SEGMENTS, buildTimeline } from "./script.ts";
import { REEL_PLAN, VIDEO_PLAN } from "./shots.ts";
import type { DemoKind, FilmData } from "./Film.tsx";

/** The end screen: eight seconds, once, at the very end of both films. */
export const OUTRO_LEN = 8.0;
/** A breath between the last word and the end screen taking the frame. */
const TAIL = 0.45;
const FPS = 30;

const assemble = (
  segments: typeof REEL_SEGMENTS,
  plan: typeof REEL_PLAN,
  chips: Record<string, string[]>,
  demos: Record<string, { from: number; kind: DemoKind }[]>,
): FilmData => {
  const { total } = buildTimeline(segments);
  const outroAt = Math.round((total + TAIL) * FPS) / FPS;
  return {
    segments,
    plan,
    chips,
    demos,
    outroAt,
    durationInFrames: Math.round((outroAt + OUTRO_LEN) * FPS),
  };
};

// ── the extra facts the voice does not have time to say ──────────────────────
//
// Deliberately NOT a restatement of the narration: every chip carries something
// the voice never says, so a viewer reading the screen and a viewer listening
// come away with different halves of the same datasheet. All of it was read off
// the plan views. No competitor is named or implied anywhere.

const REEL_CHIPS: Record<string, string[]> = {
  hook: [],
  sound: ["INSERT ON EVERY MONO CHANNEL", "48V PHANTOM ON THE MIC INPUTS", "±15 dB ON ALL THREE BANDS"],
  control: ["THRESHOLD −20 TO +10 dB", "ON SWITCH PER CHANNEL"],
  space: ["BANK A · 16 REVERBS", "BANK B · 16 MODULATIONS", "FX MUTE FOOTSWITCH JACK"],
  connect: ["RETURNS ON 1-2 AND 3-4", "±20 dB RETURN TRIM"],
  room: ["4 AUX · 4 GROUPS", "DIM AND SUM ON BOTH", "TALKBACK XLR, ITS OWN PREAMP"],
  scale: ["MIX AND C/RM ON XLR", "THE SAME MASTER ON ALL FOUR"],
  close: [],
};

const REEL_DEMOS: Record<string, { from: number; kind: DemoKind }[]> = {
  sound: [{ from: 1, kind: "gain" }, { from: 4, kind: "eq" }],
  control: [{ from: 2, kind: "comp" }],
  space: [{ from: 1, kind: "fx" }],
  connect: [{ from: 0, kind: "usb" }],
  room: [{ from: 0, kind: "meter" }, { from: 2, kind: "aux" }],
  scale: [{ from: 0, kind: "ladder" }],
};

const VIDEO_CHIPS: Record<string, string[]> = {
  open: [],
  format: ["THE SAME MASTER SECTION ON ALL FOUR", "4 AUX · 4 GROUPS ON EVERY MODEL"],
  sound: [
    "SOUNDCRAFT GHOST MIC PREAMPS",
    "INSERT ON EVERY MONO CHANNEL",
    "48V PHANTOM ON THE MIC INPUTS",
    "PAD AND 100 Hz ON EVERY CHANNEL",
    "±15 dB ON ALL THREE BANDS",
  ],
  control: [
    "dbx OverEasy ON EVERY MONO CHANNEL",
    "THRESHOLD −20 TO +10 dB",
    "ON SWITCH PER CHANNEL",
    "A TRUE INSERT POINT, NOT A SEND",
  ],
  space: [
    "LEXICON HARDWARE PROCESSOR",
    "BANK A · 16 REVERBS",
    "BANK B · 16 MODULATIONS",
    "STORE · TAP TEMPO",
    "FX MUTE FOOTSWITCH JACK",
  ],
  room: [
    "4 AUX SENDS, PRE OR POST FADE",
    "MIX → A1 … A4",
    "TALKBACK XLR WITH ITS OWN PREAMP",
    "DIM AND SUM ON PHONES AND C/RM",
    "dBu +20…−24 · dBFS 0…−44",
  ],
  connect: ["USB-C · 4 IN / 4 OUT", "RETURNS ON 1-2 AND 3-4", "±20 dB RETURN TRIM", "Hi-Z ON FOUR CHANNELS"],
  build: ["QR CODE TO MANUAL AND TRAINING", "LONG-THROW FADERS", "MIX AND C/RM ON BALANCED XLR"],
  which: ["ONE FORMAT · FOUR SIZES", "12 · 16 · 22 · 32"],
  close: [],
};

const VIDEO_DEMOS: Record<string, { from: number; kind: DemoKind }[]> = {
  format: [{ from: 3, kind: "ladder" }],
  sound: [{ from: 2, kind: "gain" }, { from: 10, kind: "eq" }],
  control: [{ from: 1, kind: "comp" }],
  space: [{ from: 1, kind: "fx" }],
  room: [{ from: 1, kind: "aux" }, { from: 9, kind: "meter" }],
  connect: [{ from: 0, kind: "usb" }],
  which: [{ from: 0, kind: "ladder" }],
};

export const REEL: FilmData = assemble(REEL_SEGMENTS, REEL_PLAN, REEL_CHIPS, REEL_DEMOS);
export const EXPLAINER: FilmData = assemble(VIDEO_SEGMENTS, VIDEO_PLAN, VIDEO_CHIPS, VIDEO_DEMOS);
