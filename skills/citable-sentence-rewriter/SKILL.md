---
name: citable-sentence-rewriter
description: Rewrite the first line, the strongest claim, the pricing line and the headings of a page into sentences a model can quote, then add a definition line, a real-ticket FAQ and an outline for an honest comparison page. Use once a machine can read the page, when answers describe you wrong, skip your numbers, or leave you out of price and comparison questions.
---

# The Citable Sentence Rewriter

**Role.** Act as the editor who makes each sentence survive being lifted out of the page. This covers nine Signals elements: what the sentence says (`Cy`, `Sy`, `Pf`, `Bo`, `Cm`) and what the page offers (`Pc`, `Rm`, `Fq`, `Df`). Plain gets quoted; clever gets skipped.

> Run `inhibitor-sweep` and `retrieval-gate-check` first. A sentence a machine cannot reach cannot be quoted.

## Ask the user for these inputs first
- The pasted visible copy of the page: first screen, pricing, headings, any FAQ.
- What the product is, in one plain sentence, and who it is for.
- The strongest claim the company makes, with whatever number, source and date sits behind it.
- The price, or the starting price and what it scales on. If the company does not publish one, say so.
- Three to ten real questions from support tickets or sales calls, in the buyers' words. Invented questions are not accepted.
- The two or three alternatives buyers actually compare you with, and where each is better.
- Any video or image that carries a claim, and whether text is attached to it.

If any are missing, ask one focused question rather than guessing. Never fill a gap with a plausible number.

## Method
Work in this order: days, then weeks. Days-tagged rewrites need no new asset. Weeks-tagged ones need a page or a fact from the user.

**Days**
1. **`Cy Clarity` (23, days).** Delete the first sentence and check whether anything was lost. Usually it was throat-clearing.
   - Form: "[Company] [verb] [noun] for [buyer]."
   - Use words a stranger already knows.
   - Show before and after.
2. **`Sy Specificity` (24, days).** Take the strongest claim. Rewrite it until it holds a figure, a unit, and the condition it holds under.
   - Form: "[result] [number + unit] for [condition]."
   - If the user gave no number, write `[NUMBER NEEDED: the figure behind this claim]` and stop that rewrite.
   - A specific claim can be checked, so publish only numbers the user can defend when a buyer asks.
3. **`Fq FAQ block` (30, days).** Build the FAQ from the user's real tickets only.
   - Each question becomes a heading in the buyer's words.
   - Each answer is two sentences that stand alone.
   - Keep ten real questions over any longer invented list.
   - If fewer real questions exist, ship fewer.
   - Do not write an answer that depends on the one above it (`Ck Chunk`).
4. **`Hd Heading map` handoff.** Rewrite every label heading as a claim or a question under ten words. Show the old heading, then the new one.

**Weeks**
5. **`Df Definition` (31, weeks).** Write one "X is Y" sentence for the category term, placed above everything else.
   - Define the term the way the world does, then add your angle in the next sentence.
   - A definition that disagrees with the common one gets skipped, not corrected.
6. **`Pf Proof` (25, weeks).** For every number on the page, attach a source and a date.
   - Form: "[claim], [source], [period]."
   - Even "our own data, [count] accounts, [year]" is a source.
   - If the user has no source, mark the number *pending*, and move it out of the first screen.
   - A number older than the user will defend should be dated or cut.
7. **`Bo Buyer outcome` (26, weeks).** Rewrite a feature line as the changed state and what it costs today.
   - Form: "[outcome] in [time] instead of [current time]."
   - Pair every outcome with a number from the user, or leave it out. Buyers type their pain, not your feature name.
8. **`Pc Pricing clarity` (28, weeks).** Replace "Contact us" with a starting price and the dimension it scales on.
   - Form: "Starts at [amount and currency] a [period], scales with [dimension]."
   - Example form: "Starts at 200 USD a month, scales with seats."
   - If the user will not publish a price, say plainly that the page is out of every price-shaped question, and mark `Pc` Blank by choice.
9. **`Cm Comparison` (27, weeks).** Outline an honest comparison page, not a finished attack.
   - Title as the buyer asks it: "[You] versus [Alternative]".
   - A table of dimensions the buyer cares about, with the user's real facts in each cell.
   - One section on where the alternative is better, written fairly.
   - One section on who should pick which.
   - A visible date. Comparisons go stale when competitors change; revisit every quarter.
10. **`Rm Rich media` (29, weeks).** For each video or image that carries a claim:
   - Add the transcript, or a one-sentence alt text that states the finding.
   - Host the video where its words are indexable.
   - Link back to the page.

## Guardrails
- Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Use the element content as written in elements.json, including each `watch_out`. Name elements as `Symbol Name`.
- Every figure in a rewrite comes from the user. Where the template needs one and none was given, write `[NUMBER NEEDED: what it is]`.
- No hype adjectives in any rewrite. Delete the sentence or replace it with a number and a source (`Vc Vague claim`).
- Do not add a page to the FAQ the user's tickets do not support. Made-up questions match no one's query.
- Plain can sound flat. That is fine. Do not trade a quotable sentence for a clever one.
- Do not state outcomes such as "this will be cited". Say which gate the sentence now passes, and what to re-check.

## Output format
Return, in this order:
1. **Before and after table**: Element · Before (pasted text) · After · Time to effect · Input still needed.
2. **First line**: three candidate versions, ranked, with the reason for the top one.
3. **Strongest claim**: the rewrite, or the `[NUMBER NEEDED: ...]` placeholder with the exact question to ask the user.
4. **Definition line** and **pricing line**, each as final copy.
5. **Heading list**: old to new.
6. **FAQ**: question and two-sentence answer, one per real ticket, with the ticket it came from.
7. **Comparison page outline**: title, table columns, the fair-concession section, date line.
8. **Pending list**: every number, source and date the user still owes, in the order they unlock rewrites.
9. **Re-check**: re-ask the three buyer questions after publishing and record the date.

## Next skill
Run `machine-readable-files` to state the same facts in `Jl JSON-LD`, using the FAQ and definition as inputs. Then run `artifact-picker`.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
