import React from "react";
import { Composition } from "remotion";
import { FORMATS } from "./theme.ts";
import { Film } from "./Film.tsx";
import { Thumbnail } from "./Thumbnail.tsx";
import { REEL } from "./films.ts";
import { FONT_FACE_CSS } from "./fonts.ts";

// The two faces are loaded once, here, rather than per component: at 2160 px
// wide the script face is set at 348 px and a late-arriving font would re-flow
// the caption lockup mid-render.
const style = document.createElement("style");
style.textContent = FONT_FACE_CSS;
document.head.appendChild(style);

// ─────────────────────────────────────────────────────────────────────────────
// ONE DELIVERABLE, and its thumbnail.
//
// 2160 x 3840, 30 fps, 2700 frames — 90.000 s exactly. The duration is not
// typed here: it comes off films.ts, which derives it from the script.
//
// There is no landscape sibling. The two-format machinery in theme.ts is kept
// because every staging component resolves its layout from the composition's
// own dimensions through formatFor(), and tearing that out to save one unused
// branch would touch every file for no gain.
// ─────────────────────────────────────────────────────────────────────────────

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Film}
      defaultProps={{ data: REEL }}
      durationInFrames={REEL.durationInFrames}
      fps={FORMATS.reel.fps}
      width={FORMATS.reel.width}
      height={FORMATS.reel.height}
    />
    <Composition
      id="ReelThumbnail"
      component={Thumbnail}
      defaultProps={{}}
      durationInFrames={1}
      fps={FORMATS.reel.fps}
      width={FORMATS.reel.width}
      height={FORMATS.reel.height}
    />
  </>
);
