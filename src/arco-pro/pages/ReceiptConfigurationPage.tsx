import { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Checkbox, Descriptions, Divider, Empty, Grid, List, Message,
  Radio, Select, Space, Switch, Tabs, Typography,
} from '@arco-design/web-react';
import { IconArrowDown, IconArrowUp } from '@arco-design/web-react/icon';
import {
  cloneReceipt, moveReceiptField, receiptPreview, receiptSource,
  type ReceiptConfiguration,
} from '../../data/page3';
import styles from './Page3.module.css';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

export default function ReceiptConfigurationPage({ saved, onSave }: {
  saved: ReceiptConfiguration; onSave: (configuration: ReceiptConfiguration) => void;
}) {
  const [draft, setDraft] = useState(() => cloneReceipt(saved));
  useEffect(() => setDraft(cloneReceipt(saved)), [saved]);
  const toggles: { key: 'printMerchant' | 'requirePassword' | 'printQr'; title: string; description: string }[] = [
    { key: 'printMerchant', title: 'Enable Print Merchant Receipt', description: 'Turning this on wil print a receipt by default after a transaction' },
    { key: 'requirePassword', title: 'Enable Print Receipt Transaction Require Terminal Password', description: 'Turning this on will require terminal password for printingreceipt from transaction history' },
    { key: 'printQr', title: 'Enable QR on Merchant Reprint', description: 'Enabling this function can display the QR on the Merchart Reprint' },
  ];
  return (
    <main className={styles.page} data-testid="receipt-configuration-page">
      <Card>
        <Tabs activeTab="pos">
          <Tabs.TabPane key="pin" title="Payment PIN" disabled />
          <Tabs.TabPane key="pos" title="POS Configuration" />
          <Tabs.TabPane key="settlement" title="Settlement" disabled />
        </Tabs>
        <Row className={styles.receiptBranchInfo} gutter={[24, 16]} align="center" data-testid="receipt-branch-info">
          <Col xs={24} lg={6}><Descriptions layout="vertical" column={1} data={[
            { label: 'Branch Code', value: receiptSource.branchCode },
          ]} /></Col>
          <Col xs={24} lg={10}><Descriptions layout="vertical" column={1} data={[
            { label: 'Branch Name', value: receiptSource.branchName },
          ]} /></Col>
          <Col xs={24} lg={8}>
            <Space direction="vertical"><Text>Branch Search</Text>
              <Select className={styles.branchSelect} aria-label="Receipt branch search" value={receiptSource.selectorCode}
                options={[{ label: receiptSource.selectorLabel, value: receiptSource.selectorCode }]} />
            </Space>
          </Col>
        </Row>
      </Card>
      <Card data-testid="receipt-settings-group">
        <Tabs activeTab="receipt">
          <Tabs.TabPane key="features" title="Terminal Features" disabled />
          <Tabs.TabPane key="receipt" title="Receipt Configuration" />
          <Tabs.TabPane key="password" title="Terminal Password" disabled />
        </Tabs>
        <Alert type="warning" content={`These Setting affect all POS terminals in this business: ${receiptSource.branchName}`} />
        <List className={styles.section} split={false} bordered={false} dataSource={toggles} render={(toggle) => (
          <List.Item actions={[<Switch key={toggle.key} aria-label={toggle.title} checked={draft[toggle.key]}
            onChange={(checked) => setDraft((previous) => ({ ...previous, [toggle.key]: checked }))} />]}>
            <List.Item.Meta title={toggle.title} description={toggle.description} />
          </List.Item>
        )} />
        <Divider />
        <Row gutter={[24, 24]}>
          {(['purchase', 'transfer'] as const).map((kind) => <Col key={kind} xs={24} xl={12}>
            <Title heading={6}>{kind === 'purchase' ? 'The displayed on the Purchase' : 'The displayed on the Transfer Number'}</Title>
            <List size="small" dataSource={draft[kind]} render={(field, index) => (
              <List.Item className={styles.receiptField} actions={[
                <Space key={field.id} size="mini">
                  <Button size="small" icon={<IconArrowUp />} aria-label={`Move ${field.id} up`} disabled={index === 0}
                    onClick={() => setDraft((previous) => ({ ...previous, [kind]: moveReceiptField(previous[kind], field.id, -1) }))} />
                  <Button size="small" icon={<IconArrowDown />} aria-label={`Move ${field.id} down`} disabled={index === draft[kind].length - 1}
                    onClick={() => setDraft((previous) => ({ ...previous, [kind]: moveReceiptField(previous[kind], field.id, 1) }))} />
                  <Checkbox checked={field.enabled} aria-label={`Display ${field.id}`}
                    onChange={(checked) => setDraft((previous) => ({ ...previous,
                      [kind]: previous[kind].map((item) => item.id === field.id ? { ...item, enabled: checked } : item),
                    }))} />
                </Space>,
              ]}>
                <Space><Text type="secondary">{index + 1}.</Text><Text>{field.label}</Text></Space>
              </List.Item>
            )} />
          </Col>)}
        </Row>
        <Divider />
        <Title heading={6}>The information is displayed after scanning the code9</Title>
        <Radio.Group aria-label="QR information format" value={draft.format} disabled={!draft.printQr}
          options={[{ label: 'Label & Value', value: 'label-value' }, { label: 'Value Only', value: 'value' }]}
          onChange={(format) => setDraft((previous) => ({ ...previous, format }))} />
        <Row gutter={[24, 24]} className={styles.section}>
          {(['purchase', 'transfer'] as const).map((kind) => <Col key={kind} xs={24} xl={12}>
            <Title heading={6}>{kind === 'purchase' ? 'Purchase previes' : 'Transfer number previes'}</Title>
            <div className={styles.preview} role="region" aria-label={`${kind} receipt preview`}>
              {receiptPreview(draft, kind) || <Empty />}
            </div>
          </Col>)}
        </Row>
        <div className={styles.footer}>
          <Button onClick={() => setDraft(cloneReceipt(saved))}>Cancel</Button>
          <Button type="primary" onClick={() => {
            onSave(cloneReceipt(draft)); Message.success('Settings saved for this session.');
          }}>Submit</Button>
        </div>
      </Card>
    </main>
  );
}
