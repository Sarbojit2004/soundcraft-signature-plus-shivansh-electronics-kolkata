import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, FONT, GROUND, TYPE_OPACITY, formatFor, type AccentKey } from "./theme.ts";
import { buildTimeline, type Segment } from "./script.ts";
import { buildShots, type Shot, type ShotSpec } from "./shots.ts";
import { clip as getClip, img, imgs } from "./assets.ts";
import { Caption } from "./components/Caption.tsx";
import {
  BleedShot,
  ClipBleed,
  DetailZoom,
  MosaicBleed,
  PanelPlate,
  ProductPlate,
  StackBleed,
} from "./components/Staged.tsx";
import { TRANS, TRANS_CUE, TransitionIn, transitionFor, type TransitionKind } from "./components/Transitions.tsx";
import {
  AuxMatrix,
  ChannelLadder,
  ChapterTag,
  CompCurve,
  EqCurve,
  FxTable,
  GainDial,
  MeterPair,
  ProgressRule,
  SpecChips,
  UsbPath,
} from "./components/Demonstratives.tsx";
import { Outro } from "./components/Outro.tsx";

// ─────────────────────────────────────────────────────────────────────────────
// THE FILM — one component, rendered at two shapes.
//
// Three data structures drive everything and there is not one hand-typed frame
// number below:
//
//   script.ts  what is said, and when   — spoken word count sets every duration
//   shots.ts   what is shown, and when  — each shot pinned to its caption
//   this file  how it is staged, transitioned, annotated and mixed
//
// THE LAYER STACK, bottom to top:
//
//   1. picture   full-bleed imagery under a camera move. Overlapping sequences,
//                so every shot change is a transition rather than a cut.
//   2. scrim     a gradient across the top of the frame only. The overlay there
//                is dense technical text at 64% opacity; without it the block
//                would sit on whatever tone the picture happens to have. It is
//                kept to the top, where the subject almost never is.
//   3. overlay   everything typographic — the caption lockup, the chapter tag,
//                the demonstratives, the spec chips. This ENTIRE layer is held
//                at TYPE_OPACITY, which is where the brief's "36% transparent"
//                lives: one multiplier, applied once, so nothing can drift.
//   4. outro     the end screen, and the only place any brand mark appears.
//
// WHAT DIFFERS BETWEEN THE TWO SHAPES is layout, not content. The vertical
// frame stacks the technical block above the caption because it has height to
// spare and no width; the landscape frame puts it in the right third because it
// has width to spare and no height. Both read the same data.
// ─────────────────────────────────────────────────────────────────────────────

export type FilmData = {
  segments: Segment[];
  plan: Record<string, ShotSpec[]>;
  chips: Record<string, string[]>;
  /** Which demonstrative appears in a segment, and from which caption. */
  demos: Record<string, { from: number; kind: DemoKind }[]>;
  outroAt: number;
  durationInFrames: number;
};

export type DemoKind = "gain" | "eq" | "comp" | "fx" | "meter" | "usb" | "aux" | "ladder";

// ── staging ──────────────────────────────────────────────────────────────────

const Stage: React.FC<{ shot: Shot; f: number; dur: number }> = ({ shot, f, dur }) => {
  const p = dur > 0 ? Math.min(1, Math.max(0, f / dur)) : 0;
  const move = "move" in shot ? shot.move : undefined;
  const common = { accent: shot.accent, p, f, seed: shot.seed, move };
  switch (shot.kind) {
    case "product":
      return <ProductPlate asset={img(shot.slug)} {...common} />;
    case "photo":
      return <BleedShot asset={img(shot.slug)} {...common} />;
    case "clip":
      return <ClipBleed clip={getClip(shot.slug)} startFrom={shot.from ?? 0} {...common} />;
    case "panel":
      return <PanelPlate asset={img(shot.slug)} {...common} />;
    case "detail":
      return <DetailZoom asset={img(shot.slug)} region={shot.rect!} zoom={shot.zoom} dim={shot.dim} {...common} />;
    case "stack":
      return <StackBleed assets={imgs(...shot.slugs)} {...common} />;
    case "mosaic":
    default:
      return <MosaicBleed assets={imgs(...shot.slugs)} labels={shot.labels} {...common} />;
  }
};

type Placed = Shot & { trans: TransitionKind; from: number; to: number };

const ShotLayer: React.FC<{ shot: Placed }> = ({ shot }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = Math.max(1, Math.round((shot.to - shot.from) * fps));
  return (
    <TransitionIn kind={shot.trans} f={f} accent={ACCENT[shot.accent].glow}>
      <Stage shot={shot} f={f} dur={dur} />
    </TransitionIn>
  );
};

// ── the technical block ──────────────────────────────────────────────────────

const Demo: React.FC<{ kind: DemoKind; accent: AccentKey; f: number; width: number }> = ({ kind, accent, f, width }) => {
  const props = { accent, f, width };
  switch (kind) {
    case "gain": return <GainDial {...props} />;
    case "eq": return <EqCurve {...props} />;
    case "comp": return <CompCurve {...props} />;
    case "fx": return <FxTable {...props} />;
    case "meter": return <MeterPair {...props} />;
    case "usb": return <UsbPath {...props} />;
    case "aux": return <AuxMatrix {...props} />;
    case "ladder":
    default: return <ChannelLadder {...props} />;
  }
};

export const Film: React.FC<{ data: FilmData }> = ({ data }) => {
  const { width: W, height: H, fps } = useVideoConfig();
  const fmt = formatFor(W, H);
  const SAFE = fmt.safe;
  const sec = (s: number) => Math.round(s * fps);

  const { segments } = buildTimeline(data.segments);
  const shots = buildShots(segments, data.plan);

  /**
   * Each shot runs until the NEXT one starts — not until its own caption ends.
   * The difference is the breath between segments, which would otherwise be a
   * hole in the picture; here the outgoing shot simply holds through it while
   * the narration takes a breath.
   */
  const placed: Placed[] = shots.map((s, i) => {
    const next = shots[i + 1];
    const firstOfSeg = i === 0 || shots[i - 1].segment !== s.segment;
    return {
      ...s,
      trans: transitionFor(s.seed, firstOfSeg, i === 0),
      from: s.start,
      to: next ? next.start : data.outroAt + 0.7,
    };
  });

  /** Contiguous windows, so the overlay never has a gap to fall through. */
  const windows = segments.map((s, i) => ({
    id: s.id,
    accent: s.accent,
    chapter: s.chapter,
    start: s.start,
    end: segments[i + 1] ? segments[i + 1].start : data.outroAt,
    captions: s.captions,
  }));

  const outroFrom = sec(data.outroAt);

  // ── the cue sheet, derived rather than typed ───────────────────────────
  type Cue = { at: number; cue: string };
  const cues: Cue[] = [];
  for (const s of placed) cues.push({ at: Math.max(0, s.from - 0.06), cue: TRANS_CUE[s.trans] });
  for (const seg of segments) {
    cues.push({ at: Math.max(0, seg.start - 0.42), cue: "riser-short" });
    for (const c of seg.captions) if (c.beat) cues.push({ at: c.start + 0.04, cue: "tick-tiny" });
    // The demonstratives that COUNT — the effect table filling, the four
    // consoles arriving — get one blip per item, locked to the same frames the
    // graphic uses, which is the only place in either film where a picture and
    // a sound are tied frame for frame.
    for (const d of data.demos[seg.id] ?? []) {
      const at = seg.captions[d.from]?.start ?? seg.start;
      if (d.kind === "ladder") for (let i = 0; i < 4; i++) cues.push({ at: at + (6 + i * 7) / fps, cue: "blip-one" });
      if (d.kind === "fx") for (let i = 0; i < 8; i++) cues.push({ at: at + (6 + i * 6.4) / fps, cue: "blip-one" });
    }
  }
  cues.push({ at: data.outroAt - 0.25, cue: "outro-bloom" });
  cues.sort((a, b) => a.at - b.at);

  const TopBlock: React.FC = () => {
    const frame = useCurrentFrame();
    const t = frame / fps;
    const w = windows.find((x) => t >= x.start && t < x.end);
    if (!w) return null;
    const f = frame - sec(w.start);
    const durF = Math.max(1, sec(w.end) - sec(w.start));
    const fade = Math.min(
      interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" }),
      interpolate(f, [durF - 8, durF], [1, 0], { extrapolateLeft: "clamp" }),
    );
    const intro = interpolate(f, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    // The demonstrative in force is the last one whose caption has been reached.
    const list = data.demos[w.id] ?? [];
    let active: { from: number; kind: DemoKind } | null = null;
    for (const d of list) {
      const capStart = w.captions[d.from]?.start;
      if (capStart !== undefined && t >= capStart - 0.12) active = d;
    }
    const demoF = active ? frame - sec(w.captions[active.from]?.start ?? w.start) : 0;
    const chips = data.chips[w.id] ?? [];

    // Vertical: everything stacked top-left. Landscape: chapter top-left, and
    // the technical block in the right third where there is width to spare.
    const colW = fmt.portrait ? SAFE.w * 0.94 : SAFE.w * 0.36;
    const pad = colW * 0.042;

    return (
      <>
        <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, width: SAFE.w, opacity: fade }}>
          <ProgressRule p={t / data.outroAt} accent={w.accent} width={SAFE.w} />
          <div style={{ height: SAFE.w * 0.018 }} />
          <ChapterTag accent={w.accent} label={w.chapter} intro={intro} width={SAFE.w} />
        </div>

        {/* The technical block sits on its own panel.
            Without one it is white type at 64% opacity over a photograph of a
            grey console covered in white legending, and the two fight: a meter
            ladder drawn over a fader bank is invisible however hard the shadow
            works. The panel is dark and translucent rather than solid, so the
            picture still reads through it, and it is bordered on the accent so
            it belongs to the chapter it is annotating. */}
        {active || chips.length ? (
          <div
            style={{
              position: "absolute",
              left: fmt.portrait ? SAFE.left : SAFE.left + SAFE.w - colW - pad * 2,
              top: SAFE.top + SAFE.w * (fmt.portrait ? 0.062 : 0.050),
              width: colW,
              padding: `${pad}px ${pad * 1.1}px`,
              // Nearly opaque, because this panel is a GROUND, not type. It
              // still inherits the layer's 64%, so the picture reads through it
              // at about four tenths — enough to feel like part of the frame,
              // dark enough to hold white text over the pale master section.
              background: "linear-gradient(180deg, rgba(4,5,8,0.97) 0%, rgba(4,5,8,0.88) 100%)",
              [fmt.portrait ? "borderLeft" : "borderRight"]:
                `${Math.max(6, W / 260)}px solid ${ACCENT[w.accent].glow}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: colW * 0.062,
              opacity: fade,
            }}
          >
            {active ? <Demo kind={active.kind} accent={w.accent} f={demoF} width={colW} /> : null}
            {chips.length ? <SpecChips items={chips} accent={w.accent} f={f} width={colW} /> : null}
          </div>
        ) : null}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display }}>
      {/* ── 1. picture ──────────────────────────────────────────────────── */}
      {placed.map((s, i) => {
        const from = sec(s.from);
        const tail = placed[i + 1] ? TRANS[placed[i + 1].trans] : 0;
        const dur = Math.max(1, sec(s.to) - from + tail);
        return (
          <Sequence key={s.seed} from={from} durationInFrames={dur}>
            <ShotLayer shot={s} />
          </Sequence>
        );
      })}

      {/* ── 2. scrim, the top of the frame only ─────────────────────────── */}
      <Sequence from={0} durationInFrames={outroFrom}>
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(4,5,7,0.68) 0%, rgba(4,5,7,0.48) 26%, rgba(4,5,7,0.18) 62%, rgba(4,5,7,0) 100%)",
            height: H * (fmt.portrait ? 0.36 : 0.46),
          }}
        />
      </Sequence>

      {/* ── 3. overlay — the whole typographic layer, at 64% ────────────── */}
      <Sequence from={0} durationInFrames={outroFrom}>
        <AbsoluteFill style={{ opacity: TYPE_OPACITY }}>
          <TopBlock />
          {segments.map((seg) =>
            seg.captions.map((c, i) => (
              <Sequence
                key={`${seg.id}-${i}`}
                from={sec(c.start)}
                durationInFrames={Math.max(1, sec(c.end) - sec(c.start))}
              >
                <div
                  style={{
                    position: "absolute",
                    left: SAFE.left,
                    width: fmt.portrait ? SAFE.w : SAFE.w * 0.60,
                    bottom: SAFE.bottom,
                  }}
                >
                  <Caption caption={c} startFrame={0} accent={seg.accent} />
                </div>
              </Sequence>
            )),
          )}
        </AbsoluteFill>
      </Sequence>

      {/* ── 4. the end screen ───────────────────────────────────────────── */}
      <Sequence from={outroFrom} durationInFrames={Math.max(1, data.durationInFrames - outroFrom)}>
        <OutroLayer />
      </Sequence>

      {/* ── audio ───────────────────────────────────────────────────────── */}
      {/* The narration drops in at this path. A silent placeholder of exactly
          the film's length already sits there, so swapping in the recorded read
          is the only step — no code change and no re-timing.

          Everything below is already mastered to its final perceived loudness
          by scripts/gen_audio.py — the bed and the reference cue at -23 LUFS
          (EBU R128), each cue trimmed relative to the bed. So every source
          plays at unity here: a volume multiplier in the timeline would
          silently undo that mastering. */}
      <Audio src={staticFile(`audio/vo-${fmt.id}.wav`)} volume={1} />
      <Audio src={staticFile(`audio/music-${fmt.id}.mp3`)} volume={1} />
      {/* 150 frames per cue, not 90: the outro bloom runs 4.4 s, and a Sequence
          that ends under a decaying tail cuts it dead rather than letting it
          ring out. Every other cue is under a second, so the extra room is
          free. */}
      {cues.map((c, i) => (
        <Sequence key={i} from={sec(c.at)} durationInFrames={150}>
          <Audio src={staticFile(`audio/sfx/${c.cue}.wav`)} volume={1} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const OutroLayer: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ opacity: interpolate(f, [0, 16], [0, 1], { extrapolateRight: "clamp" }) }}>
      <Outro />
    </AbsoluteFill>
  );
};
