#!/bin/sh
# Renders both films and both covers, in order, from one process.
set -e
cd "$(dirname "$0")/.."
echo "=== reel  $(date -u +%H:%M:%S)"
npx remotion render Reel out/soundcraft-signature-plus-reel.mp4 --concurrency=4 --log=info
echo "=== explainer  $(date -u +%H:%M:%S)"
npx remotion render Explainer out/soundcraft-signature-plus-explainer.mp4 --concurrency=4 --log=info
echo "=== covers  $(date -u +%H:%M:%S)"
npx remotion still ThumbnailReel out/soundcraft-signature-plus-reel-thumbnail.png --log=error
npx remotion still ThumbnailVideo out/soundcraft-signature-plus-explainer-thumbnail.png --log=error
echo "=== done  $(date -u +%H:%M:%S)"
ls -la out/
