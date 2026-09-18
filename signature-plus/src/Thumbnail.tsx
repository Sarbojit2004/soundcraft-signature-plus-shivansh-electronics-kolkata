import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";
import { ACCENT, FONT, GROUND, INK, MODELS, formatFor, type FormatId } from "./theme.ts";
import { img, LINEUP } from "./assets.ts";

// ─────────────────────────────────────────────────────────────────────────────
// THE COVERS — one per film, each built as a poster rather than grabbed as a
// frame.
//
// A cover for this product has an unusual job. The four consoles are, on
// purpose, the same desk at four widths — so a hero shot of any one of them is
// a picture of "a mixer" and tells a browsing viewer nothing. What makes
// someone stop is the CLAIM, and the claim only exists once all four are in
// frame together and visibly identical except in length.
//
// So both covers are the four desks, labelled, under the films' own caption
// lockup set in the same two faces — at full opacity here, because the 64% the
// films hold their type at exists to let a moving picture read through the
// letterforms, and a still tile 200 px wide has no such problem.
//
// No logo, no company name, no number. The films keep all of that for their end
// screens and the covers follow the same rule.
// ─────────────────────────────────────────────────────────────────────────────

const HARD = "0 5px 12px rgba(0,0,0,0.94), 0 0 6px rgba(0,0,0,0.8)";

export const Thumbnail: React.FC<{ format?: FormatId }> = () => (
  <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
    <Layout accent={ACCENT.shared.glow} rule={ACCENT.sound.glow} />
  </AbsoluteFill>
);

const Layout: React.FC<{ accent: string; rule: string }> = ({ accent, rule }) => {
  const { width: W, height: H } = useVideoConfig();
  const fmt = formatFor(W, H);
  const SAFE = fmt.safe;

  const room = (
    <>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 88% 54% at 50% 42%, #1A1E27 0%, #0A0C10 56%, #040507 100%)" }} />
      <AbsoluteFill
        style={{
          opacity: 0.30,
          backgroundImage:
            `repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 2px, rgba(0,0,0,0) 2px ${Math.round(W / 16)}px),` +
            `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 2px, rgba(0,0,0,0) 2px ${Math.round(W / 16)}px)`,
        }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 58% 30% at 50% 44%, ${rule}1C 0%, rgba(0,0,0,0) 74%)` }} />
    </>
  );

  const lockup = (scale: number, align: "left" | "center") => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: fmt.type.before.size * scale,
          letterSpacing: fmt.type.before.track,
          color: INK.onDark,
          textTransform: "uppercase",
          textShadow: HARD,
        }}
      >
        ONE FORMAT.
      </div>
      <div
        style={{
          fontFamily: FONT.script,
          fontSize: fmt.type.script.size * scale,
          color: accent,
          lineHeight: 0.98,
          padding: `${16 * scale}px ${24 * scale}px ${26 * scale}px 0`,
          transform: "rotate(-1.6deg)",
          textShadow: `0 6px 14px rgba(0,0,0,0.95), 0 0 6px rgba(0,0,0,0.85), 0 0 ${34 * scale}px ${accent}55`,
          whiteSpace: "nowrap",
        }}
      >
        Four
      </div>
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: fmt.type.after.size * scale,
          letterSpacing: fmt.type.after.track,
          color: INK.onDark,
          textTransform: "uppercase",
          textShadow: HARD,
        }}
      >
        SIZES
      </div>
      <div style={{ height: 10 * scale }} />
      <div style={{ width: fmt.type.after.size * scale * 4.2, height: Math.max(5, W / 300), background: rule }} />
      <div style={{ height: 14 * scale }} />
      <div
        style={{
          fontFamily: FONT.display,
          fontSize: fmt.type.chapter.size * scale * 1.12,
          letterSpacing: fmt.type.chapter.track,
          color: INK.onDarkSoft,
          textTransform: "uppercase",
          textShadow: HARD,
        }}
      >
        SOUNDCRAFT SIGNATURE PLUS
      </div>
    </div>
  );

  if (fmt.portrait) {
    const bandTop = H * 0.355;
    const bandH = (H * 0.965 - bandTop) / 4;
    return (
      <>
        {room}
        <div style={{ position: "absolute", left: SAFE.left, top: SAFE.top + H * 0.012, width: SAFE.w }}>{lockup(1, "left")}</div>
        {LINEUP.map((slug, i) => (
          <Band key={slug} slug={slug} top={bandTop + i * bandH} h={bandH} W={W} accent={accent} rule={rule} label={MODELS[i].short} />
        ))}
      </>
    );
  }

  const colW = W * 0.36;
  const shelfL = W * 0.40;
  const shelfW = W * 0.56;
  const cellH = (H * 0.94) / 4;
  return (
    <>
      {room}
      <div style={{ position: "absolute", left: SAFE.left, top: H * 0.20, width: colW }}>{lockup(1.35, "left")}</div>
      {LINEUP.map((slug, i) => (
        <Band key={slug} slug={slug} top={H * 0.03 + i * cellH} h={cellH} W={shelfW} left={shelfL} accent={accent} rule={rule} label={MODELS[i].short} />
      ))}
    </>
  );
};

/**
 * One console in a band, sized by its CONTENT rather than by its canvas.
 *
 * The renders are 4096 px canvases in which the desk occupies the middle ~80%
 * and the rest is transparent padding, and the padding differs from file to
 * file. objectFit: contain therefore fits the PADDING to the band and leaves
 * four small consoles floating in four large empty rectangles — which is what
 * the first cut of this cover looked like.
 */
const Band: React.FC<{
  slug: string; top: number; h: number; W: number; left?: number;
  accent: string; rule: string; label: string;
}> = ({ slug, top, h, W, left = 0, accent, rule, label }) => {
  const a = img(slug);
  const [x0, y0, x1, y1] = a.bbox as number[];
  const numW = h * 0.62;
  const boxW = W - numW - h * 0.22;
  const boxH = h * 0.96;
  const contentW = Math.min(boxW, boxH * a.ar);
  const fullW = contentW / Math.max(1e-6, x1 - x0);
  const fullH = (fullW * a.h) / a.w;

  return (
    <div style={{ position: "absolute", left, top, width: W, height: h, display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: numW,
          textAlign: "right",
          paddingRight: h * 0.10,
          fontFamily: "'ReelDisplay', Arial, sans-serif",
          fontSize: h * 0.44,
          letterSpacing: h * 0.02,
          color: accent,
          textShadow: HARD,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {label}
      </div>
      <div style={{ width: Math.max(4, W / 340), height: h * 0.66, background: rule, marginRight: h * 0.10 }} />
      <div style={{ position: "relative", flex: 1, height: boxH, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 62% at 50% 52%, ${rule}22 0%, rgba(0,0,0,0) 72%)`,
          }}
        />
        <Img
          src={staticFile(a.file)}
          style={{
            position: "absolute",
            left: boxW / 2 - ((x0 + x1) / 2) * fullW,
            top: boxH / 2 - ((y0 + y1) / 2) * fullH,
            width: fullW,
            height: fullH,
            objectFit: "fill",
          }}
        />
      </div>
    </div>
  );
};
