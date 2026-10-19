import { useState } from 'react';
import {
  Button,
  Input,
  Select,
  type TableColumnProps,
} from '@arco-design/web-react';
import { IconDownload, IconEye, IconLink } from '@arco-design/web-react/icon';
import { MetricCard } from '../components/dashboard';
import {
  ListDataTable,
  ListFilterField,
  ListPagination,
  MultiLineCell,
} from '../components/list';
import ListPage from '../components/patterns/ListPage';
import {
  cardMetrics,
  managedCardRecords,
  type ManagedCardRecord,
} from '../data/card-management';
import './card-management.css';

const branchOptions = [
  { label: 'MAYAKS aaa"PRESTIGE STITCHES LTD', value: 'mayaks' },
  { label: 'new expense branch-123', value: 'expense-123' },
];

const employeeOptions = [
  { label: 'yyy-yes730@163.com', value: 'yyy-yes730' },
  { label: 'aaaa member-yes730@163.com', value: 'aaaa-member' },
];

const statusOptions = [
  { label: 'Linked', value: 'linked' },
  { label: 'Unlinked', value: 'unlinked' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Expired', value: 'expired' },
];

const columns: TableColumnProps<ManagedCardRecord>[] = [
  { title: 'Batch No.', dataIndex: 'batchNo', width: 210 },
  {
    title: 'Card No.',
    width: 160,
    render: (_, record) => (
      <span className="card-number-cell">
        {record.cardNo}
        <IconEye aria-label="Reveal card number" />
      </span>
    ),
  },
  { title: 'Validity', dataIndex: 'validity', width: 184 },
  { title: 'Expense Account', dataIndex: 'expenseAccount', width: 148 },
  {
    title: 'Branch',
    width: 172,
    render: (_, record) => <MultiLineCell lines={record.branch} />,
  },
  {
    title: 'Bound to',
    width: 180,
    render: (_, record) => <MultiLineCell lines={record.boundTo} />,
  },
  {
    title: 'Operations',
    width: 148,
    fixed: 'right',
    className: 'list-action-column',
    align: 'center',
    render: (_, record) => (
      <div className="card-row-actions">
        {record.operations.map((operation) => (
          <Button key={operation} type="text">{operation}</Button>
        ))}
      </div>
    ),
  },
];

export default function CardManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filters = (
    <>
      <div className="card-management-filter-grid">
        <ListFilterField label="Batch No.">
          <Input placeholder="Batch No." allowClear />
        </ListFilterField>
        <ListFilterField label="Expense Account">
          <Input placeholder="Expense Account" allowClear />
        </ListFilterField>
        <ListFilterField label="Branch">
          <Select placeholder="Branch" options={branchOptions} allowClear />
        </ListFilterField>
        <ListFilterField label="Employee">
          <Select placeholder="Employee" options={employeeOptions} allowClear />
        </ListFilterField>
        <ListFilterField label="Status">
          <Select placeholder="Please select options" options={statusOptions} allowClear />
        </ListFilterField>
        <ListFilterField label="Card No.">
          <Input placeholder="Card No." allowClear />
        </ListFilterField>
      </div>

      <div className="card-management-summary-row">
        <div className="card-management-metrics" aria-label="Card quantity metrics">
          {cardMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              variant="compact"
            />
          ))}
        </div>
        <div className="card-management-actions">
          <Button type="primary" icon={<IconDownload />}>Download</Button>
          <Button type="primary" icon={<IconLink />}>Batch Link</Button>
          <Button type="outline">Failure Record</Button>
        </div>
      </div>
    </>
  );

  return (
    <ListPage
      title="Card Management"
      filters={filters}
      pagination={(
        <div className="card-management-pagination">
          <ListPagination
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
          <span>Showing 1 - 10 of 47</span>
        </div>
      )}
      testId="card-management-page"
    >
      <ListDataTable
        columns={columns}
        data={managedCardRecords}
        rowKey="key"
        scrollX={1202}
      />
    </ListPage>
  );
}
