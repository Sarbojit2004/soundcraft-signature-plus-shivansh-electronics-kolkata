#!/usr/bin/env python3
"""Build the asset library the reel renders from, and emit its manifest.

Nothing here is hand-measured. Sizes, aspect ratios, alpha bounding boxes and
region luminances are read off the files on disk and written into
src/assets.generated.ts, so a shot cannot claim a shape a file does not have.

THREE SOURCE FAMILIES
─────────────────────

  PRODUCT RENDERS  the 33 Soundcraft plates at the repository root, up to
                   4096 px with a transparent background. Their alpha bounding
                   box is measured here because the console occupies only the
                   middle ~80% of its canvas, and a plate positioned by the
                   canvas rather than by its content puts a small desk in a
                   large empty rectangle.

                   The four TOP-DOWN PLANS are kept at full resolution. The
                   reel pushes into single knob rows on them, and a one-third
                   crop of 4096 px is still sharper than the 2160 px frame it
                   lands in.

  OFFICIAL CUTS    the five clean shots cut out of the Soundcraft overview
                   video by cut_official.py. Read from its manifest rather than
                   re-probed, so the two cannot disagree.

  B-ROLL           the four Seedance 2.0 clips, 720x1280, 5.000 s each, played
                   complete. These are OPTIONAL at build time: until they are
                   on disk the manifest marks them missing and shots.ts falls
                   back to a product plate, so the project still renders and
                   still times correctly. Dropping the four files in and
                   re-running this script is the whole integration step.

WHAT IS NOT HERE. The Gemini b-roll and workflow stills from the previous reel
are deliberately ignored — this reel is built from the real product plates, the
official footage and the Seedance clips, and nothing else.
"""
from PIL import Image
import numpy as np
import json
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(ROOT)
PUB = os.path.join(ROOT, "public")
FF = os.path.expanduser("~/bin/ffmpeg")

# Photographs that happen to ship inside the product-render set: real rooms,
# opaque, no alpha to measure.
PHOTO = {"p16-7", "p16-8", "p22-10", "p22-11", "p32-7"}
# Top-down plans, kept native for the detail pushes.
PLAN = {"p12-2", "p16-4", "p22-2", "p32-1"}
# Rear-panel and edge-on views: very wide, laid across the frame rather than
# bled into it.
PANEL = {"p12-5", "p16-5", "p22-5", "p22-7", "p22-8", "p32-5"}

MAX_LONG = 2400  # everything that is not a plan

# The four B-roll blocks, in timeline order. `seg` ties each file to the
# segment in script.ts that is fixed at 5.000 s for it.
BROLLS = [
    ("broll-01-live-foh", "live", "front of house, a club at show time"),
    ("broll-02-community-hall", "hall", "a community hall in the late afternoon"),
    ("broll-03-project-studio", "studio", "a project studio at night"),
    ("broll-04-rehearsal-room", "band", "a rehearsal room, band mid-song"),
]


def alpha_bbox(im):
    """Normalised bounding box of the opaque content, or the whole canvas."""
    if im.mode != "RGBA":
        return (0.0, 0.0, 1.0, 1.0), False
    a = im.getchannel("A")
    if a.getextrema()[0] >= 250:
        return (0.0, 0.0, 1.0, 1.0), False
    bb = a.point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bb:
        return (0.0, 0.0, 1.0, 1.0), False
    W, H = im.size
    return (bb[0] / W, bb[1] / H, bb[2] / W, bb[3] / H), True


def probe(path):
    """(width, height, duration) straight off the file."""
    out = subprocess.run([FF, "-hide_banner", "-i", path],
                         capture_output=True, text=True).stderr
    dim = re.search(r", (\d{3,4})x(\d{3,4})", out)
    dur = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out)
    w, h = (int(dim.group(1)), int(dim.group(2))) if dim else (0, 0)
    secs = (int(dur.group(1)) * 3600 + int(dur.group(2)) * 60
            + float(dur.group(3))) if dur else 0.0
    return w, h, secs


def main():
    os.makedirs(os.path.join(PUB, "img"), exist_ok=True)
    os.makedirs(os.path.join(PUB, "clip"), exist_ok=True)
    assets = []

    # ── product renders ──────────────────────────────────────────────────
    for f in sorted(os.listdir(REPO)):
        m = re.match(r"SOUNDCRAFT Signature Plus (\d+) \((\d+)\)\.webp$", f)
        if not m:
            continue
        slug = "p%s-%s" % (m.group(1), m.group(2))
        im = Image.open(os.path.join(REPO, f))
        bbox, transparent = alpha_bbox(im)
        if slug not in PLAN and max(im.size) > MAX_LONG:
            s = MAX_LONG / max(im.size)
            im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        im.save(os.path.join(PUB, "img", slug + ".webp"), quality=93, method=5)
        kind = ("photo" if slug in PHOTO else "plan" if slug in PLAN
                else "panel" if slug in PANEL else "render")
        # The aspect ratio that matters is the CONTENT's, not the canvas's.
        ar = ((im.width * (bbox[2] - bbox[0]))
              / max(1e-6, im.height * (bbox[3] - bbox[1])))
        assets.append(dict(slug=slug, file="img/%s.webp" % slug, kind=kind,
                           model=int(m.group(1)), w=im.width, h=im.height,
                           ar=round(ar, 4), bbox=[round(v, 4) for v in bbox],
                           transparent=transparent and slug not in PHOTO))

    # ── clips: the official cuts, then the B-roll ────────────────────────
    clips = []
    cuts_path = os.path.join(ROOT, "scripts", "official-cuts.json")
    if os.path.exists(cuts_path):
        for c in json.load(open(cuts_path)):
            p = os.path.join(PUB, c["file"])
            if not os.path.exists(p):
                print("  ! missing official cut %s — run cut_official.py" % c["file"])
                continue
            clips.append(dict(slug=c["slug"], file=c["file"], w=c["w"], h=c["h"],
                              ar=c["ar"], dur=c["dur"], kind="official",
                              what=c["what"]))

    missing = []
    for slug, seg, what in BROLLS:
        p = os.path.join(PUB, "clip", slug + ".mp4")
        if not os.path.exists(p):
            missing.append(slug)
            continue
        w, h, dur = probe(p)
        clips.append(dict(slug=slug, file="clip/%s.mp4" % slug, w=w, h=h,
                          ar=round(w / h, 4) if h else 0.5625, dur=round(dur, 2),
                          kind="broll", seg=seg, what=what))

    # ── how bright each named region of the 32's plan actually is ────────
    #
    # A push into the pale master section and a push into the dark channel
    # strip are the same component with wildly different results: at one fixed
    # brightness the first fills the frame with near-white that 64%-opacity
    # white type cannot hold against, and the second goes muddy. So each
    # region's mean luminance is measured here and the film normalises every
    # detail push to a common tone rather than guessing one multiplier for all.
    lum = {}
    src_ts = open(os.path.join(ROOT, "src", "assets.ts")).read()
    rects = dict(re.findall(r"(\w+):\s*r\(([^)]*)\)", src_ts))
    planes = {a["slug"]: a for a in assets if a["kind"] == "plan"}
    a = planes.get("p32-1")
    if a:
        im = Image.open(os.path.join(PUB, a["file"])).convert("RGBA")
        bg = Image.new("RGBA", im.size, (9, 10, 12, 255))
        flat = Image.alpha_composite(bg, im).convert("L")
        W, H = flat.size
        for name, nums in rects.items():
            try:
                x0, y0, x1, y1 = [float(v) for v in nums.split(",")]
            except ValueError:
                continue
            box = (int(x0 * W), int(y0 * H), max(int(x0 * W) + 1, int(x1 * W)),
                   max(int(y0 * H) + 1, int(y1 * H)))
            lum[name] = round(
                np.asarray(flat.crop(box), dtype=np.float64).mean() / 255.0, 4)

    ts = os.path.join(ROOT, "src", "assets.generated.ts")
    with open(ts, "w") as fh:
        fh.write("// GENERATED by scripts/prep_assets.py — do not edit by hand.\n")
        fh.write("// Every size here was measured off the file on disk.\n\n")
        fh.write('import type { Asset, Clip } from "./assets.ts";\n\n')
        fh.write("export const ASSETS: Asset[] = %s;\n\n" % json.dumps(assets, indent=1))
        fh.write("export const CLIPS: Clip[] = %s;\n\n" % json.dumps(clips, indent=1))
        fh.write("/** B-roll slugs not yet on disk. shots.ts falls back for these. */\n")
        fh.write("export const MISSING_BROLL: string[] = %s;\n\n" % json.dumps(missing))
        fh.write("/** Mean luminance of each named region, 0..1, measured on the plan. */\n")
        fh.write("export const REGION_LUM: Record<string, number> = %s;\n" % json.dumps(lum, indent=1))

    print("%d images, %d clips -> %s" % (len(assets), len(clips), ts))
    for k in ("render", "plan", "panel", "photo"):
        print("   %-7s %d" % (k, sum(1 for a in assets if a["kind"] == k)))
    print("   %-7s %d" % ("official", sum(1 for c in clips if c["kind"] == "official")))
    print("   %-7s %d" % ("broll", sum(1 for c in clips if c["kind"] == "broll")))
    if missing:
        print("\n   B-ROLL NOT YET ON DISK (%d of 4):" % len(missing))
        for s in missing:
            print("     public/clip/%s.mp4" % s)
        print("   The reel renders and times correctly without them — shots.ts")
        print("   falls back to a product plate for each. Drop the files in and")
        print("   re-run this script to pick them up.")


if __name__ == "__main__":
    main()
