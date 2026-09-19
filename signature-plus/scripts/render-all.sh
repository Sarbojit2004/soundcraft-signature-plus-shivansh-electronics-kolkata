#!/bin/sh
# Renders both films and both covers, in order, from one process.
set -e
cd "$(dirname "$0")/.."
echo "=== reel  $(date -u +%H:%M:%S)"
npx remotion render Reel out/soundcraft-signature-plus-reel.mp4 --concurrency=4 --log=info
echo "=== explainer  $(date -u +%H:%M:%S)"
npx remotion render Explainer out/soundcraft-signature-plus-explainer.mp4 --concurrency=4 --log=info
echo "=== audio  $(date -u +%H:%M:%S)"
# Swap in a mix assembled from the mastered stems. The renderer reads the cue
# palette off disk at the end of a run, so this is what guarantees the shipped
# audio is the mastered mix whatever state that palette was in. Picture is
# copied, not re-encoded.
python3 scripts/remux.py
echo "=== covers  $(date -u +%H:%M:%S)"
npx remotion still ThumbnailReel out/soundcraft-signature-plus-reel-thumbnail.png --log=error
npx remotion still ThumbnailVideo out/soundcraft-signature-plus-explainer-thumbnail.png --log=error
echo "=== done  $(date -u +%H:%M:%S)"
ls -la out/
