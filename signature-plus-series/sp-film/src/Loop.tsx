import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./theme.ts";

// ─────────────────────────────────────────────────────────────────────────────
// SIGNATURE PLUS · 30 s SQUARE LOOP
// A silent 1080×1080 motion piece for an Instagram post. Frame 0 and the last
// frame are the same picture: everything that moves continuously is periodic
// over the full 30 s, and the logo lock-up that opens the piece is also the
// shot it resolves into. Only the real product images and the two logos.
// ─────────────────────────────────────────────────────────────────────────────

const L = 30; // seconds
const AMBER = "#FFA95C";
const EASE = Easing.bezier(0.22, 1, 0.36, 1);

const TAU = Math.PI * 2;
const hq = (n: string) => staticFile("loop/hq/" + n);


/** 0→1→0 visibility for a scene living in [a, b] with `fi`/`fo` fades. */
const win = (t: number, a: number, b: number, fi = 0.9, fo = 0.9) =>
  interpolate(t, [a, a + fi, b - fo, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
/** Progress 0→1 through [a, b], eased. */
const prog = (t: number, a: number, b: number, e = EASE) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

// ── the room: periodic glows, light rays, drifting dust ─────────────────────
const Room: React.FC<{ t: number }> = ({ t }) => {
  const p = (t / L) * TAU;
  const g1 = { x: 50 + 28 * Math.cos(p), y: 42 + 18 * Math.sin(p) };
  const g2 = { x: 50 - 30 * Math.cos(p + 1.3), y: 60 - 20 * Math.sin(p + 1.3) };
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(120% 120% at 50% 50%, #0E0F13 0%, #07080A 60%, #030304 100%)" }} />
      <AbsoluteFill style={{ background: `radial-gradient(520px 420px at ${g1.x}% ${g1.y}%, rgba(255,169,92,0.20), transparent 70%)` }} />
      <AbsoluteFill style={{ background: `radial-gradient(560px 460px at ${g2.x}% ${g2.y}%, rgba(110,150,255,0.13), transparent 70%)` }} />
      {/* slow light rays from above, rotating once per loop */}
      <AbsoluteFill style={{ opacity: 0.55, mixBlendMode: "screen",
        background: `repeating-conic-gradient(from ${(t / L) * 360}deg at 50% -30%, rgba(255,210,160,0.06) 0deg 3deg, transparent 3deg 14deg)`,
        maskImage: "linear-gradient(180deg, #000 0%, transparent 75%)", WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 75%)" }} />
      {/* fine engineering grid */}
      <AbsoluteFill style={{ opacity: 0.5,
        backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)",
        backgroundSize: "54px 54px", backgroundPosition: `0 ${((t / L) * 54 * 4) % 54}px`,
        maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 80%)" }} />
      {/* dust — each mote rises a whole number of screens per loop, so it wraps seamlessly */}
      {Array.from({ length: 70 }).map((_, i) => {
        const r = random(`d${i}`);
        const laps = 1 + Math.floor(random(`l${i}`) * 3);
        const y = (((random(`y${i}`) - (t / L) * laps) % 1) + 1) % 1;
        const x = random(`x${i}`) + 0.02 * Math.sin(p * laps + i);
        const s = 1.5 + r * 3.5;
        return <div key={i} style={{ position: "absolute", left: x * 1080, top: y * 1080, width: s, height: s, borderRadius: "50%",
          background: i % 5 === 0 ? "rgba(140,170,255,.8)" : "rgba(255,220,180,.8)", opacity: 0.12 + 0.35 * r * (0.6 + 0.4 * Math.sin(p * 3 + i)),
          filter: s > 4 ? "blur(1px)" : undefined }} />;
      })}
    </AbsoluteFill>
  );
};

// ── the logo lock-up (hero at the loop point, small plate in between) ───────
const Lockup: React.FC<{ t: number; w: number; glow?: number }> = ({ t, w, glow = 1 }) => {
  const sweep = ((t % L) / L) * 3 - 1; // one specular pass per loop
  return (
    <div style={{ width: w, padding: `${w * 0.035}px ${w * 0.05}px`, background: "#fff", borderRadius: w * 0.045, display: "flex", alignItems: "center", gap: w * 0.045, position: "relative", overflow: "hidden",
      boxShadow: `0 ${w * 0.05}px ${w * 0.14}px rgba(0,0,0,.6), 0 0 ${w * 0.12 * glow}px rgba(255,169,92,${0.25 * glow})` }}>
      <Img src={hq("logo-shivansh.png")} style={{ width: "46%", display: "block" }} />
      <div style={{ width: 1.5, alignSelf: "stretch", background: "#D8D3C8" }} />
      <Img src={hq("logo-soundcraft.png")} style={{ width: "46%", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(105deg, transparent ${(sweep - 0.12) * 100}%, rgba(255,255,255,.75) ${sweep * 100}%, transparent ${(sweep + 0.12) * 100}%)`, mixBlendMode: "overlay" }} />
    </div>
  );
};

const Rings: React.FC<{ t: number; size: number; o: number }> = ({ t, size, o }) => {
  const rot = (t / L) * 360;
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{ position: "absolute", left: 540 - size / 2, top: 540 - size / 2, opacity: o }}>
      <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stopColor={AMBER} stopOpacity="0" /><stop offset=".5" stopColor={AMBER} /><stop offset="1" stopColor={AMBER} stopOpacity="0" /></linearGradient></defs>
      <circle r="96" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth=".4" />
      <circle r="96" fill="none" stroke="url(#rg)" strokeWidth=".9" strokeDasharray="60 543" transform={`rotate(${rot * 2})`} />
      <circle r="84" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".3" strokeDasharray="1 3" transform={`rotate(${-rot})`} />
      <circle r="72" fill="none" stroke="url(#rg)" strokeWidth=".6" strokeDasharray="120 332" transform={`rotate(${-rot * 3})`} />
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * TAU + (rot * Math.PI) / 180;
        const long = i % 5 === 0;
        return <line key={i} x1={Math.cos(a) * 88} y1={Math.sin(a) * 88} x2={Math.cos(a) * (long ? 92 : 90)} y2={Math.sin(a) * (long ? 92 : 90)} stroke={long ? AMBER : "rgba(255,255,255,.35)"} strokeWidth={long ? 0.7 : 0.35} />;
      })}
    </svg>
  );
};

const AR: Record<string, number> = { h12: 1.381, h16: 1.475, h22: 1.535, h32: 1.633, l12: 2.055, l16: 2.16, l22: 2.661, l32: 2.413, s22: 5.188, p12: 0.651, p16: 0.838, p22: 1.074, p32: 1.541 };
const MC: Record<string, string> = { "12": "#FF6B5E", "16": "#FFC94A", "22": "#3FE0D0", "32": "#7FA6FF" };

type K = { x: number; y: number; s: number; ry?: number; rx?: number; rz?: number };

/** One product image moving from `from` to `to` over its whole window, pulled into and out of focus at the fades. */
const Shot: React.FC<{ t: number; src: string; w: number; a: number; b: number; fi?: number; fo?: number; from: K; to: K; sweep?: boolean; refl?: number }> = ({ t, src, w, a, b, fi = 0.9, fo = 0.9, from, to, sweep = true, refl = 0 }) => {
  const v = win(t, a, b, fi, fo);
  if (v <= 0) return null;
  const k = prog(t, a, b, Easing.inOut(Easing.sin));
  const L2 = (p: keyof K) => interpolate(k, [0, 1], [from[p] ?? 0, to[p] ?? 0]);
  const h = w / AR[src];
  const sw = interpolate(t, [a + fi * 0.6, b - fo * 0.4], [-0.35, 1.35]);
  return (
    <div style={{ position: "absolute", left: L2("x") - w / 2, top: L2("y") - h / 2, width: w, opacity: v, filter: `blur(${(1 - v) * 16}px)`,
      transform: `perspective(1800px) rotateX(${L2("rx")}deg) rotateY(${L2("ry")}deg) rotateZ(${L2("rz")}deg) scale(${L2("s")})` }}>
      <div style={{ position: "relative" }}>
        <Img src={hq(src + ".webp")} style={{ width: "100%", display: "block", filter: "drop-shadow(0 40px 44px rgba(0,0,0,.78))" }} />
        {sweep && <div style={{ position: "absolute", inset: 0, maskImage: `url(${hq(src + ".webp")})`, WebkitMaskImage: `url(${hq(src + ".webp")})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%",
          background: `linear-gradient(115deg, transparent ${(sw - 0.16) * 100}%, rgba(255,238,215,.5) ${sw * 100}%, transparent ${(sw + 0.16) * 100}%)`, mixBlendMode: "screen" }} />}
      </div>
      {refl > 0 && <Img src={hq(src + ".webp")} style={{ width: "100%", display: "block", transform: "scaleY(-1)", opacity: refl, marginTop: -4,
        maskImage: "linear-gradient(0deg, rgba(0,0,0,.9), transparent 42%)", WebkitMaskImage: "linear-gradient(0deg, rgba(0,0,0,.9), transparent 42%)", filter: "blur(2px)" }} />}
    </div>
  );
};

/** The model's accent: a coloured pool of light, a light streak and a giant outlined numeral in the back. */
const Accent: React.FC<{ t: number; m: string; a: number; b: number; nx0: number; nx1: number }> = ({ t, m, a, b, nx0, nx1 }) => {
  const v = win(t, a, b, 1.0, 1.0);
  if (v <= 0) return null;
  const k = prog(t, a, b, Easing.inOut(Easing.sin));
  const c = MC[m];
  return (
    <AbsoluteFill style={{ opacity: v }}>
      <AbsoluteFill style={{ background: `radial-gradient(560px 380px at 50% 58%, ${c}33, transparent 72%)` }} />
      <div style={{ position: "absolute", top: 90, left: interpolate(k, [0, 1], [nx0, nx1]), fontFamily: FONT.display, fontSize: 760, lineHeight: 1, fontWeight: 900,
        color: "transparent", WebkitTextStroke: `2px ${c}`, opacity: 0.2, letterSpacing: -20, whiteSpace: "nowrap" }}>{m}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: interpolate(k, [0, 1], [760, 330]), height: 2, opacity: 0.55 * Math.sin(k * Math.PI),
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`, boxShadow: `0 0 34px 6px ${c}55` }} />
    </AbsoluteFill>
  );
};

// ── scenes ──────────────────────────────────────────────────────────────────
const SceneLogo: React.FC<{ t: number }> = ({ t }) => {
  // Visible 27.2–30 s and 0–2.8 s: the loop seam sits inside this shot.
  const tt = t > 15 ? t - L : t; // −2.8 … 2.8, continuous across the seam
  const o = interpolate(tt, [-2.8, -1.8, 1.8, 2.8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  if (o <= 0) return null;
  const breathe = 1 + 0.012 * Math.cos((tt / 5) * TAU);
  const out = prog(tt, 1.8, 2.8, Easing.in(Easing.cubic));
  const inn = 1 - prog(tt, -2.8, -1.6);
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Rings t={t} size={820 + 60 * out + 60 * inn} o={0.9} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: `scale(${breathe * (1 + 0.08 * out - 0.06 * inn)})`, filter: `blur(${(out + inn) * 10}px)` }}>
          <Lockup t={t} w={600} glow={1.2} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene12: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="12" a={2.2} b={7.0} nx0={560} nx1={430} />
  <Shot t={t} src="l12" w={900} a={2.2} b={4.9} fo={0.8} from={{ x: 610, y: 560, s: 1.14, ry: -10 }} to={{ x: 480, y: 540, s: 1.0, ry: 4 }} />
  <Shot t={t} src="h12" w={720} a={4.3} b={7.0} fi={0.8} from={{ x: 560, y: 575, s: 1.1, ry: 14, rx: 6 }} to={{ x: 540, y: 545, s: 0.96, ry: -6, rx: 2 }} refl={0.2} />
</>);
const Scene16: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="16" a={6.4} b={11.2} nx0={40} nx1={170} />
  <Shot t={t} src="l16" w={900} a={6.4} b={9.1} fo={0.8} from={{ x: 420, y: 560, s: 1.12, ry: 10 }} to={{ x: 600, y: 535, s: 1.0, ry: -4 }} />
  <Shot t={t} src="h16" w={780} a={8.5} b={11.2} fi={0.8} from={{ x: 540, y: 600, s: 0.9, rx: 16 }} to={{ x: 540, y: 548, s: 1.02, rx: 3 }} refl={0.2} />
</>);
const Scene22: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="22" a={10.6} b={15.4} nx0={520} nx1={400} />
  <Shot t={t} src="s22" w={1040} a={10.6} b={13.2} fo={0.8} from={{ x: 660, y: 545, s: 1.18 }} to={{ x: 440, y: 540, s: 1.0 }} />
  <Shot t={t} src="h22" w={820} a={12.6} b={15.4} fi={0.8} from={{ x: 540, y: 565, s: 1.1, ry: -14 }} to={{ x: 540, y: 545, s: 0.97, ry: 6 }} refl={0.2} />
</>);
const Scene32: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="32" a={14.8} b={19.6} nx0={60} nx1={180} />
  <Shot t={t} src="p32" w={1500} a={14.8} b={17.5} fo={0.8} sweep={false} from={{ x: 540, y: 520, s: 1.12, rx: 56, rz: -18 }} to={{ x: 540, y: 560, s: 0.94, rx: 36, rz: -8 }} />
  <Shot t={t} src="l32" w={960} a={16.9} b={19.6} fi={0.8} from={{ x: 610, y: 565, s: 1.12, ry: -8 }} to={{ x: 520, y: 545, s: 1.0, ry: 4 }} />
</>);

const SceneFamily: React.FC<{ t: number }> = ({ t }) => {
  const a = 19.0, b = 23.8, o = win(t, a, b, 0.9, 1.0);
  if (o <= 0) return null;
  const P: [string, string, number, number, number, number][] = [
    ["h12", "12", 285, 380, 400, 0], ["h16", "16", 790, 380, 440, 0.16], ["h22", "22", 290, 730, 480, 0.32], ["h32", "32", 790, 735, 540, 0.48],
  ];
  const drift = prog(t, a, b, Easing.inOut(Easing.sin));
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + drift * 0.06}) rotate(${interpolate(drift, [0, 1], [-1.2, 1.2])}deg)` }}>
        {P.map(([src, m, x, y, w, d], i) => {
          const e = prog(t, a + 0.1 + d, a + 1.5 + d);
          const h = w / AR[src];
          const dx = (i % 2 ? 1 : -1) * 460 * (1 - e);
          const sw = interpolate(t, [a + 1.2 + d, a + 3.6 + d], [-0.35, 1.35]);
          return (
            <div key={i} style={{ position: "absolute", left: x - w / 2 + dx, top: y - h / 2 + 40 * (1 - e), width: w, opacity: e, filter: `blur(${(1 - e) * 12}px)` }}>
              <div style={{ position: "absolute", left: "8%", right: "8%", top: "35%", bottom: "-12%", background: `radial-gradient(closest-side, ${MC[m]}55, transparent)`, filter: "blur(22px)" }} />
              <div style={{ position: "relative" }}>
                <Img src={hq(src + ".webp")} style={{ width: "100%", display: "block", filter: "drop-shadow(0 30px 34px rgba(0,0,0,.75))" }} />
                <div style={{ position: "absolute", inset: 0, maskImage: `url(${hq(src + ".webp")})`, WebkitMaskImage: `url(${hq(src + ".webp")})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%",
                  background: `linear-gradient(115deg, transparent ${(sw - 0.16) * 100}%, rgba(255,238,215,.5) ${sw * 100}%, transparent ${(sw + 0.16) * 100}%)`, mixBlendMode: "screen" }} />
              </div>
              <div style={{ position: "absolute", left: "18%", right: "18%", bottom: -10, height: 2, background: `linear-gradient(90deg, transparent, ${MC[m]}, transparent)`, opacity: 0.85 * e, boxShadow: `0 0 18px ${MC[m]}` }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneTop: React.FC<{ t: number }> = ({ t }) => {
  // A tracking shot over all four top views, laid side by side at true relative size.
  const a = 23.2, b = 28.2, o = win(t, a, b, 0.9, 1.1);
  if (o <= 0) return null;
  const H = 600, gap = 70;
  const items: [string, string][] = [["p12", "12"], ["p16", "16"], ["p22", "22"], ["p32", "32"]];
  const widths = items.map(([s]) => H * AR[s]);
  const total = widths.reduce((q, w) => q + w, 0) + gap * 3;
  const k = prog(t, a, b, Easing.inOut(Easing.sin));
  const x0 = interpolate(k, [0, 1], [110, 1080 - total - 110]);
  let x = 0;
  return (
    <AbsoluteFill style={{ opacity: o, perspective: 1800 }}>
      <div style={{ position: "absolute", left: x0, top: 250, width: total, height: H, transform: `rotateX(${interpolate(k, [0, 1], [24, 14])}deg) rotateZ(${interpolate(k, [0, 1], [-3, 2])}deg)`, transformOrigin: "50% 60%" }}>
        {items.map(([s, m], i) => {
          const w = widths[i], left = x;
          x += w + gap;
          return (
            <div key={s} style={{ position: "absolute", left, top: 0, width: w, height: H }}>
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "20%", bottom: "-6%", background: `radial-gradient(closest-side, ${MC[m]}40, transparent)`, filter: "blur(30px)" }} />
              <Img src={hq(s + ".webp")} style={{ position: "relative", width: "100%", height: "100%", filter: "drop-shadow(0 36px 40px rgba(0,0,0,.8))" }} />
              <div style={{ position: "absolute", left: "15%", right: "15%", top: -18, height: 3, borderRadius: 2, background: MC[m], boxShadow: `0 0 20px ${MC[m]}` }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // small brand plate while the hero lock-up is off screen
  const tt = t > 15 ? t - L : t;
  const plate = 1 - interpolate(tt, [-3.0, -2.0, 2.0, 3.0], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#050506", overflow: "hidden" }}>
      <Room t={t} />
      <Scene12 t={t} />
      <Scene16 t={t} />
      <Scene22 t={t} />
      <Scene32 t={t} />
      <SceneFamily t={t} />
      <SceneTop t={t} />
      <SceneLogo t={t} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center", opacity: plate, transform: `translateY(${(1 - plate) * 20}px)` }}>
        <Lockup t={t} w={300} glow={0.5} />
      </div>
      {/* film grain + vignette */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundPosition: `${(frame * 37) % 240}px ${(frame * 53) % 240}px` }} />
    </AbsoluteFill>
  );
};
