#!/usr/bin/env bash
# Overnight net: if finalize.sh dies before the deliverables reach the remote,
# run it again. Checks every 10 minutes for 3 hours, then gives up.
#
# finalize.sh is the only step between a finished render and the work being
# safe. If it fails — a transient push error, an npx hiccup on the thumbnail —
# nobody is awake to notice. This re-runs it.
set -uo pipefail
cd "$(dirname "$0")/.."
LOG=/tmp/claude-0/-home-user/cb9db8a0-da70-5c9b-9006-f654247206f6/scratchpad
say(){ echo "[$(date -u +%H:%M:%S)] $*"; }

for i in $(seq 1 18); do
  sleep 600
  # Done if the remote already has the parts.
  if git -C .. log --oneline origin/claude/trusting-dijkstra-x3b52h -5 2>/dev/null \
       | grep -qi "finished 90 s 4K reel"; then say "deliverables are on the remote — standing down"; exit 0; fi
  # Still working? leave it alone.
  pgrep -f "bash scripts/finalize.sh" >/dev/null && { say "finalize still running"; continue; }
  pgrep -f "remotion render Reel" >/dev/null && { say "render still running"; continue; }
  # Master exists, finalize is not running, remote has nothing: re-run it.
  if [ -f out/soundcraft-signature-plus-reel-4k.mp4 ]; then
    say "finalize is not running and the remote has nothing — re-running (attempt $i)"
    git -C .. fetch origin claude/trusting-dijkstra-x3b52h >/dev/null 2>&1
    nohup setsid bash scripts/finalize.sh >> "$LOG/finalize.log" 2>&1 < /dev/null &
  else
    say "no master yet and nothing running — render may have died; cannot recover unattended"
  fi
done
say "watchdog expired"
