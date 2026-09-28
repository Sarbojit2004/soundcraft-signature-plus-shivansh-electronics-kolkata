import React from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// ─────────────────────────────────────────────────────────────────────────────
// SIGNATURE PLUS · 30 s SQUARE LOOP
// A silent square motion piece for an Instagram post (rendered at 2160×2160).
// Frame 0 and the last frame are the same picture: everything that moves
// continuously is periodic over the full 30 s, and the logo lock-up that opens
// the piece is also the shot it resolves into.
//
// Each chapter pairs one model with one technology: a typography block (top
// left), an animated technical visualisation (top right) and the real product
// shots below. Chapters are cut with a light-blade wipe.
// ─────────────────────────────────────────────────────────────────────────────

const L = 30; // seconds
const AMBER = "#FFA95C";
const EASE = Easing.bezier(0.22, 1, 0.36, 1);
const TAU = Math.PI * 2;
const hq = (n: string) => staticFile("loop/hq/" + n);

// Self-hosted type, loaded before the first frame renders.
const DISP = "'LoopArchivo', 'Archivo Black', sans-serif";
const SERIF = "'LoopSerif', Georgia, serif";
const MONO = "'LoopMono', ui-monospace, monospace";
let fontsReady: Promise<unknown> | null = null;
const loadFonts = () => {
  fontsReady ??= Promise.all(([
    ["LoopArchivo", "Archivo-normal-100_900.woff2", { weight: "100 900", stretch: "62% 125%" }],
    ["LoopSerif", "InstrumentSerif-italic-400.woff2", { style: "italic" }],
    ["LoopMono", "JetBrainsMono-normal-400.woff2", { weight: "400 700" }],
  ] as [string, string, FontFaceDescriptors][]).map(([fam, file, d]) =>
    new FontFace(fam, `url(${staticFile("loop/fonts/" + file)}) format('woff2')`, d).load().then((f) => { (document.fonts as unknown as { add: (x: FontFace) => void }).add(f); })));
  return fontsReady;
};

/** 0→1→0 visibility for a scene living in [a, b] with `fi`/`fo` fades. */
const win = (t: number, a: number, b: number, fi = 0.9, fo = 0.9) =>
  interpolate(t, [a, a + fi, b - fo, b], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
/** Progress 0→1 through [a, b], eased. */
const prog = (t: number, a: number, b: number, e = EASE) => interpolate(t, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
/** Smooth deterministic "signal" in 0..1 — a sum of sines with seeded phases. */
const sig = (t: number, seed: string, speed = 1) => {
  const p1 = random(seed + "a") * TAU, p2 = random(seed + "b") * TAU, p3 = random(seed + "c") * TAU;
  const v = 0.5 + 0.28 * Math.sin(t * 5.1 * speed + p1) + 0.14 * Math.sin(t * 11.7 * speed + p2) + 0.08 * Math.sin(t * 23.3 * speed + p3);
  return Math.min(1, Math.max(0, v));
};

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
      <AbsoluteFill style={{ opacity: 0.55, mixBlendMode: "screen",
        background: `repeating-conic-gradient(from ${(t / L) * 360}deg at 50% -30%, rgba(255,210,160,0.06) 0deg 3deg, transparent 3deg 14deg)`,
        maskImage: "linear-gradient(180deg, #000 0%, transparent 75%)", WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 75%)" }} />
      <AbsoluteFill style={{ opacity: 0.5,
        backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)",
        backgroundSize: "54px 54px", backgroundPosition: `0 ${((t / L) * 54 * 4) % 54}px`,
        maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, #000 20%, transparent 80%)" }} />
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
  const sweep = ((t % L) / L) * 3 - 1;
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
      <AbsoluteFill style={{ background: `radial-gradient(560px 380px at 50% 64%, ${c}33, transparent 72%)` }} />
      <div style={{ position: "absolute", top: 300, left: interpolate(k, [0, 1], [nx0, nx1]), fontFamily: DISP, fontStretch: "125%", fontSize: 700, lineHeight: 1, fontWeight: 900,
        color: "transparent", WebkitTextStroke: `2px ${c}`, opacity: 0.12, letterSpacing: -20, whiteSpace: "nowrap" }}>{m}</div>
      <div style={{ position: "absolute", left: 0, right: 0, top: interpolate(k, [0, 1], [860, 420]), height: 2, opacity: 0.5 * Math.sin(k * Math.PI),
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`, boxShadow: `0 0 34px 6px ${c}55` }} />
    </AbsoluteFill>
  );
};

// ── typography ──────────────────────────────────────────────────────────────
/** Words rise through a mask into place, then lift out at the end of the window. */
const Reveal: React.FC<{ t: number; a: number; b: number; text: string; style: React.CSSProperties; delay?: number; stagger?: number }> = ({ t, a, b, text, style, delay = 0, stagger = 0.07 }) => (
  <div style={{ ...style, whiteSpace: "nowrap" }}>
    {text.split(" ").map((w, i) => {
      const inn = prog(t, a + delay + i * stagger, a + delay + i * stagger + 0.75);
      const out = prog(t, b - 0.6 + i * 0.04, b - 0.05 + i * 0.04, Easing.in(Easing.cubic));
      return (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", padding: "0.06em 0.04em 0.12em", margin: "-0.06em -0.04em -0.12em" }}>
          <span style={{ display: "inline-block", transform: `translateY(${(1 - inn) * 115 - out * 115}%)`, marginRight: "0.26em" }}>{w}</span>
        </span>
      );
    })}
  </div>
);

/** Mono spec line that decodes character by character, then fades at the end. */
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789+-/·#%";
const Scramble: React.FC<{ t: number; a: number; b: number; text: string; style: React.CSSProperties }> = ({ t, a, b, text, style }) => {
  const out = prog(t, b - 0.5, b);
  const tick = Math.floor(t * 24);
  return (
    <div style={{ ...style, whiteSpace: "nowrap", opacity: (t < a ? 0 : 1) * (1 - out), filter: `blur(${out * 6}px)` }}>
      {text.split("").map((ch, i) => {
        const settle = a + 0.35 + i * 0.016;
        if (ch === " ") return <span key={i}> </span>;
        if (t < a + 0.1 + i * 0.008) return <span key={i} style={{ opacity: 0 }}>{ch}</span>;
        if (t < settle) return <span key={i} style={{ color: "rgba(255,169,92,.8)" }}>{GLYPHS[Math.floor(random(`g${i}-${tick}`) * GLYPHS.length)]}</span>;
        return <span key={i}>{ch}</span>;
      })}
    </div>
  );
};

/** The chapter's type block, top left: kicker, two-line headline (display + serif), decoding spec line. */
const TypeBlock: React.FC<{ t: number; a: number; b: number; c: string; kicker: string; l1: string; l2: string; line?: string; spec: string; x?: number; y?: number; align?: "left" | "center" }> = ({ t, a, b, c, kicker, l1, l2, line, spec, x = 64, y = 92, align = "left" }) => {
  if (t < a - 0.1 || t > b + 0.3) return null;
  const bar = prog(t, a, a + 0.6) * (1 - prog(t, b - 0.5, b));
  const centered = align === "center";
  return (
    <div style={{ position: "absolute", left: centered ? 0 : x, right: centered ? 0 : undefined, top: y, textAlign: align, display: "flex", flexDirection: "column", alignItems: centered ? "center" : "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 34 * bar, height: 2, background: c, boxShadow: `0 0 12px ${c}` }} />
        <Scramble t={t} a={a} b={b} text={kicker} style={{ fontFamily: MONO, fontSize: 16, letterSpacing: "0.2em", color: c }} />
      </div>
      <Reveal t={t} a={a + 0.12} b={b} text={l1} style={{ fontFamily: DISP, fontWeight: 850, fontStretch: "125%", fontSize: 66, lineHeight: 0.98, letterSpacing: "-0.01em", color: "#F5F1EA", marginTop: 16, textTransform: l1.startsWith("dbx") ? "none" : "uppercase" }} />
      <Reveal t={t} a={a + 0.3} b={b} text={l2} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 72, lineHeight: 0.95, color: c, marginTop: 2 }} />
      {line && <Reveal t={t} a={a + 0.5} b={b} text={line} stagger={0.035} style={{ fontFamily: DISP, fontWeight: 500, fontStretch: "100%", fontSize: 24, lineHeight: 1.2, color: "#F1ECE3", marginTop: 14 }} />}
      <Scramble t={t} a={a + 0.7} b={b} text={spec} style={{ fontFamily: MONO, fontSize: 16.5, letterSpacing: "0.04em", color: "#C9C4BA", marginTop: 12 }} />
    </div>
  );
};

// ── technical visualisation card (top right) ────────────────────────────────
const VizCard: React.FC<{ t: number; a: number; b: number; c: string; label: string; right: string; children: (k: number, v: number) => React.ReactNode }> = ({ t, a, b, c, label, right, children }) => {
  if (t < a - 0.1 || t > b + 0.1) return null;
  const inn = prog(t, a + 0.2, a + 1.0, Easing.inOut(Easing.cubic));
  const out = prog(t, b - 0.55, b, Easing.in(Easing.cubic));
  const v = inn * (1 - out);
  const k = prog(t, a + 0.4, b - 0.4, Easing.linear);
  return (
    <div style={{ position: "absolute", left: 604, top: 96, width: 416, height: 262, borderRadius: 16, overflow: "hidden",
      clipPath: `inset(0 0 0 ${(1 - inn) * 100}% round 16px)`, opacity: 1 - out, transform: `translateY(${-out * 20}px)`, filter: `blur(${out * 8}px)`,
      background: "linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.025))", border: "1px solid rgba(255,255,255,.13)", boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}>
      <div style={{ position: "absolute", left: 18, right: 18, top: 14, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.2em", color: "#A8A49B" }}>
        <span><span style={{ color: c }}>●</span>&nbsp; {label}</span><span>{right}</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 1, background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />
      <svg width={416} height={262} viewBox="0 0 416 262" style={{ position: "absolute", left: 0, top: 0 }}>{children(k, v)}</svg>
    </div>
  );
};

// Ghost preamp: gain dial sweeping +6 → +65 dB, and four live input meters.
const GainViz: React.FC<{ t: number; c: string; k: number }> = ({ t, c, k }) => {
  const cx = 118, cy = 150, r = 78, a0 = 150, a1 = 390;
  const gain = interpolate(k, [0, 0.45, 0.7, 1], [6, 65, 44, 50], { easing: Easing.inOut(Easing.cubic) }) + 1.2 * Math.sin(t * 6);
  const ang = (g: number) => ((a0 + ((g - 6) / 59) * (a1 - a0)) * Math.PI) / 180;
  const arc = (g0: number, g1: number) => {
    const p0 = ang(g0), p1 = ang(g1), big = (p1 - p0) > Math.PI ? 1 : 0;
    return `M${cx + r * Math.cos(p0)} ${cy + r * Math.sin(p0)} A${r} ${r} 0 ${big} 1 ${cx + r * Math.cos(p1)} ${cy + r * Math.sin(p1)}`;
  };
  return (
    <g>
      <path d={arc(6, 65)} stroke="rgba(255,255,255,.12)" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d={arc(6, Math.max(6.5, gain))} stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 6px ${c})` }} />
      {Array.from({ length: 13 }).map((_, i) => {
        const g = 6 + (i / 12) * 59, p = ang(g);
        return <line key={i} x1={cx + (r - 16) * Math.cos(p)} y1={cy + (r - 16) * Math.sin(p)} x2={cx + (r - 22 - (i % 3 === 0 ? 5 : 0)) * Math.cos(p)} y2={cy + (r - 22 - (i % 3 === 0 ? 5 : 0)) * Math.sin(p)} stroke="rgba(255,255,255,.4)" strokeWidth="1.2" />;
      })}
      <line x1={cx} y1={cy} x2={cx + (r - 26) * Math.cos(ang(gain))} y2={cy + (r - 26) * Math.sin(ang(gain))} stroke="#F5F1EA" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#F5F1EA" />
      <text x={cx} y={cy + 52} textAnchor="middle" fontFamily={MONO} fontSize="22" fill="#F5F1EA">+{Math.round(gain)} dB</text>
      <text x={cx - r + 4} y={cy + 72} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#8F8B83">+6</text>
      <text x={cx + r - 4} y={cy + 72} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#8F8B83">+65</text>
      {Array.from({ length: 4 }).map((_, ch) => {
        const lvl = sig(t, `gain${ch}`, 1.1) * interpolate(k, [0, 0.3], [0.2, 1], { extrapolateRight: "clamp" });
        return (
          <g key={ch}>
            {Array.from({ length: 16 }).map((_, s) => {
              const on = s / 16 < lvl;
              const col = s >= 14 ? "#FF6B5E" : s >= 11 ? "#FFC94A" : "#4FE3A8";
              return <rect key={s} x={250 + ch * 36} y={220 - s * 11} width="24" height="8" rx="2" fill={on ? col : "rgba(255,255,255,.07)"} />;
            })}
            <text x={262 + ch * 36} y={244} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#8F8B83">{ch + 1}</text>
          </g>
        );
      })}
    </g>
  );
};

// Sapphyre EQ: response curve with the mid band sweeping 150 Hz – 3 kHz.
const EqViz: React.FC<{ t: number; c: string; k: number }> = ({ c, k }) => {
  const x0 = 34, x1 = 396, yc = 150, span = 62;
  const fx = (f: number) => x0 + ((Math.log10(f) - Math.log10(20)) / 3) * (x1 - x0);
  const fm = 150 * Math.pow(20, 0.5 - 0.5 * Math.cos(k * TAU * 1.5));
  const gain = (f: number) => 5 / (1 + Math.pow(f / 60, 2)) + 4 / (1 + Math.pow(12000 / f, 2)) - 8 * Math.exp(-Math.pow(Math.log2(f / fm) / 0.85, 2));
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) { const f = 20 * Math.pow(1000, i / 120); pts.push(`${fx(f).toFixed(1)},${(yc - (gain(f) / 12) * span).toFixed(1)}`); }
  const draw = prog(k, 0, 0.25);
  return (
    <g>
      {[20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000].map((f) => <line key={f} x1={fx(f)} y1={60} x2={fx(f)} y2={236} stroke="rgba(255,255,255,.06)" />)}
      {[100, 1000, 10000].map((f) => <text key={f} x={fx(f)} y={252} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#8F8B83">{f >= 1000 ? f / 1000 + "k" : f}</text>)}
      <line x1={x0} y1={yc} x2={x1} y2={yc} stroke="rgba(255,255,255,.22)" />
      <rect x={fx(150)} y={60} width={fx(3000) - fx(150)} height={176} fill={c} fillOpacity=".07" />
      <text x={(fx(150) + fx(3000)) / 2} y={76} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={c} letterSpacing="1.5">MID SWEEP 150 Hz – 3 kHz</text>
      <polyline points={pts.join(" ")} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} style={{ filter: `drop-shadow(0 0 6px ${c})` }} />
      {[[60, "LF 60"], [fm, "MID"], [12000, "HF 12k"]].map(([f, lab], i) => (
        <g key={i} opacity={draw}>
          <circle cx={fx(f as number)} cy={yc - (gain(f as number) / 12) * span} r="6" fill="#0B0C0F" stroke="#F5F1EA" strokeWidth="2" />
          <text x={fx(f as number)} y={yc - (gain(f as number) / 12) * span + (i === 1 ? 24 : -14)} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#D9D5CC">{lab}</text>
        </g>
      ))}
    </g>
  );
};

// dbx: soft-knee transfer curve with a live operating point, input vs output meters.
const CompViz: React.FC<{ t: number; c: string; k: number }> = ({ t, c, k }) => {
  const px = 30, py = 52, S = 180;
  const comp = (x: number) => { const th = 0.45, kn = 0.18, r = 0.3; if (x < th - kn / 2) return x; if (x > th + kn / 2) return th + (x - th) * r; const d = x - th + kn / 2; return x + ((r - 1) * d * d) / (2 * kn); };
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) { const x = i / 60; pts.push(`${(px + x * S).toFixed(1)},${(py + S - comp(x) * S).toFixed(1)}`); }
  const inp = 0.2 + 0.8 * sig(t, "dbx", 0.9);
  const out = comp(inp);
  const draw = prog(k, 0, 0.25);
  return (
    <g>
      <rect x={px} y={py} width={S} height={S} fill="none" stroke="rgba(255,255,255,.12)" />
      <line x1={px} y1={py + S} x2={px + S} y2={py} stroke="rgba(255,255,255,.3)" strokeDasharray="4 4" />
      <rect x={px + (0.45 - 0.09) * S} y={py} width={0.18 * S} height={S} fill={c} fillOpacity=".08" />
      <text x={px + 0.45 * S} y={py + 14} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill={c} letterSpacing="1.2">OVEREASY®</text>
      <polyline points={pts.join(" ")} fill="none" stroke={c} strokeWidth="3" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - draw} style={{ filter: `drop-shadow(0 0 6px ${c})` }} />
      <circle cx={px + inp * S} cy={py + S - out * S} r="6" fill="#F5F1EA" opacity={draw} />
      <text x={px + S} y={py + S + 16} textAnchor="end" fontFamily={MONO} fontSize="10" fill="#8F8B83">INPUT →</text>
      {[["IN", inp, "#F5F1EA"], ["OUT", out, c]].map(([lab, lvl, col], i) => (
        <g key={i}>
          <rect x={262 + i * 64} y={52} width="36" height={S} rx="6" fill="rgba(255,255,255,.06)" />
          <rect x={262 + i * 64} y={52 + S * (1 - (lvl as number))} width="36" height={S * (lvl as number)} rx="6" fill={col as string} opacity=".9" />
          <text x={280 + i * 64} y={py + S + 16} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#D9D5CC">{lab}</text>
        </g>
      ))}
      <line x1={250} y1={52 + S * (1 - 0.54)} x2={390} y2={52 + S * (1 - 0.54)} stroke="rgba(255,255,255,.3)" strokeDasharray="3 4" />
    </g>
  );
};

// 32 channels: 24 mono + 4 stereo pairs, all metering.
const ChannelViz: React.FC<{ t: number; c: string; k: number }> = ({ t, c, k }) => (
  <g>
    {Array.from({ length: 32 }).map((_, i) => {
      const stereo = i >= 24;
      const lvl = sig(t, `ch${stereo ? Math.floor(i / 2) : i}`, 1.2) * prog(k, i * 0.012, i * 0.012 + 0.2);
      const x = 22 + i * 11.6;
      return (
        <g key={i}>
          <rect x={x} y={56} width="8" height="168" rx="3" fill="rgba(255,255,255,.06)" />
          <rect x={x} y={56 + 168 * (1 - lvl)} width="8" height={168 * lvl} rx="3" fill={stereo ? c : "#E9E5DC"} opacity={stereo ? 1 : 0.85} />
        </g>
      );
    })}
    <line x1={22} y1={236} x2={22 + 24 * 11.6 - 4} y2={236} stroke="#E9E5DC" strokeWidth="1.5" />
    <line x1={22 + 24 * 11.6} y1={236} x2={22 + 32 * 11.6 - 4} y2={236} stroke={c} strokeWidth="1.5" />
    <text x={22 + 12 * 11.6} y={252} textAnchor="middle" fontFamily={MONO} fontSize="10" fill="#D9D5CC" letterSpacing="1.4">1–24 MONO</text>
    <text x={22 + 28 * 11.6} y={252} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={c} letterSpacing="1.4">25–32 STEREO</text>
  </g>
);

// Lexicon: decaying reverb tail, the 2 × 16 preset grid, a tap-tempo pulse.
const ReverbViz: React.FC<{ t: number; c: string; k: number }> = ({ t, c, k }) => {
  const n = 64, shown = Math.floor(n * prog(k, 0, 0.45));
  const sel = Math.floor(((t * 2.2) % 32 + 32) % 32);
  const pulse = 1 - (((t % 0.5) + 0.5) % 0.5) / 0.5;
  return (
    <g>
      {Array.from({ length: shown }).map((_, i) => {
        const env = Math.exp(-i / 18);
        const h = 110 * env * (0.45 + 0.55 * random(`rv${i}`));
        return <line key={i} x1={24 + i * 3.4} y1={150 - h / 2} x2={24 + i * 3.4} y2={150 + h / 2} stroke={i < 3 ? "#F5F1EA" : c} strokeWidth="2" strokeLinecap="round" opacity={0.35 + 0.65 * env} />;
      })}
      <text x={24} y={226} fontFamily={MONO} fontSize="10" fill="#8F8B83" letterSpacing="1.3">DECAY →</text>
      {Array.from({ length: 32 }).map((_, i) => {
        const row = Math.floor(i / 16), col = i % 16;
        return <rect key={i} x={256 + (col % 8) * 17} y={64 + row * 64 + Math.floor(col / 8) * 18} width="12" height="12" rx="3" fill={i === sel ? c : "rgba(255,255,255,.1)"} style={i === sel ? { filter: `drop-shadow(0 0 5px ${c})` } : undefined} />;
      })}
      <text x={256} y={58} fontFamily={MONO} fontSize="9.5" fill="#A8A49B" letterSpacing="1.2">BANK A</text>
      <text x={256} y={122} fontFamily={MONO} fontSize="9.5" fill="#A8A49B" letterSpacing="1.2">BANK B</text>
      <circle cx={300} cy={210} r={14 + 8 * pulse} fill="none" stroke={c} strokeOpacity={0.3 + 0.5 * pulse} strokeWidth="2" />
      <circle cx={300} cy={210} r="9" fill={c} />
      <text x={326} y={214} fontFamily={MONO} fontSize="10" fill="#D9D5CC" letterSpacing="1.3">TAP TEMPO</text>
    </g>
  );
};

// USB-C: four channels out to the computer, four back.
const UsbViz: React.FC<{ t: number; c: string; k: number }> = ({ t, c, k }) => (
  <g>
    <rect x={20} y={70} width={84} height={150} rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.18)" />
    {Array.from({ length: 6 }).map((_, i) => <rect key={i} x={32 + i * 11} y={90 + ((i * 37) % 60)} width="6" height="14" rx="2" fill="#E9E5DC" />)}
    <text x={62} y={208} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#A8A49B">MIXER</text>
    <rect x={318} y={96} width={78} height={52} rx="5" fill="none" stroke="#E9E5DC" strokeWidth="1.6" />
    <path d="M308 156h98l-8 8h-82Z" fill="#E9E5DC" opacity=".8" />
    <text x={357} y={186} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#A8A49B">COMPUTER</text>
    {Array.from({ length: 8 }).map((_, i) => {
      const outb = i < 4, y = 84 + i * 17, x0 = 112, x1 = 304;
      return (
        <g key={i} opacity={prog(k, i * 0.03, i * 0.03 + 0.2)}>
          <line x1={x0} y1={y} x2={x1} y2={y} stroke={outb ? c : "rgba(255,255,255,.5)"} strokeOpacity=".35" strokeWidth="1.5" strokeDasharray={outb ? undefined : "4 4"} />
          {Array.from({ length: 3 }).map((_, j) => {
            const ph = (((t * 0.9 + j / 3 + i * 0.07) % 1) + 1) % 1;
            const x = outb ? x0 + ph * (x1 - x0) : x1 - ph * (x1 - x0);
            return <circle key={j} cx={x} cy={y} r="3" fill={outb ? c : "#F5F1EA"} opacity={Math.sin(ph * Math.PI)} />;
          })}
          <text x={outb ? x0 + 2 : x1 - 2} y={y - 4} textAnchor={outb ? "start" : "end"} fontFamily={MONO} fontSize="8.5" fill={outb ? c : "#CFCAC0"} opacity=".9">{outb ? `REC ${i + 1} →` : `← PLAY ${i - 3}`}</text>
        </g>
      );
    })}
  </g>
);

// ── chapter transitions: a diagonal light blade ─────────────────────────────
const CUTS = [2.6, 6.85, 11.05, 15.25, 17.55, 19.45, 23.65, 28.9];
const Blades: React.FC<{ t: number }> = ({ t }) => (
  <>
    {CUTS.map((T, i) => {
      const p = (t - (T - 0.35)) / 0.7;
      if (p <= 0 || p >= 1) return null;
      const e = Easing.inOut(Easing.cubic)(p);
      return (
        <AbsoluteFill key={i} style={{ pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: -400, left: -600 + e * 2280, width: 260, height: 1900, transform: "rotate(18deg)",
            background: "linear-gradient(90deg, transparent, rgba(255,226,196,.16) 35%, rgba(255,240,225,.55) 50%, rgba(255,226,196,.16) 65%, transparent)", mixBlendMode: "screen" }} />
          <AbsoluteFill style={{ background: "#fff", opacity: 0.07 * Math.sin(p * Math.PI), mixBlendMode: "screen" }} />
        </AbsoluteFill>
      );
    })}
  </>
);

// ── scenes ──────────────────────────────────────────────────────────────────
const SceneLogo: React.FC<{ t: number }> = ({ t }) => {
  // The rotating rings bridge the loop seam (28.4 s → 2.8 s); the logo lock-up
  // itself appears only in the opening, fading in over the bare rings at 0.2 s.
  // Frame 0 and the last frame are both "rings, no logo", so the loop is clean.
  const tt = t > 15 ? t - L : t; // −1.6 … 2.8, continuous across the seam
  const ringO = interpolate(tt, [-1.6, -0.8, 1.9, 2.8], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  if (ringO <= 0) return null;
  const logoIn = t < 15 ? prog(t, 0.2, 1.2) : 0;
  const out = prog(tt, 1.8, 2.8, Easing.in(Easing.cubic));
  const o = logoIn * (1 - out);
  const breathe = 1 + 0.012 * Math.cos((tt / 5) * TAU);
  return (
    <AbsoluteFill>
      <Rings t={t} size={820 + 60 * out + 80 * (1 - ringO)} o={0.9 * ringO} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: o }}>
        <div style={{ transform: `scale(${breathe * (1 + 0.08 * out - 0.06 * (1 - logoIn))})`, filter: `blur(${(out + (1 - logoIn)) * 10}px)`, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: "0.5em", color: AMBER, marginBottom: 34, paddingLeft: "0.5em" }}>SOUNDCRAFT · SIGNATURE PLUS SERIES</div>
          <Lockup t={t} w={600} glow={1.2} />
          <div style={{ marginTop: 38, display: "flex", gap: 26, alignItems: "baseline" }}>
            {["12", "16", "22", "32"].map((m) => (
              <span key={m} style={{ fontFamily: DISP, fontWeight: 850, fontStretch: "125%", fontSize: 34, color: "#F5F1EA", display: "flex", alignItems: "center", gap: 10 }}>
                <i style={{ width: 8, height: 8, borderRadius: 4, background: MC[m], boxShadow: `0 0 10px ${MC[m]}` }} />{m}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 40, color: "#E9E3D8", marginTop: 16 }}>Professional analog mixing, perfected.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Scene12: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="12" a={2.2} b={7.0} nx0={560} nx1={430} />
  <Shot t={t} src="l12" w={820} a={2.2} b={4.9} fo={0.8} from={{ x: 660, y: 660, s: 1.1, ry: -10 }} to={{ x: 560, y: 650, s: 1.0, ry: 4 }} />
  <Shot t={t} src="h12" w={600} a={4.3} b={7.0} fi={0.8} from={{ x: 600, y: 675, s: 1.08, ry: 14, rx: 6 }} to={{ x: 560, y: 658, s: 0.96, ry: -6, rx: 2 }} refl={0.12} />
  <TypeBlock t={t} a={2.85} b={6.8} c={MC["12"]} kicker="SIGNATURE PLUS 12 · 01" l1="Ghost™" l2="mic preamps." line="Clean, quiet gain for every voice." spec="+6 TO +65 dB GAIN · PAD · 100 Hz FILTER" />
  <VizCard t={t} a={2.85} b={6.8} c={MC["12"]} label="GAIN · dB" right="CH 1–4">{(k) => <GainViz t={t} c={MC["12"]} k={k} />}</VizCard>
</>);
const Scene16: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="16" a={6.4} b={11.2} nx0={40} nx1={170} />
  <Shot t={t} src="l16" w={820} a={6.4} b={9.1} fo={0.8} from={{ x: 480, y: 660, s: 1.1, ry: 10 }} to={{ x: 620, y: 650, s: 1.0, ry: -4 }} />
  <Shot t={t} src="h16" w={640} a={8.5} b={11.2} fi={0.8} from={{ x: 560, y: 695, s: 0.9, rx: 16 }} to={{ x: 560, y: 658, s: 1.02, rx: 3 }} refl={0.12} />
  <TypeBlock t={t} a={7.05} b={11.0} c={MC["16"]} kicker="SIGNATURE PLUS 16 · 02" l1="Sapphyre™" l2="three-band EQ." line="Shape any source in seconds." spec="SWEPT MID 150 Hz – 3 kHz · 60 Hz / 12 kHz SHELVES" />
  <VizCard t={t} a={7.05} b={11.0} c={MC["16"]} label="EQ RESPONSE" right="20 Hz – 20 kHz">{(k) => <EqViz t={t} c={MC["16"]} k={k} />}</VizCard>
</>);
const Scene22: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="22" a={10.6} b={15.4} nx0={520} nx1={400} />
  <Shot t={t} src="s22" w={960} a={10.6} b={13.2} fo={0.8} from={{ x: 680, y: 660, s: 1.15 }} to={{ x: 500, y: 650, s: 1.0 }} />
  <Shot t={t} src="h22" w={680} a={12.6} b={15.4} fi={0.8} from={{ x: 560, y: 675, s: 1.1, ry: -14 }} to={{ x: 560, y: 658, s: 0.97, ry: 6 }} refl={0.12} />
  <TypeBlock t={t} a={11.25} b={15.2} c={MC["22"]} kicker="SIGNATURE PLUS 22 · 03" l1="dbx®" l2="compression." line="Even levels, without riding faders." spec="OVEREASY® · ONE KNOB · EVERY MONO CHANNEL" />
  <VizCard t={t} a={11.25} b={15.2} c={MC["22"]} label="TRANSFER CURVE" right="IN / OUT">{(k) => <CompViz t={t} c={MC["22"]} k={k} />}</VizCard>
</>);
const Scene32: React.FC<{ t: number }> = ({ t }) => (<>
  <Accent t={t} m="32" a={14.8} b={19.6} nx0={60} nx1={180} />
  <Shot t={t} src="p32" w={1300} a={14.8} b={17.5} fo={0.8} sweep={false} from={{ x: 560, y: 670, s: 1.1, rx: 56, rz: -18 }} to={{ x: 560, y: 680, s: 0.92, rx: 36, rz: -8 }} />
  <Shot t={t} src="l32" w={860} a={16.9} b={19.6} fi={0.8} from={{ x: 620, y: 670, s: 1.1, ry: -8 }} to={{ x: 540, y: 658, s: 1.0, ry: 4 }} />
  <TypeBlock t={t} a={15.45} b={17.55} c={MC["32"]} kicker="SIGNATURE PLUS 32 · 04" l1="24 mono" l2="+ 4 stereo." line="Room for the whole band." spec="32 INPUTS · 4 AUX SENDS PER CHANNEL, PRE / POST" />
  <VizCard t={t} a={15.45} b={17.55} c={MC["32"]} label="CHANNEL METERS" right="32 INPUTS">{(k) => <ChannelViz t={t} c={MC["32"]} k={k} />}</VizCard>
  <TypeBlock t={t} a={17.6} b={19.4} c={MC["32"]} kicker="SIGNATURE PLUS 32 · 05" l1="Lexicon®" l2="effects." line="Studio reverbs and delays, built in." spec="32 PRESETS · 2 BANKS OF 16 · TAP TEMPO" />
  <VizCard t={t} a={17.6} b={19.4} c={MC["32"]} label="REVERB · PRESETS" right="A / B">{(k) => <ReverbViz t={t} c={MC["32"]} k={k} />}</VizCard>
</>);

const SceneFamily: React.FC<{ t: number }> = ({ t }) => {
  const a = 19.0, b = 23.8, o = win(t, a, b, 0.9, 1.0);
  if (o <= 0) return null;
  const P: [string, string, number, number, number, number, number][] = [
    ["h12", "12", 290, 545, 370, 0, 6], ["h16", "16", 790, 545, 410, 0.16, 10], ["h22", "22", 290, 845, 430, 0.32, 14], ["h32", "32", 790, 848, 480, 0.48, 24],
  ];
  const drift = prog(t, a, b, Easing.inOut(Easing.sin));
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <TypeBlock t={t} a={19.6} b={23.6} c={AMBER} kicker="ONE FAMILY · 06" l1="Four sizes." l2="one desk." line="Pick the size. Keep the sound." spec="SAME CHANNEL STRIP ON EVERY MODEL" align="center" y={82} />
      <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + drift * 0.05}) rotate(${interpolate(drift, [0, 1], [-1, 1])}deg)`, transformOrigin: "50% 65%" }}>
        {P.map(([src, m, x, y, w, d, mono], i) => {
          const e = prog(t, a + 0.1 + d, a + 1.5 + d);
          const h = w / AR[src];
          const dx = (i % 2 ? 1 : -1) * 460 * (1 - e);
          const sw = interpolate(t, [a + 1.2 + d, a + 3.6 + d], [-0.35, 1.35]);
          const cnt = prog(t, a + 0.8 + d, a + 2.2 + d, Easing.out(Easing.cubic));
          return (
            <div key={i} style={{ position: "absolute", left: x - w / 2 + dx, top: y - h / 2 + 40 * (1 - e), width: w, opacity: e, filter: `blur(${(1 - e) * 12}px)` }}>
              <div style={{ position: "absolute", left: "8%", right: "8%", top: "35%", bottom: "-12%", background: `radial-gradient(closest-side, ${MC[m]}55, transparent)`, filter: "blur(22px)" }} />
              <div style={{ position: "relative" }}>
                <Img src={hq(src + ".webp")} style={{ width: "100%", display: "block", filter: "drop-shadow(0 30px 34px rgba(0,0,0,.75))" }} />
                <div style={{ position: "absolute", inset: 0, maskImage: `url(${hq(src + ".webp")})`, WebkitMaskImage: `url(${hq(src + ".webp")})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%",
                  background: `linear-gradient(115deg, transparent ${(sw - 0.16) * 100}%, rgba(255,238,215,.5) ${sw * 100}%, transparent ${(sw + 0.16) * 100}%)`, mixBlendMode: "screen" }} />
              </div>
              <div style={{ position: "absolute", left: "18%", right: "18%", bottom: -10, height: 2, background: `linear-gradient(90deg, transparent, ${MC[m]}, transparent)`, opacity: 0.85 * e, boxShadow: `0 0 18px ${MC[m]}` }} />
              <div style={{ position: "absolute", left: 0, top: -40, display: "flex", alignItems: "baseline", gap: 12, opacity: cnt }}>
                <span style={{ fontFamily: DISP, fontWeight: 850, fontStretch: "125%", fontSize: 34, color: "#F5F1EA" }}>{m}</span>
                <span style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: MC[m] }}>{Math.round(mono * cnt)} MONO · {Math.round(Number(m) * cnt)} IN</span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const SceneTop: React.FC<{ t: number }> = ({ t }) => {
  // A tracking shot over all four top views, laid side by side at true relative size.
  const a = 23.2, b = 29.4, o = win(t, a, b, 0.9, 1.2);
  if (o <= 0) return null;
  const H = 540, gap = 70;
  const items: [string, string][] = [["p12", "12"], ["p16", "16"], ["p22", "22"], ["p32", "32"]];
  const widths = items.map(([s]) => H * AR[s]);
  const total = widths.reduce((q, w) => q + w, 0) + gap * 3;
  const k = prog(t, a, b, Easing.inOut(Easing.sin));
  const x0 = interpolate(k, [0, 1], [110, 1080 - total - 110]);
  let x = 0;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <AbsoluteFill style={{ perspective: 1800 }}>
        <div style={{ position: "absolute", left: x0, top: 380, width: total, height: H, transform: `rotateX(${interpolate(k, [0, 1], [24, 14])}deg) rotateZ(${interpolate(k, [0, 1], [-3, 2])}deg)`, transformOrigin: "50% 60%" }}>
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
      <TypeBlock t={t} a={23.85} b={28.6} c={AMBER} kicker="EVERY MODEL · 07" l1="USB-C" l2="four in, four out." line="Record the show while you mix it." spec="MULTITRACK RECORD & PLAYBACK · NO EXTRA INTERFACE" />
      <VizCard t={t} a={23.85} b={28.6} c={AMBER} label="USB-C · 4 × 4" right="REC / PLAY">{(k2) => <UsbViz t={t} c={AMBER} k={k2} />}</VizCard>
    </AbsoluteFill>
  );
};

export const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // Hold the frame until the self-hosted type is ready (Remotion's documented delayRender pattern).
  const [fontHandle] = React.useState(() => delayRender("loop fonts"));
  React.useEffect(() => {
    loadFonts().then(() => continueRender(fontHandle), () => continueRender(fontHandle));
  }, [fontHandle]);
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
      <Blades t={t} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,.6) 100%)" }} />
      <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundPosition: `${(frame * 37) % 240}px ${(frame * 53) % 240}px` }} />
    </AbsoluteFill>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// THUMBNAIL · 1080×1920 portrait (rendered at 2x → 2160×3840)
// The loop's poster frame: the family, the three signature technologies as
// live graphics, and the two logos.
// ─────────────────────────────────────────────────────────────────────────────
const MiniCard: React.FC<{ c: string; label: string; x: number; y: number; w: number; children: React.ReactNode }> = ({ c, label, x, y, w, children }) => {
  const h = (w * 262) / 416;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 18, overflow: "hidden",
      background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.025))", border: "1px solid rgba(255,255,255,.14)", boxShadow: "0 30px 60px rgba(0,0,0,.55)" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 2, background: `linear-gradient(90deg, transparent, ${c}, transparent)` }} />
      <div style={{ position: "absolute", left: 14, top: 12, fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: "#B5B0A6" }}><span style={{ color: c }}>●</span>&nbsp; {label}</div>
      <svg width={w} height={h} viewBox="0 0 416 262" style={{ position: "absolute", left: 0, top: 0 }}>{children}</svg>
    </div>
  );
};

export const LoopThumb: React.FC = () => {
  const [fontHandle] = React.useState(() => delayRender("thumb fonts"));
  React.useEffect(() => { loadFonts().then(() => continueRender(fontHandle), () => continueRender(fontHandle)); }, [fontHandle]);
  const W = 1080, H = 1920;
  const fam: [string, string, number, number, number][] = [
    ["h22", "22", 285, 1000, 540], ["h16", "16", 800, 975, 500], ["h32", "32", 650, 1235, 700], ["h12", "12", 245, 1375, 440],
  ];
  return (
    <AbsoluteFill style={{ background: "#050506", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(130% 90% at 50% 45%, #111217 0%, #07080A 60%, #030304 100%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(700px 520px at 78% 22%, rgba(255,169,92,.22), transparent 70%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(760px 620px at 18% 62%, rgba(110,150,255,.16), transparent 70%)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(620px 360px at 55% 74%, rgba(255,169,92,.20), transparent 72%)" }} />
      <AbsoluteFill style={{ opacity: 0.6, mixBlendMode: "screen",
        background: "repeating-conic-gradient(from 12deg at 50% -18%, rgba(255,210,160,0.06) 0deg 3deg, transparent 3deg 14deg)",
        maskImage: "linear-gradient(180deg, #000 0%, transparent 60%)", WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 60%)" }} />
      <AbsoluteFill style={{ opacity: 0.55,
        backgroundImage: "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)", backgroundSize: "54px 54px",
        maskImage: "radial-gradient(ellipse 70% 45% at 50% 55%, #000 20%, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 70% 45% at 50% 55%, #000 20%, transparent 85%)" }} />
      {Array.from({ length: 90 }).map((_, i) => {
        const r = random(`td${i}`), s = 1.5 + r * 4;
        return <div key={i} style={{ position: "absolute", left: random(`tx${i}`) * W, top: random(`ty${i}`) * H, width: s, height: s, borderRadius: "50%",
          background: i % 5 === 0 ? "rgba(140,170,255,.8)" : "rgba(255,220,180,.8)", opacity: 0.1 + 0.35 * r, filter: s > 4 ? "blur(1px)" : undefined }} />;
      })}
      {/* dial rings behind the hero */}
      <svg width={1500} height={1500} viewBox="-100 -100 200 200" style={{ position: "absolute", left: W / 2 - 750, top: 1150 - 750, opacity: 0.55 }}>
        <circle r="96" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth=".3" />
        <circle r="96" fill="none" stroke={AMBER} strokeWidth=".6" strokeDasharray="60 543" transform="rotate(200)" />
        <circle r="84" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth=".25" strokeDasharray="1 3" />
        {Array.from({ length: 60 }).map((_, i) => { const a = (i / 60) * TAU, long = i % 5 === 0;
          return <line key={i} x1={Math.cos(a) * 88} y1={Math.sin(a) * 88} x2={Math.cos(a) * (long ? 92 : 90)} y2={Math.sin(a) * (long ? 92 : 90)} stroke={long ? AMBER : "rgba(255,255,255,.3)"} strokeWidth={long ? 0.5 : 0.25} />; })}
      </svg>

      {/* logos + title */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, display: "flex", justifyContent: "center" }}><Lockup t={9} w={470} glow={1} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center" }}>
        <div style={{ fontFamily: MONO, fontSize: 19, letterSpacing: "0.46em", color: AMBER, paddingLeft: "0.46em" }}>SIGNATURE PLUS SERIES</div>
        <div style={{ fontFamily: DISP, fontWeight: 850, fontStretch: "125%", fontSize: 132, lineHeight: 0.95, letterSpacing: "-0.015em", color: "#F5F1EA", marginTop: 26, textTransform: "uppercase" }}>Four sizes.</div>
        <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 150, lineHeight: 0.9, color: AMBER, marginTop: 4, textShadow: "0 0 40px rgba(255,169,92,.35)" }}>one desk.</div>
        <div style={{ fontFamily: DISP, fontWeight: 500, fontSize: 30, color: "#EAE4DA", marginTop: 22 }}>Professional analog mixing, perfected.</div>
      </div>

      {/* the family */}
      {fam.map(([src, m, x, y, w]) => {
        const h = w / AR[src];
        return (
          <div key={src} style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w }}>
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "35%", bottom: "-14%", background: `radial-gradient(closest-side, ${MC[m]}50, transparent)`, filter: "blur(26px)" }} />
            <Img src={hq(src + ".webp")} style={{ position: "relative", width: "100%", display: "block", filter: "drop-shadow(0 40px 44px rgba(0,0,0,.8))" }} />
            <div style={{ position: "absolute", left: "20%", right: "20%", bottom: -12, height: 2, background: `linear-gradient(90deg, transparent, ${MC[m]}, transparent)`, boxShadow: `0 0 18px ${MC[m]}` }} />
          </div>
        );
      })}
      {/* model badges */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1535, display: "flex", justifyContent: "center", gap: 34 }}>
        {["12", "16", "22", "32"].map((m) => (
          <div key={m} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 22px", borderRadius: 999, border: `1px solid ${MC[m]}77`, background: `${MC[m]}1a` }}>
            <i style={{ width: 10, height: 10, borderRadius: 5, background: MC[m], boxShadow: `0 0 12px ${MC[m]}` }} />
            <span style={{ fontFamily: DISP, fontWeight: 850, fontStretch: "125%", fontSize: 34, color: "#F5F1EA" }}>{m}</span>
          </div>
        ))}
      </div>
      {/* the three signature technologies, as live graphics */}
      <MiniCard c={MC["12"]} label="GHOST™ PREAMPS" x={40} y={1640} w={318}><GainViz t={3.1} c={MC["12"]} k={0.62} /></MiniCard>
      <MiniCard c={MC["16"]} label="SAPPHYRE™ EQ" x={381} y={1640} w={318}><EqViz t={0} c={MC["16"]} k={0.55} /></MiniCard>
      <MiniCard c={MC["22"]} label="dbx® COMPRESSION" x={722} y={1640} w={318}><CompViz t={2.4} c={MC["22"]} k={0.6} /></MiniCard>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1862, textAlign: "center", fontFamily: MONO, fontSize: 16, letterSpacing: "0.22em", color: "#B9B4AA" }}>
        LEXICON® EFFECTS · USB-C 4 × 4 · 4 AUX SENDS
      </div>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 60%, rgba(0,0,0,.55) 100%)" }} />
    </AbsoluteFill>
  );
};
