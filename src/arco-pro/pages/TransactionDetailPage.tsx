import { Button, Card, Descriptions, Empty, Result, Space, Tag, Typography } from '@arco-design/web-react';
import { getTransactionDetail } from '../../data/transaction-detail';
import styles from '../patterns/Page.module.css';

const { Title, Text } = Typography;

export default function TransactionDetailPage({
  transactionId, onCancel,
}: { transactionId: string; onCancel: () => void }) {
  const detail = getTransactionDetail(transactionId);
  if (!detail) {
    return (
      <Card>
        <Result status="404" title="Transaction not found"
          subTitle="No record is available for this transaction ID."
          extra={<Button onClick={onCancel}>Back to transaction history</Button>} />
      </Card>
    );
  }

  return (
    <main className={styles.page} data-testid="transaction-detail-page">
      <Card className={styles.card}>
        <div className={styles.heading}>
          <div>
            <Title heading={5}>Transaction Details</Title>
            <Text type="secondary" copyable className={styles.identifier}>{transactionId}</Text>
          </div>
          <Space>
            <Text type="secondary">Transaction Status</Text>
            <Tag color={detail.record.status === 'SUCCESS' ? 'green' : detail.record.status === 'PENDING' ? 'orange' : 'gray'}>
              {detail.record.status}
            </Tag>
          </Space>
        </div>
      </Card>
      {detail.groups.map((group) => (
        <Card className={styles.card} key={group.key}>
          <Title heading={6} className={styles.sectionTitle}>{group.title}</Title>
          {group.fields.length ? (
            <Descriptions
              className={styles.detailDescriptions}
              layout="vertical"
              column={{ xs: 1, md: 2, xl: 3 }}
              tableLayout="fixed"
              colon=""
              data={group.fields.map((field) => ({
                key: field.label,
                label: field.label,
                span: field.span,
                value: field.label === 'Transaction Status' && field.value ? (
                  <Tag color={field.value === 'SUCCESS' ? 'green' : field.value === 'PENDING' ? 'orange' : 'gray'}>{field.value}</Tag>
                ) : field.value || '—',
              }))}
            />
          ) : <Empty description="No refund information" />}
        </Card>
      ))}
      <div className={styles.footer}><Button onClick={onCancel}>Cancel</Button></div>
    </main>
  );
}
