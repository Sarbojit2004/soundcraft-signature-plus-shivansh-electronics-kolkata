# SOUNDCRAFT SIGNATURE PLUS — 20 B-ROLL PROMPTS
## Image-to-video shot list for Google Gemini

**Client:** Shivansh Electronics, Kolkata
**Purpose:** generate twenty B-roll clips from the product photography already in this
repository, for the Signature Plus vertical reel. Twenty distinct stills, twenty distinct
clips — no still is used twice.

---

## The problem these prompts are built to solve

A generative video model asked to *show a mixing console* will invent one. It will get
the channel count wrong, garble the brand name, and print legends that are not words.
That is not a cosmetic failure — a reel whose hero product is subtly wrong is worse than
no reel at all.

So not one of the twenty prompts below describes the product. Every one of them describes a
**camera moving over a photograph** of it, and then forbids, explicitly and at length,
each way the model might be tempted to redraw what it sees.

Three rules do most of the work, and they are worth understanding rather than just
following:

1. **Image-to-video only.** The attached still becomes frame one. A text-to-video model
   has no obligation to the real product.
2. **No move that reveals unseen geometry.** Every camera move here is a push, a pull, a
   lateral track, a rack focus or a light sweep — never an orbit. The moment a camera
   swings around to a side the photograph does not show, the model has to invent that
   side, and invention is exactly what we are preventing.
3. **Short, slow, single-axis.** Drift compounds with time and with complexity. A four
   percent push holds together where a dramatic sweep falls apart.

---

## How to run them

| | |
|---|---|
| **Mode** | Image to video. Attach the still first, then paste the prompt. The attached image becomes frame one — this is the entire reason the product survives. |
| **Never** | Never use text-to-video for these. A text-to-video model has no obligation to the real product and will invent a mixing console that looks approximately Soundcraft-ish: wrong channel count, invented legends, a garbled logo. Every one of the twenty prompts below assumes an attached still. |
| **Length** | Ask for the longest clip the tool offers (usually 8 s). I will use 2–4 s of each in the cut, so a long take gives me a choice of where to take the slice. |
| **Aspect** | 16:9, highest resolution offered. Not 9:16 — the product stills are 4:3 landscape, and forcing them into a vertical frame crops the console in half. The reel is 9:16 and composites these as a full-width band over a wash derived from the clip itself, exactly the way the MOTU M-Series reel handled its stills. |
| **Takes** | Run each prompt 2–3 times and keep the best take. These models are stochastic — the same prompt gives a clean take and a drifting one. |
| **Reject** | Reject any take where a printed legend, the logo, the model name or the channel count changes, even slightly, even for one frame. That is the failure mode this whole prompt set exists to prevent, and it is not fixable in the edit. |
| **Audio** | Ignore any audio the tool generates — I strip it. The reel carries its own bed, its own effects and your recorded voice. |

---

## What was verified before writing

Read off Soundcraft's own launch film, the campaign artwork in this repository, and the
press coverage of the launch. Every claim the reel's script eventually makes comes from
this table — if anything here is wrong, the script inherits the error.

| Area | Specification | Detail |
|---|---|---|
| Models | Signature Plus 12 · 16 · 22 · 32 | Four sizes, one output section and one feature set across all of them. |
| Preamps | Soundcraft Ghost, up to 65 dB gain | Gain control is marked +6 to +65 on the panel. Smooth overload behaviour, rich harmonics. |
| EQ | Soundcraft Sapphyre, 3-band with sweepable mid | Per channel. |
| Dynamics | dbx OverEasy one-knob compressor | With harmonic enhancement, plus insert points on the first six channels. |
| Effects | Lexicon hardware processor, 32 algorithms | Two banks of sixteen, A and B, with Store and Tap Tempo. The only console series in its class with a Lexicon processor built in. |
| Interface | 4 × 4 USB-C, 192 kHz | USB returns can feed channel strips or override the mix outright for break music and DJ sets. |
| Metering | SSM — dBu and dBFS side by side | Two ladders: +20 to −24 dBu on the analogue side, 0 to −44 dBFS on the digital side. |
| Workflow | Listen bus, Talkback to any output, Mix to Aux | Pre/post switching on every aux bus, per-aux talkback. |
| Per channel | 48 V phantom, PAD, 100 Hz high-pass | Colour-coded “squircle” caps throughout, legible in low light. |
| Support | QR code printed on the surface | Links straight to manuals, training videos and support. |
| In the box | Rack ears on the 12 and the 16 | Both smaller models rack-mount. |
| Pricing | $799 / $899 / $1,199 / $1,499 MAP | US manufacturer-advertised pricing for 12 / 16 / 22 / 32. |

**Soundcraft's own campaign lines**, for register (not reused verbatim — the reel needs
its own voice):

- *Perfected Performances*
- *The Next Generation of Analog Professional Mixing Consoles*
- *Your Creative Audio Character*
- *Performance. Control. Room to Grow.*
- *Professional Analog Mixing. Reimagined.*

---

## Two matched pairs

Four of the twenty are written to be cut directly against each other, which only works if
the takes match. Generate each pair back to back in the same sitting, and do not let the
second one drift toward something more interesting.

| Shots | Pair | Why it has to match |
|---|---|---|
| 16 + 17 | **Thirty-two against twelve** | Identical lens, identical descent, identical rotation, identical lighting behaviour — only the console underneath changes. Hard-cut in the edit, the pair states the range in about one second without a word of narration. |
| 02 + 20 | **Flagship against sweet spot** | The same four percent creep and the same left-to-right key sweep on the 32 and the 22, so the two models are introduced in the same grammar and the size difference is the only variable. |

---

## Model coverage

Every model in the range gets a shot of its own, so the reel can give each one an
identity rather than treating the series as one undifferentiated product.

| Model | Shots |
|---|---|
| Signature Plus 12 | 09 hero · 17 plan |
| Signature Plus 16 | 05 plan · 13 band room · 14 duo |
| Signature Plus 22 | 20 hero · 03 profile · 11 daylight · 15 setup |
| Signature Plus 32 | 02 hero · 16 plan · 18 rear · 10 front of house |
| Series / features | 01 · 04 · 06 · 07 · 08 · 19 · 12 family |

**Still a gap.** The dbx compressor row and the Sapphyre EQ row have no close-up of
their own, because no macro of either exists in the supplied photography. Shots 01, 05,
16 and 17 carry those lines instead — the plan views push in far enough for the strips to
read. This is the one thing a new photograph, rather than a new prompt, would fix.

---

## What to send back

1. Keep every clip at its generated resolution and frame rate. No cropping, no
   re-encoding, nothing added — conforming happens in the build.
2. Name each file exactly as listed on its shot below, e.g. `broll-02-hero-32.mp4`. The
   build resolves clips by filename, so a rename breaks the edit.
3. Put them in a `b-roll/` folder at the root of this repository and push.
4. If a shot never came out clean after three takes, push the best take anyway and say
   which number it is.

---

## THE TWENTY

### 01 · The knob field

| | |
|---|---|
| **Role in the cut** | Hook |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (4).webp` |
| **Save the clip as** | `broll-01-knob-field.mp4` |

The opening two seconds of the reel. It is pure texture — colour-coded caps receding into shallow focus — and it says “this is a serious analogue surface” before a single word is spoken. It is also, not coincidentally, the move Soundcraft opens their own launch film with.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A macro cinema camera on a motorised slider. 100 mm macro lens at f/2.8. The sensor plane stays exactly parallel to the row of controls for the whole shot.

Over the full duration, track laterally from left to right by approximately 8 to 10 percent of the frame width. One slow, perfectly linear slide — no acceleration beyond the gentle ease in and out, no arc, no rise or fall, no rotation.

Hold the focal plane on the same row of caps that is sharp in the attached image. Do not change focus distance and do not zoom. As the camera slides, let the out-of-focus rows in front of and behind that plane travel at their own naturally faster and slower rates, so genuine parallax builds up between the rows of controls. That parallax is the point of the shot.

LIGHT AND ATMOSPHERE. Keep the existing warm-to-cool coloured haze behind the controls exactly as it is. Allow only a very slow, gentle breathing of that background glow, as though a stage lamp a long way off is drifting. Specular highlights on the tops of the caps may travel by a pixel or two as the camera moves — that is correct and expected of a real slider move over real plastic.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 02 · The 32 arrives

| | |
|---|---|
| **Role in the cut** | Hero |
| **Model** | Signature Plus 32 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 32 (4).webp` |
| **Save the clip as** | `broll-02-hero-32.mp4` |

The establishing hero. The 32 is the biggest thing in the range and the most photogenic; a slow creep in with a light sweeping the fader bank is how a product film announces the flagship.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a motorised dolly. 50 mm lens at f/5.6, locked off horizontally.

Over the full duration, push straight in along the lens axis by roughly 4 percent. This is a barely perceptible creep that should end before it ever begins to feel like a zoom. Keep the front edge of the console exactly level in frame throughout. Do not rotate, do not arc around the object, do not drift up or down, do not change lens.

LIGHT AND ATMOSPHERE. A soft, wide key light travels slowly from the left of frame to the right across the fader bank and the knob field, so highlights migrate along the metal edges and across the coloured caps and the surface reads unmistakably as a physical object lit by a real, moving lamp. The background stays exactly as it is — no new shadows, no new reflections, no change in the ground behind the console.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 03 · The 22 in profile

| | |
|---|---|
| **Role in the cut** | Model |
| **Model** | Signature Plus 22 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 22 (5).webp` |
| **Save the clip as** | `broll-03-profile-22.mp4` |

The only shot in the set that shows the chassis as an object with a shape rather than a surface with controls. The source still is a 2.5:1 side elevation, which is a natural lateral track and cuts beautifully against the plan views.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a long slider. 85 mm lens at f/5.6, sensor plane parallel to the side of the console.

Over the full duration, track laterally from right to left across roughly 12 percent of the frame width, travelling along the wedge profile from the low front lip toward the raised rear. Keep the camera height absolutely fixed and the sensor parallel throughout — no arcing, no tilt, and above all no move that begins to reveal the top surface or the far side. Everything the shot needs is already in the frame.

LIGHT AND ATMOSPHERE. A narrow specular highlight travels along the polished front lip and across the brand badge as the camera moves, the way a real hard light rakes a machined metal edge. Nothing else about the lighting changes, and the background stays clean and unchanged.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 04 · Ghost preamps

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (1).webp` |
| **Save the clip as** | `broll-04-ghost-preamps.mp4` |

The input section, in macro, with the gain range legible. This carries the Ghost preamp line in the script and it is the one shot where the printed legends genuinely have to survive, because they are the evidence.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A macro cinema camera on a slider. 85 mm at f/4.

Over the full duration, track laterally from left to right across roughly 10 percent of the frame width, moving along the row of combination input sockets.

Midway through the move, execute exactly one slow rack focus: from the brand badge and socket row in the upper part of the frame, down to the row of gain controls in the lower part. The rack must be smooth and take at least two seconds. Both the start and the end focal planes already exist in the attached image — you are changing which one is sharp, nothing else.

LIGHT AND ATMOSPHERE. Hold the existing lighting on the panel. The coloured atmospheric wash behind the hardware may drift very slowly, like distant haze. No new light sources, no flare.

LEGEND LOCK — specific to this shot. The panel legends visible here are evidence and must survive character-for-character: the word soundcraft on the badge, the numerals 1 to 6 above the sockets, the words INSERT, GAIN, PAD and 100Hz, the gain scale markings +6 and +65, and the red switch legend 1-14 48V PHANTOM. Do not re-typeset, re-space or re-letter any of them. If the move takes any of them out of focus, let them blur — never substitute characters.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 05 · The 16, plan view

| | |
|---|---|
| **Role in the cut** | Model |
| **Model** | Signature Plus 16 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 16 (4).webp` |
| **Save the clip as** | `broll-05-plan-16.mp4` |

A straight-down crane onto the whole surface. It is the shot that makes a channel count legible as a quantity rather than a number, and pushing in toward the strips brings the EQ and compressor rows up to a size where they can carry those lines in the script.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera mounted directly overhead on a motion-control crane. 35 mm lens at f/8, sensor plane exactly parallel to the top surface of the console.

Over the full duration, descend slowly straight down the vertical axis, ending roughly 6 percent closer, so the channel strips grow toward the edges of frame. Add one single, almost imperceptible rotation about the lens axis of no more than 0.6 degrees clockwise across the whole move — just enough that the shot is alive rather than a zoom on a still.

Do not translate sideways. Do not tilt off perpendicular. Do not let any edge of the console leave the frame in a way that crops a channel strip in half.

LIGHT AND ATMOSPHERE. A soft overhead source drifts very slightly, so the broad sheen across the panel migrates from one side toward the other over the course of the move. No new shadows, no new reflections, no change of colour temperature.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 06 · Lexicon presets

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (3).webp` |
| **Save the clip as** | `broll-06-lexicon.mp4` |

The A/B preset table is the most information-dense frame in the whole asset set, and the Lexicon processor is the series' genuine point of difference in its class. The shot has to keep the table perfectly readable while the smoke behind it moves.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a dolly. 65 mm at f/4.

Over the full duration, push in slowly along the lens axis by about 5 percent, centred on the rectangular preset-list panel. The panel and both of its columns of preset names must stay pin-sharp and perfectly legible from the first frame to the last. No rotation, no lateral drift.

LIGHT AND ATMOSPHERE. The magenta, orange and teal haze filling the background drifts and blooms slowly, the way real theatrical smoke moves in still air. This is the only element in frame with any freedom. The console and the callout panel in front of it stay completely fixed.

TABLE LOCK — specific to this shot. The preset list is a printed table of sixteen numbered rows across two lettered columns, A and B. Every abbreviation in it must remain character-for-character identical: S.HALL, L.HALL, V.HALL, D.HALL, S.PLT, L.PLT, V.PLT, D.PLT, ROOM, STUDIO, CHMBR, AMB, ARENA, GATED, REV, K.RAOKE, SPRING, S.DLY, D.DLY, T.DLY, P.DLY, M.DLY, R.DLY, CHORUS, FLANGR, PHASER, TREM/P, VIBRTO, RV/DL S, RV/DL L, PHSDEL, ROTDEL. The row numbers 1 to 16 and the processor name printed beneath the table must also stay exactly as they are. Do not re-typeset this table under any circumstances.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, re-typeset table, reordered list, invented preset names, changed row numbers
```

</details>

---

### 07 · Metering, dBu and dBFS

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (6).webp` |
| **Save the clip as** | `broll-07-ssm-metering.mp4` |

The one shot in the set that is allowed to have internal life. A meter that responds is the single clearest way to show a console is switched on and working, and this graphic puts the analogue and digital scales side by side — which is the actual argument.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves in the world. A cinema camera on a dolly. 65 mm at f/4.

Over the full duration, push in slowly along the lens axis by about 5 percent, centred on the two vertical LED ladders. No rotation, no lateral drift, no change of focus.

LIGHT AND ATMOSPHERE. The coloured haze filling the background drifts slowly. The console behind the callout stays fixed.

PERMITTED INTERNAL MOTION — this shot only, and within strict limits. The LED segments that are already lit in the attached image may vary in brightness over time, the way a real meter responds to programme material: dimming and brightening within the exact colours and exact positions they already occupy. They may rise or fall by at most one or two adjacent steps.

They must never change colour. They must never move. Segments that are dark in the attached image must stay dark except for those one or two adjacent steps. The printed scale numbers beside the ladders (+20 down to −24 on the left, 0 down to −44 on the right) and the printed labels dBu and dBFS are legend, not display — they must never change, flicker, or move.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, changing scale numbers, moving meter labels, new LED colours, meter bouncing wildly, strobing
```

</details>

---

### 08 · USB-C, four in four out

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (2).webp` |
| **Save the clip as** | `broll-08-usb-c.mp4` |

The connectivity beat. The callout plate floats in front of the console, which makes it the only shot in the set with real depth separation — so the move is a drift that opens parallax between the two planes.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a dolly. 50 mm at f/4.

Over the full duration, drift slowly along a shallow diagonal: down and to the right, by roughly 5 percent of the frame width and 3 percent of the frame height in total. Because the callout plate sits in front of the console and the console sits behind it, let a small, natural amount of parallax open between those two planes as you move. That separation is the whole point of the shot. Do not rotate.

LIGHT AND ATMOSPHERE. The coloured haze filling the background drifts slowly and independently, at its own pace, behind both planes.

LEGEND LOCK — specific to this shot. The legend printed on the callout plate reads USB 4X4. Those five characters must remain exactly as they are — do not re-space them, do not re-letter them, do not turn them into any other string. The connector drawn on the plate must keep its exact shape.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 09 · The 12, compact

| | |
|---|---|
| **Role in the cut** | Model |
| **Model** | Signature Plus 12 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 12 (1).webp` |
| **Save the clip as** | `broll-09-compact-12.mp4` |

The entry point of the range needs its own moment, and the move is deliberately the opposite of the flagship's: the 32 creeps in and fills the frame, the 12 pulls back and settles into space. Same family, different argument.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a dolly. 50 mm at f/5.6.

Over the full duration, pull back slowly along the lens axis by about 5 percent, so the console settles into a little more space. Keep the front edge of the console exactly level throughout. No rotation, no arc, no drift up or down.

LIGHT AND ATMOSPHERE. A soft key light sweeps slowly from the right of frame to the left across the faders and across the brand badge on the front fascia, so the highlight travels the length of the console once. The background stays clean and unchanged.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 10 · Front of house

| | |
|---|---|
| **Role in the cut** | In use |
| **Model** | Signature Plus 32 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 32 (7).webp` |
| **Save the clip as** | `broll-10-live-foh.mp4` |

The emotional beat. Everything else in the set is hardware; this is the reason anyone buys it. The console sits in the foreground at front of house with a band and a crowd beyond it, and the shot only has to breathe a little to come alive.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the primary move. A cinema camera on a dolly, positioned behind the console at the front-of-house position. 40 mm at f/2.8.

Over the full duration, push in slowly toward the stage by about 6 percent, so the console stays anchored across the lower foreground while the stage and the audience come fractionally closer. Keep the move dead level. No rotation, no tilt up to the lighting rig, no crane.

LIGHT AND ATMOSPHERE. This is a live photograph, so the room is allowed to be alive. Stage lights may shimmer, flicker and change intensity slightly. Haze in the light beams may drift and roll. Colour may shift a little as lamps breathe. None of this is allowed to spill onto the console surface in a way that changes what is printed on it.

PERMITTED HUMAN MOTION — micro-motion only. Audience members may shift their weight, breathe, and move their heads by a few degrees. Musicians on stage may move slightly within the pose they are already in.

Nobody walks. Nobody turns around. Nobody changes identity, face, hair, clothing or instrument. Nobody enters or leaves the frame. No mouths open, no lip movement, no singing.

The console in the foreground is held under the full subject lock above — it is hardware, and it does not move at all.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, face morphing, changing faces, identity change, new people appearing, people leaving frame, extra limbs, extra fingers, distorted hands, lip sync, mouth movement, talking, instruments changing shape
```

</details>

---

### 11 · The room, in daylight

| | |
|---|---|
| **Role in the cut** | In use |
| **Model** | Signature Plus 22 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 22 (10).webp` |
| **Save the clip as** | `broll-11-room-daylight.mp4` |

The counterweight to the live shot. Daylight, a table, three people and a console — it says the same desk that does the gig on Saturday does the podcast on Tuesday, which is the range's real commercial argument.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the primary move. A cinema camera on a dolly. 35 mm at f/2.8.

Over the full duration, dolly in slowly by about 5 percent along an axis that keeps the console anchored in the lower third of the frame. Level, no rotation, no tilt.

LIGHT AND ATMOSPHERE. Daylight through the window may change fractionally, as cloud passes. Foliage visible outside may move gently. Nothing indoors changes colour or intensity.

PERMITTED HUMAN MOTION — micro-motion only. The people in frame may breathe, blink, and turn their heads by no more than a few degrees within the pose they are already holding. A hand resting on the console may shift very slightly.

Nobody stands up, walks, turns around, changes identity, face, hair or clothing. No mouths open, no speech, no lip movement. The microphones, laptop and headphones stay exactly where and what they are.

The console is held under the full subject lock above.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, face morphing, changing faces, identity change, new people appearing, people leaving frame, extra limbs, extra fingers, distorted hands, lip sync, mouth movement, talking, instruments changing shape
```

</details>

---

### 12 · The whole family

| | |
|---|---|
| **Role in the cut** | Close |
| **Model** | All four |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (7).webp` |
| **Save the clip as** | `broll-12-family.mp4` |

The closing frame, and the one a viewer could screenshot and act on. Four consoles at their true relative sizes is the buying decision made visible — which is exactly how the MOTU reel closed, and it worked.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a dolly. 50 mm at f/5.6.

Over the full duration, pull back slowly along the lens axis by roughly 7 percent, opening space around the stacked group so the full range reads as one family. Keep everything centred and level. No rotation, no drift.

LIGHT AND ATMOSPHERE. The coloured haze filling the background drifts and blooms slowly behind the group. The consoles themselves stay completely fixed.

GROUP LOCK — specific to this shot. The four consoles are shown at their true relative sizes, each with its own true channel count. Do not resize any of them relative to the others. Do not add a fifth. Do not remove one. Do not reorder them. Do not alter, extend, redraw or animate the bracket lines drawn between them.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, extra console, missing console, resized console, reordered lineup, redrawn diagram lines
```

</details>

---

### 13 · The band room

| | |
|---|---|
| **Role in the cut** | In use |
| **Model** | Signature Plus 16 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 16 (7).webp` |
| **Save the clip as** | `broll-13-band-room.mp4` |

Four musicians tracking in a dark room with the console lit in the foreground. This is the shot that says “a session”, not “a product”, and it is the warmest frame in the entire asset set — the reel needs at least one moment that is about people rather than hardware.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the primary move. A cinema camera on a dolly. 35 mm at f/2.0, positioned at the console, looking past it toward the musicians.

Over the full duration, push in slowly toward the group by about 5 percent, so the console stays anchored across the lower foreground while the room comes fractionally closer. Keep the move level — no tilt up, no crane, no rotation.

LIGHT AND ATMOSPHERE. The room is dark and lit by warm practicals, and it is allowed to breathe: the warm sources may drift very slightly in intensity, and any haze in the air may move. Nothing changes colour. No new light source appears, and nothing new spills onto the console surface.

PERMITTED HUMAN MOTION — micro-motion only. The musicians may breathe, blink, and shift their weight or head angle by no more than a few degrees inside the pose they are already holding.

Nobody stands, walks, turns around, leaves frame, or changes identity, face, hair or clothing. No mouths open, no singing, no speech, no lip movement. Microphones, stands and the headphones resting on the desk stay exactly where and what they are.

The console in the foreground is held under the full subject lock above — it is hardware, and it does not move at all.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, face morphing, changing faces, identity change, new people appearing, people leaving frame, extra limbs, extra fingers, distorted hands, lip sync, mouth movement, talking, instruments changing shape
```

</details>

---

### 14 · Two players, one desk

| | |
|---|---|
| **Role in the cut** | In use |
| **Model** | Signature Plus 16 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 16 (8).webp` |
| **Save the clip as** | `broll-14-two-players.mp4` |

An acoustic duo against a magenta-washed brick wall, console in the near foreground. It is the most colour-forward frame available and it cuts hard against the dark studio and the daylight room — three completely different rooms, one desk, which is the argument the reel is making.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the primary move. A cinema camera on a slider. 40 mm at f/2.2.

Over the full duration, track laterally from right to left across roughly 6 percent of the frame width, keeping the console anchored in the lower foreground. A lateral move rather than a push, so real parallax opens between the players and the brick wall behind them. Keep the camera height fixed. No rotation, no tilt.

LIGHT AND ATMOSPHERE. The coloured wall wash behind the players may pulse very slowly in intensity, the way a practical on a dimmer breathes. Daylight in the frame stays exactly as it is. No new lights, no flare, no spill onto the console.

PERMITTED HUMAN MOTION — micro-motion only, and less than you would think.

The two players may breathe and shift their weight by a few degrees inside the pose they are already holding. That is all.

CRITICALLY: their hands and fingers must not move at all. Treat both instruments as held, not played. Do not move a hand along a fretboard, do not change a chord shape, do not strum, do not animate a playing motion. Hands on instruments are where this kind of shot fails, and a held pose is always safer than a performed one.

Nobody turns, stands, leaves frame, or changes identity, face, hair, clothing or instrument. No mouths open, no singing, no lip movement.

The console in the foreground is held under the full subject lock above.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, face morphing, changing faces, identity change, new people appearing, people leaving frame, extra limbs, extra fingers, distorted hands, lip sync, mouth movement, talking, instruments changing shape, fingers changing position, strumming, playing motion, changing chord shape, moving along fretboard, instrument deforming
```

</details>

---

### 15 · Reaching for the back

| | |
|---|---|
| **Role in the cut** | In use |
| **Model** | Signature Plus 22 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 22 (11).webp` |
| **Save the clip as** | `broll-15-reaching-back.mp4` |

A home studio mid-setup: one hand out across the console toward the rear, a loom of coloured patch cables running off the back, a guitarist working behind. It is the only frame in the set that shows the desk being used rather than operated, and the cable run does more to explain the I/O than any spec line could.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the primary move. A cinema camera on a dolly. 35 mm at f/2.5.

Over the full duration, push in slowly by about 5 percent along an axis that keeps the console and its cable loom anchored across the lower foreground. Level throughout. No rotation, no tilt, no arc.

LIGHT AND ATMOSPHERE. Daylight from the window may change fractionally, as cloud passes. The monitor screens in frame keep exactly the image they already show — do not animate, scroll, refresh or re-render anything on a screen. No other light changes.

PERMITTED HUMAN MOTION — micro-motion only.

The person at the console may breathe and blink. The reaching arm must stay exactly where it is: do not complete the reach, do not move the hand onto a different control, do not curl or extend the fingers. It is a held pose, not an action.

The person behind may breathe and shift weight by a few degrees, with hands held still on the instrument.

Nobody stands, walks, turns around, leaves frame, or changes identity, face, hair or clothing. No mouths open, no speech, no lip movement.

The cables must not move, uncoil, sway or change colour. The console is held under the full subject lock above.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, face morphing, changing faces, identity change, new people appearing, people leaving frame, extra limbs, extra fingers, distorted hands, lip sync, mouth movement, talking, instruments changing shape, hand moving to a different control, arm completing a reach, cables moving, cables uncoiling, screen content changing, scrolling display
```

</details>

---

### 16 · Thirty-two, from above

| | |
|---|---|
| **Role in the cut** | Scale |
| **Model** | Signature Plus 32 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 32 (1).webp` |
| **Save the clip as** | `broll-16-plan-32.mp4` |

One half of a matched pair. Shot 16 and shot 17 use an identical camera move on an identical framing, so the two can be hard-cut against each other in the edit — thirty-two channel strips, then twelve, in the same frame, with nothing else changing. That single cut carries the whole range in about one second. Run this prompt and shot 17's back to back so the takes match.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera mounted directly overhead on a motion-control crane. 35 mm lens at f/8, sensor plane exactly parallel to the top surface of the console.

Over the full duration, descend slowly straight down the vertical axis, ending roughly 6 percent closer, so the channel strips grow toward the edges of frame. Add one single, almost imperceptible rotation about the lens axis of no more than 0.6 degrees clockwise across the whole move.

Do not translate sideways. Do not tilt off perpendicular. Do not let the console crop at any edge. This move must be repeatable — it is one half of a matched pair.

LIGHT AND ATMOSPHERE. A soft overhead source drifts very slightly, so the broad sheen across the panel migrates from one side toward the other. No new shadows, no new reflections, no change of colour temperature.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 17 · Twelve, from above

| | |
|---|---|
| **Role in the cut** | Scale |
| **Model** | Signature Plus 12 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 12 (2).webp` |
| **Save the clip as** | `broll-17-plan-12.mp4` |

The other half of the pair. Same lens, same descent, same rotation as shot 16 — deliberately identical, because the cut between them is the shot. Generate it immediately after 16 so the two takes are as close as the model will give you.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera mounted directly overhead on a motion-control crane. 35 mm lens at f/8, sensor plane exactly parallel to the top surface of the console.

Over the full duration, descend slowly straight down the vertical axis, ending roughly 6 percent closer, so the channel strips grow toward the edges of frame. Add one single, almost imperceptible rotation about the lens axis of no more than 0.6 degrees clockwise across the whole move.

Do not translate sideways. Do not tilt off perpendicular. Do not let the console crop at any edge. This move is deliberately identical to its matched pair — do not vary it, do not improvise on it, do not make it more interesting.

LIGHT AND ATMOSPHERE. A soft overhead source drifts very slightly, so the broad sheen across the panel migrates from one side toward the other. Match the previous shot's lighting behaviour exactly. No new shadows, no new reflections, no change of colour temperature.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 18 · The back of the 32

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Signature Plus 32 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 32 (5).webp` |
| **Save the clip as** | `broll-18-rear-panel-32.mp4` |

The I/O beat. A metre of connectors in a single straight row is the most honest statement a console can make about what it will and will not do, and the source still is wide enough that a long lateral track never runs out of frame.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a long slider. 85 mm at f/5.6, sensor plane exactly parallel to the rear panel.

Over the full duration, track laterally from left to right across roughly 14 percent of the frame width, travelling along the row of connectors. This is the longest move in the set and it must stay perfectly linear and perfectly level — no drift toward or away from the panel, no rotation, no tilt, no arc that would begin to show the top surface.

LIGHT AND ATMOSPHERE. A soft specular highlight travels along the top edge of the chassis as the camera moves, the way a real light rakes a long metal extrusion. The background stays clean and unchanged.

LEGEND LOCK — specific to this shot. The rear panel carries the brand name, the model name and printed legends beside the connectors. Every one of those characters must survive the move exactly as printed. Do not re-letter, re-space or re-render any of them. Do not add, remove or resize a single connector, and do not change the spacing of the connector row.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

### 19 · Aux and talkback

| | |
|---|---|
| **Role in the cut** | Feature |
| **Model** | Series |
| **Attach this still** | `SOUNDCRAFT SIGNATURE PLUS OVERVIEW (5).webp` |
| **Save the clip as** | `broll-19-aux-talkback.mp4` |

Fills the workflow gap the first twelve left open. Four aux rows, each with its own pre/post switch and its own talkback button, is the feature that decides whether a desk can actually run monitors from the same position as front of house — and it is otherwise invisible in a wide shot.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a dolly. 65 mm at f/4.

Over the full duration, push in slowly along the lens axis by about 5 percent, centred on the tall callout panel showing the repeated aux rows. Every row and every button legend must stay pin-sharp and legible from the first frame to the last. No rotation, no lateral drift, no focus change.

LIGHT AND ATMOSPHERE. The coloured haze filling the background drifts and blooms slowly behind the console. The console and the callout panel in front of it stay completely fixed.

PANEL LOCK — specific to this shot. The callout shows four identical repeated rows. Each row carries one knob, one mute control, and two labelled buttons reading POST and T/B.

Keep exactly four rows — do not add a fifth, do not drop one. Keep the legends POST and T/B on every row, character-for-character. Keep every button in the colour it already is.

Do not illuminate any button, do not animate a button being pressed, do not move a knob, do not add an LED. Nothing on this panel is switched on and nothing is being operated — it is a printed callout, and it holds still.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in, buttons pressing themselves, illuminated buttons, changed button colours, added rows, removed rows, rotating knobs, animated controls
```

</details>

---

### 20 · The 22, in the round

| | |
|---|---|
| **Role in the cut** | Model |
| **Model** | Signature Plus 22 |
| **Attach this still** | `SOUNDCRAFT Signature Plus 22 (6).webp` |
| **Save the clip as** | `broll-20-hero-22.mp4` |

The 22 is the range's sweet spot — the largest desk that still lands on an ordinary table — and until now it only had a side elevation and two lifestyle frames. This gives it the clean beauty shot the 12 and the 32 already have, so all four models can be introduced the same way.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Animate the attached photograph as one continuous piece of live-action cinematography. 16:9. Use the longest duration available.

SUBJECT LOCK — highest priority. This instruction overrides anything below it that appears to conflict with it.

The attached image is frame one, and it is the complete visual truth of the hardware for every frame that follows. The object in it is a real, manufactured, rigid piece of professional audio equipment that was photographed in a studio. It is not an illustration, not a concept sketch, and not a starting point to reinterpret. It is fixed in place: it does not move, rotate, tilt, bend, flex, breathe, ripple, wobble or change its own proportions.

Every knob, fader, fader cap, button, switch, socket, jack, connector, meter, LED, printed label, scale marking, numeral, arrow, icon and logo must remain in exactly the position, size, shape, colour, quantity and spelling shown in the attached image, in every single frame.

• Do not add any control that is not already in the image.
• Do not remove, merge, hide or relocate any control that is in the image.
• Do not change the number of channel strips, faders, knobs, sockets or connectors.
• Do not re-letter, re-spell, re-space, re-font or re-render any printed text — including the brand name, the model name and every panel legend. If text becomes too small to resolve at any point in the move, let it go softly out of focus. Never invent replacement characters.
• Do not redesign, re-colour, re-texture or re-light the panel itself.
• Do not generate any part of the object that the attached image does not already show.

You are filming an existing photograph with a moving camera. You are not re-imagining the product.

CAMERA — the only thing that moves. A cinema camera on a motorised dolly. 50 mm at f/5.6, locked off horizontally.

Over the full duration, push straight in along the lens axis by roughly 4 percent — the same restrained creep used on the flagship, so the two shots feel like they came from the same session. Keep the front edge of the console exactly level throughout. No rotation, no arc around the object, no drift up or down.

LIGHT AND ATMOSPHERE. A soft, wide key light travels slowly from the left of frame to the right across the fader bank and the knob field, so highlights migrate along the metal edges and across the coloured caps. The background stays exactly as it is — no new shadows, no new reflections.

MOTION BUDGET. This is a premium hardware film, not a music video. The move is continuous, slow, in one direction, with a gentle ease in and ease out. It never reverses, snaps, whips, stutters, cuts or jumps. No speed ramp, no zoom punch, no shutter stutter, no handheld shake. If in doubt, move less.

AUDIO: none. Generate no speech, no narration, no music and no sound effects. Silence, or faint neutral room tone at most.

NEGATIVE PROMPT: distorted product, warped hardware, morphing panel, melting controls, extra knobs, missing knobs, extra faders, duplicated channel strips, changed channel count, re-rendered text, gibberish text, garbled lettering, misspelled logo, fake brand name, altered logo, invented labels, changed numerals, added screen, added display, added indicator lights, self-moving faders, self-moving knobs, reflections that alter the panel, lens flare across the panel, heavy bloom, rolling shutter, warp artefacts, camera shake, handheld wobble, whip pan, fast zoom, orbit revealing unseen sides, invented geometry, AI smoothing, plastic sheen, oversharpening, watermark, caption, subtitle, text overlay, UI overlay, border, letterbox, vignette burn-in
```

</details>

---

*Shot list, source-image mapping and output filenames are the contract the Remotion
build reads. Changing any filename here means changing it there.*
