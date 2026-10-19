import type { ReactNode } from 'react';
import './dashboard-page.css';

type DashboardPageProps = {
  filters: ReactNode;
  period?: ReactNode;
  children: ReactNode;
  testId?: string;
};

export default function DashboardPage({
  filters,
  period,
  children,
  testId = 'dashboard-page',
}: DashboardPageProps) {
  return (
    <main className="dashboard-page" data-testid={testId}>
      <header className="dashboard-filter-bar">
        {filters}
      </header>
      {period ? <div className="dashboard-period">{period}</div> : null}
      <div className="dashboard-content">{children}</div>
    </main>
  );
}
