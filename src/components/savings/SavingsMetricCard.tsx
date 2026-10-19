import type { ReactNode } from 'react';

type SavingsMetricCardProps = {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  note?: string;
  tone?: 'brand' | 'plain' | 'soft';
  footer?: ReactNode;
  size?: 'default' | 'compact';
  elevation?: 'raised' | 'flat';
};

export default function SavingsMetricCard({
  label,
  value,
  icon,
  note,
  tone = 'plain',
  footer,
  size = 'default',
  elevation = 'raised',
}: SavingsMetricCardProps) {
  return (
    <article
      className={`savings-metric-card savings-metric-card-${tone} savings-metric-card-${elevation} ${size === 'compact' ? 'savings-metric-card-compact' : ''}`}
      data-savings-component="metric-card"
    >
      <div className="savings-metric-heading">
        <span>{label}</span>
        {icon ? <span className="savings-metric-icon">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      {note ? <small>{note}</small> : null}
      {footer ? <div className="savings-metric-footer">{footer}</div> : null}
    </article>
  );
}
