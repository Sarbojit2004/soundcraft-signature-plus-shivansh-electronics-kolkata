# signature-plus-reel-4k

5 sequential parts, each playable on its own, total 180.000 s.
The video in every part is the renderer's own encode, stream-copied — never re-encoded.

Rejoin into one master (video stream-copied, full soundtrack from `signature-plus-reel-4k-audio.m4a`):

```
ffmpeg -f concat -safe 0 -i signature-plus-reel-4k.concat.txt -i signature-plus-reel-4k-audio.m4a -map 0:v -map 1:a -c copy signature-plus-reel-4k.mp4
```
