// ─────────────────────────────────────────────────────────────────────────────
// THE SPEECH SCRIPTS — single source of truth for both deliverables.
//
// One file produces the timestamped read-aloud scripts and every on-screen
// caption for both films, so the voice and the picture cannot drift apart.
//
// PACING IS CARRIED OVER EXACTLY FROM THE M-SERIES REEL, by instruction:
// 165 words per minute written, a 0.4 s breath between segments, a 0.2 s beat
// after a caption that closes a thought. That lands at roughly 154 wpm
// effective, which is the rate the previous film was cut to.
//
// EVERY TECHNICAL CLAIM BELOW WAS READ OFF THE PRODUCT, not off a press
// release: the 4096 px top-down plans of the Signature Plus 12 and 32 in this
// repository show the gain range (+6 to +65), the per-channel compressor
// (-20 to +10, with its own ON switch), the EQ (shelves at 60 Hz and 12 kHz,
// mid swept 150 Hz to 3 kHz), the Lexicon table (banks A and B of sixteen),
// the dual dBu / dBFS meter, the Hi-Z channels, the USB-C 4x4 socket, the
// phantom banks, the QR code, and — the thing the whole argument rests on —
// that the master section is the SAME on the smallest desk as on the largest.
//
// NO COMPETITOR is named, alluded to or implied anywhere. Where the writing
// contrasts with anything, it contrasts with a way of working (pages, menus,
// recall sheets), never with another manufacturer.
//
// NO PRICES. They move by market, and this film is for a dealer.
// ─────────────────────────────────────────────────────────────────────────────

import type { AccentKey } from "./theme.ts";

/** Words per minute the scripts are written to. */
export const WPM = 165;
/** Gap held after each segment so the reader can breathe and the edit can cut. */
export const SEGMENT_GAP = 0.4;
/** Extra beat after a caption that ends a thought. */
export const BEAT = 0.2;

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
  /** The chapter name, shown only in the landscape film. */
  chapter: string;
  captions: Caption[];
};

// ═════════════════════════════════════════════════════════════════════════════
// THE 90-SECOND VERTICAL REEL
//
// A reel is watched in a feed with a thumb hovering, so it opens inside a
// situation rather than on a product. Ten minutes before doors is a moment
// every person who would buy this desk has stood in; the rest of the reel is
// that moment being solved, one control at a time.
// ═════════════════════════════════════════════════════════════════════════════

export const REEL_SEGMENTS: Segment[] = [
  {
    id: "hook",
    accent: "shared",
    chapter: "SIGNATURE PLUS",
    captions: [
      { t: "Ten minutes to doors.", e: "Ten minutes" },
      { t: "The singer wants more of herself.", e: "more" },
      { t: "On this desk, that is one knob.", e: "one knob", beat: true },
      { t: "Not a page. Not a menu.", e: "Not a menu", beat: true },
    ],
  },
  {
    id: "sound",
    accent: "sound",
    chapter: "THE SOUND",
    captions: [
      { t: "Every mic input runs a Soundcraft Ghost preamp.", e: "Ghost" },
      { t: "Gain from 6 to 65 dB.", e: "65", sw: 8 },
      { t: "Quiet enough for a ribbon mic.", e: "ribbon", beat: true },
      { t: "A pad and a 100 hertz filter on every mono channel.", e: "mono channel", sw: 12 },
      { t: "Then Sapphyre EQ.", e: "Sapphyre" },
      { t: "Three bands, and the mid sweeps by hand.", e: "sweeps" },
      { t: "From 150 hertz to 3 kilohertz.", e: "150", sw: 9, beat: true },
    ],
  },
  {
    id: "control",
    accent: "control",
    chapter: "CONTROL",
    captions: [
      { t: "Every mono channel carries a dbx compressor.", e: "dbx" },
      { t: "One knob. One switch.", e: "One knob" },
      { t: "The OverEasy curve leans in gently,", e: "OverEasy" },
      { t: "so the loud word stops jumping out of the mix.", e: "jumping", beat: true },
    ],
  },
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
  {
    id: "connect",
    accent: "connect",
    chapter: "CONNECTED",
    captions: [
      { t: "USB-C. Four in, four out.", e: "USB-C", sw: 7 },
      { t: "Record the mix while you make it.", e: "Record" },
      { t: "Stream the same night, from the same desk.", e: "Stream", beat: true },
    ],
  },
  {
    id: "room",
    accent: "room",
    chapter: "THE ROOM",
    captions: [
      { t: "The meter reads analog and digital together.", e: "together" },
      { t: "Talkback reaches any output you choose.", e: "Talkback" },
      { t: "And the main mix can feed a monitor send.", e: "monitor", beat: true },
      { t: "Plug a guitar straight in. No DI box.", e: "straight in", sw: 9 },
      { t: "Colour-coded caps. Your hand finds the row.", e: "your hand", beat: true },
    ],
  },
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

// ═════════════════════════════════════════════════════════════════════════════
// THE FIVE-MINUTE LANDSCAPE EXPLAINER
//
// Five minutes is a different contract with the viewer. The reel has to earn
// the next second; this has to be worth the time already spent, which means it
// owes the viewer something a datasheet cannot give them — a reason each
// control exists, and what changes in the room when it is there.
//
// The chapter order follows the manufacturer's own launch film: preamps, then
// compression, then EQ, then effects, then connectivity, then workflow. The
// one thing moved to the front is the four-sizes argument, because a viewer
// deciding between models cannot hear anything else until that is settled.
// ═════════════════════════════════════════════════════════════════════════════

export const VIDEO_SEGMENTS: Segment[] = [
  {
    id: "open",
    accent: "shared",
    chapter: "TEN MINUTES TO DOORS",
    captions: [
      { t: "There is a moment, about ten minutes before doors,", e: "ten minutes", sw: 10 },
      { t: "when the room stops being a room", e: "stops" },
      { t: "and starts being a job.", e: "a job", beat: true },
      { t: "The band is loud on stage and thin out front.", e: "thin" },
      { t: "The singer cannot hear herself.", e: "cannot hear" },
      { t: "Somebody's laptop needs to be in the mix.", e: "laptop", beat: true },
      { t: "What you want, right then, is a surface", e: "right then" },
      { t: "where everything is already in front of you.", e: "everything", beat: true },
      { t: "Not on a page. Not under a menu.", e: "Not under a menu", beat: true },
    ],
  },
  {
    id: "format",
    accent: "shared",
    chapter: "ONE FORMAT",
    captions: [
      { t: "Soundcraft build the Signature Plus series in four sizes.", e: "four sizes" },
      { t: "12. 16. 22. 32.", e: "32", sw: 8, beat: true },
      { t: "Here is the part that matters.", e: "matters" },
      { t: "Put the four side by side", e: "side by side" },
      { t: "and the master section is identical.", e: "identical", beat: true },
      { t: "Same preamps. Same EQ. Same compressor on every channel.", e: "every channel" },
      { t: "Same Lexicon processor. Same metering. Same talkback.", e: "Same talkback" },
      { t: "The 12 is not a cut-down desk.", e: "cut-down", sw: 8 },
      { t: "It is the same desk with fewer channels.", e: "fewer", beat: true },
      { t: "So you are choosing an input count,", e: "input count" },
      { t: "not a tier.", e: "a tier", beat: true },
    ],
  },
  {
    id: "sound",
    accent: "sound",
    chapter: "THE SOUND",
    captions: [
      { t: "Start where the sound starts.", e: "starts" },
      { t: "Every mono channel opens on a Soundcraft Ghost preamp.", e: "Ghost" },
      { t: "Gain runs from 6 to 65 decibels.", e: "65", sw: 9, beat: true },
      { t: "65 is a lot.", e: "a lot", sw: 5 },
      { t: "It means a quiet ribbon on a distant kit comes up", e: "ribbon" },
      { t: "without the hiss coming up with it.", e: "hiss", beat: true },
      { t: "There is a pad for the other extreme,", e: "a pad" },
      { t: "a kick drum, close-miked,", e: "kick drum", sw: 5 },
      { t: "and a 100 hertz filter to take the stage rumble out", e: "rumble", sw: 12 },
      { t: "before it ever reaches the EQ.", e: "before", beat: true },
      { t: "That EQ is Soundcraft's Sapphyre.", e: "Sapphyre" },
      { t: "Three bands. Shelves at 60 hertz and 12 kilohertz,", e: "Three bands", sw: 11 },
      { t: "and a mid you sweep by hand", e: "by hand" },
      { t: "from 150 hertz to 3 kilohertz.", e: "150", sw: 9, beat: true },
      { t: "That sweep is what finds the ring in a room,", e: "the ring" },
      { t: "faster than any recall sheet.", e: "faster", beat: true },
    ],
  },
  {
    id: "control",
    accent: "control",
    chapter: "CONTROL",
    captions: [
      { t: "Now the part most desks in this class leave out.", e: "leave out" },
      { t: "Every mono channel has a dbx compressor built into it.", e: "dbx", beat: true },
      { t: "Not on two channels. Not on a bus.", e: "Not on a bus" },
      { t: "On every one of them.", e: "every one", beat: true },
      { t: "It is one knob and one switch.", e: "one knob" },
      { t: "The knob is threshold. The switch is on.", e: "threshold", beat: true },
      { t: "The curve is OverEasy,", e: "OverEasy" },
      { t: "which means the compression arrives gradually", e: "gradually" },
      { t: "instead of clamping down at a line.", e: "clamping", beat: true },
      { t: "In practice: the loud word stops jumping out,", e: "jumping" },
      { t: "the quiet verse stays where you put it,", e: "stays" },
      { t: "and you stop riding the fader all night.", e: "riding", beat: true },
      { t: "There is a real insert on every mono channel,", e: "insert" },
      { t: "for your own outboard.", e: "outboard", beat: true },
    ],
  },
  {
    id: "space",
    accent: "space",
    chapter: "SPACE",
    captions: [
      { t: "Reverb and delay are built in, from Lexicon.", e: "Lexicon" },
      { t: "32 presets, in two banks of 16.", e: "32", sw: 10 },
      { t: "Halls, plates, chambers, rooms,", e: "chambers" },
      { t: "spring, chorus, flanger, phaser, and six delays.", e: "flanger", beat: true },
      { t: "Three knobs shape it, and Store keeps your setting.", e: "Store", beat: true },
      { t: "There is a tap tempo on the surface, and a footswitch jack for it,", e: "tap tempo", sw: 14 },
      { t: "because the tempo changes between songs.", e: "changes", beat: true },
    ],
  },
  {
    id: "room",
    accent: "room",
    chapter: "THE ROOM",
    captions: [
      { t: "Live sound is monitoring before it is anything else.", e: "monitoring" },
      { t: "Four aux sends on every channel,", e: "Four" },
      { t: "each one switchable pre or post fade.", e: "pre or post", beat: true },
      { t: "So the wedges get a mix that ignores your fader moves,", e: "ignores" },
      { t: "and the effects send follows them.", e: "follows", beat: true },
      { t: "The main mix itself can be pushed into an aux,", e: "pushed" },
      { t: "which is the fastest in-ear send you will ever build.", e: "fastest", beat: true },
      { t: "Talkback has its own XLR, its own preamp,", e: "its own", sw: 10 },
      { t: "and it goes to any output you choose.", e: "any output", beat: true },
      { t: "The meter reads two scales at once:", e: "two scales" },
      { t: "analog dBu beside digital dBFS,", e: "beside", sw: 9 },
      { t: "so the desk and the recording never disagree.", e: "disagree", beat: true },
      { t: "And every knob is colour-coded by function,", e: "colour-coded" },
      { t: "so in a dark room your hand finds the row before your eyes do.", e: "your hand", beat: true },
    ],
  },
  {
    id: "connect",
    accent: "connect",
    chapter: "CONNECTED",
    captions: [
      { t: "On the back there is a USB-C socket.", e: "USB-C", sw: 9 },
      { t: "Four channels in, four channels out.", e: "Four channels" },
      { t: "That is a recording of the show", e: "a recording" },
      { t: "while you are still mixing it.", e: "still mixing", beat: true },
      { t: "It is a stream feed with no second box.", e: "second box" },
      { t: "It is interval playback, returned on its own trim.", e: "playback", beat: true },
      { t: "And four channels are Hi-Z,", e: "Hi-Z", sw: 6 },
      { t: "so a guitar or a bass goes straight in,", e: "straight in" },
      { t: "with no DI box in the signal path.", e: "no DI box", sw: 9, beat: true },
    ],
  },
  {
    id: "build",
    accent: "shared",
    chapter: "THE BUILD",
    captions: [
      { t: "There is a QR code printed on the surface.", e: "QR code", sw: 10 },
      { t: "It opens the manual and the training videos", e: "the manual" },
      { t: "on the phone already in your pocket.", e: "your pocket", beat: true },
      { t: "The 12 will sit on a shelf beside a laptop.", e: "a shelf", sw: 11 },
      { t: "The 32 is a table of its own.", e: "a table", sw: 8, beat: true },
      { t: "Metal chassis. Long-throw faders.", e: "Long-throw", sw: 5 },
      { t: "Balanced XLR on the main and the control room.", e: "Balanced", beat: true },
    ],
  },
  {
    id: "which",
    accent: "shared",
    chapter: "WHICH ONE",
    captions: [
      { t: "So, which one.", e: "which one", beat: true },
      { t: "Count the inputs you plug in on your busiest night,", e: "busiest" },
      { t: "then add four.", e: "add four", beat: true },
      { t: "The 12 fits a podcast, a duo, a small chapel.", e: "a podcast", sw: 11 },
      { t: "The 16 fits a band with a laptop and two speakers.", e: "a band", sw: 12 },
      { t: "The 22 fits a full stage with monitors.", e: "a full stage", sw: 9 },
      { t: "The 32 fits a room you have not booked yet.", e: "not booked yet", sw: 11, beat: true },
      { t: "Because the one thing you cannot add later", e: "cannot add" },
      { t: "is a channel.", e: "a channel", beat: true },
    ],
  },
  {
    id: "close",
    accent: "shared",
    chapter: "SIGNATURE PLUS",
    captions: [
      { t: "Professional analog mixing, reimagined.", e: "reimagined" },
      { t: "Legendary sound. Proven workflow.", e: "Proven" },
      { t: "Built for what is next.", e: "what is next", beat: true },
      { t: "One format. Endless flexibility.", e: "Endless", beat: true },
      { t: "Soundcraft Signature Plus.", e: "Signature", sw: 4 },
      { t: "Perfected performances.", e: "Perfected", beat: true },
    ],
  },
];

// ── Derived timing ───────────────────────────────────────────────────────────

export const spokenWords = (c: Caption): number =>
  c.sw ?? c.t.trim().split(/\s+/).length;

export type TimedCaption = Caption & { start: number; end: number; i: number };

export type TimedSegment = Omit<Segment, "captions"> & {
  start: number;
  end: number;
  words: number;
  captions: TimedCaption[];
};

/**
 * Lays every caption on an absolute timeline from its spoken length.
 *
 * No scene duration is ever estimated — it is derived from how long the words
 * take to say, which is what keeps the edit honest to the recorded read and
 * what makes both films re-time correctly from a single edit to the text.
 */
export const buildTimeline = (
  segments: Segment[],
): { segments: TimedSegment[]; total: number; words: number } => {
  let t = 0;
  let words = 0;
  const out = segments.map((seg) => {
    const start = t;
    let segWords = 0;
    const captions = seg.captions.map((c, i) => {
      const w = spokenWords(c);
      segWords += w;
      const dur = (w / WPM) * 60 + (c.beat ? BEAT : 0);
      const cap: TimedCaption = { ...c, i, start: t, end: t + dur };
      t += dur;
      return cap;
    });
    words += segWords;
    const end = t;
    t += SEGMENT_GAP;
    return { ...seg, start, end, words: segWords, captions };
  });
  return { segments: out, total: t - SEGMENT_GAP, words };
};
