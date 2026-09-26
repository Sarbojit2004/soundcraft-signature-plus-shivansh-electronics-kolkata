import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useVideoConfig } from "remotion";
import { ASSETS, type Asset } from "../assets.generated.ts";
import { ACCENT, FONT, PRODUCT_NAME, type Canvas, type ProductKey } from "../theme.ts";
import type { Move, Shot } from "../plan.ts";

// ─────────────────────────────────────────────────────────────────────────────
// STAGING — every picture is shown COMPLETE (contained, never cropped to fit),
// over an ambient fill made from the picture itself, then moved like a camera
// on a gimbal: drift, zoom in/out, a rack focus in/out, a crane, an orbit.
// Rack focus is a crossfade to a pre-blurred "soft" copy — no CSS blur at 4K.
// ─────────────────────────────────────────────────────────────────────────────

const BY: Record<string, Asset> = Object.fromEntries(ASSETS.map((a) => [a.slug, a]));
export const asset = (slug: string) => BY[slug];

type Box = { x: number; y: number; w: number; h: number };
const contain = (ar: number, b: Box) => {
  const w = Math.min(b.w, b.h * ar);
  const h = w / ar;
  return { x: b.x + (b.w - w) / 2, y: b.y + (b.h - h) / 2, w, h };
};

/** Where the picture lives. Portrait keeps a band between the top bar and the captions. */
export const pictureBox = (c: Canvas, transparent: boolean): Box =>
  c.portrait
    ? transparent
      ? { x: 60, y: 1200, w: c.width - 120, h: 1240 }
      : { x: 0, y: 1150, w: c.width, h: 1320 }
    : transparent
      ? { x: 300, y: 480, w: c.width - 600, h: 1420 }
      : { x: 0, y: 0, w: c.width, h: c.height };

const smooth = (p: number) => {
  const x = Math.min(1, Math.max(0, p));
  return x * x * (3 - 2 * x);
};

/** A camera move as a transform plus how much of the soft copy shows. */
export const moveFor = (m: Move, p: number) => {
  const e = smooth(p);
  switch (m) {
    case "gimbalL":
      return { t: `translateX(${interpolate(e, [0, 1], [2.6, -2.6])}%) scale(1.07) rotate(${interpolate(e, [0, 1], [0.5, -0.5])}deg)`, soft: 0 };
    case "gimbalR":
      return { t: `translateX(${interpolate(e, [0, 1], [-2.6, 2.6])}%) scale(1.07) rotate(${interpolate(e, [0, 1], [-0.5, 0.5])}deg)`, soft: 0 };
    case "zoomIn":
      return { t: `scale(${interpolate(e, [0, 1], [1.0, 1.14])})`, soft: 0 };
    case "zoomOut":
      return { t: `scale(${interpolate(e, [0, 1], [1.14, 1.0])})`, soft: 0 };
    case "focusIn":
      return { t: `scale(${interpolate(e, [0, 1], [1.08, 1.0])})`, soft: 1 - smooth(p / 0.42) };
    case "focusOut":
      return { t: `scale(${interpolate(e, [0, 1], [1.0, 1.07])})`, soft: smooth((p - 0.6) / 0.4) * 0.92 };
    case "craneUp":
      return { t: `translateY(${interpolate(e, [0, 1], [3.2, -3.2])}%) scale(1.08)`, soft: 0 };
    case "orbit":
    default:
      return { t: `perspective(2600px) rotateY(${interpolate(e, [0, 1], [-7, 7])}deg) scale(${interpolate(e, [0, 1], [1.05, 1.1])})`, soft: 0 };
  }
};

type Common = { canvas: Canvas; f: number; dur: number; series: ProductKey; beat: number; t: number };

/** A studio for the cut-out consoles: a lit sweep in the section colour, a floor. */
const Studio: React.FC<{ canvas: Canvas; glow: string; f: number }> = ({ canvas, glow, f }) => (
  <>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 55% at 50% ${canvas.portrait ? 44 : 46}%, #25232A 0%, #0F0E12 55%, #050506 100%)` }} />
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 62% 34% at 50% ${canvas.portrait ? 62 : 74}%, ${glow}33 0%, ${glow}00 70%)` }} />
    <AbsoluteFill
      style={{
        opacity: 0.35,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 2px, rgba(0,0,0,0) 2px ${canvas.portrait ? 120 : 160}px)`,
        transform: `translateX(${(f * 0.6) % (canvas.portrait ? 120 : 160)}px)`,
      }}
    />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(0,0,0,0) ${canvas.portrait ? 60 : 72}%, rgba(255,255,255,0.05) ${canvas.portrait ? 60.2 : 72.2}%, rgba(0,0,0,0.5) 100%)` }} />
  </>
);

const Ambient: React.FC<{ a: Asset }> = ({ a }) => (
  <AbsoluteFill>
    <Img src={staticFile(a.amb)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.2)" }} />
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.62) 100%)" }} />
  </AbsoluteFill>
);

export const StillShot: React.FC<Common & { slug: string; move: Move }> = ({ canvas, f, dur, series, slug, move }) => {
  const a = asset(slug);
  const p = f / Math.max(1, dur);
  const box = pictureBox(canvas, a.transparent);
  const r = contain(a.ar, box);
  const mv = moveFor(move, p);
  const glow = ACCENT[series].glow;
  const full = !canvas.portrait && !a.transparent && a.ar > 1.7;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {a.transparent ? <Studio canvas={canvas} glow={glow} f={f} /> : <Ambient a={a} />}
      <div
        style={{
          position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h,
          transform: mv.t, transformOrigin: "50% 50%",
          boxShadow: a.transparent || full ? "none" : "0 30px 60px rgba(0,0,0,0.7)",
        }}
      >
        <Img src={staticFile(a.file)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        {mv.soft > 0.001 ? <Img src={staticFile(a.soft)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: mv.soft }} /> : null}
      </div>
    </AbsoluteFill>
  );
};

/** A push into one control row of the 4096 px plan view — the close-up shot. */
export const DetailShot: React.FC<Common & { slug: string; region: [number, number, number] }> = ({ canvas, f, dur, series, slug, region }) => {
  const a = asset(slug);
  const p = smooth(f / Math.max(1, dur));
  const box = canvas.portrait ? { x: 0, y: 1150, w: canvas.width, h: 1320 } : { x: 0, y: 0, w: canvas.width, h: canvas.height };
  const [cx, cy, span] = region;
  // Scale so `span` of the image width fills the box, then push a further 12%.
  const k = (box.w / (span * a.w)) * interpolate(p, [0, 1], [1.0, 1.12]);
  const iw = a.w * k, ih = a.h * k;
  const drift = interpolate(p, [0, 1], [-0.015, 0.015]) * span * iw;
  const left = box.x + box.w / 2 - cx * iw + drift;
  const top = box.y + box.h / 2 - cy * ih;
  const glow = ACCENT[series].glow;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#050506" }}>
      <Studio canvas={canvas} glow={glow} f={f} />
      <div style={{ position: "absolute", left: box.x, top: box.y, width: box.w, height: box.h, overflow: "hidden", boxShadow: canvas.portrait ? "0 30px 60px rgba(0,0,0,0.7)" : "none" }}>
        <div style={{ position: "absolute", left: left - box.x, top: top - box.y, width: iw, height: ih }}>
          <Img src={staticFile(a.file)} style={{ width: "100%", height: "100%" }} />
          {p < 0.3 ? <Img src={staticFile(a.soft)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 1 - p / 0.3 }} /> : null}
        </div>
        {/* A thin frame in the section colour, as if a loupe were laid on the desk. */}
        <div style={{ position: "absolute", inset: canvas.portrait ? 40 : 60, border: `3px solid ${glow}88`, borderRadius: 18, opacity: interpolate(f, [4, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />
      </div>
    </AbsoluteFill>
  );
};

/** A Soundcraft feature callout, framed as a card over its own ambient fill. */
export const CardShot: React.FC<Common & { slug: string }> = ({ canvas, f, dur, series, slug }) => {
  const { fps } = useVideoConfig();
  const a = asset(slug);
  const glow = ACCENT[series].glow;
  const P = canvas.portrait;
  const box = P ? { x: 110, y: 1200, w: canvas.width - 220, h: 1220 } : { x: 520, y: 380, w: canvas.width - 1040, h: 1500 };
  const r = contain(a.ar, box);
  const inn = spring({ frame: f, fps, config: { damping: 180, mass: 0.6 }, durationInFrames: 18 });
  const p = smooth(f / Math.max(1, dur));
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Ambient a={a} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 55% 40% at 50% 55%, ${glow}22 0%, ${glow}00 70%)` }} />
      <div
        style={{
          position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 26, overflow: "hidden",
          opacity: inn,
          transform: `perspective(2400px) translateY(${interpolate(inn, [0, 1], [80, 0])}px) rotateX(${interpolate(inn, [0, 1], [12, 0])}deg) scale(${interpolate(p, [0, 1], [1.0, 1.05])})`,
          boxShadow: `0 30px 60px rgba(0,0,0,0.78), 0 0 0 3px rgba(255,255,255,0.10), 0 0 0 7px ${glow}44`,
        }}
      >
        <Img src={staticFile(a.file)} style={{ width: "100%", height: "100%" }} />
      </div>
    </AbsoluteFill>
  );
};

/** Kling B-roll or an overview clip: played at the plan's rate so it fills its slot. */
export const ClipShot: React.FC<Common & { file: string; rate: number; slot: number }> = ({ canvas, f, file, rate, slot }) => {
  const push = interpolate(f, [0, slot * 30], [1.0, 1.045], { extrapolateRight: "clamp" });
  const amb = file.replace(/\.mp4$/, "-amb.mp4");
  if (!canvas.portrait) {
    return (
      <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
        <OffthreadVideo src={staticFile(file)} muted playbackRate={rate} style={{ width: "100%", height: "100%", transform: `scale(${push})` }} />
      </AbsoluteFill>
    );
  }
  const r = contain(16 / 9, pictureBox(canvas, false));
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <OffthreadVideo src={staticFile(amb)} muted playbackRate={rate} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.25)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)" }} />
      <div style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, transform: `scale(${push})`, boxShadow: "0 30px 60px rgba(0,0,0,0.75)" }}>
        <OffthreadVideo src={staticFile(file)} muted playbackRate={rate} style={{ width: "100%", height: "100%" }} />
      </div>
    </AbsoluteFill>
  );
};

/** The four consoles side by side — the family portrait. */
export const LineupShot: React.FC<Common & { slugs: string[] }> = ({ canvas, f, dur, series, slugs }) => {
  const { fps } = useVideoConfig();
  const A = slugs.map(asset);
  const P = canvas.portrait;
  const W = canvas.width;
  const n = A.length;
  const e = smooth(f / Math.max(1, dur));
  const cells: Box[] = P
    ? A.map((_, i) => ({ x: 110 + (i % 2) * ((W - 220) / 2), y: 1180 + Math.floor(i / 2) * 640, w: (W - 220) / 2 - 20, h: 600 }))
    : A.map((_, i) => ({ x: 200 + i * ((W - 400) / n), y: 700, w: (W - 400) / n - 40, h: 900 }));
  const names = ["12", "16", "22", "32"];
  const keys: ProductKey[] = ["p12", "p16", "p22", "p32"];
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Studio canvas={canvas} glow={ACCENT[series].glow} f={f} />
      <AbsoluteFill style={{ transform: `scale(${interpolate(e, [0, 1], [1.0, 1.06])}) translateX(${interpolate(e, [0, 1], [-1, 1])}%)` }}>
        {A.map((a, i) => {
          const c = cells[i];
          const r = contain(a.ar, { ...c, h: c.h - (P ? 90 : 110) });
          const inn = spring({ frame: f - i * 4, fps, config: { damping: 190, mass: 0.6 }, durationInFrames: 20 });
          const g = ACCENT[keys[i]].glow;
          return (
            <React.Fragment key={a.slug + i}>
              <div style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, opacity: inn, transform: `translateY(${interpolate(inn, [0, 1], [60, 0])}px)` }}>
                <Img src={staticFile(a.file)} style={{ width: "100%", height: "100%" }} />
              </div>
              <div style={{ position: "absolute", left: c.x, width: c.w, top: c.y + c.h - (P ? 76 : 96), textAlign: "center", fontFamily: FONT.display, fontSize: P ? 56 : 62, letterSpacing: 8, color: g, opacity: inn * 0.95, textShadow: "0 4px 10px rgba(0,0,0,0.9)" }}>
                SIGNATURE PLUS {names[i]}
              </div>
            </React.Fragment>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ShotView: React.FC<Common & { shot: Shot }> = (props) => {
  const { shot } = props;
  switch (shot.kind) {
    case "broll":
    case "vclip":
      return <ClipShot {...props} file={shot.file!} rate={shot.rate!} slot={shot.end - shot.start} />;
    case "detail":
      return <DetailShot {...props} slug={shot.assets![0]} region={shot.region!} />;
    case "card":
      return <CardShot {...props} slug={shot.assets![0]} />;
    case "lineup":
      return <LineupShot {...props} slugs={shot.assets!} />;
    default:
      return <StillShot {...props} slug={shot.assets![0]} move={shot.move} />;
  }
};

const DETAIL_NAME: Record<string, string> = {
  preamps: "GHOST PREAMP INPUTS", gain: "GAIN · PAD · 100 Hz", comp: "dbx COMPRESSOR", eq: "SAPPHYRE EQ", aux: "AUX SENDS 1 – 4",
  lexicon: "LEXICON PANEL", master: "MASTER SECTION", faders: "LONG-THROW FADERS", qr: "QR MANUAL", talkback: "TALKBACK",
  caps: "COLOUR-CODED CAPS", usb: "USB-C 4 × 4",
};

/** The on-screen name for whatever the current shot shows. */
export const shotLabel = (s: Shot): string => {
  if (s.kind === "broll" || s.kind === "vclip") return (s.label ?? "").toUpperCase();
  if (s.kind === "detail") return DETAIL_NAME[s.label ?? ""] ?? "SIGNATURE PLUS 32";
  if (s.kind === "lineup") return "12 · 16 · 22 · 32";
  const a = asset(s.assets![0]);
  if (a.kind === "feature") return (a.note || "SIGNATURE PLUS").toUpperCase();
  return PRODUCT_NAME[a.product] ?? "SIGNATURE PLUS";
};
