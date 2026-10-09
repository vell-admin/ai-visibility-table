---
name: prompt-set-and-scoreboard
description: Build a frozen 30-question prompt set from real sales and support questions, then a monthly scoreboard for the eight measurement elements with unit and direction, plus a switchback test design. Use to start measuring AI visibility or to rerun the count next month.
---

# Prompt Set and Scoreboard

**Role.** Act as the person who builds the ruler before the measurement. The ruler is `Ps Prompt set`. The scoreboard is `Sv Share of voice`, `Mt Mentions`, `Ci Citations`, `Ar AI referrals`, `Bs Brand search`, and `Im Impressions`. The test is `Sb Switchback`. Without a fixed ruler, every other number drifts.

## Ask the user for these inputs first
- Real buyer questions from sales calls, support tickets, and inbox threads, pasted as they were asked. Aim for more than thirty so the best thirty can be chosen.
- The category and the three to five names the buyer compares you against
- Which engines the user can check by hand this month (they paste the answers back)
- Access they have: Search Console, an analytics tool with referrer data, any AI-tracking tool
- Last month's counts, if a scoreboard already exists, and the prompt-set version they were taken against
- Any change they shipped and the date it went live (for the switchback)

If any are missing, ask one focused question rather than guessing.

## Method
1. **Build `Ps Prompt set` (days).** Write thirty real buyer questions, freeze them, date the file, and change it only on purpose. Real questions are boring and specific; resist the ones you wish buyers asked. Spread them across the buyer journey. Write the file header as: set name, version date, count (30), source of each question (call, ticket, thread).
2. **Check coverage.** Report the percent of buyer-journey stages and real sales-call questions the set represents, from the user's own list. If they gave no stage list, mark coverage *pending*.
3. **Run the first count by hand.** Give the user the exact steps: open each engine, paste each prompt in a fresh session, copy the full answer and its source list back, one block per prompt. Name the engine and the date on every block. One check is noise; a trend across months is signal.
4. **Fill the scoreboard** using the fields below, verbatim. Order by time-to-effect.
5. **Report named-but-unlinked separately.** It is usually the earliest sign something started working. Tag each mention positive, neutral, or negative.
6. **Read `Im Impressions` only beside a downstream number.** Never report it alone.
7. **Design the switchback (quarters)** only for a change big enough to matter. See the design block below.
8. **Set the monthly rerun.** Same prompt set, same engines, same day of the month. Any prompt change is logged with its date and the old count is kept against the old version.

## The scoreboard fields (verbatim from the table)

**Ps Prompt set** (days)
- Unit: Not a metric; the ruler. Its unit is a count of prompts (30) and a version date.
- Direction: Stable is good. Changes between periods should be zero unless deliberate, and every change gets a date.
- Alternates: Coverage: percent of buyer-journey stages or real sales-call questions the set represents. Prompt volume weighting if you have search data.

**Mt Mentions** (weeks)
- Unit: Count per period: how many answers named you across the frozen prompt set this month, or mention rate as a percent of prompts.
- Direction: Higher is better, with one check: a mention can be negative. Tag each one positive, neutral or negative.
- Alternates: Named-but-unlinked vs linked (track separately), mention rate per prompt, or sentiment-split counts.

**Ci Citations** (weeks)
- Unit: Count per period: answers that link to your domain as a source, or citation rate as cited answers ÷ prompts.
- Direction: Higher is better.
- Alternates: Unique cited URLs (how many different pages earn citations), citation share (yours ÷ all citations), or position of your link in the source list.

**Ar AI referrals** (weeks)
- Unit: Sessions per period from AI referrers (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com and the rest), and that segment's conversion rate as a percent.
- Direction: Higher is better on both. Expect under 2% of sessions; the proof is the conversion rate running several times organic.
- Alternates: Share of total sessions, assisted conversions, revenue per AI session. Many AI visits arrive as 'direct' and are not counted here.

**Im Impressions** (weeks)
- Unit: Count: times you were shown, as Search Console impressions or an AI-tracking tool's appearances.
- Direction: Neutral on its own. Read it only as a ratio: citations per 100 impressions. 10,000 impressions and 2 citations is a problem; 500 and 40 is a win.
- Alternates: Impression share within your prompt set, or citations ÷ impressions as the one number worth watching.

**Sv Share of voice** (quarters)
- Unit: Percent of prompts in which you are named: named ÷ total prompts × 100.
- Direction: Higher is better. 20% means named in 6 of 30.
- Alternates: Share of citations (your citations ÷ all citations in the answers), average list position when named (lower is better), or volume-weighted share if some prompts matter more.

**Bs Brand search** (quarters)
- Unit: Branded search impressions and clicks per month from Search Console, or a Google Trends index from 0 to 100.
- Direction: Higher is better, and it lags everything else by weeks to months.
- Alternates: Count of distinct branded queries, direct traffic as a proxy, or brand-name mention volume across the web.

**Sb Switchback** (quarters)
- Unit: Lift in percentage points: citation rate in on-weeks minus citation rate in off-weeks.
- Direction: Higher positive is better. Near zero means the change didn't matter. Negative means undo it.
- Alternates: Ratio (on ÷ off), raw citation count delta. Minimum one week per block and at least two on/off cycles before you believe it.

## Switchback design
- Change under test: one change, one live date, one page set.
- Blocks: alternate on and off windows. Run windows long enough to clear the crawl cycle; a week is usually the floor.
- Cycles: at least two on/off cycles before reading the result.
- Measure: citation rate across the frozen prompt set at the end of each block.
- Pre-register the schedule in the file before the first block starts. Slow and fiddly: skip it for small changes.

## Guardrails
- **Grounding.** Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Never adjust the prompt set to improve a number. Changes are deliberate, dated, and versioned.
- Mark any month with fewer than thirty answered prompts as *partial* and name the missing ones.
- `Ar AI referrals` attribution is leaky. Report it as a floor, not a total.
- Citations do not equal clicks, and `Im Impressions` rewards volume over relevance. Say both in the output.
- Subtract before you add: if an inhibitor is still present, log it beside the scoreboard so a flat month is read correctly.

## Output format
Return, in this order:
1. **Prompt-set file** — header (name, version date, count, sources) and the thirty questions.
2. **Coverage line** — percent, or *pending* with the input needed.
3. **Scoreboard table** — element · unit · this month · last month · direction read · source of the number.
4. **Notes on each reading** — named-but-unlinked split, sentiment tags, cited URLs, and any partial months.
5. **Switchback plan** — if a change qualifies, the schedule and the pre-registered measure; otherwise one line saying why not.
6. **Next month's rerun date** — and the single input to bring.

## Next skill
Run `ai-visibility-audit` again next month, against the same prompt set.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
