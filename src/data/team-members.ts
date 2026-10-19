export type TeamMemberRecord = {
  key: string;
  no: number;
  accountId: string;
  memberName: string[];
  branchName: string[];
  role: string[];
  bappLogin: string;
  verification: 'Verified' | 'Add';
};

export const teamMembers: TeamMemberRecord[] = [
  { key: '1', no: 1, accountId: '+2342025121500', memberName: ['Current', '2025121500'], branchName: ['MAYAKS aaa\"PRESTIGE', 'STITCHES LTD', '1200048362'], role: ['Super Admin', 'Admin,Employee'], bappLogin: 'Yes', verification: 'Verified' },
  { key: '2', no: 2, accountId: '+2342026062300', memberName: ['11111'], branchName: ['new branch', '1200048495'], role: ['Accounting'], bappLogin: 'Yes', verification: 'Add' },
  { key: '3', no: 3, accountId: '+2342026062300', memberName: ['11111'], branchName: ['aaaa test', '1200048368'], role: ['Accounting'], bappLogin: 'Yes', verification: 'Add' },
  { key: '4', no: 4, accountId: '+2342026062300', memberName: ['11111'], branchName: ['test branch 22222', '1200048363'], role: ['Accounting'], bappLogin: 'Yes', verification: 'Add' },
  { key: '5', no: 5, accountId: '+2342025121500', memberName: ['Current', '2025121500'], branchName: ['test new new branch', '1200054076'], role: ['Payout Operator,Payout', 'Authorizer'], bappLogin: 'Yes', verification: 'Verified' },
  { key: '6', no: 6, accountId: '+2342025121500', memberName: ['Current', '2025121500'], branchName: ['new branch', '1200048495'], role: ['Operator,Employee'], bappLogin: 'Yes', verification: 'Verified' },
  { key: '7', no: 7, accountId: '+2342025121500', memberName: ['Current', '2025121500'], branchName: ['aaaa test', '1200048368'], role: ['Payout Operator,Payout', 'Authorizer'], bappLogin: 'Yes', verification: 'Verified' },
];
