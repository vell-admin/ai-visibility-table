// Renders the Periodic Table of AI Visibility as a transparent 1920x1080 frame sequence,
// building in series order (the 12 parts), then encodes a PNG-in-MOV and a ProRes 4444 with alpha.
// Usage: node scripts/render-alpha-video.mjs <outDir> [--pw <path to playwright-core dir>]
// Deterministic: every frame is computed from its index, so renders are reproducible.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const D = JSON.parse(fs.readFileSync(path.join(root, "data/elements.json"), "utf8"));
const outDir = process.argv[2] || path.join(root, "_render");
const pwArg = process.argv.indexOf("--pw");
const pwDir = pwArg > -1 ? process.argv[pwArg + 1] : process.cwd();
const { chromium } = await import(path.join(pwDir, "node_modules/playwright-core/index.mjs"));

const W = 1920, H = 1080, FPS = 30000 / 1001, FRAMES = 420;
const G = { e: "#B7A8FF", r: "#7FDDD6", s: "#FFCE7A", a: "#FF9FB3", c: "#8FE3A9", m: "#8FC3FF", x: "#B0A8C0" };
// The 12 parts of the series, by element number (inclusive). Build order = this order.
const PARTS = [[1, 8], [9, 15], [16, 22], [23, 27], [28, 31], [32, 36], [37, 41], [42, 46], [47, 51], [52, 59], [60, 64], [65, 69]];
// Rows: max 10 per row; Retrieval splits 7+7 (parts 2 and 3).
const ROWS = [[1, 8], [9, 15], [16, 22], [23, 31], [32, 41], [42, 51], [52, 59], [60, 69]];
const SHORT = { "Internal links": "Internal links", "Share of voice": "Share of voice", "Pricing clarity": "Pricing clarity", "Blocked crawler": "Blocked crawler" };

// Timing: title 0-18, then 12 parts across frames 20..360, hold to 420.
const TITLE_IN = 0, BUILD_START = 22, BUILD_END = 364, STAGGER = 2, POP = 11;
const perPart = (BUILD_END - BUILD_START) / PARTS.length; // ~28.5 frames
const startFrame = new Map(); // element number -> first frame
PARTS.forEach(([a, b], pi) => {
  const base = BUILD_START + pi * perPart;
  for (let n = a, k = 0; n <= b; n++, k++) startFrame.set(n, Math.round(base + k * STAGGER));
});

const tiles = D.elements.map((e) => {
  const hx=G[e.group_key]; const rgb=[1,3,5].map(i=>parseInt(hx.slice(i,i+2),16)).join(","); const fill = e.inhibitor ? "rgba(236,232,245,0.22)" : `rgba(${rgb},0.78)`;
  const border = e.inhibitor ? "2px solid rgba(236,232,245,0.85)" : "1px solid rgba(255,255,255,0.35)";
  return `<div class="t${e.inhibitor?" x":""}" data-n="${e.number}" style="background:${fill};border:${border}"><i>${e.number}</i><b>${e.symbol}</b><s>${SHORT[e.name] || e.name}</s></div>`;
});
const rowsHtml = ROWS.map(([a, b]) => {
  const g = D.elements[a - 1].group;
  return `<div class="row"><em class="lab" data-n="${a}">${g}</em>${tiles.slice(a - 1, b).join("")}</div>`;
}).join("");

const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=IBM+Plex+Mono:wght@500&family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap">
<style>
html,body{margin:0;width:${W}px;height:${H}px;background:transparent;overflow:hidden}
.title{position:absolute;top:30px;left:50%;transform:translateX(-50%);padding:16px 34px;border-radius:12px;background:rgba(20,17,28,0.55);border:1px solid rgba(255,255,255,0.55);text-align:center;font-family:'Bricolage Grotesque',Arial,sans-serif;font-weight:800;font-size:50px;letter-spacing:-.03em;color:#fff;line-height:1;white-space:nowrap}
.title em{font-family:'Newsreader',Georgia,serif;font-style:italic;font-weight:400;color:#C0A7FF}
.wrap{position:absolute;left:0;right:0;top:112px;bottom:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:9px}
.row{position:relative;display:flex;gap:9px}
.lab{position:absolute;right:100%;top:50%;transform:translateY(-50%);margin-right:18px;font-style:normal;font-family:'IBM Plex Mono',monospace;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,0.85);text-shadow:0 1px 2px rgba(0,0,0,.6);white-space:nowrap}
.t{position:relative;width:108px;height:108px;border-radius:12px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Bricolage Grotesque',Arial,sans-serif;font-weight:800;color:#1A1526;box-shadow:0 10px 24px -14px rgba(0,0,0,.55);will-change:transform,opacity}
.t b{font-size:38px;line-height:1}
.t s{text-decoration:none;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;margin-top:6px;color:rgba(26,21,38,.72);white-space:nowrap}
.t.x{color:#F2EEF9}.t.x s,.t.x i{color:rgba(242,238,249,.8)}
.t i{position:absolute;top:7px;left:9px;font-style:normal;font-family:'IBM Plex Mono',monospace;font-size:11px;color:rgba(26,21,38,.6)}
</style><body>
<div class="title" id="title">Periodic Table of <em>AI Visibility</em></div>
<div class="wrap">${rowsHtml}</div>
<script>
const START=${JSON.stringify(Object.fromEntries(startFrame))}, POP=${POP};
const ease=t=>{t=Math.max(0,Math.min(1,t));return 1-Math.pow(1-t,3)};
const over=t=>{t=Math.max(0,Math.min(1,t));const c=1.70158;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
window.setFrame=f=>{
  const tt=ease((f-${TITLE_IN})/16);document.getElementById('title').style.opacity=tt;document.getElementById('title').style.transform='translateX(-50%) translateY('+((1-tt)*-14)+'px)';
  document.querySelectorAll('.t').forEach(el=>{const s=START[el.dataset.n];const p=(f-s)/POP;const o=ease(p);const sc=0.55+0.45*over(p);el.style.opacity=o;el.style.transform='scale('+(p<=0?0.55:sc)+')';});
  document.querySelectorAll('.lab').forEach(el=>{const s=START[el.dataset.n];el.style.opacity=ease((f-s-4)/10);});
};
setFrame(0);
</script></body>`;
fs.mkdirSync(path.join(outDir, "frames"), { recursive: true });
const htmlPath = path.join(outDir, "table.html");
fs.writeFileSync(htmlPath, html);

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.goto("file://" + htmlPath);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
const t0 = Date.now();
for (let f = 0; f < FRAMES; f++) {
  await page.evaluate((n) => window.setFrame(n), f);
  await page.screenshot({ path: path.join(outDir, "frames", `f${String(f).padStart(4, "0")}.png`), omitBackground: true, type: "png" });
  if (f % 60 === 0) console.log("frame", f, Math.round((Date.now() - t0) / 1000) + "s");
}
await browser.close();
console.log("frames done", FRAMES, Math.round((Date.now() - t0) / 1000) + "s");

const ff = "/opt/homebrew/bin/ffmpeg";
const seq = path.join(outDir, "frames", "f%04d.png");
const pngMov = path.join(outDir, "periodic-table-ai-visibility-alpha-1080p-png.mov");
const prores = path.join(outDir, "periodic-table-ai-visibility-alpha-1080p-prores4444.mov");
execFileSync(ff, ["-v", "error", "-y", "-framerate", "30000/1001", "-i", seq, "-c:v", "png", "-pix_fmt", "rgba", pngMov]);
execFileSync(ff, ["-v", "error", "-y", "-framerate", "30000/1001", "-i", seq, "-c:v", "prores_ks", "-profile:v", "4444", "-pix_fmt", "yuva444p10le", "-vendor", "apl0", prores]);
console.log("encoded", pngMov, prores);
