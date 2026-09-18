import React from "react";
import { Composition } from "remotion";
import { FORMATS } from "./theme.ts";
import { Film } from "./Film.tsx";
import { Thumbnail } from "./Thumbnail.tsx";
import { EXPLAINER, REEL } from "./films.ts";
import { FONT_FACE_CSS } from "./fonts.ts";

const style = document.createElement("style");
style.textContent = FONT_FACE_CSS;
document.head.appendChild(style);

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
      id="Explainer"
      component={Film}
      defaultProps={{ data: EXPLAINER }}
      durationInFrames={EXPLAINER.durationInFrames}
      fps={FORMATS.video.fps}
      width={FORMATS.video.width}
      height={FORMATS.video.height}
    />
    <Composition
      id="ThumbnailReel"
      component={Thumbnail}
      defaultProps={{ format: "reel" as const }}
      durationInFrames={1}
      fps={FORMATS.reel.fps}
      width={FORMATS.reel.width}
      height={FORMATS.reel.height}
    />
    <Composition
      id="ThumbnailVideo"
      component={Thumbnail}
      defaultProps={{ format: "video" as const }}
      durationInFrames={1}
      fps={FORMATS.video.fps}
      width={FORMATS.video.width}
      height={FORMATS.video.height}
    />
  </>
);
