# Where "the teardown" still lives on itsrondavis.com — audit, 2026-10-13

Context: the home no longer asks for the newsletter above the fold (the ask is the free call; the opt-in form stayed in the Periodic Table section, which now owns the `#teardown` anchor). This is every other place the word, the form, or the promise still appears, read from the live Kajabi themes on 2026-10-13. Nothing here was changed.

## 1. The same ported nav on 18 landing pages

Every landing page carries the chrome port (section `rhchrome_nav`, source `kajabi/chrome.json`): nav button **"Send me the teardown" → `/#teardown`**, tagline "Marketplace & AI Visibility GTM". The link still works (it lands on the home newsletter form) but it no longer matches the home nav ("Book a free call", "AI Visibility & Marketplace GTM").

about · work-with-me · coaching · foundry · newsletter · resources · podcast · book-a-call · skill-pack · discovery-kit · start · fractional-cmo · get-read · partner · gear · second-buyer-score · ai-visibility · newsletter-subscribe

Fix: one `update_theme_content` per page with the new `rh_nav` block text (same call shape as the 2026-10-09 port). `/next-steps` is a separate case (below).

## 2. In-page copies, by page

| Page | Where | What it says | Form | Notes |
|---|---|---|---|---|
| `/newsletter` (theme 2166393447) | hero | eyebrow "The weekly teardown", H1 "Every week I tear one down.", points, "Subscribe free" → `/newsletter-subscribe`; page title "The Weekly Teardown — Ron Davis Newsletter" | none on page | The canonical teardown page. Also still carries an embedded old nav + old footer inside the body (`rd-embed`), "AWS Marketplace GTM" tagline. |
| `/newsletter-subscribe` (2166406350, hidden from search) | hero | H1 "Join the weekly GTM teardown", "every **Tuesday**" | 2149622400, "Subscribe free" | Day-of-week conflicts with `/second-buyer-score` ("Saturday issue of Listed to Bought"). |
| `/work-with-me` (2166393442) | section "Email Capture — Listed to Bought" | "// the weekly read", H2 "Listed to Bought.", button **"Send me the field notes"** | 2149622400 | Third name for the same email. Button is a 30px-radius pill, off the site button recipe. |
| `/get-read` (2167444261) | block `gr_cap` | "Next week I run these checks on someone else's page", button "Send me the teardown" | **2149729559** (different form, with a lane question) | Own old nav ("Listed to Chosen") and old footer in-body. |
| `/ai-visibility` (2167839250) | block `ptv_cap` | "New editions and the checklist version go to the list first", button "Send me the table updates" | 2149622400 | Fourth name. |
| home `/` | section 007 | "Get the next edition in your inbox", "Send me the table updates", owns `#teardown` | 2149622400 | Live as of today. |
| `/next-steps` (2156601702, thank-you for every form) | hero | "The first teardown lands in your inbox this week." | — | This page is a clone of the **old** home (sections 1758300000001…006 with "This week, in three formats"); its own nav says "Send me the teardown" → `#teardown`, an anchor that does not exist on that page. |
| `/podcast` (2166393449) | closing CTA | "plus the weekly GTM teardown", "Get notified at launch" → `/newsletter` | — | Podcast still "launching soon", four episodes "Soon". |
| `/resources` (2166393448) | skill-pack builder foot | "Want it emailed, plus the weekly teardown? → `/skill-pack`" | — | Also: SBS banner → `/second-buyer-score`, and "Vellocity → https://vell.ai" (down). |
| `/foundry` (2166393446) | page description | "frameworks, templates, and teardowns" | — | |
| `/book-a-call` (2166393450) | in-body footer | "Get the weekly teardown" → `/newsletter`; "Not ready to talk? Get the free score first → `/second-buyer-score`" | — | |
| about · coaching · foundry · resources · podcast · get-read | in-body old footer | "Get started → Get the weekly teardown" → `/newsletter` | — | The old `rd-embed` footer is still in the body of each page; whether it renders under the ported chrome depends on the per-page CSS. Check visually. |
| Site theme footer (2156017046, block 1555988525205) | hidden block | "Get the weekly teardown" | — | `hidden: true`, does not render. |
| Kajabi form 2149622400 | admin name | "The Weekly Teardown form" | — | Attached to 11 landing pages. |
| Newsletter | slug | `/newsletters/the-weekly-teardown` | — | Post URLs carry the name. |
| YouTube description template | "More from me" block | Newsletter → `/newsletter`; "Free AI visibility check" → `/get-read`; **"Vell, the product: https://vell.ai"** | — | vell.ai is on the suspended AWS account. |

## 3. Pages that depend on vell.ai (AWS-hosted, currently down)

- `/second-buyer-score` (2166654515): both primary CTAs go to `https://vell.ai/listing-score?ref=itsrondavis`; "Fix it with the platform → vell.ai". The Kajabi form on the page (2149687826, "Send my fix-first report") still works.
- `/resources`: SBS banner at the top → `/second-buyer-score`; "Vellocity → vell.ai" at the bottom.
- `/book-a-call`: "Get the free score first" → `/second-buyer-score`.
- `/get-read` footer and `/book-a-call` footer: "The free score" → `/second-buyer-score`.
- `/start` page description names "the Second Buyer Score … and Vellocity".
- About page: "Founder of an AI GTM platform — 46 AI capabilities, 42+ AWS integrations, built on Bedrock."

## 4. One name, one day

Four names for one email (the weekly teardown · the field notes · Listed to Bought · the table updates) and two send days (Tuesday · Saturday). Pick one of each before touching the 18 navs, so the port carries the final wording.

---

## Resolved 2026-10-14 — the newsletter is **Table Stakes**, sent **Tuesdays**

Ron's call: one name, "Table Stakes" (the periodic table, plus the bare minimum to stay in the game of being named, preferably in the top three), one send day, Tuesday. Applied live through the Kajabi MCP:

| Where | Now says |
|---|---|
| Home, section 007 form (`aiv_form`) | kicker "Table Stakes · Tuesdays", button "Send me Table Stakes", disclaimer "One email a week, on Tuesday." |
| `/newsletter` hero (theme 2166393447) | eyebrow "Table Stakes · Tuesdays", H1 "The bare minimum to stay in the running.", lede rewritten, "Every issue, no paywall", footer "Get Table Stakes"; page title "Table Stakes — Ron Davis Newsletter" + new description |
| `/newsletter-subscribe` (2166406350) | H1 "Join Table Stakes", "every Tuesday" |
| `/work-with-me` capture (2166393442, section 1788280100001) | "// Table Stakes · Tuesdays", H2 "Table Stakes.", form "Get Table Stakes" / "Send me Table Stakes" |
| `/ai-visibility` capture (2167839250, `ptv_form`) | "New editions and the checklist version go to Table Stakes first.", button "Send me Table Stakes" |
| `/get-read` capture (2167444261, `gr_cap`, form 2149729559) | "Next Tuesday I run these checks on someone else's page.", button "Send me Table Stakes"; in-body footer link |
| `/next-steps` (2156601702) | "The next Table Stakes lands in your inbox on Tuesday."; card label "Table Stakes · Newsletter" |
| `/podcast` (2166393449) | "plus Table Stakes, the Tuesday email"; footer link |
| `/resources` (2166393448) | "Want it emailed, plus Table Stakes every Tuesday?"; footer link (vell.ai line left as is, Ron's call) |
| `/book-a-call`, `/about`, `/coaching`, `/foundry` in-body footers | "Get Table Stakes" |
| `/foundry` page description | "frameworks, templates, and breakdowns" |
| Kajabi form 2149622400 | admin name "Table Stakes (newsletter) form" |
| agents.itsrondavis.com `llms.txt` / `agents.txt` | newsletter line names Table Stakes, Tuesdays |

Still carrying the old name, admin-only or not editable from here:
- Newsletter product 2147886456 is titled "The Weekly Teardown" and its posts live at `/newsletters/the-weekly-teardown/...`. Rename in Kajabi admin → Newsletters → settings. Changing the slug changes post URLs (the one published post is linked from `/next-steps`), so keep the slug unless you want to update that link too.
- Form 2149729559 (the `/get-read` capture with the lane question) keeps its admin name.
- Site theme 2156017046 footer block "Get the weekly teardown" is `hidden: true`; it does not render.
- The old `rd-embed` navs inside the body of about/coaching/foundry/podcast/resources/newsletter/book-a-call still say "AWS Marketplace GTM"; they are covered by the ported chrome and were left alone.
- YouTube description template: "Newsletter → /newsletter" is fine; the vell.ai line is Ron's call.
