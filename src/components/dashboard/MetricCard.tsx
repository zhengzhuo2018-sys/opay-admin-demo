import opayLogoMark from '../../assets/figma/opay-logo-mark.svg';
import DashboardHelp from './DashboardHelp';

export type MetricTone = 'green' | 'blue' | 'purple' | 'yellow';

type MetricCardProps = {
  label: string;
  value: string;
  tone?: MetricTone;
  help?: boolean;
  variant?: 'brand' | 'compact';
};

export default function MetricCard({
  label,
  value,
  tone = 'green',
  help = false,
  variant = 'brand',
}: MetricCardProps) {
  const isCompact = variant === 'compact';

  return (
    <article
      className={`dashboard-metric ${isCompact ? 'dashboard-metric-compact' : `dashboard-metric-${tone}`}`}
      data-dashboard-component="metric-card"
      data-metric-variant={variant}
    >
      {!isCompact ? <img className="dashboard-card-illustration" src={opayLogoMark} alt="" aria-hidden="true" /> : null}
      <div className="dashboard-metric-label">
        {label}{help ? <DashboardHelp /> : null}
      </div>
      <strong>{value}</strong>
    </article>
  );
}
