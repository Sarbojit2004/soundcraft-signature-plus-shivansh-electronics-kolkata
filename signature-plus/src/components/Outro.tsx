import React from "react";
import { AbsoluteFill, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, CONTACT, FONT, GROUND, INK, MODELS, formatFor } from "../theme.ts";
import { img, LINEUP } from "../assets.ts";
import { SiteIcon, WhatsAppIcon } from "./Icons.tsx";

// ─────────────────────────────────────────────────────────────────────────────
// THE END SCREEN
//
// Eight seconds, at the very end, and the only place any brand mark appears.
// That is the instruction and it is also the right call for this kind of film:
// branding sprinkled through five minutes asks a viewer to ignore it fifty
// times; branding withheld to the end arrives once, on a viewer who has already
// decided to watch to the end.
//
// Both supplied logos are dark artwork on a white plate, not transparent
// cut-outs, so dropping them on a dark ground would put two white rectangles in
// the middle of the frame. The end screen is therefore built the other way
// round: a dark room, and a cream CARD inside it that the logos are native to.
// The card is also what makes three phone numbers legible — they sit on a solid
// ground rather than over a photograph.
//
// The landscape film has room the vertical one does not, so it also shows the
// four consoles across the top. The vertical film states them as numbers.
// ─────────────────────────────────────────────────────────────────────────────

const WA = "#128C7E";
const SITE = "#1F5FD0";

export const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps, width: W, height: H } = useVideoConfig();
  const fmt = formatFor(W, H);
  const acc = ACCENT.shared;
  const SAFE = fmt.safe;

  const rise = spring({ frame: f, fps, config: { damping: 200, mass: 0.8 }, durationInFrames: 24 });
  const at = (d: number, dur = 14) => spring({ frame: f - d, fps, config: { damping: 200, mass: 0.5 }, durationInFrames: dur });

  // A slow continuous push, so the end screen is never a frozen JPEG.
  const dolly = 1 + (Math.min(f, 240) / 240) * 0.035;
  const gridPitch = Math.round(W / 16);

  // ── the room, shared by both formats ───────────────────────────────────
  const room = (
    <>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 88% 52% at 50% 40%, #191C24 0%, #0B0D11 54%, #040507 100%)" }} />
      <AbsoluteFill
        style={{
          opacity: 0.40 * rise,
          backgroundImage:
            `repeating-linear-gradient(0deg, rgba(255,255,255,0.075) 0 2px, rgba(0,0,0,0) 2px ${gridPitch}px),` +
            `repeating-linear-gradient(90deg, rgba(255,255,255,0.075) 0 2px, rgba(0,0,0,0) 2px ${gridPitch}px)`,
          transform: `scale(${dolly})`,
        }}
      />
      {Array.from({ length: 26 }).map((_, i) => {
        const rx = random(`ox${i}`);
        const ry = random(`oy${i}`);
        const rs = random(`os${i}`);
        const d = W / 420;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: rx * W,
              top: ry * H,
              width: d * (1 + rs * 1.6),
              height: d * (1 + rs * 1.6),
              borderRadius: "50%",
              background: "rgba(240,246,252,0.5)",
              opacity: (0.16 + rs * 0.3) * rise,
              transform: `translateY(${Math.sin((f + i * 24) / 78) * (H / 160)}px)`,
            }}
          />
        );
      })}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 66% 32% at 50% 86%, ${acc.glow}12 0%, rgba(0,0,0,0) 72%)` }} />
    </>
  );

  // ── the card ───────────────────────────────────────────────────────────
  const cardPad = W * (fmt.portrait ? 0.038 : 0.026);
  const logoH = fmt.portrait ? 258 : 236;
  const roleSize = fmt.portrait ? 43 : 44;
  const numSize = fmt.portrait ? 92 : 84;
  const siteSize = fmt.portrait ? 76 : 58;
  const brandSize = fmt.portrait ? 46 : 42;

  const logos = (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: W * (fmt.portrait ? 0.034 : 0.022), opacity: at(5) }}>
      <Img src={staticFile("logos/shivansh.png")} style={{ height: logoH, width: "auto" }} />
      <div style={{ width: 3, height: logoH * 0.72, background: "rgba(20,24,32,0.16)" }} />
      <Img src={staticFile("logos/soundcraft.png")} style={{ height: logoH * 0.82, width: "auto" }} />
    </div>
  );

  const role = (
    <div
      style={{
        textAlign: "center",
        fontSize: roleSize,
        letterSpacing: 3.0,
        lineHeight: 1.5,
        color: INK.onLightSoft,
        textTransform: "uppercase",
        opacity: at(11),
      }}
    >
      {CONTACT.role}
      <br />
      <span style={{ color: acc.key, letterSpacing: 4.0 }}>{CONTACT.role2}</span>
    </div>
  );

  const contacts = (
    <>
      {CONTACT.whatsapp.map((num, i) => {
        const p = at(17 + i * 5, 13);
        return (
          <div
            key={num}
            style={{
              display: "flex",
              alignItems: "center",
              gap: numSize * 0.42,
              padding: `${numSize * 0.34}px 0`,
              borderBottom: "2px solid rgba(20,24,32,0.10)",
              opacity: p,
              transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)`,
            }}
          >
            <WhatsAppIcon size={numSize * 1.12} color={WA} />
            <div style={{ fontSize: numSize, letterSpacing: 1.4, color: INK.onLight, fontVariantNumeric: "tabular-nums" }}>{num}</div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: siteSize * 0.44,
          padding: `${siteSize * 0.42}px 0 ${siteSize * 0.08}px`,
          opacity: at(34, 13),
          transform: `translateX(${interpolate(at(34, 13), [0, 1], [-30, 0])}px)`,
        }}
      >
        <SiteIcon size={siteSize * 1.28} color={SITE} />
        <div style={{ fontSize: siteSize, letterSpacing: 0.6, color: INK.onLight }}>{CONTACT.site}</div>
      </div>
    </>
  );

  const brandLine = (
    <div style={{ textAlign: "center", paddingTop: brandSize * 0.9, fontSize: brandSize, letterSpacing: 7, color: INK.onLightSoft, opacity: at(42, 14) }}>
      {CONTACT.brand} · {CONTACT.city}
    </div>
  );

  const cardStyle: React.CSSProperties = {
    background: `linear-gradient(180deg, ${GROUND.lightLift} 0%, ${GROUND.light} 62%, ${GROUND.lightSink} 100%)`,
    borderRadius: W * 0.024,
    padding: `${cardPad * 1.15}px ${cardPad}px ${cardPad}px`,
    boxShadow: "0 46px 120px rgba(0,0,0,0.72)",
    border: "3px solid rgba(255,255,255,0.22)",
    opacity: rise,
  };

  if (fmt.portrait) {
    return (
      <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
        {room}
        {/* the four consoles, two by two — the vertical frame has the height for
            them once the card is moved down, and a lineup says what four bare
            numbers cannot */}
        <div
          style={{
            position: "absolute",
            left: SAFE.left,
            width: SAFE.w,
            top: SAFE.top - 30,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: SAFE.w * 0.035,
          }}
        >
          {LINEUP.map((slug, i) => {
            const a = img(slug);
            const p = at(3 + i * 4, 16);
            return (
              <div key={slug} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px)` }}>
                <Img src={staticFile(a.file)} style={{ width: "100%", height: SAFE.w * 0.30, objectFit: "contain" }} />
                <div style={{ textAlign: "center", fontSize: 62, letterSpacing: 6, color: acc.glow, textShadow: "0 6px 14px rgba(0,0,0,0.9)" }}>
                  {MODELS[i].name}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            left: SAFE.left,
            width: SAFE.w,
            top: "70%",
            transform: `translateY(-50%) translateY(${interpolate(rise, [0, 1], [90, 0])}px) scale(${interpolate(rise, [0, 1], [0.94, 1])})`,
            ...cardStyle,
          }}
        >
          {logos}
          <div style={{ height: cardPad * 0.7 }} />
          {role}
          <div style={{ height: 3, background: "rgba(20,24,32,0.14)", margin: `${cardPad * 0.55}px 0 ${cardPad * 0.15}px` }} />
          {contacts}
          {brandLine}
        </div>
      </AbsoluteFill>
    );
  }

  // ── landscape ──────────────────────────────────────────────────────────
  const shelfH = H * 0.33;
  return (
    <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
      {room}

      {/* the four consoles, across the top — the landscape frame has the room */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.w,
          top: H * 0.045,
          height: shelfH,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: W * 0.012,
        }}
      >
        {LINEUP.map((slug, i) => {
          const a = img(slug);
          const p = at(3 + i * 4, 16);
          return (
            <div key={slug} style={{ flex: 1, opacity: p, transform: `translateY(${interpolate(p, [0, 1], [34, 0])}px)` }}>
              <Img src={staticFile(a.file)} style={{ width: "100%", height: shelfH * 0.74, objectFit: "contain" }} />
              <div style={{ textAlign: "center", fontSize: shelfH * 0.10, letterSpacing: 5, color: acc.glow, textShadow: "0 5px 12px rgba(0,0,0,0.9)" }}>
                {MODELS[i].name}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: W * 0.10,
          width: W * 0.80,
          top: H * 0.045 + shelfH + H * 0.055,
          transform: `translateY(${interpolate(rise, [0, 1], [70, 0])}px) scale(${interpolate(rise, [0, 1], [0.96, 1])})`,
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          columnGap: W * 0.035,
          alignItems: "center",
          ...cardStyle,
        }}
      >
        <div>
          {logos}
          <div style={{ height: cardPad * 0.55 }} />
          {role}
          <div style={{ height: 3, background: "rgba(20,24,32,0.14)", margin: `${cardPad * 0.5}px 0 0` }} />
          {brandLine}
        </div>
        <div>{contacts}</div>
      </div>
    </AbsoluteFill>
  );
};
