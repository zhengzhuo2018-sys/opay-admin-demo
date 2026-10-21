import { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Grid,
  Input,
  Menu,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  type PaginationProps,
  type TableColumnProps,
} from '@arco-design/web-react';
import {
  IconDownload,
  IconDown,
  IconEye,
  IconRefresh,
  IconSearch,
  IconSettings,
} from '@arco-design/web-react/icon';
import {
  transactionRecords,
  type TransactionRecord,
  type TransactionStatus,
} from '../../data/transactions';
import styles from './TransactionHistoryPage.module.css';

const { Row, Col } = Grid;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const notice =
  'Dear customer, in line with the Federal Inland Revenue Service (FIRS) regulations, effective September 9, 2024, a fee of N50 will be applied to transfers of N10,000 or above paid into your OPay account.';

const transactionTypeOptions = [
  { label: 'Transfer', value: 'transfer' },
  { label: 'Settlement', value: 'settlement' },
  { label: 'Card payment', value: 'card-payment' },
];

const branchOptions = [
  { label: 'MAYAKS', value: 'MAYAKS' },
  { label: 'Lagos Main Branch', value: 'Lagos Main Branch' },
];

const statusOptions = [
  { label: 'Success', value: 'SUCCESS' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Reversed', value: 'REVERSED' },
];

type FilterValues = {
  transactionId?: string;
  transactionDate?: unknown;
  transactionType?: string;
  branch?: string;
  posSn?: string;
  status?: TransactionStatus;
  fundsFlow?: string;
  sessionId?: string;
  recipientAccount?: string;
};

type TransactionHistoryPageProps = {
  onOpenDetail: (transactionId: string) => void;
};

function joinLines(lines: string[]) {
  return lines.join(' ');
}

function statusColor(status: TransactionStatus) {
  if (status === 'SUCCESS') return 'green';
  if (status === 'PENDING') return 'orange';
  return 'gray';
}

function saveTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(href);
}

export default function TransactionHistoryPage({
  onOpenDetail,
}: TransactionHistoryPageProps) {
  const [form] = Form.useForm<FilterValues>();
  const [filters, setFilters] = useState<FilterValues>({});
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    pageSizeChangeResetCurrent: true,
    showTotal: true,
    sizeCanChange: true,
  });

  const columns = useMemo<TableColumnProps<TransactionRecord>[]>(
    () => [
      {
        key: 'time',
        title: 'Transaction time',
        width: 150,
        render: (_, record) => (
          <Space direction="vertical" size="mini">
            <Text>{record.date}</Text>
            <Text type="secondary">{record.time}</Text>
          </Space>
        ),
      },
      {
        key: 'id',
        title: 'Transaction ID',
        width: 170,
        render: (_, record) => (
          <Button
            className={styles.transactionLink}
            type="text"
            onClick={() => onOpenDetail(record.transactionId.join(''))}
          >
            <span>{record.transactionId[0]}</span>
            <span>{record.transactionId[1]}</span>
          </Button>
        ),
      },
      {
        key: 'sender',
        title: 'Sender name',
        width: 160,
        render: (_, record) => joinLines(record.sender),
      },
      {
        key: 'recipient',
        title: 'Recipient name',
        width: 160,
        render: (_, record) => joinLines(record.recipient),
      },
      {
        key: 'branch',
        title: 'Branch name',
        width: 170,
        render: (_, record) => joinLines(record.branch),
      },
      {
        key: 'completed',
        title: 'Completed date',
        width: 190,
        dataIndex: 'completedAt',
      },
      {
        key: 'status',
        title: 'Status',
        width: 110,
        render: (_, record) => (
          <Tag color={statusColor(record.status)}>{record.status}</Tag>
        ),
      },
      {
        key: 'action',
        title: 'Action',
        width: 96,
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
          <Button
            type="text"
            icon={<IconEye />}
            aria-label={`View transaction ${record.transactionId.join('')}`}
            onClick={() => onOpenDetail(record.transactionId.join(''))}
          />
        ),
      },
    ],
    [onOpenDetail],
  );

  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    columns.map((column) => String(column.key)),
  );

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibleColumnKeys.includes(String(column.key))),
    [columns, visibleColumnKeys],
  );

  const filteredRecords = useMemo(() => {
    const transactionId = filters.transactionId?.trim().toLowerCase();
    const recipientAccount = filters.recipientAccount?.trim().toLowerCase();

    return transactionRecords.filter((record) => {
      if (
        transactionId &&
        !record.transactionId.join('').toLowerCase().includes(transactionId)
      ) {
        return false;
      }
      if (filters.status && record.status !== filters.status) return false;
      if (filters.branch && !joinLines(record.branch).includes(filters.branch)) return false;
      if (
        recipientAccount &&
        !joinLines(record.recipient).toLowerCase().includes(recipientAccount)
      ) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const downloadColumns = () => {
    saveTextFile(
      'transaction-history-fields.json',
      JSON.stringify(visibleColumnKeys, null, 2),
      'application/json',
    );
  };

  const downloadCsv = () => {
    const header = [
      'Transaction Time',
      'Transaction ID',
      'Sender Name',
      'Recipient Name',
      'Branch Name',
      'Completed Date',
      'Status',
    ];
    const rows = filteredRecords.map((record) => [
      `${record.date} ${record.time}`,
      record.transactionId.join(''),
      joinLines(record.sender),
      joinLines(record.recipient),
      joinLines(record.branch),
      record.completedAt,
      record.status,
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(','))
      .join('\n');
    saveTextFile('transaction-history.csv', csv, 'text/csv;charset=utf-8');
  };

  const downloadMenu = (
    <Menu onClickMenuItem={downloadCsv}>
      <Menu.Item key="csv">Download CSV</Menu.Item>
      <Menu.Item key="xlsx" disabled>
        Download XLSX
      </Menu.Item>
    </Menu>
  );

  return (
    <main className={styles.page} data-testid="transaction-history-page">
      <Alert type="warning" showIcon content={notice} />

      <Card className={styles.tableCard}>
        <div className={styles.pageHeader}>
          <div>
            <Title heading={5}>Transaction history</Title>
            <Text type="secondary">Search, review and export merchant transactions.</Text>
          </div>
          <Space wrap size="small" className={styles.headerActions}>
            <Button icon={<IconSettings />} onClick={() => setSettingsVisible(true)}>
              Field settings
            </Button>
            <Button icon={<IconDownload />} onClick={downloadColumns}>
              Download field settings
            </Button>
            <Dropdown trigger="click" droplist={downloadMenu}>
              <Button type="primary" icon={<IconDownload />}>
                Download <IconDown />
              </Button>
            </Dropdown>
          </Space>
        </div>

        <Form
          form={form}
          layout="vertical"
          className={styles.filterForm}
          onSubmit={(values) => {
            setFilters(values);
            setPagination((current) => ({ ...current, current: 1 }));
          }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Transaction ID" field="transactionId">
                <Input placeholder="Transaction ID" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Date" field="transactionDate">
                <RangePicker
                  className={styles.fullWidth}
                  placeholder={['2025/02/01', '2026/02/01']}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Transaction type" field="transactionType">
                <Select
                  placeholder="Please select"
                  options={transactionTypeOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Branch" field="branch">
                <Select
                  placeholder="Please select merchant"
                  options={branchOptions}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="POS SN" field="posSn">
                <Select placeholder="Please select" options={[]} allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Status" field="status">
                <Select placeholder="Please select" options={statusOptions} allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Funds flow" field="fundsFlow">
                <Select
                  placeholder="Please select"
                  options={[
                    { label: 'Incoming', value: 'incoming' },
                    { label: 'Outgoing', value: 'outgoing' },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Session ID" field="sessionId">
                <Input placeholder="Session ID" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <Form.Item label="Recipient account" field="recipientAccount">
                <Input placeholder="Recipient account" allowClear />
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.filterActions}>
            <Space>
              <Button
                icon={<IconRefresh />}
                onClick={() => {
                  form.resetFields();
                  setFilters({});
                  setPagination((current) => ({ ...current, current: 1 }));
                }}
              >
                Reset
              </Button>
              <Button type="primary" htmlType="submit" icon={<IconSearch />}>
                Search
              </Button>
            </Space>
          </div>
        </Form>

        <div className={styles.resultToolbar}>
          <Space size="small">
            <Title heading={6}>Transaction records</Title>
            <Tag>{filteredRecords.length}</Tag>
          </Space>
          <Text type="secondary">Data updated for the selected merchant</Text>
        </div>

        <Table
          rowKey="key"
          columns={visibleColumns}
          data={filteredRecords}
          border={false}
          scroll={{ x: 1180 }}
          pagination={{
            ...pagination,
            total: 100,
            sizeOptions: [10, 20, 50],
          }}
          onChange={({ current, pageSize }) => {
            setPagination((previous) => ({
              ...previous,
              current,
              pageSize,
            }));
          }}
        />
      </Card>

      <Modal
        title="Field settings"
        visible={settingsVisible}
        onOk={() => setSettingsVisible(false)}
        onCancel={() => setSettingsVisible(false)}
      >
        <Text type="secondary">Choose the fields shown in the results table.</Text>
        <Checkbox.Group
          className={styles.columnOptions}
          direction="vertical"
          value={visibleColumnKeys}
          options={columns.map((column) => ({
            label: String(column.title),
            value: String(column.key),
          }))}
          onChange={setVisibleColumnKeys}
        />
      </Modal>
    </main>
  );
}
