"""Writes deliverables/VOICEOVER-SCRIPT.md from vo_lines.py and the plan timings."""
import json, sys
sys.path.insert(0, 'scripts')
from vo_lines import REEL, VIDEO

def ts(t):
    return f"{int(t // 60)}:{t % 60:04.1f}"

out = ["# Soundcraft Signature Plus Series — Voiceover Speech Script", "",
       "Pace: 152 words per minute, matched window by window to the picture.",
       "In each block the on-screen heading (typography / burned-in caption) is spoken first, followed by the bridging narration for that same time block.",
       "Timelines stay exactly 3:00 (reel) and 5:00 (video).", ""]
for name, title, lines, dur in (('reel', 'REEL — 9:16, 3:00', REEL, 180.0), ('video', 'EXPLAINER VIDEO — 16:9, 5:00', VIDEO, 300.0)):
    p = json.load(open(f'src/plan-{name}.json'))
    W = [(s['label'], c['t'], c['start'], c['end']) for s in p['sections'] for c in s['captions']]
    W.append(('Outro', 'End screen', p['outroAt'], dur))
    total = sum(len((h + ' ' + x).split()) for h, x in lines)
    out += ["---", "", f"## {title}", "", f"{total} words over {dur:.0f} s = {total / dur * 60:.0f} wpm", ""]
    for n, ((label, cap, a, b), (h, x)) in enumerate(zip(W, lines), 1):
        words = len((h + ' ' + x).split())
        out += [f"**Slide {n} · {ts(a)} – {ts(b)} · {label.upper()} · on screen: \"{cap.upper()}\"** ({words} words)", "",
                (h + ' ' + x).strip(), ""]
    out += ["", "### Full reading text", "", " ".join((h + ' ' + x).strip() for h, x in lines), ""]
open('../deliverables/VOICEOVER-SCRIPT.md', 'w').write("\n".join(out))
