---
name: brainstorming
description: HARD-GATE before any new feature or implementation. Enforces requirements gathering, design proposal, and spec writing before a single line of code is written.
---

# Brainstorming

You have been asked to build or design something new. You are not allowed to write any code yet.

## HARD-GATE — Complete Every Step in Order

### Step 1 — Load Context
Read these files before doing anything else:
- `conductor/vision.md` — what is this project?
- `conductor/tech-stack.md` — what stack and patterns apply?
- Any existing specs in `docs/specs/` related to this topic

### Step 2 — Explore and Clarify
Ask clarifying questions **one at a time**. Not a list. One question, wait for answer, then next if needed.

Focus on:
- What problem does this solve for the user?
- What does success look like? (How will we know it's done?)
- Are there constraints? (deadline, performance, existing integrations)
- What is explicitly out of scope?

### Step 3 — Propose Approaches
Present exactly **2-3 approaches** with explicit trade-offs for each. Format:

**Approach A: [name]**
- What: one sentence
- Trade-offs: faster to build but harder to extend / more complex but more correct / etc.

Do not recommend one yet. Let the user choose or redirect.

### Step 4 — Get Approval
State the chosen approach clearly. Confirm with the user before proceeding. If they redirect, revise the proposal — do not skip back to coding.

### Step 5 — Write the Spec
Write a spec document to: `docs/specs/YYYY-MM-DD-<topic>.md`

Spec must include:
- **Problem** — what we're solving and why
- **Approach** — the chosen option with rationale
- **Acceptance Criteria** — specific, verifiable conditions for "done"
- **Out of Scope** — what this explicitly does not cover
- **Open Questions** — anything still unresolved

### Step 6 — Self-Review the Spec
Before handing off, check the spec for:
- [ ] Contradictions (does any section conflict with another?)
- [ ] Placeholders (any "TBD" or "TODO" that blocks implementation?)
- [ ] Ambiguities (would two engineers interpret this differently?)

Fix any issues found. Then hand off to `skills/writing-plans/SKILL.md`.

---

## Red Flags

| You might think... | The rule is... |
|--------------------|----------------|
| "This is a small change, brainstorming is overkill" | All new work starts here. Small changes have small specs. |
| "I already know the solution" | Document it in the spec. If you know it, writing it takes 2 minutes. |
| "The user seems impatient, I'll skip ahead" | A wasted implementation costs more time than a short spec. |
| "I'll just ask all my questions at once" | One question at a time. Lists overwhelm; single questions focus. |
