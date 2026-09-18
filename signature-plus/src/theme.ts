// ─────────────────────────────────────────────────────────────────────────────
// THEME — the design system shared by both Soundcraft Signature Plus films.
//
// TWO FORMATS, ONE CODEBASE. This project renders a 2160 x 3840 vertical reel
// and a 3840 x 2160 landscape explainer from the same components. Everything
// below that could differ between them is expressed per format and resolved at
// render time from the composition's own dimensions, so neither film can drift
// away from the other's look, and a change to the caption lockup lands in both.
//
// WHAT IS CARRIED OVER FROM THE M-SERIES REEL, deliberately and by instruction:
//
//   * the type pairing — a heavy brush script carrying ONE key word, a black
//     geometric sans carrying the rest
//   * the three-tier caption lockup, split at that key word
//   * TYPE_OPACITY: the entire typographic layer at 64% (36% transparent),
//     applied once by the film's overlay layer so nothing can drift
//   * legibility bought back with a hard tight shadow rather than a scrim
//   * no branding of any kind until the outro
//   * full-bleed imagery: nothing is letterboxed, no ground shows through
//
// WHAT CHANGES FOR THIS PRODUCT:
//
//   1. THE ACCENT PALETTE IS TAKEN OFF THE DESK ITSELF. The M-Series needed
//      three hues because it had three physically identical products and
//      colour was the only thing telling a viewer which one was on screen.
//      Here all four consoles ARE the same desk — that is the film's whole
//      argument — so colour cannot mean "which model". It means "which part of
//      the desk", and every hue below was sampled out of the 4096 px plan view
//      of the Signature Plus 32: the red gain caps, the gold PFL caps, the navy
//      Lexicon panel, the teal aux squircles, the blue talkback caps.
//
//   2. NO REGION IN THE OUTRO. Shivansh Electronics is the exclusive partner
//      for the Signature Plus series, stated without a territory.
// ─────────────────────────────────────────────────────────────────────────────

export type FormatId = "reel" | "video";

export type Format = {
  id: FormatId;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  portrait: boolean;
  /** Where things that MUST be read are allowed to live. */
  safe: { left: number; right: number; top: number; bottom: number; w: number; h: number };
  /** Type sizes, set per format rather than scaled from one another. */
  type: {
    before: { size: number; track: number };
    script: { size: number; track: number };
    after: { size: number; track: number };
    chapter: { size: number; track: number };
    micro: { size: number; track: number };
    body: { size: number; track: number };
  };
  /** Where the photographic plate is centred, as a fraction of frame height. */
  plateY: number;
  /** How far past the frame width the plate hangs, for lateral camera room. */
  overhang: number;
};

const box = (left: number, right: number, top: number, bottom: number, W: number, H: number) => ({
  left, right, top, bottom, w: W - left - right, h: H - top - bottom,
});

// ── The vertical reel ────────────────────────────────────────────────────────
// The safe box is the INTERSECTION of the three vertical platforms' overlays
// (Reels, Shorts, TikTok) rather than any one of them, so a single master is
// safe everywhere without a per-platform re-render:
//   top     status bar + platform header
//   bottom  caption block, audio/CTA strip and comment bar — the largest
//           intrusion, and the reason text never sits low
//   right   the vertical action rail, which costs the most width
const REEL: Format = {
  id: "reel",
  width: 2160,
  height: 3840,
  fps: 30,
  durationInFrames: 2700, // 90.000 s
  portrait: true,
  safe: box(132, 268, 300, 720, 2160, 3840),
  type: {
    before: { size: 92, track: 5.6 },
    script: { size: 348, track: -2 },
    after: { size: 128, track: 2.2 },
    chapter: { size: 46, track: 6.0 },
    micro: { size: 30, track: 3.0 },
    body: { size: 52, track: 1.4 },
  },
  plateY: 0.46,
  overhang: 1.14,
};

// ── The landscape explainer ──────────────────────────────────────────────────
// A 16:9 frame has no action rail and no caption block; the only reliable
// intrusion is the player's own control strip along the bottom. But the frame
// is also only 2160 px tall, so the caption lockup has roughly a third of the
// vertical room it has in the reel — which is why the type is set smaller here
// rather than scaled down from the reel's numbers by one multiplier.
const VIDEO_16_9: Format = {
  id: "video",
  width: 3840,
  height: 2160,
  fps: 30,
  durationInFrames: 9000, // 300.000 s
  portrait: false,
  safe: box(220, 220, 150, 210, 3840, 2160),
  type: {
    before: { size: 60, track: 4.8 },
    script: { size: 212, track: -2 },
    after: { size: 86, track: 2.0 },
    chapter: { size: 38, track: 5.2 },
    micro: { size: 26, track: 2.6 },
    body: { size: 40, track: 1.2 },
  },
  plateY: 0.5,
  overhang: 1.10,
};

export const FORMATS: Record<FormatId, Format> = { reel: REEL, video: VIDEO_16_9 };

/** Resolve the format from a composition's own dimensions. */
export const formatFor = (width: number, height: number): Format =>
  height >= width ? REEL : VIDEO_16_9;

export const secAt = (fps: number) => (s: number) => Math.round(s * fps);

/** How opaque the caption lockup is over the picture. 0.64 = 36% transparent. */
export const TYPE_OPACITY = 0.64;

// ── Grounds ──────────────────────────────────────────────────────────────────
// Only ever seen at the very edge of a bleed, behind a transition, or on the
// outro — but still defined, because a frame must never flash white.
export const GROUND = {
  light: "#F0EEEA",
  lightLift: "#FAF9F7",
  lightSink: "#E2DFD9",
  lightLine: "rgba(20,22,26,0.13)",

  dark: "#090A0C",
  darkLift: "#14161A",
  darkSink: "#040405",
  darkLine: "rgba(255,255,255,0.10)",
} as const;

export const INK = {
  onLight: "#141820",
  onLightSoft: "#474C55",
  onLightDim: "#A2A6AD",
  onDark: "#F7F9FB",
  onDarkSoft: "#B4B9C0",
  onDarkDim: "#5B6068",
} as const;

// ── Accent: one hue per part of the desk ─────────────────────────────────────
// Every value was sampled from the 4096 px top-down plan of the Signature Plus
// 32. Nothing here is invented, which is why the graphics sit on the product
// instead of beside it.
export type AccentKey =
  | "shared"   // hook, scale and close — the chassis itself
  | "sound"    // Ghost preamps + Sapphyre EQ  — the red gain caps
  | "control"  // dbx OverEasy compression     — the gold PFL caps
  | "space"    // Lexicon effects              — the navy FX panel
  | "connect"  // USB-C and the computer       — the teal aux squircles
  | "room";    // monitoring and talkback      — the blue T/B caps

export const ACCENT: Record<AccentKey, { key: string; glow: string; label: string }> = {
  shared:  { key: "#1A1F29", glow: "#E8EFF6", label: "SIGNATURE PLUS" },
  sound:   { key: "#B23A32", glow: "#FF7A5E", label: "THE SOUND" },
  control: { key: "#B08415", glow: "#FFC940", label: "CONTROL" },
  space:   { key: "#23507E", glow: "#5CB0EE", label: "SPACE" },
  connect: { key: "#0A7A66", glow: "#2FD8AE", label: "CONNECTED" },
  room:    { key: "#1B5C9E", glow: "#6FBCFF", label: "THE ROOM" },
};

// ── Type ─────────────────────────────────────────────────────────────────────
export const FONT = {
  script: "'ReelScript', 'Brush Script MT', cursive",
  display: "'ReelDisplay', 'Archivo Black', 'Helvetica Neue', Arial, sans-serif",
} as const;

// ── Contact — outro only ─────────────────────────────────────────────────────
export const CONTACT = {
  brand: "SHIVANSH ELECTRONICS",
  city: "KOLKATA",
  site: "www.shivanshelectronics.in",
  whatsapp: ["+91 98316 62458", "+91 89818 07755", "+91 91477 00677"],
  // Stated without a territory, by instruction.
  role: "Exclusive Partner for the Soundcraft",
  role2: "Signature Plus Mixer Series",
} as const;

/** The four consoles, in the order the manufacturer lists them. */
// Mono strips and total inputs, counted off the plan views: the mono channels
// carry the Ghost preamp, the dbx compressor, the insert and the Hi-Z switch;
// the rest of the count is stereo pairs. The last four mono channels are the
// Hi-Z ones on every model.
export const MODELS = [
  { name: "SIGNATURE PLUS 12", short: "12", mono: 6,  total: 12 },
  { name: "SIGNATURE PLUS 16", short: "16", mono: 10, total: 16 },
  { name: "SIGNATURE PLUS 22", short: "22", mono: 14, total: 22 },
  { name: "SIGNATURE PLUS 32", short: "32", mono: 24, total: 32 },
] as const;
