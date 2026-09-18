#!/usr/bin/env python3
"""Build the asset library both films render from, and emit its manifest.

Three source families land in public/ and one TypeScript file describes them,
so a shot can never reference an image that is not there or claim a size the
file does not have:

  * PRODUCT RENDERS — 4096 px studio renders with a transparent background.
    Their alpha bounding box is measured here, because the console occupies
    only the middle ~80% of its canvas and a plate positioned by the canvas
    rather than by the content puts a small desk in a large empty rectangle.
    The four top-down plans are kept at full resolution: the landscape film
    pushes into single knob rows on them, and a 1/3 crop of 4096 px is still
    sharper than the frame it lands in.

  * WORKFLOW STILLS — opaque photographs of the desk in real rooms, already
    de-watermarked.

  * B-ROLL — 8 s clips at 2560x1440, already de-watermarked and retimed so
    every source frame lands on exactly one 30 fps output frame.
"""
from PIL import Image
import numpy as np
import json, os, shutil, subprocess, sys, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = os.path.dirname(ROOT)
PUB  = os.path.join(ROOT, 'public')
FF   = os.path.expanduser('~/bin/ffmpeg')

# Photographs that happen to be delivered in the product-render set.
PHOTO = {'p16-7', 'p16-8', 'p22-10', 'p22-11', 'p32-7'}
# Top-down plans, kept at native resolution for the detail pushes.
PLAN  = {'p12-2', 'p16-4', 'p22-2', 'p32-1'}
# Rear-panel and edge-on views: very wide, and laid across the frame.
PANEL = {'p12-5', 'p16-5', 'p22-5', 'p22-7', 'p22-8', 'p32-5'}

MAX_LONG = 2200        # for everything that is not a plan


def alpha_bbox(im):
    """Normalised bounding box of the opaque content, or the whole canvas."""
    if im.mode != 'RGBA':
        return (0.0, 0.0, 1.0, 1.0), False
    a = im.getchannel('A')
    if a.getextrema()[0] >= 250:
        return (0.0, 0.0, 1.0, 1.0), False
    bb = a.point(lambda v: 255 if v > 8 else 0).getbbox()
    if not bb:
        return (0.0, 0.0, 1.0, 1.0), False
    W, H = im.size
    return (bb[0] / W, bb[1] / H, bb[2] / W, bb[3] / H), True


def main():
    os.makedirs(os.path.join(PUB, 'img'), exist_ok=True)
    os.makedirs(os.path.join(PUB, 'clip'), exist_ok=True)
    assets = []

    # ── product renders ──────────────────────────────────────────────────
    for f in sorted(os.listdir(REPO)):
        m = re.match(r'SOUNDCRAFT Signature Plus (\d+) \((\d+)\)\.webp$', f)
        if not m:
            continue
        slug = 'p%s-%s' % (m.group(1), m.group(2))
        im = Image.open(os.path.join(REPO, f))
        bbox, transparent = alpha_bbox(im)
        if slug not in PLAN and max(im.size) > MAX_LONG:
            s = MAX_LONG / max(im.size)
            im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
        out = os.path.join(PUB, 'img', slug + '.webp')
        im.save(out, quality=92, method=5)
        kind = ('photo' if slug in PHOTO else 'plan' if slug in PLAN
                else 'panel' if slug in PANEL else 'render')
        # The aspect ratio that matters is the CONTENT's, not the canvas's.
        ar = (im.width * (bbox[2] - bbox[0])) / max(1e-6, im.height * (bbox[3] - bbox[1]))
        assets.append(dict(slug=slug, file='img/%s.webp' % slug, kind=kind,
                           model=int(m.group(1)), w=im.width, h=im.height,
                           ar=round(ar, 4), bbox=[round(v, 4) for v in bbox],
                           transparent=transparent and slug not in PHOTO))

    # ── workflow stills ──────────────────────────────────────────────────
    src = os.path.join(REPO, 'gemini-creations', 'clean')
    for f in sorted(os.listdir(src)):
        if not f.startswith('wf-') or not f.endswith('.jpg'):
            continue
        slug = f[:-4]
        im = Image.open(os.path.join(src, f))
        shutil.copyfile(os.path.join(src, f), os.path.join(PUB, 'img', f))
        assets.append(dict(slug=slug, file='img/%s' % f, kind='photo', model=0,
                           w=im.width, h=im.height, ar=round(im.width / im.height, 4),
                           bbox=[0.0, 0.0, 1.0, 1.0], transparent=False))

    # ── b-roll ───────────────────────────────────────────────────────────
    clips = []
    for f in sorted(os.listdir(src)):
        if not f.startswith('broll-') or not f.endswith('.mp4'):
            continue
        shutil.copyfile(os.path.join(src, f), os.path.join(PUB, 'clip', f))
        probe = subprocess.run([FF, '-hide_banner', '-i', os.path.join(src, f)],
                               capture_output=True, text=True).stderr
        dim = re.search(r', (\d{3,4})x(\d{3,4})', probe)
        dur = re.search(r'Duration: (\d+):(\d+):([\d.]+)', probe)
        w, h = (int(dim.group(1)), int(dim.group(2))) if dim else (2560, 1440)
        secs = (int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3))) if dur else 8.0
        clips.append(dict(slug=f[:-4], file='clip/%s' % f, w=w, h=h,
                          ar=round(w / h, 4), dur=round(secs, 2)))

    # ── how bright each named region actually is ────────────────────────
    #
    # A push into the pale master section and a push into the dark channel
    # strip are the same component with wildly different results: at one fixed
    # brightness the first fills the frame with near-white that 64%-opacity
    # white type cannot hold against, and the second goes muddy. So each
    # region's mean luminance is measured here and the film normalises every
    # detail push to the same tone, rather than guessing one multiplier for all
    # of them.
    lum = {}
    src_ts = open(os.path.join(ROOT, 'src', 'assets.ts')).read()
    rects = dict(re.findall(r'(\w+):\s*r\(([^)]*)\)', src_ts))
    planes = {a['slug']: a for a in assets if a['kind'] == 'plan'}
    for plan_slug in ('p32-1',):
        a = planes.get(plan_slug)
        if not a: continue
        im = Image.open(os.path.join(PUB, a['file'])).convert('RGBA')
        bg = Image.new('RGBA', im.size, (10, 11, 14, 255))
        flat = Image.alpha_composite(bg, im).convert('L')
        W, H = flat.size
        for name, nums in rects.items():
            try:
                x0, y0, x1, y1 = [float(v) for v in nums.split(',')]
            except ValueError:
                continue
            box = (int(x0 * W), int(y0 * H), max(int(x0 * W) + 1, int(x1 * W)),
                   max(int(y0 * H) + 1, int(y1 * H)))
            lum[name] = round(np.asarray(flat.crop(box), dtype=np.float64).mean() / 255.0, 4)

    ts = os.path.join(ROOT, 'src', 'assets.generated.ts')
    with open(ts, 'w') as fh:
        fh.write('// GENERATED by scripts/prep_assets.py — do not edit by hand.\n')
        fh.write('// Every size here was measured off the file on disk.\n\n')
        fh.write('import type { Asset, Clip } from "./assets.ts";\n\n')
        fh.write('export const ASSETS: Asset[] = %s;\n\n' % json.dumps(assets, indent=1))
        fh.write('export const CLIPS: Clip[] = %s;\n\n' % json.dumps(clips, indent=1))
        fh.write('/** Mean luminance of each named region, 0..1, measured on the plan. */\n')
        fh.write('export const REGION_LUM: Record<string, number> = %s;\n' % json.dumps(lum, indent=1))

    print('%d images, %d clips -> %s' % (len(assets), len(clips), ts))
    for k in ('render', 'plan', 'panel', 'photo'):
        print('   %-7s %d' % (k, sum(1 for a in assets if a['kind'] == k)))


if __name__ == '__main__':
    main()
