import type { ReactNode } from 'react';
import { Alert, Card, Space, Typography } from '@arco-design/web-react';
import './list-page.css';

const { Text } = Typography;

type ListPageProps = {
  title: string;
  notice?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
  pagination?: ReactNode;
  testId?: string;
};

export default function ListPage({
  title,
  notice,
  actions,
  filters,
  children,
  pagination,
  testId = 'list-page',
}: ListPageProps) {
  return (
    <main className="list-page" data-testid={testId}>
      {notice ? <Alert className="list-page-notice" type="warning" content={notice} /> : null}

      <Card
        className="list-page-card"
        title={<Text className="list-page-title">{title}</Text>}
        extra={actions ? <Space wrap>{actions}</Space> : null}
      >
        {filters ? (
          <section className="list-page-filters" aria-label={`${title} filters`}>
            {filters}
          </section>
        ) : null}

        <section className="list-page-table" aria-label={`${title} results`}>
          {children}
        </section>

        {pagination ? <footer className="list-page-pagination">{pagination}</footer> : null}
      </Card>
    </main>
  );
}
