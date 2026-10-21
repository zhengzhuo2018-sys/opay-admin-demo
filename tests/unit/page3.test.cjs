const { test } = require('node:test');
const assert = require('node:assert/strict');
const data = require(process.env.OPAY_PAGE3_TEST_DATA);

test('source snapshot does not convert an ambiguous currency into a POS count', () => {
  assert.equal(data.businessSnapshot.transactionValue, 123829);
  assert.equal(data.businessSnapshot.transactionCount, 3829);
  assert.equal(data.businessSnapshot.posUnits, undefined);
  assert.equal(data.businessSnapshot.sourcePosUnits, '₦3,829.00');
});

test('trend preserves source marker geometry without inventing financial observations', () => {
  assert.equal(new Set(data.businessTrend.map((point) => point.day)).size, 7);
  assert.ok(data.businessTrend.every((point) => point.valueY > 0 && point.valueY < 248 && point.volumeY > 0 && point.volumeY < 248));
  assert.ok(data.businessTrend.every((point) => !('value' in point) && !('volume' in point)));
  assert.deepEqual(data.businessTrend[0], { day: 'Tue', valueY: 179.44, volumeY: 167.90 });
});

test('settlement examples keep real supplied row totals and separate dates', () => {
  assert.equal(data.settlementRecords.length, 8);
  assert.equal(new Set(data.settlementRecords.map((row) => row.key)).size, 8);
  assert.ok(data.settlementRecords.every((row) => row.date !== data.settlementSnapshot.date));
  assert.equal(data.settlementVariance(data.settlementSnapshot.amount, data.settlementSnapshot.settled), data.settlementSnapshot.variance);
});

test('settlement pagination uses source total, unique fixture keys and correct final page bounds', () => {
  assert.deepEqual(data.settlementPagination, { total: 6210, pageSize: 7 });
  const first = data.settlementPageRecords(1, 7);
  const second = data.settlementPageRecords(2, 7);
  assert.equal(first.length, 7);
  assert.equal(second.length, 7);
  assert.equal(new Set([...first, ...second].map((row) => row.key)).size, 14);
  assert.equal(data.settlementPageRecords(888, 7).length, 1);
  assert.equal(data.settlementPageRecords(889, 7).length, 0);
  assert.equal(data.settlementPageRecords(621, 10).length, 10);
  assert.equal(data.settlementPageRecords(622, 10).length, 0);
  for (const [page, size] of [[0, 7], [-1, 7], [1.5, 7], [1, 0]]) assert.deepEqual(data.settlementPageRecords(page, size), []);
  assert.ok([...first, ...second].every((row) => row.branch === 'aaaa123' && row.amount === 0 && row.settled === 0));
});

test('CSV output includes only the requested records', () => {
  assert.equal(data.settlementCsv(data.settlementRecords).split('\r\n').length, 9);
  assert.equal(data.settlementCsv(data.settlementRecords.slice(0, 2)).split('\r\n').length, 3);
});

test('CSV escapes quotes, separators and formula-like string values', () => {
  const csv = data.toCsv([['a,"b"', '=2+2', '+cmd', 10]]);
  assert.ok(csv.includes('"a,""b"""'));
  assert.ok(csv.includes('"\'=2+2"'));
  assert.ok(csv.includes('"\'+cmd"'));
});

test('receipt source selections preserve the eight/five fields and disabled fifth transfer field', () => {
  const config = data.initialReceiptConfiguration();
  assert.equal(config.purchase.length, 8);
  assert.equal(config.transfer.length, 5);
  assert.equal(config.purchase.filter((field) => field.enabled).length, 8);
  assert.equal(config.transfer.filter((field) => field.enabled).length, 4);
  assert.ok([...config.purchase, ...config.transfer].every((field) => field.label === 'Terminal ID'));
});

test('receipt copies and reorder operations never mutate saved configuration', () => {
  const saved = data.initialReceiptConfiguration();
  const draft = data.cloneReceipt(saved);
  draft.purchase[0].enabled = false;
  assert.equal(saved.purchase[0].enabled, true);
  const reordered = data.moveReceiptField(saved.purchase, 'purchase-1', 1);
  assert.equal(reordered[0].id, 'purchase-2');
  assert.equal(saved.purchase[0].id, 'purchase-1');
  assert.equal(reordered.length, saved.purchase.length);
});

test('receipt reordering handles missing fields and boundaries safely', () => {
  const fields = data.initialReceiptConfiguration().purchase;
  for (const [id, offset] of [['missing', 1], ['purchase-1', -1], ['purchase-8', 1]]) {
    assert.deepEqual(data.moveReceiptField(fields, id, offset), fields);
  }
});

test('receipt preserves both original preview strings without inventing field-to-payload mappings', () => {
  const config = data.initialReceiptConfiguration();
  assert.equal(data.receiptPreview(config, 'purchase'), data.receiptSource.previewText);
  assert.equal(data.receiptPreview(config, 'transfer'), data.receiptSource.previewText);
  config.format = 'value';
  config.purchase = data.moveReceiptField(config.purchase, 'purchase-1', 1);
  config.purchase.find((field) => field.id === 'purchase-3').enabled = false;
  const preview = data.receiptPreview(config, 'purchase');
  assert.equal(preview, data.receiptSource.previewText);
  assert.ok(!preview.includes('Terminal ID'));
  assert.ok(preview.includes('Fri Nov 25 2022'));
  assert.ok(!('sample' in config.purchase[0]));
});

test('QR switch controls visibility without claiming an unverified field schema', () => {
  const config = data.initialReceiptConfiguration();
  config.printQr = false;
  assert.equal(data.receiptPreview(config, 'purchase'), '');
  config.printQr = true;
  config.purchase.forEach((field) => { field.enabled = false; });
  assert.equal(data.receiptPreview(config, 'purchase'), data.receiptSource.previewText);
});

test('refund amount validation rejects zero, negatives, fractions of cents and non-finite values', () => {
  for (const value of [0, -1, 1.001, 0.000000001, Infinity, NaN, '10', Number.MAX_VALUE]) assert.equal(data.validRefundAmount(value), false);
  for (const value of [0.01, 0.29, 10, 1234.56]) assert.equal(data.validRefundAmount(value), true);
});

const refund = {
  amount: 10, reason: 'Sample draft', bankName: 'Example Bank', bankBranch: 'Example Branch',
  accountNumber: '0000000000', accountName: 'Sample Holder', firstName: 'Sample', lastName: 'Holder', mobile: '+2340000000000',
};
test('refund draft validates mandatory fields without assuming live eligibility', () => {
  assert.equal(data.validRefundDraft(refund), true);
  assert.equal(data.validRefundDraft({ ...refund, reason: ' ' }), false);
  assert.equal(data.validRefundDraft({ ...refund, reason: 'x'.repeat(201) }), true);
  assert.equal(data.validRefundDraft({ ...refund, bankName: '' }), false);
  assert.equal(data.validRefundDraft({ ...refund, mobile: 'invalid' }), false);
  assert.equal(data.validRefundDraft({ ...refund, email: 'invalid' }), false);
  assert.equal(data.validRefundDraft({ ...refund, email: 'sample@example.com' }), true);
  assert.ok(!('transactionId' in data.refundExample));
});
