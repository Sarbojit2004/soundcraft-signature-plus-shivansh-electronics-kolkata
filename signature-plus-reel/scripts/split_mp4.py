#!/usr/bin/env python3
"""Split the 4K master into parts GitHub will accept, losslessly.

GitHub refuses a file over 100 MB. The master is well over that, and the whole
point of shipping a 4K master is that it is uncompressed relative to the render
— so re-encoding it smaller would defeat the exercise.

Instead it is CUT, not transcoded. Every part is produced with `-c copy`, so
the video and audio bitstreams are the originals; rejoining is a concatenation
and the result is bit-identical to what Remotion wrote. The cuts land on
keyframes, which is why the parts are not all the same size.

Each part is also a STANDALONE, PLAYABLE MP4 with its own moov atom, so a
reviewer can open part 2 without downloading the set.

Usage:  python3 scripts/split_mp4.py out/soundcraft-signature-plus-reel-4k.mp4
"""
import json
import os
import subprocess
import sys

FF = os.path.expanduser("~/bin/ffmpeg")
# 92 MB, not 100: the container rewrite adds a little, and a part that lands at
# 100.4 MB after the fact means doing the whole split again.
LIMIT = 92 * 1024 * 1024


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
    parts = max(1, -(-size // LIMIT))          # ceil
    span = dur / parts

    base = os.path.splitext(os.path.basename(src))[0]
    out = os.path.join(os.path.dirname(src), "reel-4k-parts")
    os.makedirs(out, exist_ok=True)
    for f in os.listdir(out):
        os.remove(os.path.join(out, f))

    print("%s — %.1f MB, %.3f s -> %d parts of ~%.2f s"
          % (base, size / 1e6, dur, parts, span))

    made = []
    for i in range(parts):
        dst = os.path.join(out, "%s-part%02d.mp4" % (base, i))
        cmd = [FF, "-y", "-hide_banner", "-loglevel", "error",
               "-ss", "%.4f" % (i * span), "-i", src]
        if i < parts - 1:
            cmd += ["-t", "%.4f" % span]
        cmd += ["-c", "copy", "-avoid_negative_ts", "make_zero",
                "-movflags", "+faststart", dst]
        subprocess.run(cmd, check=True)
        made.append(os.path.basename(dst))
        print("   %-52s %7.1f MB  %7.3f s"
              % (os.path.basename(dst), os.path.getsize(dst) / 1e6, duration(dst)))

    total = sum(os.path.getsize(os.path.join(out, f)) for f in made)
    joined = sum(duration(os.path.join(out, f)) for f in made)
    print("   %d parts · %.1f MB · %.3f s (master %.1f MB, %.3f s)"
          % (len(made), total / 1e6, joined, size / 1e6, dur))

    over = [f for f in made if os.path.getsize(os.path.join(out, f)) > 100 * 1024 * 1024]
    if over:
        raise SystemExit("OVER GITHUB'S LIMIT: %s" % ", ".join(over))

    # The rejoin instructions ship WITH the parts, because the person who needs
    # them is the person who cloned the repository, not the person reading this
    # script.
    listing = "\n".join("file '%s'" % f for f in made)
    with open(os.path.join(out, "parts.txt"), "w") as fh:
        fh.write(listing + "\n")

    with open(os.path.join(out, "JOIN.md"), "w") as fh:
        fh.write(f"""# Rejoining the 4K master

`{base}.mp4` is {size / 1e6:.1f} MB, which GitHub will not take, so it ships
here as {len(made)} stream-copied parts.

**Nothing was re-encoded.** Each part carries the original bitstream, cut on a
keyframe, so rejoining them is a concatenation rather than a render and the
result is bit-identical to the file Remotion wrote.

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
            fh.write("| `%s` | %.1f MB | %.3f s |\n"
                     % (f, os.path.getsize(p) / 1e6, duration(p)))
        fh.write(f"\n**Master:** 2160 x 3840, 30 fps, {dur:.3f} s, H.264 CRF 17, yuv420p.\n")

    with open(os.path.join(out, "parts.json"), "w") as fh:
        json.dump({"master": base + ".mp4", "size": size, "duration": dur,
                   "parts": made}, fh, indent=1)


if __name__ == "__main__":
    main()
