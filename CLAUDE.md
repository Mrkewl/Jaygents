# CLAUDE.md — Agent Harness

This harness is a portable, structured agent system designed to be dropped into any coding project. It enforces disciplined agent behavior, maintains project context across sessions, and orchestrates multi-agent work cleanly.

---

## Behavioral Rules (non-negotiable)

These four rules apply to every session, every task, every agent.

### 1. Think Before Coding
Surface assumptions before writing any code. If a task has multiple valid interpretations, present them — don't guess and proceed. If something is genuinely unclear, stop and name the confusion.

### 2. Simplicity First
Implement only what was asked, using only the abstractions the problem demands. No speculative features, no unrequested configurability, no error handling for impossible scenarios. If 200 lines could be 50, rewrite it.

### 3. Surgical Changes
Touch only lines causally connected to the request. Every changed line must trace directly to the user's request. Do not improve adjacent formatting, refactor working code, or remove pre-existing dead code. Clean up your own mess — mention pre-existing mess, don't touch it.

### 4. Goal-Driven Execution
Translate vague instructions into verifiable success criteria before starting. Prefer test-first. For multi-step tasks, state a plan with per-step verification before execution begins.

---

## Harness Structure

```
Agent Harness/
├── CLAUDE.md                  ← you are here
├── .claude/hooks/             ← session bootstrap
├── skills/                    ← workflow enforcement (lazy-loaded)
├── agents/                    ← reusable agent definitions
├── conductor/                 ← persistent project context
│   ├── vision.md
│   ├── tech-stack.md
│   └── work-units.md
└── wiki/                      ← personal knowledge base
```

## On Session Start

1. Load `skills/using-harness/SKILL.md` — the gateway skill
2. Read `conductor/vision.md` and `conductor/tech-stack.md` for project context
3. Check `conductor/work-units.md` for any carried-over tasks
4. Then check which skill applies to the current request before acting

## Portability

This harness is designed to be dropped into any project. When installing into a new repo:
- Copy this `CLAUDE.md` to the project root (or reference it)
- Copy `.claude/` and `skills/` directories
- Update `conductor/` files with project-specific context
- The behavioral rules travel with it unchanged

## Scope Policy

Every agent invocation must have a declared scope. Files outside that scope are read-only at most. Diffs must be auditable against the declared task. When in doubt, escalate — don't expand scope silently.
