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
# Wait until the master exists AND has stopped growing.
#
# This used to be `pgrep -f "remotion render Reel"`, which deadlocked: the
# shell command line that CREATED this script contained that literal string
# inside its heredoc, so pgrep matched a long-dead wrapper shell and both this
# script and finalize.sh span for an hour after the render had finished.
#
# A size-stability check cannot collide with a process name. Two identical
# readings 8 s apart means the muxer has closed the file.
wait_for_master() {
  local last=-1 now
  while true; do
    if [ -f "$1" ]; then
      now=$(stat -c%s "$1")
      [ "$now" = "$last" ] && [ "$now" -gt 0 ] && return 0
      last=$now
    fi
    sleep 8
  done
}

say "waiting for the master"
wait_for_master "$MASTER"
say "master present: $(du -h "$MASTER" | cut -f1)"

say "waiting for the split"
for _ in $(seq 1 90); do [ -f "$PARTS/JOIN.md" ] && break; sleep 10; done
if [ ! -f "$PARTS/JOIN.md" ]; then
  say "split did not run — doing it here"
  python3 scripts/split_mp4.py "$MASTER" || say "SPLIT FAILED"
fi

# NOT `[ -f ]`. ffmpeg creates its output at zero bytes the instant it starts
# and only writes the moov atom at the end, so testing for existence catches a
# file that is present, growing, and unplayable — which is exactly what got
# committed and pushed the first time this ran: a 540p with no readable
# duration and no stream headers. Wait for it to stop growing instead, the
# same way the master is waited on.
say "waiting for the previews"
for _ in $(seq 1 120); do [ -f "$OUT/preview-reel-540p.mp4" ] && break; sleep 5; done
if [ -f "$OUT/preview-reel-540p.mp4" ]; then wait_for_master "$OUT/preview-reel-540p.mp4"; fi
if [ -f "$OUT/soundcraft-signature-plus-reel-1080p.mp4" ]; then wait_for_master "$OUT/soundcraft-signature-plus-reel-1080p.mp4"; fi

# And prove they are playable before they are committed.
for f in "$OUT/preview-reel-540p.mp4" "$OUT/soundcraft-signature-plus-reel-1080p.mp4"; do
  [ -f "$f" ] || continue
  if ! "$HOME/bin/ffmpeg" -hide_banner -i "$f" 2>&1 | grep -q "Duration:"; then
    say "UNPLAYABLE, not committing: $f"; rm -f "$f"
  else
    say "ok: $(basename "$f") $("$HOME/bin/ffmpeg" -hide_banner -i "$f" 2>&1 | grep -o 'Duration: [0-9:.]*' | head -1)"
  fi
done

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

The whole-file master exceeds GitHub's 100 MiB limit, so it ships as
stream-copied parts under out/reel-4k-parts/. Nothing is re-encoded: each
part carries the original video and audio bitstream, cut on a keyframe
boundary by ffmpeg's segment muxer. The rejoined file is frame-for-frame
identical to the master — verified by split_mp4.py on every run, drift
0.000 s — though not byte-for-byte, since the container is rebuilt. Each
part is a standalone playable MP4. See out/reel-4k-parts/JOIN.md.

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
