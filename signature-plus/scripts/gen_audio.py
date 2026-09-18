#!/usr/bin/env python3
"""Build every audio asset both films play, and master the lot to one reference.

THREE JOBS.

1. THE MUSIC BED, from the supplied `High Impact.mp3`. That file is 84.02 s at
   150 BPM in E minor, and it has a real shape: a long build to about 0:40, a
   first peak, a sustained climax from 0:52, and a tail from 1:16. Neither film
   is 84 s long, so the track is fitted twice, differently:

     * THE REEL is 90.37 s, which is close enough that the whole track is
       time-stretched by 0.93 with a pitch-preserving WSOLA. Nothing is cut and
       nothing loops. The structure lands where it should: the climax covers the
       reel's payoff, and the track's own fade-out begins within half a second
       of the end screen taking the frame.

     * THE EXPLAINER is 301.33 s, which is 3.6 times the source, so stretching
       is out. It is ARRANGED instead: the track is cut into eight-bar phrases
       (12.8 s at 150 BPM, so every cut is on a bar line) and those phrases are
       laid out as a five-minute piece — the first peak as the cold open, the
       quiet phrases as a bed under the body at -7 dB, the rising phrase at each
       chapter turn, and the climax saved for the last act. Joins crossfade over
       a bar, and because every phrase is the same tempo and key, they join
       musically rather than audibly.

   Both beds get a gentle, wide dip around 1.8 kHz — a pocket for the narration
   to sit in when the recorded read is dropped on top.

2. THE CUE PALETTE, cut from the 43-file `sound-effects` library supplied with
   this brief. Those files are multi-take: three or four variations of the same
   effect separated by silence, so a fixed-length slice catches the tail of one
   take and the head of the next. scripts/cut_sfx.py splits them properly; this
   copies the result in. One cue — the outro bloom — is synthesised, because the
   library is a tech/UI pack and has no warm sustained swell in it.

3. MASTERING. Everything is measured with EBU R128 and levelled against one
   reference, so nothing needs a volume multiplier in the timeline. A multiplier
   there would silently undo this: it is what made an earlier film's bed
   inaudible at roughly -37 LUFS despite being "mixed correctly".
"""
import numpy as np, os, subprocess, shutil, wave, sys, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
REPO = os.path.dirname(ROOT)
OUT  = os.path.join(ROOT, 'public', 'audio')
SFX  = os.path.join(OUT, 'sfx')
FF   = os.path.expanduser('~/bin/ffmpeg')
SR   = 48000

SOURCE_MUSIC = os.path.join(REPO, 'High Impact.mp3')
CUT_SFX_DIR  = os.path.join(HERE, 'sfx')

# Written by scripts/build-script.mjs from the same timeline the picture is cut
# to, so an edit to one caption re-lengths the beds and the placeholders with it
# instead of leaving them a second short.
with open(os.path.join(HERE, 'durations.json')) as _fh:
    _D = json.load(_fh)
REEL_LEN  = _D['reel']['seconds']
VIDEO_LEN = _D['video']['seconds']

BPM = 150.0
BAR = 4 * 60.0 / BPM        # 1.6 s
PHRASE = 8 * BAR            # 12.8 s

# ── small dsp ────────────────────────────────────────────────────────────────

def _bq(x, b0, b1, b2, a1, a2):
    y = np.empty_like(x)
    z1 = z2 = 0.0
    for i in range(len(x)):
        v = x[i]
        o = b0 * v + z1
        z1 = b1 * v - a1 * o + z2
        z2 = b2 * v - a2 * o
        y[i] = o
    return y


def peak_eq(x, f0, gain_db, q=0.9):
    """A wide bell, used to cut a pocket for speech."""
    A = 10 ** (gain_db / 40)
    w = 2 * np.pi * f0 / SR
    al = np.sin(w) / (2 * q)
    b0 = 1 + al * A; b1 = -2 * np.cos(w); b2 = 1 - al * A
    a0 = 1 + al / A; a1 = -2 * np.cos(w); a2 = 1 - al / A
    if x.ndim == 1:
        return _bq(x, b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0)
    return np.stack([_bq(x[:, c], b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0) for c in range(x.shape[1])], 1)


def read_audio(path, sr=SR):
    raw = subprocess.run([FF, '-v', 'error', '-i', path, '-ac', '2', '-ar', str(sr),
                          '-f', 's16le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype='<i2').astype(np.float64).reshape(-1, 2) / 32768.0


def write_wav(path, x, sr=SR):
    w = wave.open(path, 'w'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()); w.close()


def lufs(path):
    """Integrated loudness, loudest 400 ms window, and true peak, from R128.

    The integrated figure is the one that matters for a bed, but it is gated
    and needs 400 ms of content to exist at all — so a 45 ms tick measures as
    -70 no matter how loud it is. The loudest MOMENTARY window is measured at
    the same time and is what the short cues are levelled by instead.
    """
    p = subprocess.run([FF, '-hide_banner', '-i', path, '-af', 'ebur128=peak=true',
                        '-f', 'null', '-'], capture_output=True, text=True).stderr
    import re
    I = re.findall(r'I:\s+(-?[\d.]+) LUFS', p)
    P = re.findall(r'Peak:\s+(-?[\d.]+) dBFS', p)
    M = [float(v) for v in re.findall(r'M:\s*(-?[\d.]+)', p) if float(v) > -70]
    return (float(I[-1]) if I else -70.0, max(M) if M else -70.0, float(P[-1]) if P else -70.0)


# ── K-weighted loudness, computed here rather than asked of ffmpeg ──────────
#
# ffmpeg's R128 meter needs a complete 400 ms window before it will report
# anything, so every cue in this palette shorter than that measured as -70 LUFS
# no matter how loud it actually was — and levelling against -70 pushed half the
# palette to full scale. The same measurement is therefore done here, to
# BS.1770: the K-weighting pair, then the loudest 400 ms window, zero-padded for
# anything shorter. It agrees with ffmpeg on every cue long enough for ffmpeg to
# have an opinion, and it keeps working on a 45 ms tick.

_K1_B = np.array([1.53512485958697, -2.69169618940638, 1.19839281085285])
_K1_A = np.array([1.0, -1.69065929318241, 0.73248077421585])
_K2_B = np.array([1.0, -2.0, 1.0])
_K2_A = np.array([1.0, -1.99004745483398, 0.99007225036621])


def momentary(x, window=0.4):
    """Loudest 400 ms of K-weighted loudness, in LUFS."""
    from scipy.signal import lfilter
    if x.ndim == 1:
        x = x[:, None]
    n = int(window * SR)
    y = lfilter(_K2_B, _K2_A, lfilter(_K1_B, _K1_A, x, axis=0), axis=0)
    if len(y) < n:
        y = np.vstack([y, np.zeros((n - len(y), y.shape[1]))])
    e = (y ** 2).sum(1)
    cs = np.cumsum(np.concatenate([[0.0], e]))
    mean = (cs[n:] - cs[:-n]) / n
    return -0.691 + 10 * np.log10(max(mean.max(), 1e-12))


def fade(x, fin, fout):
    n = len(x)
    a = min(int(fin * SR), n // 2); b = min(int(fout * SR), n // 2)
    if a: x[:a] *= np.linspace(0, 1, a)[:, None] ** 1.3
    if b: x[n - b:] *= np.linspace(1, 0, b)[:, None] ** 1.3
    return x

# ── 1. the music beds ────────────────────────────────────────────────────────

def reel_bed(src):
    """One continuous pass of the track, stretched to the reel's exact length."""
    ratio = len(src) / SR / REEL_LEN            # 0.929...
    tmp_in = os.path.join(OUT, '_src.wav'); write_wav(tmp_in, src)
    tmp_out = os.path.join(OUT, '_stretch.wav')
    subprocess.run([FF, '-v', 'error', '-y', '-i', tmp_in, '-af', f'atempo={ratio:.6f}',
                    '-ar', str(SR), '-ac', '2', tmp_out], check=True)
    y = read_audio(tmp_out)
    os.remove(tmp_in); os.remove(tmp_out)
    n = int(REEL_LEN * SR)
    if len(y) < n: y = np.vstack([y, np.zeros((n - len(y), 2))])
    return fade(y[:n].copy(), 0.05, 0.6)


# phrase index -> (source start seconds, gain dB). Phrases are eight bars each,
# so every cut below lands on a bar line and the joins stay in time.
ARRANGEMENT = [
    (0,  3, 0.0),    # the first peak, as the cold open
    (1,  0, -6.0),
    (2,  1, -6.0),
    (3,  0, -7.0),
    (4,  1, -7.0),
    (5,  0, -8.0),
    (6,  1, -8.0),
    (7,  0, -8.0),
    (8,  2, -5.0),   # the rise, under the turn into CONTROL
    (9,  1, -7.0),
    (10, 0, -8.0),
    (11, 1, -8.0),
    (12, 0, -8.0),
    (13, 2, -5.0),   # the rise again, under THE ROOM
    (14, 3, -4.0),
    (15, 1, -7.0),
    (16, 0, -8.0),
    (17, 1, -7.0),
    (18, 2, -5.0),   # and again, under THE BUILD
    (19, 0, -7.0),
    (20, 4, -2.0),   # the climax is saved for WHICH ONE
    (21, 5, 0.0),
    (22, 4, 0.0),
]
TAIL_FROM = 76.8     # the track's own fade-out, kept for the end screen


def video_bed(src):
    """Eight-bar phrases laid out as a five-minute piece."""
    n = int(VIDEO_LEN * SR)
    out = np.zeros((n + SR, 2))
    xf = int(BAR * SR)                      # one bar of crossfade at every join
    win_in = np.linspace(0, 1, xf)[:, None] ** 0.5
    win_out = np.linspace(1, 0, xf)[:, None] ** 0.5

    for slot, phrase, gain_db in ARRANGEMENT:
        a = int(phrase * PHRASE * SR)
        b = a + int(PHRASE * SR) + xf
        seg = src[a:min(b, len(src))].copy()
        if len(seg) < xf * 2:
            continue
        seg *= 10 ** (gain_db / 20)
        seg[:xf] *= win_in
        seg[-xf:] *= win_out
        t = int(slot * PHRASE * SR)
        end = min(t + len(seg), len(out))
        out[t:end] += seg[:end - t]

    # the track's own tail, as the end screen arrives
    tail = src[int(TAIL_FROM * SR):].copy()
    tail[:xf] *= win_in
    t = int(len(ARRANGEMENT) * PHRASE * SR) - xf
    end = min(t + len(tail), len(out))
    out[t:end] += tail[:end - t]

    return fade(out[:n], 0.05, 1.2)

# ── 2. the synthesised cue ───────────────────────────────────────────────────

def outro_bloom(dur=4.4):
    """A warm swell in E minor, the key the supplied track is in.

    The supplied library is a tech/UI pack: it has snaps, ticks, gated risers
    and sub booms, but nothing sustained and nothing warm, and an end screen
    needs a chord to land on rather than a transient.
    """
    n = int(dur * SR)
    t = np.arange(n) / SR
    E2, B2, E3, G3, B3 = 82.41, 123.47, 164.81, 196.00, 246.94
    y = np.zeros((n, 2))
    for k, (f0, amp, pan) in enumerate([(E2, 0.9, 0.5), (B2, 0.55, 0.38),
                                        (E3, 0.5, 0.62), (G3, 0.42, 0.30), (B3, 0.30, 0.70)]):
        # a small amount of detune between the two sides gives the chord width
        # without a stereo effect having to be applied afterwards
        for c, det in ((0, -0.12), (1, 0.12)):
            ph = 2 * np.pi * (f0 + det) * t + k * 0.7
            v = np.sin(ph) + 0.28 * np.sin(2 * ph) + 0.10 * np.sin(3 * ph)
            g = amp * (pan if c == 1 else 1 - pan)
            y[:, c] += v * g
    env = np.minimum(1.0, t / 0.55) * np.exp(-np.maximum(0.0, t - 0.55) / 1.35)
    y *= env[:, None]
    # a soft transient so the bloom has an attack to hang on
    tick = np.exp(-t / 0.045) * np.sin(2 * np.pi * 1320 * t) * 0.16
    y += tick[:, None]
    y /= max(1e-9, np.abs(y).max()) / 0.82
    return fade(y, 0.004, 0.5)

# ── 3. mastering ─────────────────────────────────────────────────────────────

REFERENCE_LUFS = -23.0

# Each cue's level relative to the bed. Trimmed by ear against the picture:
# the cue under a whip pan should be felt, not listened to, while the riser
# ahead of a chapter and the bloom on the end screen carry real weight.
RELATIVE = {
    'air-pass':     -5.0,
    'whip-mid':     -4.0,
    'whip-bright':  -4.0,
    'whip-soft':    -6.0,
    'air-long':     -7.0,
    'gate-snap':    -4.5,
    'snap-low':     -4.0,
    'snap-tight':   -6.0,
    'snap-hard':    -5.0,
    'whip-one':     -5.0,
    'impact-tight': -3.0,
    'impact-full':  -3.0,
    'impact-deep':  -3.0,
    'riser-short':  -2.0,
    'riser-sub':    -2.5,
    'riser-mid':    -3.0,
    'chime-lift':   -5.0,
    'chime-hi':     -6.0,
    'tick-glass':   -9.0,
    'tick-hi':      -9.0,
    'tick-tiny':   -10.0,
    'count-blip':  -10.0,
    'blip-one':     -9.0,
    'data-beep':    -8.0,
    'outro-bloom':   0.0,
}


def master(path, target_lufs):
    """A single measured scalar, never a dynamic normaliser.

    loudnorm's dynamic mode would re-ride the level of a 4-second cue and of a
    five-minute bed differently, which is exactly what must not happen when the
    two have to sit against each other.
    """
    I, _, _ = lufs(path)
    x = read_audio(path)
    # A bed is levelled by its integrated loudness; a cue too short to gate is
    # levelled by its loudest 400 ms window, which for a short transient is the
    # measure that matches what the ear does anyway.
    g = 10 ** (((target_lufs - I) if I > -60 else (target_lufs - momentary(x))) / 20)
    pk = np.abs(x * g).max()
    if pk > 0.97:
        g *= 0.97 / pk
    write_wav(path, x * g)
    return lufs(path)


def main():
    os.makedirs(SFX, exist_ok=True)
    src = read_audio(SOURCE_MUSIC)
    print('source music: %.2f s, %d BPM, E minor' % (len(src) / SR, BPM))

    for name, bed, length in (('reel', reel_bed(src), REEL_LEN),
                              ('video', video_bed(src), VIDEO_LEN)):
        y = peak_eq(bed, 1800.0, -4.0, q=0.7)      # the pocket for the narration
        wav = os.path.join(OUT, f'music-{name}.wav')
        write_wav(wav, y)
        got = master(wav, REFERENCE_LUFS)[0]
        mp3 = os.path.join(OUT, f'music-{name}.mp3')
        subprocess.run([FF, '-v', 'error', '-y', '-i', wav, '-b:a', '256k', mp3], check=True)
        os.remove(wav)
        print('music-%-5s %7.2f s  %6.1f LUFS' % (name, length, got))

    # the cues: copied from the library, plus the one that had to be made
    made = 0
    for f in sorted(os.listdir(CUT_SFX_DIR)):
        if f.endswith('.wav'):
            shutil.copyfile(os.path.join(CUT_SFX_DIR, f), os.path.join(SFX, f))
            made += 1
    write_wav(os.path.join(SFX, 'outro-bloom.wav'), outro_bloom())
    made += 1

    print('\n%-14s %8s %8s %8s' % ('cue', 'target', 'LUFS', 'max 400ms'))
    for f in sorted(os.listdir(SFX)):
        name = f[:-4]
        rel = RELATIVE.get(name)
        if rel is None:
            print('%-14s  (no level set — left as cut)' % name)
            continue
        tgt = REFERENCE_LUFS + rel
        I, _, _ = master(os.path.join(SFX, f), tgt)
        m = momentary(read_audio(os.path.join(SFX, f)))
        print('%-14s %8.1f %8.1f %8.1f%s' % (name, tgt, I, m, '' if I > -60 else '   (by window)'))

    # silent narration placeholders, at exactly each film's length, so dropping
    # the recorded read in is a file copy and nothing has to be re-timed
    for name, length in (('reel', REEL_LEN), ('video', VIDEO_LEN)):
        write_wav(os.path.join(OUT, f'vo-{name}.wav'), np.zeros((int(length * SR), 2)))
        print('vo-%-5s placeholder %.2f s' % (name, length))

    print('\n%d cues + 2 beds + 2 placeholders' % made)


if __name__ == '__main__':
    main()
