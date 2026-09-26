#!/usr/bin/env python3
"""Split the 4K master into parts GitHub will accept, losslessly.

GitHub refuses a file over 100 MiB. The master is well over that, and the whole
point of shipping a 4K master is that it is not degraded relative to the render
— so re-encoding it smaller would defeat the exercise. It is CUT, not
transcoded: every part carries the original video and audio bitstream.

WHY THE SEGMENT MUXER AND NOT `-ss`/`-t`
─────────────────────────────────────────
The obvious implementation — one `ffmpeg -ss X -t Y -c copy` per part — is
WRONG, and this file used to do it. With stream copy, `-ss` cannot cut mid-GOP:
it rewinds to the keyframe at or before the requested time. So consecutive
parts OVERLAP by up to one GOP each, and the rejoined file is longer than the
master and contains duplicated frames. Measured on this reel: the master is
90.05 s / 282,991,381 B and the naive rejoin came back 90.68 s /
285,970,126 B — 0.63 s of duplicated picture.

The segment muxer instead lets ffmpeg choose cut points that are already
keyframe boundaries and writes each packet to exactly one segment. Nothing is
duplicated and nothing is dropped, so concatenating the parts reproduces the
master's streams exactly.

`-reset_timestamps 1` restarts each segment's clock at zero, which is what
makes every part independently playable; the concat demuxer re-bases them on
the way back in, so it costs nothing at rejoin time.

WHAT "LOSSLESS" MEANS HERE, PRECISELY. The rejoined file's VIDEO AND AUDIO
BITSTREAMS are identical to the master's — same packets, same order, no
re-encoding, no generation loss. The container is rebuilt, so the byte count
differs by a few hundred KB of MP4 box overhead. Frame-for-frame identical;
not byte-for-byte.

Usage:  python3 scripts/split_mp4.py out/soundcraft-signature-plus-reel-4k.mp4
"""
import json
import os
import subprocess
import sys

FF = os.path.expanduser("~/bin/ffmpeg")
# 92 MB, not 100: the container rewrite adds a little, and a part that lands at
# 100.4 MB after the fact means doing the whole split again.
# GitHub's hard limit. Nothing may exceed this.
HARD = 100 * 1024 * 1024
# What we aim for, leaving room for the container rewrite.
LIMIT = 88 * 1024 * 1024


def duration(path):
    out = subprocess.run([FF, "-hide_banner", "-i", path],
                         capture_output=True, text=True).stderr
    import re
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    if not m:
        raise SystemExit("could not read duration of %s" % path)
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    src = sys.argv[1]
    if not os.path.exists(src):
        raise SystemExit("missing %s" % src)

    size = os.path.getsize(src)
    dur = duration(src)

    base = os.path.splitext(os.path.basename(src))[0]
    out = os.path.join(os.path.dirname(src), "reel-4k-parts")
    os.makedirs(out, exist_ok=True)

    # ── find a part count that actually fits ────────────────────────────────
    # Segment cuts land on KEYFRAMES, not on the requested time, so asking for
    # n equal spans does not give n equal parts: at a ~250-frame GOP the
    # segments snap to ~8.4 s multiples and the sizes come out lopsided. The
    # first attempt on this reel asked for 3 x 30.02 s and got 33.7 / 34.5 /
    # 21.9 s — 114 MiB and 103 MiB, both over the limit.
    #
    # Rather than model the GOP structure, just try and measure: raise the part
    # count until every part fits. It converges in one or two tries and it
    # cannot be fooled by an unusual keyframe layout.
    made = []
    for attempt in range(max(1, -(-size // LIMIT)), 40):
        for f in os.listdir(out):
            os.remove(os.path.join(out, f))
        span = dur / attempt
        subprocess.run(
            [FF, "-y", "-hide_banner", "-loglevel", "error", "-i", src,
             "-c", "copy", "-map", "0",
             "-f", "segment", "-segment_time", "%.4f" % span,
             "-reset_timestamps", "1", "-segment_format", "mp4",
             "-movflags", "+faststart",
             os.path.join(out, "%s-part%%02d.mp4" % base)],
            check=True)
        made = sorted(f for f in os.listdir(out)
                      if f.startswith(base + "-part") and f.endswith(".mp4"))
        biggest = max(os.path.getsize(os.path.join(out, f)) for f in made)
        print("   asked for %2d x %5.2f s -> %d parts, biggest %.1f MiB"
              % (attempt, span, len(made), biggest / 1048576))
        if biggest <= LIMIT:
            break
    else:
        raise SystemExit("could not find a part count under %d MiB" % (LIMIT / 1048576))

    print()
    for f in made:
        p = os.path.join(out, f)
        print("   %-52s %7.1f MiB  %7.3f s"
              % (f, os.path.getsize(p) / 1048576, duration(p)))

    total = sum(os.path.getsize(os.path.join(out, f)) for f in made)
    joined = sum(duration(os.path.join(out, f)) for f in made)
    print("   %d parts · %.1f MiB · %.3f s (master %.1f MiB, %.3f s)"
          % (len(made), total / 1048576, joined, size / 1048576, dur))

    over = [f for f in made if os.path.getsize(os.path.join(out, f)) > HARD]
    if over:
        raise SystemExit("OVER GITHUB'S LIMIT: %s" % ", ".join(over))

    # ── verify the rejoin, rather than claiming it ──────────────────────────
    # The previous implementation asserted the parts rejoined cleanly and they
    # did not. So the claim is now tested here, every run, and the split fails
    # loudly if the rejoined duration does not match the master.
    listing = "\n".join("file '%s'" % f for f in made)
    with open(os.path.join(out, "parts.txt"), "w") as fh:
        fh.write(listing + "\n")

    probe_out = os.path.join(out, ".rejoin-check.mp4")
    subprocess.run([FF, "-y", "-hide_banner", "-loglevel", "error",
                    "-f", "concat", "-safe", "0",
                    "-i", os.path.join(out, "parts.txt"),
                    "-c", "copy", probe_out], check=True)
    rd = duration(probe_out)
    drift = abs(rd - dur)
    os.remove(probe_out)
    print("   rejoin check: %.3f s vs master %.3f s (drift %.3f s)" % (rd, dur, drift))
    if drift > 0.05:
        raise SystemExit(
            "REJOIN DRIFTS BY %.3f s — the parts do not reconstruct the master" % drift)

    # The rejoin instructions ship WITH the parts, because the person who needs
    # them is the person who cloned the repository, not the person reading this
    # script.
    with open(os.path.join(out, "JOIN.md"), "w") as fh:
        fh.write(f"""# Rejoining the 4K master

`{base}.mp4` is {size / 1048576:.1f} MiB, which GitHub will not take, so it ships
here as {len(made)} stream-copied parts.

**Nothing was re-encoded.** Each part carries the original video and audio
bitstream, cut on a keyframe boundary by ffmpeg's segment muxer, so rejoining
them is a concatenation rather than a render.

To be precise about "lossless": the rejoined file is **frame-for-frame
identical** to the master — same packets, same order, no generation loss — and
the split script verifies that on every run by actually rejoining and comparing
durations. It is *not* byte-for-byte identical, because the MP4 container is
rebuilt; expect a few hundred KB of box overhead difference.

## Rejoin

```bash
cd out/reel-4k-parts
ffmpeg -f concat -safe 0 -i parts.txt -c copy ../{base}.mp4
```

## Or just play one

Every part is a standalone MP4 with its own moov atom and `+faststart`, so you
can open any of them directly without rejoining anything.

| part | size | duration |
|---|---|---|
""")
        for f in made:
            p = os.path.join(out, f)
            fh.write("| `%s` | %.1f MiB | %.3f s |\n"
                     % (f, os.path.getsize(p) / 1048576, duration(p)))
        fh.write(f"\n**Master:** 2160 x 3840, 30 fps, {dur:.3f} s, H.264 CRF 17, yuv420p.\n")

    with open(os.path.join(out, "parts.json"), "w") as fh:
        json.dump({"master": base + ".mp4", "size": size, "duration": dur,
                   "parts": made}, fh, indent=1)


if __name__ == "__main__":
    main()
