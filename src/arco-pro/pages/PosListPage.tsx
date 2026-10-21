import { useState } from 'react';
import {
  Button, DatePicker, Descriptions, Drawer, Empty, Form, Grid, Input,
  Select, Space, Table, Tag, Typography, type TableColumnProps,
} from '@arco-design/web-react';
import { IconPlus, IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { merchantOptions, posRecords, type PosRecord } from '../../data/pos';
import ListPage from '../patterns/ListPage';
import PosApplyModal from './PosApplyModal';
import styles from '../patterns/Page.module.css';

const { Row, Col } = Grid;
const { Text } = Typography;
type PosFilters = { installationDate?: string; posType?: string; merchant?: string; posSn?: string };
type InformationPanel = { title: string; record?: PosRecord };

export default function PosListPage({
  showApply, onOpenApply, onCloseApply,
}: { showApply: boolean; onOpenApply: () => void; onCloseApply: () => void }) {
  const [form] = Form.useForm<PosFilters>();
  const [filters, setFilters] = useState<PosFilters>({});
  const [page, setPage] = useState({ current: 1, pageSize: 10 });
  const [information, setInformation] = useState<InformationPanel | null>(null);
  const records = posRecords.filter((record) => (
    (!filters.installationDate || record.installationDate.startsWith(filters.installationDate))
    && (!filters.posType || record.posType === filters.posType)
    && (!filters.posSn || record.posSn.toLowerCase().includes(filters.posSn.trim().toLowerCase()))
  ));
  const columns: TableColumnProps<PosRecord>[] = [
    { title: 'Installation Date', dataIndex: 'installationDate', width: 180 },
    { title: 'Store Code', dataIndex: 'storeCode', width: 140 },
    {
      title: 'Business Name', width: 210,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          {record.businessName.map((line) => <Text key={line} style={{ wordBreak: 'normal' }}>{line}</Text>)}
        </Space>
      ),
    },
    { title: 'POS SN', dataIndex: 'posSn', width: 145 },
    { title: 'POS Type', dataIndex: 'posType', width: 130, render: (type: string) => <Tag>{type}</Tag> },
    { title: 'OPay Terminal ID', dataIndex: 'terminalId', width: 160 },
    { title: 'Transfer Number', dataIndex: 'transferNumber', width: 155 },
    {
      title: 'Actions', fixed: 'right', width: 195,
      render: (_, record) => (
        <Space size="mini">
          <Button size="mini" type="text" onClick={() => setInformation({ title: 'Insurance info', record })}>Insurance info</Button>
          <Button size="mini" type="text" onClick={() => setInformation({ title: 'Reassign', record })}>Reassign</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ListPage title="POS List" description="Manage your installed POS terminals and applications."
        testId="pos-list-page"
        actions={(
          <Space wrap>
            <Button onClick={() => setInformation({ title: 'POS Transfer History' })}>POS Transfer History</Button>
            <Button onClick={() => setInformation({ title: 'My Applications' })}>My Applications</Button>
            <Button onClick={() => setInformation({ title: 'OPay Office' })}>OPay Office</Button>
            <Button type="primary" icon={<IconPlus />} onClick={onOpenApply}>Apply for POS</Button>
          </Space>
        )}
        filters={(
          <Form form={form} layout="vertical" onSubmit={(values) => {
            setFilters(values);
            setPage((previous) => ({ ...previous, current: 1 }));
          }}>
            <Row gutter={16}>
              <Col xs={24} sm={12} xl={6}>
                <Form.Item label="Installation Date" field="installationDate">
                  <DatePicker className={styles.fullWidth} allowClear placeholder="Select date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <Form.Item label="POS Type" field="posType">
                  <Select allowClear placeholder="Please select options" options={[
                    { label: 'SmartPOS', value: 'SmartPOS' },
                    { label: 'Traditional POS', value: 'Traditional POS' },
                  ]} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <Form.Item label="Merchant" field="merchant">
                  <Select allowClear placeholder="Please select options" options={merchantOptions} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <Form.Item label="POS SN" field="posSn"><Input allowClear placeholder="POS SN" /></Form.Item>
              </Col>
            </Row>
            <div className={styles.filterActions}>
              <Space>
                <Button icon={<IconRefresh />} onClick={() => {
                  form.resetFields();
                  setFilters({});
                  setPage((previous) => ({ ...previous, current: 1 }));
                }}>Reset</Button>
                <Button type="primary" htmlType="submit" icon={<IconSearch />}>Search</Button>
              </Space>
            </div>
          </Form>
        )}
        resultSummary={(
          <>
            <Space><Text bold>POS terminals</Text><Tag>{records.length}</Tag></Space>
            <Text type="secondary">Installed terminals for the selected merchant</Text>
          </>
        )}
      >
        <Table rowKey="key" columns={columns} data={records} border={false}
          scroll={{ x: 1315 }}
          pagination={{ ...page, total: records.length, showTotal: true, sizeCanChange: true, sizeOptions: [10, 20, 50] }}
          onChange={({ current, pageSize }) => setPage((previous) => ({
            current: current ?? previous.current,
            pageSize: pageSize ?? previous.pageSize,
          }))} />
      </ListPage>
      <PosApplyModal visible={showApply} onClose={onCloseApply} />
      <Drawer title={information?.title} visible={information !== null} width={480}
        style={{ maxWidth: '100vw' }} footer={null} onCancel={() => setInformation(null)}>
        {information?.record ? (
          <Descriptions column={1} data={[
            { label: 'POS SN', value: information.record.posSn },
            { label: 'OPay Terminal ID', value: information.record.terminalId },
            { label: 'Business Name', value: information.record.businessName.join(' ') },
          ]} />
        ) : null}
        <Empty description="No additional information available" />
      </Drawer>
    </>
  );
}
