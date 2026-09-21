#!/usr/bin/env bash
# Render the 4K master, then split it into GitHub-safe parts.
#
# QUALITY-TARGETED, NOT BITRATE-CAPPED. CRF 17 with no maxrate: a hard cap
# would starve the two places in this reel that need the bits most — the
# transitions, where the whole frame moves at once, and the detail pushes into
# the 4096 px plans, where the picture is a field of small high-contrast
# legends. Both are exactly what a rate cap smears.
#
# The master is NEVER re-encoded after this. The parts under out/reel-4k-parts/
# are stream copies, so rejoining them is a concatenation and the result is
# bit-identical to what Remotion wrote.
set -euo pipefail

cd "$(dirname "$0")/.."

OUT=out/soundcraft-signature-plus-reel-4k.mp4
CONC="${CONCURRENCY:-4}"

mkdir -p out

echo "── validating before spending the render ──"
node --experimental-strip-types scripts/validate.mjs

echo
echo "── rendering 2160x3840, CRF 17, ${CONC} workers ──"
npx remotion render Reel "$OUT" \
  --concurrency="$CONC" \
  --crf=17 \
  --pixel-format=yuv420p \
  --codec=h264 \
  --log=error

echo
echo "── splitting for GitHub ──"
python3 scripts/split_mp4.py "$OUT"

echo
ls -la out/reel-4k-parts/
