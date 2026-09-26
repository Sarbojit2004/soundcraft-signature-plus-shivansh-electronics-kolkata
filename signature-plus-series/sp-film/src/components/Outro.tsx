import React from "react";
import { AbsoluteFill, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, CONTACT, FONT, GROUND, INK, type Canvas, safeW } from "../theme.ts";
import { asset } from "./Shots.tsx";
import { SiteIcon, SocialIcon, WhatsAppIcon } from "./Icons.tsx";

// ─────────────────────────────────────────────────────────────────────────────
// THE END SCREEN — the only place any brand mark, website, number or social
// handle appears. 6 s on the reel, 10 s on the video, so everything lands in
// the first two seconds and then holds.
//
// Behind it, the four real consoles glide past (so the end screen still shows
// what the film was about); in front, a cream card the two logos are native to
// — both are dark artwork — carrying the partner line (no territory), the
// website, the three numbers and the four social handles.
// ─────────────────────────────────────────────────────────────────────────────

const WA = "#128C7E";
const SITE = "#1F5FD0";
const SOCIAL_COL: Record<string, string> = { facebook: "#1877F2", instagram: "#C13584", youtube: "#E62117", linkedin: "#0A66C2" };
const CONSOLES = ["render-signature-plus-12-3-webp", "render-signature-plus-16-2-webp", "render-signature-plus-22-4-webp", "render-signature-plus-32-3-webp"];

export const Outro: React.FC<{ canvas: Canvas }> = ({ canvas }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = ACCENT.all;
  const P = canvas.portrait;
  const S = (n: number) => n * (P ? 1 : 0.8);
  const at = (d: number, dur = 14) => spring({ frame: f - d, fps, config: { damping: 200, mass: 0.5 }, durationInFrames: dur });
  const rise = at(0, 20);

  // ── the room and the consoles gliding behind the card ──
  const stripH = P ? 620 : 560;
  const stripTop = P ? canvas.safe.top + 10 : 70;
  const glide = interpolate(f, [0, 300], [0, P ? -420 : -700]);
  const Room = (
    <>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 90% 55% at 50% 40%, #1C1A1F 0%, #0C0B0E 55%, #050506 100%)" }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 30% at 50% ${P ? 14 : 18}%, ${accent.glow}22 0%, ${accent.glow}00 72%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: stripTop, height: stripH, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, height: stripH, left: glide + (P ? 60 : 200), display: "flex", gap: P ? 80 : 140, alignItems: "flex-end", opacity: at(2, 18) }}>
          {[...CONSOLES, ...CONSOLES].map((slug, i) => {
            const a = asset(slug);
            const h = stripH * 0.86;
            return (
              <div key={i} style={{ position: "relative", height: stripH, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Img src={staticFile(a.file)} style={{ height: h, width: h * a.ar, filter: undefined }} />
              </div>
            );
          })}
        </div>
        <AbsoluteFill style={{ background: "linear-gradient(90deg, #050506 0%, rgba(5,5,6,0) 12%, rgba(5,5,6,0) 88%, #050506 100%)" }} />
      </div>
      {Array.from({ length: 22 }).map((_, i) => {
        const rs = random(`os${i}`);
        return (
          <div key={i} style={{ position: "absolute", left: random(`ox${i}`) * canvas.width, top: random(`oy${i}`) * canvas.height, width: 4 + rs * 7, height: 4 + rs * 7, borderRadius: "50%", background: "rgba(255,236,214,0.5)", opacity: (0.14 + rs * 0.3) * rise, transform: `translateY(${Math.sin((f + i * 24) / 78) * 22}px)` }} />
        );
      })}
    </>
  );

  const Logos = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: S(70), opacity: at(4) }}>
      <Img src={staticFile("logos/shivansh.png")} style={{ height: S(210), width: "auto" }} />
      <div style={{ width: 3, height: S(170), background: "rgba(24,22,20,0.16)" }} />
      <Img src={staticFile("logos/soundcraft.png")} style={{ height: S(200), width: "auto" }} />
    </div>
  );

  const Role = (
    <div style={{ textAlign: "center", fontSize: S(44), letterSpacing: 2.4, lineHeight: 1.45, color: INK.onLightSoft, textTransform: "uppercase", opacity: at(8), marginTop: S(34) }}>
      {CONTACT.role}
      <br />
      <span style={{ color: accent.key, letterSpacing: 3.4, fontSize: S(50) }}>{CONTACT.role2}</span>
    </div>
  );

  const Row: React.FC<{ icon: React.ReactNode; text: string; d: number; size: number }> = ({ icon, text, d, size }) => {
    const p = at(d, 12);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: S(30), padding: `${S(16)}px 0`, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)` }}>
        {icon}
        <div style={{ fontSize: size, letterSpacing: 1.2, color: INK.onLight, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{text}</div>
      </div>
    );
  };

  const Contact = (
    <div>
      {CONTACT.whatsapp.map((num, i) => (
        <Row key={num} icon={<WhatsAppIcon size={S(84)} color={WA} />} text={num} d={12 + i * 4} size={S(76)} />
      ))}
      <Row icon={<SiteIcon size={S(80)} color={SITE} />} text={CONTACT.site} d={24} size={S(66)} />
    </div>
  );

  const Social = (
    <div>
      <div style={{ fontSize: S(46), letterSpacing: 9, color: accent.key, opacity: at(28), marginBottom: S(6) }}>FOLLOW US</div>
      {CONTACT.social.map(([k, handle], i) => (
        <Row key={k} icon={<SocialIcon kind={k} size={S(70)} color={SOCIAL_COL[k]} />} text={handle} d={30 + i * 3} size={S(52)} />
      ))}
    </div>
  );

  const card: React.CSSProperties = {
    background: `linear-gradient(180deg, ${GROUND.lightLift} 0%, ${GROUND.light} 62%, ${GROUND.lightSink} 100%)`,
    borderRadius: S(52),
    boxShadow: "0 46px 120px rgba(0,0,0,0.72)",
    border: "3px solid rgba(255,255,255,0.22)",
    opacity: rise,
  };
  const Rule = <div style={{ height: 3, background: "rgba(24,22,20,0.14)", margin: `${S(34)}px 0 ${S(14)}px`, opacity: at(12) }} />;

  if (P) {
    return (
      <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
        {Room}
        <div
          style={{
            position: "absolute", left: canvas.safe.left - 40, width: safeW(canvas) + 80, top: 1040,
            transform: `translateY(${interpolate(rise, [0, 1], [80, 0])}px) scale(${interpolate(rise, [0, 1], [0.95, 1])})`,
            padding: "80px 80px 70px", ...card,
          }}
        >
          {Logos}
          {Role}
          {Rule}
          {Contact}
          {Rule}
          {Social}
        </div>
      </AbsoluteFill>
    );
  }

  const cardW = Math.min(safeW(canvas), 3300);
  return (
    <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
      {Room}
      <div
        style={{
          position: "absolute", left: (canvas.width - cardW) / 2, width: cardW, top: 690,
          transform: `translateY(${interpolate(rise, [0, 1], [70, 0])}px) scale(${interpolate(rise, [0, 1], [0.96, 1])})`,
          padding: `${S(64)}px ${S(84)}px ${S(56)}px`, display: "grid", gridTemplateColumns: "1.12fr 1fr", columnGap: S(80), alignItems: "center", ...card,
        }}
      >
        <div>
          {Logos}
          {Role}
          <div style={{ height: 3, background: "rgba(24,22,20,0.14)", margin: `${S(34)}px 0 ${S(10)}px`, opacity: at(12) }} />
          {Social}
        </div>
        <div style={{ borderLeft: "3px solid rgba(24,22,20,0.14)", paddingLeft: S(70) }}>{Contact}</div>
      </div>
    </AbsoluteFill>
  );
};
