import { Empty } from '@arco-design/web-react';

export default function EmptyDashboardModule({ withAxis = false }: { withAxis?: boolean }) {
  return (
    <div className={`dashboard-empty ${withAxis ? 'dashboard-empty-chart' : ''}`} data-dashboard-component="empty-state">
      <Empty description="No data available." />
      {withAxis ? (
        <>
          <span className="dashboard-chart-axis" aria-hidden="true" />
          <div className="dashboard-chart-legend">
            <span><i className="dashboard-legend-dot dashboard-legend-value" />Transaction Value (₦)</span>
            <span><i className="dashboard-legend-dot dashboard-legend-count" />Transaction Count</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
