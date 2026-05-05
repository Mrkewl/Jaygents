import { spawnAgentSwarm } from './swarm';

console.log([
  '',
  '  tmux navigation',
  '  ─────────────────────────────────────────',
  '  Ctrl+B → arrow key   move between panes',
  '  Ctrl+B → z           zoom/unzoom a pane',
  '  tmux set -g mouse on enable mouse clicks',
  '  type "dismiss"        close a finished pane',
  '  ─────────────────────────────────────────',
  '',
].join('\n'));

spawnAgentSwarm([
  {
    name: 'architect',
    task: 'Design posts schema',
    command: [
      'bash -c "',
      'echo Reading tech-stack... && sleep 1 &&',
      'echo Identifying decision type: schema migration && sleep 1 &&',
      'echo Decision is expensive to reverse — writing ADR && sleep 1 &&',
      'echo ADR-001-posts-schema.md written. Handing off to backend-engineer.',
      '"',
    ].join(' '),
  },
  {
    name: 'backend',
    task: 'Implement POST /posts',
    command: [
      'bash -c "',
      'echo Reading spec: POST /posts && sleep 1 &&',
      'echo Step 4: writing failing test... && sleep 1 &&',
      'echo Step 5: implementing handler... && sleep 1 &&',
      'echo Step 6: updating OpenAPI spec... && sleep 1 &&',
      'echo Output: posts.ts + posts.test.ts + openapi/posts.yaml',
      '"',
    ].join(' '),
  },
  {
    name: 'reviewer',
    task: 'Review PR',
    command: [
      'bash -c "',
      'echo Gate 1 — Spec Compliance && sleep 1 &&',
      'echo Checking 8 acceptance criteria... && sleep 1 &&',
      'echo All criteria passed. Proceeding to Gate 2. && sleep 1 &&',
      'echo Gate 2 — Code Quality && sleep 1 &&',
      'echo No unparameterized queries. No any types. Auth checks present. && sleep 1 &&',
      'echo Verdict: APPROVED_WITH_NOTES',
      '"',
    ].join(' '),
  },
]).then(() => {
  console.log('All agents finished.');
});
