import { Button, Typography } from '@arco-design/web-react';

const { Text } = Typography;

type SuccessMetricCardProps = {
  label: string;
  value: string;
  detail?: boolean;
};

export default function SuccessMetricCard({ label, value, detail = false }: SuccessMetricCardProps) {
  return (
    <article className="dashboard-success-card" data-dashboard-component="success-metric-card">
      <Text>{label}</Text>
      <strong>{value}</strong>
      {detail ? <Button type="text" size="small">Details</Button> : null}
    </article>
  );
}
