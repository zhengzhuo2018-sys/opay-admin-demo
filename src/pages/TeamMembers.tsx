import { Button, Input, Select, type TableColumnProps } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { ListDataTable, ListFilterField, MultiLineCell } from '../components/list';
import ListPage from '../components/patterns/ListPage';
import { SimpleModal } from '../components/simple-modal';
import { teamMembers, type TeamMemberRecord } from '../data/team-members';
import './team-members.css';

type TeamMembersProps = {
  showAlternateOtp: boolean;
  onOpenAlternateOtp: () => void;
  onCloseAlternateOtp: () => void;
  onAddMember: () => void;
};

const branchOptions = [
  { label: 'MAYAKS aaa"PRESTIGE STITCHES LTD', value: 'mayaks' },
  { label: 'new branch', value: 'new-branch' },
];

export default function TeamMembers({
  showAlternateOtp,
  onOpenAlternateOtp,
  onCloseAlternateOtp,
  onAddMember,
}: TeamMembersProps) {
  const columns: TableColumnProps<TeamMemberRecord>[] = [
    { title: 'No.', dataIndex: 'no', width: 56 },
    {
      title: 'Account ID',
      width: 168,
      render: (_, record) => <span className="team-account-id">{record.accountId}</span>,
    },
    {
      title: 'Member Name',
      width: 172,
      render: (_, record) => <MultiLineCell lines={record.memberName} />,
    },
    {
      title: 'Branch Name',
      width: 200,
      render: (_, record) => <MultiLineCell lines={record.branchName} />,
    },
    {
      title: 'Role',
      width: 196,
      render: (_, record) => <MultiLineCell lines={record.role} />,
    },
    { title: 'BAPP Login', dataIndex: 'bappLogin', width: 132 },
    {
      title: 'BVN/NIN',
      width: 132,
      render: (_, record) => record.verification === 'Verified'
        ? <span className="team-verified">Verified</span>
        : <Button size="mini" type="outline">Add</Button>,
    },
    {
      title: 'Alternate OTP Receiving Method',
      width: 224,
      render: () => <Button type="text" onClick={onOpenAlternateOtp}>Add</Button>,
    },
  ];

  const filters = (
    <div className="team-filter-grid">
      <ListFilterField label="Account ID">
        <Input placeholder="Search account ID" allowClear />
      </ListFilterField>
      <ListFilterField label="Branch">
        <Select placeholder="Select" options={branchOptions} allowClear />
      </ListFilterField>
    </div>
  );

  const actions = (
    <>
      <Button type="primary" icon={<IconDown />} iconOnly={false}>Bulk Create Employees</Button>
      <Button type="primary" onClick={onAddMember}>Add Team Member</Button>
    </>
  );

  return (
    <>
      <ListPage
        title="Team Members"
        actions={actions}
        filters={filters}
        pagination={<span className="team-page-count">Showing 1 - 10 of 47</span>}
        testId="team-members-page"
      >
        <ListDataTable columns={columns} data={teamMembers} rowKey="key" scrollX={1280} />
      </ListPage>

      <SimpleModal
        title="Alternate OTP Receiving Method"
        visible={showAlternateOtp}
        onClose={onCloseAlternateOtp}
        footer={(
          <>
            <Button type="text" onClick={onCloseAlternateOtp}>Cancel</Button>
            <Button type="primary" onClick={onCloseAlternateOtp}>Confirm</Button>
          </>
        )}
        testId="alternate-otp-modal"
      >
        <div className="alternate-otp-warning">
          Please confirm before filling. It cannot be modified once submitted!
        </div>
        <div className="alternate-otp-field">
          <ListFilterField label="Email">
            <Input placeholder="Enter receiving email address" />
          </ListFilterField>
        </div>
      </SimpleModal>
    </>
  );
}
