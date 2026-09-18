// ─────────────────────────────────────────────────────────────────────────────
// THE SHOT PLANS — what is on screen, and exactly when.
//
// Every shot is pinned to a CAPTION INDEX rather than to a timestamp, and runs
// until the next shot's caption begins. So the picture changes on the word it
// belongs to, and re-timing the script — or recording it slower than written —
// moves the picture with the voice instead of leaving it behind.
//
// The pairing is the point. When the narration says the gain runs from six to
// sixty-five, the frame is the actual gain row with +6 and +65 printed beside
// the knob. When it says there is a compressor on every one of them, the frame
// is the magenta row running the length of the desk. A claim a viewer can check
// against the picture in front of them is worth three a viewer has to take on
// trust.
// ─────────────────────────────────────────────────────────────────────────────

import { MASTER_REGION, R32, dimFor, type Region } from "./assets.ts";
import type { MoveKind } from "./components/Staged.tsx";
import type { TimedSegment } from "./script.ts";
import type { AccentKey } from "./theme.ts";

type RegionName = keyof typeof R32;

export type ShotSpec =
  /** A transparent studio render, floating whole in a lit void. */
  | { at: number; kind: "product"; slug: string; move?: MoveKind }
  /** An opaque photograph — a real room, or manufacturer photography. */
  | { at: number; kind: "photo"; slug: string; move?: MoveKind }
  /** A moving shot. `from` is the source frame it starts on, of 240. */
  | { at: number; kind: "clip"; slug: string; from?: number; move?: MoveKind }
  /** A rear panel or other ultra-wide drawing, tracked along. */
  | { at: number; kind: "panel"; slug: string }
  /** A push into one named control on a 4096 px plan. */
  | { at: number; kind: "detail"; slug: string; region: RegionName; zoom?: number }
  /** Two pictures, both complete — stacked or side by side, never sliced. */
  | { at: number; kind: "stack"; slugs: string[] }
  /** Three or more as one drifting plane. */
  | { at: number; kind: "mosaic"; slugs: string[]; labels?: string[] };

export type Shot = ShotSpec & {
  segment: string;
  accent: AccentKey;
  seed: number;
  start: number;
  /** The resolved rectangle, for a detail push. */
  rect?: Region;
  /** Brightness multiplier that lands this region on the common tone. */
  dim?: number;
};

const P32 = "p32-1";

// DELIBERATELY UNUSED, after reviewing all twenty delivered clips frame by
// frame. Nothing here is a rendering problem; each one carries an artefact the
// generator left in the picture, and there is enough good material that
// omitting them costs the films nothing:
//
//   broll-03-profile-22   a second, duplicated "soundcraft" wordmark floating
//                         below the console on the white ground
//   broll-14-two-players  the same wordmark artefact appears bottom-centre in
//                         the later frames
//   broll-16-plan-32      a camera and microphone rig is sitting on top of the
//                         console
//   broll-12-family       the four consoles are crammed into the right of the
//                         frame at a size where none of them reads
//
// (broll-18 was generated as an on-air booth rather than the rear panel it was
// prompted for, so it is used as the booth shot it actually is.)

// ═════════════════════════════════════════════════════════════════════════════
// THE 90-SECOND VERTICAL REEL — 31 shots across 82 seconds.
// ═════════════════════════════════════════════════════════════════════════════

export const REEL_PLAN: Record<string, ShotSpec[]> = {
  hook: [
    { at: 0, kind: "clip", slug: "broll-10-live-foh", from: 6, move: "push" },
    { at: 1, kind: "photo", slug: "p32-7", move: "trackLeft" },
    // "that is one knob" — so the frame is the knob.
    { at: 2, kind: "detail", slug: P32, region: "aux", zoom: 0.62 },
    { at: 3, kind: "product", slug: "p32-3", move: "orbit" },
  ],
  sound: [
    { at: 0, kind: "clip", slug: "broll-04-ghost-preamps", from: 10, move: "trackRight" },
    { at: 1, kind: "detail", slug: P32, region: "gain", zoom: 0.68 },
    { at: 2, kind: "clip", slug: "broll-13-band-room", from: 20, move: "pull" },
    { at: 3, kind: "detail", slug: P32, region: "padHpf", zoom: 0.60 },
    { at: 4, kind: "detail", slug: P32, region: "eq", zoom: 0.95 },
    { at: 5, kind: "clip", slug: "broll-01-knob-field", from: 30, move: "trackLeft" },
    { at: 6, kind: "detail", slug: P32, region: "midSweep", zoom: 0.70 },
  ],
  control: [
    { at: 0, kind: "detail", slug: P32, region: "comp", zoom: 1.0 },
    { at: 1, kind: "detail", slug: P32, region: "comp", zoom: 0.44 },
    { at: 2, kind: "product", slug: "p22-4", move: "push" },
    { at: 3, kind: "photo", slug: "p22-10", move: "pull" },
  ],
  space: [
    { at: 0, kind: "clip", slug: "broll-06-lexicon", from: 24, move: "push" },
    { at: 1, kind: "detail", slug: P32, region: "lexicon", zoom: 0.92 },
    { at: 2, kind: "photo", slug: "wf-14-black-box-theatre", move: "trackRight" },
  ],
  connect: [
    { at: 0, kind: "clip", slug: "broll-08-usb-c", from: 30, move: "push" },
    { at: 1, kind: "photo", slug: "wf-12-streaming-the-room", move: "trackLeft" },
    { at: 2, kind: "photo", slug: "wf-15-on-air-booth", move: "pull" },
  ],
  room: [
    { at: 0, kind: "clip", slug: "broll-07-ssm-metering", from: 10, move: "push" },
    { at: 1, kind: "clip", slug: "broll-19-aux-talkback", from: 14, move: "trackRight" },
    { at: 2, kind: "detail", slug: P32, region: "auxMaster", zoom: 0.86 },
    { at: 3, kind: "clip", slug: "broll-15-reaching-back", from: 40, move: "push" },
    { at: 4, kind: "detail", slug: P32, region: "routing", zoom: 0.64 },
  ],
  scale: [
    { at: 0, kind: "mosaic", slugs: ["p12-3", "p16-2", "p22-4", "p32-3"], labels: ["12", "16", "22", "32"] },
    // The whole argument in one frame: the smallest plan and the largest,
    // both complete, side by side. This is the shot the diagonal split used
    // to ruin.
    { at: 1, kind: "stack", slugs: ["p12-2", P32] },
    { at: 2, kind: "product", slug: "p12-3", move: "orbit" },
  ],
  close: [
    { at: 0, kind: "product", slug: "p32-6", move: "pull" },
    { at: 1, kind: "clip", slug: "broll-10-live-foh", from: 150, move: "push" },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// THE FIVE-MINUTE LANDSCAPE EXPLAINER — 86 shots across 296 seconds.
//
// The landscape film gets the workflow photography the reel has no room for:
// twenty rooms the desk actually has to work in, and the b-roll that shows a
// hand on the control the voice is naming.
// ═════════════════════════════════════════════════════════════════════════════

export const VIDEO_PLAN: Record<string, ShotSpec[]> = {
  open: [
    { at: 0, kind: "clip", slug: "broll-10-live-foh", from: 4, move: "push" },
    { at: 1, kind: "photo", slug: "wf-09-between-sets", move: "trackLeft" },
    { at: 2, kind: "photo", slug: "wf-01-foh-club", move: "pull" },
    { at: 3, kind: "clip", slug: "broll-13-band-room", from: 8, move: "trackRight" },
    { at: 4, kind: "photo", slug: "wf-07-soundcheck-monitors", move: "push" },
    { at: 5, kind: "photo", slug: "wf-04-tracking-to-laptop", move: "trackLeft" },
    { at: 6, kind: "clip", slug: "broll-01-knob-field", from: 10, move: "pull" },
    { at: 7, kind: "detail", slug: P32, region: "faders", zoom: 0.82 },
    { at: 8, kind: "product", slug: "p32-3", move: "orbit" },
  ],
  format: [
    { at: 0, kind: "mosaic", slugs: ["p12-3", "p16-2", "p22-4", "p32-3"], labels: ["12", "16", "22", "32"] },
    { at: 1, kind: "product", slug: "p12-3", move: "trackRight" },
    { at: 2, kind: "clip", slug: "broll-02-hero-32", from: 20, move: "push" },
    { at: 3, kind: "stack", slugs: ["p12-2", P32] },
    { at: 4, kind: "detail", slug: P32, region: "master", zoom: 1.0 },
    { at: 5, kind: "detail", slug: "p12-2", region: "master", zoom: 1.0 },
    { at: 6, kind: "detail", slug: P32, region: "lexicon", zoom: 0.96 },
    { at: 7, kind: "product", slug: "p12-6", move: "orbit" },
    { at: 8, kind: "product", slug: "p22-9", move: "pull" },
    { at: 9, kind: "mosaic", slugs: ["p12-2", "p16-4", "p22-2", P32], labels: ["12", "16", "22", "32"] },
    { at: 10, kind: "clip", slug: "broll-09-compact-12", from: 40, move: "push" },
  ],
  sound: [
    { at: 0, kind: "clip", slug: "broll-04-ghost-preamps", from: 4, move: "trackRight" },
    { at: 1, kind: "detail", slug: P32, region: "connectors", zoom: 0.80 },
    { at: 2, kind: "detail", slug: P32, region: "gain", zoom: 0.68 },
    { at: 3, kind: "detail", slug: P32, region: "gain", zoom: 0.34 },
    { at: 4, kind: "clip", slug: "broll-13-band-room", from: 40, move: "push" },
    { at: 5, kind: "photo", slug: "wf-10-teaching-room", move: "trackLeft" },
    { at: 6, kind: "detail", slug: P32, region: "padHpf", zoom: 0.62 },
    { at: 7, kind: "photo", slug: "wf-02-community-hall", move: "push" },
    { at: 8, kind: "detail", slug: P32, region: "padHpf", zoom: 0.38 },
    { at: 9, kind: "clip", slug: "broll-05-plan-16", from: 60, move: "pull" },
    { at: 10, kind: "detail", slug: P32, region: "eq", zoom: 0.95 },
    { at: 11, kind: "detail", slug: P32, region: "eq", zoom: 0.55 },
    { at: 12, kind: "detail", slug: P32, region: "midSweep", zoom: 0.72 },
    { at: 13, kind: "detail", slug: P32, region: "midSweep", zoom: 0.40 },
    { at: 14, kind: "photo", slug: "wf-14-black-box-theatre", move: "trackRight" },
    { at: 15, kind: "clip", slug: "broll-17-plan-12", from: 40, move: "push" },
  ],
  control: [
    { at: 0, kind: "product", slug: "p22-4", move: "orbit" },
    { at: 1, kind: "detail", slug: P32, region: "comp", zoom: 1.0 },
    { at: 2, kind: "detail", slug: P32, region: "comp", zoom: 0.44 },
    { at: 3, kind: "clip", slug: "broll-01-knob-field", from: 120, move: "trackLeft" },
    { at: 4, kind: "detail", slug: P32, region: "comp", zoom: 0.30 },
    { at: 5, kind: "clip", slug: "broll-11-room-daylight", from: 6, move: "push" },
    { at: 6, kind: "photo", slug: "p22-10", move: "trackRight" },
    { at: 7, kind: "clip", slug: "broll-18-rear-panel-32", from: 30, move: "pull" },
    { at: 8, kind: "photo", slug: "p16-8", move: "push" },
    { at: 9, kind: "photo", slug: "wf-11-conference-panel", move: "trackLeft" },
    { at: 10, kind: "photo", slug: "wf-16-two-desks", move: "push" },
    { at: 11, kind: "photo", slug: "p22-11", move: "pull" },
    { at: 12, kind: "detail", slug: P32, region: "connectors", zoom: 0.46 },
    { at: 13, kind: "product", slug: "p32-2", move: "trackRight" },
  ],
  space: [
    { at: 0, kind: "clip", slug: "broll-06-lexicon", from: 8, move: "push" },
    { at: 1, kind: "detail", slug: P32, region: "lexicon", zoom: 0.92 },
    { at: 2, kind: "detail", slug: P32, region: "lexicon", zoom: 0.54 },
    { at: 3, kind: "photo", slug: "wf-06-control-booth", move: "trackLeft" },
    { at: 4, kind: "detail", slug: P32, region: "fxSend", zoom: 0.70 },
    { at: 5, kind: "clip", slug: "broll-06-lexicon", from: 140, move: "pull" },
    { at: 6, kind: "photo", slug: "wf-09-between-sets", move: "push" },
  ],
  room: [
    { at: 0, kind: "photo", slug: "wf-07-soundcheck-monitors", move: "trackRight" },
    { at: 1, kind: "detail", slug: P32, region: "aux", zoom: 0.90 },
    { at: 2, kind: "detail", slug: P32, region: "aux", zoom: 0.46 },
    { at: 3, kind: "photo", slug: "wf-03-outdoor-event", move: "push" },
    { at: 4, kind: "detail", slug: P32, region: "fxSend", zoom: 0.60 },
    { at: 5, kind: "detail", slug: P32, region: "auxMaster", zoom: 0.86 },
    { at: 6, kind: "clip", slug: "broll-19-aux-talkback", from: 6, move: "trackLeft" },
    { at: 7, kind: "detail", slug: P32, region: "talkback", zoom: 0.72 },
    { at: 8, kind: "detail", slug: P32, region: "monitor", zoom: 0.88 },
    { at: 9, kind: "detail", slug: P32, region: "meter", zoom: 0.90 },
    { at: 10, kind: "clip", slug: "broll-07-ssm-metering", from: 20, move: "push" },
    { at: 11, kind: "photo", slug: "wf-18-overhead-mix-position", move: "pull" },
    { at: 12, kind: "detail", slug: P32, region: "routing", zoom: 0.64 },
    { at: 13, kind: "clip", slug: "broll-01-knob-field", from: 180, move: "trackRight" },
  ],
  connect: [
    { at: 0, kind: "panel", slug: "p32-5" },
    { at: 1, kind: "detail", slug: P32, region: "usbC", zoom: 0.70 },
    { at: 2, kind: "clip", slug: "broll-08-usb-c", from: 8, move: "push" },
    { at: 3, kind: "photo", slug: "wf-04-tracking-to-laptop", move: "trackLeft" },
    { at: 4, kind: "photo", slug: "wf-12-streaming-the-room", move: "push" },
    { at: 5, kind: "detail", slug: P32, region: "usbReturn", zoom: 0.72 },
    { at: 6, kind: "detail", slug: P32, region: "hiZ", zoom: 0.66 },
    { at: 7, kind: "photo", slug: "wf-08-project-studio", move: "trackRight" },
    { at: 8, kind: "clip", slug: "broll-15-reaching-back", from: 120, move: "pull" },
  ],
  build: [
    { at: 0, kind: "detail", slug: P32, region: "qr", zoom: 0.62 },
    { at: 1, kind: "photo", slug: "wf-08-project-studio", move: "push" },
    { at: 2, kind: "photo", slug: "wf-20-the-trolley", move: "orbit" },
    // The claim is "it will sit on a shelf beside a laptop", so the frame is
    // the desk and the shelf, both whole, side by side.
    { at: 3, kind: "stack", slugs: ["p12-1", "wf-19-it-fits-the-table"] },
    { at: 4, kind: "product", slug: "p32-4", move: "orbit" },
    { at: 5, kind: "detail", slug: P32, region: "faders", zoom: 0.60 },
    { at: 6, kind: "panel", slug: "p22-7" },
  ],
  which: [
    { at: 0, kind: "mosaic", slugs: ["p12-3", "p16-2", "p22-4", "p32-3"], labels: ["12", "16", "22", "32"] },
    { at: 1, kind: "photo", slug: "wf-17-the-reception", move: "trackLeft" },
    { at: 2, kind: "detail", slug: P32, region: "connectors", zoom: 0.72 },
    { at: 3, kind: "stack", slugs: ["p12-3", "wf-05-podcast-desk"] },
    { at: 4, kind: "stack", slugs: ["p16-2", "wf-02-community-hall"] },
    { at: 5, kind: "stack", slugs: ["p22-4", "wf-07-soundcheck-monitors"] },
    { at: 6, kind: "stack", slugs: ["p32-3", "wf-01-foh-club"] },
    { at: 7, kind: "photo", slug: "p16-7", move: "pull" },
    { at: 8, kind: "detail", slug: P32, region: "faders", zoom: 0.44 },
  ],
  close: [
    { at: 0, kind: "product", slug: "p32-6", move: "orbit" },
    { at: 1, kind: "photo", slug: "wf-13-load-out", move: "push" },
    { at: 2, kind: "photo", slug: "p32-7", move: "trackRight" },
    { at: 3, kind: "mosaic", slugs: ["p12-3", "p16-2", "p22-4", "p32-3"], labels: ["12", "16", "22", "32"] },
    { at: 4, kind: "clip", slug: "broll-20-hero-22", from: 30, move: "pull" },
    { at: 5, kind: "clip", slug: "broll-10-live-foh", from: 170, move: "push" },
  ],
};

/**
 * Turns a plan into an absolute shot list against a timed script.
 *
 * A shot inherits its start from the caption it is pinned to, and its accent
 * from the segment it lives in. The seed is stable across re-times so a given
 * shot keeps its camera move and its transition when the script is edited.
 */
export const buildShots = (
  segments: TimedSegment[],
  plan: Record<string, ShotSpec[]>,
): Shot[] => {
  const out: Shot[] = [];
  let seed = 0;
  for (const seg of segments) {
    const specs = plan[seg.id];
    if (!specs || !specs.length) {
      throw new Error(`segment "${seg.id}" has no shots`);
    }
    for (const spec of specs) {
      const cap = seg.captions[spec.at];
      if (!cap) {
        throw new Error(`segment "${seg.id}" has no caption ${spec.at} for a shot`);
      }
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
