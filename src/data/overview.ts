import type { SummaryRow } from '../components/dashboard';

export const accountMetrics = [
  { label: 'Available Balance', value: '₦ 326,904.30', tone: 'green', help: true },
  { label: 'OWealth', value: '₦ 326,904.30', tone: 'blue' },
  { label: "Yesterday's Interest", value: '₦ 0.00', tone: 'purple' },
  { label: 'Total Interest', value: '₦ 20,058.30', tone: 'yellow' },
] as const;

export const inflowDetails = [
  { label: 'POS', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Transfer Number', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'POS Transfer', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Transfer from OPay', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Transfer from Bank', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Bank USSD', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Others', amount: '₦ 0.00', count: '0 Txns' },
] as const satisfies readonly SummaryRow[];

export const inflowProducts = [
  { label: 'OWealth Withdrawal', amount: '₦ 0.00', count: '0 Txns', icon: 'withdrawal', iconTone: 'wealth' },
  { label: 'Loan Disbursement', amount: '₦ 0.00', count: '0 Txns', icon: 'disbursement', iconTone: 'loan' },
] as const satisfies readonly SummaryRow[];

export const outflowDetails = [
  { label: 'Transfer to Bank', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Transfer to OPay', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'PayBill', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Withdrawal', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Electronic Money Transfer Levy', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Stamp Duty', amount: '₦ 0.00', count: '0 Txns' },
  { label: 'Others', amount: '₦ 0.00', count: '0 Txns' },
] as const satisfies readonly SummaryRow[];

export const outflowProducts = [
  { label: 'OWealth Deposit', amount: '₦ 0.00', count: '0 Txns', icon: 'deposit', iconTone: 'wealth' },
  { label: 'Loan Repayment', amount: '₦ 0.00', count: '0 Txns', icon: 'repayment', iconTone: 'loan' },
  { label: 'Fixed Wealth Subscribe', amount: '₦ 0.00', count: '0 Txns', icon: 'subscribe', iconTone: 'wealth' },
  { label: 'Overdraft Auto Repayment', amount: '₦ 0.00', count: '0 Txns', icon: 'auto-repayment', iconTone: 'wealth' },
  { label: 'Overdraft Manual Repayment', amount: '₦ 0.00', count: '0 Txns', icon: 'manual-repayment', iconTone: 'wealth' },
] as const satisfies readonly SummaryRow[];

export const successMetrics = [
  { label: 'Successful Txns', value: '0', detail: true },
  { label: 'Failed Txns', value: '0', detail: true },
  { label: 'Success Rate', value: '0.00%' },
] as const;
