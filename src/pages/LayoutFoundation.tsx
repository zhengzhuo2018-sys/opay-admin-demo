import { Alert, Button, Card, Dropdown, Menu, Space, Typography } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import './layout-foundation.css';

const { Text } = Typography;

export default function LayoutFoundation() {
  return (
    <main className="layout-foundation" data-testid="layout-foundation">
      <Alert
        className="layout-notice"
        type="warning"
        content="Dear customer, in line with the Federal Inland Revenue Service (FIRS) regulations, effective September 9, 2024, a fee of N50 will be applied to transfers of N10,000 or above paid into your OPay account."
      />

      <Card
        className="layout-content-slot"
        title={<Text className="layout-card-title">Transaction History</Text>}
        extra={
          <Space>
            <Button type="primary">Field settings</Button>
            <Button type="primary">Download Field settings</Button>
            <Dropdown
              trigger="click"
              droplist={
                <Menu>
                  <Menu.Item key="csv">Download CSV</Menu.Item>
                  <Menu.Item key="xlsx">Download XLSX</Menu.Item>
                </Menu>
              }
            >
              <Button type="primary">Download <IconDown /></Button>
            </Dropdown>
          </Space>
        }
      >
        <div className="layout-page-slot" aria-label="Transaction history content slot" />
      </Card>
    </main>
  );
}
