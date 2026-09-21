// ─────────────────────────────────────────────────────────────────────────────
// THE SHOT PLAN — what is on screen, and exactly when.
//
// Every shot is pinned to a CAPTION INDEX rather than to a timestamp, and runs
// until the next shot's caption begins. So the picture changes on the word it
// belongs to, and re-timing the script moves the picture with it instead of
// leaving it behind.
//
// The pairing is the point. When the caption says the gain runs from six to
// sixty-five, the frame is the actual gain row with +6 and +65 printed beside
// the knob. When it says there is a compressor on every one of them, the frame
// is the row running the length of the desk. A claim a viewer can check against
// the picture in front of them is worth three they have to take on trust.
//
// ── THE FOUR B-ROLL BLOCKS ──────────────────────────────────────────────────
//
// Each `broll` segment carries exactly ONE shot. That is deliberate and it is
// the difference between this reel and the MOTU films: there, a generated clip
// was sampled for a second or two and cut away from. Here the clip is the whole
// five seconds, uncut, because it was generated complete and paid for complete.
// One pin, no second pin to end it early.
//
// Until a clip is on disk, `fallback` stands in — always a REAL photograph of
// the desk in the same kind of room the clip is set in, never a studio render.
// The block is fixed at 5.000 s in script.ts either way, so the reel times
// identically with or without the generated footage and the swap is a
// re-render, not a re-edit.
//
// SEVEN KINDS (see components/Staged.tsx):
//   product  a transparent studio render floating in a lit void
//   photo    an opaque photograph — a real room
//   clip     a moving shot, plated over a darkened wash of itself
//   broll    a generated 9:16 clip, full-bleed, played complete
//   panel    a rear panel or other ultra-wide drawing, tracked along
//   detail   a push into one named control on a 4096 px plan
//   stack    two pictures, both complete, never sliced
//   mosaic   three or more as one drifting plane
// ─────────────────────────────────────────────────────────────────────────────

import { MASTER_REGION, MISSING_BROLL, R32, dimFor, type Region } from "./assets.ts";
import type { MoveKind } from "./components/Staged.tsx";
import type { TimedSegment } from "./script.ts";
import type { AccentKey } from "./theme.ts";

type RegionName = keyof typeof R32;

export type ShotSpec =
  | { at: number; kind: "product"; slug: string; move?: MoveKind }
  | { at: number; kind: "photo"; slug: string; move?: MoveKind }
  | { at: number; kind: "clip"; slug: string; from?: number; move?: MoveKind }
  /** A generated 9:16 B-roll, played complete. `fallback` stands in until the
   *  file is on disk. */
  | { at: number; kind: "broll"; slug: string; fallback: ShotSpec; move?: MoveKind }
  | { at: number; kind: "panel"; slug: string }
  | { at: number; kind: "detail"; slug: string; region: RegionName; zoom?: number }
  | { at: number; kind: "stack"; slugs: string[] }
  | { at: number; kind: "mosaic"; slugs: string[]; labels?: string[] };

export type Shot = ShotSpec & {
  segment: string;
  accent: AccentKey;
  seed: number;
  start: number;
  rect?: Region;
  dim?: number;
};

const P32 = "p32-1";

// ═════════════════════════════════════════════════════════════════════════════
// THE 90-SECOND VERTICAL REEL — 30 shots across 84 seconds.
//
// Read down the plan and it is the edit; read the caption index beside each
// shot against script.ts and it is the argument.
// ═════════════════════════════════════════════════════════════════════════════

export const REEL_PLAN: Record<string, ShotSpec[]> = {
  // ── the problem, stated in a room ────────────────────────────────────────
  hook: [
    // "Ten minutes to doors." — a real club, real crowd, the desk in the
    // foreground. The only photograph in the set that already contains the
    // situation the line describes.
    { at: 0, kind: "photo", slug: "p32-7", move: "push" },
    // "The singer wants more of herself." — so the frame is a singer.
    { at: 1, kind: "clip", slug: "of-04-outdoor-band", move: "trackRight" },
    // "that is one knob." — so the frame is the knob, not the desk.
    { at: 2, kind: "detail", slug: P32, region: "gain", zoom: 0.55 },
  ],

  // ── B-ROLL 1 · front of house, at show time ─────────────────────────────
  live: [
    { at: 0, kind: "broll", slug: "broll-01-live-foh", move: "push",
      fallback: { at: 0, kind: "photo", slug: "p32-7", move: "trackLeft" } },
  ],

  // ── the preamp and the EQ ───────────────────────────────────────────────
  sound: [
    { at: 0, kind: "detail", slug: P32, region: "connectors", zoom: 0.80 },
    { at: 1, kind: "detail", slug: P32, region: "gain", zoom: 0.68 },
    // "Quiet enough for a ribbon mic." — a hand actually working the strips.
    { at: 2, kind: "clip", slug: "of-05-console-hands", move: "trackRight" },
    { at: 3, kind: "detail", slug: P32, region: "eq", zoom: 0.95 },
    { at: 4, kind: "detail", slug: P32, region: "midSweep", zoom: 0.70 },
  ],

  // ── B-ROLL 2 · the same desk, a different room ──────────────────────────
  hall: [
    { at: 0, kind: "broll", slug: "broll-02-community-hall", move: "trackLeft",
      fallback: { at: 0, kind: "photo", slug: "p22-10", move: "trackLeft" } },
  ],

  // ── the compressor ──────────────────────────────────────────────────────
  control: [
    { at: 0, kind: "detail", slug: P32, region: "comp", zoom: 1.0 },
    // Pulling back off the same row: one channel, then the whole desk's worth
    // of them. The claim is "every mono channel", so the shot has to widen.
    { at: 1, kind: "detail", slug: P32, region: "comp", zoom: 0.44 },
    { at: 2, kind: "product", slug: "p22-4", move: "orbit" },
  ],

  // ── the effects ─────────────────────────────────────────────────────────
  space: [
    { at: 0, kind: "detail", slug: P32, region: "lexicon", zoom: 0.92 },
    { at: 1, kind: "detail", slug: P32, region: "lexicon", zoom: 0.54 },
    { at: 2, kind: "photo", slug: "p16-8", move: "push" },
  ],

  // ── B-ROLL 3 · the night being recorded ─────────────────────────────────
  studio: [
    { at: 0, kind: "broll", slug: "broll-03-project-studio", move: "push",
      fallback: { at: 0, kind: "photo", slug: "p22-11", move: "push" } },
  ],

  // ── the computer ────────────────────────────────────────────────────────
  connect: [
    { at: 0, kind: "detail", slug: P32, region: "usbC", zoom: 0.70 },
    // "Record the mix while you make it." — the desk and the laptop in one
    // frame, which is the whole claim.
    { at: 1, kind: "clip", slug: "of-02-desk-tracking", move: "push" },
    { at: 2, kind: "photo", slug: "p16-7", move: "trackLeft" },
  ],

  // ── monitoring, talkback and the guitar ─────────────────────────────────
  room: [
    { at: 0, kind: "detail", slug: P32, region: "meter", zoom: 0.90 },
    { at: 1, kind: "detail", slug: P32, region: "talkback", zoom: 0.72 },
    { at: 2, kind: "detail", slug: P32, region: "hiZ", zoom: 0.66 },
  ],

  // ── B-ROLL 4 · set once, trusted ────────────────────────────────────────
  band: [
    { at: 0, kind: "broll", slug: "broll-04-rehearsal-room", move: "orbit",
      fallback: { at: 0, kind: "photo", slug: "p16-8", move: "orbit" } },
  ],

  // ── the four sizes ──────────────────────────────────────────────────────
  scale: [
    { at: 0, kind: "mosaic", slugs: ["p12-3", "p16-2", "p22-4", "p32-3"],
      labels: ["12", "16", "22", "32"] },
    // "The master section never changes." — the official film's own rotation
    // from three-quarter into the full top-down plan, which is the clearest
    // look at the master block in any asset here.
    { at: 1, kind: "clip", slug: "of-03-plan-reveal", move: "push" },
    // The whole argument in one frame: the smallest plan and the largest, both
    // complete, side by side.
    { at: 2, kind: "stack", slugs: ["p12-2", P32] },
  ],

  // ── the close ───────────────────────────────────────────────────────────
  close: [
    { at: 0, kind: "product", slug: "p32-6", move: "pull" },
    { at: 1, kind: "clip", slug: "of-06-studio-seat", move: "push" },
  ],
};

/**
 * Turns the plan into an absolute shot list against the timed script.
 *
 * A shot inherits its start from the caption it is pinned to and its accent
 * from the segment it lives in. The seed is stable across re-times, so a given
 * shot keeps its camera move and its transition when the script is edited.
 *
 * A `broll` whose file is not on disk is swapped for its fallback here, at the
 * one place that knows about MISSING_BROLL, so nothing downstream — staging,
 * transitions, the cue sheet — has to know the difference.
 */
export const buildShots = (
  segments: TimedSegment[],
  plan: Record<string, ShotSpec[]>,
): Shot[] => {
  const out: Shot[] = [];
  let seed = 0;
  for (const seg of segments) {
    const specs = plan[seg.id];
    if (!specs || !specs.length) throw new Error(`segment "${seg.id}" has no shots`);
    for (const raw of specs) {
      const spec: ShotSpec =
        raw.kind === "broll" && MISSING_BROLL.includes(raw.slug)
          ? { ...raw.fallback, at: raw.at }
          : raw;
      const cap = seg.captions[spec.at];
      if (!cap) throw new Error(`segment "${seg.id}" has no caption ${spec.at} for a shot`);
      out.push({
        ...spec,
        segment: seg.id,
        accent: seg.accent,
        seed: seed++,
        start: cap.start,
        // The master block sits in a different place on each plan, because the
        // desks are different widths — so a "master" push resolves per plan
        // rather than reusing the 32's rectangle on the 12.
        rect:
          spec.kind === "detail"
            ? spec.region === "master"
              ? MASTER_REGION[spec.slug] ?? R32.master
              : R32[spec.region]
            : undefined,
        dim: spec.kind === "detail" ? dimFor(spec.region) : undefined,
      });
    }
  }
  return out.sort((a, b) => a.start - b.start);
};
