import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const directory = await mkdtemp(join(tmpdir(), 'opay-page3-tests-'));
try {
  const compile = spawnSync(process.execPath, [
    'node_modules/typescript/bin/tsc', '--ignoreConfig', 'src/data/page3.ts',
    '--module', 'commonjs', '--target', 'ES2022', '--skipLibCheck', '--outDir', directory,
  ], { cwd: root, stdio: 'inherit' });
  if (compile.error) throw compile.error;
  if (compile.status !== 0) process.exitCode = compile.status ?? 1;
  else {
    const result = spawnSync(process.execPath, ['--test', 'tests/unit/page3.test.cjs'], {
      cwd: root, stdio: 'inherit', env: { ...process.env, OPAY_PAGE3_TEST_DATA: join(directory, 'page3.js') },
    });
    if (result.error) throw result.error;
    process.exitCode = result.status ?? 1;
  }
} finally { await rm(directory, { recursive: true, force: true }); }
