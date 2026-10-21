import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkReviewedSource, sourceDigest, unreviewedPages } from '../../scripts/source-content-policy.mjs';

const source = '<Card title="Settlement"><Statistic title="Settlement Amount" /></Card>\n';
const entry = { path: 'SettlementPage.tsx', sourceNodes: ['92:1654'], review: 'Verified source modules.', auditEditorialCopy: true, sha256: sourceDigest(source) };

test('reviewed source passes, including normalized platform line endings', () => {
  assert.deepEqual(checkReviewedSource(entry, source), []);
  assert.deepEqual(checkReviewedSource(entry, source.replaceAll('\n', '\r\n')), []);
});
test('changing a confirmed title fails the review gate', () => {
  assert.ok(checkReviewedSource(entry, source.replace('title="Settlement"', 'title="New title"')).some((failure) => failure.includes('content/structure changed')));
});
test('adding unapproved fields or modules fails even without suspicious wording', () => {
  assert.ok(checkReviewedSource(entry, source + '<Form.Item label="Branch filter" />').length);
});
test('editorial leakage is rejected even if someone changes the baseline hash', () => {
  const changed = source + '<Alert content="Standalone Page 3 example" />';
  assert.ok(checkReviewedSource({ ...entry, sha256: sourceDigest(changed) }, changed).some((failure) => failure.includes('commentary leaked')));
});
test('a baseline without documented provenance is rejected', () => {
  assert.ok(checkReviewedSource({ ...entry, sourceNodes: [], review: '' }, source).some((failure) => failure.includes('missing source review')));
});
test('new full pages must join the explicit source review contract', () => {
  assert.deepEqual(unreviewedPages(['SettlementPage.tsx', 'NewPage.tsx', 'Page3.module.css'], new Set(['src/arco-pro/pages/SettlementPage.tsx'])), ['NewPage.tsx']);
});
