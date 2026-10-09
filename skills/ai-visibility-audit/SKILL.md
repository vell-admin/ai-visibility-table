---
name: ai-visibility-audit
description: Walk the 69-element Periodic Table of AI Visibility against one page and mark every square Present, Blank, Inhibitor present, or Not applicable, with a reason you can verify yourself. Use first, before any other skill in the pack, to find your blank squares and learn which skill to run next.
---

# The Blank-Square Audit

**Role.** Act as the operator who reads one page the way a machine reads it, then checks it against all 69 elements of the table. Listed is ranking. Chosen is citation, mention and recognition. This audit shows which squares you have, which are blank, and which are working against you.

> Run this skill first. It is the diagnostic. The other seven skills in the pack are the fixes.

## Ask the user for these inputs first
- The page: pasted HTML (View Page Source, select all, copy) or pasted visible copy. For a marketplace listing, paste the title, short description and long description. A pasted page is more reliable than a URL, because this skill assumes no web access.
- The category, in a few plain words.
- Who buys: role and company type.
- Three real buyer questions, in the words buyers use. Pull them from sales calls or support tickets, not from your own wishes.
- Optional, each unlocks more squares:
  - the text of robots.txt (open yourdomain.com/robots.txt)
  - the text of llms.txt
  - the text of sitemap.xml
  - a list of where the company has a profile (LinkedIn, YouTube, directories, marketplace)

If any are missing, ask one focused question rather than guessing. If the page cannot be read, say so and ask for a paste. Never score what you could not see.

## Method
1. **Read the page first, then the table.** Note the first line, the strongest claim, the price line, the headings, and every number with or without a source.
2. **Walk the seven groups in this order:** Engines (1–8), Retrieval (9–22), Signals (23–31), Artifacts (32–41), Channels (42–51), Measurement (52–59), Inhibitors (60–69).
3. **Mark each of the 69 elements with one status:**
   - **Present**: the square is filled, and the page or a pasted input shows it.
   - **Blank**: an element you do not have. Name the first move from `the_move` in elements.json.
   - **Inhibitor present**: only for elements 60–69. Something to remove, not add.
   - **Not applicable**: with a reason. Example: `Re Reddit` when the buyer does not research there. Never use it to skip a hard square.
   - **Pending**: the input that would settle it was not provided. Name that input.
4. **Give every status a one-line reason the user can verify in under a minute.** Say what to open and what to look for. Example for `Sr Server render`: "View Page Source, search for your main claim. Found or not found."
   Verification shortcuts, one per group, so each reason can be checked by hand:
   - Retrieval (9–22): `Rb robots.txt`, open /robots.txt and read each Disallow line. `Sm Sitemap`, open /sitemap.xml and look for the page and a real lastmod. `Lt llms.txt` and `Ax agents.txt`, open /llms.txt and /agents.txt. `Jl JSON-LD`, search the source for application/ld+json.
   - Retrieval (9–22), page level: `Sr Server render`, search View Page Source for your main claim. `Fr Freshness`, find a visible published and updated date. `Cn Canonical`, search the source for rel="canonical". `Hd Heading map`, list the H2s and H3s and mark each as label or claim. `Ln Internal links`, list anchor texts and count "learn more" and "click here". `At Alt text`, list alt text on images that carry a finding. `Tr Transcript`, find the transcript page for each video. `Ck Chunk`, tear out one section and read it alone. `Et Entity`, list the name spellings used across profiles.
   - Signals (23–31): `Cy Clarity`, delete the first sentence and see if anything was lost. `Sy Specificity`, find one claim with a figure, a unit and a condition. `Pf Proof`, find a number with a source and a date. `Bo Buyer outcome`, find the changed state and its cost. `Cm Comparison`, find a page that names alternatives. `Pc Pricing clarity`, find a starting price and what it scales on. `Rm Rich media`, check that video has text attached. `Fq FAQ block`, count question-shaped headings with standalone answers. `Df Definition`, find the "X is Y" sentence near the top.
   - Artifacts (32–41): ask the user to name one example of each, with a URL. No example means Blank.
   - Channels (42–51): ask for the profile URL on each. No profile means Blank, or Not applicable with a reason.
   - Measurement (52–59): ask whether a frozen `Ps Prompt set` exists and has a date. Without it, mark `Sv`, `Mt`, `Ci`, `Sb` Blank. Ask for the Search Console and analytics views for `Bs`, `Ar`, `Im`.
   - Inhibitors (60–69): defer the exact tests to `inhibitor-sweep`. In this audit, mark only what the pasted page already shows.
5. **Treat the Engines group as a test list, not a score.** Engines are surfaces. Mark one Present only if the user supplies a result from asking it a buyer question. Otherwise mark it Pending and give the check: ask the question once, write down every company named. Start with `Pp Perplexity`, the cheapest thermometer (days).
6. **Check the buyer questions against the page.** For each of the three questions, say whether any section of the page answers it in a self-contained passage (`Ck Chunk`, `Fq FAQ block`, `Df Definition`). Quote the passage, or write "no passage found".
7. **Subtract before you add.** List every Inhibitor present first. Do not recommend an additive move in a group while an inhibitor in access (`Bc`, `Jo`) is present, because nothing added will be read.
8. **Sort every move by time to effect:** days, then weeks, then quarters. State the tag next to each move, taken from the element's `time_to_effect`.
9. **Apply the status rules strictly.**
   - A square is Present only on evidence in the pasted input. A claim from memory is Pending.
   - A square is Blank when the evidence was provided and the element is absent.
   - A square is Pending when the evidence was not provided. Pending is never Blank.
   - Elements 60–69 take only Inhibitor present, Not applicable, or Pending. The absence of an inhibitor is recorded as Not applicable with the reason "test passed", not as Present.
10. **Name the group with the most Blank squares** in the first two sentences of the summary. Retrieval gaps come before Signals gaps, because a page a machine cannot read cannot be weighed.
11. **Keep the order of fixes stable:** inhibitors, then Retrieval, then Signals, then Artifacts and Channels, then Measurement. Inside each tier, sort days, weeks, quarters.
12. **Pick the one next skill** using the routing in Next skill below. One skill, with the reason.

## Guardrails
- Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Use the element content as written in elements.json. Name elements as `Symbol Name`, for example `Rb robots.txt` and `Pc Pricing clarity`. Do not add elements or rename them.
- No total score out of 69 as a headline unless every square has a status. Report counts of Present, Blank, Inhibitor present, Not applicable and Pending as plain counts.
- If a number is needed that the user did not supply, write `[NUMBER NEEDED: what it is]`.
- Respect each element's `watch_out`. `Lt llms.txt` and `Ax agents.txt` are low priority: Google says it does not use llms.txt, and no major engine has confirmed it reads agents.txt. Do not rank them above an inhibitor.
- Do not claim a fix will move a ranking, a citation, or a share of voice. State the time-to-effect tag and what to measure afterward (`Ps Prompt set`, then `Sv Share of voice`).
- Keep inhibitors outlined and separate from the additive map. They are things to remove, not gaps to fill.
- Do not mention any tool, vendor or product beyond what the user pasted.
- Grade only the user's own page, or a page they are authorized to grade.

## Output format
Return, in this order. Plain nouns, short sentences, no summary adjectives.
1. **Inputs read**: one line each for what you received and what was missing (so Pending is honest).
2. **Blank-square map**: one table per group. Columns: Number · Symbol Name · Status · One-line reason to verify · Time to effect.
3. **Counts**: Present, Blank, Inhibitor present, Not applicable, Pending, as plain counts per group.
4. **Inhibitors present**: ordered days, then weeks, then quarters. Each with the `the_move` text and the five-minute check.
5. **Buyer-question check**: the three questions, each with the passage that answers it or "no passage found".
6. **Your weekend**: all days-tagged moves for Blank squares, in order. Say which take five minutes and which take an afternoon.
7. **Your quarter**: all quarters-tagged moves (for example `Bn Benchmark`, `Et Entity`, `Ds Dataset`), with the one to start first and why.
8. **Pending inputs**: the exact things to paste back to settle each Pending square.
9. **The one next skill to run**, and the single reason.


Row format for the map, one line per element:

| No. | Symbol Name | Status | Verify by | Time |
|---|---|---|---|---|
| 9 | `Rb robots.txt` | Pending | Paste yourdomain.com/robots.txt | days |
| 28 | `Pc Pricing clarity` | Blank | Page says "Contact us"; no starting price found | weeks |
| 60 | `Bc Blocked crawler` | Pending | Paste robots.txt; read each Disallow line | days |

Keep reasons to one line. If a reason needs a paragraph, the square is Pending.

## Next skill
If any inhibitor is present, run `inhibitor-sweep`. If none, run `retrieval-gate-check`, then `citable-sentence-rewriter`, `machine-readable-files`, `artifact-picker`, `channel-router`, and `prompt-set-and-scoreboard`. Run this audit again next month.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
