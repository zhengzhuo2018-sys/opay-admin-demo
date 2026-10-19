export type TransactionStatus = 'REVERSED' | 'SUCCESS' | 'PENDING';

export type TransactionRecord = {
  key: string;
  date: string;
  time: string;
  transactionId: [string, string];
  sender: string[];
  recipient: string[];
  branch: string[];
  completedAt: string;
  status: TransactionStatus;
};

export const transactionRecords: TransactionRecord[] = [
  {
    key: '1',
    date: 'Feb 01, 2026',
    time: '03:57:34',
    transactionId: ['2602010202000', '04332334986'],
    sender: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    recipient: ['SANYA AAEE', 'OGUNBUSUJA'],
    branch: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    completedAt: 'Feb 01, 2026 04:18:00',
    status: 'REVERSED',
  },
  {
    key: '2',
    date: 'Jan 31, 2026',
    time: '05:30:07',
    transactionId: ['2601310202000', '04331979880'],
    sender: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    recipient: ['SANYA AAEE', 'OGUNBUSUJA'],
    branch: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    completedAt: 'Jan 31, 2026 05:48:00',
    status: 'REVERSED',
  },
  {
    key: '3',
    date: 'Jan 31, 2026',
    time: '05:00:08',
    transactionId: ['2601310202000', '04331970674'],
    sender: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    recipient: ['SANYA AAEE', 'OGUNBUSUJA'],
    branch: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    completedAt: 'Jan 31, 2026 05:18:00',
    status: 'REVERSED',
  },
  {
    key: '4',
    date: 'Jan 31, 2026',
    time: '04:30:09',
    transactionId: ['2601310202000', '04331964330'],
    sender: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    recipient: ['SANYA AAEE', 'OGUNBUSUJA'],
    branch: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    completedAt: 'Jan 31, 2026 04:48:00',
    status: 'REVERSED',
  },
  {
    key: '5',
    date: 'Jan 31, 2026',
    time: '03:57:57',
    transactionId: ['2601310202000', '04331952768'],
    sender: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    recipient: ['SANYA AAEE', 'OGUNBUSUJA'],
    branch: ['MAYAKS', 'aaa\"PRESTIGE', 'STITCHES LTD'],
    completedAt: 'Jan 31, 2026 04:18:00',
    status: 'REVERSED',
  },
  {
    key: '6',
    date: 'Jan 30, 2026',
    time: '07:48:01',
    transactionId: ['2601301403000', '04325629072'],
    sender: ['new new', 'expense branch-', '123'],
    recipient: ['Super Balance'],
    branch: ['new new', 'expense branch-', '123'],
    completedAt: 'Jan 30, 2026 07:48:47',
    status: 'SUCCESS',
  },
  {
    key: '7',
    date: 'Jan 30, 2026',
    time: '07:42:41',
    transactionId: ['2601300102010', '04325627143'],
    sender: ['Super Balance'],
    recipient: ['new new', 'expense branch-', '123'],
    branch: ['new new', 'expense branch-', '123'],
    completedAt: 'Jan 30, 2026 07:42:41',
    status: 'SUCCESS',
  },
  {
    key: '8',
    date: 'Jan 30, 2026',
    time: '07:37:12',
    transactionId: ['2601300101888', '04325626108'],
    sender: ['Super Balance'],
    recipient: ['MAYAKS', 'STITCHES LTD'],
    branch: ['Lagos Main Branch'],
    completedAt: 'Jan 30, 2026 07:38:09',
    status: 'PENDING',
  },
];
