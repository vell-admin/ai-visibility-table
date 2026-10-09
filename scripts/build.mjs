// Builds README.md, pack/ai-visibility-skill-pack.md and reference/* from data/ + skills/.
// Run: node scripts/build.mjs   (from the repo root)
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const D = JSON.parse(fs.readFileSync(path.join(root, "data/elements.json"), "utf8"));
const Q = JSON.parse(fs.readFileSync(path.join(root, "data/questions.json"), "utf8"));

const CANON = "https://www.itsrondavis.com/ai-visibility";
const REPO = "https://github.com/vell-admin/ai-visibility-table";
const PAGES = "https://vell-admin.github.io/ai-visibility-table/table/";
const CALL = "https://www.itsrondavis.com/book-a-call";
const NEWS = "https://www.itsrondavis.com/newsletter";

const SKILLS = [
  ["ai-visibility-audit", "The Blank-Square Audit ★", "Score a page against all 69 elements: present, blank, or inhibitor. Returns your weekend list, your quarter list, and the one skill to run next. Run it first."],
  ["inhibitor-sweep", "Inhibitor Sweep", "The ten things to remove before you add anything — blocked crawler, JS-only, gated proof, paywall, jargon, vague claims, duplicates, orphans, slop, no date — with the exact check for each."],
  ["retrieval-gate-check", "Retrieval Gate Check", "Fourteen pass/fail gates a page has to clear before any engine can read it: robots.txt, sitemap, llms.txt, agents.txt, JSON-LD, entity, chunk, server render, freshness, canonical, transcript, alt text, heading map, internal links."],
  ["citable-sentence-rewriter", "Citable Sentence Rewriter", "Rewrites your first line, strongest claim, pricing line and headings so a machine can quote them — number, unit, condition — and adds the definition line and the real-ticket FAQ."],
  ["machine-readable-files", "Machine-Readable Files", "Generates llms.txt, agents.txt and JSON-LD (Organization, Product, FAQPage) from facts you supply. Declares only capabilities that work."],
  ["artifact-picker", "Artifact Picker", "Which of the ten citable artifacts to make next — teardown, benchmark, dataset, case study, runbook, calculator, screenshot, video, newsletter, template — given an afternoon, a week, or a quarter."],
  ["channel-router", "Channel Router", "Seen versus cited. Where each artifact goes and in which form: document carousel on LinkedIn, README on GitHub, transcript page for podcasts, listing-as-landing-page, practitioner-first on Reddit."],
  ["prompt-set-and-scoreboard", "Prompt Set and Scoreboard", "Builds the 30-question frozen prompt set from real sales and support questions, then the monthly scoreboard: share of voice, mentions, citations, AI referrals, brand search, impressions, and a switchback test."],
];

const T = { days: "d", weeks: "w", quarters: "q" };
const groups = D.groups;
const byGroup = (k) => D.elements.filter((e) => e.group_key === k);

// ---------- README ----------
let r = "";
r += `# Periodic Table of AI Visibility\n\n`;
r += `**The 69 things that decide whether ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Google AI Overviews or AI Mode name your company — and the 10 to remove before you add anything.**\n\n`;
r += `By [Ron Davis](https://www.itsrondavis.com) · Edition ${D.edition} · audited ${D.audited} · Canonical page: **[${CANON.replace("https://www.", "")}](${CANON})** · Data: CC BY 4.0 · Skills: MIT\n\n`;
r += `> **AI visibility** is whether an answer engine names your company when a buyer asks a category question. It covers four outcomes: **ranking** (your position in a list), **citation** (a linked source inside the answer), **mention** (named, no link) and **recognition** (the model knows you without looking anything up). Being listed is ranking. Being chosen is the other three.\n\n`;
r += `This repository is the table as data, the table as a wallchart, and the table as eight installable AI skills you drop into Claude, ChatGPT, Gemini or Copilot. An element is one thing you can fix on its own. A blank square is an element you do not have yet. Find the blank squares and you can predict what an answer engine does with your site before you ever ask it.\n\n`;
r += `[**Open the interactive wallchart →**](${PAGES}) · [elements.json](data/elements.json) · [elements.csv](data/elements.csv) · [36 questions](data/questions.json) · [the skills](skills/) · [one-file pack](pack/ai-visibility-skill-pack.md)\n\n`;
r += `---\n\n## Contents\n\n`;
r += `1. [How do I read the table?](#how-do-i-read-the-table)\n2. [The 69 elements, by group](#the-69-elements-by-group)\n3. [What should I fix this weekend?](#what-should-i-fix-this-weekend)\n4. [36 questions people ask about AI visibility](#36-questions-people-ask-about-ai-visibility)\n5. [SEO, AEO, GEO, LLMO: which word means what?](#seo-aeo-geo-llmo-which-word-means-what)\n6. [The eight skills](#the-eight-skills)\n7. [Install in your model](#install-in-your-model)\n8. [Who made this, and from what](#who-made-this-and-from-what)\n9. [The kit, the call, the newsletter](#the-kit-the-call-the-newsletter)\n10. [How this README applies its own table](#how-this-readme-applies-its-own-table)\n11. [Changelog and audit history](#changelog-and-audit-history)\n\n---\n\n`;

r += `## How do I read the table?\n\n`;
r += `The Periodic Table of AI Visibility groups 69 elements into seven rows by what they do:\n\n`;
r += `| Group | What it covers | Elements |\n|---|---|---|\n`;
for (const g of groups) r += `| **${g.label}** | ${g.note.replace("detached series — ", "")} | ${byGroup(g.key).length} |\n`;
r += `\nEvery element carries a **time-to-effect tag**: **d** = days, **w** = weeks, **q** = quarters. It says how long after the fix you should expect the engines to notice. Sort any list of fixes by this tag and do the days first.\n\n`;
r += `**Inhibitors are outlined, not filled.** They are the ten things to remove. Removing one inhibitor is faster than adding anything in the rows above it, so the audit always starts at the bottom row.\n\n`;
r += `Each element has four parts: **what it is**, **the move** (the one thing to do), **the watch-out** (how the move goes wrong), and a **2026 audit note** where the surface changed this year. The data files carry all four; the table below shows the first two.\n\n`;

r += `## The 69 elements, by group\n\n`;
for (const g of groups) {
  r += `### ${g.label} — ${g.note}\n\n`;
  r += `| # | Symbol | Element | Effect | What it is | The move |\n|---|---|---|---|---|---|\n`;
  for (const e of byGroup(g.key)) {
    r += `| ${e.number} | **${e.symbol}** | ${e.name} | ${T[e.time_to_effect]} | ${e.what_it_is} | ${e.the_move} |\n`;
  }
  r += `\n`;
}

r += `## What should I fix this weekend?\n\n`;
r += `The days-tagged elements. None of them is copywriting and none of them needs a budget. In the order the table recommends — inhibitors first, then retrieval, then signals:\n\n`;
const weekend = D.elements.filter((e) => e.time_to_effect === "days");
const order = ["x", "r", "s", "a", "c", "m", "e"];
weekend.sort((a, b) => order.indexOf(a.group_key) - order.indexOf(b.group_key) || a.number - b.number);
let n = 1;
for (const e of weekend) r += `${n++}. **${e.symbol} ${e.name}** (${e.group}) — ${e.the_move}\n`;
r += `\nThat is ${weekend.length} elements. The [Inhibitor Sweep](skills/inhibitor-sweep/SKILL.md) and [Retrieval Gate Check](skills/retrieval-gate-check/SKILL.md) skills turn this list into a checklist with the exact thing to open and paste back for each one. The printable version is [reference/weekend-checklist.md](reference/weekend-checklist.md).\n\n`;

r += `## 36 questions people ask about AI visibility\n\n`;
r += `These are the questions as people type them. Each answer stands on its own. The element symbols in brackets point at the row of the table that fixes it.\n\n`;
const partGroup = { 1: "Engines", 2: "Retrieval", 3: "Retrieval", 4: "Signals", 5: "Signals", 6: "Artifacts", 7: "Artifacts", 8: "Channels", 9: "Channels", 10: "Measurement", 11: "Inhibitors", 12: "Inhibitors" };
for (const p of Q.parts) {
  for (const q of p.questions) {
    r += `### ${q.q}\n\n${q.s} *[${partGroup[p.part]}]*\n\n`;
  }
}

r += `## SEO, AEO, GEO, LLMO: which word means what?\n\n`;
r += `| Term | What it buys | Where it lives on the table |\n|---|---|---|\n`;
r += `| **SEO** (search engine optimization) | **Ranking** — your position in the list of blue links | The engines that still show a list: AI Overviews and AI Mode on top of Google |\n`;
r += `| **AEO** (answer engine optimization) | **Citation** — a linked source inside the answer; leans toward answer boxes like Perplexity and AI Overviews | The Retrieval and Signals rows |\n`;
r += `| **GEO** (generative engine optimization, a term from a 2023 Princeton paper) | **Citation** — the same outcome; leans toward answers an LLM writes from scratch | The Retrieval and Signals rows |\n`;
r += `| **LLMO / AIO** | **Recognition** — the model knows who you are without retrieving anything; comes from training data, so it is slow | The Entity tile, the Channels row, Brand search |\n`;
r += `| **AI SEO** | A marketing umbrella that means either "SEO for AI engines" or "using AI to do SEO" — ask which before you agree | — |\n`;
r += `| **AI visibility** | **All four.** Listed is ranking. Chosen is citation, mention and recognition together | The whole table |\n\n`;
r += `In practice AEO and GEO overlap almost completely and people use them interchangeably. A **mention** (named, no link) is cheaper than a citation and is usually the first sign something is working; it has its own tile in Measurement. The printable version is [reference/vocabulary-card.md](reference/vocabulary-card.md).\n\n`;

r += `## The eight skills\n\n`;
r += `Each skill is a self-contained, model-agnostic prompt in [Claude Agent Skill format](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) (\`skills/<name>/SKILL.md\`). They own the table between them — every element belongs to exactly one skill — and they route to each other. **Start with the Blank-Square Audit.**\n\n`;
r += `| Skill | What it does |\n|---|---|\n`;
for (const [k, t, d] of SKILLS) r += `| [**${t}**](skills/${k}/SKILL.md) | ${d} |\n`;
r += `\nThe route: Audit → Inhibitor Sweep (if any inhibitor is present) → Retrieval Gate Check → Citable Sentence Rewriter → Machine-Readable Files → Artifact Picker → Channel Router → Prompt Set and Scoreboard → back to the Audit next month.\n\n`;
r += `**Every skill is grounded.** It uses only what you give it. It never invents a score, a percentage, a traffic figure or a benchmark; a missing number is marked *pending* with the input that would unlock it.\n\n`;

r += `## Install in your model\n\n`;
r += `- **Claude** → [install/claude.md](install/claude.md) — add the \`skills/\` folders, or paste the pack into a Project.\n- **ChatGPT** → [install/chatgpt.md](install/chatgpt.md) — paste into a Custom GPT or Project.\n- **Gemini** → [install/gemini.md](install/gemini.md) — paste into a Gem.\n- **Copilot** → [install/copilot.md](install/copilot.md) — paste into an agent.\n\n`;
r += `**Fastest path:** copy [\`pack/ai-visibility-skill-pack.md\`](pack/ai-visibility-skill-pack.md) into your model's project knowledge and say *"Run the Blank-Square Audit on this page"* with your page's text pasted underneath.\n\n`;

r += `## Who made this, and from what\n\n`;
r += `Ron Davis spent eight years inside AWS Marketplace in technical business development, covering go-to-market for more than 3,000 AWS partners, and left in June 2026. The last eighteen months of that were spent on products where the buyer is an AI agent, not a person. Listings written for humans were unreadable to the agent. Being listed was not being chosen.\n\n`;
r += `The table is the first catalog he built with a *why*: before it came service catalogs at Accenture and CompuCom, 28,000 knowledge articles centralized and de-duplicated at a bank (that job is the Duplicate and Canonical tiles), 1,000 tasks standardized across 8 service offerings at Dell, and 9,400 AWS Marketplace listings across 3,977 partners. A catalog tells you what exists. A periodic table tells you why it gets picked.\n\n`;
r += `The receipt behind the Signals row: in 2026 he read 595 AWS Marketplace listings the way a machine reads them. 482 of the 595 opened with a superlative, and not one superlative is quotable by a machine. That is the Vague claim tile with a number on it.\n\n`;
r += `*Why a periodic table.* Mendeleev's 1869 table worked because where a square sits predicts how the element behaves, and he left blank squares for elements nobody had found yet. This table makes the same claim about your site. He is not a chemist; an element here just means one thing you can fix on its own.\n\n`;

r += `## The kit, the call, the newsletter\n\n`;
r += `Everything in this repository is free and ungated, because gating the one page about being cited by AI would make it the one page AI cannot cite.\n\n`;
r += `- **The AI Visibility Audit Kit — $99 one-time** → **[${CANON.replace("https://www.", "")}](${CANON})**. The instrument, not a lesson: the 69-element scorecard workbook that ranks your blank squares by time to effect, the 30-prompt share-of-voice tracker with the unit and direction for every number, fill-in templates for llms.txt, agents.txt and JSON-LD, and the weekend inhibitor runbook. Files you open and use the same day.\n`;
r += `- **Want it run for you?** A free 30-minute call → **[${CALL.replace("https://www.", "")}](${CALL})**.\n`;
r += `- **One page a week, read the way a machine reads it** → the newsletter at **[${NEWS.replace("https://www.", "")}](${NEWS})**.\n\n`;

r += `## How this README applies its own table\n\n`;
r += `A README is a document on a trusted domain that engines read closely (**Gi GitHub**). So this one is written to the table it describes:\n\n`;
r += `| Element | Where it is on this page |\n|---|---|\n`;
r += `| **Df Definition** | The "AI visibility is…" sentence in the first hundred words |\n`;
r += `| **Hd Heading map** | Every H2 is a question or a claim, never a label |\n`;
r += `| **Ck Chunk** | Each FAQ answer and each table row survives being lifted out on its own |\n`;
r += `| **Fq FAQ block** | 36 questions, worded the way people type them |\n`;
r += `| **Cm Comparison** | The SEO / AEO / GEO / LLMO table |\n`;
r += `| **Pc Pricing clarity** | The kit price and what it scales on are stated, not "contact us" |\n`;
r += `| **Pf Proof** | 482 of 595 listings, 2026, Ron's own read — dated and sourced |\n`;
r += `| **Fr Freshness** | Edition and audit date in the byline; changelog at the bottom |\n`;
r += `| **Cn Canonical** | One canonical URL named at the top; this repo points at it |\n`;
r += `| **Et Entity** | One spelling of the author's name everywhere, with the same profile links as the canonical page |\n`;
r += `| **Ds Dataset** | elements.json and elements.csv at a stable URL with a license |\n`;
r += `| **Tp Template** | The eight skills are files you can use today |\n`;
r += `| **Lt llms.txt** | [llms.txt](llms.txt) at the repo root, pointing at the definition, the data and the offer |\n`;
r += `| **Ga Gated** | Nothing here asks for an email |\n\n`;
r += `The blank squares on this page, said out loud: no **Sh Screenshot** of the wallchart yet, and no **Bn Benchmark** of how often each element is missing across real sites. Both are on the list.\n\n`;

r += `## Changelog and audit history\n\n`;
r += `- **${D.audited} — Edition ${D.edition}.** Engines row audited: Siri AI runs on Gemini since June 2026 and is covered by the Gemini tile; Meta AI, DeepSeek, Qwen, Ollama and Alexa+ were considered and left off, with the reasons recorded in the wallchart. llms.txt note updated for the v2 spec and Google's May 2026 guidance. Grok's in-car presence verified.\n`;
r += `- **2026-10-07** — Measurement row: unit, direction and alternates added to all eight metrics.\n`;
r += `- **2026-08-27** — First build: 69 elements, 7 groups.\n\n`;
r += `---\n\n© 2026 Ron Davis. Skills and code: MIT. Table and data: CC BY 4.0 — attribute as "Periodic Table of AI Visibility, Ron Davis, ${CANON}". *Listed is ranking. Chosen is the other three.*\n`;
fs.writeFileSync(path.join(root, "README.md"), r);

// ---------- PACK (one paste-in file) ----------
let p = `# The Periodic Table of AI Visibility — Skill Pack\n\n> Eight skills · Ron Davis · itsrondavis.com/ai-visibility · Edition ${D.edition}\n>\n> Drop this whole file into your model (Claude Project knowledge, a ChatGPT Custom GPT or Project, a Gemini Gem, or a Copilot agent). Then ask for a skill by name, e.g. "Run the Blank-Square Audit on this page" with the page text pasted underneath.\n\n---\n\n## Operating instructions\n\nYou are the operator of the Periodic Table of AI Visibility: 69 things that decide whether an answer engine (ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Google AI Overviews and AI Mode) names a company. Pick the right skill below based on what the user asks for. Always begin by asking for the inputs that skill lists, then follow its method and output format exactly. Be direct and specific; never pad.\n\n**Grounding — this overrides any method step below.** Use only what the user gives you. Never invent a specific number — a score, a percentage, a traffic figure, a benchmark — that their inputs don't support: ask for it, or mark it *pending* and name the input that would unlock it. Never attribute a quote, a case study, a statistic or a certification to a named source unless the user supplied it. Credibility is the product.\n\n**Vocabulary.** Ranking = your position in a list. Citation = a linked source inside the answer. Mention = named, no link. Recognition = the model knows you without looking. AI visibility = all four. An element is one thing you can fix on its own; a blank square is one you don't have; an inhibitor is something to remove, not add. Every element carries a time-to-effect tag: d = days, w = weeks, q = quarters. Order every recommendation days → weeks → quarters, and subtract before you add.\n\n**If you only run one, start with #1 — the Blank-Square Audit.** It scores the page against all 69 elements and tells you which of #2–#8 to run next.\n\n---\n\n## The table (reference for every skill)\n\n`;
for (const g of groups) {
  p += `**${g.label}** — ${g.note}\n`;
  for (const e of byGroup(g.key)) p += `- ${e.number}. **${e.symbol} ${e.name}** [${e.time_to_effect}] — ${e.what_it_is} *Move:* ${e.the_move} *Watch out:* ${e.watch_out}\n`;
  p += `\n`;
}
p += `---\n\n`;
SKILLS.forEach(([k, t], i) => {
  const f = path.join(root, "skills", k, "SKILL.md");
  if (!fs.existsSync(f)) { p += `## ${i + 1}. ${t}\n\n*(pending)*\n\n---\n\n`; return; }
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/^---[\s\S]*?---\s*/, ""); // drop frontmatter
  s = s.replace(/^# .*$/m, `## ${i + 1}. ${t}`); // retitle
  s = s.replace(/^## /gm, "### ").replace(/^### (\d+)\. /m, "## $1. ");
  s = s.replace(/\n---\n© Ron Davis[^\n]*\n?$/, "\n");
  p += s.trim() + "\n\n---\n\n";
});
p += `© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? ${CALL} · The full kit (99 USD): ${CANON}\n`;
fs.mkdirSync(path.join(root, "pack"), { recursive: true });
fs.writeFileSync(path.join(root, "pack/ai-visibility-skill-pack.md"), p);

// ---------- REFERENCE ----------
fs.mkdirSync(path.join(root, "reference"), { recursive: true });
let w = `# The weekend checklist — ${weekend.length} fixes tagged "days"\n\nFrom the Periodic Table of AI Visibility, edition ${D.edition}. Print it, do it in order, tick the box. Inhibitors first: removing one is faster than adding anything above it.\n\nCanonical: ${CANON} · Data: ${REPO}\n\n`;
let cur = "";
for (const e of weekend) {
  if (e.group !== cur) { cur = e.group; w += `\n## ${cur}\n\n`; }
  w += `- [ ] **${e.symbol} ${e.name}** — ${e.the_move}\n  - *Watch out:* ${e.watch_out}\n`;
}
w += `\n---\n\nWhen the weekend is done, the next tier is the weeks-tagged elements: run the **Blank-Square Audit** skill to get them in order for your page. ${REPO}\n`;
fs.writeFileSync(path.join(root, "reference/weekend-checklist.md"), w);

const m = D.elements.filter((e) => e.group_key === "m");
let ps = `# Prompt-set worksheet — the ruler, then the eight numbers\n\nFrom the Periodic Table of AI Visibility, edition ${D.edition}. Canonical: ${CANON}\n\n## 1. Freeze the prompt set (Ps)\n\n${m.find((e) => e.symbol === "Ps").the_move}\n\nWrite them as a buyer would type them. Pull them from sales calls and support tickets, not from what you wish buyers asked. Save the file with a version date. Change it only on purpose, and date every change.\n\n| # | Prompt (as a buyer types it) | Journey stage | Source (call / ticket / search) |\n|---|---|---|---|\n`;
for (let i = 1; i <= 30; i++) ps += `| ${i} |  |  |  |\n`;
ps += `\nVersion date: ________  ·  Changes since last version (each one dated): ________\n\n## 2. The eight numbers — unit and direction\n\nSay the unit before the number every time. A number without a unit is the Vague claim tile in your own scoreboard. Cadence: monthly, same prompt set.\n\n| Element | Unit | Direction | Also track |\n|---|---|---|---|\n`;
for (const e of m) ps += `| **${e.symbol} ${e.name}** | ${e.unit} | ${e.direction} | ${e.alternates} |\n`;
ps += `\n## 3. Monthly scoreboard\n\n| Month | Prompt-set version | Share of voice (%) | Mentions (count, +/0/−) | Citations (count) | Unique cited URLs | AI referral sessions | AI referral conversion (%) | Brand search (impressions) | Citations per 100 impressions |\n|---|---|---|---|---|---|---|---|---|---|\n`;
for (let i = 0; i < 6; i++) ps += `|  |  |  |  |  |  |  |  |  |  |\n`;
ps += `\n## 4. Switchback test (Sb)\n\n${m.find((e) => e.symbol === "Sb").what_it_is} ${m.find((e) => e.symbol === "Sb").the_move}\n\nChange tested: ________ · On-weeks: ________ · Off-weeks: ________ · Lift (percentage points): ________\n\n${m.find((e) => e.symbol === "Sb").alternates}\n\n---\n\nThe spreadsheet version of this worksheet, with the formulas wired, is in the AI Visibility Audit Kit: ${CANON}\n`;
fs.writeFileSync(path.join(root, "reference/prompt-set-worksheet.md"), ps);

let v = `# Vocabulary card — four outcomes, one word\n\nFrom the Periodic Table of AI Visibility, edition ${D.edition}. Canonical: ${CANON}\n\n| Term | Means | Bought by | Measured by |\n|---|---|---|---|\n| **Ranking** | your position in a list | SEO | position |\n| **Citation** | a linked source inside the answer | AEO · GEO | Ci Citations |\n| **Mention** | named, no link — the first sign | the same work, earlier | Mt Mentions |\n| **Recognition** | the model knows you without looking | LLMO · AIO (training data, slow) | Et Entity · Bs Brand search |\n| **AI visibility** | all four | the whole table | Sv Share of voice |\n\n**AEO** leans toward answer boxes (Perplexity, AI Overviews). **GEO** leans toward answers an LLM writes from scratch. In practice they overlap almost completely. **AI SEO** means either "SEO for AI engines" or "using AI to do SEO" — ask which before you agree with anyone.\n\nA local model (Ollama and friends) has only recognition: no live web, so it knows you only if you were in the training data. That is the Entity row's argument, not a surface of its own.\n\n*Listed is ranking. Chosen is the other three.*\n`;
fs.writeFileSync(path.join(root, "reference/vocabulary-card.md"), v);

console.log("README", r.length, "chars · pack", p.length, "· weekend", weekend.length, "elements");
