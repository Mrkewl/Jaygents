---
name: writing-plans
description: Converts an approved spec into a granular, sequenced task list. Each task must be self-contained, verifiable, and sized to 2-5 minutes.
---

# Writing Plans

You have an approved spec in `docs/specs/`. You are now converting it into an implementation plan.

## Input Required
- The spec doc path (confirm it exists and has passed brainstorming self-review)
- `conductor/tech-stack.md` for stack conventions

## Output
A task list written to `conductor/work-units.md` under **Active Tasks**.

---

## Task Format

Each task must contain:

```
### Task N — [name]
**File(s)**: exact/path/to/file.ts
**What**: one sentence — what change is being made
**Why**: which acceptance criterion from the spec this satisfies
**Verification**: how to confirm it's done (test name, curl command, UI state, etc.)
**Depends on**: Task N (if blocked by another task), or "none"
```

---

## Rules

**Size tasks to 2-5 minutes.** If a task would take longer, split it. The plan is for a subagent with no project context — every ambiguity will be interpreted wrong.

**Exact file paths, not vague descriptions.** "Update the API" fails. "Add POST /api/sessions handler in `src/app/api/sessions/route.ts`" succeeds.

**One concern per task.** A task that touches the schema AND the API AND the test is three tasks.

**Tests are tasks too.** Writing a test is not part of the implementation task — it is its own task, and it comes first (RED before GREEN).

**Order matters.** Tasks must be sequenced so each one can be completed without waiting for a later task. Dependencies must be explicit.

---

## Sequencing Pattern (TypeScript/Next.js + Koa)

For most features, this order works:
1. Schema / migration (if data model changes)
2. Types / interfaces
3. Failing tests (RED)
4. Implementation (GREEN)
5. Refactor pass
6. API endpoint (if applicable)
7. Frontend integration (if applicable)
8. E2E / integration test

---

## Self-Review Before Handing Off

- [ ] Every task has a verification step
- [ ] No task is vague ("update", "fix", "handle") — all are specific
- [ ] Dependencies are explicit and form a valid sequence (no cycles)
- [ ] Tests come before implementation in the sequence
- [ ] All acceptance criteria from the spec map to at least one task

Once the plan passes self-review, update `conductor/work-units.md` and hand off to `skills/subagent-driven-development/SKILL.md` or `skills/test-driven-development/SKILL.md` for single-agent work.
