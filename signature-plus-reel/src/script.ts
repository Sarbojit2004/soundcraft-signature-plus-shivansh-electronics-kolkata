// ─────────────────────────────────────────────────────────────────────────────
// THE SPEECH SCRIPT — single source of truth for the 90 s vertical reel.
//
// One file produces the timestamped read-aloud script AND every burned-in
// caption, so what is said and what is on screen cannot drift apart.
//
// ── WHAT IS DIFFERENT ABOUT THIS REEL ───────────────────────────────────────
//
// The MOTU films in the sibling repositories derived EVERY duration from the
// spoken word count, and took only a fragment of each generated B-roll. This
// reel has one hard constraint those did not: the four Seedance 2.0 clips are
// played COMPLETE — 5.000 s each, 20.000 s in total — because that is what was
// generated and paid for, and a clip cut down to two seconds wastes it.
//
// So the timeline here is a hybrid, and it is honest about which half is which:
//
//   FIXED segments   the four B-roll blocks. Exactly 5.000 s each, non
//                    negotiable, because the asset on disk is exactly that
//                    long. Their captions are distributed ACROSS that window
//                    in proportion to how long each takes to say.
//
//   FLEXIBLE segments  everything else. Written at WPM and then scaled by one
//                    global factor so the whole body lands exactly on
//                    BODY_LEN. The factor is reported by `npm run script`, and
//                    if it ever strays outside 0.9-1.1 the writing is wrong,
//                    not the arithmetic.
//
// The reel is 90.000 s. The end screen takes the last 6.000 s — the only place
// in the whole film where a logo, a website or a phone number appears. That
// leaves exactly 84.000 s of body, of which 20.000 s is B-roll.
//
// ── EVERY TECHNICAL CLAIM WAS READ OFF THE PRODUCT ──────────────────────────
// The 4096 px top-down plans of the Signature Plus 12 / 16 / 22 / 32 in this
// repository show the gain range (+6 to +65), the per-channel compressor
// (−20 to +10, with its own ON switch), the EQ (shelves at 60 Hz and 12 kHz,
// mid swept 150 Hz to 3 kHz), the Lexicon table (banks A and B of sixteen),
// the dual dBu / dBFS meter, the Hi-Z channels, the USB-C 4x4 socket, and —
// the thing the whole argument rests on — that the master section is the SAME
// on the smallest desk as on the largest.
//
// NO COMPETITOR is named, alluded to or implied. NO PRICE appears anywhere.
// NO BRAND MARK, website or telephone number appears in the body — they exist
// only on the end screen, which is a separate component.
// ─────────────────────────────────────────────────────────────────────────────

import type { AccentKey } from "./theme.ts";

/** Words per minute the flexible segments are written to. */
export const WPM = 165;
/** Gap held after each segment so the reader can breathe and the edit can cut. */
export const SEGMENT_GAP = 0.4;
/** Extra beat after a caption that closes a thought. */
export const BEAT = 0.2;

/** The whole film. */
export const FILM_LEN = 90.0;
/** The end screen, and the only branded frames in the reel. */
export const OUTRO_LEN = 6.0;
/** Everything before it. */
export const BODY_LEN = FILM_LEN - OUTRO_LEN; // 84.000 s

export type Caption = {
  /** The phrase, exactly as spoken and exactly as captioned on screen. */
  t: string;
  /** The word the script face carries — the term the sentence turns on. */
  e: string;
  /** How many words this really is when read aloud (numerals expand). */
  sw?: number;
  /** Hold an extra beat after this caption. */
  beat?: boolean;
};

export type Segment = {
  id: string;
  accent: AccentKey;
  /** The chapter name, shown in the top rail. */
  chapter: string;
  /**
   * Seconds this segment MUST occupy, exactly. Set only on the four B-roll
   * blocks, where the picture is an asset of known length rather than
   * something the edit can stretch.
   */
  fixed?: number;
  captions: Caption[];
};

// ═════════════════════════════════════════════════════════════════════════════
// THE 90-SECOND VERTICAL REEL
//
// A reel is watched in a feed with a thumb hovering, so it opens inside a
// situation rather than on a product. Ten minutes before doors is a moment
// every person who would buy this desk has stood in; the rest of the reel is
// that moment being solved, one control at a time, and then answered four
// times over by a real room.
//
// THE FOUR B-ROLL BLOCKS ARE PLACED WHERE THE ARGUMENT NEEDS A ROOM, not at
// the front. Each one arrives immediately after a claim and shows the claim
// being used by somebody:
//
//   live    after "that is one knob"          — the club, at show time
//   hall    after the preamp and the EQ       — the same desk, a different room
//   studio  after the effects                 — the night being recorded
//   band    after monitoring and the Hi-Z     — set once, trusted
// ═════════════════════════════════════════════════════════════════════════════

export const REEL_SEGMENTS: Segment[] = [
  // ── 1. the problem ────────────────────────────────────────────────────────
  {
    id: "hook",
    accent: "shared",
    chapter: "TEN MINUTES TO DOORS",
    captions: [
      { t: "Ten minutes to doors.", e: "Ten minutes" },
      { t: "The singer wants more of herself.", e: "more" },
      { t: "On this desk, that is one knob.", e: "one knob", beat: true },
    ],
  },

  // ── 2. B-ROLL 1 · the club, at show time ──────────────────────────────────
  {
    id: "live",
    accent: "shared",
    chapter: "FRONT OF HOUSE",
    fixed: 5.0,
    captions: [
      { t: "Not a page. Not a menu.", e: "Not a menu" },
      { t: "Your hand already knows where it is.", e: "your hand", beat: true },
    ],
  },

  // ── 3. the preamp and the EQ ──────────────────────────────────────────────
  {
    id: "sound",
    accent: "sound",
    chapter: "THE SOUND",
    captions: [
      { t: "Every mic input runs a Ghost preamp.", e: "Ghost" },
      { t: "Gain from 6 to 65 dB.", e: "65", sw: 8 },
      { t: "Quiet enough for a ribbon mic.", e: "ribbon", beat: true },
      { t: "Then Sapphyre EQ.", e: "Sapphyre", sw: 4 },
      { t: "Three bands, and the mid sweeps by hand.", e: "sweeps", beat: true },
    ],
  },

  // ── 4. B-ROLL 2 · the same desk, a different room ─────────────────────────
  {
    id: "hall",
    accent: "sound",
    chapter: "EVERY ROOM IS DIFFERENT",
    fixed: 5.0,
    captions: [
      { t: "A hall at four is not a club at ten.", e: "a hall", sw: 10 },
      { t: "Same desk. Same reach.", e: "Same reach", beat: true },
    ],
  },

  // ── 5. the compressor ─────────────────────────────────────────────────────
  {
    id: "control",
    accent: "control",
    chapter: "CONTROL",
    captions: [
      { t: "Every mono channel carries a dbx compressor.", e: "dbx" },
      { t: "One knob. One switch.", e: "One knob" },
      { t: "So the loud word stops jumping out of the mix.", e: "jumping", beat: true },
    ],
  },

  // ── 6. the effects ────────────────────────────────────────────────────────
  {
    id: "space",
    accent: "space",
    chapter: "SPACE",
    captions: [
      { t: "Lexicon effects are built into the desk.", e: "Lexicon" },
      { t: "32 of them, on one dial.", e: "32", sw: 7 },
      { t: "Store the one you like. Tap the tempo.", e: "Tap", beat: true },
    ],
  },

  // ── 7. B-ROLL 3 · the night being recorded ────────────────────────────────
  {
    id: "studio",
    accent: "connect",
    chapter: "AFTER THE SHOW",
    fixed: 5.0,
    captions: [
      { t: "The same desk records the night.", e: "records" },
      { t: "Four in, four out, down one cable.", e: "one cable", beat: true },
    ],
  },

  // ── 8. the computer ───────────────────────────────────────────────────────
  {
    id: "connect",
    accent: "connect",
    chapter: "CONNECTED",
    captions: [
      { t: "USB-C, straight into the laptop.", e: "USB-C", sw: 7 },
      { t: "Record the mix while you make it.", e: "Record" },
      { t: "Stream the same night, from the same desk.", e: "Stream", beat: true },
    ],
  },

  // ── 9. monitoring, talkback and the guitar ────────────────────────────────
  {
    id: "room",
    accent: "room",
    chapter: "THE ROOM",
    captions: [
      { t: "The meter reads analog and digital together.", e: "together" },
      { t: "Talkback reaches any output you choose.", e: "Talkback" },
      { t: "Plug a guitar straight in. No DI box.", e: "straight in", sw: 9, beat: true },
    ],
  },

  // ── 10. B-ROLL 4 · set once, trusted ──────────────────────────────────────
  {
    id: "band",
    accent: "room",
    chapter: "SET IT ONCE",
    fixed: 5.0,
    captions: [
      { t: "Set it once. Trust it all night.", e: "Trust it" },
      { t: "Colour-coded caps. Your hand finds the row.", e: "finds the row", beat: true },
    ],
  },

  // ── 11. the four sizes ────────────────────────────────────────────────────
  {
    id: "scale",
    accent: "shared",
    chapter: "ONE FORMAT",
    captions: [
      { t: "12. 16. 22. 32.", e: "32", sw: 8, beat: true },
      { t: "The master section never changes.", e: "never" },
      { t: "The small desk has the big desk's brain.", e: "brain", beat: true },
    ],
  },

  // ── 12. the close ─────────────────────────────────────────────────────────
  // The product, and only the product. Shivansh Electronics is named on the end
  // screen, which is the next six seconds and a different component entirely.
  {
    id: "close",
    accent: "shared",
    chapter: "SIGNATURE PLUS",
    captions: [
      { t: "Soundcraft Signature Plus.", e: "Signature", sw: 4 },
      { t: "Perfected performances.", e: "Perfected", beat: true },
    ],
  },
];

// ── Derived timing ───────────────────────────────────────────────────────────

export const spokenWords = (c: Caption): number => c.sw ?? c.t.trim().split(/\s+/).length;

/** How long a caption takes to say at a given rate, beat included. */
const rawLen = (c: Caption, wpm: number): number =>
  (spokenWords(c) / wpm) * 60 + (c.beat ? BEAT : 0);

export type TimedCaption = Caption & { start: number; end: number; i: number };

export type TimedSegment = Omit<Segment, "captions"> & {
  start: number;
  end: number;
  words: number;
  captions: TimedCaption[];
};

export type Timeline = {
  segments: TimedSegment[];
  total: number;
  words: number;
  /** The single factor applied to every flexible segment to land on BODY_LEN. */
  fit: number;
  /** The rate the flexible half is actually spoken at, after the fit. */
  effectiveWpm: number;
  fixedLen: number;
};

/**
 * Lays every caption on an absolute timeline.
 *
 * Two passes, because the two halves obey different masters:
 *
 *   1. measure  how long the flexible half wants to be at WPM, and how much of
 *               the body the fixed B-roll blocks and the inter-segment breaths
 *               have already spoken for.
 *   2. place    scale the flexible half by whatever single factor makes the
 *               whole body exactly BODY_LEN, then lay everything down. The
 *               fixed blocks are never scaled; their captions are fitted
 *               inside their own 5.000 s instead.
 *
 * Nothing downstream types a frame number. Editing a caption re-times the film,
 * and the four B-roll blocks stay exactly 5.000 s while it does.
 */
export const buildTimeline = (segs: Segment[] = REEL_SEGMENTS, wpm = WPM): Timeline => {
  const gaps = Math.max(0, segs.length - 1) * SEGMENT_GAP;
  const fixedLen = segs.reduce((a, s) => a + (s.fixed ?? 0), 0);

  // ── pass 1: what does the flexible half want? ──
  let wantFlexible = 0;
  for (const seg of segs) {
    if (seg.fixed) continue;
    for (const c of seg.captions) wantFlexible += rawLen(c, wpm);
  }

  const haveFlexible = BODY_LEN - fixedLen - gaps;
  const fit = wantFlexible > 0 ? haveFlexible / wantFlexible : 1;

  // ── pass 2: place ──
  let t = 0;
  let allWords = 0;
  const segments: TimedSegment[] = segs.map((seg) => {
    const start = t;
    let words = 0;
    const lens = seg.captions.map((c) => {
      words += spokenWords(c);
      return rawLen(c, wpm);
    });
    allWords += words;

    // A fixed block fits its captions to its own window; a flexible one takes
    // the global factor.
    const sum = lens.reduce((a, b) => a + b, 0);
    const k = seg.fixed ? (sum > 0 ? seg.fixed / sum : 1) : fit;

    const captions: TimedCaption[] = seg.captions.map((c, i) => {
      const dur = lens[i] * k;
      const cap: TimedCaption = { ...c, i, start: t, end: t + dur };
      t += dur;
      return cap;
    });

    const end = t;
    t += SEGMENT_GAP;
    return { ...seg, start, end, words, captions };
  });

  const total = t - SEGMENT_GAP;
  return {
    segments,
    total,
    words: allWords,
    fit,
    effectiveWpm: wpm / fit,
    fixedLen,
  };
};
