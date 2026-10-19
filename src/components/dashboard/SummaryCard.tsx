import { Typography } from '@arco-design/web-react';
import {
  IconDownload,
  IconExport,
  IconImport,
  IconRefresh,
  IconSend,
  IconSubscribeAdd,
  IconUndo,
  IconUpload,
} from '@arco-design/web-react/icon';
import DashboardHelp from './DashboardHelp';

const { Text } = Typography;

export type SummaryDirection = 'inflow' | 'outflow';
export type SummaryProductIcon =
  | 'withdrawal'
  | 'disbursement'
  | 'deposit'
  | 'repayment'
  | 'subscribe'
  | 'auto-repayment'
  | 'manual-repayment';
export type SummaryIconTone = 'wealth' | 'loan';

export type SummaryRow = {
  label: string;
  amount: string;
  count: string;
  icon?: SummaryProductIcon;
  iconTone?: SummaryIconTone;
};

type SummaryCardProps = {
  direction: SummaryDirection;
  totalAmount: string;
  totalCount: string;
  summaryAmount: string;
  summaryCount: string;
  details: readonly SummaryRow[];
  products: readonly SummaryRow[];
  testId?: string;
};

const productIcons = {
  withdrawal: IconUpload,
  disbursement: IconSend,
  deposit: IconDownload,
  repayment: IconUndo,
  subscribe: IconSubscribeAdd,
  'auto-repayment': IconRefresh,
  'manual-repayment': IconUndo,
};

function SummaryRows({ rows }: { rows: readonly SummaryRow[] }) {
  return (
    <div className="dashboard-summary-rows">
      {rows.map(({ label, amount, count, icon, iconTone }) => {
        const ProductIcon = icon ? productIcons[icon] : null;
        return (
          <div className="dashboard-summary-row" key={label}>
            {ProductIcon ? (
              <span className={`dashboard-product-icon dashboard-product-icon-${iconTone ?? 'wealth'}`}>
                <ProductIcon aria-hidden="true" />
              </span>
            ) : null}
            <Text>{label}</Text>
            <strong>{amount}</strong>
            <small>({count})</small>
          </div>
        );
      })}
    </div>
  );
}

export default function SummaryCard({
  direction,
  totalAmount,
  totalCount,
  summaryAmount,
  summaryCount,
  details,
  products,
  testId,
}: SummaryCardProps) {
  const isInflow = direction === 'inflow';
  const DirectionIcon = isInflow ? IconImport : IconExport;
  const label = isInflow ? 'Inflow' : 'Outflow';

  return (
    <article
      className={`dashboard-summary-card dashboard-summary-${direction}`}
      data-dashboard-component="summary-card"
      data-testid={testId}
    >
      <Text className="dashboard-summary-label">Total {label} <DashboardHelp /></Text>
      <div className="dashboard-summary-total"><strong>{totalAmount}</strong><small>({totalCount})</small></div>
      <div className="dashboard-summary-subtitle">
        <DirectionIcon aria-hidden="true" />
        <span>{label}</span>
        <strong>{summaryAmount}</strong>
        <small>({summaryCount})</small>
      </div>
      <SummaryRows rows={details} />
      <SummaryRows rows={products} />
    </article>
  );
}
