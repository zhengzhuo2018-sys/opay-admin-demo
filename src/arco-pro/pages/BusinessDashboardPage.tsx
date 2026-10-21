import {
  Alert, Avatar, Button, Card, Divider, Grid, Select, Statistic, Table, Typography,
} from '@arco-design/web-react';
import {
  IconApps, IconBranch, IconCheckCircle, IconHome, IconMobile, IconPlus,
  IconRight, IconSafe, IconSchedule, IconSound, IconSwap, IconUserAdd,
} from '@arco-design/web-react/icon';
import { businessDeals, businessSnapshot } from '../../data/page3';
import bannerIllustration from '../../assets/figma/opay-dashboard-banner-illustration.svg';
import BusinessTrendChart from './BusinessTrendChart';
import RefundPreviewModal from './RefundPreviewModal';
import styles from './BusinessDashboardPage.module.css';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

export default function BusinessDashboardPage({ onNavigate, showRefund, onCloseRefund }: {
  onNavigate: (path: string) => void; showRefund: boolean; onCloseRefund: () => void;
}) {
  const actions = [
    { label: 'Apply for POS', icon: <IconPlus />, path: '/pos/apply' },
    { label: 'Add branch', icon: <IconBranch /> },
    { label: 'Add user', icon: <IconUserAdd />, path: '/team/members/new' },
    { label: 'My transaction', icon: <IconSwap />, path: '/transactions/history' },
    { label: 'My POS', icon: <IconMobile />, path: '/pos' },
    { label: 'My branch', icon: <IconHome /> },
  ];
  return (
    <main className={styles.page} data-testid="business-dashboard-page">
      <Card className={styles.promotion} bordered={false}>
        <div className={styles.promotionContent}>
          <Title heading={6}>Enjoy Opay Business Dashboard? Take a moment to rate it!</Title>
          <Button type="primary" disabled>Comment Now</Button>
        </div>
        <img className={styles.promotionIllustration} src={bannerIllustration} alt="" aria-hidden="true" width={191} height={86} />
      </Card>
      <Alert className={styles.message} type="warning" icon={<IconSound />}
        content="Message Center: The POS review of the application has been approved, please go to the POS outlet to collect it."
        action={<Button type="text" onClick={() => onNavigate('/pos')}>View details</Button>} />
      <Row gutter={[16, 16]} align="start" data-testid="dashboard-source-columns">
        <Col xs={24} xl={13}>
          <div className={styles.column}>
            <Card title="Dashboard" className={styles.summary}>
              <div className={styles.metricGrid}>
                <div className={styles.primaryMetric}>
                  <Avatar className={styles.primaryIcon} size={40}><IconSwap /></Avatar>
                  <Statistic title="Total Transaction Value" value={businessSnapshot.transactionValue} prefix="₦ " precision={2} groupSeparator />
                  <Divider />
                  <Statistic title="Total number of transactions" value={businessSnapshot.transactionCount} groupSeparator />
                </div>
                <div className={[styles.metricTile, styles.balanceMetric].join(' ')}>
                  <Avatar className={styles.metricIcon} size={32}><IconSafe /></Avatar>
                  <Statistic title="Available Balance" value={businessSnapshot.balance} prefix="₦ " precision={2} groupSeparator />
                  <Button size="mini" type="text" disabled>Withdraw balance <IconRight /></Button>
                </div>
                <div className={[styles.metricTile, styles.settlementMetric].join(' ')}>
                  <Avatar className={styles.metricIcon} size={32}><IconSchedule /></Avatar>
                  <Statistic title="Next Settlement" value={businessSnapshot.nextSettlement} prefix="₦ " precision={2} groupSeparator />
                  <Button size="mini" type="text" onClick={() => onNavigate('/settlement/list')}>See all Settlement <IconRight /></Button>
                </div>
                <div className={[styles.metricTile, styles.posMetric].join(' ')}>
                  <Avatar className={styles.metricIcon} size={32}><IconCheckCircle /></Avatar>
                  <Statistic title="Number of active POS" value={businessSnapshot.activePos} />
                </div>
                <div className={[styles.metricTile, styles.unitsMetric].join(' ')}>
                  <Avatar className={styles.metricIcon} size={32}><IconApps /></Avatar>
                  <Statistic title="Number of POS units" value={businessSnapshot.sourcePosUnits} />
                </div>
              </div>
            </Card>
            <Card className={styles.trend} title="Dashboard"
              extra={<Select aria-label="Transaction period" value="week" options={[{ label: 'This week', value: 'week' }]} />}>
              <div className={styles.chartLegend} aria-label="Transaction series">
                <Text><span className={styles.valueKey} />Transaction Value</Text>
                <Text><span className={styles.volumeKey} />Transaction Volume</Text>
              </div>
              <BusinessTrendChart />
            </Card>
          </div>
        </Col>
        <Col xs={24} xl={11}>
          <div className={styles.column}>
            <Card title="Function display" className={styles.functions}>
              <Row gutter={[12, 12]}>
                {actions.map((action) => <Col span={8} key={action.label}>
                  <Button className={styles.quickAction} disabled={!action.path}
                    onClick={() => action.path && onNavigate(action.path)}>
                    <Avatar className={styles.quickIcon} size={48}>{action.icon}</Avatar>
                    <span>{action.label}</span>
                  </Button>
                </Col>)}
              </Row>
            </Card>
            <Card className={styles.deals} title="Deal carousel"
              extra={<Button type="text" size="small" onClick={() => onNavigate('/transactions/history')}>More</Button>}>
              <Table rowKey="key" size="default" border={false} pagination={false} scroll={{ x: 420 }} data={businessDeals}
                columns={[
                  { title: "Client's name", dataIndex: 'client', width: 110 },
                  { title: 'Transaction Type', dataIndex: 'type', width: 130 },
                  { title: 'Amount of the transaction', dataIndex: 'amount', width: 180, render: (amount: number) => `₦${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
                ]} />
            </Card>
          </div>
        </Col>
      </Row>
      <RefundPreviewModal visible={showRefund} onClose={onCloseRefund} />
    </main>
  );
}
