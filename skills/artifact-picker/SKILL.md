---
name: artifact-picker
description: Choose which of the ten artifacts to make next, given a time budget and what already exists, and return a one-page spec for it. Use when the page is readable and the next question is what to publish that machines and people will both cite.
---

# Artifact Picker

**Role.** Act as the editor who picks one artifact, not ten. The ten are `Td Teardown`, `Bn Benchmark`, `Ds Dataset`, `Cs Case study`, `Rk Runbook`, `Ca Calculator`, `Sh Screenshot`, `Vo Video`, `Ni Newsletter`, and `Tp Template`. The answer is the one the user can finish and defend with what they already have.

## Ask the user for these inputs first
- Time budget: an afternoon, a week, or a quarter
- Which of the ten already exist, with a URL for each, and the date each was last updated
- What the company knows or does that its competitors do not (a process it runs, data it holds, a result it measured)
- Customer proof on hand: a measured before and after, with the number, the timeframe, and whether the customer approved the number (not just the logo)
- Whether anyone can approve a named teardown, a public dataset, or a customer story
- The three real buyer questions from the audit, if the audit was run

If any are missing, ask one focused question rather than guessing.

## Method
1. **List what exists and what is stale.** For each of the ten, mark: exists and current, exists and stale, or a blank square. A stale `Rk Runbook` is worse than none, so a stale one goes on the fix list ahead of any new build.
2. **Filter by time budget, in tag order.**
   - **Afternoon (days):** `Sh Screenshot`. Real screen, real data, cropped tight. Blur what you must; never fake the rest.
   - **A week (weeks):** `Td Teardown`, `Cs Case study`, `Rk Runbook`, `Vo Video`, `Tp Template`.
   - **A quarter (quarters):** `Bn Benchmark`, `Ds Dataset`, `Ca Calculator`, `Ni Newsletter`.
   Anything tagged quarters is a start, not a finish, inside a smaller budget. Say so.
3. **Apply the readiness test to each candidate.** Use the element's own move:
   - `Td Teardown`: a real example the user did not make, nameable, and the user would be fine with its owner reading it.
   - `Cs Case study`: a number and a timeframe, approved by the customer.
   - `Rk Runbook`: a procedure the user already runs internally, with an owner and a date.
   - `Tp Template`: the artifact they normally deliver in week one, with the paid thing clearly more.
   - `Vo Video`: a transcript and a search-written description ship with it, or it does not ship.
   - `Bn Benchmark` and `Ds Dataset`: a measurement at n greater than fifty, a published method, a stable URL, a license. Ask for the sample size; do not assume it.
   - `Ca Calculator`: one question answered exactly, no signup, math tested before release.
   - `Ni Newsletter`: the same substance as what is published, on a schedule the user will keep.
4. **Pick one.** Prefer the candidate that passes its readiness test, fits the budget, and answers one of the user's three buyer questions. If two tie, take the shorter time-to-effect.
5. **Write the one-page spec** for the pick: working title, the question it answers, the proof it rests on, the format, the URL it will live at, who approves it, the date it will be reviewed, and the `[NUMBER NEEDED: ...]` marks for every figure the user has not supplied.
6. **Name the runner-up and the one to skip this round,** each with the input that would change the choice.

## Reference: the ten artifacts, as written

**Td Teardown** (weeks)
- Move: Tear down something you did not make, name it, and be fair. Cheap to produce, hard to ignore.
- Watch out: Naming competitors invites them to respond. Be accurate enough that you would be fine with them reading it.

**Bn Benchmark** (quarters)
- Move: Measure something in your niche at n greater than fifty, publish the method, and repeat it on a schedule.
- Watch out: Takes a quarter to produce and a quarter to get noticed. Slowest element on the table, and the most durable.

**Ds Dataset** (quarters)
- Move: Publish the data at a stable URL with a license. A benchmark you cannot check is a claim, not a source.
- Watch out: Publishing data means people can find your mistakes. Check it twice and version it.

**Cs Case study** (weeks)
- Move: Lead with the number and the timeframe. Company logos are not evidence of anything.
- Watch out: Customers have to approve it, and some will not. Get permission for the number, not just the logo.

**Rk Runbook** (weeks)
- Move: Write the one you already run internally. The version you use is better than the version you would write.
- Watch out: A runbook that goes stale is worse than none, because people follow the wrong step. Date it and own it.

**Ca Calculator** (quarters)
- Move: Make it answer one question exactly, with no signup. Gating it converts a linkable asset into a form.
- Watch out: Takes real build time, and a wrong formula gets screenshotted. Test the math before it ships.

**Sh Screenshot** (days)
- Move: Show the real screen with real data, cropped tight. Mockups read as mockups to everyone.
- Watch out: Real screens leak real data. Blur what you must; never fake the rest.

**Vo Video** (weeks)
- Move: Ship it with a transcript and a description written for search, not a one-line caption.
- Watch out: Expensive to redo. If a feature changes, the video is wrong until you re-shoot.

**Ni Newsletter** (quarters)
- Move: Send the same substance you publish. A newsletter that only announces posts teaches people to ignore it.
- Watch out: Slow to grow and easy to neglect. Missing issues costs more than never starting.

**Tp Template** (weeks)
- Move: Give away the artifact you would normally deliver in week one. It qualifies buyers faster than a demo.
- Watch out: A template can look like the whole product. Make sure the paid thing is clearly more.

## Guardrails
- **Grounding.** Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Do not recommend a benchmark or dataset without a stated sample size and method from the user. A benchmark you cannot check is a claim, not a source.
- Do not draft a customer result. A case study without an approved number is blocked, not softened.
- Naming a competitor in a `Td Teardown` invites a response. Require that the user is comfortable with it being read.
- Real screens leak real data. Ask what is on the screen before approving a `Sh Screenshot`.
- Subtract before you add: if the audit found an inhibitor still present, say the artifact will be read through it, and route back to `inhibitor-sweep`.

## Output format
Return, in this order:
1. **Inventory table** — artifact · exists / stale / blank · URL · last updated.
2. **Shortlist by time-to-effect** — days first, then weeks, then quarters, each with its readiness test result.
3. **The pick** — one artifact, one sentence on why it beats the others for this budget.
4. **One-page spec** — title, question answered, proof, format, URL, approver, review date, open `[NUMBER NEEDED]` items.
5. **Runner-up and skip** — one line each.

## Next skill
Run `channel-router` to decide where the artifact goes and in what form.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
