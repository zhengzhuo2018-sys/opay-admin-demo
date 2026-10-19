import { useState } from 'react';
import { Button, DatePicker, Select, Space } from '@arco-design/web-react';
import {
  DashboardHelp,
  DashboardSection,
  DashboardToggle,
  EmptyDashboardModule,
  MetricCard,
  SuccessMetricCard,
  SummaryCard,
} from '../components/dashboard';
import DashboardPage from '../components/patterns/DashboardPage';
import {
  accountMetrics,
  inflowDetails,
  inflowProducts,
  outflowDetails,
  outflowProducts,
  successMetrics,
} from '../data/overview';
import './overview.css';

export default function Overview() {
  const [period, setPeriod] = useState('today');

  const filters = (
    <div className="overview-filters">
      <div className="overview-period-tabs" role="tablist" aria-label="Overview period">
        {[
          ['today', 'Today'],
          ['yesterday', 'Yesterday'],
          ['weekly', 'Weekly'],
          ['monthly', 'Monthly'],
          ['customize', 'Customize'],
        ].map(([value, label]) => (
          <Button
            key={value}
            className={period === value ? 'overview-period-active' : ''}
            type="text"
            role="tab"
            aria-selected={period === value}
            onClick={() => setPeriod(value)}
          >
            {label}
          </Button>
        ))}
      </div>
      <DatePicker.RangePicker
        className="overview-date-range"
        placeholder={['2026/10/13', '2026/10/13']}
        disabled={period !== 'customize'}
      />
      <Select
        className="overview-merchant-filter"
        defaultValue="1200048362"
        options={[{ label: '1200048362–MAYAKS...', value: '1200048362' }]}
        aria-label="Select merchant"
      />
      <Button className="overview-old-version" type="text">Old Version &gt;</Button>
    </div>
  );

  return (
    <DashboardPage
      filters={filters}
      period="Transaction Period: 2026–10–13 00:00:00 – 2026–10–13 23:59:59"
      testId="overview-page"
    >
      <DashboardSection title="Account Overview">
        <div className="overview-metric-grid">
          {accountMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </div>
      </DashboardSection>

      <DashboardSection title="Transaction Summary">
        <div className="overview-summary-grid">
          <SummaryCard
            direction="inflow"
            totalAmount="₦ 0.00"
            totalCount="0 Txns"
            summaryAmount="₦ 0.00"
            summaryCount="0 Txns"
            details={inflowDetails}
            products={inflowProducts}
            testId="overview-summary-inflow"
          />
          <SummaryCard
            direction="outflow"
            totalAmount="₦ 0.00"
            totalCount="0 Txns"
            summaryAmount="₦ 0.00"
            summaryCount="0 Txns"
            details={outflowDetails}
            products={outflowProducts}
            testId="overview-summary-outflow"
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title="Transaction Count"
        help
        className="overview-chart-section"
        extra={<Select size="small" defaultValue="7" options={[{ label: 'Last 7 Days', value: '7' }]} />}
      >
        <DashboardToggle />
        <EmptyDashboardModule withAxis />
      </DashboardSection>

      <DashboardSection
        title="Receipt and Payment Composition"
        extra={<Button type="text" size="small">More</Button>}
        className="overview-composition-section"
      >
        <div className="overview-composition-grid">
          <div><h3>Receipt Composition <DashboardHelp /></h3><EmptyDashboardModule /></div>
          <div><h3>Payment Composition <DashboardHelp /></h3><EmptyDashboardModule /></div>
        </div>
      </DashboardSection>

      <DashboardSection title="Txn Success Rate Analysis" help>
        <div className="overview-success-grid" data-testid="overview-success-grid">
          {successMetrics.map((metric) => <SuccessMetricCard key={metric.label} {...metric} />)}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Branch Performance Ranking"
        help
        className="overview-ranking-section"
        extra={(
          <Space size="mini">
            <Button type="outline" size="small">Top 5</Button>
            <Button size="small">Top 10</Button>
          </Space>
        )}
      >
        <DashboardToggle />
        <h3 className="overview-ranking-title">Ranking List</h3>
        <EmptyDashboardModule />
      </DashboardSection>
    </DashboardPage>
  );
}
