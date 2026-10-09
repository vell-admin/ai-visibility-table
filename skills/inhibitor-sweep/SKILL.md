---
name: inhibitor-sweep
description: Test the ten inhibitors (elements 60–69) one by one and return a remove-list ordered by time to effect, five-minute fixes first. Use before adding any content or markup, or when the audit reports an inhibitor present, a page that vanished from answers, or a page that reads blank to machines.
---

# The Inhibitor Sweep

**Role.** Act as the operator who removes what is in the way before anything is added. Inhibitors are the outlined tiles on the table: detached from the rest, because you subtract them instead of building them. A blocked page cannot be helped by better copy.

> Subtract before you add. Run this before `retrieval-gate-check` and before any rewrite.

## Ask the user for these inputs first
- The text of robots.txt. Open yourdomain.com/robots.txt, select all, paste.
- The pasted HTML of the one to five pages that matter most: the home page, the pricing page, and the page you most want quoted. Use View Page Source, not the rendered page.
- Whether your best proof (case study, benchmark, report) sits behind a form or a payment. Paste the URL and say what a visitor sees before the form.
- A list of your published URLs for the same content, if you suspect copies: the blog, Medium, LinkedIn, a syndicated copy.
- A crawl export of your pages with inbound link counts, if you have one. If not, say so and the orphan test is marked pending.
- A rough count of pages published in the last year and which of them you would defend if a buyer read them.

If any are missing, ask one focused question rather than guessing. Anything not pasted is marked pending, with the input that would settle it.

## Method
Run the ten tests in this order. Each ends in Pass, Fail, or Pending. Every test names what to open and what to paste back.

**Days (five-minute fixes first)**
1. **`Bc Blocked crawler`** (days).
   - Open: Open robots.txt and read it line by line, out loud.
   - Fail if: a `User-agent: *` block carries `Disallow: /`, or a rule meant for scrapers also names the crawlers behind the engines you want.
   - Paste back: every Disallow line and the User-agent line above it.
   - The move: audit robots.txt line by line and allow by name, not a blanket yes. Highest cost, lowest effort mistake on the table.
2. **`Nd No date`** (days).
   - Open: Open three substantive pages and look for a published date and an updated date.
   - Fail if: either date is missing on any of them.
   - Paste back: the three URLs and the dates you saw.
   - The move: add published and updated dates sitewide. It is a template change, not a content project.
3. **`Vc Vague claim`** (days).
   - Open: Copy the first screen of the home page and highlight every phrase that cannot be proven wrong, such as "industry-leading" or "enterprise-grade".
   - Fail if: any such phrase exists.
   - Paste back: each phrase with its sentence.
   - The move: replace each with a number and a source, or delete the sentence. If there is no number, write `[NUMBER NEEDED: what it is]` and ask the user.
4. **`Jw Jargon wall`** (days).
   - Open: Read the first paragraph aloud to someone outside your category.
   - Fail if: they ask what any word means.
   - Paste back: every term they asked about.
   - The move: rewrite whatever they ask about. If the term is the search term, keep it and explain it in the next sentence.

**Weeks**
5. **`Jo JS-only`** (weeks).
   - Open: Right-click the pricing page, View Page Source, search for your main claim and your price.
   - Fail if: either is missing from the raw HTML.
   - Paste back: the source around the pricing section.
   - The move: server-render the pages you want quoted and leave the app client-side. Prioritize the pages that matter, not the whole site.
6. **`Ga Gated`** (weeks).
   - Open: Open your best proof in a private window.
   - Fail if: an email form stands between the visitor and the evidence.
   - Paste back: what is visible before the form.
   - The move: ungate the proof and gate the tailored thing instead: the audit, the walkthrough, the custom number.
7. **`Pl Paywall`** (weeks).
   - Open: Open the paid content logged out.
   - Fail if: the definition, the method, and the headline number are all behind the wall.
   - Paste back: what is visible logged out.
   - The move: leave the definition, the method, and the headline number outside the wall.
8. **`Du Duplicate`** (weeks).
   - Open: Search a distinctive sentence from your best page in quotation marks, then open each address that carries it.
   - Fail if: the same content lives at more than one address and no canonical points to one.
   - Paste back: the addresses and the `rel="canonical"` value in each page source.
   - The move: pick the canonical URL and point everything else at it, including syndicated copies.
9. **`Op Orphan page`** (weeks).
   - Open: From the crawl export, list pages with no inbound internal links.
   - Fail if: a page you want cited is on the list.
   - Paste back: that list.
   - The move: delete first, then link each remaining orphan from somewhere real. Do not link junk pages.

**Quarters**
10. **`Sl Slop`** (quarters).
   - Open: List the pages published in the last year and mark each defend or cut.
   - Fail if: the cut pile is larger than the defend pile, or you would not show a cut page to a buyer.
   - Paste back: the two piles.
   - The move: cut the volume and raise the floor. Publishable is a bar, not a synonym for finished.

## Guardrails
- Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Use the element wording as written in elements.json, including each `watch_out`. Name elements as `Symbol Name`.
- Allow crawlers by name. Unblocking everything lets the scrapers back in (`Bc` watch-out).
- Consolidating duplicates can drop traffic briefly while engines re-learn. Tell the user to hold steady (`Du` watch-out).
- Deleting shrinks the page and the site. That is the point (`Vc`, `Sl`). Do not soften it.
- Adding dates exposes how old some pages are. Update or prune the worst ones (`Nd` watch-out).
- Sales teams like the form. Show them the citation count before you take it away (`Ga` watch-out). If the user has no citation count, mark it pending and send them to `prompt-set-and-scoreboard`.
- Do not propose an additive move in this skill. Additive moves belong to the next skills.

## Output format
Return, in this order:
1. **Results table**: Number · Symbol Name · Pass / Fail / Pending · What you saw (one line) · Time to effect.
2. **Remove-list**, ordered days, then weeks, then quarters. Inside days, order by minutes of work, shortest first. Each item: the exact change, where it is made, and the check that proves it is gone.
3. **Five-minute fixes**: the subset of the remove-list that needs no developer and no approval.
4. **Needs a developer**: the items that do (`Jo`, often `Du`), with the pages to prioritize.
5. **Needs a decision**: the items that need the user's call (`Ga`, `Pl`, `Sl`), with the cost named in the `watch_out` text.
6. **Pending inputs**: what to paste back to settle each Pending test.
7. **Re-test line**: after the days fixes, re-ask one buyer question on `Pp Perplexity` and note whether your domain appears. Record the date. Do not claim a result without a dated check.

## Next skill
Run `retrieval-gate-check` once the days-tagged inhibitors are cleared. If `Jo` or `Du` is still open, start its fix now and run the gate check on the pages that already pass.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
