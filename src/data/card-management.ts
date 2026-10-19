export type ManagedCardRecord = {
  key: string;
  batchNo: string;
  cardNo: string;
  validity: string;
  expenseAccount: string;
  branch: string[];
  boundTo: string[];
  operations: Array<'Link to' | 'Unlink' | 'Set Card PIN' | 'Block' | 'Unblock'>;
};

export const cardMetrics = [
  { label: 'Quantity of Cards', value: '47' },
  { label: 'Quantity of Linked cards', value: '14' },
  { label: 'Quantity of Unlinked cards', value: '29' },
  { label: 'Quantity of Blocked Cards', value: '2' },
  { label: 'Quantity of Expired Cards', value: '2' },
];

export const managedCardRecords: ManagedCardRecord[] = [
  {
    key: '1',
    batchNo: '2026010500104004979',
    cardNo: '507872******8850',
    validity: 'Dec 15,2030 08:01:00',
    expenseAccount: '-',
    branch: ['-'],
    boundTo: ['-'],
    operations: ['Link to'],
  },
  {
    key: '2',
    batchNo: '2026010500104004979',
    cardNo: '507872******6471',
    validity: 'Dec 15,2030 08:01:00',
    expenseAccount: '-',
    branch: ['-'],
    boundTo: ['-'],
    operations: ['Link to'],
  },
  {
    key: '3',
    batchNo: '2025051900068004239',
    cardNo: '507872******7834',
    validity: 'May 19,2030 07:11:00',
    expenseAccount: '6317747011',
    branch: ['1200048368-aaaa', 'test'],
    boundTo: ['yyy-yes730@163.com'],
    operations: ['Unlink', 'Set Card PIN', 'Block'],
  },
  {
    key: '4',
    batchNo: '2025051900068004239',
    cardNo: '507872******7826',
    validity: 'May 19,2030 07:11:00',
    expenseAccount: '6314075642',
    branch: ['1200052028-new', 'new expense branch-', '123'],
    boundTo: ['ccyy01-', 'yue.cui@opay-', 'inc.com'],
    operations: ['Unlink', 'Set Card PIN', 'Block'],
  },
  {
    key: '5',
    batchNo: '2025051900068001770',
    cardNo: '507872******7792',
    validity: 'May 19,2030 07:11:00',
    expenseAccount: '6319026983',
    branch: ['1200048363-test', 'branch 22222'],
    boundTo: ['李璐-', 'ruinchallenge@163.com'],
    operations: ['Unlink', 'Set Card PIN', 'Block'],
  },
  {
    key: '6',
    batchNo: '2025051900068001770',
    cardNo: '507872******7784',
    validity: 'May 19,2030 07:11:00',
    expenseAccount: '6310661403',
    branch: ['1200048495-new', 'branch'],
    boundTo: ['aaaa member-', 'yes730@163.com'],
    operations: ['Unblock'],
  },
  {
    key: '7',
    batchNo: '2025051900068006183',
    cardNo: '507872******7909',
    validity: 'May 19,2030 07:11:00',
    expenseAccount: '6314512814',
    branch: ['1200048495-new', 'branch'],
    boundTo: ['1111-+2342024112111'],
    operations: ['Unlink', 'Set Card PIN', 'Block'],
  },
];
