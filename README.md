# Agent Harness

A portable, structured agent system for Claude Code. Drop it into any coding project to get disciplined AI behavior, a persistent knowledge base, and multi-agent orchestration — out of the box.

---

## What It Is

Without structure, AI agents skip requirements, assume intent, and accumulate context debt. This harness enforces the workflow gates that prevent those failure modes so every session starts from a known-good state.

The harness is self-contained. Drop it into a TypeScript/Next.js app, a Koa API, a Flutter project, or a Terraform repo — the same behavioral rules, agent library, and knowledge base come with it.

---

## How It Works

The harness has five layers, each built on top of the last:

```
┌─────────────────────────────────────────────┐
│  5. Knowledge Layer   wiki/                 │
├─────────────────────────────────────────────┤
│  4. Workflow Pipeline  skills/              │
├─────────────────────────────────────────────┤
│  3. Agent Library      agents/              │
├─────────────────────────────────────────────┤
│  2. Orchestration      orchestrator/        │
├─────────────────────────────────────────────┤
│  1. Behavioral Contract  CLAUDE.md + hooks  │
└─────────────────────────────────────────────┘
```

### Layer 1 — Behavioral Contract

Four non-negotiable rules baked into `CLAUDE.md` and enforced on every session via a startup hook:

| Rule | What it means |
|------|--------------|
| **Think Before Coding** | Surface assumptions before writing any code. Present interpretations; don't guess and proceed. |
| **Simplicity First** | Implement only what was asked. No speculative features, no unrequested abstractions. |
| **Surgical Changes** | Touch only lines causally connected to the request. Clean up your own mess; leave pre-existing mess alone. |
| **Goal-Driven Execution** | Translate vague instructions into verifiable success criteria before starting. Prefer test-first. |

The session hook (`.claude/hooks/session-start.sh`) fires on every Claude Code session start and reminds the model to load the gateway skill before acting.

### Layer 2 — Orchestration

`conductor/` holds the persistent project context that Claude reads at the start of every session:

| File | Purpose |
|------|---------|
| `conductor/vision.md` | What this project is and why it exists |
| `conductor/tech-stack.md` | Preferred languages, frameworks, patterns, and constraints |
| `conductor/work-units.md` | Active task queue — carried-over tasks surface here |

Model tiers are assigned per agent type:

| Tier | Model | When to use |
|------|-------|-------------|
| High-stakes | Opus | Architecture, security review, orchestration |
| Standard | Sonnet | Feature implementation, code review |
| Rote | Haiku | Formatting, search, simple file ops |

### Layer 3 — Agent Library

Reusable agent definitions in `agents/`. Each agent follows a 7-component schema: role identity, domain vocabulary, deliverables, decision authority, workflow, and anti-patterns.

| Agent | Model | What it does |
|-------|-------|-------------|
| `team-lead` | Opus | Decomposes work, assigns tasks, enforces file ownership |
| `architect` | Opus | Owns system boundaries, ADRs, decisions expensive to reverse |
| `backend-engineer` | Sonnet | Implements endpoints, migrations, and Jest tests |
| `code-reviewer` | Sonnet | Spec compliance gate → code quality gate → verdict |

All agents are registered in `agents/index.json` with name, tags, model tier, and quality lifecycle (`untested → tested → iterated → curated`).

To invoke an agent in a fresh session:
```
@agents/engineering/architect.md Design the posts schema for a blog API
```

### Layer 4 — Workflow Pipeline

Skills enforce phase gates. No phase starts until the previous one clears.

```
BRAINSTORM → SPEC → PLAN → IMPLEMENT → REVIEW → SHIP
```

| Skill | When it fires |
|-------|--------------|
| `skills/brainstorming/SKILL.md` | Before any implementation — "let's build X" |
| `skills/writing-plans/SKILL.md` | Converting a spec into a task list |
| `skills/test-driven-development/SKILL.md` | Writing code (Red → Green → Refactor, Iron Law) |
| `skills/systematic-debugging/SKILL.md` | Something is broken — root cause required before fix |
| `skills/subagent-driven-development/SKILL.md` | Running multiple agents on a task |
| `skills/finishing-a-branch/SKILL.md` | All tasks complete, ready to ship |

The gateway skill (`skills/using-harness/SKILL.md`) routes every request to the correct skill before any action is taken.

### Layer 5 — Knowledge Base

`wiki/` is a queryable knowledge base that grows with every session.

```
wiki/
├── inbox/       ← capture first, organize later
├── research/    ← deep dives and reference material
├── reference/   ← reusable patterns and how-tos
├── projects/    ← per-project context and decisions
└── meetings/    ← session notes and decisions made
```

Every file has a summary line that acts as a retrieval primitive — Claude reads it to judge relevance without reading the full file.

A PostToolUse hook (`.claude/hooks/post-tool-use.sh`) automatically captures key decisions to `wiki/inbox/decisions.md` whenever specs or ADRs are written.

---

## Repo Structure

```
Agent Harness/
├── CLAUDE.md                      ← behavioral contract
├── .claude/
│   ├── settings.json              ← hooks and permissions
│   └── hooks/
│       ├── session-start.sh       ← fires on every session start
│       └── post-tool-use.sh       ← auto-captures decisions to wiki
├── agents/
│   ├── index.json                 ← searchable agent registry
│   ├── schema.md                  ← 7-component agent definition template
│   ├── orchestration/team-lead.md
│   ├── engineering/
│   │   ├── architect.md
│   │   └── backend-engineer.md
│   └── review/code-reviewer.md
├── skills/
│   ├── using-harness/SKILL.md     ← gateway skill (loads on every session)
│   ├── brainstorming/SKILL.md
│   ├── writing-plans/SKILL.md
│   ├── test-driven-development/SKILL.md
│   ├── systematic-debugging/SKILL.md
│   ├── subagent-driven-development/SKILL.md
│   └── finishing-a-branch/SKILL.md
├── conductor/
│   ├── vision.md
│   ├── tech-stack.md
│   └── work-units.md
├── wiki/
│   ├── _templates/note.md
│   ├── inbox/
│   ├── research/
│   ├── reference/
│   ├── projects/
│   └── meetings/
├── orchestrator/
│   ├── swarm.ts                   ← spawnAgentSwarm() — tmux orchestrator
│   └── run-test.ts                ← test runner with dummy agents
└── docs/
    ├── HARNESS_PLAN.md            ← build plan and phase progress
    └── orchestrator-swarm.md      ← swarm interface docs
```

---

## tmux Orchestrator

The harness includes a tmux-based multi-agent runner. It spawns one pane per agent, pipes output live to each pane, and tiles them into a grid.

### Setup

```bash
brew install tmux          # one-time install
npm install                # install TypeScript dependencies
```

### Running

```bash
tmux new-session -s agents
npm run swarm:test
```

Three panes open in a tiled grid — one per agent — each running its steps in parallel. When an agent finishes, its pane shows:

```
[done] type "dismiss" to close
```

Type `dismiss` and press Enter to close that pane.

### Navigating panes

| Action | Keys |
|--------|------|
| Move between panes | `Ctrl+B` then arrow key |
| Zoom in on a pane | `Ctrl+B` then `Z` |
| Enable mouse clicks | `tmux set -g mouse on` |
| Detach without killing session | `Ctrl+B` then `D` |
| Re-attach later | `tmux attach -t agents` |
| Kill session | `tmux kill-session -t agents` |

### Wiring real agents

In `orchestrator/run-test.ts`, replace the `bash -c "echo ..."` commands with real Claude Code CLI calls:

```typescript
spawnAgentSwarm([
  {
    name: 'architect',
    task: 'Design posts schema',
    command: 'claude --agent agents/engineering/architect.md "Design posts schema"',
  },
  // ...
]);
```

See `docs/orchestrator-swarm.md` for the full interface.

---

## Installing Into a New Project

1. Copy `CLAUDE.md` to the project root
2. Copy `.claude/`, `skills/`, and `agents/` directories
3. Update `conductor/vision.md` with the new project's goal
4. Update `conductor/tech-stack.md` with the project's stack
5. Clear `conductor/work-units.md`

The behavioral rules and skills travel unchanged. Only `conductor/` is project-specific.

---

## Design Principles

**Structure is what makes agents reliable.** Suggestions fail; enforced gates succeed. Every phase gate in this harness exists because the failure mode it prevents has been observed in practice.

**45% rule.** If a single agent can achieve 45%+ of optimal on its own, adding agents yields diminishing returns. Always try single-agent first. A 3-agent team costs 3.5x tokens for 2.3x output.

**Vocabulary is architecture.** "Circuit breaker (Nygard)" activates a cluster of resilience knowledge that "handle errors" does not. Agent vocabulary is precise on purpose.

**The wiki is a retrieval system, not a journal.** Every file has a one-sentence summary line. That line is what Claude reads to decide whether to read the rest. Never skip it.
