#!/usr/bin/env python3
"""THE PLAN — Soundcraft Signature Plus reel (180 s) and video (300 s).

"Heroes Tonight" runs at 128 BPM (beat 0.46875 s, first beat at 0.04 s in the
source). Every shot, caption and section boundary is a whole number of OUTPUT
beats. Each section is an explicit sequence of tokens:

    ("b", id)                a Kling B-roll, shown complete (11 beats ≈ 5.16 s)
    ("v", id, n)             a clip from Soundcraft's overview video, in n beats
    ("i", slug, n)           a product image, in n beats
    ("d", slug, region, n)   a close-up push into one control row of a plan view
    ("f", slug, n)           a Soundcraft feature callout, framed as a card
    ("L", n)                 the four consoles side by side

The validator proves every B-roll, every overview clip and every image appears
in each film and that the beats add up exactly. Writes src/plan-{reel,video}.json.
"""
import json, os, random

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
A = {a["slug"]: a for a in json.load(open(os.path.join(HERE, "assets.json")))}
V = {v["id"]: v for v in json.load(open(os.path.join(HERE, "vclips.json")))}

BPM = 128.0
BEAT = 60.0 / BPM
SRC_FIRST_BEAT = 0.04
BROLL_BEATS = 11
CLIP_SECONDS = 121 / 24

BROLL = {
    "b01": ("broll/b01-foh-club.mp4", "Signature Plus 32 · live club FOH", "32"),
    "b02": ("broll/b02-worship-service.mp4", "Signature Plus 22 · worship service", "22"),
    "b03": ("broll/b03-festival-foh.mp4", "Signature Plus 32 · festival FOH", "32"),
    "b04": ("broll/b04-home-studio.mp4", "Signature Plus 12 · home studio", "12"),
    "b05": ("broll/b05-podcast-table.mp4", "Signature Plus 16 · podcast", "16"),
    "b06": ("broll/b06-wedding-reception.mp4", "Signature Plus 16 · wedding reception", "16"),
    "b07": ("broll/b07-conference-panel.mp4", "Signature Plus 22 · conference", "22"),
    "b08": ("broll/b08-theatre-booth.mp4", "Signature Plus 22 · theatre booth", "22"),
    "b09": ("broll/b09-cafe-acoustic.mp4", "Signature Plus 12 · café gig", "12"),
    "b10": ("broll/b10-music-school.mp4", "Signature Plus 16 · music school", "16"),
    "b11": ("broll/b11-soundcheck-stage.mp4", "Signature Plus 22 · soundcheck", "22"),
    "b12": ("broll/b12-radio-onair.mp4", "Signature Plus 12 · on air", "12"),
    "b13": ("broll/b13-ballroom-gala.mp4", "Signature Plus 32 · ballroom gala", "32"),
    "b14": ("broll/b14-rehearsal-studio.mp4", "Signature Plus 32 · rehearsal studio", "32"),
    "b15": ("broll/b15-creator-stream.mp4", "Signature Plus 12 · live stream", "12"),
}

# Close-up regions on the Signature Plus 32 plan view (canvas-normalised):
# (centre x, centre y, fraction of the image width in frame).
P32 = "plan-signature-plus-32-1-webp"
REG = {
    "preamps": (0.30, 0.285, 0.34), "gain": (0.30, 0.34, 0.30), "comp": (0.50, 0.37, 0.30),
    "eq": (0.40, 0.45, 0.32), "aux": (0.36, 0.57, 0.32), "lexicon": (0.855, 0.47, 0.15),
    "master": (0.89, 0.55, 0.20), "faders": (0.40, 0.80, 0.42), "qr": (0.745, 0.37, 0.14),
    "talkback": (0.91, 0.40, 0.12), "caps": (0.50, 0.70, 0.34), "usb": (0.80, 0.30, 0.14),
}

R = lambda m, n: f"render-signature-plus-{m}-{n}-webp"
LO = lambda m, n: f"low-signature-plus-{m}-{n}-webp"
PL = {"12": "plan-signature-plus-12-2-webp", "16": "plan-signature-plus-16-4-webp",
      "22": "plan-signature-plus-22-2-webp", "32": P32}
RE = {"12": "rear-signature-plus-12-5-webp", "16": "rear-signature-plus-16-5-webp",
      "22": "rear-signature-plus-22-7-webp", "32": "rear-signature-plus-32-5-webp"}
LIFE = lambda m, n: f"life-signature-plus-{m}-{n}-webp"
FEAT = lambda n: f"feature-signature-plus-overview-{n}-webp"
BANNER = "banner-signature-plus-overview-jpg"
SIDE = lambda n: f"side-signature-plus-22-{n}-webp"

MOVES = ["gimbalL", "gimbalR", "zoomIn", "zoomOut", "focusIn", "focusOut", "craneUp", "orbit"]
T_CALM = ["fade", "slideUp", "wipeDiag", "pullBack", "punchIn", "fade"]
T_DROP = ["punchIn", "whipLeft", "flash", "whipRight", "punchIn", "wipeDiag"]
T_BOUND = ["wipeDiag", "flash", "whipLeft", "whipRight", "slideUp"]
TRANS_CUE = {
    "fade": "swell-reverse", "wipeDiag": "glass-sweep", "whipLeft": "whoosh-doppler", "whipRight": "whoosh-doppler",
    "punchIn": "impact-soft", "pullBack": "air-pass", "slideUp": "shimmer-rise", "flash": "chime-lift",
}

LINEUP = [R(12, 3), R(16, 2), R(22, 4), R(32, 3)]


def caps(cs, b0, b1, t):
    """Headings split evenly across the section, each on whole beats."""
    n = b1 - b0; k = len(cs)
    edges = [b0 + round(n * i / k) for i in range(k + 1)]
    return [{"start": t(edges[i]), "end": t(edges[i + 1]), "t": c[-2], "e": c[-1]} for i, c in enumerate(cs)]


def pad(sections, need):
    """Hand any spare beats to the image shots, shortest first, so every film
    lands on its exact length without stretching B-roll or overview clips."""
    for S in sections:
        S["seq"] = [list(t) for t in S["seq"]]
    have = sum(beats_of(t) for S in sections for t in S["seq"])
    pool = [t for S in sections for t in S["seq"] if t[0] in ("i", "d", "f", "L")]
    while have < need:
        pool.sort(key=lambda t: t[-1])
        pool[0][-1] += 1
        have += 1
    return sections


def beats_of(tok):
    return BROLL_BEATS if tok[0] == "b" else tok[-1]


def build(name, sections, pic_beats, offset, outro_at, audio):
    rng = random.Random(name)
    t = lambda b: round(offset + b * BEAT, 4)
    shots, secs, sfx = [], [], []
    b = 0
    for si, S in enumerate(sections):
        b0 = b
        for k, tok in enumerate(S["seq"]):
            n = beats_of(tok)
            sh = {"b0": b, "b1": b + n, "section": S["id"]}
            if tok[0] == "b":
                f, label, prod = BROLL[tok[1]]
                sh.update(kind="broll", id=tok[1], file=f, label=label, product=prod,
                          rate=CLIP_SECONDS / (n * BEAT))
            elif tok[0] == "v":
                v = V[tok[1]]
                sh.update(kind="vclip", id=tok[1], file=v["file"], label=v["label"], product=v["product"],
                          rate=round(v["dur"] / (n * BEAT), 4))
            elif tok[0] == "i":
                sh.update(kind="still", assets=[tok[1]])
            elif tok[0] == "d":
                sh.update(kind="detail", assets=[tok[1]], region=REG[tok[2]], label=tok[2])
            elif tok[0] == "f":
                sh.update(kind="card", assets=[tok[1]])
            elif tok[0] == "L":
                sh.update(kind="lineup", assets=LINEUP)
            sh["move"] = MOVES[rng.randrange(len(MOVES))]
            if k == 0:
                sh["trans"] = "fade" if si == 0 else T_BOUND[si % len(T_BOUND)]
            else:
                sh["trans"] = (T_DROP if S.get("drop") else T_CALM)[rng.randrange(6)]
            if tok[0] == "b":
                sh["trans"] = "flash" if S.get("drop") else "wipeDiag"
            shots.append(sh)
            b += n
        secs.append({"id": S["id"], "series": S["series"], "label": S["label"], "sub": S.get("sub", ""),
                     "start": t(b0), "end": t(b), "drop": bool(S.get("drop")), "top": S.get("top", {}),
                     "ticker": S.get("ticker", []),
                     "captions": caps(S["captions"], b0, b, t)})
        if si > 0:
            sfx.append({"at": max(0, t(b0) - 0.86), "cue": "shimmer-rise"})
        if S.get("drop"):
            sfx.append({"at": t(b0), "cue": "impact-cinematic"})
    assert b == pic_beats, (name, b, pic_beats)
    for sh in shots:
        sh["start"] = t(sh["b0"]) if sh["b0"] > 0 else 0.0
        sh["end"] = t(sh["b1"])
        if sh["b0"] > 0:
            sfx.append({"at": max(0, sh["start"] - 0.05), "cue": TRANS_CUE[sh["trans"]]})
    shots[-1]["end"] = outro_at  # the last picture runs right up to the end screen
    secs[-1]["end"] = outro_at
    for s in secs:
        for c in s["captions"]:
            sfx.append({"at": c["start"] + 0.03, "cue": "tick-stereo"})
            c["end"] = min(c["end"], outro_at)
    sfx.append({"at": outro_at - 0.15, "cue": "outro-bloom"})
    # ── coverage ──
    used_b = {s["id"] for s in shots if s["kind"] == "broll"}
    used_v = {s["id"] for s in shots if s["kind"] == "vclip"}
    used_i = {a for s in shots for a in s.get("assets", [])}
    miss = (sorted(set(BROLL) - used_b), sorted(set(V) - used_v), sorted(set(A) - used_i))
    return {"name": name, "bpm": BPM, "beat": BEAT, "offset": offset, "shots": shots, "sections": secs,
            "outroAt": outro_at, "sfx": sorted(sfx, key=lambda x: x["at"]), "audio": audio}, miss


# ── shared top-bar vocab ──────────────────────────────────────────────────
TOP = {
    "hook": {"icons": [("sizes", 4, "", "SIZES"), ("ch", 32, "", "UP TO · CHANNELS"), ("fx", 32, "", "LEXICON PRESETS")]},
    "sizes": {"io": [["SIG+ 12", 6, 12], ["SIG+ 16", 10, 16], ["SIG+ 22", 14, 22], ["SIG+ 32", 24, 32]],
              "icons": [("sizes", 4, "", "SIZES"), ("pre", 24, "", "UP TO · GHOST PREAMPS"), ("ch", 32, "", "UP TO · INPUTS")]},
    "pre": {"value": 65, "icons": [("gain", 65, "dB", "MAX GAIN"), ("pre", 6, "dB", "MIN GAIN"), ("hpf", 100, "Hz", "HIGH-PASS")]},
    "eq": {"icons": [("eq", 3, "", "EQ BANDS"), ("rate", 150, "Hz", "MID FROM"), ("rate", 3, "kHz", "MID TO")]},
    "dbx": {"icons": [("dyn", 1, "", "KNOB · dbx"), ("ch", 24, "", "UP TO · COMP CHANNELS"), ("io", 1, "", "INSERT / CH")]},
    "lex": {"icons": [("fx", 32, "", "PRESETS"), ("fx", 2, "", "BANKS"), ("tap", 1, "", "TAP TEMPO")]},
    "mon": {"icons": [("aux", 4, "", "AUX SENDS"), ("talk", 1, "", "TALKBACK XLR"), ("meter", 2, "", "METER SCALES")]},
    "usb": {"icons": [("usb", 4, "×4", "USB-C I/O"), ("hiz", 4, "", "HI-Z INPUTS"), ("ch", 2, "", "REC · STREAM")]},
    "field": {"icons": [("sizes", 4, "", "SIZES"), ("units", 15, "", "USE CASES"), ("ch", 32, "", "UP TO · INPUTS")]},
    "detail": {"icons": [("qr", 1, "", "QR MANUAL"), ("hiz", 4, "", "HI-Z INPUTS"), ("aux", 4, "", "AUX SENDS")]},
    "close": {"icons": [("sizes", 4, "", "SIZES"), ("pre", 24, "", "UP TO · PREAMPS"), ("fx", 32, "", "LEXICON PRESETS")]},
    "m12": {"io": [["SIG+ 12", 6, 12]], "icons": [("pre", 6, "", "GHOST PREAMPS"), ("ch", 12, "", "INPUTS"), ("hiz", 4, "", "HI-Z")]},
    "m16": {"io": [["SIG+ 16", 10, 16]], "icons": [("pre", 10, "", "GHOST PREAMPS"), ("ch", 16, "", "INPUTS"), ("hiz", 4, "", "HI-Z")]},
    "m22": {"io": [["SIG+ 22", 14, 22]], "icons": [("pre", 14, "", "GHOST PREAMPS"), ("ch", 22, "", "INPUTS"), ("hiz", 4, "", "HI-Z")]},
    "m32": {"io": [["SIG+ 32", 24, 32]], "icons": [("pre", 24, "", "GHOST PREAMPS"), ("ch", 32, "", "INPUTS"), ("hiz", 4, "", "HI-Z")]},
}
TICK = {
    "hook": ["SIGNATURE PLUS 12", "SIGNATURE PLUS 16", "SIGNATURE PLUS 22", "SIGNATURE PLUS 32"],
    "sizes": ["12 · 6 MONO", "16 · 10 MONO", "22 · 14 MONO", "32 · 24 MONO", "SAME MASTER SECTION"],
    "pre": ["GHOST PREAMPS", "+6 TO +65 dB", "PAD", "100 Hz HPF", "48 V PHANTOM"],
    "eq": ["SAPPHYRE EQ", "60 Hz SHELF", "12 kHz SHELF", "SWEPT MID 150 Hz – 3 kHz"],
    "dbx": ["dbx COMPRESSION", "OverEasy CURVE", "ONE KNOB", "INSERT ON EVERY MONO CH"],
    "lex": ["LEXICON EFFECTS", "HALLS · PLATES · ROOMS", "CHORUS · FLANGER · DELAYS", "STORE · TAP TEMPO"],
    "mon": ["4 AUX SENDS", "PRE / POST", "MIX TO AUX", "TALKBACK TO ANY OUTPUT", "dBu + dBFS METERING"],
    "usb": ["USB-C 4 IN · 4 OUT", "RECORD THE SHOW", "STREAM", "PLAYBACK", "HI-Z DIRECT INPUT"],
    "field": ["LIVE", "WORSHIP", "EVENTS", "EDUCATION", "BROADCAST", "STUDIO", "STREAMING"],
    "detail": ["COLOUR-CODED CAPS", "LONG-THROW FADERS", "METAL CHASSIS", "QR MANUALS"],
    "close": ["SIGNATURE PLUS 12 · 16 · 22 · 32", "PERFECTED PERFORMANCES"],
    "m12": ["6 MONO CHANNELS", "12 INPUTS", "SAME MASTER SECTION", "SHELF-SIZED"],
    "m16": ["10 MONO CHANNELS", "16 INPUTS", "SAME MASTER SECTION", "BAND + LAPTOP"],
    "m22": ["14 MONO CHANNELS", "22 INPUTS", "SAME MASTER SECTION", "FULL STAGE"],
    "m32": ["24 MONO CHANNELS", "32 INPUTS", "SAME MASTER SECTION", "BIG ROOMS"],
}


def sec(id_, series, label, seq, captions, top, drop=False, sub=""):
    return {"id": id_, "series": series, "label": label, "sub": sub, "seq": seq, "captions": captions,
            "top": TOP[top], "ticker": TICK[top], "drop": drop}


# ═══════════════════════════════════════════════════════════════ REEL ══
# 384 output beats = 180.000 s; end screen from 174.000 s (6 s).
REEL = [
    sec("hook", "all", "SIGNATURE PLUS", [("v", "v01-hero-32", 4), ("i", R(32, 6), 2), ("i", R(22, 9), 2), ("i", R(16, 3), 2),
        ("i", R(12, 6), 2), ("b", "b01"), ("i", LO(32, 4), 2)],
        [(0, 12, "SIGNATURE PLUS SERIES", "Signature"), (12, 25, "PERFECTED performances", "performances")], "hook"),
    sec("sizes", "all", "FOUR SIZES", [("L", 4), ("f", FEAT(7), 3), ("i", PL["12"], 3), ("i", PL["16"], 3), ("i", PL["22"], 3),
        ("i", PL["32"], 3), ("i", BANNER, 3), ("b", "b09")],
        [(0, 16, "FOUR SIZES. ONE desk.", "desk"), (16, 33, "12 · 16 · 22 · 32", "32")], "sizes"),
    sec("pre", "p32", "GHOST PREAMPS", [("v", "v04-ghost-preamps", 5), ("d", P32, "preamps", 3), ("f", FEAT(1), 3), ("b", "b04"),
        ("d", P32, "gain", 3), ("i", R(12, 1), 3)],
        [(0, 14, "GHOST mic preamps", "Ghost"), (14, 28, "6 TO 65 dB OF gain", "gain")], "pre"),
    sec("eq", "p12", "SAPPHYRE EQ", [("v", "v06-sapphyre", 5), ("d", P32, "eq", 3), ("i", LO(12, 7), 3), ("i", R(12, 4), 2)],
        [(0, 13, "SAPPHYRE EQ", "Sapphyre")], "eq"),
    sec("dbx", "p16", "dbx COMPRESSION", [("v", "v05-dbx", 5), ("d", P32, "comp", 3), ("b", "b05"), ("i", R(16, 2), 2),
        ("i", LO(16, 1), 3), ("i", LO(16, 6), 3)],
        [(0, 14, "dbx compression", "dbx"), (14, 27, "ONE KNOB. ONE switch.", "switch")], "dbx", drop=True),
    sec("lex", "p22", "LEXICON FX", [("v", "v07-lexicon", 5), ("f", FEAT(3), 3), ("d", P32, "lexicon", 3), ("b", "b08"),
        ("i", R(22, 3), 2), ("i", R(22, 4), 2)],
        [(0, 13, "LEXICON effects", "Lexicon"), (13, 26, "32 PRESETS · TAP tempo", "tempo")], "lex", drop=True),
    sec("mon", "p22", "MONITORING", [("f", FEAT(5), 3), ("d", P32, "aux", 2), ("b", "b11"), ("v", "v10-talkback", 4),
        ("d", P32, "talkback", 2), ("f", FEAT(6), 3), ("b", "b02"), ("i", LO(22, 1), 2), ("i", LO(22, 6), 2)],
        [(0, 13, "FOUR aux SENDS", "aux"), (13, 24, "TALKBACK TO any output", "any output"), (24, 40, "DUAL metering", "metering")], "mon", drop=True),
    sec("usb", "p12", "USB-C", [("v", "v08-usb-c", 4), ("f", FEAT(2), 3), ("d", P32, "usb", 2), ("b", "b15"),
        ("i", RE["32"], 2), ("i", RE["22"], 2), ("i", RE["16"], 2), ("i", RE["12"], 2)],
        [(0, 13, "USB-C · 4 IN, 4 OUT", "USB-C"), (13, 28, "RECORD AND stream", "stream")], "usb"),
    sec("field", "all", "IN THE FIELD", [("b", "b03"), ("v", "v12-outdoor-band", 2), ("i", LIFE(32, 7), 2), ("b", "b13"),
        ("v", "v13-bass-vocal", 2), ("i", LIFE(16, 7), 2), ("b", "b06"), ("b", "b07"), ("v", "v02-studio-engineer", 3),
        ("i", LIFE(22, 11), 2), ("b", "b10"), ("b", "b12"), ("i", LIFE(22, 10), 2), ("v", "v14-engineer-daylight", 2),
        ("i", LIFE(16, 8), 2), ("v", "v03-live-vocal", 2), ("v", "v15-producer-studio", 2)],
        [(0, 13, "LIVE stages", "stages"), (13, 30, "GALAS AND events", "events"), (30, 52, "CONFERENCES AND studios", "studios"),
         (52, 76, "SCHOOLS AND broadcast", "broadcast"), (76, 99, "EVERY performance", "performance")], "field", drop=True),
    sec("detail", "p32", "THE DETAILS", [("v", "v09-qr-manual", 4), ("v", "v11-layout", 4), ("f", FEAT(4), 2), ("d", P32, "caps", 2),
        ("i", SIDE(5), 2), ("i", SIDE(8), 2), ("b", "b14"), ("v", "v16-patched-console", 3), ("d", P32, "faders", 2)],
        [(0, 12, "COLOUR-CODED layout", "layout"), (12, 32, "LONG-THROW faders", "faders")], "detail"),
    sec("close", "all", "SIGNATURE PLUS", [("L", 4), ("i", LO(32, 2), 2), ("i", R(32, 3), 2), ("d", P32, "master", 2), ("L", 3)],
        [(0, 13, "ONE family", "family")], "close"),
]
REEL_PIC_BEATS = 371
REEL_OUTRO = 174.0

# ═══════════════════════════════════════════════════════════════ VIDEO ══
# 640 output beats = 300.000 s; end screen from 290.000 s (10 s).
VIDEO = [
    sec("hook", "all", "SIGNATURE PLUS", [("v", "v01-hero-32", 6), ("i", R(32, 6), 4), ("i", R(22, 9), 4), ("i", R(16, 3), 4),
        ("i", R(12, 6), 4), ("b", "b01"), ("i", LO(32, 4), 3), ("i", LO(22, 1), 3), ("i", LO(12, 7), 3)],
        [(0, 20, "SIGNATURE PLUS SERIES", "Signature"), (20, 42, "PERFECTED performances", "performances")], "hook"),
    sec("sizes", "all", "FOUR SIZES", [("L", 6), ("f", FEAT(7), 4), ("i", PL["12"], 4), ("i", PL["16"], 4), ("i", PL["22"], 4),
        ("i", PL["32"], 4), ("i", BANNER, 4), ("b", "b09"), ("d", P32, "master", 4), ("i", R(16, 2), 4)],
        [(0, 16, "FOUR SIZES. ONE desk.", "desk"), (16, 32, "12 · 16 · 22 · 32", "32"), (32, 53, "THE SAME master SECTION", "master")], "sizes"),
    sec("pre", "p32", "GHOST PREAMPS", [("v", "v04-ghost-preamps", 7), ("d", P32, "preamps", 4), ("f", FEAT(1), 4), ("b", "b04"),
        ("d", P32, "gain", 4), ("i", R(12, 1), 4), ("i", R(12, 3), 4)],
        [(0, 16, "GHOST mic preamps", "Ghost"), (16, 30, "6 TO 65 dB OF gain", "gain"), (30, 42, "PAD & 100 Hz filter", "filter")], "pre"),
    sec("eq", "p12", "SAPPHYRE EQ", [("v", "v06-sapphyre", 7), ("d", P32, "eq", 4), ("i", LO(12, 7), 4), ("i", R(12, 4), 4),
        ("b", "b12"), ("i", PL["12"], 4)],
        [(0, 16, "SAPPHYRE EQ", "Sapphyre"), (16, 34, "SWEPT mid, 150 Hz – 3 kHz", "mid")], "eq"),
    sec("dbx", "p16", "dbx COMPRESSION", [("v", "v05-dbx", 7), ("d", P32, "comp", 4), ("b", "b05"), ("i", R(16, 2), 3),
        ("i", LO(16, 1), 3), ("i", LO(16, 6), 3), ("i", R(16, 3), 3), ("b", "b10"), ("i", PL["16"], 3)],
        [(0, 16, "dbx compression", "dbx"), (16, 30, "ON EVERY mono CHANNEL", "mono"), (30, 48, "ONE KNOB. ONE switch.", "switch")], "dbx", drop=True),
    sec("lex", "p22", "LEXICON FX", [("v", "v07-lexicon", 7), ("f", FEAT(3), 4), ("d", P32, "lexicon", 4), ("b", "b08"),
        ("i", R(22, 3), 3), ("i", R(22, 4), 3), ("i", R(22, 9), 3), ("i", LO(22, 6), 3)],
        [(0, 16, "LEXICON effects", "Lexicon"), (16, 38, "32 PRESETS · TAP tempo", "tempo")], "lex", drop=True),
    sec("mon", "p22", "MONITORING", [("f", FEAT(5), 4), ("d", P32, "aux", 3), ("b", "b11"), ("v", "v10-talkback", 6),
        ("d", P32, "talkback", 3), ("f", FEAT(6), 4), ("b", "b02"), ("i", LO(22, 1), 3), ("i", PL["22"], 3), ("b", "b07")],
        [(0, 18, "FOUR aux SENDS", "aux"), (18, 32, "TALKBACK TO any output", "any output"), (32, 46, "DUAL metering", "metering"),
         (46, 59, "MIX TO aux", "aux")], "mon", drop=True),
    sec("usb", "p12", "USB-C", [("v", "v08-usb-c", 6), ("f", FEAT(2), 4), ("d", P32, "usb", 3), ("b", "b15"),
        ("i", RE["32"], 3), ("i", RE["22"], 3), ("i", RE["16"], 3), ("i", RE["12"], 3), ("i", R(12, 6), 3)],
        [(0, 16, "USB-C · 4 IN, 4 OUT", "USB-C"), (16, 30, "RECORD AND stream", "stream"), (30, 39, "HI-Z · NO DI box", "box")], "usb"),
    sec("m12", "p12", "SIGNATURE PLUS 12", [("i", R(12, 3), 4), ("i", LO(12, 7), 4), ("i", RE["12"], 4), ("i", R(12, 1), 4)],
        [(0, 0, "SIGNATURE PLUS 12", "12"), (0, 0, "6 MONO · 12 INPUTS", "12")], "m12"),
    sec("m16", "p16", "SIGNATURE PLUS 16", [("i", LO(16, 6), 4), ("i", R(16, 2), 4), ("i", RE["16"], 4), ("i", PL["16"], 4)],
        [(0, 0, "SIGNATURE PLUS 16", "16"), (0, 0, "10 MONO · 16 INPUTS", "16")], "m16"),
    sec("m22", "p22", "SIGNATURE PLUS 22", [("i", LO(22, 1), 4), ("i", R(22, 9), 4), ("i", SIDE(5), 4), ("i", PL["22"], 4)],
        [(0, 0, "SIGNATURE PLUS 22", "22"), (0, 0, "14 MONO · 22 INPUTS", "22")], "m22"),
    sec("m32", "p32", "SIGNATURE PLUS 32", [("i", LO(32, 4), 4), ("i", R(32, 6), 4), ("i", RE["32"], 4), ("i", PL["32"], 4)],
        [(0, 0, "SIGNATURE PLUS 32", "32"), (0, 0, "24 MONO · 32 INPUTS", "32")], "m32"),
    sec("field", "all", "IN THE FIELD", [("b", "b03"), ("v", "v12-outdoor-band", 3), ("i", LIFE(32, 7), 3), ("b", "b13"),
        ("v", "v13-bass-vocal", 3), ("i", LIFE(16, 7), 3), ("b", "b06"), ("v", "v02-studio-engineer", 4),
        ("i", LIFE(22, 11), 3), ("b", "b14"), ("i", LIFE(22, 10), 3), ("v", "v14-engineer-daylight", 3),
        ("i", LIFE(16, 8), 3), ("v", "v03-live-vocal", 3), ("v", "v15-producer-studio", 3)],
        [(0, 14, "LIVE stages", "stages"), (14, 34, "GALAS AND events", "events"), (34, 52, "STUDIOS", "STUDIOS"),
         (52, 70, "REHEARSAL rooms", "rooms"), (70, 85, "EVERY performance", "performance")], "field", drop=True),
    sec("detail", "p32", "THE DETAILS", [("v", "v09-qr-manual", 6), ("d", P32, "qr", 3), ("v", "v11-layout", 6), ("f", FEAT(4), 3),
        ("d", P32, "caps", 3), ("i", SIDE(5), 3), ("i", SIDE(8), 3), ("v", "v16-patched-console", 4), ("d", P32, "faders", 3),
        ("i", LO(32, 2), 3), ("i", R(32, 3), 3), ("i", PL["32"], 3)],
        [(0, 16, "QR code MANUALS", "MANUALS"), (16, 30, "COLOUR-CODED layout", "layout"), (30, 43, "METAL chassis", "chassis"),
         (43, 55, "LONG-THROW faders", "faders")], "detail"),
    sec("close", "all", "SIGNATURE PLUS", [("L", 6), ("i", R(32, 6), 3), ("i", R(22, 4), 3), ("i", R(16, 3), 3), ("i", R(12, 3), 3),
        ("d", P32, "master", 3), ("L", 5)],
        [(0, 13, "WHICH ONE IS yours?", "yours"), (13, 26, "ONE family", "family")], "close"),
]
VIDEO_PIC_BEATS = 618
VIDEO_OUTRO = 290.0

# Source-phrase blocks for each bed, in source beats [from, to).
P = lambda a, b: [a * 16, b * 16]
REEL_AUDIO = [P(0, 12), P(13, 16), P(18, 27)]
VIDEO_AUDIO = [P(0, 25), P(5, 9), P(9, 13), P(19, 21), P(21, 25), P(25, 26)]

if __name__ == "__main__":
    ok = True
    for name, secs, pb, outro, blocks, dur in (("reel", REEL, REEL_PIC_BEATS, REEL_OUTRO, REEL_AUDIO, 180.0),
                                               ("video", VIDEO, VIDEO_PIC_BEATS, VIDEO_OUTRO, VIDEO_AUDIO, 300.0)):
        secs = pad(secs, pb)
        tot = sum(beats_of(t) for s in secs for t in s["seq"])
        print(f"{name}: picture beats {tot} (need {pb}); audio beats {sum(b - a for a, b in blocks)} (need {round(dur / BEAT)})")
        if tot != pb:
            ok = False; continue
        plan, miss = build(name, secs, pb, 0.0, outro,
                           {"blocks": blocks, "duration": dur, "srcOffset": SRC_FIRST_BEAT})
        print("   missing brolls", miss[0], "\n   missing clips", miss[1], "\n   missing images", miss[2])
        json.dump(plan, open(os.path.join(ROOT, "src", f"plan-{name}.json"), "w"), indent=1)
        print(f"   {len(plan['shots'])} shots, outro at {outro}")
    print("OK" if ok else "FIX BEAT TOTALS")
