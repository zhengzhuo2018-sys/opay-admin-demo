import { useState } from 'react';
import { Button, DatePicker, Space, type TableColumnProps } from '@arco-design/web-react';
import { IconDownload, IconInfoCircleFill } from '@arco-design/web-react/icon';
import { ListDataTable, NumberedPagination } from '../components/list';
import {
  AutoDepositBanner,
  SavingsFooter,
  SavingsMetricCard,
} from '../components/savings';
import { savingsLedgerRows, type SavingsLedgerRow } from '../data/savings';
import './savings-pages.css';

const columns: TableColumnProps<SavingsLedgerRow>[] = [
  { title: 'Transaction Date', dataIndex: 'transactionDate', width: 210 },
  { title: 'Transaction Type', dataIndex: 'transactionType', width: 180 },
  { title: 'Balance Before(₦)', dataIndex: 'balanceBefore', width: 190 },
  { title: 'Inflow(₦)', dataIndex: 'inflow', width: 160 },
  { title: 'Outflow(₦)', dataIndex: 'outflow', width: 160 },
  { title: 'Balance After(₦)', dataIndex: 'balanceAfter', width: 190 },
];

export default function SavingsOwealth() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  return (
    <main className="savings-page savings-owealth-page" data-testid="savings-owealth-page">
      <section className="savings-owealth-overview">
        <h1 className="opay-inset-divider">OWealth</h1>
        <div className="savings-owealth-overview-grid">
          <SavingsMetricCard
            label={(
              <span className="savings-rate-label">
                Total Amount <b>5% p.a</b>
              </span>
            )}
            value="₦326,904.30"
            tone="soft"
            elevation="flat"
            footer={(
              <Space>
                <Button type="primary">Deposit</Button>
                <Button type="outline">Withdraw</Button>
              </Space>
            )}
          />
          <div className="savings-owealth-interest-stack">
            <SavingsMetricCard
              label={<span>Yesterday's interest <IconInfoCircleFill /></span>}
              value="₦0.00"
              tone="soft"
              size="compact"
              elevation="flat"
            />
            <SavingsMetricCard
              label="Total Interest"
              value="₦20,058.30"
              tone="soft"
              size="compact"
              elevation="flat"
            />
          </div>
        </div>
      </section>

      <AutoDepositBanner />

      <section className="savings-detail-card">
        <header className="opay-inset-divider"><h2>Detail</h2></header>
        <div className="savings-detail-toolbar opay-inset-divider">
          <DatePicker.RangePicker
            placeholder={['Start date', 'End date']}
            separator="To"
            aria-label="Savings detail date range"
          />
          <Button type="primary" icon={<IconDownload />}>Download</Button>
        </div>
        <div className="savings-detail-table">
          <ListDataTable
            columns={columns}
            data={savingsLedgerRows}
            rowKey="key"
            scrollX={1090}
            density="compact"
          />
        </div>
        <footer className="savings-detail-pagination opay-inset-divider-top">
          <NumberedPagination
            currentPage={currentPage}
            pageSize={pageSize}
            total={547}
            onPageChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
          />
        </footer>
      </section>

      <SavingsFooter />
    </main>
  );
}
