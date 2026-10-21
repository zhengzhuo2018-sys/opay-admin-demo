import type { ReactNode } from 'react';
import { Card, Typography } from '@arco-design/web-react';
import styles from './Page.module.css';

type ListPageProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  resultSummary?: ReactNode;
  children: ReactNode;
  testId?: string;
  className?: string;
};

// The frozen legacy ListPage imports OPay styling. Keep the same composition
// slots here while using only native Arco components and the Pro theme.
export default function ListPage({
  title, description, actions, filters, resultSummary, children, testId, className,
}: ListPageProps) {
  return (
    <main className={[styles.page, className].filter(Boolean).join(' ')} data-testid={testId}>
      <Card className={styles.card}>
        {title || actions ? <div className={styles.heading}>
          <div>
            {title ? <Typography.Title heading={5}>{title}</Typography.Title> : null}
            {description ? <Typography.Text type="secondary">{description}</Typography.Text> : null}
          </div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div> : null}
        {filters ? (
          <section className={styles.filters} aria-label={`${title ?? 'Table'} filters`}>{filters}</section>
        ) : null}
        {resultSummary ? <div className={styles.toolbar}>{resultSummary}</div> : null}
        <section aria-label={`${title ?? 'Table'} results`}>{children}</section>
      </Card>
    </main>
  );
}
