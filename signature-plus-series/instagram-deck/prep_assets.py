#!/usr/bin/env python3
"""Copies the real Signature Plus product images, lifestyle photos, clean stills
from Soundcraft's overview video, and the two logos into instagram-deck/assets,
sized for a 1080x1080 layout rendered at 2x."""
import os, subprocess
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "..", "sp-film", "public", "img")
LOGO = os.path.join(HERE, "..", "sp-film", "public", "logos")
VIDEO = os.path.join(HERE, "..", "..", "SOUNDCRAFT SIGNATURE PLUS OVERVIEW VIDEO.mp4")
OUT = os.path.join(HERE, "assets")
os.makedirs(OUT, exist_ok=True)


def cutout(src, dst, width=1800):
    im = Image.open(os.path.join(IMG, src)).convert("RGBA")
    a = np.array(im)[..., 3]
    ys, xs = np.where(a > 8)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, dst), "WEBP", quality=92, method=6)


def photo(src, dst, width=2000, crop=None):
    im = Image.open(src if os.path.isabs(src) else os.path.join(IMG, src)).convert("RGB")
    if crop:
        im = im.crop(crop)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, dst), "JPEG", quality=93, optimize=True)


def still(t, dst, crop=None):
    tmp = os.path.join(OUT, "_still.png")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", VIDEO, "-frames:v", "1", tmp], check=True)
    photo(tmp, dst, crop=crop)
    os.remove(tmp)


for src, dst in [("render-signature-plus-12-3-webp.png", "r12.webp"), ("render-signature-plus-16-2-webp.png", "r16.webp"),
                 ("render-signature-plus-22-4-webp.png", "r22.webp"), ("render-signature-plus-32-3-webp.png", "r32.webp"),
                 ("render-signature-plus-32-6-webp.png", "r32b.webp"), ("render-signature-plus-12-1-webp.png", "r12low.webp"),
                 ("render-signature-plus-22-9-webp.png", "r22b.webp"), ("render-signature-plus-16-3-webp.png", "r16b.webp")]:
    cutout(src, dst)
for src, dst in [("plan-signature-plus-32-1-webp.png", "plan32.webp"), ("plan-signature-plus-12-2-webp.png", "plan12.webp"),
                 ("plan-signature-plus-16-4-webp.png", "plan16.webp"), ("plan-signature-plus-22-2-webp.png", "plan22.webp")]:
    cutout(src, dst, width=4096)
for src, dst in [("life-signature-plus-32-7-webp.jpg", "life-club.jpg"), ("life-signature-plus-22-11-webp.jpg", "life-studio.jpg"),
                 ("life-signature-plus-22-10-webp.jpg", "life-podcast.jpg"), ("life-signature-plus-16-8-webp.jpg", "life-duo.jpg"),
                 ("life-signature-plus-16-7-webp.jpg", "life-panel.jpg")]:
    photo(src, dst)
still(45.35, "still-outdoor.jpg")
still(51.2, "still-engineer.jpg")
still(54.0, "still-patched.jpg", crop=(0, 0, 1280, 470))
still(10.3, "still-singer.jpg", crop=(0, 0, 1280, 520))
for n in ("shivansh", "soundcraft"):
    im = Image.open(os.path.join(LOGO, n + ".png")).convert("RGBA")
    im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS).save(os.path.join(OUT, f"logo-{n}.png"), optimize=True)
print(sorted(os.listdir(OUT)))


# Detail crops from the real Signature Plus 32 top view (fractions of the cropped image).
def detail(src, dst, box, rotate=0, width=2000):
    im = Image.open(os.path.join(OUT, src)).convert("RGB")
    W, H = im.size
    im = im.crop((round(box[0] * W), round(box[1] * H), round(box[2] * W), round(box[3] * H)))
    if rotate:
        im = im.rotate(rotate, expand=True)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(os.path.join(OUT, dst), "JPEG", quality=94, optimize=True)


for dst, box, rot in [("d32-strip.jpg", (0.013, 0.108, 0.133, 0.975), 90),
                      ("d32-meter.jpg", (0.951, 0.405, 0.99, 0.535), 0),
                      ("d32-lexicon.jpg", (0.855, 0.405, 0.953, 0.535), 0),
                      ("d32-comp.jpg", (0.013, 0.318, 0.255, 0.372), 0),
                      ("d32-io.jpg", (0.73, 0.10, 0.86, 0.37), 0),
                      ("d32-talkback.jpg", (0.948, 0.30, 1.0, 0.425), 0),
                      ("d32-aux.jpg", (0.013, 0.52, 0.19, 0.675), 0),
                      ("d32-auxmaster.jpg", (0.855, 0.52, 0.99, 0.675), 0),
                      ("d32-eq.jpg", (0.013, 0.375, 0.19, 0.52), 0),
                      ("d32-hiz.jpg", (0.605, 0.12, 0.735, 0.26), 0)]:
    detail("plan32.webp", dst, box, rot)
print("details done")
