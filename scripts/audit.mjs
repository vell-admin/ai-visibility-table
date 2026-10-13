#!/usr/bin/env node
// The Blank-Square Audit, the machine-checkable half.
// Fetches one page plus its robots.txt, sitemap.xml, llms.txt and agents.txt, checks every
// element of the Periodic Table of AI Visibility that a script can settle, and writes a
// scorecard. Elements that need a person (Engines, Artifacts, Channels, Measurement, most
// Signals) come out Pending with the exact check to run by hand, taken from elements.json.
//
//   node scripts/audit.mjs https://www.itsrondavis.com/ --out audits/home.md
//   node scripts/audit.mjs https://www.itsrondavis.com/ --html saved.html --llms-origin https://agents.itsrondavis.com
//
// Flags: --html FILE (use a saved page instead of fetching)  --robots FILE  --sitemap FILE
//        --llms FILE  --agents FILE  --llms-origin URL (where llms.txt/agents.txt live, if not the page origin)
//        --out FILE (markdown; JSON goes next to it as .json)  --quiet
// Node 18+. No dependencies. Nothing leaves your machine except the fetches you asked for.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith("--"));
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
if (!url) { console.error("usage: node scripts/audit.mjs <url> [--out file.md] [--html file] [--llms-origin url]"); process.exit(2); }
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ELEMENTS = JSON.parse(fs.readFileSync(path.join(root, "data/elements.json"), "utf8")).elements;
const byNum = Object.fromEntries(ELEMENTS.map((e) => [e.number, e]));
const page = new URL(url);
const origin = page.origin;
const llmsOrigin = opt("--llms-origin") || origin;
const UA = "ai-visibility-audit/1.0 (+https://github.com/vell-admin/ai-visibility-table)";

async function get(u, file) {
  if (file) return { status: 200, text: fs.readFileSync(file, "utf8"), from: file };
  try {
    const r = await fetch(u, { headers: { "user-agent": UA, accept: "text/html,text/plain,*/*" }, redirect: "follow" });
    const text = await r.text();
    return { status: r.status, text, from: u, finalUrl: r.url };
  } catch (e) { return { status: 0, text: "", from: u, error: String(e.message || e) }; }
}

const [html, robots, sitemap, llms, agents] = await Promise.all([
  get(url, opt("--html")),
  get(`${origin}/robots.txt`, opt("--robots")),
  get(`${origin}/sitemap.xml`, opt("--sitemap")),
  get(`${llmsOrigin}/llms.txt`, opt("--llms")),
  get(`${llmsOrigin}/agents.txt`, opt("--agents")),
]);

// ── helpers ──
const H = html.text;
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
const textOf = (s) => strip(s).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, " ").trim();
const visible = textOf(H);
const words = visible.split(/\s+/).filter(Boolean);
const first100 = words.slice(0, 100).join(" ");
const attr = (tag, name) => { const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i")); return m ? (m[2] ?? m[3] ?? m[4]) : undefined; };
const tags = (name) => [...H.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => m[0]);
const heads = (lvl) => [...strip(H).matchAll(new RegExp(`<h${lvl}\\b[^>]*>([\\s\\S]*?)<\\/h${lvl}>`, "gi"))].map((m) => textOf(m[1]));
const title = (H.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1].trim();
const metaDesc = tags("meta").filter((t) => /name\s*=\s*["']?description/i.test(t)).map((t) => attr(t, "content"))[0] || "";
const canonical = tags("link").filter((t) => /rel\s*=\s*["']?canonical/i.test(t)).map((t) => attr(t, "href"))[0];
const ld = [...H.matchAll(/<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => { try { return JSON.parse(m[1]); } catch { return { _invalid: true }; } });
const ldTypes = []; const walk = (o) => { if (!o || typeof o !== "object") return; if (Array.isArray(o)) return o.forEach(walk); if (o["@type"]) ldTypes.push(...[].concat(o["@type"])); Object.values(o).forEach(walk); }; ld.forEach(walk);
const ldDates = []; const walkD = (o) => { if (!o || typeof o !== "object") return; if (Array.isArray(o)) return o.forEach(walkD); for (const [k, v] of Object.entries(o)) { if (/^(datePublished|dateModified|uploadDate)$/.test(k)) ldDates.push(`${k}=${v}`); walkD(v); } }; ld.forEach(walkD);
const imgs = tags("img"); const imgsNoAlt = imgs.filter((t) => { const a = attr(t, "alt"); return a === undefined || a.trim() === ""; });
const anchors = [...strip(H).matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({ href: attr(m[1], "href") || "", text: textOf(m[2]) }));
const internal = anchors.filter((a) => a.href.startsWith("/") || a.href.startsWith(origin));
const weakAnchors = anchors.filter((a) => /^(learn more|click here|read more|here|more)$/i.test(a.text));
const h1 = heads(1), h2 = heads(2), h3 = heads(3);
const labelish = [...h2, ...h3].filter((h) => h.split(/\s+/).length <= 3);
const iframes = tags("iframe").map((t) => attr(t, "src") || "");
const videoEmbeds = iframes.filter((s) => /youtube|youtu\.be|vimeo|wistia|loom/i.test(s)).concat(/youtube(-nocookie)?\.com\/(embed|watch)|youtu\.be\//i.test(H) ? ["(youtube link or lite-embed in page)"] : []);
const SUPERLATIVES = ["leading", "best-in-class", "world-class", "cutting-edge", "state-of-the-art", "trusted by", "enterprise-grade", "seamless", "powerful", "innovative", "next-generation", "revolutionary", "unparalleled", "industry-leading", "best"]; 
const sup = SUPERLATIVES.filter((w) => new RegExp(`\\b${w.replace(/[-]/g, "\\-")}\\b`, "i").test(first100 + " " + words.slice(100, 300).join(" ")));
const numbers = visible.match(/(\$\s?\d[\d,]*(\.\d+)?|\b\d[\d,]*(\.\d+)?\s?(%|percent|x|×|days?|weeks?|hours?|minutes?|months?|years?|listings?|partners?|elements?|pages?)\b)/gi) || [];
const prices = visible.match(/\$\s?\d[\d,]*(\.\d+)?(\s?\/\s?\w+)?/g) || [];
const dateText = visible.match(/\b(20\d\d-\d\d-\d\d|(updated|published|last reviewed|audited)\s*[:·-]?\s*[A-Za-z]*\s*\d{1,2}?,?\s*20\d\d|\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.? \d{1,2}, 20\d\d)/gi) || [];
const timeTags = tags("time").map((t) => attr(t, "datetime")).filter(Boolean);
const qHeads = [...h2, ...h3].filter((h) => h.trim().endsWith("?"));
const definition = [...visible.slice(0, 2000).matchAll(/\b([A-Z][\w-]*(?:\s[\w-]+){0,4})\s+is\s+(whether|the|a|an)\s[^.]{20,200}\./g)].map((m) => m[0]).find((d) => !/^(Every|This|That|Each|The|Here|There|It|One|Nothing|Everything)\b/.test(d));
const acronyms = (visible.match(/\b[A-Z]{2,5}\b/g) || []).filter((a) => !/^(AI|US|USA|AWS|PDF|CSV|URL|SEO|FAQ|GTM|CEO|CTO|B2B)$/.test(a));
const emailInputs = tags("input").filter((t) => /type\s*=\s*["']?email/i.test(t)).length;
const robotsLines = robots.status === 200 ? robots.text.split(/\r?\n/) : [];
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Googlebot", "Bingbot", "CCBot", "Amazonbot", "Applebot", "Applebot-Extended", "meta-externalagent", "Bytespider"];
const blocked = []; { let ua = null; for (const l of robotsLines) { const m = l.match(/^\s*user-agent:\s*(.+?)\s*$/i); if (m) { ua = m[1]; continue; } const d = l.match(/^\s*disallow:\s*(.*?)\s*$/i); if (d && ua && d[1] === "/") { if (ua === "*" || AI_BOTS.some((b) => b.toLowerCase() === ua.toLowerCase())) blocked.push(ua); } } }
const sitemapOk = sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.text);
const pagePath = page.pathname.replace(/\/$/, "") || "/";
const inSitemap = sitemapOk && (sitemap.text.includes(`<loc>${origin}${page.pathname}</loc>`) || sitemap.text.includes(`<loc>${origin}${pagePath}</loc>`) || sitemap.text.includes(`<loc>${origin}${pagePath}/</loc>`));
const lastmod = sitemapOk && /<lastmod>/.test(sitemap.text);

// ── statuses ──
// P = Present, B = Blank, I = Inhibitor present, N = Not applicable (test passed), X = Pending (needs a person)
const rows = [];
const mark = (n, status, reason) => rows.push({ number: n, symbol: byNum[n].symbol, name: byNum[n].name, group: byNum[n].group, time_to_effect: byNum[n].time_to_effect, status, reason });
const pending = (n, why) => mark(n, "Pending", `${why} The move: ${byNum[n].the_move}`);

// Engines 1–8: a test list, never scored by script.
for (let n = 1; n <= 8; n++) pending(n, `Ask ${byNum[n].name} one real buyer question and write down every company it names.`);
// Retrieval 9–22
mark(9, robots.status === 200 ? (blocked.length ? "Inhibitor present" : "Present") : "Blank", robots.status === 200 ? (blocked.length ? `robots.txt blocks ${blocked.join(", ")} with Disallow: /.` : `robots.txt served (${robotsLines.length} lines); no AI crawler fully disallowed.`) : `GET /robots.txt returned ${robots.status || robots.error}.`);
mark(10, sitemapOk ? (inSitemap ? "Present" : "Blank") : "Blank", sitemapOk ? (inSitemap ? `Page is listed in /sitemap.xml${lastmod ? " with lastmod" : " (no lastmod)"}.` : `sitemap served but ${page.pathname} is not in it.`) : `GET /sitemap.xml returned ${sitemap.status || sitemap.error} or no <urlset>.`);
mark(11, llms.status === 200 && llms.text.trim().startsWith("#") ? "Present" : "Blank", llms.status === 200 ? `llms.txt served from ${llms.from} (${llms.text.length} chars).` : `GET ${llmsOrigin}/llms.txt returned ${llms.status || llms.error}.`);
mark(12, agents.status === 200 && agents.text.length > 50 ? "Present" : "Blank", agents.status === 200 ? `agents.txt served from ${agents.from}.` : `GET ${llmsOrigin}/agents.txt returned ${agents.status || agents.error}.`);
mark(13, ld.length && !ld.some((x) => x._invalid) ? "Present" : ld.length ? "Blank" : "Blank", ld.length ? `${ld.length} ld+json block(s); types: ${[...new Set(ldTypes)].join(", ") || "none"}${ld.some((x) => x._invalid) ? "; one block is invalid JSON" : ""}.` : "No application/ld+json in the HTML.");
pending(14, "Entity needs the profile list: check one spelling of the name across site, LinkedIn, YouTube, GitHub and JSON-LD sameAs.");
pending(15, `Tear one H2 section out and read it alone. ${h2.length} H2 sections to try.`);
mark(16, words.length >= 150 ? "Present" : "Blank", `${words.length} visible words in the raw HTML (before any JavaScript).`);
mark(17, timeTags.length || dateText.length ? "Present" : ldDates.length ? "Blank" : "Blank", timeTags.length || dateText.length ? `Visible date: ${[...timeTags, ...dateText].slice(0, 3).join("; ")}.` : ldDates.length ? `Date only in JSON-LD (${ldDates.slice(0, 2).join("; ")}); no visible published/updated date for a reader.` : "No visible or structured published/updated date.");
mark(18, canonical ? (canonical.replace(/\/$/, "") === url.replace(/\/$/, "") || canonical.replace(/\/$/, "") === page.origin + pagePath ? "Present" : "Blank") : "Blank", canonical ? `rel=canonical → ${canonical}.` : "No rel=canonical.");
mark(19, videoEmbeds.length ? "Pending" : "Not applicable", videoEmbeds.length ? `${videoEmbeds.length} video embed(s) found; confirm a transcript or text summary sits next to each.` : "No video on the page.");
mark(20, imgs.length === 0 ? "Not applicable" : imgsNoAlt.length === 0 ? "Present" : "Blank", `${imgs.length} images, ${imgsNoAlt.length} without alt text.`);
mark(21, h1.length === 1 && labelish.length <= Math.ceil((h2.length + h3.length) / 2) ? "Present" : "Blank", `H1: ${h1.length} (${h1[0]?.slice(0, 80) || "none"}); H2: ${h2.length}; H3: ${h3.length}; label-like headings (≤3 words): ${labelish.length}.`);
mark(22, internal.length >= 5 && weakAnchors.length === 0 ? "Present" : "Blank", `${internal.length} internal links; ${weakAnchors.length} weak anchors (${weakAnchors.map((a) => a.text).slice(0, 3).join(", ") || "none"}).`);
// Signals 23–31
mark(23, sup.length === 0 && words.length ? "Present" : "Blank", sup.length ? `Superlatives in the first 300 words: ${sup.join(", ")}.` : `First 100 words carry no stock superlative. Opening: “${first100.slice(0, 140)}…”`);
mark(24, numbers.length >= 3 ? "Present" : "Blank", `${numbers.length} figures with a unit on the page (e.g. ${numbers.slice(0, 4).join("; ")}).`);
pending(25, `Proof needs a source and a date next to a number; ${numbers.length} numbers found, check which carry both.`);
pending(26, "Find the changed state and its cost in the copy.");
pending(27, "Find a page that names alternatives.");
mark(28, prices.length ? "Present" : "Blank", prices.length ? `Prices on page: ${[...new Set(prices)].slice(0, 6).join(", ")}.` : "No currency amount on the page.");
mark(29, videoEmbeds.length ? (ldTypes.includes("VideoObject") ? "Present" : "Blank") : "Blank", videoEmbeds.length ? `Video present; VideoObject JSON-LD ${ldTypes.includes("VideoObject") ? "found" : "missing"}.` : "No video or audio on the page.");
mark(30, qHeads.length >= 3 || ldTypes.includes("FAQPage") ? "Present" : "Blank", `${qHeads.length} question-shaped headings; FAQPage JSON-LD ${ldTypes.includes("FAQPage") ? "present" : "absent"}.`);
mark(31, definition ? "Present" : "Blank", definition ? `Definition near the top: “${definition.slice(0, 160)}”` : "No “X is Y” sentence in the first 1,500 characters.");
// Artifacts 32–41, Channels 42–51, Measurement 52–59
for (let n = 32; n <= 41; n++) pending(n, "Name one example with a URL, or mark Blank.");
for (let n = 42; n <= 51; n++) pending(n, "Paste the profile URL, or mark Blank / Not applicable with a reason.");
for (let n = 52; n <= 59; n++) pending(n, "Needs the frozen prompt set and the Search Console / analytics views.");
// Inhibitors 60–69
mark(60, blocked.length ? "Inhibitor present" : robots.status === 200 ? "Not applicable" : "Pending", blocked.length ? `robots.txt disallows ${blocked.join(", ")}.` : robots.status === 200 ? "Test passed: no AI crawler blocked in robots.txt." : "robots.txt not readable.");
mark(61, words.length < 150 ? "Inhibitor present" : "Not applicable", words.length < 150 ? `Only ${words.length} words in raw HTML; content is assembled by JavaScript.` : `Test passed: ${words.length} words server-rendered.`);
mark(62, "Pending", `${emailInputs} email field(s) on the page. Gated only if the main content sits behind one.`);
mark(63, "Pending", "Paywall: does any cited page require login or payment to read?");
mark(64, acronyms.length / Math.max(words.length, 1) > 0.02 ? "Inhibitor present" : "Not applicable", `${acronyms.length} unexplained acronyms per ${words.length} words (${[...new Set(acronyms)].slice(0, 6).join(", ") || "none"}).`);
mark(65, sup.length ? "Inhibitor present" : "Not applicable", sup.length ? `Vague claims: ${sup.join(", ")}.` : "Test passed: no stock superlative in the opening.");
mark(66, "Pending", `Duplicate: does the title “${title.slice(0, 60)}” or the meta description appear on another URL?`);
mark(67, inSitemap && internal.length ? "Not applicable" : "Pending", inSitemap ? "In the sitemap and links out; check one inbound internal link exists." : "Not in sitemap; check inbound links.");
mark(68, "Pending", "Slop: read one section aloud; would a stranger learn one checkable fact from it?");
mark(69, ldDates.length || timeTags.length || dateText.length ? "Not applicable" : "Inhibitor present", ldDates.length || timeTags.length || dateText.length ? "Test passed: a date is present." : "No date anywhere on the page.");

// ── output ──
const counts = {}; for (const r of rows) { counts[r.group] ??= {}; counts[r.group][r.status] = (counts[r.group][r.status] || 0) + 1; }
const tte = { days: "d", weeks: "w", quarters: "q" };
const groups = [...new Set(rows.map((r) => r.group))];
let md = `# Blank-Square Audit · ${url}\n\nRun ${new Date().toISOString().slice(0, 10)} by scripts/audit.mjs (machine-checkable half). Page: HTTP ${html.status}${html.finalUrl && html.finalUrl !== url ? ` → ${html.finalUrl}` : ""} · ${words.length} visible words · title “${title}” (${title.length} chars) · meta description ${metaDesc.length} chars.\n\n`;
md += `Inputs read: page ${html.from}; robots.txt ${robots.status}; sitemap.xml ${sitemap.status}; llms.txt ${llms.status} (${llmsOrigin}); agents.txt ${agents.status}.\n\n`;
for (const g of groups) {
  md += `## ${g}\n\n| # | Element | Status | Reason to verify | Effect |\n|---|---|---|---|---|\n`;
  for (const r of rows.filter((r) => r.group === g)) md += `| ${r.number} | ${r.symbol} ${r.name} | ${r.status} | ${r.reason.replace(/\|/g, "/")} | ${tte[r.time_to_effect]} |\n`;
  md += `\nCounts: ${Object.entries(counts[g]).map(([k, v]) => `${k} ${v}`).join(" · ")}\n\n`;
}
const inhib = rows.filter((r) => r.status === "Inhibitor present"); const blank = rows.filter((r) => r.status === "Blank");
const order = { days: 0, weeks: 1, quarters: 2 };
md += `## Subtract first\n\n${inhib.length ? inhib.sort((a, b) => order[a.time_to_effect] - order[b.time_to_effect]).map((r) => `- ${r.symbol} ${r.name} (${tte[r.time_to_effect]}): ${byNum[r.number].the_move}`).join("\n") : "No inhibitor the script can see. Run the inhibitor-sweep skill for the rest."}\n\n`;
md += `## Your weekend (Blank squares tagged days)\n\n${blank.filter((r) => r.time_to_effect === "days").map((r) => `- ${r.symbol} ${r.name}: ${byNum[r.number].the_move}`).join("\n") || "None."}\n\n`;
md += `## Blank squares tagged weeks and quarters\n\n${blank.filter((r) => r.time_to_effect !== "days").sort((a, b) => order[a.time_to_effect] - order[b.time_to_effect]).map((r) => `- ${r.symbol} ${r.name} (${tte[r.time_to_effect]}): ${byNum[r.number].the_move}`).join("\n") || "None."}\n\n`;
md += `## Pending, needs a person\n\n${rows.filter((r) => r.status === "Pending").length} squares. Run skills/ai-visibility-audit/SKILL.md with the pasted page, three buyer questions, and your profile list to settle them.\n`;
const out = opt("--out");
if (out) { fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, md); fs.writeFileSync(out.replace(/\.md$/, "") + ".json", JSON.stringify({ url, run: new Date().toISOString(), title, words: words.length, rows }, null, 1)); }
if (!args.includes("--quiet")) console.log(out ? `wrote ${out}` : md);
