// ─────────────────────────────────────────────────────────────────────────────
// THEME — Soundcraft Signature Plus series films (12 · 16 · 22 · 32).
//
// The same system as the individual MOTU films: the brush-script key word and
// black sans, the three-tier caption lockup, the 64%-opaque typographic layer
// with a hard drop shadow, and no branding until the (landscape) end screen.
// What is new: one accent per SERIES, because this film moves between three
// families, and the colour is what tells a viewer which one is on screen.
// ─────────────────────────────────────────────────────────────────────────────

export type Canvas = {
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  safe: { left: number; right: number; top: number; bottom: number };
  scale: number;
  portrait: boolean;
};

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** 180.000 s vertical reel, 2160 × 3840 (end screen from 174 s). */
export const REEL: Canvas = {
  width: 2160,
  height: 3840,
  fps: FPS,
  durationInFrames: 5400,
  safe: { left: 132, right: 200, top: 300, bottom: 720 },
  scale: 1,
  portrait: true,
};

/** 300.000 s landscape video, 3840 × 2160 (end screen from 290 s). */
export const VIDEO: Canvas = {
  width: 3840,
  height: 2160,
  fps: FPS,
  durationInFrames: 9000,
  safe: { left: 200, right: 200, top: 120, bottom: 230 },
  scale: 0.72,
  portrait: false,
};

export const safeW = (c: Canvas) => c.width - c.safe.left - c.safe.right;
export const safeH = (c: Canvas) => c.height - c.safe.top - c.safe.bottom;

export const TYPE_OPACITY = 0.64;

export const GROUND = {
  light: "#F2EFE9",
  lightLift: "#FAF8F4",
  lightSink: "#E6E2D9",
  dark: "#07070A",
  darkLift: "#121218",
  darkSink: "#040405",
} as const;

export const INK = {
  onLight: "#16140F",
  onLightSoft: "#4A4740",
  onLightDim: "#A8A399",
  onDark: "#FBFAF7",
  onDarkSoft: "#B9B6AE",
  onDarkDim: "#5E5C57",
} as const;

export type ProductKey = "p12" | "p16" | "p22" | "p32" | "all" | "shared";

// Accents sampled off the Signature Plus desk itself: the red gain caps, the
// gold PFL caps, the teal aux squircles, the blue talkback caps — and a warm
// amber for the series as a whole.
export const ACCENT: Record<ProductKey, { key: string; glow: string; name: string; short: string; tag: string }> = {
  p12: { key: "#B8322B", glow: "#FF6B5E", name: "SIGNATURE PLUS 12", short: "SIG+ 12", tag: "6 MONO · 12 INPUTS" },
  p16: { key: "#B7861C", glow: "#FFC94A", name: "SIGNATURE PLUS 16", short: "SIG+ 16", tag: "10 MONO · 16 INPUTS" },
  p22: { key: "#10857C", glow: "#3FE0D0", name: "SIGNATURE PLUS 22", short: "SIG+ 22", tag: "14 MONO · 22 INPUTS" },
  p32: { key: "#2E5FC9", glow: "#7FA6FF", name: "SIGNATURE PLUS 32", short: "SIG+ 32", tag: "24 MONO · 32 INPUTS" },
  all: { key: "#C0631C", glow: "#FFA95C", name: "SIGNATURE PLUS", short: "SIGNATURE PLUS", tag: "12 · 16 · 22 · 32" },
  shared: { key: "#C0631C", glow: "#FFA95C", name: "SIGNATURE PLUS", short: "SIGNATURE PLUS", tag: "12 · 16 · 22 · 32" },
};

/** What each asset's product code reads as on screen. */
export const PRODUCT_NAME: Record<string, string> = {
  "12": "SIGNATURE PLUS 12", "16": "SIGNATURE PLUS 16", "22": "SIGNATURE PLUS 22", "32": "SIGNATURE PLUS 32",
  all: "SIGNATURE PLUS SERIES",
};

export const FONT = {
  script: "'ReelScript', 'Brush Script MT', cursive",
  display: "'ReelDisplay', 'Archivo Black', 'Helvetica Neue', Arial, sans-serif",
} as const;

export const TYPE = {
  before: { size: 92, track: 5.6 },
  script: { size: 348, track: -2 },
  after: { size: 128, track: 2.2 },
  chapter: { size: 46, track: 6.0 },
  micro: { size: 30, track: 3.0 },
} as const;

// ── Contact — end screens only ─────────────────────────────────────────
export const CONTACT = {
  brand: "SHIVANSH ELECTRONICS",
  site: "www.shivanshelectronics.in",
  whatsapp: ["+91 98316 62458", "+91 89818 07755", "+91 91477 00677"],
  // Stated without any territory, by instruction.
  role: "Shivansh Electronics is the Exclusive Partner of the",
  role2: "Soundcraft Signature Plus Mixer Series",
  social: [
    ["facebook", "facebook.com/@shivanshelectronics.in"],
    ["instagram", "instagram.com/@shivanshelectronics.in"],
    ["youtube", "youtube.com/@shivanshelectronics-in"],
    ["linkedin", "linkedin.com/@shivanshelectronics-in"],
  ],
} as const;
