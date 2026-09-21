#!/usr/bin/env python3
"""Cut the usable shots out of the official Soundcraft overview video.

WHY THIS IS NOT JUST AN ffmpeg -ss AWAY
────────────────────────────────────────
The source (`SOUNDCRAFT SIGNATURE PLUS OVERVIEW VIDEO.mp4`, 1280x720, 64.8 s,
29.97 fps) is a finished marketing film, so most of its running time already
carries Soundcraft's own burned-in title cards — "The Next Generation of
Analog Professional Mixing Consoles", "Your Creative Audio Character",
"Performance. Control. Room to Grow.", the feature callouts, and the closing
Signature Plus lockup.

This reel has its own caption system and its own typographic language, and the
brief puts every brand mark on the six-second end screen and nowhere else. A
shot carrying somebody else's title card breaks both. So rather than take the
prettiest frames and hope, every window below was found by scanning the film at
2 fps and reading the frames: each one is a stretch where the overlay text is
fully absent, not merely faint.

That leaves about five seconds of genuinely clean footage. Real hands on a real
desk are worth having, but a 0.36 s window is a flash rather than a shot — so
each one is
RETIMED, with motion-compensated frame interpolation synthesising the new
intermediate frames rather than duplicating the old ones. The rate is set per
window (0.42 to 0.62) rather than globally, because the windows are not the
same length: the shortest is slowed hardest so it lands as a shot, and the long
ones stay nearer real time, where the interpolator has least to invent.

Five seconds of source becomes 8.9 s of usable picture. It reads as a deliberate
slow-motion treatment rather than as a shortage.

RESOLUTION. The source is 720p and the reel masters at 2160x3840, so these
clips are never full-bleed: `shots.ts` stages them with the `clip` kind, which
lays a 16:9 plate across the frame over a darkened wash of itself. The plate is
2160 px wide, so the upscale is 1.69x rather than the 5.3x a 9:16 crop blown up
to full frame would need. That is the difference between soft and mush.
"""
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(ROOT)
SRC = os.path.join(REPO, "SOUNDCRAFT SIGNATURE PLUS OVERVIEW VIDEO.mp4")
OUT = os.path.join(ROOT, "public", "clip")
FF = os.path.expanduser("~/bin/ffmpeg")

FPS = 30

# ── the clean windows ────────────────────────────────────────────────────────
# (slug, start, duration, speed, crop, what) — start and duration in SOURCE
# seconds. Every boundary below was read off a 5 fps contact sheet of the film,
# not estimated: the comment names the frame the window opens after and the
# frame it closes before, so the next person can re-check it in one command
# rather than trust it.
#
# `speed` is per window rather than global because the clean windows are not
# the same length. The short ones are slowed further so they land as shots
# rather than as flashes; the long ones stay nearer real time, where the
# interpolator has least to invent.
#
# `crop` is (x0, x1) as a fraction of source width, or None. It exists for one
# shot: the outdoor band is the best real-world footage in the film, but
# Soundcraft's own "Performance. Control. Room to Grow." card sits over its
# right-hand third from 45.6 onward. Keeping the left 55% keeps the band and
# loses the card, which buys 1.38 s of usable picture instead of the 0.26 s the
# uncropped window would allow.
#
# DELIBERATELY NOT HERE: the low-angle fader-bank shot at ~2.7. The opening
# logo card cross-fades out rather than cutting, and by the time it has fully
# cleared there are 0.24 s left before the next title fades up. There are
# thirty-three 4096 px product renders in this repository that cover the same
# idea natively at 4K, so a quarter-second of upscaled 720p buys nothing.
WINDOWS = [
    # Engineer at the desk, guitarist playing behind him. Opens after "The Next
    # Generation of..." clears at 7.10 — the cut at 6.9 still carries the tail
    # of that card — and closes before "Your Creative Audio Character" fades up
    # at 7.8.
    ("of-02-desk-tracking",  7.12, 0.62, 0.50, None, "engineer at the desk, guitarist behind"),
    # The 32 rotating from three-quarter into a full top-down plan. Clean
    # throughout; closes before the "THE SIGNATURE PLUS SERIES" eyebrow at 13.45.
    ("of-03-plan-reveal",   12.35, 1.05, 0.55, None, "the 32 rotating into its top-down plan"),
    # Outdoor band mid-song, cropped left of the title card. Opens on the cut
    # from the "Intuitive layout" card at 45.3, closes before the cut to the
    # guitarist close-up at ~46.8.
    # 0.55 rather than 0.58: at 0.58 the capital P of "Performance." clips the
    # right edge in the last third of the window.
    ("of-04-outdoor-band",  45.35, 1.38, 0.60, (0.0, 0.55), "outdoor band, bass and guitar"),
    # Hands working the channel strips at a desk by a window. Opens after the
    # singer's card clears at 49.9, closes before the cut to the studio seat
    # at 51.7.
    ("of-05-console-hands", 49.95, 1.68, 0.62, None, "hands working the channel strips"),
    # Studio seat, headphones, laptop. Opens on the cut at 51.75, closes before
    # "Professional Analog Mixing." fades up at 52.15.
    ("of-06-studio-seat",   51.78, 0.36, 0.42, None, "studio seat, headphones and laptop"),
]


def main() -> int:
    if not os.path.exists(SRC):
        print(f"missing source: {SRC}", file=sys.stderr)
        return 1
    os.makedirs(OUT, exist_ok=True)

    made = []
    for slug, start, dur, speed, crop, what in WINDOWS:
        dst = os.path.join(OUT, slug + ".mp4")
        # Crop FIRST, so the interpolator never sees the title card it would
        # otherwise smear across the synthesised frames.
        pre = ""
        if crop:
            x0, x1 = crop
            pre = f"crop=iw*{x1 - x0:.4f}:ih:iw*{x0:.4f}:0,"
        # fps next so the retime works on a constant rate rather than 29.97,
        # then setpts to stretch, then minterpolate to SYNTHESISE the frames
        # the stretch opened up. Without the last step this is a stutter, not a
        # slow motion.
        vf = (
            f"{pre}fps={FPS},"
            f"setpts={1 / speed:.6f}*PTS,"
            f"minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"
        )
        cmd = [
            FF, "-y", "-hide_banner", "-loglevel", "error",
            "-ss", f"{start:.3f}", "-t", f"{dur:.3f}", "-i", SRC,
            "-vf", vf, "-an",
            # CRF 16: this is an intermediate the 4K render reads from, so it is
            # kept well above the quality the master needs.
            "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p",
            dst,
        ]
        subprocess.run(cmd, check=True)

        probe = subprocess.run(
            [FF, "-hide_banner", "-i", dst], capture_output=True, text=True
        ).stderr
        import re
        d = re.search(r"Duration: (\d+):(\d+):([\d.]+)", probe)
        secs = (int(d.group(1)) * 3600 + int(d.group(2)) * 60 + float(d.group(3))) if d else dur / speed
        dim = re.search(r", (\d{3,4})x(\d{3,4})", probe)
        w, h = (int(dim.group(1)), int(dim.group(2))) if dim else (1280, 720)
        made.append(dict(slug=slug, file=f"clip/{slug}.mp4", w=w, h=h,
                         ar=round(w / h, 4), dur=round(secs, 2),
                         src_start=start, src_dur=dur, speed=speed,
                         crop=list(crop) if crop else None, what=what))
        print(f"{slug:20} {start:6.2f}s +{dur:4.2f}s -> {secs:5.2f}s  {w}x{h}  {what}")

    with open(os.path.join(ROOT, "scripts", "official-cuts.json"), "w") as fh:
        json.dump(made, fh, indent=1)
    total_src = sum(w[2] for w in WINDOWS)
    print(f"\n{len(made)} clips · {total_src:.2f}s of clean source -> "
          f"{sum(m['dur'] for m in made):.2f}s of picture")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
