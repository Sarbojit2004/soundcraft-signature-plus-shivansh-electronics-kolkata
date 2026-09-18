# SOUNDCRAFT SIGNATURE PLUS — 20 WORKFLOW STILL PROMPTS
## Multi-reference image generation for Google Gemini

**Client:** Shivansh Electronics, Kolkata
**Purpose:** generate twenty photorealistic workflow stills that put the Signature Plus
consoles into real working environments, built from the clean studio photography already
in this repository.

Companion to `B_ROLL_PROMPTS_SIGNATURE_PLUS.md`. The B-roll set animates photographs
that exist. This set makes photographs that do not exist yet, which is the harder
problem: the model has to generate an entire room around a product it must not touch.

---

## The five rules

Every prompt applies all five. They explain why the prompts are shaped the way they are.

| Rule | Why |
|---|---|
| **Match the angle** | Every scene is built around the viewpoint of its reference 1. That is not a stylistic preference — asking for a rear-three-quarter console in a front-on scene forces the model to re-project the product, and re-projection is where the fader count goes wrong. |
| **Three references, one console** | Each prompt attaches an angle anchor, a plan view for control layout, and a rear panel for connector positions — all three the same console. Every prompt explicitly forbids composing them as separate objects, which is the failure mode that produces a collage. Workflow 16 is the single exception and says so loudly: it is two different models in one frame, deliberately. |
| **No people at the controls** | Not one of the twenty frames puts a person at the console. Hands on faders is where image models reliably produce six fingers, and an empty working room reads as calm competence rather than as a stock photo — it also lets the hardware be the only thing the eye lands on. |
| **No text, anywhere** | Every prompt forbids invented signage, screen text, posters and badges. Screens show abstract shapes. All typography for this campaign is set in the reel, where it is editable and correctly kerned. |
| **Cables enter the back** | The most common tell in a fake gear photograph is a cable plugged into the wrong face of the device. Every prompt states where each cable enters, and the negative prompt lists front-panel cable entry explicitly. |

---

## How to run them

| | |
|---|---|
| **Mode** | Gemini image generation, multi-image reference. Attach the references in the order listed on each card — order matters, because every prompt refers to them by number. |
| **Attach order** | Reference 1 is always the fidelity anchor AND the angle contract. References 2 and 3 are layout and connector information for the same console — the prompt explicitly tells the model not to compose them into the picture as separate objects. |
| **Angle** | Never change the camera angle away from reference 1. Each scene below is built around the specific viewpoint of its anchor image. Asking for a rear-three-quarter console in a front-on scene forces the model to re-project the product, and re-projection is where the channel count goes wrong. |
| **Aspect** | 16:9, highest resolution offered. These become full-width plates in the 9:16 reel, composed over a wash exactly like the B-roll clips. |
| **Variants** | Generate 3–4 variants per prompt. Image models vary more than video models on a fixed prompt, and the cheapest quality control is volume. |
| **Reject** | Reject any frame where the channel count is wrong, a fader row is uneven, the brand name is misspelled, or a cable enters the front of the console. Count the faders before you accept a take — it is the fastest tell. |
| **Text** | Every prompt forbids the model from adding text of any kind. Any typography this campaign needs is set in the reel itself, where it is editable and correctly kerned. |

---

## Coverage

| Workflow | Model | Feature it demonstrates |
|---|---|---|
| 01 · Front of house, live club | Signature Plus 32 | Scale · front-of-house position · monitor sends from FOH |
| 02 · Community hall, one volunteer | Signature Plus 22 | Talkback to any output · Listen bus · operable by a non-engineer |
| 03 · Outdoor event, blue hour | Signature Plus 32 | Ruggedness · high input count · working outside a studio |
| 04 · Tracking a band to a laptop | Signature Plus 16 | 4 × 4 USB-C at 192 kHz · recording a live room |
| 05 · Podcast and stream desk | Signature Plus 12 | Compact footprint · USB returns for break music · straight to stream |
| 06 · The control booth | Signature Plus 16 | Installed audio · a permanent position in a venue |
| 07 · Soundcheck, monitors from the desk | Signature Plus 22 | Four aux sends · pre/post per bus · Mix to Aux |
| 08 · Mix position, project studio | Signature Plus 22 | Sapphyre EQ and dbx compression in the mix · DC-coupled outputs |
| 09 · Between sets | Signature Plus 16 | USB returns override the mix for break music and DJ sets |
| 10 · The teaching room | Signature Plus 12 | Portability · a surface a student can learn on · QR code to training |
| 11 · Conference panel, hotel ballroom | Signature Plus 32 | Listen bus · talkback · many open microphones at once |
| 12 · Streaming the room | Signature Plus 22 | 4 × 4 USB-C feeding a live stream while the PA runs |
| 13 · Load-out | Signature Plus 16 | Portability · a desk that travels |
| 14 · The black box theatre | Signature Plus 22 | Talkback to any output · cueing backstage from the desk |
| 15 · The on-air booth | Signature Plus 12 | Compact footprint · one desk running a live broadcast |
| 16 · Two desks, one system | Signature Plus 12 + 32 | The range working together — a small desk on monitors, a large one at FOH |
| 17 · The reception | Signature Plus 32 | High input count · event work at scale |
| 18 · Overhead, the mix position | Signature Plus 32 | The whole surface in its working context |
| 19 · It fits the table | Signature Plus 22 | Chassis depth · a full console on an ordinary desk |
| 20 · The trolley | Signature Plus 12 | One person moves the whole system |

Twenty workflows, **28 distinct source stills**, 62 reference slots, and 20 unique angle anchors — no two frames share a viewpoint.

**Three frames are set in India on purpose.** Workflow 02 is a community hall, 03 an
outdoor event ground and 17 a banquet reception — all written for eastern India, because
those are the rooms these customers actually run and none of them appears anywhere in
Soundcraft's own photography. To keep the set geographically neutral, delete the phrase
naming the region from each and they read as any hall, any event ground and any banquet
room anywhere.

---

## What to send back

1. Pick one frame per workflow. Twenty files, not eighty.
2. Name each file exactly as listed on its workflow below, e.g. `wf-01-foh-club.jpg`.
3. Put them in a `workflow-stills/` folder at the root of this repository, alongside
   `b-roll/`, and push.
4. Count the faders on each one before accepting it. It takes five seconds and it catches
   the only failure that matters.

---

## THE TWENTY

### 01 · Front of house, live club

| | |
|---|---|
| **Model** | Signature Plus 32 |
| **Demonstrates** | Scale · front-of-house position · monitor sends from FOH |
| **Save the image as** | `wf-01-foh-club.jpg` |

The picture every live engineer recognises instantly, and the one that makes a thirty-two channel desk make sense. The console fills the lower third from behind, so the viewer is standing where the engineer stands.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 32 (2).webp`
   — PRIMARY — rear-left three-quarter, elevated. Sets the angle: we are standing behind the desk looking over it.
2. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 32 (5).webp`
   — Connector reference — the rear panel, so the cable entries are in the right places.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-left three-quarter, elevated. Sets the angle: we are standing behind the desk looking over it.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel, so the cable entries are in the right places.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A live music club with a capacity of around two hundred and fifty, mid-set, late evening. A five-piece band is playing on a low stage about twelve metres away — guitarist, bassist, drummer behind a small kit, a keyboard player, a singer at a centre microphone. The crowd between the camera and the stage is a mass of dark silhouettes, heads and shoulders only, lit from the front by the stage wash.

The console stands on a compact front-of-house riser built from a flight case laid flat with a black cloth over it. Beside it: a closed road case on its end, a clipboard with a marked-up input list face down, a roll of gaffer tape, a small clip-on task light with a warm gooseneck bulb throwing a tight pool onto the left end of the surface. A pair of over-ear headphones rests on the case beside the desk, cable coiled loosely.

CAMERA. Full-frame digital, 28 mm lens at f/2.8, ISO 2000, 1/60 s. Camera height roughly 1.5 metres — standing operator eye level — positioned just behind and slightly left of the console, looking forward over its rear edge toward the stage. The console occupies the lower third of the frame and runs almost the full width; the crowd occupies the middle; the stage and the band occupy the upper third. Focus is on the console's control surface, with the crowd and stage falling into soft but readable bokeh.

LIGHT. The room is dark. The console is lit primarily by spill from the stage — warm amber from the front wash, with cool blue and magenta rim light from the back truss catching the top edges of the faders and the end cheeks. The clip light adds one small warm pool. Haze in the air makes the stage beams visible as solid shafts. No light source is aimed at the camera, and nothing blows out.

TECHNICAL TRUTH — this is what separates a real photograph from a stock one.

A thick multicore snake leaves the BACK of the console, not the front, and drops off the rear edge of the riser in a taped loom before running away toward the stage along the floor, held down with gaffer tape.
Individual XLR tails fan out of the loom in a neat spread, each with a colour-coded band near the connector.
The headphone lead runs to the FRONT edge of the console, where a headphone socket lives.
Two further cables leave the rear and run off to the left toward an amplifier rack out of frame — these are the monitor sends.
Nothing is plugged into the top surface. No cable passes through the console body.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, malformed face, asymmetric eyes, extra limbs, extra fingers, fused fingers, distorted hands, uncanny skin, waxy skin, duplicated person, person merging with furniture, visible faces in crowd, recognisable band members, stage screen with text
```

</details>

---

### 02 · Community hall, one volunteer

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | Talkback to any output · Listen bus · operable by a non-engineer |
| **Save the image as** | `wf-02-community-hall.jpg` |

Half the consoles Shivansh sells will be run by someone who is not a sound engineer — a volunteer at a hall, a teacher, a member of the congregation. This is the frame that says the desk is approachable, and it is the one most distributors never shoot.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (9).webp`
   — PRIMARY — rear-left three-quarter from a high angle. Sets the angle: looking down at the desk from behind a seated operator.
2. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-left three-quarter from a high angle. Sets the angle: looking down at the desk from behind a seated operator.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A community hall in eastern India in the late afternoon — a rectangular room with a high ceiling, plastered walls painted a pale cream, tall windows down one side letting in warm low daylight, ceiling fans, and a simple raised platform at the far end.

Rows of moulded plastic chairs, some stacked at the side. On the platform: a wooden lectern with a gooseneck microphone, a keyboard on an X-stand, and two passive loudspeakers on tall poles angled down at the seating.

At the back of the hall, a middle-aged man in a plain shirt sits on a folding chair at a trestle table, with the console in front of him. On the table beside it: a spiral notebook open with handwritten notes, a steel tumbler of water, a short gooseneck talkback microphone on a weighted base, and a laptop turned slightly away from the camera.

CAMERA. Full-frame digital, 35 mm lens at f/4, ISO 800, 1/125 s. Camera height about 1.9 metres, standing just behind and to the left of the seated operator, angled down at roughly 25 degrees so the whole control surface reads and the hall recedes beyond it. The console occupies the lower-left two-thirds of the frame; the operator's shoulder and the back of his head are in the near foreground at the left edge, slightly out of focus; the hall, the platform and the speakers fall away in soft focus toward the upper right.

LIGHT. Warm late-afternoon daylight from the tall windows on the left, raking across the console surface at a shallow angle so the coloured knob caps catch highlights and the faders throw short shadows. Fluorescent tubes overhead are switched off. The far end of the hall is a little brighter than the back where the desk sits. Gentle, believable contrast — no studio lighting, no rim lights.

TECHNICAL TRUTH.

Microphone cables leave the platform, run down the side wall at floor level, and arrive at the BACK of the console.
Two speaker cables leave the rear of the console and run back along the same route to the speaker poles.
The talkback microphone's cable runs a short distance into the rear panel.
A single USB-C cable runs from the rear of the console to the laptop.
The operator's hands rest on the table beside the console, not on the controls — keep hands simple, relaxed and clearly separated from the surface.
No cable is plugged into the top surface or the front edge except a headphone lead, and there is no headphone lead in this frame.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, malformed face, asymmetric eyes, extra limbs, extra fingers, fused fingers, distorted hands, uncanny skin, waxy skin, duplicated person, person merging with furniture, religious iconography, crowd, audience present, ceremonial decoration
```

</details>

---

### 03 · Outdoor event, blue hour

| | |
|---|---|
| **Model** | Signature Plus 32 |
| **Demonstrates** | Ruggedness · high input count · working outside a studio |
| **Save the image as** | `wf-03-outdoor-event.jpg` |

Outdoor event work is the bread and butter of the East and North-East Indian market and it is completely absent from the manufacturer's own photography. A desk working under a tarpaulin at dusk says more to that customer than any studio shot.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 32 (3).webp`
   — PRIMARY — rear-right three-quarter, elevated. Sets the angle: behind the desk, looking across it to the right.
2. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 32 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-right three-quarter, elevated. Sets the angle: behind the desk, looking across it to the right.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. An outdoor event ground at blue hour, about twenty minutes after sunset. A temporary stage stands forty metres away under a scaffolding truss with a plain dark backdrop; two loudspeaker stacks flank it on scaffold towers. The stage is empty and lit by work lights — this is the last check before doors.

The mix position sits under its own small canopy of stretched tarpaulin lashed to four scaffold poles, with the sides open. The console rests on a sturdy trestle table covered with a dark cloth that hangs over the front edge. Beside it: a stacked pair of black flight cases, a mains distribution board with a coiled orange cable, a cheap plastic chair, and a torch lying on the table with its beam off.

Warm string lights are strung along the edge of the canopy. Fine dust hangs in the air. The ground is bare earth with cable ramps laid across the walkway.

CAMERA. Full-frame digital, 24 mm lens at f/2.8, ISO 3200, 1/50 s. Camera height about 1.6 metres, standing behind the desk and slightly right, looking past it toward the stage. The console runs across the lower portion of the frame from left to centre; the open side of the canopy frames the stage beyond; the deep blue post-sunset sky fills the top third above the stage truss. Focus on the console; the stage soft but legible.

LIGHT. Deep blue ambient from the sky, warm tungsten from the string lights directly above and slightly behind the console — so the top edges of the faders and knobs are rimmed warm while the fronts stay cool and blue. The distant stage work lights are a small pool of warm white. Strong, moody colour contrast between the warm foreground and the blue everything else. No flash, no artificial fill.

TECHNICAL TRUTH.

A heavy multicore leaves the BACK of the console, drops behind the table, and runs out from under the canopy toward the stage inside a rubber cable ramp.
Mains cable runs separately from the distribution board, never bundled with the audio loom.
The tarpaulin canopy actually covers the console — the console is not sitting out in the open.
The cloth on the table hangs naturally with creases; it is not a smooth studio drape.
Nothing plugs into the top surface.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, crowd, audience, performers on stage, festival decoration, fireworks, rain, wet equipment
```

</details>

---

### 04 · Tracking a band to a laptop

| | |
|---|---|
| **Model** | Signature Plus 16 |
| **Demonstrates** | 4 × 4 USB-C at 192 kHz · recording a live room |
| **Save the image as** | `wf-04-tracking-to-laptop.jpg` |

The single most important workflow claim the series makes: an analogue desk that is also the interface. One USB-C cable doing the job needs to be visible, and it needs to be visibly the only cable going to the computer.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 16 (2).webp`
   — PRIMARY — rear-left three-quarter, elevated. Sets the angle: over the operator's shoulder, looking down at the surface and past it into the room.
2. `SOUNDCRAFT Signature Plus 16 (4).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 16 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-left three-quarter, elevated. Sets the angle: over the operator's shoulder, looking down at the surface and past it into the room.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A rehearsal and tracking room in a converted industrial unit. Bare brick on one wall, mineral-wool acoustic panels wrapped in grey fabric on the others, a worn wooden floor with a rug under the drums.

In the room beyond the desk: a five-piece drum kit with three microphones on stands, two guitar amplifiers with microphones in front of them on short stands, a bass rig, and a vocal microphone on a boom in the middle. No people in the room — this is a setup shot between takes, and the absence of musicians is deliberate.

The console sits on a solid workbench-style table at the near end of the room. Beside it: an open laptop angled toward the camera, a notepad with a handwritten track list, a mug, a coiled spare XLR cable, and a pair of closed-back headphones lying flat.

CAMERA. Full-frame digital, 35 mm lens at f/3.2, ISO 1250, 1/80 s. Camera height about 1.7 metres, standing just behind the console and slightly left, angled down at roughly 30 degrees. The console fills the lower half of the frame at a comfortable size — close enough that the channel strips read clearly, far enough that the whole desk is in shot. The live room recedes behind it, soft but readable.

LIGHT. Mixed and believable: cool daylight from a high industrial window at the far left, warm practical light from two clip-on lamps aimed at the drum kit, and a small desk lamp near the console. The console surface is lit from the upper left so the fader caps throw short shadows to the lower right. Room is dim overall with pools of light — a working room, not a lit set.

TECHNICAL TRUTH — this is the whole point of the picture, so it has to be exactly right.

ONE single USB-C cable leaves the BACK of the console and runs a short distance to the laptop. It is the only cable between the console and the computer. There is no separate audio interface box anywhere in frame.
All microphone cables run from the stands in the live room, along the floor at the edges, and arrive at the BACK of the console.
The headphone lead runs to the FRONT edge of the console.
The laptop screen shows an abstract multitrack timeline — horizontal coloured bars of varying length on a dark ground — with no readable text, no menu bar, no recognisable software.
Cable runs are tidy but not perfect; one cable has a loose loop on the floor.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, musicians, hands, separate audio interface box, rack unit, readable software interface, screen text
```

</details>

---

### 05 · Podcast and stream desk

| | |
|---|---|
| **Model** | Signature Plus 12 |
| **Demonstrates** | Compact footprint · USB returns for break music · straight to stream |
| **Save the image as** | `wf-05-podcast-desk.jpg` |

The fastest-growing use for a small analogue desk, and the one where the twelve makes the strongest case: a real preamp and a real compressor per voice, going straight out over one cable. It also gives the reel a bright, clean, daylight frame to cut against the dark venue shots.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 12 (1).webp`
   — PRIMARY — front-left three-quarter with the brand badge visible on the front fascia. Sets the angle: seated at the far side of the table, looking back at the desk.
2. `SOUNDCRAFT Signature Plus 12 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 12 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter with the brand badge visible on the front fascia. Sets the angle: seated at the far side of the table, looking back at the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A compact podcast room, mid-morning. One wall carries a grid of dark acoustic foam tiles; another has a window with a sheer curtain diffusing daylight. A solid wooden table fills the frame.

On the table: two broadcast microphones on articulated desk arms, positioned as a two-person setup and angled toward the two empty chairs; two pairs of over-ear headphones, one hanging from a microphone arm and one lying on the table; a laptop open and angled away from the camera; a small potted plant at the edge; a coffee cup on a coaster; a short stack of index cards.

The console sits centrally in front of the near chair, angled very slightly. The room is empty of people.

CAMERA. Full-frame digital, 40 mm lens at f/2.5, ISO 400, 1/160 s. Camera height about 1.15 metres — seated eye level — from the far side of the table looking back toward the near chair, so the console is seen from the front and slightly left, matching reference 1. The console occupies the centre of the lower half of the frame; the microphone arms cross the upper frame; the window light falls from the left.

LIGHT. Soft, generous daylight through the sheer curtain from the left, filling the room and wrapping the console. A single warm practical lamp in the background adds depth on the right. Low contrast, clean, modern — this frame should feel bright and calm, the opposite of the venue shots.

TECHNICAL TRUTH.

Both microphone cables run up the inside of the desk arms, down to the table, and into the BACK of the console.
One USB-C cable leaves the back of the console and runs to the laptop.
One headphone lead runs to the FRONT edge of the console; the second pair of headphones is unplugged and simply lying on the table.
The laptop screen shows abstract, unreadable shapes — no words, no interface, no recognisable application.
Cables are tidied but visible. A small amount of slack is looped under the table edge.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, faces, readable software interface, screen text, streaming overlay, brand names on microphones
```

</details>

---

### 06 · The control booth

| | |
|---|---|
| **Model** | Signature Plus 16 |
| **Demonstrates** | Installed audio · a permanent position in a venue |
| **Save the image as** | `wf-06-control-booth.jpg` |

Installed audio is a large, quiet, repeat-business market — schools, auditoriums, halls — and nobody photographs it. A console living permanently in a booth, wired in and tidy, is a different sale from a console in a flight case.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 16 (1).webp`
   — PRIMARY — front-left three-quarter, elevated. Sets the angle: standing at the booth counter looking down at the desk.
2. `SOUNDCRAFT Signature Plus 16 (4).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 16 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter, elevated. Sets the angle: standing at the booth counter looking down at the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A small technical control booth at the back of a school auditorium, looking through a wide glazed window down into the hall. The hall beyond is empty and dimly lit, with rows of tip-up seats and a curtained stage at the far end.

The booth is narrow and functional: a laminate counter running under the window, a rack of amplifiers and a patch panel standing to the right with its front door open, a coil of spare cable hanging on a hook, a laminated operating instruction sheet taped to the wall with its text turned away or too small to read, and a shelf above holding two spare microphones in a box.

The console sits on the counter under the window, wired in and clearly permanent — no flight case, no gaffer tape.

CAMERA. Full-frame digital, 28 mm lens at f/4, ISO 1600, 1/60 s. Camera height about 1.65 metres, standing at the counter looking down at roughly 30 degrees, with the window and the darkened hall filling the upper third beyond. The console runs across the lower half of the frame. Focus on the console; the hall beyond soft.

LIGHT. Cool, even booth lighting from a recessed ceiling fitting directly above, supplemented by a warm strip of low-level light under the shelf. The hall beyond is significantly darker, so the window reads as a dark rectangle with faint seat rows — the contrast between the lit booth and the dark hall is the depth cue that makes this frame work.

TECHNICAL TRUTH.

All cables leave the BACK of the console and disappear immediately into a cable management tray or a grommet in the counter — this is an installation, so nothing trails across the floor.
Two multicore tails run from that tray across to the amplifier rack on the right.
The rack contains rack-mounted amplifiers and a patch panel with neat rows of connectors, no screens.
There is no flight case, no gaffer tape, no loose loom. Everything is dressed and permanent.
Do not mount the console in the rack, and do not fit it with rack ears — it sits on the counter.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, rack-mounted console, rack ears, readable signage, readable instruction sheet, flight case, gaffer tape
```

</details>

---

### 07 · Soundcheck, monitors from the desk

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | Four aux sends · pre/post per bus · Mix to Aux |
| **Save the image as** | `wf-07-soundcheck-monitors.jpg` |

Aux sends are abstract until you can see the wedges they are feeding. This frame puts the desk and the monitors in the same picture, which is the only way to make the feature legible without a diagram.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (4).webp`
   — PRIMARY — rear-right three-quarter, elevated. Sets the angle: behind the desk during soundcheck, looking toward the stage.
2. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-right three-quarter, elevated. Sets the angle: behind the desk during soundcheck, looking toward the stage.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. An empty music venue during afternoon soundcheck, house lights up and stage work lights on. No audience — the room is bare, the floor is scuffed, and the bar at the side is shuttered.

On the stage, eight metres away: two black floor wedge monitors angled back toward two vocal microphone positions, a drum kit with a third wedge beside it, a guitar amplifier, and a keyboard on a stand. Microphone stands are set and cables are run, but no musicians are present.

The console sits on a flight case at the mix position in the middle of the empty floor. Beside it: an open laptop, a clipboard with a channel list, a bottle of water, and a wireless microphone lying on the case.

CAMERA. Full-frame digital, 35 mm lens at f/3.5, ISO 800, 1/125 s. Camera height about 1.55 metres, standing behind the desk and slightly right, looking across the console toward the stage. The console fills the lower-left portion of the frame at an angle that leads the eye toward the stage; the two wedges are clearly visible in the middle distance, facing back toward the mic positions. Focus on the console with the stage soft but clearly readable.

LIGHT. Flat, honest work lighting — house lights on, stage work lights on, no colour, no haze. This is the unglamorous truth of soundcheck, and the plainness is the point: everything in the frame is legible. Light falls on the console from above and slightly front, so the surface reads evenly with no hot spot.

TECHNICAL TRUTH.

Two clearly separate cables leave the BACK of the console on the left side and run across the floor toward the stage, terminating at the two floor wedges — these are the monitor sends, and they are visibly distinct from the main multicore.
The main multicore also leaves the back and runs in the same direction, taped down.
The main loudspeaker feeds run off to the sides of the stage out of frame.
Floor cables are taped down at crossing points with matte gaffer tape.
No cable enters the front or the top of the console.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, musicians, audience, hands, stage haze, coloured stage lighting, readable signage
```

</details>

---

### 08 · Mix position, project studio

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | Sapphyre EQ and dbx compression in the mix · DC-coupled outputs |
| **Save the image as** | `wf-08-project-studio.jpg` |

The counterweight to every live frame in the set. Same desk, monitors either side, a treated room — it says the console is a mixing tool, not only a PA tool, and that widens the market for it considerably.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (6).webp`
   — PRIMARY — front-right three-quarter hero. Sets the angle: seated at the mix position, the desk seen from the front and slightly right.
2. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-right three-quarter hero. Sets the angle: seated at the mix position, the desk seen from the front and slightly right.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A project studio control room, evening. Broadband absorbers in the corners, a cloud panel overhead, a wooden floor, and a small window into a live room where a guitar on a stand is just visible in the dark.

A deep studio desk runs across the frame. On it: two nearfield monitors on isolation pads at the outer edges, angled in toward the listening position; a laptop on a stand behind the console; a small keyboard controller to the left; a pair of open-back headphones on a hook at the side; a notebook and a pencil; and a modest rack of two outboard units standing to the right.

The console sits centrally, angled very slightly, directly in front of the listening position. No people.

CAMERA. Full-frame digital, 35 mm lens at f/2.8, ISO 1000, 1/100 s. Camera height about 1.2 metres — seated at the mix position — looking slightly down and from the right, matching reference 1. The console occupies the centre and lower half of the frame; the two monitors frame it left and right; the dark live-room window sits centrally beyond.

LIGHT. Low, warm, intentional. A single desk lamp at the left throws a warm pool across the console surface; an LED strip behind the monitor shelf gives a cool backlight that separates the monitors from the wall; the rest of the room falls to shadow. Highlights catch the tops of the fader caps and the metal edges. Deep, rich shadow with retained detail — this is the most atmospheric frame in the set.

TECHNICAL TRUTH.

Two balanced cables leave the BACK of the console and run to the two nearfield monitors, one to each.
A USB-C cable leaves the back and runs up to the laptop.
The keyboard controller's audio cables run to the back of the console as line inputs.
The headphone lead is visible hanging from its hook, unplugged.
The outboard rack is connected with short patch cables between itself and the console's rear.
The live-room window is glass and shows a faint reflection of the console's coloured knob caps — a small detail that sells the realism.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, readable software interface, screen text, recognisable outboard brand names
```

</details>

---

### 09 · Between sets

| | |
|---|---|
| **Model** | Signature Plus 16 |
| **Demonstrates** | USB returns override the mix for break music and DJ sets |
| **Save the image as** | `wf-09-between-sets.jpg` |

A specific, unglamorous, extremely common job: the band has finished, the room still needs sound, and the same desk has to do it without a second box. It is also the only frame in the set with an empty, lit stage — visually distinct from everything else.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 16 (6).webp`
   — PRIMARY — front-right three-quarter. Sets the angle: approaching the desk from the front-right, at counter height.
2. `SOUNDCRAFT Signature Plus 16 (4).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 16 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-right three-quarter. Sets the angle: approaching the desk from the front-right, at counter height.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A small bar-venue between sets, late evening. The stage at the back is empty but still lit by a single warm lamp, with a drum kit, two guitar stands and a bare microphone stand standing in the pool of light. Bar stools are pushed in at a shuttered service counter to the left. A few empty glasses sit on a nearby ledge. The room is otherwise dark and quiet.

The console sits on a narrow counter at the side of the room at standing height, with an open laptop beside it. A small warm lamp clipped to the counter lights the desk. A stack of spare cables is coiled on a shelf below.

CAMERA. Full-frame digital, 35 mm lens at f/2.2, ISO 2500, 1/60 s. Camera height about 1.35 metres, approaching from the front-right so the console is seen from the front and right, matching reference 1. The console fills the left and centre of the lower frame; the empty lit stage sits in the upper-right middle distance, softly out of focus but clearly readable as a stage.

LIGHT. Two warm sources: the clip lamp on the console counter, close and directional, and the single stage lamp in the distance. Everything between them falls to near-black. The console surface is the brightest thing in frame; the lit stage is the second. Strong, simple, moody separation.

TECHNICAL TRUTH.

A single USB-C cable leaves the BACK of the console and runs to the laptop.
The main multicore and speaker feeds also leave the back and disappear down behind the counter.
The laptop screen shows an abstract playlist-like arrangement — soft horizontal bands on a dark ground, no words, no recognisable application.
No microphone is plugged in at the front. The stage microphone stand in the distance has its cable coiled at its base, unplugged.
No hands, no people.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, crowd, DJ equipment, turntables, readable software interface, screen text, alcohol branding
```

</details>

---

### 10 · The teaching room

| | |
|---|---|
| **Model** | Signature Plus 12 |
| **Demonstrates** | Portability · a surface a student can learn on · QR code to training |
| **Save the image as** | `wf-10-teaching-room.jpg` |

Music schools and academies buy in quantity and replace on a cycle, and they buy on approachability rather than specification. A bright, uncluttered classroom frame with the smallest desk in the range closes the set on the opposite note to where it opened.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 12 (6).webp`
   — PRIMARY — front-right three-quarter from a low angle. Sets the angle: close to the table, looking slightly up across the desk.
2. `SOUNDCRAFT Signature Plus 12 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 12 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-right three-quarter from a low angle. Sets the angle: close to the table, looking slightly up across the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A bright music teaching room in the middle of the morning. Pale walls, a large window with a simple blind half raised, a wooden floor, and a whiteboard on the far wall wiped clean.

An upright piano stands against the left wall with its lid closed and a music book resting on it. Two folding chairs face a table. On the table: the console, a single small PA loudspeaker on a short stand behind it, a condenser microphone on a compact tabletop stand, two pairs of headphones, and a stack of printed sheet music with the printing too small and too oblique to read.

No people. The room is set up and waiting for a lesson.

CAMERA. Full-frame digital, 50 mm lens at f/2.8, ISO 320, 1/200 s. Camera height about 0.85 metres — low, close to table height — looking slightly up and across the console from the front right, matching reference 1. The console dominates the lower two-thirds of the frame and feels substantial from this low angle; the piano and the window sit behind it in soft focus.

LIGHT. Bright, clean morning daylight from the window on the right, falling directly across the console surface so the coloured knob caps are at their most saturated and legible. Soft shadows. The brightest and most open frame in the whole set — deliberately, so it cuts hard against the venue work.

TECHNICAL TRUTH.

The microphone cable runs from the tabletop stand into the BACK of the console.
One speaker cable leaves the back and runs to the small PA speaker behind.
One headphone lead runs to the FRONT edge of the console; the second pair lies unplugged on the table.
There is no laptop in this frame — the point is that the desk works on its own.
Cables are short and tidy, with a little natural slack.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, children, students, teacher, hands, faces, readable sheet music, readable whiteboard, text on walls
```

</details>

---

### 11 · Conference panel, hotel ballroom

| | |
|---|---|
| **Model** | Signature Plus 32 |
| **Demonstrates** | Listen bus · talkback · many open microphones at once |
| **Save the image as** | `wf-11-conference-panel.jpg` |

Corporate and conference work is steady, unglamorous, high-margin, and it is the one application where a large channel count is obviously necessary rather than aspirational — a six-person panel plus two lecterns plus playback fills a desk fast.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 32 (6).webp`
   — PRIMARY — front-left three-quarter from a high angle. Sets the angle: standing beside the mix table looking down and across the desk.
2. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 32 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter from a high angle. Sets the angle: standing beside the mix table looking down and across the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A hotel ballroom set for a conference session, half an hour before doors. A patterned carpet, a low modular stage at the far end with a plain dark backdrop and a long table set for six with white cloth, six gooseneck microphones on low bases and six bottles of water. A lectern with its own gooseneck stands to one side. Rows of banquet chairs face the stage, straight and empty. Two loudspeakers on tall poles flank the stage; two more stand halfway down the room as delays.

The mix position is a draped trestle table at the rear of the room. On it beside the console: a laptop, a small talkback microphone on a desk base, a pair of headphones, a coiled spare cable, and a printed running order lying face down so nothing on it can be read.

No people anywhere in the room.

CAMERA. Full-frame digital, 35 mm lens at f/4, ISO 1600, 1/100 s. Camera height about 1.9 metres, standing at the left end of the mix table looking down at roughly 35 degrees and across the console toward the stage. The console occupies the lower-left half of the frame and reads clearly; the empty chair rows and the lit stage recede to the upper right. Focus on the console; the stage soft but legible.

LIGHT. Warm tungsten chandeliers and recessed ceiling downlights, plus a cooler white stage wash on the panel table at the far end. The mix position sits in a dimmer pocket at the back, lit mostly by a small task lamp and by spill from the room. Believable hotel-ballroom lighting — slightly yellow, slightly uneven, never theatrical.

TECHNICAL TRUTH.

A multicore leaves the BACK of the console, drops behind the trestle table and runs to the stage under a taped cable mat down the centre aisle.
Four speaker feeds leave the rear and run to the four loudspeaker poles by separate routes along the walls.
The talkback microphone's cable runs a short distance into the rear panel.
One USB-C cable runs from the rear to the laptop.
Each gooseneck microphone on the panel table has a visible cable dropping through a grommet in the table and running to the back of the stage.
No cable enters the front or top of the console.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, delegates, speakers, hands, readable signage, readable name cards, corporate logos, projector screen with content
```

</details>

---

### 12 · Streaming the room

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | 4 × 4 USB-C feeding a live stream while the PA runs |
| **Save the image as** | `wf-12-streaming-the-room.jpg` |

Almost every venue now streams, and almost every venue does it by pointing a phone at the room and getting terrible sound. One cable from the desk to the encoder fixes that, and this frame shows the whole chain in a single picture.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (3).webp`
   — PRIMARY — front-left three-quarter, elevated, brand badge visible. Sets the angle: standing at the front-left of the mix table looking down at the desk.
2. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter, elevated, brand badge visible. Sets the angle: standing at the front-left of the mix table looking down at the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A small live room at a music venue during soundcheck, set up to stream. The stage is eight metres away, lit and empty, with two microphone stands, a guitar amplifier and a drum kit ready.

The mix position is a folding table at the side of the room. On it: the console, a laptop open beside it, and a small video camera on a short tripod pointed at the stage, its screen flipped out showing an abstract unreadable preview. A second, taller tripod stands behind with a camera aimed down the room. A coil of cable and a roll of tape sit at the table edge.

No people in frame.

CAMERA. Full-frame digital, 35 mm lens at f/3.2, ISO 1600, 1/100 s. Camera height about 1.75 metres, standing at the front left of the mix table, looking down at roughly 30 degrees across the console with the stage visible beyond at the upper right. The console occupies the lower-left two-thirds of the frame; the camera on its tripod sits in the mid-ground at the right; the lit stage lies beyond, softly out of focus.

LIGHT. Stage lighting on at working level — warm front wash with a little blue from behind — plus one small cool practical over the mix table. The room between is dim. The console is lit from above and slightly left so the knob caps read clearly.

TECHNICAL TRUTH — the cable chain is the picture.

ONE USB-C cable leaves the BACK of the console and runs to the laptop. That single cable is the audio path to the stream.
A separate short cable runs from the video camera to the laptop — visibly a different cable of a different colour, so the two paths read as distinct.
The microphone multicore leaves the back of the console and runs toward the stage, taped down.
Two speaker feeds leave the back and run to the sides of the stage out of frame.
The camera screen shows soft abstract shapes — no interface, no words, no menus, no recording indicator.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, performers, hands, readable camera interface, readable software, screen text, recognisable camera brand, phone
```

</details>

---

### 13 · Load-out

| | |
|---|---|
| **Model** | Signature Plus 16 |
| **Demonstrates** | Portability · a desk that travels |
| **Save the image as** | `wf-13-load-out.jpg` |

The set needs one frame about the end of the night rather than the middle of it. A desk sitting in its case on a loading bay says “this thing lives in a van” more directly than any specification, and it is what separates a working console from a studio ornament.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 16 (3).webp`
   — PRIMARY — rear-right three-quarter, elevated. Sets the angle: standing over the open case looking down into it.
2. `SOUNDCRAFT Signature Plus 16 (4).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 16 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-right three-quarter, elevated. Sets the angle: standing over the open case looking down into it.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A venue loading bay at night, after the show. A roller shutter is half raised behind, with the tail of a plain white van just visible beyond, doors open. The floor is scuffed concrete, slightly damp, catching reflections.

The console sits seated in an open black flight case on a low wheeled dolly, its foam-lined lid propped back. Around it: two coiled multicore looms on the floor, a stack of two more flight cases, a folded microphone stand, and a roll of tape. A single caged work light on a stand throws hard light across the scene from the left.

No people in frame.

CAMERA. Full-frame digital, 28 mm lens at f/2.8, ISO 3200, 1/60 s. Camera height about 1.6 metres, standing over the case looking down at roughly 40 degrees, so the console is seen seated in the case from behind and to the right. Case and console fill the lower two-thirds of the frame; the shutter, the van and the night beyond fill the upper third.

LIGHT. One hard work light from the left throwing strong directional light and long shadows across the concrete; cool sodium spill from outside the shutter; deep shadow everywhere else. High contrast, slightly gritty, unglamorous. Highlights rake the top edges of the faders and the case hardware.

TECHNICAL TRUTH.

The console is UNPLUGGED. No cable is connected to it at all — this is the end of the night.
The case interior is black foam cut to the console's shape; the console sits down into it with only its top surface proud.
The coiled looms on the floor are separate from the case, wrapped over-under with a hook-and-loop tie.
Do not fit the console with rack ears or handles, and do not close a lid on top of it — the lid is propped open behind.
The case is a flight case with recessed butterfly catches and corner protection, standing on a dolly with castors.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, connected cables, cables running into the case, rack ears, closed lid, rain, heavy wet reflections on the console
```

</details>

---

### 14 · The black box theatre

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | Talkback to any output · cueing backstage from the desk |
| **Save the image as** | `wf-14-black-box-theatre.jpg` |

Theatre is a distinct market with a distinct need: the operator has to talk to backstage without the audience hearing it. A sound desk beside a lighting desk in a dark control position is instantly legible to anyone who has ever worked a show.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (1).webp`
   — PRIMARY — front-left three-quarter from a low angle. Sets the angle: seated at the control counter, eye almost level with the surface.
2. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter from a low angle. Sets the angle: seated at the control counter, eye almost level with the surface.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. The control position of a small black-box theatre during a technical rehearsal. Matt black walls, a black floor, a low counter running along the back of the seating bank, and a clear view forward over empty raked seats to the stage.

On the stage beyond: a simple set of two rostra and a chair, lit by one warm special from above, the rest of the stage in shadow. A lighting bar with lanterns hangs overhead, partly visible at the top of frame.

On the counter beside the console: a lighting control desk with its faders down, a gooseneck lamp with a small blue-filtered bulb, a printed cue sheet turned so its text cannot be read, a headset with a boom microphone resting on the counter, and a bottle of water.

No people in frame.

CAMERA. Full-frame digital, 35 mm lens at f/2.5, ISO 3200, 1/50 s. Camera height about 1.1 metres — seated at the counter — looking at the console from the front and slightly left, almost level with its surface so the fader bank reads in strong perspective. The console fills the left and centre of the lower frame; the lit stage sits small and bright at the upper right beyond the dark seating.

LIGHT. Very dark. The only local light is the small blue-filtered gooseneck lamp over the counter, putting a cool pool across part of the console and leaving the rest in shadow. The warm stage special in the distance is the one warm element in frame. The blue-and-amber split between foreground and background is the whole colour story.

TECHNICAL TRUTH.

Cables leave the BACK of the console and disappear immediately into a cable tray under the counter — this is an installed control position.
A separate cable runs from the headset's connector along the counter and into the rear of the console; the headset itself lies unplugged for the moment with its lead coiled.
The lighting desk is a separate piece of equipment with its own cable run and is not connected to the sound console.
No cable enters the front or top of the console.
Nothing on the counter is illuminated by its own screen except the gooseneck lamp's bulb.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, actors, audience, hands, readable cue sheet, readable lighting desk display, illuminated screens, coloured stage haze
```

</details>

---

### 15 · The on-air booth

| | |
|---|---|
| **Model** | Signature Plus 12 |
| **Demonstrates** | Compact footprint · one desk running a live broadcast |
| **Save the image as** | `wf-15-on-air-booth.jpg` |

Community and campus radio buys small desks constantly and replaces them on a cycle. A booth is also the tightest space any of these consoles will ever live in, which makes the twelve's footprint the argument without having to state it.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 12 (7).webp`
   — PRIMARY — front-left three-quarter from a low angle. Sets the angle: seated across the booth table, close to the surface.
2. `SOUNDCRAFT Signature Plus 12 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 12 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-left three-quarter from a low angle. Sets the angle: seated across the booth table, close to the surface.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A small community radio on-air booth, daytime. The room is barely three metres across: acoustic foam on two walls, a heavy door with a small window, and a desk along one side under a wall-mounted monitor loudspeaker.

On the desk: the console, a large broadcast microphone on a heavy articulated arm swung over the seat position, a pair of over-ear headphones hanging from the arm, a computer monitor pushed to the back showing abstract colour blocks, a wired desk lamp, a mug, and a small stack of index cards.

A single empty office chair is pushed back from the desk. No people.

CAMERA. Full-frame digital, 40 mm lens at f/2.2, ISO 800, 1/125 s. Camera height about 0.95 metres, sitting low across the desk looking at the console from the front and slightly left, close enough that the twelve channel strips fill a good part of the frame. The microphone arm crosses the upper left; the monitor and the foam wall sit behind, soft.

LIGHT. Soft, slightly cool daylight leaking through the door window from a corridor, plus the warm desk lamp on the right, plus a faint glow from the monitor. Small room, mixed colour temperature, low contrast. It should feel enclosed and quiet.

TECHNICAL TRUTH.

The microphone cable runs along the inside of the articulated arm, down to the desk, and into the BACK of the console.
One USB-C cable leaves the back of the console and runs to the computer behind the monitor.
One cable leaves the back and runs up the wall to the monitor loudspeaker.
The headphones are unplugged, hanging from the microphone arm with their lead coiled.
The computer monitor shows soft abstract colour blocks — no interface, no words, no waveform that reads as a specific application.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, presenter, hands, faces, readable screen, software interface, on-air sign, readable index cards, station branding
```

</details>

---

### 16 · Two desks, one system

| | |
|---|---|
| **Model** | Signature Plus 12 + 32 |
| **Demonstrates** | The range working together — a small desk on monitors, a large one at FOH |
| **Save the image as** | `wf-16-two-desks.jpg` |

The only frame in the set that argues for the range rather than for a product. A small desk running monitors at the side of the stage and a large one at front of house is a real, common rig, and seeing both in one picture is the cleanest way to say these consoles are a family that scales. It is also the hardest prompt here — expect to run more variants.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 12 (3).webp`
   — PRIMARY — the NEAR console, rear-right three-quarter elevated. Sets the angle for the whole picture.
2. `SOUNDCRAFT Signature Plus 32 (2).webp`
   — The SECOND, SEPARATE console in the background — rear-left three-quarter elevated. A different and much larger model.
3. `SOUNDCRAFT Signature Plus 12 (2).webp`
   — Layout reference for the near console.
4. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — Layout reference for the far console.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — the NEAR console, rear-right three-quarter elevated. Sets the angle for the whole picture.
  [2] The SECOND, SEPARATE console in the background — rear-left three-quarter elevated. A different and much larger model.
  [3] Layout reference for the near console.
  [4] Layout reference for the far console.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A mid-size venue during soundcheck, viewed from the side of the stage. Two separate mix positions are visible in one frame.

In the near foreground, at stage level on a small trestle table draped in black: the SMALLER console, set up as a monitor position, with two floor wedges just visible beyond it angled back toward the stage.

Twenty metres away down the room, raised slightly on a platform and clearly much wider: the LARGER console at the front-of-house position, with a laptop beside it.

The stage itself is lit at working level with a drum kit and microphone stands set. The room is empty of people.

CAMERA. Full-frame digital, 35 mm lens at f/2.8, ISO 2000, 1/80 s. Camera height about 1.6 metres, standing at the side of the stage looking down the room, so the near console is large in the lower-left foreground and the far console is small and clearly wider in the middle distance at the right. Focus on the near console; the far console soft but unmistakably a bigger desk of the same family.

LIGHT. Working lights on — even, warm-white, unglamorous. A small clip lamp at each mix position adds a local warm pool. No stage colour, no haze. The two consoles are the two brightest things in the frame.

TWO DIFFERENT CONSOLES, NOT ONE REPEATED. Read this twice.

These are two distinct products. The near console is the smaller model from reference 1, with its own exact channel count. The far console is the larger model from reference 2, with its own, visibly greater, channel count.

Do not duplicate one console twice. Do not average them into a single design. Do not give the near desk the far desk's width or the far desk the near desk's width — the size difference between them is the entire point of the picture.

TECHNICAL TRUTH.

A multicore leaves the BACK of the near console and runs a short distance onto the stage.
Two cables leave the back of the near console and run to the two floor wedges.
A separate, longer multicore runs the length of the room from the stage toward the far console.
Both consoles stand on their own tables. Nothing connects the two consoles directly to each other.
No cable enters the front or top of either console.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, musicians, hands, identical consoles, duplicated console, same size desks, merged console designs, three consoles
```

</details>

---

### 17 · The reception

| | |
|---|---|
| **Model** | Signature Plus 32 |
| **Demonstrates** | High input count · event work at scale |
| **Save the image as** | `wf-17-the-reception.jpg` |

Wedding and reception work is the single largest revenue line for event companies in eastern India, and it is completely invisible in Soundcraft's own photography. A thirty-two channel desk at a banquet, before anyone arrives, is a picture this distributor's customers will recognise as their own Saturday.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 32 (4).webp`
   — PRIMARY — front-right three-quarter from a low angle, brand badge visible on the front fascia. Sets the angle: standing close to the front-right corner of the mix table.
2. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 32 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — front-right three-quarter from a low angle, brand badge visible on the front fascia. Sets the angle: standing close to the front-right corner of the mix table.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A banquet hall in eastern India, set for a reception and empty about an hour before guests arrive. Round tables with white cloths and folded napkins, chairs in fabric covers, small floral centrepieces. A low stage at the far end with a decorated backdrop and a keyboard, a drum kit and several microphone stands set for a live band. Warm decorative uplighters wash the side walls; a chandelier hangs overhead.

The mix position is a long draped table at the side of the room, halfway down. On it: the console, a laptop, a small task lamp, a plastic water bottle, and a clipboard lying face down. Two loudspeakers on tall stands stand near the stage and a second pair further down the room.

No people.

CAMERA. Full-frame digital, 35 mm lens at f/2.8, ISO 1600, 1/80 s. Camera height about 1.25 metres, standing close to the front-right corner of the mix table so the console is seen from the front and right and feels substantial and wide in frame. The console runs across the lower half; the dressed tables and lit stage recede behind into soft focus.

LIGHT. Warm and decorative — amber uplighters on the walls, a warm chandelier overhead, and a cooler white wash on the stage at the far end. The console is lit mostly by the task lamp and warm ambient spill, so its coloured knob caps sit against a gold room. Rich, inviting, slightly golden, no hard shadows.

TECHNICAL TRUTH.

A heavy multicore leaves the BACK of the console, drops behind the draped table, and runs along the base of the wall toward the stage, taped at crossing points.
Four speaker feeds leave the rear and run separately to the four loudspeaker stands.
One USB-C cable runs from the rear to the laptop.
The drape on the table hangs with real creases and does not reach the floor evenly.
No cable enters the front or top of the console, and no cable crosses an open walkway untaped.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, guests, wedding party, hands, religious iconography, readable signage, food on tables, confetti, fireworks
```

</details>

---

### 18 · Overhead, the mix position

| | |
|---|---|
| **Model** | Signature Plus 32 |
| **Demonstrates** | The whole surface in its working context |
| **Save the image as** | `wf-18-overhead-mix-position.jpg` |

The one composition in the set that is graphic rather than atmospheric — straight down on the desk with the working clutter of a real mix position around it. It cuts hardest against everything else and it is the frame most likely to be screenshotted.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 32 (1).webp`
   — PRIMARY — the full control surface from directly above. Sets the angle: the camera is straight overhead.
2. `SOUNDCRAFT Signature Plus 32 (2).webp`
   — Geometry reference — the same console in three-quarter, for chassis proportions.
3. `SOUNDCRAFT Signature Plus 32 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — the full control surface from directly above. Sets the angle: the camera is straight overhead.
  [2] Geometry reference — the same console in three-quarter, for chassis proportions.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. Directly overhead a front-of-house mix position in a venue, during a break in soundcheck.

The console sits centred on a black-draped table. Arranged around it on the table, as they would really fall: an open laptop at the top edge angled slightly; a pair of over-ear headphones lying with their lead in a loose curl; a marked-up paper input list with its writing too oblique and small to read; a pen; a roll of gaffer tape; a phone lying face down; a paper cup; a small torch. At the bottom edge of frame, the operator's empty chair back intrudes slightly.

The floor is just visible around the table edges — scuffed dark venue flooring with a taped cable run crossing it.

CAMERA. Full-frame digital, 35 mm lens at f/5.6, ISO 1600, 1/80 s. Camera mounted directly overhead, sensor exactly parallel to the table, roughly 2.2 metres above it. The console sits centred and occupies about seventy percent of the frame width, running left to right. Everything is in focus. This is a flat-lay of a working position photographed honestly — not styled, not symmetrical.

LIGHT. Broad soft ambient from the venue's own overhead lighting, plus one warm task lamp just out of frame at the left throwing a slightly warmer pool across the left end of the console. Soft-edged shadows fall to the lower right from everything on the table. No hard spot, no glare on the surface.

TECHNICAL TRUTH.

All cables leave the BACK edge of the console — the top edge of the frame — and run off the table in a taped bundle.
One USB-C cable runs from that bundle to the laptop.
One headphone lead runs to the FRONT edge of the console, the edge nearest the bottom of frame.
The paper input list is oriented to the operator, so its writing runs away from the camera and cannot be read.
Objects on the table are placed as somebody working would leave them, not arranged for a photograph — nothing is parallel to the table edge except the console itself.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, readable paper, readable laptop screen, styled flat lay, symmetrical arrangement, props arranged in a grid, latte art
```

</details>

---

### 19 · It fits the table

| | |
|---|---|
| **Model** | Signature Plus 22 |
| **Demonstrates** | Chassis depth · a full console on an ordinary desk |
| **Save the image as** | `wf-19-it-fits-the-table.jpg` |

Every buyer asks the same first question about a twenty-two channel desk: will it actually fit where I need it. A side-on frame at table height answers that in a way no specification ever does, and it is the only composition in the set about the shape of the object rather than its surface.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 22 (5).webp`
   — PRIMARY — the side elevation of the console. Sets the angle: the camera is at table height, looking along the desk from the side.
2. `SOUNDCRAFT Signature Plus 22 (8).webp`
   — The opposite side elevation of the same console — extra geometry for the chassis profile, which is the subject of this frame.
3. `SOUNDCRAFT Signature Plus 22 (2).webp`
   — Layout reference — the full control surface from directly above.
4. `SOUNDCRAFT Signature Plus 22 (7).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — the side elevation of the console. Sets the angle: the camera is at table height, looking along the desk from the side.
  [2] The opposite side elevation of the same console — extra geometry for the chassis profile, which is the subject of this frame.
  [3] Layout reference — the full control surface from directly above.
  [4] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A modest home studio or small office room in daylight. A plain wooden desk of ordinary depth stands against a pale wall, seen end-on so its depth reads clearly.

The console sits on the desk toward the back, its wedge profile in clean side elevation — low at the front, raised at the rear. In front of it there is still usable desk space: a notebook lying open face down, a pen, a coffee cup, and a laptop pushed to one side.

Behind the desk, a plain wall with a single framed picture carrying no readable content, and a small shelf holding two books and a plant. A window out of frame to the left casts daylight across the scene.

CAMERA. Full-frame digital, 50 mm lens at f/4, ISO 400, 1/160 s. Camera height about 0.78 metres — exactly desk height — positioned to the side of the desk and level with the surface, looking along it so the console is seen in near-perfect side elevation. The console occupies the centre and right of frame; the empty desk space in front of it is deliberately visible at the left, because the free space is the subject.

LIGHT. Clean, even daylight from the left with a soft falloff across the wall behind. Low contrast, natural colour, no artificial fill. The light rakes along the console's front lip and picks out the slope of the chassis, which is what makes the profile read.

TECHNICAL TRUTH.

The desk is an ordinary domestic or office desk of normal depth — not studio furniture, not a purpose-built console desk.
The console's rear edge sits close to the wall; its cables leave the BACK, drop straight down behind the desk, and are gathered loosely.
No cable runs across the front of the desk or through the free space in front of the console.
Nothing rests on top of the console surface.
The free desk space in front of the console must be clearly visible and unobstructed — that space is the argument the picture is making.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, hands, purpose-built studio desk, console furniture, rack furniture, clutter in front of the console, cables across the desk, readable picture frame, readable book spines
```

</details>

---

### 20 · The trolley

| | |
|---|---|
| **Model** | Signature Plus 12 |
| **Demonstrates** | One person moves the whole system |
| **Save the image as** | `wf-20-the-trolley.jpg` |

Schools, colleges and institutions across this territory buy exactly one thing: a system one member of staff can wheel into a hall, switch on, and use. A desk living on an AV trolley is that system, and it closes the set on the most practical note available.

**Attach these references, in this order:**

1. `SOUNDCRAFT Signature Plus 12 (4).webp`
   — PRIMARY — rear-right three-quarter, elevated. Sets the angle: standing beside the trolley looking down at the desk.
2. `SOUNDCRAFT Signature Plus 12 (2).webp`
   — Layout reference — the full control surface from directly above.
3. `SOUNDCRAFT Signature Plus 12 (5).webp`
   — Connector reference — the rear panel.

<details><summary><strong>Prompt — copy everything inside the fence</strong></summary>

```text
Create one photorealistic 16:9 photograph from the attached reference images.

THE REFERENCES, in the order attached:
  [1] PRIMARY — rear-right three-quarter, elevated. Sets the angle: standing beside the trolley looking down at the desk.
  [2] Layout reference — the full control surface from directly above.
  [3] Connector reference — the rear panel.

HARDWARE FIDELITY CONTRACT — highest priority. This overrides anything below it that appears to conflict.

The mixing console in the attached references is a real, specific, manufactured product. Reproduce it EXACTLY as photographed. It is the one element in this image that may not be interpreted, restyled, simplified or improved.

• Keep the exact number of channel strips, faders, knobs, buttons and sockets.
• Keep every control in the exact position, size, shape and colour it has in the references, including the colour coding of the knob caps.
• Keep the chassis proportions, the slope of the top surface, the shape of the end cheeks and the finish of the metalwork.
• Reproduce the printed brand name and model name exactly as they appear. Do not re-letter, re-spell or re-typeset them. Do not invent any additional text, badge, logo, sticker or label anywhere on the console.
• If a legend is too small to render legibly at this size, let it fall softly out of focus or be lost to distance. Never substitute invented characters.
• Do not add a screen, display, LED strip, illuminated meter or any lit element that is not in the references.
• Do not add rack ears, handles, dust covers, stands or accessories that are not in the references.

HOW TO USE THE REFERENCES. Reference image 1 defines the console's ANGLE as well as its appearance: build this scene's camera to match that viewpoint, and do not re-project the console to a different one. References 2 and onward are supplied only to give you fuller information about the same console's control layout and rear connector panel — do not place them in the picture as separate objects, and do not produce a collage.

THE SCENE. A school assembly hall in the morning, set up but empty. A wooden floor, high windows down one side, a low stage at the far end with the curtains drawn back, and rows of stacked chairs against the walls.

In the near foreground stands a grey steel AV trolley on castors with two shelves and a cable hook at the side. The console sits on the upper shelf. On the lower shelf: a small amplifier, a coiled mains lead, and a plastic crate holding two microphones and a couple of short cables.

A single powered loudspeaker on a tall stand stands beside the trolley, and a microphone on a boom stand is set up near the front of the stage.

No people.

CAMERA. Full-frame digital, 35 mm lens at f/3.5, ISO 640, 1/125 s. Camera height about 1.7 metres, standing beside the trolley and looking down at roughly 35 degrees so the console reads clearly from behind and to the right. Trolley and console occupy the lower-left half of frame; the empty hall and the stage recede to the upper right.

LIGHT. Bright, clean morning daylight flooding through the high windows on the left, throwing long soft shadows across the wooden floor. Overhead fluorescents are off. Honest institutional daylight — bright, a little cool, completely unstyled.

TECHNICAL TRUTH.

The microphone cable runs from the boom stand near the stage, along the floor at the edge of the room, and into the BACK of the console.
One speaker cable leaves the back of the console and runs to the powered loudspeaker on its stand beside the trolley.
A mains lead runs from the trolley's lower shelf to a wall socket by a route clearly separate from the audio cables.
Spare cable hangs in a loose coil on the trolley's side hook.
The console sits flat on the trolley shelf with a little clearance at each end. It is not strapped down, cased, or rack-mounted.
No cable enters the front or top of the console.

PHOTOGRAPHIC TREATMENT. This must read as a photograph taken on a real camera by a working photographer, not as a render and not as an illustration. Full-frame digital capture with natural depth of field and honest, uneven available light. Slight, honest imperfection is wanted: a little dust, a cable that is not perfectly coiled, wear on a surface, a slightly uneven stack of chairs. Avoid the clean, symmetrical, over-lit look of a catalogue render.

NO TEXT ANYWHERE. Do not add signage, posters, banners, screen text, captions, watermarks, brand marks or any lettering that is not already printed on the console itself in the references. Any screen visible in the frame shows abstract, unreadable shapes and colour — never words, never a recognisable software interface, never a recognisable company's product.

NEGATIVE PROMPT: distorted product, warped console, wrong channel count, extra faders, missing faders, uneven fader row, invented knobs, rearranged controls, garbled text, gibberish lettering, misspelled brand name, invented logo, added badge, added sticker, added screen, added display, added LED strip, rack ears, handles, dust cover, plastic toy look, CGI render look, video game asset, clay render, oversaturated, HDR halo, heavy vignette, watermark, caption, text overlay, signage, readable software interface, extra fingers, six fingers, distorted hands, malformed face, duplicated person, floating cables, cables plugged into nothing, cables entering the front panel, cables passing through solid objects, impossible cable routing, mirrored text, lens dirt, heavy chromatic aberration, fisheye distortion, people, children, students, staff, hands, rack-mounted console, rack ears, straps over the console, readable notices, school branding
```

</details>

---

*Filenames are the contract the Remotion build reads. Changing one here means
changing it there.*
