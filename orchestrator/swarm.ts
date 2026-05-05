import { execSync } from 'child_process';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface AgentTask {
  name: string;
  task: string;
  command: string;
}

function assertTmux(): void {
  if (!process.env.TMUX) {
    throw new Error(
      'spawnAgentSwarm must be run inside a tmux session.\n' +
      'Start one: tmux new-session -s agents'
    );
  }
}

function openPane(scriptPath: string): string {
  return execSync(
    `tmux split-window -P -d -F "#{pane_id}" "bash ${scriptPath}"`,
    { encoding: 'utf8' }
  ).trim();
}

function tile(): void {
  try { execSync('tmux select-layout tiled'); } catch (_) {}
}

export function spawnAgentSwarm(tasks: AgentTask[]): Promise<void> {
  assertTmux();
  if (tasks.length === 0) return Promise.resolve();

  const handles: Array<{ logPath: string; doneFlag: string; scriptPath: string; done: Promise<void> }> = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const slug = `${task.name.replace(/\W+/g, '-')}-${i}`;
    const logPath = path.join(os.tmpdir(), `agent-${slug}.log`);
    const doneFlag = path.join(os.tmpdir(), `agent-${slug}.done`);
    const scriptPath = path.join(os.tmpdir(), `agent-${slug}.sh`);

    fs.writeFileSync(logPath, '');

    // Write pane script to file — avoids all quoting issues
    fs.writeFileSync(scriptPath, [
      '#!/bin/bash',
      `printf '\\033[1m[${task.name}]\\033[0m\\n${task.task}\\n---\\n'`,
      `tail -f "${logPath}" &`,
      'TAIL_PID=$!',
      `until [ -f "${doneFlag}" ]; do sleep 0.3; done`,
      `rm -f "${doneFlag}"`,
      'kill $TAIL_PID 2>/dev/null',
      `printf '\\n\\033[2m[done] type "dismiss" to close\\033[0m\\n'`,
      'while true; do read -r _input </dev/tty; [ "$_input" = "dismiss" ] && break; done',
      'tmux kill-pane',
    ].join('\n'));
    fs.chmodSync(scriptPath, '755');

    openPane(scriptPath);
    tile();

    const proc = spawn(task.command, { shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
    const log = fs.createWriteStream(logPath, { flags: 'a' });
    proc.stdout!.pipe(log);
    proc.stderr!.pipe(log);

    const done = new Promise<void>((resolve) => {
      proc.on('close', () => {
        log.end(() => {
          fs.writeFileSync(doneFlag, '');
          resolve();
        });
      });
    });

    handles.push({ logPath, doneFlag, scriptPath, done });
  }

  tile();
  return Promise.all(handles.map(h => h.done)).then(() => {
    handles.forEach(h => {
      try { fs.unlinkSync(h.logPath); } catch (_) {}
      try { fs.unlinkSync(h.scriptPath); } catch (_) {}
    });
  });
}
