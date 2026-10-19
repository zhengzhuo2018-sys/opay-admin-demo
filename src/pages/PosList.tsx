import { useState } from 'react';
import {
  Button,
  DatePicker,
  Input,
  Select,
  type TableColumnProps,
} from '@arco-design/web-react';
import {
  ListDataTable,
  ListFilterField,
  ListPagination,
  MultiLineCell,
} from '../components/list';
import ListPage from '../components/patterns/ListPage';
import { PosApplyModal } from '../components/pos';
import { posRecords, type PosRecord } from '../data/pos';
import './pos-list.css';

const columns: TableColumnProps<PosRecord>[] = [
  { title: 'Installation Date', dataIndex: 'installationDate', width: 164 },
  {
    title: 'Store Code',
    width: 128,
    render: (_, record) => <span className="pos-store-code">{record.storeCode}</span>,
  },
  {
    title: 'Business Name',
    width: 152,
    render: (_, record) => <MultiLineCell lines={record.businessName} />,
  },
  { title: 'POS SN', dataIndex: 'posSn', width: 128 },
  { title: 'POS Type', dataIndex: 'posType', width: 124 },
  { title: 'OPay Terminal ID', dataIndex: 'terminalId', width: 148 },
  {
    title: 'Transfer Number',
    dataIndex: 'transferNumber',
    width: 148,
  },
  {
    title: 'Actions',
    width: 164,
    fixed: 'right',
    className: 'list-action-column',
    align: 'center',
    render: () => (
      <div className="pos-row-actions">
        <Button type="text">Buy InsuranceInfo</Button>
        <Button type="text">Reassign</Button>
      </div>
    ),
  },
];

type PosListProps = {
  showApplyModal: boolean;
  onOpenApply: () => void;
  onCloseApply: () => void;
};

export default function PosList({ showApplyModal, onOpenApply, onCloseApply }: PosListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const actions = (
    <>
      <Button type="primary">POS Transfer History</Button>
      <Button type="primary" onClick={onOpenApply}>Apply for POS</Button>
      <Button type="primary">My Applications</Button>
      <Button type="primary">OPay Office</Button>
    </>
  );

  const filters = (
    <div className="pos-filter-grid">
      <ListFilterField label="Installation Date">
        <DatePicker placeholder="" aria-label="Installation Date" />
      </ListFilterField>
      <ListFilterField label="POS Type">
        <Select
          placeholder="Please select options"
          options={[
            { label: 'SmartPOS', value: 'smart' },
            { label: 'Traditional POS', value: 'traditional' },
          ]}
          allowClear
        />
      </ListFilterField>
      <ListFilterField label="Merchant">
        <Select
          placeholder="Please select options"
          options={[{ label: 'MAYAKS', value: 'mayaks' }]}
          allowClear
        />
      </ListFilterField>
      <ListFilterField label="POS SN">
        <Input placeholder="POS SN" allowClear />
      </ListFilterField>
    </div>
  );

  return (
    <>
      <ListPage
        title="POS List"
        actions={actions}
        filters={filters}
        pagination={(
          <div className="pos-pagination-row">
            <ListPagination
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
            <span className="pos-result-count">Showing 1 - 10 of 1</span>
          </div>
        )}
        testId="pos-list-page"
      >
        <ListDataTable columns={columns} data={posRecords} rowKey="key" scrollX={1156} />
      </ListPage>
      <PosApplyModal visible={showApplyModal} onClose={onCloseApply} />
    </>
  );
}
