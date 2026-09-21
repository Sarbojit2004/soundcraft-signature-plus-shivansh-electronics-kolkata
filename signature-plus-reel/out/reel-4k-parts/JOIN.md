# Rejoining the 4K master

`soundcraft-signature-plus-reel-4k.mp4` is 269.9 MiB, which GitHub will not take, so it ships
here as 4 stream-copied parts.

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
ffmpeg -f concat -safe 0 -i parts.txt -c copy ../soundcraft-signature-plus-reel-4k.mp4
```

## Or just play one

Every part is a standalone MP4 with its own moov atom and `+faststart`, so you
can open any of them directly without rejoining anything.

| part | size | duration |
|---|---|---|
| `soundcraft-signature-plus-reel-4k-part00.mp4` | 82.7 MiB | 24.530 s |
| `soundcraft-signature-plus-reel-4k-part01.mp4` | 71.8 MiB | 21.570 s |
| `soundcraft-signature-plus-reel-4k-part02.mp4` | 63.1 MiB | 22.100 s |
| `soundcraft-signature-plus-reel-4k-part03.mp4` | 52.2 MiB | 21.850 s |

**Master:** 2160 x 3840, 30 fps, 90.050 s, H.264 CRF 17, yuv420p.
