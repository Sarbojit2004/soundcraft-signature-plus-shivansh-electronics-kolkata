"""B01 — front of house in a packed club: the Signature Plus 32 on the FOH riser."""
from scene import *
c = gradient((0.035, 0.02, 0.06), (0.05, 0.03, 0.06))
glow(c, 1100, 380, 900, 420, (0.55, 0.10, 0.95), 0.55)   # stage wash, violet
glow(c, 2800, 420, 800, 380, (0.10, 0.45, 1.00), 0.45)   # stage wash, blue
glow(c, 1950, 600, 1200, 380, (1.00, 0.55, 0.20), 0.22)  # warm key on the band
bokeh(c, 34, [(190, 80, 255), (80, 150, 255), (255, 170, 80), (255, 240, 220)], 30, 150, 120, 1100, 0.10, 0.45, seed=11)
surface(c, 1250, (0.055, 0.05, 0.06), (0.015, 0.014, 0.018), spec=0.05, seed=2)
img = to_img(c)
p32 = product(f'{SC}/SOUNDCRAFT Signature Plus 32 (3).webp')
img = place(img, p32, 3000, 1920, 2080, tint=(0.92, 0.90, 0.95), reflect=0.0, shadow_op=0.65)
finish(img, 'b01-foh-club', vignette=0.30)
