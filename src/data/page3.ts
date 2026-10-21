// Page 3 references are separate historical examples, not one reconciled account.
export const businessSnapshot = {
  transactionValue: 123829, transactionCount: 3829, balance: 123829,
  nextSettlement: 123829, activePos: 2, posUnits: undefined,
  sourcePosUnits: '₦3,829.00', sourceNode: '92:2023',
};

// Marker coordinates from Figma 92:2116–2129, not daily financial measurements.
export const businessTrend = [
  { day: 'Tue', valueY: 179.44, volumeY: 167.90 }, { day: 'Wed', valueY: 153.94, volumeY: 126.01 },
  { day: 'Thu', valueY: 167.29, volumeY: 153.33 }, { day: 'Fri', valueY: 130.86, volumeY: 80.47 },
  { day: 'Sat', valueY: 161.83, volumeY: 144.22 }, { day: 'Sun', valueY: 144.22, volumeY: 107.79 },
  { day: 'Mon', valueY: 114.47, volumeY: 47.68 },
];

export const businessDeals = Array.from({ length: 4 }, (_, index) => ({
  key: `source-deal-${index + 1}`, client: '711-东单', type: 'AA Transfer', amount: 3200,
}));

export const settlementSnapshot = {
  businessName: 'Michael Test', date: '2023-05-31',
  transactionPeriod: '2023-05-29 00:00:00 — 2023-05-30 23:59:59',
  cycle: 'D+1', plan: 'Auto Settlement', amount: 40000, fee: 0, settled: 0, variance: 40000,
  sourceReason: 'The settlement aomount is less than the settlement fee', sourceNode: '92:1654',
};

export type SettlementRecord = {
  key: string; date: string; branch: string; period: string; status: string;
  withdrawalPlan: string; amount: number; settled: number;
};

// Original visible rows. Pagination repeats these fixtures, not API records.
export const settlementRecords: SettlementRecord[] = Array.from({ length: 8 }, (_, index) => ({
  key: `source-settlement-${index + 1}`, date: '2023-08-19', branch: 'aaaa123',
  period: '2023-08-18 00:00:00 — 2023-08-19 00:00:00', status: 'Manual Withdraw',
  withdrawalPlan: 'Merchants set manual withdrawal', amount: 0, settled: 0,
}));

export const settlementPagination = { total: 6210, pageSize: 7 };

export function settlementPageRecords(current: number, pageSize: number): SettlementRecord[] {
  if (!Number.isInteger(current) || current < 1 || !Number.isInteger(pageSize) || pageSize < 1) return [];
  const start = (current - 1) * pageSize;
  return Array.from({ length: Math.max(0, Math.min(pageSize, settlementPagination.total - start)) }, (_, index) => ({
    ...settlementRecords[(start + index) % settlementRecords.length], key: `settlement-${start + index + 1}`,
  }));
}

export function settlementVariance(amount: number, settled: number) { return amount - settled; }

export function toCsv(rows: (string | number)[][]) {
  return rows.map((row) => row.map((cell) => {
    let value = String(cell);
    if (typeof cell === 'string' && /^[\s]*[=+@-]/.test(value)) value = `'${value}`;
    return `"${value.replace(/"/g, '""')}"`;
  }).join(',')).join('\r\n');
}

export function settlementCsv(records: SettlementRecord[]) {
  return toCsv([
    ['Settlement Date', 'Branch Name', 'Transaction Period', 'Settlement Status', 'Withdrawal Plan', 'Settlement Amount (NGN)', 'Successfully Settled (NGN)'],
    ...records.map((record) => [record.date, record.branch, record.period, record.status, record.withdrawalPlan, record.amount, record.settled]),
  ]);
}

export type ReceiptField = { id: string; label: string; enabled: boolean };
export type ReceiptConfiguration = {
  printMerchant: boolean; requirePassword: boolean; printQr: boolean;
  format: 'label-value' | 'value'; purchase: ReceiptField[]; transfer: ReceiptField[];
};
export const receiptSource = {
  branchCode: '1200020109', branchName: 'Kaffydupe food and fruit store',
  selectorCode: '1200020487', selectorLabel: '1200020487-Kaffydup branch1', sourceNode: '92:1871',
  previewText: '2035CHIL- 2056464-Fri Nov 25 2022-NGN100.00-GERB3435-5GERGERG-36G5T-539905***6757',
};

export function initialReceiptConfiguration(): ReceiptConfiguration {
  const fields = (kind: string, count: number) => Array.from({ length: count }, (_, index) => ({
    id: `${kind}-${index + 1}`, label: 'Terminal ID', enabled: kind === 'purchase' || index < 4,
  }));
  return { printMerchant: true, requirePassword: true, printQr: true, format: 'label-value',
    purchase: fields('purchase', 8), transfer: fields('transfer', 5) };
}

export function cloneReceipt(configuration: ReceiptConfiguration): ReceiptConfiguration {
  return { ...configuration, purchase: configuration.purchase.map((field) => ({ ...field })), transfer: configuration.transfer.map((field) => ({ ...field })) };
}

export function moveReceiptField(fields: ReceiptField[], id: string, offset: -1 | 1) {
  const next = fields.map((field) => ({ ...field }));
  const from = next.findIndex((field) => field.id === id);
  const to = from + offset;
  if (from < 0 || to < 0 || to >= next.length) return next;
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

export function receiptPreview(configuration: ReceiptConfiguration, _kind: 'purchase' | 'transfer') {
  // Both source previews have this same opaque string (92:1902, 92:1906).
  // No verified label/field/payload mapping exists. Never invent one by splitting it.
  return configuration.printQr ? receiptSource.previewText : '';
}

export type RefundDraft = {
  amount: number; reason: string; bankName: string; bankBranch: string; accountNumber: string;
  accountName: string; firstName: string; middleName?: string; lastName: string; mobile: string; email?: string;
};
export const refundExample = { amount: 10, fee: 0, sourceNode: '92:3477' };
export function validRefundAmount(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0.01
    && value <= Number.MAX_SAFE_INTEGER / 100
    && Number.isSafeInteger(Math.round(value * 100)) && Math.round(value * 100) / 100 === value;
}
export function validRefundDraft(draft: RefundDraft) {
  return validRefundAmount(draft.amount) && !!draft.reason?.trim()
    && ['bankName', 'bankBranch', 'accountNumber', 'accountName', 'firstName', 'lastName'].every((key) =>
      !!String(draft[key as keyof RefundDraft] ?? '').trim())
    && /^\+?\d{7,15}$/.test(draft.mobile?.replace(/[\s()-]/g, '') ?? '')
    && (!draft.email?.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim()));
}
