import { useState } from 'react';
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Select,
  type TableColumnProps,
} from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import {
  ListDataTable,
  ListFilterField,
  ListPagination,
  ListStatus,
  MultiLineCell,
  type ListStatusTone,
} from '../components/list';
import ListPage from '../components/patterns/ListPage';
import {
  transactionRecords,
  type TransactionRecord,
  type TransactionStatus,
} from '../data/transactions';
import './transaction-history.css';

const { RangePicker } = DatePicker;

const notice = 'Dear customer, in line with the Federal Inland Revenue Service (FIRS) regulations, effective September 9, 2024, a fee of N50 will be applied to transfers of N10,000 or above paid into your OPay account.';

const transactionTypeOptions = [
  { label: 'Transfer', value: 'transfer' },
  { label: 'Settlement', value: 'settlement' },
  { label: 'Card payment', value: 'card-payment' },
];

const branchOptions = [
  { label: 'MAYAKS', value: 'mayaks' },
  { label: 'Lagos Main Branch', value: 'lagos-main' },
];

const statusOptions = [
  { label: 'Success', value: 'success' },
  { label: 'Pending', value: 'pending' },
  { label: 'Reversed', value: 'reversed' },
];

const statusTones: Record<TransactionStatus, ListStatusTone> = {
  REVERSED: 'neutral',
  SUCCESS: 'success',
  PENDING: 'warning',
};

function createColumns(onOpenDetail: (transactionId: string) => void): TableColumnProps<TransactionRecord>[] {
  return [
    {
      title: 'Transaction Time',
      width: 148,
      render: (_, record) => <MultiLineCell lines={[record.date, record.time]} />,
    },
    {
      title: 'Transaction ID',
      width: 146,
      render: (_, record) => {
        const value = <MultiLineCell className="transaction-id" lines={record.transactionId} />;
        return record.key === '4' ? (
          <Button
            className="transaction-id-link"
            type="text"
            onClick={() => onOpenDetail(record.transactionId.join(''))}
          >
            {value}
          </Button>
        ) : value;
      },
    },
    {
      title: 'Sender Name',
      width: 136,
      render: (_, record) => <MultiLineCell lines={record.sender} />,
    },
    {
      title: 'Recipient Name',
      width: 136,
      render: (_, record) => <MultiLineCell lines={record.recipient} />,
    },
    {
      title: 'Branch Name',
      width: 136,
      render: (_, record) => <MultiLineCell lines={record.branch} />,
    },
    {
      title: 'Trxn Completed Date',
      width: 174,
      dataIndex: 'completedAt',
    },
    {
      title: 'Status',
      width: 104,
      render: (_, record) => <ListStatus tone={statusTones[record.status]}>{record.status}</ListStatus>,
    },
    {
      title: 'Action',
      width: 88,
      fixed: 'right',
      className: 'list-action-column',
      align: 'center',
      render: () => null,
    },
  ];
}

type TransactionHistoryProps = {
  onOpenDetail: (transactionId: string) => void;
};

export default function TransactionHistory({ onOpenDetail }: TransactionHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const actions = (
    <>
      <Button type="primary">Field settings</Button>
      <Button type="primary">Download Field settings</Button>
      <Dropdown
        trigger="click"
        droplist={(
          <Menu>
            <Menu.Item key="csv">Download CSV</Menu.Item>
            <Menu.Item key="xlsx">Download XLSX</Menu.Item>
          </Menu>
        )}
      >
        <Button type="primary">Download <IconDown /></Button>
      </Dropdown>
    </>
  );

  const filters = (
    <div className="transaction-filter-grid">
      <ListFilterField label="Transaction ID">
        <Input placeholder="Transaction ID" allowClear />
      </ListFilterField>
      <ListFilterField label="Date">
        <RangePicker placeholder={['2025/02/01', '2026/02/01']} allowClear />
      </ListFilterField>
      <ListFilterField label="Transaction Type">
        <Select placeholder="Please select options" options={transactionTypeOptions} allowClear />
      </ListFilterField>
      <ListFilterField label="Branch">
        <Select placeholder="Please select merchant" options={branchOptions} allowClear />
      </ListFilterField>
      <ListFilterField label="POS SN">
        <Select placeholder="Please select options" options={[]} allowClear />
      </ListFilterField>
      <ListFilterField label="Status">
        <Select placeholder="Please select options" options={statusOptions} allowClear />
      </ListFilterField>
      <ListFilterField label="Funds Flow">
        <Select
          placeholder="Please select options"
          options={[
            { label: 'Incoming', value: 'incoming' },
            { label: 'Outgoing', value: 'outgoing' },
          ]}
          allowClear
        />
      </ListFilterField>
      <ListFilterField label="Session ID">
        <Input placeholder="Session ID" allowClear />
      </ListFilterField>
      <ListFilterField label="Recipient Account" hint="The account that received the transaction.">
        <Input placeholder="Recipient Account" allowClear />
      </ListFilterField>
    </div>
  );

  return (
    <ListPage
      title="Transaction History"
      notice={notice}
      actions={actions}
      filters={filters}
      pagination={(
        <ListPagination
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
      testId="transaction-history-page"
    >
      <ListDataTable
        columns={createColumns(onOpenDetail)}
        data={transactionRecords}
        rowKey="key"
        scrollX={1068}
      />
    </ListPage>
  );
}
