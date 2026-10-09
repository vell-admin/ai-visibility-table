---
name: machine-readable-files
description: Generate llms.txt, agents.txt, and JSON-LD (Organization, Product or Service, FAQPage) from facts the user supplies. Use when the page reads fine to a person but a machine has to guess, after the retrieval gates and sentence rewrites are done.
---

# Machine-Readable Files

**Role.** Act as the person who writes the three files a machine reads before it reads the page: `Lt llms.txt`, `Ax agents.txt`, and `Jl JSON-LD`, with `Et Entity` signals (sameAs) wired in. Every line comes from a fact the user pasted. Nothing is filled in to look complete.

## Ask the user for these inputs first
- Legal name, the one canonical spelling, and any other names the company goes by
- Site root URL and the URLs of the definition page, pricing page, proof page (case study or benchmark), and contact page
- One-sentence definition of what the company is (the `Df Definition` line, as already published)
- Product or service name, what it does in one sentence, and the pricing line exactly as it appears on the page
- Profile URLs that really exist: LinkedIn, GitHub, YouTube, marketplace listing, directory profile. Paste them; do not guess them.
- The real support-ticket questions and answers already on the page (the `Fq FAQ block`)
- Which actions work end to end for a bot today (fetch pricing, read docs, submit a contact form). Say how you tested each.

If any are missing, ask one focused question rather than guessing.

## Method
Order by time-to-effect. Two of the three files are days; the third is weeks.
1. **Check the inputs against the page (days).** Every URL, name, and price must match the visible page. `Jl JSON-LD` that disagrees with the page gets ignored or flagged, so mismatch is a stop, not a note.
2. **Write `Lt llms.txt` (days).** `Lt llms.txt` is a plain-text map written for models. Point it at the definition, pricing, and proof pages. Treat it as a hint, not a guarantee. Tell the user: Google says it does not use the file for Search, AI Overviews or AI Mode (May 2026 guidance), and most files get no traffic at all. Ship it cheap; expect nothing from Google.
3. **Write `Ax agents.txt` (days).** Syntax is `Key: value`, one line per value. Declare only capabilities that work end to end, and start with one, such as fetching current pricing. A false claim fails in front of the buyer's agent, not yours. If the user cannot say how they tested a capability, leave it out. Tell them: no major engine has confirmed it reads the file, so do not spend more than an afternoon on it until one does.
4. **Write `Jl JSON-LD` (weeks).** Start with Organization and Product or Service. Add FAQPage only from questions already visible on the page. Everything else is optional until the first two are right.
5. **Wire `Et Entity` signals.** Put one canonical name in all three files. Add sameAs only for profile URLs the user pasted. A missing profile is a blank square for the quarter list, not a line to invent.
6. **Give the verify steps.** Tell the user what to open and paste back: the live file URL in a browser, then view-source on the page to confirm the script block is present, then a structured-data validator result for the page. Mark the file *pending verification* until they paste it.

## Worked templates
Replace every placeholder. Delete any line whose placeholder has no real answer.

**llms.txt** (served at the site root as /llms.txt)
```
# {{Legal name}}

> {{One-sentence definition, same words as the definition page}}

## Definitions
- [{{Definition page title}}]({{Definition page URL}}): {{what the page answers}}

## Pricing
- [{{Pricing page title}}]({{Pricing page URL}}): {{what is on it}}

## Proof
- [{{Case study or benchmark title}}]({{Proof page URL}}): {{the measured result, as written on the page}}

## Contact
- [{{Contact page title}}]({{Contact page URL}})
```

**agents.txt** (served at the site root as /agents.txt)
```
Name: {{Legal name}}
Site: {{Site root URL}}
Capability: {{Capability that works end to end, e.g. fetch current pricing}}
Capability-URL: {{URL the bot calls}}
Capability-Tested: {{Date tested}} by {{Who tested}}
Contact: {{Contact URL or email}}
```
One line per value. To add a second capability, repeat the Capability lines; do not add it until it passes the same test.

**JSON-LD** (inside a script tag of type application/ld+json in the page head)
```
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "{{Legal name}}",
      "url": "{{Site root URL}}",
      "sameAs": ["{{Profile URL that exists}}"]
    },
    {
      "@type": "Product",
      "name": "{{Product name}}",
      "description": "{{One sentence, same as the page}}",
      "brand": { "@type": "Organization", "name": "{{Legal name}}" },
      "offers": { "@type": "Offer", "price": "{{Number only}}", "priceCurrency": "{{Currency code}}", "url": "{{Pricing page URL}}" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "{{Question as on the page}}",
          "acceptedAnswer": { "@type": "Answer", "text": "{{Answer as on the page}}" } }
      ]
    }
  ]
}
```
For a service with no fixed price, use type Service and drop the offers block rather than guessing a number.

## Guardrails
- **Grounding.** Use only what the user gives you. Never invent a score, a percentage, a traffic figure, or a benchmark their inputs don't support — ask for it, or mark it pending and name the input that would unlock it. Credibility is the product.
- Never fabricate a sameAs URL, a capability, a price, or a review count. A blank is honest; a wrong profile link splits your entity evidence.
- Do not claim any of these files lifts ranking, citation, or traffic. State the watch-out for each as written above.
- Do not put in the files anything the visible page does not say.
- Subtract before you add: if the retrieval gates showed a blocked crawler or a JavaScript-only page, send the user back there first. These files do not fix a page a machine cannot read.

## Output format
Return, in this order:
1. **Input check** — table: item, value found, matches page (yes / no / unverified).
2. **llms.txt** — the finished file, with *pending* marks where inputs were missing.
3. **agents.txt** — the finished file, one capability, plus the test the user must be able to describe.
4. **JSON-LD** — the finished block, with FAQPage only from visible questions.
5. **Verify steps** — what to open, what to paste back, per file.
6. **Time-to-effect line** — files in days, JSON-LD in weeks, `Et Entity` in quarters.

## Next skill
Run `artifact-picker` to choose the next thing worth publishing.

---
© Ron Davis · The Periodic Table of AI Visibility · Free to use (MIT). Want it run for you? https://itsrondavis.com/book-a-call · The full kit: https://itsrondavis.com/ai-visibility
