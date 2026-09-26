// Which assets the reel actually puts on screen, and which it does not.
//
// A repository with 33 product plates and a 29-shot edit will always leave
// most of them unused; the point of this ledger is that the omissions are
// VISIBLE and therefore arguable, rather than an accident nobody noticed.
//
// Run: node --experimental-strip-types scripts/coverage.mjs

import { REEL_SEGMENTS, buildTimeline } from "../src/script.ts";
import { REEL_PLAN, buildShots } from "../src/shots.ts";
import { ASSETS, CLIPS, MISSING_BROLL } from "../src/assets.generated.ts";

const { segments } = buildTimeline(REEL_SEGMENTS);
const shots = buildShots(segments, REEL_PLAN);

const used = new Map();
const hit = (slug, seg) => {
  if (!used.has(slug)) used.set(slug, []);
  used.get(slug).push(seg);
};
for (const s of shots) {
  if (s.kind === "stack" || s.kind === "mosaic") s.slugs.forEach((x) => hit(x, s.segment));
  else if (s.kind === "clip" || s.kind === "broll") hit(s.slug, s.segment);
  else hit(s.slug, s.segment);
}

const KIND = { render: "3/4 render", plan: "top-down plan", panel: "rear / edge-on", photo: "photograph" };

let out = "# Asset coverage — Signature Plus 90 s reel\n\n";
out += `${shots.length} shots. ${used.size} distinct assets on screen.\n\n`;

out += "## On screen\n\n| asset | kind | model | where |\n|---|---|---|---|\n";
for (const a of ASSETS) {
  if (!used.has(a.slug)) continue;
  const segs = [...new Set(used.get(a.slug))].join(", ");
  out += `| \`${a.slug}\` | ${KIND[a.kind] ?? a.kind} | ${a.model || "—"} | ${segs} |\n`;
}
for (const c of CLIPS) {
  if (!used.has(c.slug)) continue;
  const segs = [...new Set(used.get(c.slug))].join(", ");
  const miss = MISSING_BROLL.includes(c.slug) ? " *(file absent — fallback on screen)*" : "";
  out += `| \`${c.slug}\` | ${c.kind === "broll" ? "B-roll" : "official cut"} | — | ${segs}${miss} |\n`;
}
for (const s of MISSING_BROLL) {
  out += `| \`${s}\` | B-roll | — | **not on disk — fallback plate on screen** |\n`;
}

out += "\n## Not used\n\n";
const unused = ASSETS.filter((a) => !used.has(a.slug));
out += `${unused.length} of ${ASSETS.length} product plates. A 29-shot edit cannot carry 33, and most of\n`;
out += "what is left out is near-duplicate three-quarter renders, which cost the\n";
out += "film nothing. Two omissions are NOT that, and are worth stating plainly:\n\n";
out += "* **All six rear-panel and edge-on views are unused, and that is now a\n";
out += "  deliberate decision rather than an oversight.** An earlier version of\n";
out += "  this ledger called it \"a real gap, not a trim\", on the assumption that\n";
out += "  those plates showed the connector row the `connect` chapter talks\n";
out += "  about. They do not. Every one of them is the BACK OF THE CHASSIS: a\n";
out += "  large soundcraft wordmark, the model name, the Ghost / Sapphyre / dbx /\n";
out += "  Lexicon / GB badge row, an IEC inlet and a power switch. There is not a\n";
out += "  single audio connector on any of them.\n";
out += "\n";
out += "  The Signature Plus carries all of its I/O on the TOP surface — which is\n";
out += "  why the plan has `connectors`, `usbC`, `outXlr`, `outJacks` and `hiZ`\n";
out += "  regions, and why `connect` already pushes into them. The chapter was\n";
out += "  never missing the sockets; it shows them where they actually are.\n";
out += "\n";
out += "  Using one would also break the brief outright: every plate is covered\n";
out += "  in brand marks, and nothing branded appears before the six-second end\n";
out += "  screen.\n";
out += "* **Two of the four top-down plans are unused** (`p16-4`, `p22-2`). Only\n";
out += "  the 32 and the 12 are on screen, which is enough for the `scale`\n";
out += "  argument — smallest against largest — but 'every plan is used' would\n";
out += "  be untrue.\n\n";
out += "Every MODEL is represented on screen.\n\n";
out += "| asset | kind | model |\n|---|---|---|\n";
for (const a of unused) out += `| \`${a.slug}\` | ${KIND[a.kind] ?? a.kind} | ${a.model || "—"} |\n`;

out += "\n## By model\n\n| model | plates in repo | on screen |\n|---|---|---|\n";
for (const m of [12, 16, 22, 32]) {
  const all = ASSETS.filter((a) => a.model === m);
  out += `| Signature Plus ${m} | ${all.length} | ${all.filter((a) => used.has(a.slug)).length} |\n`;
}

console.log(out);
