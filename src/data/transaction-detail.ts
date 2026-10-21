import { transactionRecords } from './transactions';

export type TransactionDetailField = {
  label: string;
  value?: string;
  span?: number;
};

export type TransactionDetailGroup = {
  key: string;
  title: string;
  fields: TransactionDetailField[];
};

export const transactionDetailId = '260131020200004331964330';

export const transactionDetailGroups: TransactionDetailGroup[] = [
  {
    key: 'order',
    title: 'Order Info',
    fields: [
      { label: 'Transaction ID', value: transactionDetailId },
      { label: 'Transaction Time', value: 'Jan 31,2026 04:30:09' },
      { label: 'Rxn Completed Date', value: 'Jan 31,2026 04:48:00' },
      { label: 'Original Transaction ID' },
      { label: 'Transaction Status', value: 'REVERSED' },
      { label: 'Transaction Type', value: 'Automatic Settlement' },
      { label: 'Pay Channel', value: 'BalancePayment' },
      { label: 'POS SN' },
      { label: 'Terminal ID' },
      { label: 'Remark', value: '2026-01-31MAYAKS aaa"PRESTIGE STITCHES LTD/OPay' },
      { label: 'Fail Reason', value: 'pending' },
    ],
  },
  {
    key: 'amount',
    title: 'Amount Info',
    fields: [
      { label: 'Transaction Amount', value: '₦ 111.00' },
      { label: 'Transaction Fee', value: '₦ 10.00' },
      { label: 'Funds Flow', value: 'OUT' },
      { label: 'Fee Type', value: 'OUT_DEDUCT' },
      { label: 'Settlement Amount', value: '₦ 111.00' },
      { label: 'Change in balance' },
      { label: 'Overdraft Spent', value: '₦ 0.00' },
      { label: 'Account Balance', value: '₦ 0.00' },
    ],
  },
  {
    key: 'merchant',
    title: 'Merchant Info',
    fields: [
      { label: 'Business ID', value: '1200048362' },
      { label: 'Business Name', value: 'MAYAKS aaa"PRESTIGE STITCHES LTD' },
      { label: 'Business User ID', value: '256624102828275' },
      { label: 'Branch ID', value: '1200048362' },
      { label: 'Branch Name', value: 'MAYAKS aaa"PRESTIGE STITCHES LTD' },
      { label: 'Merchant User ID', value: '256624102828275' },
    ],
  },
  {
    key: 'parties',
    title: 'Sender & Recipient Info',
    fields: [
      { label: 'Sender Name', value: 'MAYAKS aaa"PRESTIGE STITCHES LTD' },
      { label: "Sender's Bank" },
      { label: 'Sender Account', value: '955***9338' },
      { label: 'Recipient Name', value: 'SANYA AAEE OGUNBUSUJA' },
      { label: "Recipient's Bank", value: 'Access Bank' },
      { label: 'Recipient Account', value: '221***1190' },
      { label: 'Session ID', value: '100004260131033009990000627844', span: 3 },
    ],
  },
  {
    key: 'refund',
    title: 'Refund Info',
    fields: [],
  },
];

export function getTransactionDetail(transactionId: string) {
  const record = transactionRecords.find((item) => item.transactionId.join('') === transactionId);
  if (!record) return undefined;
  if (transactionId === transactionDetailId) return { record, groups: transactionDetailGroups };

  // Only the reference transaction has a complete detail fixture. Other rows
  // expose their own verified fields rather than borrowing another order's data.
  const knownFields: Record<string, string> = {
    'Transaction ID': transactionId,
    'Transaction Time': `${record.date} ${record.time}`,
    'Rxn Completed Date': record.completedAt,
    'Transaction Status': record.status,
    'Branch Name': record.branch.join(' '),
    'Sender Name': record.sender.join(' '),
    'Recipient Name': record.recipient.join(' '),
  };
  return {
    record,
    groups: transactionDetailGroups.map((group) => ({
      ...group,
      fields: group.fields.map((field) => ({ ...field, value: knownFields[field.label] })),
    })),
  };
}
