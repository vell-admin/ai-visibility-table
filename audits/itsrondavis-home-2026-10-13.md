# Blank-Square Audit · itsrondavis.com home · 2026-10-13

The home page of this site, scored against its own table. Half by `scripts/audit.mjs` run on the page as published this afternoon (the home payload in `kajabi/home-page.json`, plus the live `llms.txt` and `agents.txt` from `agents.itsrondavis.com`), half by hand. Statuses follow `skills/ai-visibility-audit/SKILL.md`: Present, Blank, Inhibitor present, Not applicable (test passed), Pending (input not provided).

**Inputs read.** The page HTML as published (nav, hero, what-you-get, table, delivered-by-hand, work band, receipts, footer). llms.txt and agents.txt as pushed 2026-10-13. The YouTube channel listing (31 videos). GitHub, LinkedIn, Instagram links from the footer. The Ahrefs Site Audit digest of 2026-10-11 and 2026-10-12 (61 URLs, health 88).
**Not read.** The live robots.txt and sitemap.xml (the audit container could not reach the domain; Kajabi serves both by default), Search Console, Kajabi analytics, and the three engines' answers to a buyer question. Those squares are Pending, not Blank.

Three buyer questions used: "who can audit my site for AI visibility", "how do I get my AWS Marketplace listing recommended by AI", "what is AI visibility".

## Counts

| Group | Present | Blank | Inhibitor | Not applicable | Pending |
|---|---|---|---|---|---|
| Engines (8) | 0 | 0 | 0 | 0 | 8 |
| Retrieval (14) | 9 | 2 | 0 | 0 | 3 |
| Signals (9) | 5 | 3 | 0 | 0 | 1 |
| Artifacts (10) | 7 | 2 | 0 | 0 | 1 |
| Channels (10) | 4 | 4 | 0 | 1 | 1 |
| Measurement (8) | 0 | 5 | 0 | 0 | 3 |
| Inhibitors (10) | — | — | 0 | 6 | 4 |

Group with the most Blank squares: **Measurement** (5 of 8). Nothing is being measured, so nothing above it can be shown to have worked. Retrieval is nearly full, which is the right order.

## Blank-square map

### Retrieval
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 9 | Rb robots.txt | Pending | Open /robots.txt. Kajabi's default allows all; confirm no AI crawler is disallowed. | d |
| 10 | Sm Sitemap | Pending | Open /sitemap.xml; find `/` and a real lastmod. | d |
| 11 | Lt llms.txt | Present | Served from agents.itsrondavis.com/llms.txt, 8.7 KB, updated today. | d |
| 12 | Ax agents.txt | Present | Served from agents.itsrondavis.com/agents.txt. | d |
| 13 | Jl JSON-LD | Present | One ld+json graph: VideoObject, Person (sameAs ×4), WebSite. | w |
| 14 | Et Entity | Present | "Ron Davis" spelled one way on site, GitHub, YouTube, LinkedIn, JSON-LD. The tagline still varies by page ("AWS Marketplace GTM" in old in-body navs). | q |
| 15 | Ck Chunk | Present | Each "Delivered by hand" card and each value-table row restates its subject and reads alone. | w |
| 16 | Sr Server render | Present | 415 visible words in raw HTML before any script. | w |
| 17 | Fr Freshness | Blank | The only date is `uploadDate` inside JSON-LD. No visible published/updated date for a reader. | w |
| 18 | Cn Canonical | Pending | View source for `rel="canonical"`; Kajabi emits one, confirm it is `https://www.itsrondavis.com/`. | w |
| 19 | Tr Transcript | Blank | The hero video has no transcript or text summary beside it. | w |
| 20 | At Alt text | Present | Every image carries alt text that says what it shows. | d |
| 21 | Hd Heading map | Present | One H1 (a claim), H2s are claims not labels. | d |
| 22 | Ln Internal links | Present | 14+ internal links, no "learn more" anchors. | w |

### Signals
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 23 | Cy Clarity | Present | First 100 words carry no stock superlative. | d |
| 24 | Sy Specificity | Present | 10 figures with units ($99, $2,500, 69 elements, 10 business days, 30 questions). | d |
| 25 | Pf Proof | Blank | "3,977 partners", "596 listings", "3× re:Invent" carry no date and no source link. | w |
| 26 | Bo Buyer outcome | Present | "Get named when your buyer asks AI who to pick" names the changed state; the cost is implied, not stated. | w |
| 27 | Cm Comparison | Blank | No page names alternatives (agencies, tools, doing it yourself). | w |
| 28 | Pc Pricing clarity | Present | $99, $2,500, $12,500, $7,500/mo, $47, $0 all on the page. | w |
| 29 | Rm Rich media | Present | Hero video with VideoObject JSON-LD. Transcript is the blank above. | w |
| 30 | Fq FAQ block | Blank | Zero question-shaped headings on the home; the 36 questions live on /ai-visibility only. | d |
| 31 | Df Definition | Blank | No "AI visibility is…" sentence on the home. It exists on /ai-visibility and in llms.txt. | w |

### Artifacts
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 32 | Td Teardown | Pending | The newsletter promises one a week; one post is linked from the old home. Count published issues. | w |
| 33 | Bn Benchmark | Present | The Marketplace Listing Benchmark, 596 listings, $47. | q |
| 34 | Ds Dataset | Present | elements.json / elements.csv, CC BY 4.0, stable URL. | q |
| 35 | Cs Case study | Blank | No named client anywhere on the site. | w |
| 36 | Rk Runbook | Present | Weekend inhibitor runbook (kit) and reference/weekend-checklist.md (free). | w |
| 37 | Ca Calculator | Blank | The Second Buyer Score depends on vell.ai, which is offline. | q |
| 38 | Sh Screenshot | Present | The wallchart social card, with alt text. | d |
| 39 | Vo Video | Present | 31 videos on the channel; hero embeds one. | w |
| 40 | Ni Newsletter | Present | Table Stakes, Tuesdays (renamed 2026-10-14; was four names and two send days). | q |
| 41 | Tp Template | Present | Eight skills, three file templates in the kit. | w |

### Channels
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 42 | Li LinkedIn | Present | linkedin.com/in/itsrondavis in JSON-LD sameAs and footer. | w |
| 43 | Yt YouTube | Present | @itsRonDavis, 31 videos since 2026-09-11. | q |
| 44 | Th Threads | Not applicable | Buyer does not research there. | w |
| 45 | Re Reddit | Blank | No presence; r/aws and r/SaaS are where listing questions get asked. | q |
| 46 | Gi GitHub | Present | vell-admin/ai-visibility-table, public, README applies the table. | q |
| 47 | Mk Marketplace | Blank | The AWS Marketplace listing for the software is tied to the suspended account. | q |
| 48 | Po Podcast | Blank | "Launching soon", four episodes "Soon", zero published. | q |
| 49 | Dy Directory | Pending | List where the practice is profiled (Clutch, G2 services, AWS Partner directory). | w |
| 50 | Ig Instagram | Present | Linked, 4 posts a month unknown. | w |
| 51 | Gp Guest post | Blank | None in the last 90 days. | q |

### Measurement
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 52 | Sv Share of voice | Blank | No prompt set, so no share of voice. | q |
| 53 | Mt Mentions | Blank | Not counted. | w |
| 54 | Ci Citations | Blank | Not counted. | w |
| 55 | Ps Prompt set | Blank | No frozen, dated list of 30 buyer questions exists yet. The kit's tracker is the template. | d |
| 56 | Sb Switchback | Blank | Nothing to switch without a prompt set. | q |
| 57 | Ar AI referrals | Pending | Open Kajabi analytics or GA4; filter referrers for chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com. | w |
| 58 | Bs Brand search | Pending | Search Console, queries containing "ron davis" or "itsrondavis", 16 weeks. | q |
| 59 | Im Impressions | Pending | Search Console impressions for the home, 16 weeks. | w |

### Inhibitors
| # | Element | Status | Reason to verify | Effect |
|---|---|---|---|---|
| 60 | Bc Blocked crawler | Pending | robots.txt not read from here. | d |
| 61 | Jo JS-only | Not applicable | 415 words server-rendered. | w |
| 62 | Ga Gated | Not applicable | Table, data, skills and the kit page are ungated. One optional email form. | w |
| 63 | Pl Paywall | Not applicable | Nothing cited sits behind login. | w |
| 64 | Jw Jargon wall | Not applicable | Two acronyms (JSON-LD), both explained on /ai-visibility. | d |
| 65 | Vc Vague claim | Not applicable | No superlative in the opening. | d |
| 66 | Du Duplicate | Pending | `/next-steps` is a clone of the old home sections; `/home` and `/` serve the same page. Check titles and canonical. | w |
| 67 | Op Orphan page | Pending | Ahrefs 2026-10-11: 11 noindex pages, 8 pages with a single dofollow inbound link, 8 pages missing an H1. Open the crawl. | w |
| 68 | Sl Slop | Not applicable | Every section carries a checkable fact. | q |
| 69 | Nd No date | Pending | Same evidence as Fr Freshness: a date exists only in JSON-LD. Add a visible one and this clears. | d |

## Buyer-question check

- "who can audit my site for AI visibility" → answered by the hero and the "Delivered by hand" card 1 (written audit, 10 business days, $2,500). Passage stands alone.
- "how do I get my AWS Marketplace listing recommended by AI" → partial. The hero names the listing; no passage explains the mechanism (the buyer's requirements document, agent mode). That passage lives on /discovery-kit.
- "what is AI visibility" → no passage found on the home. The definition is on /ai-visibility and in llms.txt.

## Subtract first

No inhibitor present in what was read. Four Pending inhibitors need the live robots.txt and the Ahrefs crawl (Bc, Du, Op, Nd).

## Your weekend (days)

1. Fq FAQ block: add the three buyer questions above as H3s on the home, each with a two-sentence answer. Five minutes each; use the 36 questions file.
2. Ps Prompt set: freeze 30 buyer questions in the kit's tracker, date it, run them once in Perplexity. An afternoon. Everything in Measurement turns from Blank to a number after this.
3. Nd No date / Fr Freshness: put "Updated 13 Oct 2026" in the footer line. Five minutes.
4. Rb, Sm, Bc: open /robots.txt and /sitemap.xml once and record the answer. Five minutes.

## Your quarter

- Cs Case study (w): the single most valuable blank. One named client with a before/after read. The 13 design-partner audit deals in HubSpot from June are the shortlist.
- Cm Comparison (w): one page that names the alternatives fairly (agencies, GEO tools, do-it-yourself with the kit).
- Df Definition (w): put the "AI visibility is…" sentence on the home, above the fold.
- Pf Proof (w): date and source the three receipts numbers.
- Tr Transcript (w): paste the hero video transcript under the video, or on the newsletter post that goes with it.
- Re Reddit, Po Podcast, Gp Guest post (q): channels, pick one.

## Pending inputs

robots.txt and sitemap.xml text · the Ahrefs crawl issues list · Search Console (16 weeks) · the referrer list from analytics · one answer each from Perplexity, ChatGPT, Claude, Gemini to the three buyer questions · the count of published newsletter issues.

## The one next skill

`prompt-set-and-scoreboard`. Measurement is the emptiest group, and a frozen prompt set is a days-tagged move that makes every later fix measurable.
