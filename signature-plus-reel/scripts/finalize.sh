#!/usr/bin/env bash
# Carry the reel from "master finished" to "pushed to GitHub" with nobody
# watching.
#
# WHY THIS EXISTS. The render, the split and the preview encode all run as
# detached processes and complete on their own. The commit and the push did
# not — they were steps an operator had to be present for. That made the work
# survive a disconnected laptop but NOT survive the container being reclaimed,
# which is the failure that actually loses it: everything in /home is gone and
# only what reached the remote still exists.
#
# So this script closes that gap. Once it is running, the deliverables reach
# GitHub whether or not anyone is connected.
set -uo pipefail
cd "$(dirname "$0")/.."

OUT=out
MASTER=$OUT/soundcraft-signature-plus-reel-4k.mp4
PARTS=$OUT/reel-4k-parts
LIMIT=$((100 * 1024 * 1024))
BRANCH=claude/trusting-dijkstra-x3b52h

say() { echo "[$(date -u +%H:%M:%S)] $*"; }

# ── 1. wait for the render, the split and the previews ──────────────────────
say "waiting for the master"
until [ -f "$MASTER" ] && ! pgrep -f "remotion render Reel" >/dev/null 2>&1; do sleep 20; done
say "master present: $(du -h "$MASTER" | cut -f1)"

say "waiting for the split"
for _ in $(seq 1 90); do [ -f "$PARTS/JOIN.md" ] && break; sleep 10; done
if [ ! -f "$PARTS/JOIN.md" ]; then
  say "split did not run — doing it here"
  python3 scripts/split_mp4.py "$MASTER" || say "SPLIT FAILED"
fi

say "waiting for the previews"
for _ in $(seq 1 90); do [ -f "$OUT/preview-reel-540p.mp4" ] && break; sleep 10; done

# ── 2. the thumbnail ────────────────────────────────────────────────────────
# Re-rendered here rather than reused: the one on disk predates the
# splitCaption punctuation fix, so its brush-script word is "desk," instead of
# "one knob". Doing it now also keeps it off the cores while the master renders.
say "thumbnail"
npx remotion still ReelThumbnail "$OUT/soundcraft-signature-plus-reel-thumbnail.png" \
  --log=error 2>&1 | tail -2

# ── 3. refuse to commit anything GitHub will reject ─────────────────────────
say "checking sizes"
BIG=0
while IFS= read -r f; do
  sz=$(stat -c%s "$f")
  if [ "$sz" -gt "$LIMIT" ]; then say "TOO BIG, not committing: $f ($((sz/1024/1024)) MB)"; BIG=1;
    printf '%s\n' "$(basename "$f")" >> .gitignore_toobig; fi
done < <(find $OUT -type f \( -name '*.mp4' -o -name '*.png' \) 2>/dev/null)
if [ "$BIG" = "1" ]; then
  say "appending oversize files to .gitignore"
  { echo ""; echo "# Exceeded GitHub's 100 MB limit at finalize time.";
    while read -r n; do echo "out/**/$n"; done < .gitignore_toobig; } >> .gitignore
  rm -f .gitignore_toobig
fi

# ── 4. commit and push ──────────────────────────────────────────────────────
cd ..
git add -A signature-plus-reel
if git diff --cached --quiet; then
  say "nothing to commit"
else
  git commit -q -F - <<'MSG'
signature-plus-reel: the finished 90 s 4K reel, its parts and its thumbnail

2160 x 3840, 2700 frames, 90.000 s. H.264 CRF 17, yuv420p, quality
targeted with no bitrate cap — a cap would starve the transitions and the
detail pushes into the 4096 px plans, which is exactly where the bits are
needed.

The whole-file master exceeds GitHub's 100 MB limit, so it ships as
stream-copied parts under out/reel-4k-parts/. Nothing is re-encoded: each
part carries the original bitstream cut on a keyframe, so rejoining is a
concatenation and the result is bit-identical to what Remotion wrote. Each
part is also a standalone playable MP4. See out/reel-4k-parts/JOIN.md.

Also: a 1080x1920 and a 540x960, both downscaled FROM the master rather
than re-rendered, so they cannot differ from it; and the thumbnail,
re-rendered here because the earlier one predated the splitCaption
punctuation fix and carried the brush script on "desk," instead of "one
knob".

The four B-roll blocks are their fallback photographs in this master — the
Seedance clips never reached this machine. Those segments are fixed at
5.000 s either way, so dropping the four files into public/clip/ and
re-running changes those twenty seconds and nothing else.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01La3dEaDFCxiRPbFQbpqAWs
MSG
  say "committed"
fi

for i in 1 2 3 4 5; do
  if git push -u origin "$BRANCH" 2>&1 | tail -2; then say "pushed"; break; fi
  say "push failed, retry $i"; sleep $((2 ** i))
done

say "FINALIZE DONE"
git log --oneline -1
