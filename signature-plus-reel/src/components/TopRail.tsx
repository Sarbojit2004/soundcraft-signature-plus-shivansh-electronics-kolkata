import React from "react";
import { interpolate, useVideoConfig } from "remotion";
import { ACCENT, FONT, INK, type AccentKey } from "../theme.ts";

// ─────────────────────────────────────────────────────────────────────────────
// THE TOP RAIL
//
// The strip along the top of the frame that tells a viewer where they are:
// a segment-ticked timeline, a running timecode, the chapter number and the
// chapter name, and a live level meter.
//
// WHY A TICKED BAR RATHER THAN A PLAIN ONE. A plain progress bar in a 90 s reel
// says "not finished yet" and nothing else. Ticking it at every segment
// boundary turns it into a contents page: a viewer can see that the film has
// twelve parts, that four of them are short, and that the one playing is
// nearly over. The ticks are DERIVED from the same timeline the film is cut
// to, so they cannot drift — pass `marks` straight from the segments.
//
// PERFORMANCE. At 2160 x 3840 every frame is 8.3 million pixels, so there is
// no filter: blur() and no drop-shadow() anywhere below. Everything is a
// transform, an opacity, a border or a linear-gradient, all of which the
// compositor does cheaply. The glow under the playhead is a radial-gradient
// div, not a shadow.
// ─────────────────────────────────────────────────────────────────────────────

const HARD = (px: number) =>
  `0 ${px}px ${px * 2}px rgba(0,0,0,0.92), 0 0 ${px}px rgba(0,0,0,0.8)`;

const clamp01 = (p: number) => Math.min(1, Math.max(0, p));

const mmss = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

export type Mark = {
  /** Where the segment starts, as a fraction of the body. */
  at: number;
  /** Fixed-duration segments (the B-roll blocks) are drawn differently. */
  fixed?: boolean;
};

/**
 * The timeline itself: a rule, a tick per segment, a fill to the playhead, and
 * a travelling glow at the head.
 */
export const ProgressRail: React.FC<{
  p: number;
  accent: AccentKey;
  width: number;
  marks: Mark[];
}> = ({ p, accent, width, marks }) => {
  const acc = ACCENT[accent];
  const h = Math.max(5, Math.round(width / 300));
  const pos = clamp01(p);
  return (
    <div style={{ width, height: h * 3.2, position: "relative" }}>
      {/* the rule */}
      <div
        style={{
          position: "absolute",
          top: h,
          width,
          height: h,
          background: "rgba(255,255,255,0.15)",
        }}
      />
      {/* travelled */}
      <div
        style={{
          position: "absolute",
          top: h,
          left: 0,
          width: width * pos,
          height: h,
          background: acc.glow,
        }}
      />
      {/* a tick at every segment boundary. The four fixed B-roll blocks get a
          taller, hollow tick, so the rail also says WHERE the rooms are. */}
      {marks.map((m, i) => {
        const x = width * clamp01(m.at);
        const passed = m.at <= pos;
        const th = m.fixed ? h * 3.0 : h * 1.9;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: Math.min(width - h, x),
              top: h + (h - th) / 2,
              width: Math.max(2, Math.round(h * 0.5)),
              height: th,
              background: m.fixed
                ? passed
                  ? acc.glow
                  : "rgba(255,255,255,0.42)"
                : passed
                  ? "rgba(255,255,255,0.72)"
                  : "rgba(255,255,255,0.26)",
            }}
          />
        );
      })}
      {/* the playhead, and its glow */}
      <div
        style={{
          position: "absolute",
          left: width * pos - h * 3,
          top: h - h * 2.2,
          width: h * 6,
          height: h * 5.4,
          background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${acc.glow}CC 0%, ${acc.glow}00 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: width * pos - h * 0.45,
          top: h - h * 0.8,
          width: h * 0.9,
          height: h * 2.6,
          background: "#FFFFFF",
        }}
      />
    </div>
  );
};

/**
 * Four bars that move with the music.
 *
 * Deliberately NOT a real analysis of the bed — a reel is cut to a grid, and a
 * meter driven by a cheap deterministic oscillator on that grid reads as
 * "audio is happening" exactly as well as a real FFT would at this size, for
 * none of the cost. The phases are coprime so the four bars never line up into
 * an obvious pulse.
 */
export const LevelMeter: React.FC<{ f: number; accent: AccentKey; size: number }> = ({
  f,
  accent,
  size,
}) => {
  const acc = ACCENT[accent];
  const PH = [0, 7, 13, 19];
  const SP = [11, 8, 14, 9];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.17, height: size }}>
      {PH.map((ph, i) => {
        const v =
          0.34 +
          0.33 * Math.abs(Math.sin((f + ph) / SP[i])) +
          0.28 * Math.abs(Math.sin((f + ph) / (SP[i] * 2.7)));
        return (
          <div
            key={i}
            style={{
              width: size * 0.2,
              height: size * Math.min(1, v),
              background: acc.glow,
              opacity: 0.55 + 0.45 * Math.min(1, v),
            }}
          />
        );
      })}
    </div>
  );
};

/** The running position, and the chapter it is in. */
export const RailReadout: React.FC<{
  t: number;
  total: number;
  index: number;
  count: number;
  label: string;
  accent: AccentKey;
  intro: number;
  width: number;
  f: number;
}> = ({ t, total, index, count, label, accent, intro, width, f }) => {
  const acc = ACCENT[accent];
  const size = width * 0.0265;
  const shadow = HARD(Math.round(size * 0.09));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.62,
        width,
        opacity: intro,
        transform: `translateY(${interpolate(intro, [0, 1], [-14, 0])}px)`,
      }}
    >
      <LevelMeter f={f} accent={accent} size={size * 1.18} />

      <div
        style={{
          fontFamily: FONT.display,
          fontSize: size,
          letterSpacing: size * 0.06,
          color: INK.onDark,
          fontVariantNumeric: "tabular-nums",
          textShadow: shadow,
        }}
      >
        {mmss(t)}
        <span style={{ color: INK.onDarkDim }}> / {mmss(total)}</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* chapter number — the rail's only numeral that is not a clock */}
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: size * 0.92,
          letterSpacing: size * 0.12,
          color: INK.onDarkDim,
          fontVariantNumeric: "tabular-nums",
          textShadow: shadow,
        }}
      >
        {String(index).padStart(2, "0")}
        <span style={{ opacity: 0.55 }}>/{String(count).padStart(2, "0")}</span>
      </div>

      {/* the chapter itself */}
      <div style={{ display: "flex", alignItems: "center", gap: size * 0.42 }}>
        <div
          style={{
            width: size * 0.2,
            height: size * 1.15,
            background: acc.glow,
            transform: `scaleY(${interpolate(intro, [0, 1], [0.2, 1])})`,
          }}
        />
        <div
          style={{
            fontFamily: FONT.display,
            fontSize: size * 1.02,
            letterSpacing: size * 0.13,
            color: acc.glow,
            textTransform: "uppercase",
            textShadow: shadow,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

/** The whole rail, assembled. */
export const TopRail: React.FC<{
  t: number;
  total: number;
  index: number;
  count: number;
  label: string;
  accent: AccentKey;
  marks: Mark[];
  intro: number;
  width: number;
  f: number;
}> = (props) => {
  const { width } = props;
  const { width: W } = useVideoConfig();
  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: W * 0.0085 }}>
      <ProgressRail p={props.t / props.total} accent={props.accent} width={width} marks={props.marks} />
      <RailReadout {...props} />
    </div>
  );
};
