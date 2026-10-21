import { useState } from 'react';
import {
  Button, Card, Descriptions, Grid, Message, Pagination,
  Space, Statistic, Table, Tabs, Tag, Typography, type TableColumnProps,
} from '@arco-design/web-react';
import { IconDownload } from '@arco-design/web-react/icon';
import { settlementCsv, settlementPageRecords, settlementPagination, settlementSnapshot, type SettlementRecord } from '../../data/page3';
import { downloadText } from '../utils/download';
import ListPage from '../patterns/ListPage';
import styles from './Page3.module.css';

const { Row, Col } = Grid;
const { Title, Text } = Typography;

export default function SettlementPage() {
  const [tab, setTab] = useState('business');
  const [page, setPage] = useState({ current: 1, pageSize: settlementPagination.pageSize });
  const snapshot = settlementSnapshot;
  const rows = tab === 'business' ? settlementPageRecords(page.current, page.pageSize) : [];
  const total = tab === 'business' ? settlementPagination.total : 0;
  const columns: TableColumnProps<SettlementRecord>[] = [
    { title: 'Settlement Date', dataIndex: 'date', width: 145 },
    { title: 'Branch Name', dataIndex: 'branch', width: 140 },
    { title: 'Transaction Period', dataIndex: 'period', width: 270 },
    { title: 'Settlement Status', dataIndex: 'status', width: 170, render: (status: string) => <Tag>{status}</Tag> },
    { title: 'Withdrawal Plan', dataIndex: 'withdrawalPlan', width: 235, sorter: (left, right) => left.withdrawalPlan.localeCompare(right.withdrawalPlan) },
    { title: 'Settlement Amount', dataIndex: 'amount', width: 165, align: 'right', render: (value: number) => value.toFixed(2) },
    { title: 'Success settlement Amount', dataIndex: 'settled', width: 195, align: 'right', render: (value: number) => value.toFixed(2) },
    { title: 'Action', fixed: 'right', width: 90, render: (_, record) => <Button type="text" size="small" aria-label={`View ${record.key}`} onClick={() => Message.info('Settlement details are not connected.')}>View</Button> },
  ];

  return (
    <main className={styles.page} data-testid="settlement-page">
      <Card>
        <div className={styles.heading}>
          <Title heading={5}>[{snapshot.businessName}] Settlement</Title>
          <Button icon={<IconDownload />} disabled={!rows.length} onClick={() => downloadText('settlements.csv', settlementCsv(rows))}>Download</Button>
        </div>
        <div className={styles.section}>
          <Descriptions title="Settlement informmation" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }} tableLayout="fixed" data={[
            { label: 'Settlement Date', value: snapshot.date },
            { label: 'Transaction Dates', value: snapshot.transactionPeriod },
            { label: 'Sweep Cycle', value: snapshot.cycle },
            { label: 'Withdrawl Plan', value: <Space wrap><Text>{snapshot.plan}</Text><Button size="small" type="text" onClick={() => Message.info('Settlement settings are not connected.')}>Modify Setting</Button></Space> },
          ]} />
        </div>
      </Card>
      <Card title="Settlement Amount">
        <Row gutter={[24, 24]}>
          {[
            { label: 'Settlement Amount', value: snapshot.amount }, { label: 'Settlement Fee', value: snapshot.fee },
            { label: 'Successfully Settled', value: snapshot.settled }, { label: 'Variance', value: snapshot.variance },
          ].map((metric) => <Col xs={24} sm={12} xl={6} key={metric.label}>
            <Statistic title={metric.label} value={metric.value} prefix="₦ " precision={2} groupSeparator />
          </Col>)}
        </Row>
        <div className={styles.section}><Space wrap><Text type="secondary">{snapshot.sourceReason}</Text>
          <Button type="text" size="small" onClick={() => Message.info('Settlement details are not connected.')}>View</Button>
        </Space></div>
      </Card>
      <ListPage className={styles.cell}>
        <Tabs activeTab={tab} onChange={(key) => { setTab(key); setPage((previous) => ({ ...previous, current: 1 })); }}>
          <Tabs.TabPane key="business" title="Business Settlement Details" />
          <Tabs.TabPane key="branches" title="Branchs Settlement Details" />
        </Tabs>
        <Table rowKey="key" border={false} columns={columns} data={rows} scroll={{ x: 1410 }} pagination={false} />
        <div className={styles.pagination}>
          <Pagination current={page.current} pageSize={page.pageSize} total={total} showTotal showJumper sizeCanChange
            sizeOptions={[7, 10, 20, 50]} onChange={(current) => setPage((previous) => ({ ...previous, current }))}
            onPageSizeChange={(pageSize) => setPage({ current: 1, pageSize })} />
        </div>
      </ListPage>
    </main>
  );
}
