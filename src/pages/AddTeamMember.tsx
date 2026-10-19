import { useState } from 'react';
import { Button, Form, Input, Select, Switch } from '@arco-design/web-react';
import { EditStatusTabs } from '../components/edit';
import EditPage from '../components/patterns/EditPage';
import './add-team-member.css';

const steps = [
  { key: 'account', title: 'Account Info' },
  { key: 'password', title: 'Password' },
  { key: 'role', title: 'Role' },
];

const accountTypes = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
];

const otpTypes = [
  { label: 'Phone', value: 'phone' },
  { label: 'Email', value: 'email' },
];

export default function AddTeamMember() {
  const [bappLogin, setBappLogin] = useState(true);

  return (
    <EditPage
      title="Add Team Member"
      navigation={<EditStatusTabs items={steps} defaultActiveKey="account" />}
      variant="centered"
      testId="add-team-member-page"
    >
      <Form className="team-member-form" layout="vertical">
        <Form.Item label="Account ID" required>
          <Input.Group compact className="team-member-combined-control">
            <Select className="team-member-prefix-control" defaultValue="email" options={accountTypes} />
            <Input className="team-member-flex-control" />
          </Input.Group>
        </Form.Item>

        <Form.Item label="Team Member Name" required>
          <Input />
        </Form.Item>

        <Form.Item className="team-member-switch-item" label="BAPP Login" required>
          <Switch checked={bappLogin} onChange={setBappLogin} />
        </Form.Item>

        <Form.Item label="Alternate OTP Receiving Method">
          <Input.Group compact className="team-member-combined-control">
            <Select className="team-member-prefix-control" defaultValue="phone" options={otpTypes} />
            <Input className="team-member-flex-control" placeholder="+234" />
          </Input.Group>
        </Form.Item>

        <div className="team-member-next-row">
          <Button className="team-member-next" type="primary">Next</Button>
        </div>
      </Form>
    </EditPage>
  );
}
