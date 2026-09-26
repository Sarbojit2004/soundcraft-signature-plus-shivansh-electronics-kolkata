"""Every Soundcraft Signature Plus image the films show: (repo, file, product, kind, note).

kind: render (3/4 cut-out) · plan (top-down) · rear · side (profile) · low (low front)
      life (real deployment photo) · feature (Soundcraft's feature callout) · banner
"""
R = "soundcraft-signature-plus-shivansh-electronics-kolkata"
F = lambda m, n: f"SOUNDCRAFT Signature Plus {m} ({n}).webp"
O = lambda n: f"SOUNDCRAFT SIGNATURE PLUS OVERVIEW ({n}).webp"

C = [
    (R, F(12, 1), "12", "render", "left"), (R, F(12, 2), "12", "plan", ""), (R, F(12, 3), "12", "render", "right"),
    (R, F(12, 4), "12", "render", "right"), (R, F(12, 5), "12", "rear", ""), (R, F(12, 6), "12", "render", "right"),
    (R, F(12, 7), "12", "low", ""),
    (R, F(16, 1), "16", "low", "left"), (R, F(16, 2), "16", "render", "right"), (R, F(16, 3), "16", "render", "right"),
    (R, F(16, 4), "16", "plan", ""), (R, F(16, 5), "16", "rear", ""), (R, F(16, 6), "16", "low", ""),
    (R, F(16, 7), "16", "life", "band recording"), (R, F(16, 8), "16", "life", "acoustic duo"),
    (R, F(22, 1), "22", "low", "front"), (R, F(22, 2), "22", "plan", ""), (R, F(22, 3), "22", "render", "left"),
    (R, F(22, 4), "22", "render", "right"), (R, F(22, 5), "22", "side", ""), (R, F(22, 6), "22", "low", "right"),
    (R, F(22, 7), "22", "rear", ""), (R, F(22, 8), "22", "side", ""), (R, F(22, 9), "22", "render", "right"),
    (R, F(22, 10), "22", "life", "podcast"), (R, F(22, 11), "22", "life", "home studio"),
    (R, F(32, 1), "32", "plan", ""), (R, F(32, 2), "32", "low", ""), (R, F(32, 3), "32", "render", "right"),
    (R, F(32, 4), "32", "low", "front"), (R, F(32, 5), "32", "rear", ""), (R, F(32, 6), "32", "render", "right"),
    (R, F(32, 7), "32", "life", "live concert"),
    (R, O(1), "all", "feature", "Ghost preamps"), (R, O(2), "all", "feature", "USB-C"), (R, O(3), "all", "feature", "Lexicon"),
    (R, O(4), "all", "feature", "colour-coded knobs"), (R, O(5), "all", "feature", "aux pre/post"),
    (R, O(6), "all", "feature", "dual metering"), (R, O(7), "all", "feature", "four sizes"),
    (R, "SOUNDCRAFT SIGNATURE PLUS OVERVIEW.jpg", "all", "banner", "series"),
]
SERIES = {"12": "p12", "16": "p16", "22": "p22", "32": "p32", "all": "all"}
