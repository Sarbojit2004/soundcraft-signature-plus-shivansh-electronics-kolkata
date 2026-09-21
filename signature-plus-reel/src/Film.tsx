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
import { type Segment } from "./script.ts";
import { type Shot, type ShotSpec } from "./shots.ts";
import { sheetFor, type Placed } from "./cues.ts";
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
import { TRANS, TransitionIn } from "./components/Transitions.tsx";
import { TopRail, type Mark } from "./components/TopRail.tsx";
import {
  AuxMatrix,
  ChannelLadder,
  CompCurve,
  EqCurve,
  FxTable,
  GainDial,
  MeterPair,
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
    // A generated B-roll is 720 x 1280 — the frame's own aspect — so ClipBleed
    // takes the full-bleed branch and plays it edge to edge. It is never given
    // a startFrom: the whole point of these four is that they run complete.
    case "broll":
      return <ClipBleed clip={getClip(shot.slug)} startFrom={0} {...common} />;
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

  // Shot placement and the cue sheet are shared with the stem build, so the
  // standalone transition file and the film can never drift apart.
  const { segments, placed, cues } = sheetFor(data, fps);
  /** Contiguous windows, so the overlay never has a gap to fall through. */
  const windows = segments.map((s, i) => ({
    id: s.id,
    accent: s.accent,
    chapter: s.chapter,
    start: s.start,
    end: segments[i + 1] ? segments[i + 1].start : data.outroAt,
    captions: s.captions,
  }));

  /** One tick per chapter on the rail, derived from the same timeline the film
   *  is cut to, so the contents page and the edit cannot disagree. The four
   *  fixed B-roll blocks are flagged, and the rail draws them taller. */
  const marks: Mark[] = segments.map((s) => ({
    at: s.start / data.outroAt,
    fixed: s.fixed !== undefined,
  }));

  const outroFrom = sec(data.outroAt);


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
        {/* The rail does not fade with the segment — a timeline that blinks out
            between chapters stops being a timeline. Only its readout re-intros
            on each chapter change; the bar itself is continuous for the whole
            body. */}
        <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top, width: SAFE.w }}>
          <TopRail
            t={t}
            total={data.outroAt}
            index={windows.findIndex((x) => x.id === w.id) + 1}
            count={windows.length}
            label={w.chapter}
            accent={w.accent}
            marks={marks}
            intro={intro}
            width={SAFE.w}
            f={frame}
          />
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

      {/* ── audio ─────────────────────────────────────────────────────────
          NO NARRATION TRACK. This reel carries its script as burned-in
          captions over a music bed, which is what the brief asks for — so
          there is deliberately no vo-*.wav to drop in and no silent
          placeholder pretending one is coming. src/script.ts is still written
          and timed as a read-aloud script, so a recorded read can be added
          later without re-cutting anything, but nothing here is waiting on it.

          The bed and every cue are already mastered to their final perceived
          loudness by scripts/gen_audio.py — the bed to -23 LUFS (EBU R128) and
          each cue trimmed relative to it. So every source plays at unity here:
          a volume multiplier in the timeline would silently undo that
          mastering. */}
      <Audio src={staticFile("audio/music-reel.mp3")} volume={1} />
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
