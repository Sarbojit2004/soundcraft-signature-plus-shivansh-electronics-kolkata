# Soundcraft Signature Plus — 90 s 4K vertical reel

A 4K portrait reel for the **Soundcraft Signature Plus 12 / 16 / 22 / 32**,
built on the same script-driven system as the MOTU films in the sibling
repositories: one file says what is said, one file says what is shown, and no
frame number is typed by hand anywhere in the render path.

| | |
|---|---|
| Canvas | **2160 × 3840** (9:16) |
| Runtime | 90.000 s (2,700 frames @ 30 fps) |
| Body | 84.000 s — 12 chapters, 29 shots, 33 burned-in captions, 218 words |
| End screen | last **6.000 s**, and the only branded frames in the film |
| B-roll | 4 × **5.000 s**, played complete — 20.000 s, 23.8% of the body |
| Master | `out/soundcraft-signature-plus-reel-4k.mp4`, shipped as stream-copied parts in `out/reel-4k-parts/` |
| Encode | H.264 CRF 17, yuv420p, 30 fps — quality-targeted, no bitrate cap, never re-encoded after render |
| Thumbnail | `out/soundcraft-signature-plus-reel-thumbnail.png` |

**Shivansh Electronics is the exclusive partner for the Soundcraft Signature
Plus Mixer Series.** That line, the two logos, the website and the three
contact numbers appear once, on the end screen, and nowhere else — not in the
body, not on the thumbnail.

**No price appears anywhere.** No competitor is named, alluded to or implied.

---

## What is different about this reel

Three things separate it from the MOTU films it inherits its machinery from.

**1. The B-roll is played complete.** The MOTU reels sampled a second or two out
of each generated clip and cut away. Here each of the four Seedance 2.0 clips
runs its whole 5.000 s, uncut, because that is what was generated and paid for.
`script.ts` therefore carries a hybrid timeline:

* **fixed** segments — the four B-roll blocks, exactly 5.000 s each, because the
  asset on disk is exactly that long. Their captions are distributed across the
  block in proportion to how long each takes to say.
* **flexible** segments — everything else, written at 165 wpm and then scaled by
  **one** global factor (currently 0.967×) so the whole body lands exactly on
  84.000 s.

`npm run validate` fails the build if the body is not 84.000 s, or if any B-roll
block is not 5.000 s.

**2. The sound is synthesised, not sampled.** The supplied
`sound-effects/tech (N).mp3` pack is not opened at all. All eleven cues are
built from oscillators, filtered noise and envelopes in `scripts/gen_audio.py` —
one voice across the kit, seeded so a rebuild is bit-identical, and each cue cut
to the move it sits under.

**3. The B-roll is reference-driven.** Each clip was generated with the real
4096 px product plate as an `image_reference`, so the console in frame is the
actual desk rather than a plausible-looking one. The plates used are in `refs/`.

---

## Quick start

```bash
npm install
npm run official   # cut the clean shots out of the Soundcraft overview video
npm run assets     # repo product plates -> public/img/ + src/assets.generated.ts
npm run audio      # 11 synthesised cues + the music bed, mastered
npm run validate   # timing, caption emphasis, and shot/clip fit
npm run render     # the 4K master, then split for GitHub
npm run thumb      # the thumbnail
```

`npm run studio` opens Remotion Studio for scrubbing.

---

## The four B-roll blocks

Generated on Higgsfield with **Seedance 2.0**, 720p, 9:16, 5 s, `mode: std`,
`generate_audio: false` — 22.5 credits each, 90 for the set. Each was given a
different console as its `image_reference`, largest to smallest, so the four
clips also walk the whole range.

| block | at | reference | scene |
|---|---|---|---|
| `broll-01-live-foh` | 6.57 – 11.57 s | Signature Plus **32** | front of house, a club at show time |
| `broll-02-community-hall` | 24.36 – 29.36 s | Signature Plus **22** | a community hall, late afternoon |
| `broll-03-project-studio` | 46.07 – 51.07 s | Signature Plus **16** | a project studio at night |
| `broll-04-rehearsal-room` | 68.13 – 73.13 s | Signature Plus **12** | a rehearsal room, band mid-song |

They sit where the argument needs a room rather than at the front: the club
after *"that is one knob"*, the hall after the preamp and the EQ, the studio
after the effects, the rehearsal room after monitoring and the Hi-Z.

### Dropping the clips in

The MP4s are **not** in the tree. Put them at these paths and re-run:

```
public/clip/broll-01-live-foh.mp4
public/clip/broll-02-community-hall.mp4
public/clip/broll-03-project-studio.mp4
public/clip/broll-04-rehearsal-room.mp4
```

```bash
npm run assets && npm run validate && npm run render
```

Until they are there, `prep_assets.py` lists them in `MISSING_BROLL` and
`shots.ts` swaps in a **fallback** — always a real photograph of the desk in the
same kind of room, never a studio render. **The timing is identical either way,**
because those four segments are fixed at 5.000 s regardless, so the swap is a
re-render and never a re-edit.

---

## The official Soundcraft footage

`scripts/cut_official.py` cuts five shots out of
`../SOUNDCRAFT SIGNATURE PLUS OVERVIEW VIDEO.mp4` (1280 × 720, 64.8 s).

Most of that film carries Soundcraft's own burned-in title cards, and this reel
has its own caption system and puts every brand mark on the end screen — so a
shot carrying somebody else's title card breaks both. Every window was found by
scanning the film at 5 fps and **reading the frames**; each comment in that file
names the frame the window opens after and the one it closes before, so a
boundary can be re-checked rather than trusted.

That leaves **5.17 s of genuinely clean source**, retimed with
motion-compensated interpolation — frames synthesised, not duplicated — at a
rate set per window, for **10.67 s of picture**. The outdoor band is cropped to
its left 55% to lose *"Performance. Control. Room to Grow."*; at 58% the capital
P still clipped the edge. The low-angle fader-bank shot was dropped once its
clean window turned out to be 0.24 s.

Because the source is 720p and the master is 2160 × 3840, these are never
full-bleed: `shots.ts` stages them as a 16:9 plate over a darkened wash of
themselves, so the upscale is 1.92× rather than the 5.3× a full-bleed crop
would need.

---

## The timeline

```
        hook        0.00 ->   6.17   ten minutes to doors
  FIXED live        6.57 ->  11.57   front of house            ← B-roll 1
        sound      11.97 ->  23.96   the sound
  FIXED hall       24.36 ->  29.36   every room is different   ← B-roll 2
        control    29.76 ->  37.34   control
        space      37.74 ->  45.67   space
  FIXED studio     46.07 ->  51.07   after the show            ← B-roll 3
        connect    51.47 ->  59.40   connected
        room       59.80 ->  67.73   the room
  FIXED band       68.13 ->  73.13   set it once               ← B-roll 4
        scale      73.53 ->  81.30   one format
        close      81.70 ->  84.00   signature plus
        outro      84.00 ->  90.00   ← the only branded frames
```

---

## The layers

1. **picture** — full-bleed imagery under a camera move. Sequences overlap, so
   every shot change is a transition rather than a cut.
2. **scrim** — a gradient across the top third only, where the dense text sits.
3. **overlay** — the whole typographic layer at **64% opacity**: the top rail,
   the caption lockup, the demonstratives, the spec chips. One multiplier,
   applied once, so nothing can drift.
4. **end screen** — the last 6 s.

### The top rail

A contents page rather than a progress bar: a tick per chapter, taller and
hollow on the four fixed B-roll blocks, a running timecode, the chapter number,
and a level meter. Its marks come off the same timeline the film is cut to, so
the rail and the edit cannot disagree. It does **not** fade between chapters — a
timeline that blinks out stops being a timeline.

### The captions

Three tiers, split at the one word each line turns on: a lead-in in the black
geometric sans, that word in the brush script, the tail back in the sans.
Legibility is bought with a hard tight shadow rather than a scrim.

### The demonstratives

Every number drawn was read off the 4096 px plan views in this repository — the
gain scale really is marked +6 to +65, the mid really does sweep 150 Hz to
3 kHz, the meter really does print dBu and dBFS side by side, the Lexicon table
really is two banks of sixteen. A claim a viewer can check against the picture
in front of them is worth three they have to take on trust.

---

## Audio

| | |
|---|---|
| Bed | `High Impact.mp3` at its own tempo, −23 LUFS (EBU R128) |
| Handover | 82.400 s, 1.6 s crossfade into a synthesised resolve |
| Cues | 11, all synthesised, one shared gain (0.533×) |

The bed is **not** time-stretched. It runs 84.06 s against an 84.000 s body — a
fit close enough that nothing has to be done to it — and crossfades into a
synthesised resolve that carries the end screen and lands on silence exactly at
90.000 s.

The cues are deliberately **not** normalised individually. EBU R128 is defined
over 400 ms gating blocks and seven of the eleven are shorter than that, so the
meter reads them as silence and a per-cue normaliser hands a 38 ms tick 355×
gain and a clipped buzz back. They take one shared gain instead, set by the
loudest member of the kit, so the balance they were designed with survives.

---

## `npm run validate`

Run before every render, and by `render-4k.sh` itself. It checks four things a
render will not tell you about until it is too late:

1. the body lands exactly on 84.000 s, and each B-roll block on 5.000 s;
2. every caption's declared emphasis actually occurs in it — a mismatch falls
   silently through to a longest-word fallback and puts the script face on the
   wrong word;
3. no shot outlives the clip it is showing, which would freeze on a last frame;
4. every asset and clip a shot names exists in the generated manifest.

Checks 2 and 3 each caught real faults during the build.

---

## Rejoining the 4K master

GitHub will not take a file over 100 MiB, so the master ships as stream-copied
parts under `out/reel-4k-parts/`. **Nothing is re-encoded** — each part carries
the original video and audio bitstream, cut on a keyframe boundary by ffmpeg's
segment muxer.

Precisely: the rejoined file is **frame-for-frame identical** to the master —
same packets, same order, no generation loss — but *not* byte-for-byte, because
the MP4 container is rebuilt. `split_mp4.py` verifies this on every run by
actually rejoining the parts and comparing durations, and fails the split if
they drift. On this master the drift is **0.000 s**.

Every part is also a standalone playable MP4. See `out/reel-4k-parts/JOIN.md`.

---

## Layout

```
src/
  script.ts      what is said, and when   — the hybrid fixed/flexible timeline
  shots.ts       what is shown, and when  — each shot pinned to a caption
  films.ts       the two assembled, plus the chips and demonstratives
  theme.ts       the palette, sampled off the 4096 px plan of the 32
  Film.tsx       how it is staged, transitioned, annotated and mixed
  Thumbnail.tsx  one frame, same type lockup
  components/    Staged · Caption · Demonstratives · Transitions · TopRail · Outro
scripts/
  cut_official.py   the five clean shots out of the overview film
  prep_assets.py    the product plates -> public/img/ + the manifest
  gen_audio.py      11 synthesised cues + the music bed
  validate.mjs      the four pre-render checks
  render-4k.sh      validate, render, split
  split_mp4.py      lossless split for GitHub
refs/            the four product plates used as B-roll image references
```
