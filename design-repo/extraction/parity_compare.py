"""Per-section live-vs-clone parity from capture.mjs tiles.

Primary metric (gate >= 80% per section): INK BLOCK-MAP DICE (layout parity).
  Both tiles -> grayscale; background = median live value; 'ink' = |px - bg| > 30; the ink mask
  is box-blurred (radius 12px), downsampled 4x and thresholded at 25/255, giving a block map of
  where text, artwork and controls sit. Score = Dice(live, clone) = 2|A&B| / (|A|+|B|) summed over
  every tile of the section. Glyph identity is deliberately not compared: the clone uses invented
  copy and original artwork by design. Calibration on the five legacy routes (ask, sequences,
  workflows, data, call-intelligence; 1440, first tile per section): blank clone 0, clone shifted
  150px down mean 9 / max 35, a different section mean 19 / max 66.
Secondary metric (reported, not gated): raw pixel match at 4x, tolerance 25 (includes background).
The clone section is aligned at its own top; the comparison window is the LIVE section's height
(a shorter clone section is padded with background, so a height deficit counts against it).
usage: python3 extraction/parity_compare.py <live_dir> <clone_dir> <out.json> [--sheets <dir>] [--routes r1,r2]"""
import json, sys, os
import numpy as np
from PIL import Image
live, clone, outp = sys.argv[1:4]
args = sys.argv[4:]
sheets = args[args.index('--sheets') + 1] if '--sheets' in args else None
only = args[args.index('--routes') + 1].split(',') if '--routes' in args else None
if sheets: os.makedirs(sheets, exist_ok=True)
L = json.load(open(os.path.join(live, 'meta.json'))); C = json.load(open(os.path.join(clone, 'meta.json')))

def load(d, f, h, w, fill):
    a = np.full((h, w), fill, np.float64)
    src = np.asarray(Image.open(os.path.join(d, f)).convert('L'), np.float64)[:h, :w]
    a[:src.shape[0], :src.shape[1]] = src
    return a
def ds(a, F):
    h, w = a.shape[0] // F * F, a.shape[1] // F * F
    return a[:h, :w].reshape(h // F, F, w // F, F).mean(axis=(1, 3))

from PIL import ImageFilter
def blocks(a, bg):
    m = Image.fromarray(((np.abs(a - bg) > 30) * 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(12))
    return np.asarray(m.resize((m.size[0] // 4, max(1, m.size[1] // 4))), np.float64) > 25

def score_pair(la, ca):
    bg = float(np.median(la))
    A, B = blocks(la, bg), blocks(ca, bg)
    l4, c4 = ds(la, 4), ds(ca, 4)
    raw = (np.abs(l4 - c4) <= 25)
    return 2 * int((A & B).sum()), int(A.sum() + B.sum()), int(raw.sum()), raw.size

res = {}
for r, lv in L.items():
    if only and r not in only: continue
    cv = C.get(r)
    rows = []
    for i, ls in enumerate(lv['secs']):
        cs = cv['secs'][i] if cv and i < len(cv['secs']) else None
        m = n = rm = rn = 0
        for t in ls['tiles']:
            w = Image.open(os.path.join(live, t['file'])).size[0]
            la = load(live, t['file'], t['height'], w, 255)
            bg = float(np.median(la))
            ct = next((x for x in (cs or {}).get('tiles', []) if x['off'] == t['off']), None)
            ca = load(clone, ct['file'], t['height'], w, bg) if ct else np.full_like(la, bg)
            a, b, c, d = score_pair(la, ca); m += a; n += b; rm += c; rn += d
            if sheets:
                sheet = Image.new('L', (w * 2 + 10, t['height']), 128)
                sheet.paste(Image.fromarray(la.astype(np.uint8)), (0, 0)); sheet.paste(Image.fromarray(ca.astype(np.uint8)), (w + 10, 0))
                sheet.convert('RGB').resize(((w * 2 + 10) // 2, t['height'] // 2)).save(os.path.join(sheets, f"{r.strip('/').replace('/', '_')}__{i}__{t['off']}.jpg"), quality=70)
        rows.append({'i': i, 'liveHead': ls['head'], 'cloneHead': cs['head'] if cs else None, 'liveH': ls['h'], 'cloneH': cs['h'] if cs else None,
                     'pct': round(100 * m / n, 1) if n else 100.0, 'rawPct': round(100 * rm / max(rn, 1), 1)})
    res[r] = {'liveDoc': lv['doc'], 'cloneDoc': cv['doc'] if cv else None, 'liveSections': len(lv['secs']), 'cloneSections': len(cv['secs']) if cv else 0, 'sections': rows,
              'min': min([x['pct'] for x in rows] or [0]), 'avg': round(sum(x['pct'] for x in rows) / max(len(rows), 1), 1)}
json.dump(res, open(outp, 'w'), indent=1)
for r, v in res.items():
    print(f"{r}: sections live {v['liveSections']} / clone {v['cloneSections']}, doc {v['liveDoc']} / {v['cloneDoc']}, min {v['min']} avg {v['avg']}")
    for x in v['sections']:
        print(f"   [{x['i']}] {x['pct']:5.1f}% (raw {x['rawPct']:5.1f}%)  h {x['liveH']}/{x['cloneH']}  {x['liveHead'][:40]!r}{'' if x['pct'] >= 80 else '  <80'}")
