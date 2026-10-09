// Builds kajabi/ai-visibility-page.json — the Nova theme settings payload for
// itsrondavis.com/ai-visibility (landing page 2152322979, theme 2167839250).
// Run: node scripts/build-kajabi.mjs
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const D = JSON.parse(fs.readFileSync(path.join(root, "data/elements.json"), "utf8"));
const Q = JSON.parse(fs.readFileSync(path.join(root, "data/questions.json"), "utf8"));
const CHROME = JSON.parse(fs.readFileSync(path.join(root, "kajabi/chrome.json"), "utf8"));

const CANON = "https://www.itsrondavis.com/ai-visibility";
const REPO = "https://github.com/vell-admin/ai-visibility-table";
const PAGES = "https://vell-admin.github.io/ai-visibility-table/table/";
const CHECKOUT = "https://www.itsrondavis.com/offers/FudyCMoT/checkout";
const NEWSLETTER_FORM = "2149622400";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const G = { e: "#B7A8FF", r: "#7FDDD6", s: "#FFCE7A", a: "#FF9FB3", c: "#8FE3A9", m: "#8FC3FF", x: "#B0A8C0" };
const T = { days: "d", weeks: "w", quarters: "q" };

const css = `<style>
#ptv{--ink:#16121f;--mut:#5b5566;--line:rgba(22,18,31,.12);--purple:#330582;--accent:#9a34cd;--paper:#f7f5fb;--surf:#fff;--mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--ink);font-family:'Manrope','Inter',-apple-system,sans-serif}
#ptv .wrap{max-width:1184px;margin:0 auto;padding:0 28px}
#ptv .sec{padding:56px 0}
#ptv .sec.tl{background:var(--paper)}
#ptv .eye{display:inline-flex;align-items:center;gap:10px;font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--purple);margin:0 0 14px}
#ptv .eye .bar{width:22px;height:2px;background:linear-gradient(100deg,#330582,#9a34cd)}
#ptv h1{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:clamp(30px,3.2vw,40px);line-height:1.08;letter-spacing:-.022em;margin:0 0 16px;max-width:22ch}
#ptv h1 em{font-style:italic;background:linear-gradient(100deg,#330582,#9a34cd);-webkit-background-clip:text;background-clip:text;color:transparent}
#ptv h2{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:clamp(24px,2.6vw,32px);line-height:1.15;letter-spacing:-.02em;margin:0 0 12px;max-width:30ch}
#ptv h3{font-family:'Fraunces',Georgia,serif;font-weight:500;font-size:18px;line-height:1.25;margin:0 0 6px}
#ptv p{font-size:16px;line-height:1.6;color:var(--ink);margin:0 0 14px;max-width:68ch}
#ptv p.lede{font-size:17px;color:var(--ink)}
#ptv p.sub,#ptv .sub{color:var(--mut)}
#ptv .def{border-left:3px solid var(--purple);padding:4px 0 4px 18px;margin:18px 0 22px;max-width:70ch}
#ptv .def p{margin:0;font-size:17px}
#ptv .ctas{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0 0}
#ptv .btn{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 18px;border-radius:6px;font-size:13px;font-weight:600;font-family:'Manrope','Inter',sans-serif;text-decoration:none;border:1px solid var(--purple);color:var(--purple);background:transparent;transition:background .14s,color .14s;white-space:nowrap}
#ptv .btn:hover{background:var(--purple);color:#fff}
#ptv .btn.fill{background:var(--purple);color:#fff}
#ptv .btn.fill:hover{background:#26046a}
#ptv .meta{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut);margin:0 0 10px}
#ptv .frame{position:relative;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:#fff;margin:18px 0 10px}
#ptv .frame iframe{display:block;width:100%;height:1500px;border:0}
#ptv .frame-note{font-size:13px;color:var(--mut);margin:0}
#ptv .groups{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;margin-top:22px}
#ptv .grp{background:#fff;border:1px solid var(--line);border-radius:6px;padding:16px 18px}
#ptv .grp h3{display:flex;align-items:center;gap:10px}
#ptv .grp h3 .sw{width:14px;height:14px;border-radius:4px;flex:0 0 14px}
#ptv .grp .note{font-size:13px;color:var(--mut);margin:0 0 10px}
#ptv .grp ul{list-style:none;margin:0;padding:0}
#ptv .grp li{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-top:1px solid var(--line);font-size:14px;line-height:1.45}
#ptv .grp li:first-child{border-top:0}
#ptv .sym{font-family:var(--mono);font-weight:600;font-size:12px;min-width:30px;padding:2px 6px;border-radius:4px;color:#16121f;text-align:center;flex:0 0 auto}
#ptv .sym.x{background:transparent;border:1.5px solid #8a8199}
#ptv .nm{font-weight:600}
#ptv .tt{font-family:var(--mono);font-size:11px;color:var(--mut);margin-left:auto;flex:0 0 auto}
#ptv .key{display:flex;flex-wrap:wrap;gap:18px;font-size:13px;color:var(--mut);margin:16px 0 0}
#ptv .key b{color:var(--ink)}
#ptv .faq{columns:2;column-gap:36px;margin-top:10px}
#ptv .faq .q{break-inside:avoid;padding:0 0 18px}
#ptv .faq h3{font-family:'Manrope','Inter',sans-serif;font-weight:600;font-size:15px;line-height:1.35;margin:0 0 4px}
#ptv .faq p{font-size:14px;margin:0}
#ptv .faq .g{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--purple);margin-left:6px}
#ptv table.vocab{width:100%;border-collapse:collapse;font-size:14px;margin-top:14px;max-width:900px}
#ptv table.vocab th,#ptv table.vocab td{text-align:left;padding:10px 12px;border-top:1px solid var(--line);vertical-align:top}
#ptv table.vocab th{font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);border-top:0}
#ptv .skills{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-top:18px}
#ptv .sk{background:#fff;border:1px solid var(--line);border-radius:6px;padding:14px 16px}
#ptv .sk .n{font-family:var(--mono);font-size:11px;color:var(--purple);letter-spacing:.1em}
#ptv .sk h3{font-size:16px;margin:4px 0 6px}
#ptv .sk p{font-size:13px;color:var(--mut);margin:0}
#ptv .offer{display:grid;grid-template-columns:1.2fr .8fr;gap:36px;align-items:start}
#ptv .offer .price{font-family:'Fraunces',Georgia,serif;font-size:clamp(28px,2.6vw,34px);line-height:1;margin:0 0 6px}
#ptv .offer .card{background:#fff;border:1px solid var(--line);border-radius:6px;padding:22px}
#ptv .offer ul{margin:0 0 16px;padding-left:18px;font-size:14px;line-height:1.55}
#ptv .offer li{margin:0 0 8px}
#ptv .fine{font-size:12px;color:var(--mut);margin:10px 0 0}
#ptv .who{display:grid;grid-template-columns:1fr 1fr;gap:28px}
@media (max-width:860px){#ptv .faq{columns:1}#ptv .offer,#ptv .who{grid-template-columns:1fr}#ptv .frame iframe{height:1100px}#ptv .wrap{padding:0 16px}#ptv .sec{padding:40px 0}}
</style>`;

const hero = `<div id="ptv"><section class="sec" aria-labelledby="ptv-h1"><div class="wrap">
<p class="eye"><span class="bar"></span> A wallchart for AI visibility · Edition ${D.edition} · audited ${D.audited}</p>
<h1 id="ptv-h1">Periodic Table of <em>AI Visibility</em></h1>
<p class="lede">Sixty-nine things that decide whether an answer engine names you. Grouped by what they do: the surfaces that cite, the plumbing that lets them read you, the signals they weigh, the artifacts worth citing, the channels that carry them, the numbers that tell you it worked, and ten inhibitors to remove before you add anything.</p>
<div class="def"><p><b>AI visibility</b> is whether an answer engine (ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Google AI Overviews and AI Mode) names your company when a buyer asks a category question. It covers four outcomes: <b>ranking</b> (your position in a list), <b>citation</b> (a linked source inside the answer), <b>mention</b> (named, no link) and <b>recognition</b> (the model knows you without looking anything up). Being listed is ranking. Being chosen is the other three.</p></div>
<p>An element is one thing you can fix on its own. A blank square is an element you do not have yet. Find your blank squares and you can predict what an answer engine does with your site before you ever ask it. Everything on this page is free and ungated, because gating the one page about being cited by AI would make it the one page AI cannot cite.</p>
<div class="ctas"><a class="btn fill" href="#ptv-table">Open the wallchart</a><a class="btn" href="${REPO}" target="_blank" rel="noopener">Data and skills on GitHub</a><a class="btn" href="#ptv-kit">The audit kit, $99</a></div>
</div></section></div>`;

const groupsHtml = D.groups.map((g) => {
  const items = D.elements.filter((e) => e.group_key === g.key).map((e) =>
    `<li><span class="sym${g.key === "x" ? " x" : ""}" style="${g.key === "x" ? "" : `background:${G[g.key]}`}">${e.symbol}</span><span><span class="nm">${esc(e.name)}</span> — ${esc(e.what_it_is)}</span><span class="tt">${T[e.time_to_effect]}</span></li>`).join("");
  return `<div class="grp"><h3><span class="sw" style="background:${G[g.key]}"></span>${esc(g.label)}</h3><p class="note">${esc(g.note.replace("detached series — ", ""))}</p><ul>${items}</ul></div>`;
}).join("");

const table = `<div id="ptv"><section class="sec tl" id="ptv-table" aria-labelledby="ptv-h2a"><div class="wrap">
<p class="meta">01 — The wallchart</p>
<h2 id="ptv-h2a">Click any element for what it is, the move, and the watch-out.</h2>
<p class="sub">Top left of a tile is the element number. Top right is time to effect: <b>d</b> days, <b>w</b> weeks, <b>q</b> quarters. Outlined tiles are inhibitors: subtract, don't add. Filter by name or hide a group with the legend.</p>
<div class="frame"><iframe src="${PAGES}" title="Periodic Table of AI Visibility — interactive wallchart" loading="lazy" allow="fullscreen"></iframe></div>
<p class="frame-note">If the chart does not load here, <a href="${PAGES}" target="_blank" rel="noopener">open it full screen</a>. Every element is also written out below, so nothing on this page depends on the frame.</p>
<p class="meta" style="margin-top:34px">02 — All 69 elements, by group</p>
<div class="groups">${groupsHtml}</div>
<div class="key"><span><b>Weekend</b> = the days-tagged elements. Do those first.</span><span><b>Inhibitors</b> = remove, never add. Removing one is faster than adding anything above it.</span><span><b>Full detail</b> (the move, the watch-out, the 2026 audit note) is in <a href="${REPO}/blob/main/data/elements.json" target="_blank" rel="noopener">elements.json</a>.</span></div>
</div></section></div>`;

const partGroup = { 1: "Engines", 2: "Retrieval", 3: "Retrieval", 4: "Signals", 5: "Signals", 6: "Artifacts", 7: "Artifacts", 8: "Channels", 9: "Channels", 10: "Measurement", 11: "Inhibitors", 12: "Inhibitors" };
const faqHtml = Q.parts.flatMap((p) => p.questions.map((q) => `<div class="q"><h3>${esc(q.q)}<span class="g">${partGroup[p.part]}</span></h3><p>${esc(q.s)}</p></div>`)).join("");

const SKILLS = [
  ["ai-visibility-audit", "The Blank-Square Audit", "Scores a page against all 69 elements and names the one skill to run next. Run it first."],
  ["inhibitor-sweep", "Inhibitor Sweep", "The ten things to remove, with the exact check for each."],
  ["retrieval-gate-check", "Retrieval Gate Check", "Fourteen pass/fail gates a page must clear before any engine can read it."],
  ["citable-sentence-rewriter", "Citable Sentence Rewriter", "First line, strongest claim, pricing line, headings, definition, real-ticket FAQ."],
  ["machine-readable-files", "Machine-Readable Files", "llms.txt, agents.txt and JSON-LD from facts you supply."],
  ["artifact-picker", "Artifact Picker", "Which of the ten citable artifacts to make next, given an afternoon, a week or a quarter."],
  ["channel-router", "Channel Router", "Seen versus cited: where each artifact goes and in which form."],
  ["prompt-set-and-scoreboard", "Prompt Set and Scoreboard", "Thirty frozen buyer questions and the monthly numbers with unit and direction."],
];
const skillsHtml = SKILLS.map(([k, t, d], i) => `<a class="sk" href="${REPO}/blob/main/skills/${k}/SKILL.md" target="_blank" rel="noopener" style="text-decoration:none"><div class="n">SKILL ${String(i + 1).padStart(2, "0")}</div><h3>${t}</h3><p>${d}</p></a>`).join("");

const rest = `<div id="ptv"><section class="sec" aria-labelledby="ptv-h2b"><div class="wrap">
<p class="meta">03 — 36 questions people ask</p>
<h2 id="ptv-h2b">The questions as people type them, each answered in two sentences.</h2>
<div class="faq">${faqHtml}</div>
</div></section>

<section class="sec tl" aria-labelledby="ptv-h2c"><div class="wrap">
<p class="meta">04 — Vocabulary</p>
<h2 id="ptv-h2c">SEO, AEO, GEO, LLMO: four outcomes, one word.</h2>
<table class="vocab"><thead><tr><th>Term</th><th>Means</th><th>Bought by</th></tr></thead><tbody>
<tr><td><b>Ranking</b></td><td>your position in a list</td><td>SEO</td></tr>
<tr><td><b>Citation</b></td><td>a linked source inside the answer</td><td>AEO · GEO (they overlap almost completely)</td></tr>
<tr><td><b>Mention</b></td><td>named, no link — usually the first sign something is working</td><td>the same work, earlier</td></tr>
<tr><td><b>Recognition</b></td><td>the model knows you without looking anything up; comes from training data, so it is slow</td><td>LLMO · AIO</td></tr>
<tr><td><b>AI visibility</b></td><td>all four. Listed is ranking. Chosen is the other three.</td><td>the whole table</td></tr>
</tbody></table>
<p class="sub" style="margin-top:14px">"AI SEO" means either SEO for AI engines or using AI to do SEO. Ask which before you agree with anyone.</p>
</div></section>

<section class="sec" aria-labelledby="ptv-h2d"><div class="wrap">
<p class="meta">05 — The eight skills, free</p>
<h2 id="ptv-h2d">The table as eight installable AI skills for Claude, ChatGPT, Gemini or Copilot.</h2>
<p>Each skill is a self-contained prompt that owns one row of the table and routes to the next. They use only what you paste; none of them invents a number. Install guides for every model are in the repository, and the whole set is one paste-in file.</p>
<div class="skills">${skillsHtml}</div>
<div class="ctas"><a class="btn fill" href="${REPO}" target="_blank" rel="noopener">Get the skills on GitHub</a><a class="btn" href="${REPO}/blob/main/pack/ai-visibility-skill-pack.md" target="_blank" rel="noopener">The one-file pack</a></div>
</div></section>

<section class="sec tl" id="ptv-kit" aria-labelledby="ptv-h2e"><div class="wrap">
<p class="meta">06 — The instrument</p>
<div class="offer"><div>
<h2 id="ptv-h2e">The AI Visibility Audit Kit: the scorecard, the tracker and the files, ready to open.</h2>
<p>The table tells you what the 69 squares are. The kit is how you score your own, in order, and measure whether anything moved. Files you open and use the same day, not a course.</p>
<ul>
<li><b>The 69-element scorecard workbook.</b> Mark each square Present, Blank or Inhibitor present. It ranks your open squares by time to effect, days before weeks before quarters, inhibitors doubled.</li>
<li><b>The prompt-set tracker.</b> Thirty frozen buyer questions, a monthly run log, and a scoreboard that computes share of voice, mentions, citations, AI-referral conversion and a switchback test, with the unit and direction for every number.</li>
<li><b>Fill-in templates</b> for llms.txt, agents.txt, the robots.txt allow-list, and JSON-LD for Organization, Product and FAQPage.</li>
<li><b>The weekend inhibitor runbook.</b> Ten things to remove, with the exact command or check for each.</li>
</ul>
</div><div class="card">
<p class="meta">One-time</p>
<p class="price">$99</p>
<p class="sub" style="font-size:14px">Sent to the email address you use at checkout. The table, the data and the eight skills stay free.</p>
<a class="btn fill" href="${CHECKOUT}" style="width:100%">Get the kit</a>
<p class="fine">Want it run for you instead? <a href="/book-a-call">Book a free 30-minute call</a>.</p>
</div></div>
</div></section>

<section class="sec" aria-labelledby="ptv-h2f"><div class="wrap">
<p class="meta">07 — Who made this, and from what</p>
<div class="who"><div>
<h2 id="ptv-h2f">A catalog tells you what exists. A periodic table tells you why it gets picked.</h2>
<p>I'm Ron Davis. Eight years inside AWS Marketplace in technical business development, covering go-to-market for more than 3,000 AWS partners. The last eighteen months were spent on products where the buyer is an AI agent, not a person. Listings written for humans were unreadable to the agent. Being listed was not being chosen.</p>
</div><div>
<p>Before that: service catalogs at Accenture and CompuCom, 28,000 knowledge articles centralized and de-duplicated at a bank (that job is the Duplicate and Canonical tiles), 1,000 tasks standardized across 8 service offerings at Dell. This is the first catalog I built with a why.</p>
<p>The receipt behind the Signals row: in 2026 I read 595 AWS Marketplace listings the way a machine reads them. 482 of the 595 opened with a superlative, and not one superlative is quotable by a machine.</p>
<p class="sub">Mendeleev left blank squares for elements nobody had found yet and said what would fill them. I'm not a chemist. I'm a navigator. An element here just means one thing you can fix on its own.</p>
</div></div>
</div></section></div>`;

const faqLd = Q.parts.flatMap((p) => p.questions.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.s } })));
const ld = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "@id": CANON, url: CANON, name: "Periodic Table of AI Visibility", description: "The 69 elements that decide whether an answer engine names your company, grouped by engines, retrieval, signals, artifacts, channels, measurement and inhibitors.", datePublished: "2026-10-09", dateModified: "2026-10-09", author: { "@id": "https://www.itsrondavis.com/#person" }, isPartOf: { "@type": "WebSite", url: "https://www.itsrondavis.com", name: "Ron Davis" } },
    { "@type": "Person", "@id": "https://www.itsrondavis.com/#person", name: "Ron Davis", url: "https://www.itsrondavis.com", jobTitle: "AI visibility and marketplace go-to-market advisor", sameAs: ["https://www.linkedin.com/in/itsrondavis/", "https://www.youtube.com/@itsRonDavis", "https://www.instagram.com/itsrondavis/", "https://github.com/vell-admin"] },
    { "@type": "Dataset", "@id": CANON + "#dataset", name: "Periodic Table of AI Visibility — 69 elements", description: "Sixty-nine factors that decide whether an answer engine names a company, each with a symbol, group, time-to-effect tag, what it is, the move and a watch-out.", version: D.edition, dateModified: D.audited, license: "https://creativecommons.org/licenses/by/4.0/", creator: { "@id": "https://www.itsrondavis.com/#person" }, url: CANON, distribution: [{ "@type": "DataDownload", encodingFormat: "application/json", contentUrl: REPO + "/blob/main/data/elements.json" }, { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: REPO + "/blob/main/data/elements.csv" }] },
    { "@type": "Product", name: "The AI Visibility Audit Kit", description: "Scorecard workbook for the 69 elements, prompt-set tracker and scoreboard, templates for llms.txt, agents.txt and JSON-LD, and the weekend inhibitor runbook.", brand: { "@type": "Person", name: "Ron Davis" }, offers: { "@type": "Offer", price: "99", priceCurrency: "USD", url: CHECKOUT, availability: "https://schema.org/InStock" } },
    { "@type": "FAQPage", mainEntity: faqLd },
  ],
};
const ldHtml = `<script type="application/ld+json">${JSON.stringify(ld)}</script>`;

const codeBlock = (name, code) => ({ type: "code", name, settings: { code, width: "fill", mobile_width: "fill", padding_desktop: { top: 0, right: 0, bottom: 0, left: 0 }, padding_mobile: { top: 0, right: 0, bottom: 0, left: 0 } } });
const sectionSettings = { direction: "vertical", align: "center", position: "start", gap: 0, full_width: true, min_height: "auto", padding_desktop: { top: 0, right: 0, bottom: 0, left: 0 }, padding_mobile: { top: 0, right: 0, bottom: 0, left: 0 } };

const settings = {
  sections: {
    rhchrome_nav: CHROME.rhchrome_nav,
    ptv_a: { type: "section", name: "AI Visibility — hero + wallchart + elements", settings: sectionSettings, block_order: ["ptv_css", "ptv_hero", "ptv_table"], blocks: { ptv_css: codeBlock("Page CSS (scoped to #ptv)", css), ptv_hero: codeBlock("Hero + definition", hero), ptv_table: codeBlock("Wallchart embed + 69 elements", table) } },
    ptv_cap: {
      type: "section", name: "Capture — the table first, then the checklist", settings: { ...sectionSettings, full_width: false, padding_desktop: { top: 48, right: 28, bottom: 48, left: 28 }, padding_mobile: { top: 36, right: 16, bottom: 36, left: 16 } },
      block_order: ["ptv_form"],
      blocks: {
        ptv_form: { type: "form", name: "Newsletter capture", settings: { form: NEWSLETTER_FORM, thank_you: "/next-steps", link_to_form_embed: false, title_text: "New editions and the checklist version go to the list first.", description_text: "One page a week, read the way a machine reads it, and every revision of this table before it goes public. Reply to any issue and tell me which square you found blank; the tally is the next edition's number.", input_label: "placeholder", inline: false, btn_text: "Send me the table updates", disclaimer_text: "One email a week. Unsubscribe in one click.", btn_size: "medium", btn_width: "auto", btn_background_color: "#330582", btn_text_color: "#ffffff", btn_border_radius: "6", text_align: "left", mobile_text_align: "left", width: "fill", mobile_width: "fill", custom_classes: "ptv-capture" } },
      },
    },
    ptv_b: { type: "section", name: "AI Visibility — FAQ, vocabulary, skills, kit, author, JSON-LD", settings: sectionSettings, block_order: ["ptv_rest", "ptv_ld"], blocks: { ptv_rest: codeBlock("FAQ + vocabulary + skills + kit + author", rest), ptv_ld: codeBlock("JSON-LD (WebPage, Person, Dataset, Product, FAQPage)", ldHtml) } },
    rhchrome_foot: CHROME.rhchrome_foot,
  },
  content_for_index: ["rhchrome_nav", "ptv_a", "ptv_cap", "ptv_b", "rhchrome_foot"],
};
fs.writeFileSync(path.join(root, "kajabi/ai-visibility-page.json"), JSON.stringify(settings, null, 1));
const total = JSON.stringify(settings).length;
console.log("payload chars", total, "· hero", hero.length, "· table", table.length, "· rest", rest.length, "· ld", ldHtml.length, "· css", css.length);
