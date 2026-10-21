import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { checkReviewedSource, unreviewedPages } from './source-content-policy.mjs';

const root = resolve(import.meta.dirname, '..');
const contract = JSON.parse(await readFile(resolve(root, 'tests/contracts/source-content.json'), 'utf8'));
const failures = [];
const tracked = new Set(contract.files.map((entry) => entry.path));

for (const entry of contract.files) {
  const source = await readFile(resolve(root, entry.path), 'utf8');
  failures.push(...checkReviewedSource(entry, source));
}

// New full-page components cannot bypass the review by simply not being tracked.
for (const name of unreviewedPages(await readdir(resolve(root, 'src/arco-pro/pages')), tracked)) {
  const path = `src/arco-pro/pages/${name}`;
  failures.push(`${path}: new page has no reviewed content contract`);
}

if (failures.length) {
  console.error('Source-content review required:\n' + failures.map((failure) => `- ${failure}`).join('\n'));
  console.error('Review the user-authorized diff against its Figma nodes. Do not auto-update the baseline.');
  process.exit(1);
}
console.log(`Source-content contract passed (${contract.files.length} reviewed files).`);
