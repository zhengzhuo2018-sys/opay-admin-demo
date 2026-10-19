import type { ReactNode } from 'react';
import { Card, Typography } from '@arco-design/web-react';
import './detail-page.css';

const { Text } = Typography;

type DetailPageProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  testId?: string;
};

export default function DetailPage({
  title,
  children,
  footer,
  testId = 'detail-page',
}: DetailPageProps) {
  return (
    <main className="detail-page" data-testid={testId}>
      <Card
        className="detail-page-card"
        title={<Text className="detail-page-title">{title}</Text>}
      >
        <div className="detail-page-content">{children}</div>
        {footer ? <footer className="detail-page-footer">{footer}</footer> : null}
      </Card>
    </main>
  );
}
