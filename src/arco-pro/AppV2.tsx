import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { findNavigationLabel } from '../config/navigation';
import ProShell from './layout/ProShell';
import OverviewPage from './pages/OverviewPage';
import ShellStage from './pages/ShellStage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import TransactionDetailPage from './pages/TransactionDetailPage';
import PosListPage from './pages/PosListPage';
import TeamMembersPage from './pages/TeamMembersPage';
import AddTeamMemberPage from './pages/AddTeamMemberPage';
import TeamPermissionsPage from './pages/TeamPermissionsPage';
import BusinessDashboardPage from './pages/BusinessDashboardPage';
import SettlementPage from './pages/SettlementPage';
import ReceiptConfigurationPage from './pages/ReceiptConfigurationPage';
import { cloneReceipt, initialReceiptConfiguration } from '../data/page3';
import { teamMembers } from '../data/team-members';
import {
  createPreviewMember, normalizeAccount, teamRoleOptions,
  type MemberDraft, type PermissionKey, type RolePermissions, type TeamWorkspaceMember,
} from '../data/team-workspace';

function usesHashRouting() {
  return import.meta.env.BASE_URL !== '/' || window.location.hash.startsWith('#/');
}

function readPathname() {
  const hashPath = window.location.hash.replace(/^#/, '');
  if (hashPath.startsWith('/')) return hashPath;
  return window.location.pathname === '/' ? '/overview' : window.location.pathname;
}

export default function AppV2() {
  const [pathname, setPathname] = useState(readPathname);
  const [members, setMembers] = useState<TeamWorkspaceMember[]>(teamMembers);
  const [permissions, setPermissions] = useState<RolePermissions>({});
  const [permissionRole, setPermissionRole] = useState(teamRoleOptions[0].value);
  const [receiptConfiguration, setReceiptConfiguration] = useState(initialReceiptConfiguration);
  const detailMatch = pathname.match(/^\/transactions\/(\d+)$/);

  useEffect(() => {
    const handleLocationChange = () => setPathname(readPathname());
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const title = useMemo(
    () => /^\/transactions\/\d+$/.test(pathname)
      ? 'Transaction Details'
      : pathname === '/dashboard' || pathname === '/dashboard/refund' ? 'Business Dashboard'
        : pathname === '/pos/apply' ? 'POS List'
        : pathname === '/team/members/new' ? 'Add Team Member'
          : findNavigationLabel(pathname) ?? 'Workspace',
    [pathname],
  );

  const navigate = (path: string) => {
    window.scrollTo({ top: 0 });
    if (usesHashRouting()) {
      window.location.hash = path;
      return;
    }
    window.history.pushState({}, '', path);
    setPathname(path);
  };

  const openPermissions = (role?: string) => {
    setPermissionRole(role ?? teamRoleOptions[0].value);
    navigate('/team/permissions');
  };
  const addMember = (draft: MemberDraft) => {
    const member = createPreviewMember(draft, members);
    setMembers((previous) => [member, ...previous]);
    return member;
  };
  const savePermissions = (role: string, keys: PermissionKey[]) => {
    setPermissions((previous) => ({ ...previous, [role]: [...keys] }));
  };

  const page = pathname === '/dashboard' || pathname === '/dashboard/refund' ? (
    <BusinessDashboardPage onNavigate={navigate} showRefund={pathname === '/dashboard/refund'} onCloseRefund={() => navigate('/dashboard')} />
  ) : pathname === '/settlement/list' ? (
    <SettlementPage />
  ) : pathname === '/settings/pos/receipt' ? (
    <ReceiptConfigurationPage saved={receiptConfiguration} onSave={(configuration) => setReceiptConfiguration(cloneReceipt(configuration))} />
  ) : pathname === '/overview' ? (
    <OverviewPage />
  ) : pathname === '/transactions/history' ? (
    <TransactionHistoryPage
      onOpenDetail={(transactionId) => navigate(`/transactions/${transactionId}`)}
    />
  ) : detailMatch ? (
    <TransactionDetailPage
      transactionId={detailMatch[1]}
      onCancel={() => navigate('/transactions/history')}
    />
  ) : pathname === '/pos' || pathname === '/pos/apply' ? (
    <PosListPage
      showApply={pathname === '/pos/apply'}
      onOpenApply={() => navigate('/pos/apply')}
      onCloseApply={() => navigate('/pos')}
    />
  ) : pathname === '/team/members' ? (
    <TeamMembersPage members={members} permissions={permissions}
      onAddMember={() => navigate('/team/members/new')} onPermissions={openPermissions}
      onSaveOtp={(accountId, email) => setMembers((previous) => previous.map((member) =>
        normalizeAccount(member.accountId) === normalizeAccount(accountId) ? { ...member, alternateOtp: email } : member))} />
  ) : pathname === '/team/members/new' ? (
    <AddTeamMemberPage members={members} permissions={permissions} onCreate={addMember}
      onBack={() => navigate('/team/members')} onPermissions={openPermissions} />
  ) : pathname === '/team/permissions' ? (
    <TeamPermissionsPage members={members} permissions={permissions} initialRole={permissionRole}
      onSave={savePermissions} onBack={() => navigate('/team/members')} />
  ) : (
    <ShellStage title={title} />
  );

  return (
    <ConfigProvider locale={enUS}>
      <ProShell pathname={detailMatch ? '/transactions/history' : pathname === '/dashboard/refund' ? '/dashboard' : pathname === '/pos/apply' ? '/pos'
        : pathname === '/team/members/new' ? '/team/members' : pathname} title={title} onNavigate={navigate}>
        {page}
      </ProShell>
    </ConfigProvider>
  );
}
