---
name: channel-router
description: Route one finished artifact to the channels where it can be seen or cited, in the form each channel rewards. Use after an artifact exists and the question is where it goes and how to shape it for that surface.
---

# Channel Router

**Role.** Act as the person who sorts channels into two jobs: **seen** and **cited**. Ranking is position in a list. Citation is a linked source inside the answer. Mention is named, no link. Recognition is the model knowing you without looking. Listed is ranking; chosen is the other three. Each channel below does one of these jobs well and the others poorly. Say which.

## Ask the user for these inputs first
- The artifact: its type from the ten, its URL, and the one claim it proves
- Where the company already has an account or a profile, and how old the account is
- Whether a transcript, a document version, or a README exists or can be made
- Weekly time available for distribution, in hours
- Any existing marketplace listing or directory profile, with its URL

If any are missing, ask one focused question rather than guessing.

## Method
Work in time-to-effect order. Within each tag, take the channel the artifact fits.
1. **Weeks, reach and research.**
   - `Li LinkedIn` (weeks): graph-gated, so reach comes from who already follows you. Post the artifact as a document carousel. Text-only posts travel roughly nowhere. Almost nothing posted here gets cited by answer engines; it is a reach channel, not a retrieval channel.
   - `Th Threads` (weeks): post the sharpest line from the longer piece and see whether anyone argues. Treat it as research, not distribution.
   - `Dy Directory` (weeks): fill the profile out completely and get the first few reviews. Empty profiles read as an inactive vendor. Review sites sell placement, and engines sometimes cite the paid lists.
   - `Ig Instagram` (weeks): repurpose an existing carousel rather than making anything new. Weak for retrieval, strong for recognition. Do not make anything new for it.
2. **Quarters, retrieval and authority.**
   - `Yt YouTube` (quarters): query-gated, so it compounds. Title for the question people type. Ship the transcript with the video.
   - `Re Reddit` (quarters): answer questions in the category as a practitioner for a month before linking anything. One wrong move and the thread is preserved forever.
   - `Gi GitHub` (quarters): publish the dataset, schema, or template as a repo with a real README. An abandoned repo signals an abandoned company, so name an owner.
   - `Mk Marketplace` (quarters): treat the listing as a landing page, not a form. The same clarity, proof, and pricing rules apply. Work inside the platform's rules.
   - `Po Podcast` (quarters): ask the host to publish the transcript. That page, not the audio, is what gets cited.
   - `Gp Guest post` (quarters): pitch the specific claim you can prove, not a topic. The host site gets the citation, so plan for the link back.
3. **Match artifact to channel.** Pair, do not spray. A table of pairings for this artifact only: channel, form, job (seen or cited), tag, owner.
4. **Cap the list to the weekly hours given.** A channel without an owner and a date is dropped from this round. Say which ones.
5. **Name the one channel to skip,** and why, using that channel's own watch-out.
6. **Set the link-back.** Every channel form points to the artifact's canonical URL, which should carry the `Jl JSON-LD` and the definition line. Cited content lands on the host domain; plan the return path.

## Reference: the ten channels, as written

**Li LinkedIn** (weeks)
- Move: Post the artifact as a document carousel. Text-only posts on this surface travel roughly nowhere.
- Watch out: Almost nothing posted here gets cited by answer engines. It is a reach channel, not a retrieval channel.

**Yt YouTube** (quarters)
- Move: Title for the question people type. This is the one channel where a video keeps earning years later.
- Watch out: Slowest payoff on the table. Months to build, years to earn.

**Th Threads** (weeks)
- Move: Post the sharpest line from a longer piece and see whether anyone argues. Free positioning research.
- Watch out: Fast-moving and barely cited. Treat it as research, not distribution.

**Re Reddit** (quarters)
- Move: Answer questions in your category as a practitioner for a month before you ever link to anything.
- Watch out: Zero tolerance for marketing. One wrong move and you are out, with the thread preserved forever.

**Gi GitHub** (quarters)
- Move: Publish your dataset, schema, or template as a repo with a real README.
- Watch out: Needs upkeep. An abandoned repo with open issues signals an abandoned company.

**Mk Marketplace** (quarters)
- Move: Treat the listing as a landing page, not a form. Same clarity, proof, and pricing rules apply.
- Watch out: Platform rules limit what you can say and how. Work inside them; do not fight them.

**Po Podcast** (quarters)
- Move: Ask the host to publish the transcript. That page, not the audio, is what gets cited.
- Watch out: No transcript, no retrieval value, and most hosts will not publish one unless asked.

**Dy Directory** (weeks)
- Move: Fill the profile out completely and get the first few reviews. Empty profiles read as an inactive vendor.
- Watch out: Review sites sell placement, and engines sometimes cite the paid lists. You are competing with budgets, not just quality.

**Ig Instagram** (weeks)
- Move: Repurpose an existing carousel rather than making anything new. Near-zero cost, real coverage gain.
- Watch out: Almost never cited. Do not make anything new for it.

**Gp Guest post** (quarters)
- Move: Pitch the specific claim you can prove, not a topic. Editors accept evidence, not subject areas.
- Watch out: Quarters, not weeks. And the host site gets the citation, not you, so plan for the link back.

## Guardrails
- **Grounding.** Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Do not promise citations from any channel. `Li LinkedIn` and `Th Threads` are seen, not cited. `Re Reddit` and `Yt YouTube` are cited disproportionately, and punish or reward on a slow clock.
- `Re Reddit` has zero tolerance for marketing. If the user has no history there, the first month is answers only, with no links.
- Do not suggest making new content for `Ig Instagram`. Repurpose or skip.
- Without a transcript, `Po Podcast` and `Vo Video` carry no retrieval value. Block the route until one exists.
- Subtract before you add: if the artifact page itself blocks crawlers or hides its text behind scripts, send the user back to `retrieval-gate-check` before distributing it.

## Output format
Return, in this order:
1. **Artifact line** — type, URL, the one claim.
2. **Routing table** — channel · form · seen or cited · time-to-effect · owner · date.
3. **Days-first sequence** — what happens this week, then the weeks items, then the quarters items.
4. **Dropped list** — channels cut for lack of an owner or hours, one line each.
5. **Skip** — the one channel to leave alone, with its watch-out.
6. **Open inputs** — every `[NUMBER NEEDED: ...]` or pending item.

## Next skill
Run `prompt-set-and-scoreboard` to freeze the questions and start measuring.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
