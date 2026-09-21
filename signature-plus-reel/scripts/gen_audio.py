#!/usr/bin/env python3
"""Synthesise the whole sound layer for the reel: eleven cues and a music bed.

EVERY CUE HERE IS SYNTHESISED FROM SCRATCH.
───────────────────────────────────────────
The previous Signature Plus film cut its transitions out of the supplied
`sound-effects/tech (N).mp3` pack. By instruction, that pack is not used at all
this time — nothing below opens a file from it. Each cue is built out of
oscillators, filtered noise and envelopes, which buys three things a library
cannot:

  * the cue is tuned to the move it sits under, not merely adjacent to it. A
    9-frame whip gets a 0.30 s whoosh, not the 0.9 s one that happened to be in
    the pack;
  * every cue shares one voice — the same noise colour, the same filter slopes,
    the same transient shape — so eleven cues sound like one kit rather than
    eleven downloads;
  * they are deterministic. The RNG is seeded per cue, so a rebuild produces a
    bit-identical file and a re-render cannot drift.

THE BED is the supplied `High Impact.mp3`, which runs 84.06 s against a 90.000 s
reel. It is NOT time-stretched to fit: a 7% tempo change on a finished music cue
is audible and cheap-sounding. Instead the track plays at its own speed under
the 84.000 s body — which is what BODY_LEN happens to be, to within a
sixteenth of a second — and crossfades into a synthesised resolve that carries
the six-second end screen and lands on silence exactly at 90.000 s.

MASTERING. The bed is normalised to -23 LUFS (EBU R128). The cues are NOT
normalised individually — seven of the eleven are shorter than R128's 400 ms
gating block and measure as silence, so a per-cue normaliser hands a 38 ms tick
355x gain and a clipped buzz back. They take one shared gain instead, set by the
loudest member of the kit, which keeps the balance they were designed with. See
KIT_PEAK.

Either way the film plays every source at unity: a volume multiplier in the
Remotion timeline would silently undo this.
"""
import json
import os
import subprocess
import sys

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(ROOT)
PUB = os.path.join(ROOT, "public", "audio")
SFX = os.path.join(PUB, "sfx")
FF = os.path.expanduser("~/bin/ffmpeg")
BED_SRC = os.path.join(REPO, "High Impact.mp3")

SR = 48000
FILM_LEN = 90.0
BODY_LEN = 84.0
OUTRO_LEN = 6.0

# Where the bed hands over to the synthesised resolve. Early enough that the
# crossfade is finished before the end screen takes the frame.
HANDOVER = 82.4
XFADE = 1.6

BED_LUFS = -23.0

# ── why the cues are NOT loudness-normalised individually ────────────────────
#
# EBU R128 integrated loudness is defined over 400 ms gating blocks. Seven of
# the eleven cues are shorter than that — tick-tiny is 38 ms — so the meter
# reports them as silence (-70 LUFS) and a naive "normalise each cue to
# -19 LUFS" applies 355x gain to a tick and hands back a clipped buzz. That is
# exactly what the first build of this file did.
#
# The fix is not a better meter. These eleven cues were designed AS A KIT, with
# their relative levels set in the synthesis itself: impact-full is loud, a
# blip is tiny, and that ratio is the point. So one gain is applied to all of
# them, chosen so the loudest peaks at KIT_PEAK, and the balance inside the kit
# is left exactly as designed.
KIT_PEAK = 0.70  # ≈ -3.1 dBFS on the loudest cue in the kit


# ── plumbing ─────────────────────────────────────────────────────────────────

def decode(path, sr=SR):
    """Decode anything ffmpeg reads into a float32 stereo array, shape (n, 2)."""
    out = subprocess.run(
        [FF, "-v", "error", "-i", path, "-f", "f32le", "-acodec", "pcm_f32le",
         "-ac", "2", "-ar", str(sr), "-"],
        capture_output=True, check=True).stdout
    return np.frombuffer(out, dtype=np.float32).reshape(-1, 2).astype(np.float64)


def write_wav(path, x, sr=SR):
    """24-bit WAV, because these are intermediates the renderer reads."""
    x = np.clip(x, -1.0, 1.0)
    subprocess.run(
        [FF, "-v", "error", "-y", "-f", "f32le", "-ar", str(sr), "-ac", "2",
         "-i", "-", "-c:a", "pcm_s24le", path],
        input=x.astype(np.float32).tobytes(), check=True)


def write_mp3(path, x, sr=SR, kbps="256k"):
    x = np.clip(x, -1.0, 1.0)
    subprocess.run(
        [FF, "-v", "error", "-y", "-f", "f32le", "-ar", str(sr), "-ac", "2",
         "-i", "-", "-c:a", "libmp3lame", "-b:a", kbps, path],
        input=x.astype(np.float32).tobytes(), check=True)


def measure_lufs(path):
    """Integrated loudness, straight out of ffmpeg's EBU R128 meter."""
    out = subprocess.run(
        [FF, "-v", "info", "-i", path, "-af", "ebur128=framelog=quiet", "-f", "null", "-"],
        capture_output=True, text=True).stderr
    val = None
    for line in out.splitlines():
        s = line.strip()
        if s.startswith("I:") and "LUFS" in s:
            try:
                val = float(s.split()[1])
            except (ValueError, IndexError):
                pass
    return val


def normalise(path, target):
    """Measure integrated loudness, apply one flat gain, rewrite.

    Only ever used on the BED, which is 90 s long and therefore something R128
    can actually measure. See KIT_PEAK for why the cues are handled differently.
    """
    cur = measure_lufs(path)
    if cur is None or not np.isfinite(cur):
        return None
    gain = 10 ** ((target - cur) / 20.0)
    x = decode(path)
    x *= gain
    peak = np.max(np.abs(x)) if x.size else 0.0
    # Only if the flat gain pushed it over do we touch the shape, and then with
    # a soft knee rather than a hard clip.
    if peak > 0.985:
        x = np.tanh(x * (0.985 / peak) * 1.02) * 0.985
    if path.endswith(".mp3"):
        write_mp3(path, x)
    else:
        write_wav(path, x)
    return measure_lufs(path)


# ── small DSP ────────────────────────────────────────────────────────────────

def _rng(seed):
    return np.random.default_rng(seed)


def noise(n, seed, stereo_spread=0.35):
    """Correlated stereo noise. Fully decorrelated noise images too wide and
    collapses to nothing in mono, which is how most of these will be heard."""
    r = _rng(seed)
    mid = r.standard_normal(n)
    side = r.standard_normal(n) * stereo_spread
    return np.stack([mid + side, mid - side], axis=1)


def onepole_lp(x, cutoff, sr=SR):
    """A one-pole lowpass, applied sample-serially over a TIME-VARYING cutoff.
    Vectorised via an IIR is not possible with a moving coefficient, so this is
    the one place the code runs a Python loop — cues are under a second."""
    a = np.exp(-2.0 * np.pi * np.asarray(cutoff, dtype=np.float64) / sr)
    a = np.clip(a, 0.0, 0.9999)
    y = np.zeros_like(x)
    prev = np.zeros(x.shape[1])
    for i in range(x.shape[0]):
        ai = a[i] if a.ndim else a
        prev = (1 - ai) * x[i] + ai * prev
        y[i] = prev
    return y


def onepole_hp(x, cutoff, sr=SR):
    return x - onepole_lp(x, cutoff, sr)


def env(n, attack, decay, curve=2.2, sr=SR):
    """Percussive envelope: near-instant rise, power-curve fall."""
    a = max(1, int(attack * sr))
    d = max(1, n - a)
    return np.concatenate([
        np.linspace(0.0, 1.0, a) ** 0.6,
        (1.0 - np.linspace(0.0, 1.0, d)) ** curve,
    ])[:n]


def sweep(n, f0, f1, sr=SR, shape=1.0):
    """A sine whose frequency glides f0 -> f1, phase-accumulated so it never
    clicks at the joins."""
    t = np.linspace(0.0, 1.0, n) ** shape
    f = f0 + (f1 - f0) * t
    return np.sin(2.0 * np.pi * np.cumsum(f) / sr)


def stereo(x):
    return np.stack([x, x], axis=1) if x.ndim == 1 else x


def pan(x, position):
    """position -1 (left) .. +1 (right), equal power."""
    th = (position + 1.0) * 0.25 * np.pi
    return x * np.stack([np.cos(th) * np.ones(x.shape[0]),
                         np.sin(th) * np.ones(x.shape[0])], axis=1) * np.sqrt(2.0)


def tail(x, seconds=0.05, sr=SR):
    """Always land on true zero — a cue that ends on a non-zero sample clicks
    when the Sequence cuts it."""
    n = min(x.shape[0], int(seconds * sr))
    if n > 1:
        x[-n:] *= np.linspace(1.0, 0.0, n)[:, None]
    return x


# ── the kit ──────────────────────────────────────────────────────────────────
#
# Eleven cues, one voice. Every one of them ends in tail() and every one is
# seeded, so a rebuild is bit-identical.

def c_air_pass(seed=11):
    """fade — a soft filtered swish. The gentlest thing in the kit."""
    n = int(0.52 * SR)
    x = noise(n, seed, 0.5)
    cut = np.geomspace(700, 5200, n)
    x = onepole_hp(onepole_lp(x, cut), 260)
    x *= env(n, 0.09, 0.43, 1.7)[:, None]
    return tail(x * 0.42, 0.08)


def c_gate_snap(seed=22):
    """wipeDiag — a hard gate closing. Short, square-edged, a little metallic."""
    n = int(0.20 * SR)
    x = noise(n, seed, 0.28)
    x = onepole_hp(onepole_lp(x, np.geomspace(6000, 1400, n)), 420)
    e = env(n, 0.001, 0.19, 3.4)
    # the metallic edge: two close tones beating against each other
    ring = (np.sin(2 * np.pi * 2320 * np.arange(n) / SR)
            + 0.7 * np.sin(2 * np.pi * 3115 * np.arange(n) / SR))
    x += stereo(ring) * 0.16 * env(n, 0.0005, 0.07, 4.5)[:, None]
    return tail(x * e[:, None] * 0.62, 0.02)


def _whoosh(n, lo, hi, seed, spread):
    """Shared body of both whips: noise under a band that rises then falls,
    which is what a real pass-by does — the two whips differ only in range."""
    x = noise(n, seed, spread)
    t = np.linspace(0, 1, n)
    # up then down, peaking two-thirds through
    band = lo + (hi - lo) * np.sin(np.pi * np.clip(t / 0.66, 0, 1) ** 0.85)
    x = onepole_hp(onepole_lp(x, band), band * 0.30)
    return x


def c_whip_mid(seed=33):
    """whipLeft — travels right to left, so it is panned that way."""
    n = int(0.34 * SR)
    x = _whoosh(n, 620, 4600, seed, 0.55)
    x *= env(n, 0.05, 0.29, 2.0)[:, None]
    # the pan IS the transition: the picture slides, so the sound slides
    p = np.linspace(0.85, -0.85, n)
    th = (p + 1.0) * 0.25 * np.pi
    x *= np.stack([np.cos(th), np.sin(th)], axis=1) * np.sqrt(2.0)
    return tail(x * 0.52, 0.04)


def c_whip_bright(seed=44):
    """whipRight — left to right, faster and higher than its twin."""
    n = int(0.30 * SR)
    x = _whoosh(n, 1100, 7400, seed, 0.62)
    x *= env(n, 0.035, 0.265, 2.2)[:, None]
    p = np.linspace(-0.85, 0.85, n)
    th = (p + 1.0) * 0.25 * np.pi
    x *= np.stack([np.cos(th), np.sin(th)], axis=1) * np.sqrt(2.0)
    return tail(x * 0.50, 0.04)


def _impact(n, f0, f1, body_cut, seed, click=0.30):
    """Shared body of both impacts: a sub that drops in pitch, a filtered
    body, and a transient click on the front so it reads on a phone speaker
    that cannot reproduce the sub at all."""
    sub = stereo(sweep(n, f0, f1, shape=0.45)) * env(n, 0.002, 0.9, 2.6)[:, None]
    bod = noise(n, seed, 0.22)
    bod = onepole_lp(bod, np.geomspace(body_cut, body_cut * 0.25, n))
    bod *= env(n, 0.001, 0.55, 3.2)[:, None]
    cn = int(0.012 * SR)
    clk = noise(cn, seed + 1, 0.1)
    clk = onepole_hp(clk, 1800) * env(cn, 0.0003, 0.011, 3.0)[:, None]
    x = sub * 0.85 + bod * 0.45
    x[:cn] += clk * click
    return x


def c_impact_tight(seed=55):
    """punchIn — the camera lunges, so the hit is short and close."""
    n = int(0.38 * SR)
    return tail(_impact(n, 132, 46, 2600, seed, 0.34) * 0.72, 0.05)


def c_impact_full(seed=66):
    """pullBack — the camera opens out, so the hit has a room on it."""
    n = int(0.82 * SR)
    x = _impact(n, 104, 34, 1900, seed, 0.26)
    # the 'room': a decaying noise bloom well behind the hit
    rm = noise(n, seed + 7, 0.75)
    rm = onepole_lp(onepole_hp(rm, 300), 2400)
    rm *= (np.linspace(1, 0, n) ** 2.4)[:, None] * 0.13
    return tail((x + rm) * 0.74, 0.09)


def c_riser_short(seed=77):
    """slideUp, and the lift into every chapter. Rises to its own end, so it
    is placed BEFORE the frame it is lifting into, never on it."""
    n = int(0.66 * SR)
    x = noise(n, seed, 0.45)
    x = onepole_hp(onepole_lp(x, np.geomspace(900, 9000, n)), np.geomspace(240, 2400, n))
    # a harmonic stack rising with it, which is what stops it sounding like a
    # kettle: the noise gives the movement, the partials give it a pitch
    t = np.arange(n) / SR
    harm = np.zeros(n)
    for k, amp in ((1, 1.0), (2, 0.45), (3, 0.22)):
        harm += amp * np.sin(2 * np.pi * np.cumsum(np.geomspace(180 * k, 720 * k, n)) / SR)
    x += stereo(harm) * 0.10
    x *= (np.linspace(0, 1, n) ** 2.1)[:, None]
    return tail(x * 0.46, 0.03)


def c_snap_low(seed=88):
    """flash — the picture blows out white, so the cue is a dry snap with no
    tail to argue with the next shot."""
    n = int(0.17 * SR)
    x = noise(n, seed, 0.2)
    x = onepole_hp(onepole_lp(x, np.geomspace(4200, 900, n)), 200)
    x *= env(n, 0.0008, 0.16, 3.8)[:, None]
    x += stereo(sweep(n, 220, 88, shape=0.4)) * env(n, 0.001, 0.14, 3.0)[:, None] * 0.55
    return tail(x * 0.66, 0.02)


def c_blip_one(seed=99):
    """One item of a count landing — the ladder filling, the effect table
    populating. Deliberately tiny: these fire eight at a time."""
    n = int(0.075 * SR)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 1280 * t) + 0.35 * np.sin(2 * np.pi * 2560 * t)
    x = stereo(tone) * env(n, 0.0015, 0.072, 3.6)[:, None]
    return tail(x * 0.30, 0.012)


def c_tick_tiny(seed=101):
    """The mark under a caption that closes a thought. Near-subliminal."""
    n = int(0.038 * SR)
    x = noise(n, seed, 0.15)
    x = onepole_hp(x, 4200) * env(n, 0.0004, 0.036, 4.2)[:, None]
    t = np.arange(n) / SR
    x += stereo(np.sin(2 * np.pi * 3400 * t)) * env(n, 0.0004, 0.03, 4.0)[:, None] * 0.35
    return tail(x * 0.22, 0.008)


def c_outro_bloom(seed=111):
    """The end screen arriving.

    The only cue with a musical identity: a stacked fifth blooming open with a
    shimmer an octave above it. It runs 4.4 s under a 6 s end screen, so it has
    room to ring out rather than being cut off — which is why Film.tsx gives
    every cue Sequence 150 frames rather than 90."""
    n = int(4.4 * SR)
    t = np.arange(n) / SR
    root = 110.0  # A2
    voices = [(1.0, 0.55), (1.5, 0.34), (2.0, 0.30), (3.0, 0.16), (4.0, 0.10)]
    tone = np.zeros(n)
    for mult, amp in voices:
        # a touch of drift per voice, so the stack breathes instead of sitting
        drift = 1.0 + 0.0016 * np.sin(2 * np.pi * (0.13 + 0.07 * mult) * t)
        tone += amp * np.sin(2 * np.pi * root * mult * np.cumsum(drift) / SR)
    # shimmer: the same stack an octave up, delayed, quieter
    sh = np.zeros(n)
    for mult, amp in voices[:3]:
        sh += amp * np.sin(2 * np.pi * root * mult * 2 * t)
    d = int(0.18 * SR)
    tone[d:] += sh[:-d] * 0.16

    a = int(0.55 * SR)
    e = np.concatenate([
        np.linspace(0, 1, a) ** 1.5,
        np.linspace(1, 0, n - a) ** 1.9,
    ])[:n]
    x = stereo(tone) * e[:, None]
    # widen very slightly by delaying one side a few samples
    w = 24
    x[w:, 1] = x[:-w, 1]
    x = onepole_lp(x, 7200)
    return tail(x * 0.40, 0.35)


CUES = {
    "air-pass": c_air_pass,
    "gate-snap": c_gate_snap,
    "whip-mid": c_whip_mid,
    "whip-bright": c_whip_bright,
    "impact-tight": c_impact_tight,
    "impact-full": c_impact_full,
    "riser-short": c_riser_short,
    "snap-low": c_snap_low,
    "blip-one": c_blip_one,
    "tick-tiny": c_tick_tiny,
    "outro-bloom": c_outro_bloom,
}


# ── the bed ──────────────────────────────────────────────────────────────────

def resolve_pad(n, seed=222):
    """The six seconds under the end screen.

    Built rather than borrowed, because the supplied track simply stops at
    84.06 s and a reel that runs to 90.000 s would otherwise end on four
    seconds of silence under its own contact details. A low sustained fifth
    with a slow bloom, tuned to the same A the outro cue sits on so the two
    agree rather than beat against each other.
    """
    t = np.arange(n) / SR
    root = 55.0  # A1, an octave under the bloom
    tone = np.zeros(n)
    for mult, amp in ((1.0, 0.50), (1.5, 0.26), (2.0, 0.30), (3.0, 0.12), (4.0, 0.07)):
        drift = 1.0 + 0.0012 * np.sin(2 * np.pi * (0.09 + 0.05 * mult) * t)
        tone += amp * np.sin(2 * np.pi * root * mult * np.cumsum(drift) / SR)
    air = noise(n, seed, 0.8)
    air = onepole_lp(onepole_hp(air, 1800), 9000) * 0.05
    x = stereo(tone) + air
    # in over the crossfade, out to true silence at the very end
    fin = int(XFADE * SR)
    fout = int(2.2 * SR)
    e = np.ones(n)
    e[:fin] = np.linspace(0, 1, fin) ** 0.8
    e[-fout:] = np.linspace(1, 0, fout) ** 1.5
    return tail(x * e[:, None] * 0.5, 0.25)


def build_bed():
    """The supplied track under the body, crossfaded into the resolve.

    The track is NOT stretched. It runs 84.06 s at its own tempo against an
    84.000 s body — a fit close enough that nothing has to be done to it — and
    hands over at HANDOVER so the crossfade is complete before the end screen
    takes the frame.
    """
    src = decode(BED_SRC)
    total = int(FILM_LEN * SR)
    out = np.zeros((total, 2))

    ho = int(HANDOVER * SR)
    xf = int(XFADE * SR)

    take = min(src.shape[0], ho + xf)
    out[:take] = src[:take]

    # fade the track down across the handover
    out[ho:ho + xf] *= np.linspace(1, 0, xf)[:, None]
    if take < ho + xf:
        out[take:ho + xf] = 0.0

    pad = resolve_pad(total - ho)
    out[ho:] += pad

    # a short lift in, so the reel does not start on a full-level downbeat
    fin = int(0.35 * SR)
    out[:fin] *= np.linspace(0, 1, fin)[:, None]
    return tail(out, 0.3)


# ── main ─────────────────────────────────────────────────────────────────────

def main():
    if not os.path.exists(BED_SRC):
        print("missing %s" % BED_SRC, file=sys.stderr)
        return 1
    os.makedirs(SFX, exist_ok=True)

    report = {"cues": {}, "bed": {}}

    print("cues — all synthesised, none taken from the supplied pack")
    # Render the whole kit first, so the one shared gain can be derived from
    # the loudest member of it rather than guessed.
    rendered = {name: fn() for name, fn in CUES.items()}
    loudest = max(np.max(np.abs(x)) for x in rendered.values())
    gain = KIT_PEAK / loudest if loudest > 0 else 1.0
    print("   one kit gain of %.3fx, set by the loudest cue — relative balance"
          % gain)
    print("   is as designed, not flattened by a per-cue normaliser.\n")
    for name, x in rendered.items():
        p = os.path.join(SFX, name + ".wav")
        x = x * gain
        write_wav(p, x)
        dur = x.shape[0] / SR
        pk = float(np.max(np.abs(x)))
        rms = float(np.sqrt(np.mean(x ** 2)))
        report["cues"][name] = {
            "dur": round(dur, 3),
            "peak_dbfs": round(20 * np.log10(max(pk, 1e-9)), 1),
            "rms_dbfs": round(20 * np.log10(max(rms, 1e-9)), 1),
        }
        print("   %-13s %5.2f s   peak %6.1f dBFS   rms %6.1f dBFS"
              % (name, dur, 20 * np.log10(max(pk, 1e-9)),
                 20 * np.log10(max(rms, 1e-9))))

    print("\nbed")
    bed = build_bed()
    p = os.path.join(PUB, "music-reel.mp3")
    write_mp3(p, bed)
    got = normalise(p, BED_LUFS)
    report["bed"] = {"dur": round(bed.shape[0] / SR, 3), "lufs": got,
                     "handover": HANDOVER, "xfade": XFADE}
    report["kit_gain"] = round(float(gain), 5)
    print("   music-reel.mp3  %.3f s   %s LUFS" % (bed.shape[0] / SR,
                                                   f"{got:.1f}" if got else "n/a"))
    print("   track plays 0.000 - %.3f s at its own tempo, then the synthesised"
          % HANDOVER)
    print("   resolve carries the end screen to %.3f s." % FILM_LEN)

    with open(os.path.join(ROOT, "scripts", "audio-report.json"), "w") as fh:
        json.dump(report, fh, indent=1)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
