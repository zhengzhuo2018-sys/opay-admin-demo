import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const projectRoot = resolve(import.meta.dirname, '..');
const cleanRoot = join(projectRoot, 'src', 'arco-pro');
const supportedExtensions = new Set(['.ts', '.tsx', '.css']);
const forbiddenImports = [
  /from\s+['"](?:\.\.\/)+components\//,
  /from\s+['"](?:\.\.\/)+pages\//,
  /from\s+['"](?:\.\.\/)+styles\/arco-theme/,
  /from\s+['"](?:\.\.\/)+styles\/global/,
  /from\s+['"](?:\.\.\/)+theme\/opayTheme/,
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(path) : [path];
    }),
  );
  return nested.flat();
}

const files = (await collectFiles(cleanRoot)).filter((file) =>
  supportedExtensions.has(extname(file)),
);
const violations = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const forbidden of forbiddenImports) {
    if (forbidden.test(source)) {
      violations.push(`${relative(projectRoot, file)} imports forbidden legacy source (${forbidden.source})`);
    }
  }
}

if (violations.length) {
  console.error('\nArco Pro clean-room violations:\n');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`Arco Pro clean-room passed (${files.length} files checked).`);
