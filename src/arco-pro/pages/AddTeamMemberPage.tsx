import { useEffect, useState } from 'react';
import {
  Alert, Button, Descriptions, Form, Grid, Input, Popconfirm, Result,
  Select, Space, Steps, Switch, Tag, Typography,
} from '@arco-design/web-react';
import { IconArrowLeft } from '@arco-design/web-react/icon';
import {
  isDuplicateMember, teamBranchOptions, teamRoleOptions, validateContact,
  type MemberDraft, type RolePermissions, type TeamWorkspaceMember,
} from '../../data/team-workspace';
import EditPage from '../patterns/EditPage';
import styles from './TeamPages.module.css';

const { Row, Col } = Grid;
const { Text } = Typography;
const initialDraft: MemberDraft = {
  accountType: 'email', accountId: '', memberName: '', bappLogin: true,
  otpType: 'phone', alternateOtp: '', branch: '', roles: [],
};

function AccountStep({ draft, onNext }: { draft: MemberDraft; onNext: (values: MemberDraft) => void }) {
  const [form] = Form.useForm<MemberDraft>();
  const [accountType, setAccountType] = useState(draft.accountType);
  const [otpType, setOtpType] = useState(draft.otpType);
  return (
    <Form id="new-member-account" form={form} layout="vertical" initialValues={draft}
      onSubmit={(values) => onNext({ ...draft, ...values })}>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <Form.Item label="Account type" field="accountType">
            <Select options={[{ label: 'Email', value: 'email' }, { label: 'Phone', value: 'phone' }]}
              onChange={(value) => { setAccountType(value); form.clearFields(['accountId']); }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={18}>
          <Form.Item label="Account ID" field="accountId" rules={[
            { required: true, message: 'Enter an account ID.' },
            { validator: (value, callback) => callback(value && !validateContact(accountType, value)
              ? `Enter a valid ${accountType === 'email' ? 'email address' : 'phone number'}.` : undefined) },
          ]}><Input placeholder={accountType === 'email' ? 'name@example.com' : '+234'} /></Form.Item>
        </Col>
      </Row>
      <Form.Item label="Team Member Name" field="memberName" rules={[
        { required: true, message: 'Enter the team member name.' },
        { validator: (value, callback) => callback(value && !value.trim() ? 'Enter the team member name.' : undefined) },
      ]}><Input maxLength={100} /></Form.Item>
      <Form.Item label="BAPP Login" field="bappLogin" triggerPropName="checked"><Switch /></Form.Item>
      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <Form.Item label="OTP type" field="otpType">
            <Select options={[{ label: 'Phone', value: 'phone' }, { label: 'Email', value: 'email' }]}
              onChange={(value) => { setOtpType(value); form.clearFields(['alternateOtp']); }} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={18}>
          <Form.Item label="Alternate OTP Receiving Method" field="alternateOtp" rules={[
            { validator: (value, callback) => callback(value?.trim() && !validateContact(otpType, value)
              ? `Enter a valid ${otpType === 'email' ? 'email address' : 'phone number'}.` : undefined) },
          ]}><Input placeholder={otpType === 'phone' ? '+234 (optional)' : 'Email address (optional)'} /></Form.Item>
        </Col>
      </Row>
      <div className={styles.footer}><Text type="secondary">Step 1 of 3</Text><Button type="primary" htmlType="submit">Next</Button></div>
    </Form>
  );
}

function PasswordStep({ bappLogin, onBack, onNext }: { bappLogin: boolean; onBack: () => void; onNext: () => void }) {
  const [form] = Form.useForm<{ password: string; confirmPassword: string }>();
  return (
    <Form id="new-member-password" form={form} layout="vertical" onSubmit={() => {
      form.clearFields(); onNext();
    }}>
      <Alert type="info" className={styles.notice} content={bappLogin
        ? 'Preview validation only: use at least 8 characters. Do not use a real password. It is not saved or sent.'
        : 'BAPP Login is off. A password is not required for this preview member.'} />
      {bappLogin ? <>
        <Form.Item label="Password" field="password" rules={[
          { required: true, message: 'Enter a preview password.' },
          { minLength: 8, message: 'Use at least 8 characters for this preview.' },
        ]}><Input.Password autoComplete="new-password" placeholder="Preview password" /></Form.Item>
        <Form.Item label="Confirm Password" field="confirmPassword" rules={[
          { required: true, message: 'Confirm the preview password.' },
          { validator: (value, callback) => callback(value && value !== form.getFieldValue('password') ? 'The passwords do not match.' : undefined) },
        ]}><Input.Password autoComplete="new-password" /></Form.Item>
      </> : null}
      <div className={styles.footer}>
        <Button onClick={onBack}>Previous</Button><Button type="primary" htmlType="submit">Next</Button>
      </div>
    </Form>
  );
}

function RoleStep({ draft, members, permissions, onBack, onCreate }: {
  draft: MemberDraft; members: TeamWorkspaceMember[]; permissions: RolePermissions;
  onBack: (values: MemberDraft) => void; onCreate: (draft: MemberDraft) => void;
}) {
  const [form] = Form.useForm<MemberDraft>();
  const [roles, setRoles] = useState(draft.roles);
  const [error, setError] = useState('');
  return (
    <Form id="new-member-role" form={form} layout="vertical" initialValues={draft} onSubmit={(values) => {
      const next = { ...draft, ...values };
      if (isDuplicateMember(members, next.accountId, next.branch)) {
        setError('This account is already assigned to the selected branch.'); return;
      }
      onCreate(next);
    }}>
      <Form.Item label="Branch" field="branch" rules={[{ required: true, message: 'Select a branch.' }]}>
        <Select placeholder="Select branch" options={teamBranchOptions} onChange={() => setError('')} />
      </Form.Item>
      <Form.Item label="Role" field="roles" rules={[{ required: true, type: 'array', minLength: 1, message: 'Select at least one role.' }]}>
        <Select mode="multiple" placeholder="Select roles" options={teamRoleOptions} onChange={setRoles} />
      </Form.Item>
      {roles.some((role) => permissions[role] === undefined) ? (
        <Alert type="warning" className={styles.notice}
          content="Some selected roles have no permission configuration. You can configure them after adding this preview member. No live access is granted." />
      ) : null}
      <div className={styles.review}>
        <Descriptions title="Account review" column={1} data={[
          { label: 'Account ID', value: draft.accountId.trim() },
          { label: 'Team Member Name', value: draft.memberName.trim() },
          { label: 'BAPP Login', value: draft.bappLogin ? 'Yes' : 'No' },
          { label: 'Alternate OTP', value: draft.alternateOtp?.trim() || 'Not set' },
        ]} />
      </div>
      {error ? <Alert className={styles.section} type="error" content={error} /> : null}
      <div className={styles.footer}>
        <Button onClick={() => onBack({ ...draft, ...form.getFieldsValue() })}>Previous</Button>
        <Button type="primary" htmlType="submit">Add preview member</Button>
      </div>
    </Form>
  );
}

export default function AddTeamMemberPage({ members, permissions, onCreate, onBack, onPermissions }: {
  members: TeamWorkspaceMember[]; permissions: RolePermissions;
  onCreate: (draft: MemberDraft) => TeamWorkspaceMember;
  onBack: () => void; onPermissions: (role?: string) => void;
}) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<MemberDraft>(initialDraft);
  const [created, setCreated] = useState<TeamWorkspaceMember | null>(null);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 640px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)');
    const update = () => setCompact(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return (
    <EditPage title="Add Team Member" description="Set up account information, BAPP login and branch roles."
      testId="add-team-member-page" actions={created ? null : (
        <Popconfirm title="Discard this member draft?" content="Unsaved information will be cleared." onOk={onBack}>
          <Button icon={<IconArrowLeft />}>Cancel</Button>
        </Popconfirm>
      )}
      navigation={created ? null : <Steps className={styles.steps} current={step} size="small"
        labelPlacement={compact ? 'horizontal' : 'vertical'}>
        <Steps.Step title={compact ? 'Account' : 'Account Info'} /><Steps.Step title="Password" /><Steps.Step title="Role" />
      </Steps>}>
      {created ? (
        <Result status="success" title="Preview member added"
          subTitle="The member is available in the preview list. No live account was created, no invitation was sent and no password was saved."
          extra={<Space wrap>
            <Button onClick={onBack}>Back to team members</Button>
            <Button type="primary" onClick={() => onPermissions(created.role[0])}>Configure permissions</Button>
          </Space>}>
          <Descriptions column={1} data={[
            { label: 'Account ID', value: created.accountId },
            { label: 'Member Name', value: created.memberName.join(' ') },
            { label: 'Branch', value: created.branchName.join(' ') },
            { label: 'Roles', value: <Space wrap>{created.role.map((role) => <Tag key={role}>{role}</Tag>)}</Space> },
          ]} />
        </Result>
      ) : <div className={styles.form}>
        <Alert type="info" className={styles.notice} content="Local preview — member and role changes last until you reload. No live account or authorization is changed." />
        {step === 1 ? <AccountStep draft={draft} onNext={(values) => { setDraft(values); setStep(2); }} /> : null}
        {step === 2 ? <PasswordStep bappLogin={draft.bappLogin} onBack={() => setStep(1)} onNext={() => setStep(3)} /> : null}
        {step === 3 ? <RoleStep draft={draft} members={members} permissions={permissions}
          onBack={(values) => { setDraft(values); setStep(2); }}
          onCreate={(values) => { setCreated(onCreate(values)); setDraft(initialDraft); }} /> : null}
      </div>}
    </EditPage>
  );
}
