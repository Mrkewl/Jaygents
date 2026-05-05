# Harness Cheatsheet

## How to say things

| What you want to do | What to say |
|---------------------|-------------|
| Start a new feature | "let's build X" / "I want to add X" / "we need a X" |
| Write code for a planned task | "implement task N" / "work on [task name]" |
| Fix a bug | "something is broken" / "fix this bug" / "debug X" |
| Run parallel agents on a task | "run multiple agents on X" / "use subagents for X" |
| Ready to ship | "all tasks done, ready to ship" / "let's finish this branch" |
| Use a specific agent | `@agents/engineering/architect.md [task]` |
| Write a plan from a spec | "write a plan for X" / "turn the spec into tasks" |

## What gets triggered

| You say | Skill loaded |
|---------|-------------|
| new feature / build X | `skills/brainstorming` → `skills/writing-plans` |
| implement / write code | `skills/test-driven-development` |
| broken / fix / debug | `skills/systematic-debugging` |
| multiple agents / subagents | `skills/subagent-driven-development` |
| ready to ship / finish branch | `skills/finishing-a-branch` |

## Agent invocation

```
@agents/engineering/architect.md     Design the posts schema
@agents/engineering/backend-engineer.md   Implement POST /posts
@agents/review/code-reviewer.md      Review the changes in src/posts/
@agents/orchestration/team-lead.md   Decompose the auth feature into tasks
```

## Where things live

| Thing | Location |
|-------|----------|
| Active tasks | `conductor/work-units.md` |
| Specs | `docs/specs/` |
| Project context | `conductor/vision.md` |
| Stack conventions | `conductor/tech-stack.md` |
| Knowledge base | `wiki/` |
| Agent definitions | `agents/` |
