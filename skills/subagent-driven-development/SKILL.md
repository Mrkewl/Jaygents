---
name: subagent-driven-development
description: Orchestration engine for multi-task work. Dispatches fresh subagents per task, handles status responses, and manages the task queue in conductor/work-units.md.
---

# Subagent-Driven Development

Use this skill when the plan in `conductor/work-units.md` has more than one task, or when a task benefits from a clean context window.

## Core Principle

One subagent per task. Each subagent receives:
- The task spec (what, why, file paths, verification)
- Relevant file context (only what it needs — nothing more)
- The acceptance criterion it must satisfy

No session history. No accumulated context. Clean slate every time.

---

## Model Selection

Assign the right model to each task before spawning:

| Task Type | Model |
|-----------|-------|
| Isolated, mechanical (formatting, simple CRUD, file moves) | Haiku 4.5 |
| Multi-file integration, feature implementation | Sonnet 4.6 |
| Architecture decisions, security review, complex debugging | Opus 4.7 |

When in doubt, use Sonnet. Only escalate to Opus when the task requires judgment that Sonnet demonstrably fails at.

---

## Orchestration Loop

For each task in `conductor/work-units.md` (in dependency order):

1. **Prepare context** — read only the files the subagent needs
2. **Spawn subagent** — provide task spec + context + acceptance criterion
3. **Receive status** — subagent returns one of four statuses:

### Status Handling

**DONE**
- Run the verification step from the task spec
- If verification passes: mark task complete in `work-units.md`, advance to next task
- If verification fails: re-open task, provide failure details, re-run subagent

**DONE_WITH_CONCERNS**
- Log the concern in the task entry in `work-units.md`
- Assess: is the concern blocking? If yes → BLOCKED. If no → advance with note.
- Surface concerns to human at end of session, not mid-stream

**NEEDS_CONTEXT**
- Provide the specific context requested
- Re-run the same subagent with the additional context
- If the same subagent asks for context more than twice: escalate to human

**BLOCKED**
- Log the blocker in `conductor/work-units.md` under **Blocked**
- Do not attempt to work around it
- Escalate to human immediately with a clear description of what's needed

---

## File Ownership Rule

Each task declares which files it owns. The orchestrator enforces:
- No two concurrent subagents modify the same file
- Shared files are updated by the orchestrator after subagents complete
- If a subagent needs to modify a file owned by another task: stop, escalate

---

## Review Gates

After implementation tasks, run two sequential reviewers:

1. **Spec compliance** — does the output satisfy the acceptance criteria from the spec?
2. **Code quality** — is the code clean, typed, tested, and consistent with `conductor/tech-stack.md`?

Spec compliance runs first. There is no point reviewing code quality if it doesn't meet requirements.

---

## Updating Work Units

After each task completes, update `conductor/work-units.md`:
- Move completed tasks to **Completed (last 5)** (rolling — drop the oldest when >5)
- Move blocked tasks to **Blocked** with blocker description
- Keep **Active Tasks** to only what is currently in progress

---

## Red Flags

| You might think... | The rule is... |
|--------------------|----------------|
| "I'll just do all tasks in one agent to save time" | Context accumulates. Fresh agents are more reliable. |
| "The subagent is close, I'll help it work around the blocker" | BLOCKED means escalate. Don't work around it. |
| "I'll review code quality first, it's faster" | Spec compliance first. Always. |
| "This task is simple, model tier doesn't matter" | Haiku for simple tasks saves real cost at scale. |
