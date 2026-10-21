import { useState } from 'react';
import {
  Alert, Button, Descriptions, Drawer, Form, Grid, Input, Modal, Select, Space,
  Table, Tag, Tooltip, Typography, type TableColumnProps,
} from '@arco-design/web-react';
import { IconDown, IconPlus, IconRefresh, IconSearch, IconSettings } from '@arco-design/web-react/icon';
import {
  memberRoles, teamBranchOptions, validateContact,
  type RolePermissions, type TeamWorkspaceMember,
} from '../../data/team-workspace';
import ListPage from '../patterns/ListPage';
import pageStyles from '../patterns/Page.module.css';
import styles from './TeamPages.module.css';

const { Text } = Typography;
const { Row, Col } = Grid;
type Filters = { accountId?: string; branch?: string };

export default function TeamMembersPage({ members, permissions, onAddMember, onPermissions, onSaveOtp }: {
  members: TeamWorkspaceMember[]; permissions: RolePermissions;
  onAddMember: () => void; onPermissions: (role?: string) => void;
  onSaveOtp: (accountId: string, email: string) => void;
}) {
  const [form] = Form.useForm<Filters>();
  const [otpForm] = Form.useForm<{ email: string }>();
  const [filters, setFilters] = useState<Filters>({});
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [otpMember, setOtpMember] = useState<TeamWorkspaceMember | null>(null);
  const [identityMember, setIdentityMember] = useState<TeamWorkspaceMember | null>(null);
  const records = members.filter((member) => (
    (!filters.accountId || member.accountId.toLowerCase().includes(filters.accountId.trim().toLowerCase()))
    && (!filters.branch || member.branchName.at(-1) === filters.branch)
  ));

  const columns: TableColumnProps<TeamWorkspaceMember>[] = [
    { title: 'No.', dataIndex: 'no', width: 65 },
    { title: 'Account ID', width: 190, render: (_, member) => (
      <div className={styles.cell}>
        <Text copyable>{member.accountId}</Text>
        {member.isPreview ? <Tag size="small" color="arcoblue">Preview member</Tag> : null}
      </div>
    ) },
    { title: 'Member Name', width: 160, render: (_, member) => (
      <div className={styles.cell}>{member.memberName.map((line, index) => <Text key={index}>{line}</Text>)}</div>
    ) },
    { title: 'Branch Name', width: 235, render: (_, member) => (
      <div className={styles.cell}>
        <Text>{member.branchName.slice(0, -1).join(' ')}</Text>
        <Text type="secondary">{member.branchName.at(-1)}</Text>
      </div>
    ) },
    { title: 'Role', width: 230, render: (_, member) => (
      <div className={styles.cell}>
        <Space wrap size="mini">{memberRoles(member).map((role) => <Tag key={role}>{role}</Tag>)}</Space>
        <Text type="secondary">{memberRoles(member).some((role) => permissions[role] === undefined)
          ? 'Permissions not configured' : 'Preview permissions configured'}</Text>
      </div>
    ) },
    { title: 'BAPP Login', dataIndex: 'bappLogin', width: 115 },
    { title: 'BVN/NIN', width: 110, render: (_, member) => member.verification === 'Verified'
      ? <Tag color="green">Verified</Tag>
      : <Button type="text" size="small" onClick={() => setIdentityMember(member)}>Add</Button> },
    { title: 'Alternate OTP Receiving Method', width: 240, render: (_, member) => member.alternateOtp
      ? <Text>{member.alternateOtp}</Text>
      : <Button type="text" size="small" aria-label={`Add alternate OTP for member ${member.key}`} onClick={() => {
        otpForm.resetFields(); setOtpMember(member);
      }}>Add</Button> },
    { title: 'Actions', fixed: 'right', width: 120, render: (_, member) => (
      <Button type="text" size="small" aria-label={`Permissions for member ${member.key}`}
        onClick={() => onPermissions(memberRoles(member)[0])}>Permissions</Button>
    ) },
  ];

  return (
    <>
      <ListPage title="Team Members" description="Manage team accounts, branch assignments and role permissions."
        testId="team-members-page" className={styles.teamPage}
        actions={(
          <Space wrap>
            <Tooltip content="Bulk import is not connected in this preview.">
              <Button disabled icon={<IconDown />}>Bulk Create Employees</Button>
            </Tooltip>
            <Button icon={<IconSettings />} onClick={() => onPermissions()}>Permissions</Button>
            <Button type="primary" icon={<IconPlus />} onClick={onAddMember}>Add Team Member</Button>
          </Space>
        )}
        filters={(
          <Form id="team-filters" form={form} layout="vertical" onSubmit={(values) => {
            setFilters(values); setPagination((previous) => ({ ...previous, current: 1 }));
          }}>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item label="Account ID" field="accountId"><Input allowClear placeholder="Search account ID" /></Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Branch" field="branch">
                  <Select allowClear placeholder="Select branch" options={teamBranchOptions} />
                </Form.Item>
              </Col>
            </Row>
            <div className={pageStyles.filterActions}><Space>
              <Button icon={<IconRefresh />} onClick={() => {
                form.resetFields(); setFilters({}); setPagination((previous) => ({ ...previous, current: 1 }));
              }}>Reset</Button>
              <Button type="primary" htmlType="submit" icon={<IconSearch />}>Search</Button>
            </Space></div>
          </Form>
        )}
        resultSummary={(
          <><Space><Text bold>Team members</Text><Tag>{records.length}</Tag></Space>
            <Text type="secondary">Preview changes last until you reload. No live accounts are changed.</Text></>
        )}>
        <Table rowKey="key" border={false} columns={columns} data={records} scroll={{ x: 1565 }}
          pagination={{ ...pagination, total: records.length, showTotal: true, sizeCanChange: true, sizeOptions: [10, 20, 50] }}
          onChange={({ current, pageSize }) => setPagination((previous) => ({
            current: current ?? previous.current, pageSize: pageSize ?? previous.pageSize,
          }))} />
      </ListPage>

      <Modal title="Alternate OTP Receiving Method" visible={otpMember !== null} unmountOnExit
        style={{ maxWidth: 'calc(100vw - 32px)' }}
        onCancel={() => setOtpMember(null)} onOk={() => otpForm.submit()} okText="Confirm">
        <Alert type="warning" className={styles.notice}
          content="Please confirm before filling. It cannot be modified once submitted!" />
        <Text type="secondary">Local preview only. This does not change real OTP delivery.</Text>
        <Descriptions className={styles.section} column={1} data={[{ label: 'Account ID', value: otpMember?.accountId }]} />
        <Form id="alternate-otp" form={otpForm} layout="vertical" onSubmit={({ email }) => {
          if (otpMember) onSaveOtp(otpMember.accountId, email.trim());
          setOtpMember(null);
        }}>
          <Form.Item label="Email" field="email" rules={[
            { required: true, message: 'Enter a receiving email address.' },
            { validator: (value, callback) => callback(value && !validateContact('email', value) ? 'Enter a valid email address.' : undefined) },
          ]}><Input placeholder="Enter receiving email address" /></Form.Item>
        </Form>
      </Modal>

      <Drawer title="BVN/NIN verification" visible={identityMember !== null} width={480}
        style={{ maxWidth: '100vw' }} footer={null} onCancel={() => setIdentityMember(null)}>
        <Descriptions column={1} data={[
          { label: 'Account ID', value: identityMember?.accountId },
          { label: 'Member Name', value: identityMember?.memberName.join(' ') },
          { label: 'Verification', value: 'Not verified' },
        ]} />
        <Alert type="info" content="Identity verification is not connected in this preview. No BVN or NIN is collected, and the verification status is unchanged." />
      </Drawer>
    </>
  );
}
