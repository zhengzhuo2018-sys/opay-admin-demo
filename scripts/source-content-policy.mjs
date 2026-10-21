import { createHash } from 'node:crypto';

const forbiddenEditorialCopy = /Standalone Page 3|Page 3 (?:source|reference)|Reference branch snapshot|Source scope:|Source slot|Repeated source labels|Source unit needs confirmation|Displayed examples|The source selection and reference branch|The source explanation conflicts|Only supplied examples are counted|source example|source rows|Source snapshot|Relative preview indices/;

export function sourceDigest(source) {
  return createHash('sha256').update(source.replaceAll('\r\n', '\n')).digest('hex');
}

export function checkReviewedSource(entry, source) {
  const failures = [];
  if (!entry.sourceNodes?.length || !entry.review) failures.push(`${entry.path}: missing source review`);
  if (sourceDigest(source) !== entry.sha256) failures.push(`${entry.path}: reviewed content/structure changed (${(entry.sourceNodes ?? []).join(', ')})`);
  if (entry.auditEditorialCopy && forbiddenEditorialCopy.test(source)) failures.push(`${entry.path}: implementation commentary leaked into business UI`);
  return failures;
}

export function unreviewedPages(names, tracked) {
  return names.filter((name) => /Page\.tsx$/.test(name) && !tracked.has(`src/arco-pro/pages/${name}`));
}
