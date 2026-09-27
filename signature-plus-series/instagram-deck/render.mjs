// Renders every .slide in deck.html to out/png/slide-NN.png at 2160x2160 (2x).
// Usage: node render.mjs [slideNumber ...]
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const here = path.dirname(fileURLToPath(import.meta.url));
const only = process.argv.slice(2).map(Number);
const out = path.join(here, "out", "png");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--allow-file-access-from-files", "--font-render-hinting=none"],
});
const page = await browser.newPage({ viewport: { width: 1180, height: 1180 }, deviceScaleFactor: 2 });
await page.goto("file://" + path.join(here, "deck.html"));
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
});
await page.waitForTimeout(300);
const slides = await page.$$(".slide");
for (let i = 0; i < slides.length; i++) {
  if (only.length && !only.includes(i + 1)) continue;
  const f = path.join(out, `slide-${String(i + 1).padStart(2, "0")}.png`);
  await slides[i].screenshot({ path: f });
  console.log(f);
}
await browser.close();
