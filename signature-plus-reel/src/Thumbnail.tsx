import React from "react";
import { AbsoluteFill, Img, random, staticFile } from "remotion";
import { ACCENT, FONT, GROUND, INK, MODELS, formatFor } from "./theme.ts";
import { img } from "./assets.ts";
import { splitCaption } from "./components/Caption.tsx";

// ─────────────────────────────────────────────────────────────────────────────
// THE THUMBNAIL — 2160 x 3840, one frame.
//
// A reel thumbnail is read at about 300 px tall in a grid, at a glance, by
// somebody who has not decided to watch yet. So it is built from the three
// things that survive that: ONE console, ONE line, and a colour.
//
// It uses the film's own type lockup — the brush script carrying the word the
// line turns on, the black geometric sans carrying the rest — so the thumbnail
// and the first frame of the reel are visibly the same piece of work. The line
// is the reel's own hook, not a slogan invented for the tile.
//
// NO BRAND MARKS. Same rule as the body of the reel: the Shivansh Electronics
// and Soundcraft logos appear on the six-second end screen and nowhere else,
// and that includes here. The console is the product shot; the wordmark
// already on its chassis is the console's, not an overlay.
//
// NO PRICE, and no competitor named or implied.
// ─────────────────────────────────────────────────────────────────────────────

/** The reel's own hook, split at the word it turns on. */
const LINE = { t: "On this desk, that is one knob.", e: "one knob" };

export const Thumbnail: React.FC = () => {
  const fmt = formatFor(2160, 3840);
  const W = fmt.width;
  const H = fmt.height;
  const SAFE = fmt.safe;
  const acc = ACCENT.shared;
  const sound = ACCENT.sound;

  const hero = img("p32-3");
  const parts = splitCaption(LINE.t, LINE.e);

  const gridPitch = Math.round(W / 14);

  return (
    <AbsoluteFill style={{ background: GROUND.dark, fontFamily: FONT.display, overflow: "hidden" }}>
      {/* ── the room ───────────────────────────────────────────────────── */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 96% 54% at 50% 38%, #1B1F28 0%, #0B0D12 56%, #040506 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.34,
          backgroundImage:
            `repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 2px, rgba(0,0,0,0) 2px ${gridPitch}px),` +
            `repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0 2px, rgba(0,0,0,0) 2px ${gridPitch}px)`,
        }}
      />
      {/* a warm pool under the console, so it sits in the frame rather than on it */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 26% at 50% 52%, ${sound.glow}26 0%, rgba(0,0,0,0) 72%)`,
        }}
      />
      {/* dust */}
      {Array.from({ length: 34 }).map((_, i) => {
        const rx = random(`tx${i}`);
        const ry = random(`ty${i}`);
        const rs = random(`ts${i}`);
        const d = W / 380;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: rx * W,
              top: ry * H * 0.72,
              width: d * (1 + rs * 1.7),
              height: d * (1 + rs * 1.7),
              borderRadius: "50%",
              background: "rgba(240,246,252,0.55)",
              opacity: 0.14 + rs * 0.26,
            }}
          />
        );
      })}

      {/* ── the eyebrow ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          top: SAFE.top * 0.92,
          width: SAFE.w,
          display: "flex",
          alignItems: "center",
          gap: W * 0.018,
        }}
      >
        <div style={{ width: W * 0.009, height: W * 0.044, background: sound.glow }} />
        <div
          style={{
            fontSize: W * 0.032,
            letterSpacing: W * 0.0042,
            color: INK.onDark,
            textTransform: "uppercase",
            textShadow: "0 8px 18px rgba(0,0,0,0.95)",
          }}
        >
          Signature Plus
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            fontSize: W * 0.028,
            letterSpacing: W * 0.005,
            color: sound.glow,
            fontVariantNumeric: "tabular-nums",
            textShadow: "0 8px 18px rgba(0,0,0,0.95)",
          }}
        >
          {MODELS.map((m) => m.short).join(" · ")}
        </div>
      </div>

      {/* ── the console ────────────────────────────────────────────────── */}
      {/* Sized off its own alpha bounding box rather than its canvas: the render
          occupies about 80% of a 4096 px plate, and centring the CANVAS would
          leave the desk sitting high and small. */}
      <Img
        src={staticFile(hero.file)}
        style={{
          position: "absolute",
          left: -W * 0.10,
          top: H * 0.255,
          width: W * 1.20,
          height: "auto",
          objectFit: "contain",
        }}
      />

      {/* a hard floor line, to sit the console on something */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: H * 0.555,
          width: W,
          height: Math.round(H / 900),
          background: `linear-gradient(90deg, ${sound.glow}00 0%, ${sound.glow}88 22%, ${sound.glow}88 78%, ${sound.glow}00 100%)`,
        }}
      />

      {/* ── the line ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.w,
          bottom: SAFE.bottom * 0.78,
        }}
      >
        {parts.before ? (
          <div
            style={{
              fontSize: fmt.type.before.size * 1.22,
              letterSpacing: fmt.type.before.track,
              color: INK.onDarkSoft,
              textTransform: "uppercase",
              textShadow: "0 10px 22px rgba(0,0,0,0.95)",
              marginBottom: -H * 0.012,
            }}
          >
            {parts.before}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: FONT.script,
            fontSize: fmt.type.script.size * 1.16,
            letterSpacing: fmt.type.script.track,
            lineHeight: 0.86,
            color: sound.glow,
            textShadow: "0 16px 36px rgba(0,0,0,0.98), 0 0 10px rgba(0,0,0,0.9)",
          }}
        >
          {parts.key}
        </div>

        {parts.after ? (
          <div
            style={{
              fontSize: fmt.type.after.size * 1.16,
              letterSpacing: fmt.type.after.track,
              color: INK.onDark,
              textTransform: "uppercase",
              textShadow: "0 10px 24px rgba(0,0,0,0.96)",
              marginTop: H * 0.004,
            }}
          >
            {parts.after}
          </div>
        ) : null}

        {/* the counter-line — what the reel is actually arguing */}
        <div
          style={{
            marginTop: H * 0.022,
            display: "flex",
            alignItems: "center",
            gap: W * 0.016,
          }}
        >
          <div style={{ width: W * 0.10, height: Math.round(H / 1100), background: acc.glow }} />
          <div
            style={{
              fontSize: W * 0.030,
              letterSpacing: W * 0.0038,
              color: INK.onDarkSoft,
              textTransform: "uppercase",
              textShadow: "0 8px 18px rgba(0,0,0,0.95)",
            }}
          >
            Not a page. Not a menu.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
