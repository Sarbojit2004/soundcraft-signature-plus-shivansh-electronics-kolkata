#!/bin/sh
# Render the explainer in chunks, video-only, then join and mux the audio.
#
# WHY CHUNKS. A single 9040-frame 4K pass is three hours of work that Remotion
# cannot resume: if the box restarts — and it has, twice — the whole thing is
# lost. The first attempt died at frame 275 and took 1h40m of wall clock with
# it. Each chunk here is an independent render that survives on disk, so a
# restart costs one chunk, not the film.
#
# WHY VIDEO-ONLY. Concatenating chunks that each carry their own audio segment
# risks drift at every join. The picture is joined by stream copy and the full
# mastered mix is attached afterwards by scripts/remux.py, which assembles it
# from the stems at unity — so the audio is one continuous track with no joins
# in it at all.
set -e
cd "$(dirname "$0")/.."
OUT=out/explainer-chunks
mkdir -p "$OUT"

TOTAL=9040
STEP=1130          # eight chunks of about 38 s each

i=0
while [ $((i * STEP)) -lt $TOTAL ]; do
  a=$((i * STEP))
  b=$((a + STEP - 1))
  [ $b -ge $TOTAL ] && b=$((TOTAL - 1))
  f="$OUT/chunk$(printf %02d $i).mp4"
  if [ -f "$f" ]; then
    echo "=== chunk $i ($a-$b) already done, skipping"
  else
    echo "=== chunk $i ($a-$b)  $(date -u +%H:%M:%S)"
    # Rendered under a different name and moved into place only on success:
    # a chunk killed halfway leaves a partial file, and a partial file that
    # already carries the final name would be skipped by the check above.
    # (The scratch name still ends in .mp4 — Remotion rejects any other
    # extension for h264 + aac.)
    npx remotion render Explainer "$OUT/wip$(printf %02d $i).mp4" \
      --frames="$a-$b" --muted --concurrency=3 --log=info
    mv "$OUT/wip$(printf %02d $i).mp4" "$f"
  fi
  i=$((i + 1))
done

echo "=== joining  $(date -u +%H:%M:%S)"
: > "$OUT/list.txt"
for f in "$OUT"/chunk*.mp4; do
  echo "file '$PWD/$f'" >> "$OUT/list.txt"
done
~/bin/ffmpeg -v error -y -f concat -safe 0 -i "$OUT/list.txt" -c copy \
  -movflags +faststart out/soundcraft-signature-plus-explainer.mp4

echo "=== audio  $(date -u +%H:%M:%S)"
python3 scripts/remux.py

echo "=== covers  $(date -u +%H:%M:%S)"
npx remotion still ThumbnailReel out/soundcraft-signature-plus-reel-thumbnail.png --log=error
npx remotion still ThumbnailVideo out/soundcraft-signature-plus-explainer-thumbnail.png --log=error

echo "=== done  $(date -u +%H:%M:%S)"
ls -la out/soundcraft-signature-plus-explainer.mp4
