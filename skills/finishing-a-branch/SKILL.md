---
name: finishing-a-branch
description: End-of-feature checklist. Fires when all tasks in conductor/work-units.md are complete. Verifies, cleans up, and presents ship options.
---

# Finishing a Branch

All tasks are complete. Before shipping, run this checklist in full.

---

## Step 1 — Verify Completeness

Check `conductor/work-units.md`:
- [ ] All Active Tasks are marked complete
- [ ] No tasks remain in Blocked (resolve or explicitly defer)
- [ ] All DONE_WITH_CONCERNS notes have been reviewed and accepted or acted on

If anything is unresolved: do not proceed. Surface it to the human first.

---

## Step 2 — Run the Full Test Suite

```bash
# TypeScript / Next.js
npx tsc --noEmit
npx jest --coverage

# Koa backend
npx jest --testPathPattern=src/

# Flutter
flutter analyze
flutter test
```

All tests must pass. If any fail: load `skills/systematic-debugging/SKILL.md` and fix before continuing.

---

## Step 3 — Spec Compliance Check

Re-read the spec in `docs/specs/` for this feature.

For each acceptance criterion:
- [ ] Is it satisfied?
- [ ] Is there a test that would catch a regression?

If any criterion is unmet: return to implementation. Do not ship partial features.

---

## Step 4 — Code Quality Pass

Review changes against `conductor/tech-stack.md`:
- [ ] No `any` types without justification comments
- [ ] No committed `.env` files or secrets
- [ ] All new endpoints have OpenAPI spec entries
- [ ] Migrations include rollback paths
- [ ] No dead code introduced by this change

---

## Step 5 — Git Hygiene

```bash
git status          # no untracked files that should be committed
git diff --stat     # review scope of changes
git log --oneline   # confirm commit messages are clear
```

Commit message format:
```
<type>(<scope>): <short description>

- bullet point of key change
- bullet point of key change

Relates to: docs/specs/YYYY-MM-DD-<topic>.md
```

Types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`

---

## Step 6 — Present Options

Present to the human:

1. **Merge** — create PR / merge to main
2. **PR** — push branch and open pull request with spec as description
3. **Keep** — leave branch open (more work coming)
4. **Discard** — reset branch (something fundamentally changed)

Wait for human decision. Do not merge or push without explicit approval.

---

## Step 7 — Cleanup

After merge/PR:
- Archive completed tasks in `conductor/work-units.md`
- Move spec to `docs/specs/archive/` if complete
- Update `wiki/projects/` with any decisions worth preserving
