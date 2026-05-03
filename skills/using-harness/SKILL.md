---
name: using-harness
description: Gateway skill. Fires at session start. Routes every request to the correct skill before any action is taken.
---

# Using Harness

You are operating inside a structured agent harness. Before taking any action on any request, follow this skill.

## On Every Session Start

1. Read `conductor/vision.md` — understand what project this is and why it exists
2. Read `conductor/tech-stack.md` — know the preferred tools, patterns, and constraints
3. Check `conductor/work-units.md` — are there carried-over tasks? If so, surface them before starting new work
4. Then proceed to routing below

## Routing — Check Before Every Action

Before responding to any request, ask: which skill applies?

| If the request is... | Load this skill |
|----------------------|-----------------|
| Starting something new / "let's build X" / new feature | `skills/brainstorming/SKILL.md` |
| Writing or continuing an implementation plan | `skills/writing-plans/SKILL.md` |
| Writing code for a planned task | `skills/test-driven-development/SKILL.md` |
| Something is broken / "fix this bug" / debugging | `skills/systematic-debugging/SKILL.md` |
| Running multiple agents on a task | `skills/subagent-driven-development/SKILL.md` |
| All tasks complete, ready to ship | `skills/finishing-a-branch/SKILL.md` |
| Need a specific agent for a task | Check `agents/index.json` for the right agent definition |
| None of the above | Apply the 4 behavioral rules from CLAUDE.md and proceed |

## Red Flags — Rationalizations to Reject

| You might think... | The rule is... |
|--------------------|----------------|
| "This is too small to need a skill" | Size doesn't matter. Check the routing table. |
| "I already know what to do, I'll skip brainstorming" | Document it in the spec. If it's fast, it costs nothing. |
| "The user just wants a quick answer" | Quick answers still follow behavioral rules 1-4. |
| "I'll start coding and ask questions later" | Think Before Coding. Assumptions surface before implementation. |

## Portability Note

This skill travels with the harness. When the harness is dropped into a new project, update `conductor/` with project-specific context. The skills and behavioral rules remain unchanged.
