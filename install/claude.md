# Install in Claude

Three ways, fastest first.

## A. As Skills (most native) — Claude Code or claude.ai
The `skills/` folder holds eight self-contained Agent Skills (`SKILL.md` each). Claude picks the right one from what you ask — or start with **the Blank-Square Audit**, which scores your page against all 69 elements and points you to the next skill.

- **Claude Code:** drop the `skills/<name>/` folders into your project's `.claude/skills/` directory (or a personal skills dir). Claude loads them on the next run.
- **claude.ai:** open **Settings → Capabilities → Skills** and add each `SKILL.md` (or upload the whole `skills/` folder where supported).

Then paste your page's text and ask: *"Run the Blank-Square Audit on this."*

## B. As a Project (one paste)
1. Claude → **Projects** → **Create project** ("AI Visibility").
2. **Project knowledge** → add [`pack/ai-visibility-skill-pack.md`](../pack/ai-visibility-skill-pack.md) as a file (or paste its contents).
3. Start a chat in the project and name a skill: *"Use the Inhibitor Sweep on our homepage."*

## C. Give it the data too
Add [`data/elements.json`](../data/elements.json) to the same project so the model can quote any element's watch-out and 2026 audit note verbatim.

---
© Ron Davis · Periodic Table of AI Visibility · https://www.itsrondavis.com/ai-visibility
