import { useState, type ReactNode } from 'react';
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Divider,
  Empty,
  Grid,
  Link,
  Modal,
  Progress,
  Radio,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tooltip,
  Typography,
  type TableColumnProps,
} from '@arco-design/web-react';
import {
  IconArrowRise,
  IconCalendarClock,
  IconInfoCircle,
  IconSafe,
  IconStorage,
} from '@arco-design/web-react/icon';
import {
  accountMetrics,
  inflowDetails,
  inflowProducts,
  outflowDetails,
  outflowProducts,
  successMetrics,
} from '../../data/overview';
import styles from './OverviewPage.module.css';

const { Row, Col } = Grid;
const { Title, Text } = Typography;
const TabPane = Tabs.TabPane;

const metricIcons: Record<string, { icon: ReactNode; kind: string }> = {
  'Available Balance': { icon: <IconStorage />, kind: 'balance' },
  OWealth: { icon: <IconSafe />, kind: 'wealth' },
  "Yesterday's Interest": { icon: <IconCalendarClock />, kind: 'daily-interest' },
  'Total Interest': { icon: <IconArrowRise />, kind: 'total-interest' },
};

type SummaryItem = {
  label: string;
  amount: string;
  count: string;
};

const summaryColumns: TableColumnProps<SummaryItem>[] = [
  {
    title: 'Channel / product',
    dataIndex: 'label',
    bodyCellStyle: { wordBreak: 'normal' },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    align: 'right',
    bodyCellStyle: { whiteSpace: 'nowrap' },
    render: (amount: string) => <Text bold>{amount}</Text>,
  },
  {
    title: 'Transactions',
    dataIndex: 'count',
    align: 'right',
    render: (count: string) => count.replace(/\s+Txns$/, ''),
  },
];

function SectionHeading({
  title,
  description,
  extra,
}: {
  title: string;
  description?: string;
  extra?: ReactNode;
}) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <Title heading={6}>{title}</Title>
        {description ? <Text type="secondary">{description}</Text> : null}
      </div>
      {extra ? <div className={styles.sectionExtra}>{extra}</div> : null}
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  const appearance = metricIcons[label];
  return (
    <div className={styles.metricItem} aria-label={`${label}: ${value}`}>
      <div className={styles.metricIcon} data-kind={appearance?.kind} aria-hidden="true">
        {appearance?.icon}
      </div>
      <div className={styles.metricCopy}>
        <Text className={styles.metricTitle}>{label}</Text>
        <Text className={styles.metricValue}>{value}</Text>
      </div>
    </div>
  );
}

function SummaryTable({
  totalLabel,
  items,
  products,
}: {
  totalLabel: string;
  items: readonly SummaryItem[];
  products: readonly SummaryItem[];
}) {
  return (
    <div className={styles.summaryContent}>
      <Row gutter={24} className={styles.summaryTotals}>
        <Col span={14}>
          <Statistic title={totalLabel} value="₦ 0.00" />
        </Col>
        <Col span={10}>
          <Statistic title="Transactions" value={0} />
        </Col>
      </Row>
      <Table<SummaryItem>
        rowKey="label"
        size="small"
        border={false}
        pagination={false}
        columns={summaryColumns}
        data={[...items, ...products]}
      />
    </div>
  );
}

export default function OverviewPage() {
  const [period, setPeriod] = useState('today');
  const [outcomeDetails, setOutcomeDetails] = useState<string | null>(null);
  const successRate = successMetrics[2];

  return (
    <main className={styles.page} data-testid="overview-page">
      <Card className={styles.filterCard}>
        <div className={styles.filterBar}>
          <Radio.Group
            type="button"
            value={period}
            onChange={setPeriod}
            aria-label="Overview period"
          >
            <Radio value="today">Today</Radio>
            <Radio value="yesterday">Yesterday</Radio>
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
            <Radio value="customize">Customize</Radio>
          </Radio.Group>
          <Space wrap size="medium" className={styles.filterControls}>
            <DatePicker.RangePicker
              className={styles.dateRange}
              placeholder={['2026/10/13', '2026/10/13']}
              disabled={period !== 'customize'}
            />
            <Select
              className={styles.merchantSelect}
              defaultValue="1200048362"
              options={[
                { label: '1200048362 — MAYAKS PRESTIGE', value: '1200048362' },
              ]}
              aria-label="Select merchant"
            />
          </Space>
        </div>
        <Text type="secondary" className={styles.periodText}>
          Transaction period: 2026-10-13 00:00:00 — 2026-10-13 23:59:59
        </Text>
      </Card>

      <Card className={styles.overviewCard}>
        <Title heading={5}>Welcome back, MAYAKS</Title>
        <Divider />
        <Row className={styles.metricRow}>
          {accountMetrics.map((metric, index) => (
            <Col xs={24} sm={12} xl={6} key={metric.label}>
              <div className={styles.metricCell} data-metric-index={index}>
                <MetricItem label={metric.label} value={metric.value} />
                {index < accountMetrics.length - 1 ? (
                  <Divider type="vertical" className={styles.metricDivider} />
                ) : null}
              </div>
            </Col>
          ))}
        </Row>
        <Divider />
        <SectionHeading
          title="Transaction count"
          description="Today"
          extra={(
            <Space size="small">
              <Radio.Group type="button" defaultValue="inflow" aria-label="Transaction direction">
                <Radio value="inflow">Inflow</Radio>
                <Radio value="outflow">Outflow</Radio>
              </Radio.Group>
              <Select
                size="small"
                defaultValue="7"
                options={[{ label: 'Last 7 days', value: '7' }]}
              />
            </Space>
          )}
        />
        <div className={styles.chartEmpty}>
          <Empty description="No transaction data for this period" />
        </div>
      </Card>

      <Row gutter={16} className={styles.dashboardRow}>
        <Col xs={24} xxl={14}>
          <Card className={styles.panelCard}>
            <SectionHeading title="Transaction summary" description="Funds flow breakdown" />
            <Tabs defaultActiveTab="inflow">
              <TabPane key="inflow" title="Inflow">
                <SummaryTable
                  totalLabel="Total inflow"
                  items={inflowDetails}
                  products={inflowProducts}
                />
              </TabPane>
              <TabPane key="outflow" title="Outflow">
                <SummaryTable
                  totalLabel="Total outflow"
                  items={outflowDetails}
                  products={outflowProducts}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} xxl={10}>
          <Card className={styles.panelCard}>
            <SectionHeading
              title="Receipt and payment composition"
              description="Share of today's transaction value"
              extra={<Link>More</Link>}
            />
            <div className={styles.compositionGrid}>
              <div className={styles.compositionItem}>
                <Progress type="circle" percent={0} width={112} />
                <Text>Receipt composition</Text>
              </div>
              <div className={styles.compositionItem}>
                <Progress type="circle" percent={0} width={112} />
                <Text>Payment composition</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className={styles.dashboardRow}>
        <Col xs={24} xxl={14}>
          <Card className={styles.panelCard}>
            <SectionHeading
              title="Transaction success rate analysis"
              description="Processing outcome for the selected period"
              extra={(
                <Tooltip content="Calculated from completed transaction records">
                  <Button type="text" shape="circle" icon={<IconInfoCircle />} aria-label="Success rate help" />
                </Tooltip>
              )}
            />
            <div className={styles.successAnalysis}>
              <div className={styles.rateOverview}>
                <Progress
                  type="circle"
                  width={144}
                  strokeWidth={8}
                  percent={Number.parseFloat(successRate.value)}
                  formatText={() => (
                    <span className={styles.rateValue}>{successRate.value}</span>
                  )}
                />
                <Text bold>{successRate.label}</Text>
                <Text type="secondary">Selected period</Text>
              </div>
              <div className={styles.outcomeList}>
                {successMetrics.slice(0, 2).map((metric, index) => (
                  <div className={styles.outcomeRow} key={metric.label}>
                    <Statistic
                      title={(
                        <Space size="small">
                          <Badge status={index === 0 ? 'success' : 'error'} />
                          <Text>{metric.label}</Text>
                        </Space>
                      )}
                      value={metric.value}
                      extra={(
                        <Text type="secondary">
                          {index === 0 ? 'Completed transactions' : 'Unsuccessful transactions'}
                        </Text>
                      )}
                    />
                    <Link onClick={() => setOutcomeDetails(metric.label)}>View details</Link>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} xxl={10}>
          <Card className={styles.panelCard}>
            <SectionHeading
              title="Branch performance ranking"
              description="Top branches by transaction value"
              extra={(
                <Select
                  size="small"
                  defaultValue="top5"
                  options={[
                    { label: 'Top 5', value: 'top5' },
                    { label: 'Top 10', value: 'top10' },
                  ]}
                />
              )}
            />
            <div className={styles.panelEmpty}>
              <Empty description="No branch ranking data for this period" />
            </div>
          </Card>
        </Col>
      </Row>
      <Modal
        title={outcomeDetails}
        visible={outcomeDetails !== null}
        onCancel={() => setOutcomeDetails(null)}
        footer={(
          <Button onClick={() => setOutcomeDetails(null)}>Close</Button>
        )}
      >
        <Empty description="No transactions for the selected period" />
      </Modal>
    </main>
  );
}
