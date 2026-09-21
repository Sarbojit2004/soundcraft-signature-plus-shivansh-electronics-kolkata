// ─────────────────────────────────────────────────────────────────────────────
// THE REEL, ASSEMBLED.
//
// One deliverable: a 90.000 s vertical reel at 2160 x 3840.
//
// Nothing below is a typed frame number. script.ts lays the whole body on an
// absolute timeline — the four B-roll blocks fixed at 5.000 s, everything else
// scaled by one global factor — and lands it exactly on BODY_LEN. The end
// screen takes the remaining OUTRO_LEN, and the composition is exactly the sum.
// Editing a caption re-times the film; the four B-roll blocks stay 5.000 s
// while it does.
// ─────────────────────────────────────────────────────────────────────────────

import { BODY_LEN, FILM_LEN, OUTRO_LEN, REEL_SEGMENTS, buildTimeline } from "./script.ts";
import { REEL_PLAN } from "./shots.ts";
import type { DemoKind, FilmData } from "./Film.tsx";

const FPS = 30;

export { OUTRO_LEN };

// ── the extra facts the captions do not have time to carry ───────────────────
//
// Deliberately NOT a restatement of the caption on screen: every chip carries
// something the narration never says, so a viewer reading the panel and a
// viewer reading the caption come away with different halves of the same
// datasheet. All of it was read off the 4096 px plan views.
//
// The four B-roll blocks carry NO chips. Those five seconds belong to the room
// — a spec panel over somebody's hands on a desk is the one place in this reel
// where the technical layer would be fighting the picture instead of annotating
// it.
const REEL_CHIPS: Record<string, string[]> = {
  hook: [],
  live: [],
  sound: ["SOUNDCRAFT GHOST MIC PREAMPS", "48V PHANTOM ON THE MIC INPUTS", "±15 dB ON ALL THREE BANDS"],
  hall: [],
  control: ["dbx OverEasy ON EVERY MONO CHANNEL", "THRESHOLD −20 TO +10 dB", "A TRUE INSERT POINT, NOT A SEND"],
  space: ["BANK A · 16 REVERBS", "BANK B · 16 MODULATIONS", "STORE · TAP TEMPO"],
  studio: [],
  connect: ["USB-C · 4 IN / 4 OUT", "RETURNS ON 1-2 AND 3-4", "±20 dB RETURN TRIM"],
  room: ["4 AUX · 4 GROUPS", "TALKBACK XLR, ITS OWN PREAMP", "Hi-Z ON FOUR CHANNELS"],
  band: [],
  scale: ["ONE FORMAT · FOUR SIZES", "THE SAME MASTER ON ALL FOUR"],
  close: [],
};

// ── which demonstrative is in force, and from which caption ──────────────────
// Each one is pinned to the caption index that makes its claim, so the graphic
// arrives on the word rather than near it.
const REEL_DEMOS: Record<string, { from: number; kind: DemoKind }[]> = {
  sound: [{ from: 1, kind: "gain" }, { from: 3, kind: "eq" }],
  control: [{ from: 0, kind: "comp" }],
  space: [{ from: 1, kind: "fx" }],
  connect: [{ from: 0, kind: "usb" }],
  room: [{ from: 0, kind: "meter" }, { from: 1, kind: "aux" }],
  scale: [{ from: 0, kind: "ladder" }],
};

const TL = buildTimeline(REEL_SEGMENTS);

/** What `npm run script` prints, and what the README quotes. */
export const REEL_TIMELINE = TL;

export const REEL: FilmData = {
  segments: REEL_SEGMENTS,
  plan: REEL_PLAN,
  chips: REEL_CHIPS,
  demos: REEL_DEMOS,
  // The end screen takes the frame the instant the body ends. There is no tail
  // to add: BODY_LEN already includes the 0.4 s breath after the close.
  outroAt: BODY_LEN,
  durationInFrames: Math.round(FILM_LEN * FPS),
};
