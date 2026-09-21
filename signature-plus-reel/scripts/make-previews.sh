#!/usr/bin/env bash
# Watchable previews, made by DOWNSCALING the master rather than re-rendering.
#
# A second Remotion pass at preview size would cost another hour and could
# differ from the master; scaling the master cannot. These are the real file,
# smaller.
set -euo pipefail
cd "$(dirname "$0")/.."
FF="$HOME/bin/ffmpeg"
M=out/soundcraft-signature-plus-reel-4k.mp4

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
wait_for_master "$M"

echo "master: $(du -h "$M" | cut -f1)"

# 1080x1920 — what a phone actually plays.
"$FF" -y -hide_banner -loglevel error -i "$M" \
  -vf scale=1080:1920:flags=lanczos -c:v libx264 -crf 20 -preset medium \
  -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart \
  out/soundcraft-signature-plus-reel-1080p.mp4
echo "1080p: $(du -h out/soundcraft-signature-plus-reel-1080p.mp4 | cut -f1)"

# 540x960 — small enough to push around a chat window.
"$FF" -y -hide_banner -loglevel error -i "$M" \
  -vf scale=540:960:flags=lanczos -c:v libx264 -crf 24 -preset medium \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
  out/preview-reel-540p.mp4
echo "540p:  $(du -h out/preview-reel-540p.mp4 | cut -f1)"
echo "PREVIEWS DONE"
