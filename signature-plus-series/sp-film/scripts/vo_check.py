import json, sys
sys.path.insert(0, 'scripts')
from vo_lines import REEL, VIDEO
for name, lines, dur in (('reel', REEL, 180.0), ('video', VIDEO, 300.0)):
    p = json.load(open(f'src/plan-{name}.json'))
    W = [(s.get('id', s.get('name', '?')), c['start'], c['end']) for s in p['sections'] for c in s['captions']] + [('outro', p['outroAt'], dur)]
    assert len(W) == len(lines), (name, len(W), len(lines))
    tw = tb = 0
    for (sec, a, b), (h, x) in zip(W, lines):
        bud = round((b - a) * 152 / 60); w = len((h + ' ' + x).split())
        tw += w; tb += bud
        flag = '' if abs(w - bud) <= 1 else '  <<'
        print(f'{name} {sec:10s} {a:6.1f}-{b:6.1f} {w:3d}/{bud:3d}{flag}')
    print(name, tw, tb, round(tw / dur * 60, 1), 'wpm')
