import { teamMembers, type TeamMemberRecord } from './team-members';

export type TeamWorkspaceMember = TeamMemberRecord & { alternateOtp?: string; isPreview?: boolean };
export type MemberDraft = {
  accountType: 'email' | 'phone';
  accountId: string;
  memberName: string;
  bappLogin: boolean;
  otpType: 'email' | 'phone';
  alternateOtp?: string;
  branch: string;
  roles: string[];
};

export function memberRoles(member: TeamMemberRecord) {
  // The source fixture wraps "Payout Authorizer" over two display lines.
  // Restore that one label before interpreting comma-separated assignments.
  return member.role.join(',').replace(/Payout,Authorizer/g, 'Payout Authorizer')
    .split(',').map((role) => role.trim()).filter(Boolean);
}

export const teamRoleOptions = Array.from(new Set(teamMembers.flatMap(memberRoles)))
  .map((role) => ({ label: role, value: role }));

export const teamBranchOptions = Array.from(new Map(teamMembers.map((member) => [
  member.branchName.at(-1)!,
  { value: member.branchName.at(-1)!, label: member.branchName.slice(0, -1).join(' '), lines: member.branchName },
])).values());

// Acceptance-preview additions, not an inferred OPay authorization policy.
// No grants are assigned until the reviewer explicitly saves a configuration.
export const permissionGroups = [
  { key: 'transactions', label: 'Transactions', description: 'Transaction records and exports', actions: [
    { key: 'transactions.view', label: 'View transaction history and details' },
    { key: 'transactions.export', label: 'Export transaction records' },
  ] },
  { key: 'pos', label: 'POS', description: 'Terminal management and applications', actions: [
    { key: 'pos.view', label: 'View POS terminals' },
    { key: 'pos.apply', label: 'Apply for POS' },
  ] },
  { key: 'team', label: 'Team', description: 'Members and role configuration', actions: [
    { key: 'team.view', label: 'View team members' },
    { key: 'team.create', label: 'Add team members' },
    { key: 'team.permissions', label: 'Configure role permissions' },
  ] },
  { key: 'settlement', label: 'Settlement', description: 'Settlement records', actions: [
    { key: 'settlement.view', label: 'View settlements' },
    { key: 'settlement.download', label: 'Download settlement records' },
  ] },
] as const;

export type PermissionKey = typeof permissionGroups[number]['actions'][number]['key'];
export type RolePermissions = Partial<Record<string, PermissionKey[]>>;
export const allPermissionKeys: PermissionKey[] = permissionGroups.flatMap((group) => group.actions.map((action) => action.key));

export function validateContact(type: 'email' | 'phone', value: string) {
  const contact = value.trim();
  return type === 'email'
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    : /^\+?\d{7,15}$/.test(contact.replace(/[\s()-]/g, ''));
}

export function normalizeAccount(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized.includes('@') ? normalized : normalized.replace(/[\s()+-]/g, '');
}

export function isDuplicateMember(members: TeamWorkspaceMember[], accountId: string, branch: string) {
  return members.some((member) => normalizeAccount(member.accountId) === normalizeAccount(accountId)
    && member.branchName.at(-1) === branch);
}

export function createPreviewMember(draft: MemberDraft, members: TeamWorkspaceMember[]): TeamWorkspaceMember {
  const branch = teamBranchOptions.find((option) => option.value === draft.branch);
  if (!branch || !validateContact(draft.accountType, draft.accountId) || !draft.memberName.trim()
    || !draft.roles.length || draft.roles.some((role) => !teamRoleOptions.some((option) => option.value === role))
    || (draft.alternateOtp?.trim() && !validateContact(draft.otpType, draft.alternateOtp))) {
    throw new Error('Please review the member information.');
  }
  if (isDuplicateMember(members, draft.accountId, draft.branch)) {
    throw new Error('This account is already assigned to the selected branch.');
  }
  const no = Math.max(0, ...members.map((member) => member.no)) + 1;
  return {
    key: `preview-${no}`, no, accountId: draft.accountId.trim(), memberName: [draft.memberName.trim()],
    branchName: [...branch.lines], role: [...draft.roles], bappLogin: draft.bappLogin ? 'Yes' : 'No',
    verification: 'Add', alternateOtp: draft.alternateOtp?.trim() || undefined, isPreview: true,
  };
}
