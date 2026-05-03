---
name: systematic-debugging
description: Four-phase debugging protocol. No fixes without root cause investigation first. Iron Law — no exceptions.
---

# Systematic Debugging

Something is broken. You are not allowed to write a fix yet.

## Iron Law

> No fixes without root cause investigation first.

A fix that addresses the symptom without understanding the cause will fail again, fail differently, or create a new bug. Always investigate first.

---

## The Four Phases

### Phase 1 — Investigate Root Cause

Before touching any code:
- Read the error message fully — what exactly is it saying?
- Identify the failure point: which file, which line, which condition
- Trace backwards: what called this? what state led here?
- Check recent git log: did something change that could have caused this?
- Form a hypothesis: "I believe X is failing because Y"

Do not proceed until you have a specific hypothesis with a specific cause.

### Phase 2 — Reproduce Consistently

Write a failing test (or confirm an existing one) that:
- Reproduces the bug reliably
- Fails for the reason stated in your hypothesis
- Will pass once the root cause is fixed

If you cannot reproduce it consistently: **do not fix it**. Investigate more until you can.

### Phase 3 — Fix the Root Cause

Now you may write code. Fix the specific cause identified in Phase 1.

Rules:
- Fix only the root cause — do not fix adjacent issues you notice while here
- Do not change more than what the fix requires (surgical changes rule)
- The failing test from Phase 2 must now pass
- No other tests may break

### Phase 4 — Verify

Run the full test suite. Confirm:
- [ ] The Phase 2 test now passes
- [ ] No previously passing tests now fail
- [ ] The fix makes sense given the root cause (not a workaround)

If any test breaks: return to Phase 1 for that new failure. Do not stack fixes.

---

## Stack-Specific Debugging

**TypeScript / Next.js / Koa**
- Check type errors first: `tsc --noEmit`
- Runtime errors: read the full stack trace, not just the first line
- API failures: check request/response shape against OpenAPI spec
- Database issues: check migration state, connection pool, query plan

**Flutter**
- Run `flutter analyze` before anything else
- Widget errors: check the widget tree in DevTools
- State issues: check rebuild triggers and provider scope

---

## Red Flags

| You might think... | The rule is... |
|--------------------|----------------|
| "I know what the fix is, I'll skip investigation" | Document your hypothesis in Phase 1. If you're right, it takes 30 seconds. |
| "I'll just try a few things and see what works" | Shotgun debugging creates new bugs. Investigate first. |
| "I can't reproduce it, but I think I know the fix" | Do not fix what you cannot reproduce. |
| "I found another bug while fixing this one, I'll fix that too" | One bug per cycle. Log the second bug, finish the first. |
| "The fix works, I don't need tests" | Phase 2 test is mandatory. It becomes a regression guard. |
