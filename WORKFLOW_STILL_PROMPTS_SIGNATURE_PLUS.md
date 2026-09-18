# SOUNDCRAFT SIGNATURE PLUS — 10 WORKFLOW STILL PROMPTS
## Multi-reference image generation for Google Gemini

**Client:** Shivansh Electronics, Kolkata
**Purpose:** generate ten photorealistic workflow stills that put the Signature Plus
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
| **Three references, one console** | Each prompt attaches an angle anchor, a plan view for control layout, and a rear panel for connector positions. All three are the same console. The prompt explicitly forbids composing them as separate objects, which is the failure mode that produces a collage. |
| **No people at the controls** | Eight of the ten frames have no people in them at all, and the two that do keep hands well away from the surface. Hands on faders is where image models reliably produce six fingers, and an empty working room reads as calm competence rather than as a stock photo. |
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

Ten workflows, **18 distinct source stills**, 30 reference slots.

**Two frames are set in India on purpose.** Workflow 02 is a community hall and workflow
03 is an outdoor event ground, both written for eastern India, because those are the
rooms these customers actually run and neither appears anywhere in Soundcraft's own
photography. To keep the set geographically neutral, delete the phrase naming the region
from each and they read as any hall and any event ground anywhere.

---

## What to send back

1. Pick one frame per workflow. Ten files, not forty.
2. Name each file exactly as listed on its workflow below, e.g. `wf-01-foh-club.jpg`.
3. Put them in a `workflow-stills/` folder at the root of this repository, alongside
   `b-roll/`, and push.
4. Count the faders on each one before accepting it. It takes five seconds and it catches
   the only failure that matters.

---

## THE TEN

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

*Filenames are the contract the Remotion build reads. Changing one here means
changing it there.*
