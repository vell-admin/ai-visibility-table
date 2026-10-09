---
name: retrieval-gate-check
description: Run the 14 retrieval elements (9–22) as pass/fail gates to learn whether a machine can read your page at all, with the exact check, the paste-back, and the fix for each. Use after the inhibitor sweep, or whenever a page is good but never quoted, cited, or found.
---

# The Retrieval Gate Check

**Role.** Act as the operator who tests whether a crawler can find, fetch, parse and quote a page. Signals only count once a machine can read you. This skill covers access and structure, not wording.

> Run `inhibitor-sweep` first. A blocked crawler or a JavaScript-only page fails several gates below at once, and fixing it first saves the rest of the check.

## Ask the user for these inputs first
- The one to three page URLs you most want cited, and their pasted HTML from View Page Source (not the rendered page).
- The text of robots.txt, llms.txt, agents.txt and sitemap.xml, each pasted from yourdomain.com/<file>. A file that returns a not-found page is a finding: say "not found".
- The category and one buyer question the page should answer.
- For video pages: the URL of the page that hosts the video and whether a transcript is published on it.
- A list of the names your company uses across profiles (website, LinkedIn, directories, marketplace).

If any are missing, ask one focused question rather than guessing. Mark the gate Pending and name the paste that would settle it.

## Method
Test each gate in this order: days, then weeks, then quarters. Each gate ends in Pass, Fail, or Pending. Do not skip a gate because the page looks fine; machines read what the source says.
**Days**
1. **`Rb robots.txt` (9)**
   - Open: Paste robots.txt.
   - Pass if: each crawler you depend on is allowed by name, and no default rule shuts out the others you want.
   - Paste back: the full file.
   - Fix: list the crawlers you depend on and allow them by name before you block anything by default. Do not allow every crawler: allow the named ones you want.
2. **`Sm Sitemap` (10)**
   - Open: Paste sitemap.xml, or the first screen of it.
   - Pass if: every page you want cited is listed, and lastmod reflects real edits, not a build timestamp.
   - Paste back: the entries for your target pages, with their lastmod values.
   - Fix: list every page you want cited, and set lastmod to real edit dates. A sitemap only says this exists; it does not make a page worth citing.
3. **`Lt llms.txt` (11)**
   - Open: Paste llms.txt.
   - Pass if: a plain-text file exists and points to your definitions, pricing, and proof pages.
   - Paste back: the file, or the words "not found".
   - Fix: publish one as a hint, not a guarantee. Google says it does not use the file for Search, AI Overviews or AI Mode. Ship it cheap and expect nothing from Google.
4. **`Ax agents.txt` (12)**
   - Open: Paste agents.txt.
   - Pass if: every capability it declares works end to end for a bot.
   - Paste back: the file, and for each capability the result of trying it logged out.
   - Fix: declare only capabilities that genuinely work. Start with one, such as fetching current pricing. No major engine has confirmed it reads the file, so spend no more than an afternoon.
5. **`At Alt text` (20)**
   - Open: List the alt text on every image that carries a finding: charts, screenshots, diagrams.
   - Pass if: alt text states what the image proves, once, not what it depicts and not a keyword list.
   - Paste back: each image filename with its alt text.
   - Fix: describe the finding. "chart.png" fails; a sentence with the finding passes.
6. **`Hd Heading map` (21)**
   - Open: List every H2 and H3 on the page.
   - Pass if: each heading is a claim or a question, never a label such as Overview or Features.
   - Paste back: the heading list in order.
   - Fix: rewrite each label as the question it answers. Keep question headings short; long ones stop reading as headings.

**Weeks**
7. **`Jl JSON-LD` (13)**
   - Open: Search the source for application/ld+json.
   - Pass if: Organization and Product markup exist and say the same thing as the visible page.
   - Paste back: the JSON-LD block and the visible price and name beside it.
   - Fix: start with Organization and Product; everything else is optional until those two are right. Markup that disagrees with the page is ignored or flagged.
8. **`Ck Chunk` (15)**
   - Open: Pick three sections and read each alone, as if torn out of the page.
   - Pass if: each section names its subject in its first sentence and makes sense alone.
   - Paste back: the first sentence of each of the three sections.
   - Fix: restate the subject in the first sentence of each section instead of writing "it" or "this". Do it once per section, not every sentence.
9. **`Sr Server render` (16)**
   - Open: View Page Source and search for your main claim and your price.
   - Pass if: both appear in the raw HTML.
   - Paste back: the source around each, or "not found".
   - Fix: render the pages you want cited on the server; leave app screens alone. If this fails, `Jo JS-only` is present: go back to `inhibitor-sweep`.
10. **`Fr Freshness` (17)**
   - Open: Find a published date and an updated date on the page.
   - Pass if: both are visible, and the updated date moves only when the content changed.
   - Paste back: the dates and the last real edit you made.
   - Fix: add real dates and bump them only on real change. Fake freshness backfires.
11. **`Cn Canonical` (18)**
   - Open: Search the source for rel="canonical", and check the trailing-slash version of the URL.
   - Pass if: one canonical URL, and every duplicate or syndicated copy points to it.
   - Paste back: the canonical tag from each address that carries the content.
   - Fix: point every duplicate at one canonical URL before building more links. That URL must be the best version.
12. **`Tr Transcript` (19)**
   - Open: Open the page that hosts each video.
   - Pass if: the words of the video exist as text on a real page you control.
   - Paste back: the page URL and the first lines of the transcript.
   - Fix: publish a cleaned transcript on a real page. Raw auto-captions carry errors, and a wrong product name can be quoted as written.
13. **`Ln Internal links` (22)**
   - Open: List the anchor text of links to the target page.
   - Pass if: anchors describe the destination and are varied; no "click here" or "learn more".
   - Paste back: the anchors, with the page each points to.
   - Fix: link with the natural words you want to be found for. The same anchor fifty times reads as manipulation.

**Quarters**
14. **`Et Entity` (14)**
   - Open: List the company name as spelled on each profile and in the page markup.
   - Pass if: one canonical spelling, identical everywhere, with corroborating profiles.
   - Paste back: each profile URL with the spelling used.
   - Fix: pick one canonical name and spelling and use it identically. Entity signals take quarters to build and quarters to fix, so a rename costs more than it looks.

## Guardrails
- Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Use the element content as written in elements.json. Name elements as `Symbol Name` with the element number.
- Report a gate as Pass only on pasted evidence. Report no outcome claim such as "this will get you cited"; each gate removes a reason to be skipped, and nothing more.
- Do not rank `Lt` or `Ax` above a failed `Rb`, `Sr` or `Cn`. The convention files are hints; the gates are access.
- Do not request edits to pages the user does not control.

## Output format
Return, in this order:
1. **Gate table**: Number · Symbol Name · Pass / Fail / Pending · What the paste showed (one line) · Time to effect.
2. **Failed gates, in fix order**: days first, then weeks, then quarters. Each with the exact change and the check that proves it.
3. **Cheapest proof**: one `Pp Perplexity` check to run after the days fixes. Ask your category question, and note whether your domain appears in the sources. Record the date. A fix that changes nothing there has not been proven.
4. **Pending list**: what to paste back, per gate.
5. **Hand-off**: whether the page is now readable enough to rewrite its sentences.

## Next skill
Run `citable-sentence-rewriter` once the days-tagged gates pass. Run `machine-readable-files` to generate the fix for `Lt`, `Ax`, `Jl`, and `Et`.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
