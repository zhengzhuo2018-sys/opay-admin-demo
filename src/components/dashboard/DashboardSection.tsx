import type { ReactNode } from 'react';
import { Card, Typography } from '@arco-design/web-react';
import DashboardHelp from './DashboardHelp';

const { Title } = Typography;

type DashboardSectionProps = {
  title: string;
  help?: boolean;
  extra?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function DashboardSection({
  title,
  help = false,
  extra,
  className = '',
  children,
}: DashboardSectionProps) {
  return (
    <Card className={`dashboard-section ${className}`} bordered={false}>
      <header className="dashboard-section-header">
        <Title heading={5} className="dashboard-section-title">{title}</Title>
        {help ? <DashboardHelp /> : null}
        {extra ? <div className="dashboard-section-extra">{extra}</div> : null}
      </header>
      {children}
    </Card>
  );
}
