// Check the things a render will not tell you about until it is too late.
//
// A 4K render of this reel takes long enough that discovering a shot outlasts
// its clip, or that a caption's emphasis never matched and quietly fell through
// to the longest-word fallback, is worth catching in two seconds instead.
//
//   1. the body lands exactly on BODY_LEN, and the four B-roll blocks are
//      exactly 5.000 s each
//   2. every caption's declared emphasis actually matches a word in it
//   3. no shot outlives the clip it is showing (which would freeze or black)
//   4. every asset and clip a shot names exists in the generated manifest
//
// Run: npm run validate

import { BODY_LEN, REEL_SEGMENTS, buildTimeline } from "../src/script.ts";
import { REEL_PLAN, buildShots } from "../src/shots.ts";
import { ASSETS, CLIPS, MISSING_BROLL } from "../src/assets.generated.ts";

const FPS = 30;
let errors = 0;
let warnings = 0;
const bad = (m) => { console.error("  ✗ " + m); errors++; };
const warn = (m) => { console.warn("  ! " + m); warnings++; };

const tl = buildTimeline(REEL_SEGMENTS);

// ── 1. timing ────────────────────────────────────────────────────────────────
console.log("\ntimeline");
console.log(`  ${tl.segments.length} segments · ${tl.words} spoken words`);
console.log(`  fixed  ${tl.fixedLen.toFixed(3)} s across the four B-roll blocks`);
console.log(`  fit    ${tl.fit.toFixed(4)}x  ->  ${tl.effectiveWpm.toFixed(1)} wpm effective`);
console.log(`  total  ${tl.total.toFixed(3)} s  (target ${BODY_LEN.toFixed(3)} s)`);

if (Math.abs(tl.total - BODY_LEN) > 0.002) {
  bad(`body is ${tl.total.toFixed(3)} s, not ${BODY_LEN.toFixed(3)} s`);
}
if (tl.fit < 0.9 || tl.fit > 1.1) {
  warn(`fit factor ${tl.fit.toFixed(3)} is outside 0.9-1.1 — the script is the`
     + ` wrong length for the runtime, not the arithmetic`);
}
for (const s of tl.segments) {
  if (s.fixed === undefined) continue;
  const got = s.end - s.start;
  if (Math.abs(got - s.fixed) > 0.002) {
    bad(`B-roll block "${s.id}" is ${got.toFixed(3)} s, not ${s.fixed.toFixed(3)} s`);
  }
}

console.log("\nsegments");
for (const s of tl.segments) {
  const tag = s.fixed !== undefined ? "FIXED" : "     ";
  console.log(
    `  ${tag} ${s.id.padEnd(9)} ${s.start.toFixed(2).padStart(6)} -> ${s.end.toFixed(2).padStart(6)}` +
    `  (${(s.end - s.start).toFixed(2).padStart(5)} s, ${String(s.captions.length).padStart(2)} caps)`,
  );
}

// ── 2. every emphasis matches ────────────────────────────────────────────────
// Mirrors splitCaption()'s matcher in Caption.tsx. Kept in step by hand because
// that file is .tsx and Node's type stripping does not read JSX.
const norm = (x) => x.replace(/^[^\w+]+/, "").replace(/[^\w+]+$/, "").toLowerCase();
console.log("\ncaption emphasis");
let unmatched = 0;
for (const seg of tl.segments) {
  for (const c of seg.captions) {
    const words = c.t.trim().split(/\s+/).filter(Boolean);
    const target = (c.e ?? "").split(/\s+/).filter(Boolean);
    let hit = false;
    for (let i = 0; i + target.length <= words.length && !hit; i++) {
      if (target.every((tw, k) => norm(words[i + k]) === norm(tw))) hit = true;
    }
    if (!hit) {
      bad(`${seg.id}: emphasis "${c.e}" does not occur in "${c.t}" — the script`
        + ` face will land on the longest word instead`);
      unmatched++;
    }
  }
}
if (!unmatched) console.log(`  all ${tl.segments.reduce((a, s) => a + s.captions.length, 0)} captions matched`);

// ── 3 & 4. shots ─────────────────────────────────────────────────────────────
const shots = buildShots(tl.segments, REEL_PLAN);
const bySlug = new Map(ASSETS.map((a) => [a.slug, a]));
const clipBySlug = new Map(CLIPS.map((c) => [c.slug, c]));

console.log(`\nshots — ${shots.length}`);
for (let i = 0; i < shots.length; i++) {
  const s = shots[i];
  const next = shots[i + 1];
  const to = next ? next.start : BODY_LEN;
  const slot = to - s.start;

  const slugs =
    s.kind === "stack" || s.kind === "mosaic" ? s.slugs
    : s.kind === "clip" || s.kind === "broll" ? []
    : [s.slug];
  for (const sl of slugs) if (!bySlug.has(sl)) bad(`shot ${i} (${s.segment}) names missing asset "${sl}"`);

  if (s.kind === "clip" || s.kind === "broll") {
    const c = clipBySlug.get(s.slug);
    if (!c) {
      bad(`shot ${i} (${s.segment}) names missing clip "${s.slug}"`);
    } else if (slot > c.dur + 0.02) {
      // The shot would run past the end of its own footage and hold a frozen
      // frame for the remainder.
      bad(`shot ${i} (${s.segment}) holds "${s.slug}" for ${slot.toFixed(2)} s`
        + ` but the clip is only ${c.dur.toFixed(2)} s — ${(slot - c.dur).toFixed(2)} s would freeze`);
    } else if (c.dur - slot > 1.2) {
      warn(`shot ${i} (${s.segment}) uses only ${slot.toFixed(2)} s of the`
         + ` ${c.dur.toFixed(2)} s "${s.slug}"`);
    }
  }
}

if (MISSING_BROLL.length) {
  console.log(`\nB-roll: ${MISSING_BROLL.length} of 4 not on disk — those blocks are`);
  console.log(`  rendering their fallback plate. Timing is unaffected.`);
  for (const s of MISSING_BROLL) console.log(`    ${s}`);
}

console.log(`\n${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}`);
process.exit(errors ? 1 : 0);
