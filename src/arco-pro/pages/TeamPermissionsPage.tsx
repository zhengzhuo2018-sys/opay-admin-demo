import { useState } from 'react';
import {
  Alert, Button, Checkbox, Message, Modal, Select, Space, Table, Tag, Typography,
  type TableColumnProps,
} from '@arco-design/web-react';
import { IconArrowLeft, IconRefresh, IconSave } from '@arco-design/web-react/icon';
import {
  allPermissionKeys, memberRoles, permissionGroups, teamRoleOptions,
  type PermissionKey, type RolePermissions, type TeamWorkspaceMember,
} from '../../data/team-workspace';
import EditPage from '../patterns/EditPage';
import styles from './TeamPages.module.css';

type PermissionGroup = typeof permissionGroups[number];
const { Text } = Typography;
const samePermissions = (left: PermissionKey[], right: PermissionKey[]) =>
  left.length === right.length && left.every((key) => right.includes(key));

export default function TeamPermissionsPage({ members, permissions, initialRole, onSave, onBack }: {
  members: TeamWorkspaceMember[]; permissions: RolePermissions; initialRole: string;
  onSave: (role: string, keys: PermissionKey[]) => void; onBack: () => void;
}) {
  const [role, setRole] = useState(initialRole);
  const [selected, setSelected] = useState<PermissionKey[]>(permissions[initialRole] ?? []);
  const saved = permissions[role];
  const dirty = !samePermissions(selected, saved ?? []);
  const assignedMembers = members.filter((member) => memberRoles(member).includes(role));

  const discardThen = (action: () => void) => {
    if (!dirty) { action(); return; }
    Modal.confirm({ title: 'Discard unsaved permission changes?',
      content: 'The last saved preview configuration will be kept.',
      okText: 'Discard changes', cancelText: 'Keep editing', onOk: action,
    });
  };
  const toggleGroup = (group: PermissionGroup, checked: boolean) => {
    const groupKeys: PermissionKey[] = group.actions.map((action) => action.key);
    setSelected((previous) => checked
      ? [...new Set([...previous, ...groupKeys])]
      : previous.filter((key) => !groupKeys.includes(key)));
  };
  const columns: TableColumnProps<PermissionGroup>[] = [
    { title: 'Module', width: 240, render: (_, group) => {
      const count = group.actions.filter((action) => selected.includes(action.key)).length;
      return <div className={styles.cell}>
        <Checkbox checked={count === group.actions.length} indeterminate={count > 0 && count < group.actions.length}
          onChange={(checked) => toggleGroup(group, checked)}>{group.label}</Checkbox>
        <Text type="secondary">{group.description}</Text>
      </div>;
    } },
    { title: 'Allowed actions', render: (_, group) => (
      <div className={styles.permissionOptions}>
        {group.actions.map((action) => <Checkbox key={action.key} checked={selected.includes(action.key)}
          onChange={(checked) => setSelected((previous) => checked
            ? [...previous, action.key] : previous.filter((key) => key !== action.key))}>{action.label}</Checkbox>)}
      </div>
    ) },
    { title: 'Selected', width: 100, render: (_, group) => (
      <Text>{group.actions.filter((action) => selected.includes(action.key)).length} / {group.actions.length}</Text>
    ) },
  ];

  return (
    <EditPage title="Permissions" description="Configure preview permissions for the roles assigned to your team."
      testId="team-permissions-page" actions={(
        <Button icon={<IconArrowLeft />} onClick={() => discardThen(onBack)}>Back to team members</Button>
      )}>
      <div className={styles.section}>
        <Alert type="warning" content="Preview only. The OPay permission matrix is not supplied; these example actions do not change live access. Changes reset on reload." />
      </div>
      <div className={styles.permissionsHeader}>
        <Space wrap>
          <Text bold>Role</Text>
          <Select aria-label="Permission role" className={styles.roleSelect} value={role} options={teamRoleOptions}
            onChange={(value) => discardThen(() => { setRole(value); setSelected(permissions[value] ?? []); })} />
          <Tag color={dirty ? 'orange' : saved ? 'arcoblue' : undefined}>
            {dirty ? 'Unsaved changes' : saved ? 'Preview configured' : 'Not configured'}
          </Tag>
        </Space>
        <Text type="secondary">{assignedMembers.length} branch assignment{assignedMembers.length === 1 ? '' : 's'} · {selected.length} of {allPermissionKeys.length} actions selected</Text>
      </div>
      {saved === undefined ? <div className={styles.notice}><Text type="secondary">
        No default grants are assumed, including administrator roles. Unchecked boxes do not describe existing OPay access.
      </Text></div> : null}
      <div className={styles.permissionsHeader}>
        <Checkbox checked={selected.length === allPermissionKeys.length}
          indeterminate={selected.length > 0 && selected.length < allPermissionKeys.length}
          onChange={(checked) => setSelected(checked ? [...allPermissionKeys] : [])}>Select all preview actions</Checkbox>
        <Button type="text" disabled={!selected.length} onClick={() => setSelected([])}>Clear selection</Button>
      </div>
      <Table rowKey="key" border={false} columns={columns} data={[...permissionGroups]} scroll={{ x: 820 }} pagination={false} />
      <div className={styles.footer}>
        <Text type="secondary">Saved changes are shared by preview members with this role.</Text>
        <Space wrap>
          <Button icon={<IconRefresh />} disabled={!dirty} onClick={() => setSelected([...(saved ?? [])])}>Reset changes</Button>
          <Button type="primary" icon={<IconSave />} disabled={saved !== undefined && !dirty}
            onClick={() => {
              onSave(role, allPermissionKeys.filter((key) => selected.includes(key)));
              Message.success('Preview permissions saved. Live access is unchanged.');
            }}>Save preview permissions</Button>
        </Space>
      </div>
      <div className={styles.section}>
        <Typography.Title heading={6}>Assigned members</Typography.Title>
        <Table rowKey="key" border={false} pagination={{ pageSize: 5, showTotal: true }} scroll={{ x: 560 }}
          columns={[
            { title: 'Account ID', dataIndex: 'accountId', width: 190 },
            { title: 'Member Name', render: (_, member: TeamWorkspaceMember) => member.memberName.join(' ') },
            { title: 'Branch', render: (_, member: TeamWorkspaceMember) => member.branchName.slice(0, -1).join(' ') },
          ]} data={assignedMembers} />
      </div>
    </EditPage>
  );
}
