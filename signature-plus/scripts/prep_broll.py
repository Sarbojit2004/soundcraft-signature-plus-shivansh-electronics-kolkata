#!/usr/bin/env python3
"""Clean the Gemini/Veo sparkle watermark out of the Signature Plus B-rolls.

The mark is a static 4-point star composited as white at a known per-pixel
alpha, so it is removed exactly rather than blurred over:  src = (out - 255a)/(1-a).
Alpha was solved from the per-pixel floor across 120 samples (20 clips x 6 times)
and refined until the residual floor fell to <=2/255.

Each clip is then retimed so every 24fps source frame lands on exactly one 30fps
output frame (no duplication, no judder), upscaled to 1080p with lanczos and a
light unsharp, and stripped of its audio track.
"""
import numpy as np, subprocess, sys, os, glob
from scipy.ndimage import uniform_filter

FF   = os.path.expanduser('~/bin/ffmpeg')
W, H = 1280, 720
X0, Y0, N = 1132, 572, 56
ALPHA0 = np.load(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'alpha56f.npy'))

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(REPO, 'gemini-creations')
DST = os.path.join(SRC, 'clean')
os.makedirs(DST, exist_ok=True)

VF = ('scale=2560:1440:flags=lanczos,'
      'unsharp=5:5:0.7:5:5:0.0,'
      'setpts=N/30/TB')


def solve_scale(path):
    """Find this clip's watermark opacity.

    The mark is not stamped at the same strength on every clip, so the shared
    alpha map is scaled per clip: sample a few frames, subtract the mark at a
    range of scales, and keep the one that drives a matched filter for the star
    shape to zero. A clip with a flat white background carries no signal to fit,
    and correctly falls back to 1.0.
    """
    M = np.zeros((100, 100)); M[22:78, 22:78] = ALPHA0
    mm = M - uniform_filter(M, size=41)
    den = (mm * mm).sum()
    frames = []
    for t in (0.5, 2.0, 3.5, 5.0, 6.5, 8.0, 9.5):
        buf = subprocess.run(
            [FF, '-v', 'error', '-ss', str(t), '-i', path, '-frames:v', '1',
             '-vf', f'crop=100:100:{X0 - 22}:{Y0 - 22}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
            capture_output=True).stdout
        if len(buf) == 100 * 100 * 3:
            frames.append(np.frombuffer(buf, dtype=np.uint8).reshape(100, 100, 3).astype(np.float64))
    if not frames: return 1.0
    def resid(k):
        al = np.clip(M * k, 0, 0.75)[:, :, None]
        out = []
        for f in frames:
            g = np.clip((f - 255.0 * al) / (1.0 - al), 0, 255).mean(2)
            out.append(float(((g - uniform_filter(g, 41)) * mm).sum() / den))
        return float(np.mean(out))
    if abs(resid(0.0)) < 25.0:        # nothing to see (mark falls on white)
        return 1.0
    lo, hi = 0.5, 2.5
    for _ in range(24):
        mid = (lo + hi) / 2
        if resid(mid) > 0: lo = mid
        else: hi = mid
    return round((lo + hi) / 2, 3)


def clean(path, out, k):
    alpha = np.clip(ALPHA0 * k, 0, 0.75)[:, :, None]
    GAIN = 255.0 * alpha
    INV = 1.0 / (1.0 - alpha)
    dec = subprocess.Popen(
        [FF, '-v', 'error', '-i', path, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'],
        stdout=subprocess.PIPE)
    enc = subprocess.Popen(
        [FF, '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
         '-s', f'{W}x{H}', '-r', '24', '-i', '-',
         '-vf', VF, '-r', '30', '-an',
         '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
         '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
        stdin=subprocess.PIPE)
    fsize, n = W * H * 3, 0
    while True:
        buf = dec.stdout.read(fsize)
        if len(buf) < fsize:
            break
        fr = np.frombuffer(buf, dtype=np.uint8).reshape(H, W, 3).astype(np.float32)
        p = fr[Y0:Y0 + N, X0:X0 + N]
        fr[Y0:Y0 + N, X0:X0 + N] = np.clip((p - GAIN) * INV, 0, 255)
        enc.stdin.write(fr.astype(np.uint8).tobytes())
        n += 1
    enc.stdin.close()
    dec.wait(); enc.wait()
    return n


if __name__ == '__main__':
    for f in sorted(glob.glob(os.path.join(SRC, 'broll-*.mp4'))):
        b = os.path.basename(f)
        k = solve_scale(f)
        n = clean(f, os.path.join(DST, b), k)
        print(f'{b}  alpha x{k:.3f}  {n} frames -> {n/30:.2f}s @30fps', flush=True)
