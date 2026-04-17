import { readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { cwd, exit } from 'node:process';
import { spawn } from 'node:child_process';

const rootDir = cwd();
const srcDir = join(rootDir, 'src');

async function collectTestFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectTestFiles(entryPath);
      }
      if (entry.isFile() && entry.name.endsWith('.test.ts')) {
        return [relative(rootDir, entryPath)];
      }
      return [];
    })
  );

  return nestedFiles.flat().sort();
}

const testFiles = await collectTestFiles(srcDir);

if (testFiles.length === 0) {
  console.error('No test files found under src/.');
  exit(1);
}

const watchMode = process.argv.includes('--watch');
const commandArgs = ['tsx', '--test'];

if (watchMode) {
  commandArgs.push('--watch');
}

commandArgs.push(...testFiles);

const child = spawn('npx', commandArgs, {
  cwd: rootDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  exit(code ?? 1);
});
