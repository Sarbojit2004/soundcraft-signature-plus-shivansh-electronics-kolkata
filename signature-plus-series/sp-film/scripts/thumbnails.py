#!/usr/bin/env python3
"""Portrait (1080x1920) and landscape (1920x1080) thumbnails.

Background: a Higgsfield (nano_banana) front-of-house view — festival stage,
crowd, and an empty mixing-desk surface in the foreground. On that surface
the four REAL Signature Plus renders are composited with silhouette contact
shadows; the typography is set locally. No Shivansh or Soundcraft logo is
overlaid. Built at the background's native size, then resized to HD.
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PUB = os.path.join(ROOT, "public")
TH = os.path.join(os.path.dirname(ROOT), "thumbnails")
FONT_D = os.path.join(PUB, "fonts", "display.ttf")
FONT_S = os.path.join(PUB, "fonts", "script.ttf")
CREAM, GOLD = (251, 248, 242), (255, 169, 92)
CHIP = {"12": (184, 50, 43), "16": (183, 134, 28), "22": (16, 133, 124), "32": (46, 95, 201)}


def img(slug):
    im = Image.open(os.path.join(PUB, "img", slug + ".png")).convert("RGBA")
    a = np.array(im)[..., 3]
    ys, xs = np.where(a > 200)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def place(c, im, cx, bottom, width):
    p = im.resize((int(width), int(im.height * width / im.width)), Image.LANCZOS)
    p = ImageEnhance.Brightness(p).enhance(0.97)
    x, y = int(cx - p.width / 2), int(bottom - p.height)
    a = np.array(p)[..., 3]
    for off, blur, op in ((0.012, 0.01, 0.8), (0.04, 0.05, 0.55)):
        m = Image.new("L", c.size, 0)
        m.paste(Image.fromarray(a), (x, y + int(p.height * off)))
        m = m.filter(ImageFilter.GaussianBlur(max(3, p.width * blur)))
        sh = Image.new("RGBA", c.size, (0, 0, 0, 0))
        sh.putalpha(m.point(lambda v: int(v * op)))
        c.alpha_composite(sh)
    # warm stage-light rim from behind
    glow = Image.new("RGBA", c.size, (0, 0, 0, 0))
    g = Image.new("L", c.size, 0); g.paste(Image.fromarray(a), (x, y - int(p.height * 0.01)))
    glow.paste((255, 190, 120, 255), mask=g.filter(ImageFilter.GaussianBlur(p.width * 0.012)).point(lambda v: int(v * 0.35)))
    c.alpha_composite(glow)
    c.alpha_composite(p, (x, y))


def shade(c, top_frac, top_alpha, bot_frac, bot_alpha):
    W, H = c.size
    y = np.linspace(0, 1, H)[:, None]
    a = np.clip((top_frac - y) / top_frac, 0, 1) ** 1.3 * top_alpha + np.clip((y - bot_frac) / (1 - bot_frac), 0, 1) ** 1.2 * bot_alpha
    m = Image.fromarray((np.repeat(a, W, 1) * 255).astype(np.uint8))
    black = Image.new("RGBA", c.size, (6, 5, 8, 255)); black.putalpha(m)
    c.alpha_composite(black)


def text(c, xy, s, font, fill, shadow=8, anchor="la", tracking=0):
    sh = Image.new("RGBA", c.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).text((xy[0] + shadow * 0.3, xy[1] + shadow), s, font=font, fill=(0, 0, 0, 235), anchor=anchor)
    c.alpha_composite(sh.filter(ImageFilter.GaussianBlur(shadow)))
    ImageDraw.Draw(c).text(xy, s, font=font, fill=fill, anchor=anchor)


def chips(c, cx, y, size, gap):
    f = ImageFont.truetype(FONT_D, size)
    d = ImageDraw.Draw(c)
    items = list(CHIP.items())
    ws = [d.textlength(t, font=f) + size * 1.5 for t, _ in items]
    x = cx - (sum(ws) + gap * (len(ws) - 1)) / 2
    h = size * 1.75
    for (t, col), w in zip(items, ws):
        sh = Image.new("RGBA", c.size, (0, 0, 0, 0))
        ImageDraw.Draw(sh).rounded_rectangle([x, y + size * 0.25, x + w, y + h + size * 0.25], radius=h / 2, fill=(0, 0, 0, 200))
        c.alpha_composite(sh.filter(ImageFilter.GaussianBlur(size * 0.3)))
        d.rounded_rectangle([x, y, x + w, y + h], radius=h / 2, fill=col + (255,), outline=(255, 255, 255, 90), width=max(2, size // 18))
        d.text((x + w / 2, y + h / 2), t, font=f, fill=(255, 255, 255), anchor="mm")
        x += w + gap


def rule(c, cx, y, w, col):
    d = ImageDraw.Draw(c)
    d.rectangle([cx - w / 2, y, cx + w / 2, y + max(3, w // 160)], fill=col + (255,))


def landscape():
    c = Image.open(os.path.join(TH, "src", "bg-landscape.png")).convert("RGBA")
    W, H = c.size
    shade(c, 0.46, 0.82, 0.86, 0.6)
    place(c, img("render-signature-plus-22-4-webp"), W * 0.20, H * 0.755, W * 0.28)
    place(c, img("render-signature-plus-32-3-webp"), W * 0.60, H * 0.765, W * 0.40)
    place(c, img("render-signature-plus-16-2-webp"), W * 0.37, H * 0.83, W * 0.22)
    place(c, img("render-signature-plus-12-3-webp"), W * 0.84, H * 0.83, W * 0.19)
    disp = ImageFont.truetype(FONT_D, int(H * 0.105))
    script = ImageFont.truetype(FONT_S, int(H * 0.085))
    small = ImageFont.truetype(FONT_D, int(H * 0.034))
    text(c, (W // 2, int(H * 0.035)), "SIGNATURE PLUS", disp, CREAM, shadow=14, anchor="ma")
    text(c, (W // 2, int(H * 0.15)), "Analog, Perfected", script, GOLD, shadow=16, anchor="ma")
    text(c, (W // 2, int(H * 0.925)), "GHOST PREAMPS  ·  SAPPHYRE EQ  ·  dbx  ·  LEXICON  ·  USB-C", small, (232, 226, 216), shadow=8, anchor="ma")
    chips(c, W / 2, int(H * 0.30), int(H * 0.042), int(H * 0.02))
    out = c.convert("RGB").resize((1920, 1080), Image.LANCZOS)
    out.save(os.path.join(TH, "thumbnail-landscape-1920x1080.jpg"), quality=94)
    out.save(os.path.join(TH, "thumbnail-landscape-1920x1080.png"))


def portrait():
    c = Image.open(os.path.join(TH, "src", "bg-portrait.png")).convert("RGBA")
    W, H = c.size
    shade(c, 0.34, 0.85, 0.80, 0.85)
    place(c, img("render-signature-plus-32-3-webp"), W * 0.52, H * 0.69, W * 0.84)
    place(c, img("render-signature-plus-22-4-webp"), W * 0.27, H * 0.745, W * 0.46)
    place(c, img("render-signature-plus-16-2-webp"), W * 0.74, H * 0.755, W * 0.42)
    place(c, img("render-signature-plus-12-3-webp"), W * 0.50, H * 0.785, W * 0.38)
    disp = ImageFont.truetype(FONT_D, int(W * 0.115))
    script = ImageFont.truetype(FONT_S, int(W * 0.10))
    small = ImageFont.truetype(FONT_D, int(W * 0.036))
    text(c, (W // 2, int(H * 0.05)), "SIGNATURE", disp, CREAM, shadow=14, anchor="ma")
    text(c, (W // 2, int(H * 0.115)), "PLUS", disp, CREAM, shadow=14, anchor="ma")
    text(c, (W // 2, int(H * 0.18)), "Analog, Perfected", script, GOLD, shadow=16, anchor="ma")
    chips(c, W / 2, int(H * 0.272), int(W * 0.05), int(W * 0.025))
    text(c, (W // 2, int(H * 0.86)), "GHOST PREAMPS  ·  SAPPHYRE EQ", small, (232, 226, 216), shadow=8, anchor="ma")
    text(c, (W // 2, int(H * 0.89)), "dbx  ·  LEXICON  ·  USB-C", small, (232, 226, 216), shadow=8, anchor="ma")
    out = c.convert("RGB").resize((1080, 1920), Image.LANCZOS)
    out.save(os.path.join(TH, "thumbnail-portrait-1080x1920.jpg"), quality=94)
    out.save(os.path.join(TH, "thumbnail-portrait-1080x1920.png"))


if __name__ == "__main__":
    landscape()
    portrait()
    print(sorted(os.listdir(TH)))
