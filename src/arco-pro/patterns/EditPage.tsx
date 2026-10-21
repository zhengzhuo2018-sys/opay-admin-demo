import type { ReactNode } from 'react';
import { Card, Typography } from '@arco-design/web-react';
import styles from './Page.module.css';

export default function EditPage({ title, description, actions, navigation, children, testId }: {
  title: string; description: string; actions?: ReactNode; navigation?: ReactNode;
  children: ReactNode; testId: string;
}) {
  return (
    <main className={`${styles.page} ${styles.editPage}`} data-testid={testId}>
      <Card className={styles.card}>
        <div className={styles.heading}>
          <div>
            <Typography.Title heading={5}>{title}</Typography.Title>
            <Typography.Text type="secondary">{description}</Typography.Text>
          </div>
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
        {navigation}
        {children}
      </Card>
    </main>
  );
}
