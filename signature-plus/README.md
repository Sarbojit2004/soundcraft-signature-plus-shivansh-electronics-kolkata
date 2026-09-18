# Soundcraft Signature Plus — two films, one project

Two deliverables for Shivansh Electronics, rendered from one Remotion project so
that a change to the script, the shot plan or the design system lands in both:

| | Composition | Size | Length |
|---|---|---|---|
| Vertical reel | `Reel` | 2160 × 3840 | 90.37 s · 2711 frames |
| Landscape explainer | `Explainer` | 3840 × 2160 | 301.33 s · 9040 frames |
| Reel cover | `ThumbnailReel` | 2160 × 3840 | still |
| Explainer cover | `ThumbnailVideo` | 3840 × 2160 | still |

Both durations are **derived, not typed**: the script's own spoken length decides
when the narration ends, the end screen is a fixed eight seconds after it, and
the composition is exactly that long. Editing a caption re-times both films.

```bash
npm install
npm run assets        # rebuild the asset library + manifest from the repo
npm run audio         # rebuild the beds, the cue palette and the VO placeholders
npm run script        # regenerate VOICEOVER-SCRIPT.md
npm run coverage      # prove both films from the same data the renderer reads
npm run studio        # preview
npm run render:reel
npm run render:video
npm run thumb:reel
npm run thumb:video
```

## What drives what

```
src/script.ts      what is said, and when   — spoken word count sets every duration
src/shots.ts       what is shown, and when  — each shot pinned to its caption
src/films.ts       the two deliverables assembled from those two
src/Film.tsx       how it is staged, transitioned, annotated and mixed
```

There is not one hand-typed frame number in the films. `buildTimeline()` lays
every caption on an absolute timeline from how long its words take to say at
165 wpm, with a 0.4 s breath between chapters and a 0.2 s beat after a line that
closes a thought — the pacing model the MOTU M-Series reel was cut to, which
lands at about 154 wpm effective. `buildShots()` then pins each shot to a
caption index, so the picture changes on the word it belongs to and a slower
recorded read moves the picture with it instead of leaving it behind.

## The design system

Carried over from the M-Series reel by instruction:

* the type pairing — a heavy brush script carrying **one** word per caption, a
  black geometric sans carrying the rest
* the three-tier caption lockup, split at that key word
* `TYPE_OPACITY = 0.64` — the entire typographic layer at 64%, applied once by
  the film's overlay layer so nothing can drift out of step
* legibility bought back with a hard, tight drop shadow rather than a scrim,
  because a scrim would hide exactly the content the transparency reveals
* full-bleed imagery, nothing letterboxed, no ground showing through
* no branding of any kind until the end screen

Changed for this product:

* **The accent palette comes off the desk.** The M-Series needed three hues
  because it had three identical-looking products and colour was the only thing
  telling a viewer which was on screen. Here all four consoles *are* the same
  desk — that is the film's argument — so colour means "which part of the desk"
  instead, and every hue was sampled from the 4096 px plan of the Signature
  Plus 32: the red gain caps, the gold PFL caps, the navy Lexicon panel, the
  teal aux squircles, the blue talkback caps.
* **No diagonal slicing.** The M-Series' `SplitBleed` clipped two photographs to
  opposing triangles meeting on a diagonal seam; in practice each was first
  cropped to a sliver and then had half of that clipped away, so neither subject
  was ever fully visible. It is replaced by `StackBleed`, which shows two
  complete plates — stacked in the vertical film, side by side in the landscape
  one. **No picture in either film is cropped, clipped or cut.**
* **`DetailZoom`.** The top-down plans are 4096 px wide, so a crop of one row of
  knobs is still sharper than the frame it lands in. That is what lets a shot
  push into the control the narration is naming — the gain row while the voice
  says "six to sixty-five", the magenta compressor row while it says "on every
  one of them". Each region's brightness is normalised from its own measured
  luminance, so a push into the pale master section and one into the dark
  channel strip both land on a ground the overlay can hold against.

## The assets

`scripts/prep_assets.py` builds `public/` and emits `src/assets.generated.ts`
with every size measured off the file, including each render's **alpha bounding
box** — the consoles occupy only the middle ~80% of their canvases, and the
padding differs file to file, so plates are positioned by content rather than by
canvas.

The twenty B-roll clips and twenty workflow stills delivered for this brief
carried the generator's visible sparkle watermark. It is a static white shape at
a known per-pixel alpha, so it is **removed exactly** rather than blurred over —
`src = (out − 255a) / (1 − a)`, with the alpha solved from the per-pixel floor
across 120 samples and refined until the residual fell below 2/255, and its
opacity fitted per clip because it is not stamped at the same strength on every
one. The clips are then retimed so every 24 fps source frame lands on exactly
one 30 fps output frame — no duplication, no judder — and upscaled to 2560×1440.

Four clips are deliberately unused; `src/shots.ts` says which and why.

## The audio

`scripts/gen_audio.py` fits the supplied `High Impact.mp3` (84.02 s, 150 BPM,
E minor) to both films twice over:

* the **reel** is close enough in length that the whole track is time-stretched
  by 0.93 with a pitch-preserving WSOLA — nothing cut, nothing looped, and the
  track's own fade-out begins within half a second of the end screen arriving;
* the **explainer** is 3.6× the source, so it is *arranged* instead: the track is
  cut into eight-bar phrases (12.8 s at 150 BPM, so every cut is on a bar line)
  and laid out as a five-minute piece — the first peak as the cold open, the
  quiet phrases as a bed under the body, the rising phrase at each chapter turn,
  and the climax saved for the last act.

The cue palette is cut from the 43-file `sound-effects` library supplied with
the brief. Those files are multi-take — three or four variations separated by
silence — so `scripts/cut_sfx.py` splits them into single events before use.
One cue, the outro bloom, is synthesised in E minor, because the library is a
tech/UI pack with nothing warm or sustained in it.

Everything is mastered to one reference (−23 LUFS, EBU R128) with each cue
trimmed relative to the bed, so **every source plays at unity in the timeline**.
A volume multiplier there would silently undo the mastering. Cues too short for
R128's 400 ms gate are levelled by a BS.1770 momentary window computed in the
script instead of by ffmpeg, which reports −70 for anything shorter.

`public/audio/vo-reel.wav` and `vo-video.wav` are silent placeholders at exactly
each film's length. Drop the recorded narration in at those paths and re-render;
nothing else changes. `VOICEOVER-SCRIPT.md` is the timestamped document to
record against, generated from the same timeline the picture is cut to.
