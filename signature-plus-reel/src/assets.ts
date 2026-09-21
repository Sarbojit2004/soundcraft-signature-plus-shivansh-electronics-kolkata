// ─────────────────────────────────────────────────────────────────────────────
// THE ASSET LIBRARY
//
// Sizes, aspect ratios and alpha bounding boxes are not written here — they are
// measured off the files by scripts/prep_assets.py and imported from
// assets.generated.ts, so a shot cannot claim a shape the file does not have.
// This file adds the things a measurement cannot know: what each picture is OF,
// and where on the top-down plans each control actually lives.
// ─────────────────────────────────────────────────────────────────────────────

export type AssetKind = "render" | "plan" | "panel" | "photo";

export type Asset = {
  slug: string;
  file: string;
  kind: AssetKind;
  /** 12 / 16 / 22 / 32, or 0 for a workflow still. */
  model: number;
  w: number;
  h: number;
  /** Aspect ratio of the CONTENT, not of the canvas. */
  ar: number;
  /** Opaque content as [x0, y0, x1, y1] of the canvas, 0..1. */
  bbox: [number, number, number, number] | number[];
  transparent: boolean;
};

export type Clip = {
  slug: string;
  file: string;
  w: number;
  h: number;
  ar: number;
  dur: number;
  /** "official" = cut from the Soundcraft overview film; "broll" = generated. */
  kind?: "official" | "broll";
  /** For a B-roll, the script segment it is fixed to. */
  seg?: string;
  what?: string;
};

import { ASSETS, CLIPS, MISSING_BROLL, REGION_LUM } from "./assets.generated.ts";
export { ASSETS, CLIPS, MISSING_BROLL, REGION_LUM };

/**
 * How far to pull a detail push down (or up) so every one lands on the same
 * tone.
 *
 * The plans run from a dark channel strip at 0.21 mean luminance to the pale
 * master section at 0.56, and at one fixed brightness the bright end fills the
 * frame with near-white that 64%-opacity white type cannot hold against while
 * the dark end goes muddy. The luminances are measured off the file by
 * scripts/prep_assets.py; this normalises to a ground that white type with a
 * hard shadow reads cleanly on, and is clamped so no region is pushed so far
 * that its own legending stops being readable.
 */
export const dimFor = (region: string): number => {
  const lum = REGION_LUM[region];
  if (!lum) return 0.92;
  return Math.min(1.10, Math.max(0.52, 0.32 / lum));
};

const BY_SLUG = new Map(ASSETS.map((a) => [a.slug, a]));
const CLIP_BY_SLUG = new Map(CLIPS.map((c) => [c.slug, c]));

export const img = (slug: string): Asset => {
  const a = BY_SLUG.get(slug);
  if (!a) throw new Error(`asset "${slug}" is not in the library`);
  return a;
};

export const clip = (slug: string): Clip => {
  const c = CLIP_BY_SLUG.get(slug);
  if (!c) throw new Error(`clip "${slug}" is not in the library`);
  return c;
};

export const imgs = (...slugs: string[]): Asset[] => slugs.map(img);

// ── Detail regions ───────────────────────────────────────────────────────────
//
// Normalised rectangles on the 4096 px top-down plans, read off a grid overlay
// of the Signature Plus 32 and checked against the 12. These are what let a
// shot push into the control the narration is actually naming — the gain row
// while the voice says "six to sixty-five", the magenta compressor row while it
// says "on every one of them" — instead of showing a whole desk and hoping the
// viewer finds it.
//
// Every one of them is a crop of a 4096 px file, so even the tightest lands
// above the frame's own resolution. Nothing is stretched and nothing is sliced.
export type Region = { x: number; y: number; w: number; h: number };

const r = (x0: number, y0: number, x1: number, y1: number): Region => ({
  x: x0, y: y0, w: x1 - x0, h: y1 - y0,
});

/** Regions on p32-1 — the Signature Plus 32 plan. */
export const R32 = {
  connectors:  r(0.050, 0.185, 0.730, 0.295),
  phantom:     r(0.050, 0.280, 0.520, 0.325),
  gain:        r(0.050, 0.297, 0.560, 0.352),
  padHpf:      r(0.050, 0.330, 0.560, 0.372),
  comp:        r(0.050, 0.352, 0.560, 0.402),
  eq:          r(0.050, 0.388, 0.470, 0.525),
  midSweep:    r(0.050, 0.420, 0.470, 0.470),
  aux:         r(0.050, 0.512, 0.560, 0.640),
  fxSend:      r(0.050, 0.625, 0.600, 0.668),
  routing:     r(0.050, 0.680, 0.560, 0.728),
  faders:      r(0.050, 0.725, 0.730, 0.880),
  hiZ:         r(0.575, 0.268, 0.710, 0.322),
  usbC:        r(0.700, 0.278, 0.810, 0.322),
  qr:          r(0.700, 0.328, 0.775, 0.382),
  usbReturn:   r(0.745, 0.318, 0.810, 0.382),
  outJacks:    r(0.790, 0.185, 0.880, 0.305),
  outXlr:      r(0.868, 0.185, 0.945, 0.305),
  monitor:     r(0.790, 0.300, 0.930, 0.430),
  talkback:    r(0.918, 0.300, 0.972, 0.428),
  lexicon:     r(0.788, 0.420, 0.930, 0.520),
  meter:       r(0.918, 0.420, 0.980, 0.520),
  auxMaster:   r(0.838, 0.505, 0.972, 0.675),
  masterFader: r(0.838, 0.715, 0.972, 0.880),
  /** The master section entire — the shot the whole film's argument rests on. */
  master:      r(0.786, 0.180, 0.985, 0.885),
} as const;

/** The same master block on the other three plans, so the four can be compared. */
export const MASTER_REGION: Record<string, Region> = {
  "p32-1": R32.master,
  "p22-1": r(0.560, 0.150, 0.860, 0.900),
  "p22-2": r(0.590, 0.150, 0.840, 0.900),
  "p16-4": r(0.560, 0.140, 0.770, 0.900),
  "p12-2": r(0.545, 0.140, 0.710, 0.905),
};

// ── Named groups ─────────────────────────────────────────────────────────────

export const PLANS = ["p12-2", "p16-4", "p22-2", "p32-1"] as const;

/** The three-quarter studio renders, largest first — the hero tier. */
export const HEROES = {
  m12: ["p12-3", "p12-6", "p12-4", "p12-1", "p12-7"],
  m16: ["p16-2", "p16-3", "p16-6", "p16-1"],
  m22: ["p22-4", "p22-9", "p22-6", "p22-3", "p22-1"],
  m32: ["p32-3", "p32-6", "p32-2", "p32-4"],
} as const;

/** One per model, for the lineup. */
export const LINEUP = ["p12-3", "p16-2", "p22-4", "p32-3"] as const;

export const REARS = ["p12-5", "p16-5", "p22-5", "p22-7", "p22-8", "p32-5"] as const;

/** Manufacturer photography that shipped with the product set. */
export const PRESS = ["p16-7", "p16-8", "p22-10", "p22-11", "p32-7"] as const;
