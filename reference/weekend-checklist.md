# The weekend checklist — 16 fixes tagged "days"

From the Periodic Table of AI Visibility, edition 2026.2. Print it, do it in order, tick the box. Inhibitors first: removing one is faster than adding anything above it.

Canonical: https://www.itsrondavis.com/ai-visibility · Data: https://github.com/vell-admin/ai-visibility-table


## Inhibitors

- [ ] **Bc Blocked crawler** — Audit robots.txt line by line. This is the highest-cost, lowest-effort mistake on the whole table.
  - *Watch out:* Unblocking everything lets the scrapers back in. Allow by name.
- [ ] **Jw Jargon wall** — Read the first paragraph aloud to someone outside your category. Rewrite whatever they ask about.
  - *Watch out:* Some jargon is the search term. Keep the term, explain it in the next sentence.
- [ ] **Vc Vague claim** — Replace each one with a number and a source, or delete the sentence entirely.
  - *Watch out:* Deleting them shrinks the page. Good. That is the point.
- [ ] **Nd No date** — Add a published and updated date sitewide. It is a template change, not a content project.
  - *Watch out:* Adding dates exposes how old some pages are. Update or prune the worst ones.

## Retrieval

- [ ] **Rb robots.txt** — List the crawlers you actually depend on and allow them by name before you block anything by default.
  - *Watch out:* Allowing every crawler also invites the ones that only scrape. Allow the named ones you want, not a blanket yes.
- [ ] **Sm Sitemap** — Confirm every page you want cited is in it, and that lastmod reflects real edits rather than a build timestamp.
  - *Watch out:* A sitemap only says 'this exists.' It does not make a page worth citing; it just makes sure the page gets read.
- [ ] **Lt llms.txt** — Publish one that points at your definitions, pricing, and proof pages. Treat it as a hint, not a guarantee.
  - *Watch out:* Google says it does not use the file for Search, AI Overviews or AI Mode (May 2026 guidance), and most files get no traffic at all. Ship it cheap; expect nothing from Google.
- [ ] **Ax agents.txt** — Only declare capabilities that genuinely work. A false claim here fails in front of the buyer's agent, not yours.
  - *Watch out:* Still an early convention. No major engine has confirmed it reads the file, so do not spend more than an afternoon on it until one does.
- [ ] **At Alt text** — Describe what the image proves, not what it depicts. 'Bar chart' says nothing; the finding says everything.
  - *Watch out:* Stuffing keywords into alt text reads as spam and hurts screen-reader users. Describe the finding, once.
- [ ] **Hd Heading map** — Make every heading a claim or a question, never a label like 'Overview'. Labels carry no retrievable meaning.
  - *Watch out:* Question-shaped headings get long. Keep them under ten words or they stop reading as headings.

## Signals

- [ ] **Cy Clarity** — Delete the first sentence and check whether anything was lost. Usually it was throat-clearing.
  - *Watch out:* Clear can sound plain. That is fine. Plain gets quoted; clever gets skipped.
- [ ] **Sy Specificity** — Rewrite your strongest claim until it contains a figure, a unit, and the condition it holds under.
  - *Watch out:* A specific claim can be checked and can be wrong. Only publish numbers you can defend when a buyer asks.
- [ ] **Fq FAQ block** — Use your real support tickets as the question list. Invented questions match no one's actual query.
  - *Watch out:* A 40-question FAQ dilutes the page. Ten real questions beat forty invented ones.

## Artifacts

- [ ] **Sh Screenshot** — Show the real screen with real data, cropped tight. Mockups read as mockups to everyone.
  - *Watch out:* Real screens leak real data. Blur what you must; never fake the rest.

## Measurement

- [ ] **Ps Prompt set** — Write thirty real buyer questions, freeze them, date the file, and change it only on purpose.
  - *Watch out:* Real questions are boring and specific. Resist the urge to add the ones you wish buyers asked.

## Engines

- [ ] **Pp Perplexity** — Search your own category here first. If nothing of yours comes back, stop writing and go fix retrieval.
  - *Watch out:* Tiny share of total AI traffic (about 1 to 2%), so it is a thermometer, not a market. Winning here is a test, not a result.

---

When the weekend is done, the next tier is the weeks-tagged elements: run the **Blank-Square Audit** skill to get them in order for your page. https://github.com/vell-admin/ai-visibility-table
