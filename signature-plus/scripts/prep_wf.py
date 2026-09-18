#!/usr/bin/env python3
"""Remove the same static sparkle watermark from the 2752x1536 workflow stills.

Alpha solved independently at this resolution (96px star, peak alpha 0.365) and
verified: after inversion the star interior sits within 1/255 of the surrounding
annulus across all 20 images. Output is opaque JPEG - the source RGBA PNGs are
~8MB each and cost far more to decode per frame than they are worth.
"""
from PIL import Image
from scipy.ndimage import uniform_filter
import numpy as np, glob, os

HERE = os.path.dirname(os.path.abspath(__file__))
A0 = np.load(os.path.join(HERE, 'wf_alpha.npy'))
OX, OY = 2456, 1238
N = A0.shape[0]
PAD = 30
M = np.zeros((N + 2 * PAD, N + 2 * PAD)); M[PAD:PAD + N, PAD:PAD + N] = A0
MM = M - uniform_filter(M, size=61)
DEN = (MM * MM).sum()


def solve_scale(im):
    """Per-image watermark opacity, fitted the same way as for the clips."""
    p = im[OY - PAD:OY + N + PAD, OX - PAD:OX + N + PAD]

    def resid(k):
        al = np.clip(M * k, 0, 0.75)[:, :, None]
        g = np.clip((p - 255.0 * al) / (1.0 - al), 0, 255).mean(2)
        return float(((g - uniform_filter(g, 61)) * MM).sum() / DEN)

    if abs(resid(0.0)) < 40.0: return 1.0   # mark falls on white, nothing to fit
    if abs(resid(1.0)) < 15.0: return 1.0   # already clean, don't chase noise
    lo, hi = 0.6, 1.6
    for _ in range(22):
        mid = (lo + hi) / 2
        if resid(mid) > 0: lo = mid
        else: hi = mid
    return round((lo + hi) / 2, 3)
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(REPO, 'gemini-creations')
DST = os.path.join(SRC, 'clean')
os.makedirs(DST, exist_ok=True)

for f in sorted(glob.glob(os.path.join(SRC, 'wf-*.png'))):
    im = np.asarray(Image.open(f).convert('RGB'), dtype=np.float64)
    k = solve_scale(im)
    A = np.clip(A0 * k, 0, 0.75)[:, :, None]
    p = im[OY:OY + N, OX:OX + N]
    im[OY:OY + N, OX:OX + N] = np.clip((p - 255.0 * A) / (1.0 - A), 0, 255)
    out = os.path.join(DST, os.path.basename(f).replace('.png', '.jpg'))
    Image.fromarray(im.astype('uint8')).save(out, quality=94, subsampling=0, optimize=True)
    print('%-34s alpha x%.3f  %.2fMB' % (os.path.basename(out), k, os.path.getsize(out) / 1e6), flush=True)
