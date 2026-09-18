// ─────────────────────────────────────────────────────────────────────────────
// SHOT PLACEMENT AND THE CUE SHEET
//
// Both used to live inside Film.tsx. They are out here because the sound is
// also delivered as a stem — a standalone file carrying the whole transition
// layer at the exact positions the film plays it — and a stem rebuilt from a
// second copy of this logic would drift from the film the first time either
// copy was touched. One implementation feeds the renderer and the stem build.
// ─────────────────────────────────────────────────────────────────────────────

import { buildTimeline, type TimedSegment } from "./script.ts";
import { buildShots, type Shot } from "./shots.ts";
import { TRANS_CUE, transitionFor, type TransitionKind } from "./components/transition-plan.ts";
import type { DemoKind, FilmData } from "./Film.tsx";

export type Placed = Shot & { trans: TransitionKind; from: number; to: number };

/**
 * Each shot runs until the NEXT one starts — not until its own caption ends.
 * The difference is the breath between chapters, which would otherwise be a
 * hole in the picture; here the outgoing shot holds through it while the
 * narration takes a breath.
 */
export const placeShots = (shots: Shot[], outroAt: number): Placed[] =>
  shots.map((s, i) => {
    const next = shots[i + 1];
    const firstOfSeg = i === 0 || shots[i - 1].segment !== s.segment;
    return {
      ...s,
      trans: transitionFor(s.seed, firstOfSeg, i === 0),
      from: s.start,
      to: next ? next.start : outroAt + 0.7,
    };
  });

export type Cue = { at: number; cue: string };

/** Everything the transition layer plays, derived rather than typed. */
export const buildCues = (
  segments: TimedSegment[],
  placed: Placed[],
  demos: Record<string, { from: number; kind: DemoKind }[]>,
  outroAt: number,
  fps: number,
): Cue[] => {
  const cues: Cue[] = [];

  // One cue under every shot change. The move and the sound are chosen
  // together, so a whip pan is always an air pass and a wipe is always a snap.
  for (const s of placed) cues.push({ at: Math.max(0, s.from - 0.06), cue: TRANS_CUE[s.trans] });

  for (const seg of segments) {
    // A short riser into each chapter, ahead of the first word.
    cues.push({ at: Math.max(0, seg.start - 0.42), cue: "riser-short" });
    // A near-subliminal mark where a thought lands.
    for (const c of seg.captions) if (c.beat) cues.push({ at: c.start + 0.04, cue: "tick-tiny" });
    // The demonstratives that COUNT — the effect table filling, the four
    // consoles arriving — get one blip per item, locked to the same frames the
    // graphic uses. It is the only place in either film where a picture and a
    // sound are tied frame for frame.
    for (const d of demos[seg.id] ?? []) {
      const at = seg.captions[d.from]?.start ?? seg.start;
      if (d.kind === "ladder") for (let i = 0; i < 4; i++) cues.push({ at: at + (6 + i * 7) / fps, cue: "blip-one" });
      if (d.kind === "fx") for (let i = 0; i < 8; i++) cues.push({ at: at + (6 + i * 6.4) / fps, cue: "blip-one" });
    }
  }

  cues.push({ at: outroAt - 0.25, cue: "outro-bloom" });
  return cues.sort((a, b) => a.at - b.at);
};

/** The whole sheet for one film, for the renderer and for the stem build. */
export const sheetFor = (data: FilmData, fps: number) => {
  const { segments } = buildTimeline(data.segments);
  const shots = buildShots(segments, data.plan);
  const placed = placeShots(shots, data.outroAt);
  return { segments, shots, placed, cues: buildCues(segments, placed, data.demos, data.outroAt, fps) };
};
