import { Card, Empty, Typography } from '@arco-design/web-react';
import styles from './ShellStage.module.css';

export default function ShellStage({ title }: { title: string }) {
  return (
    <Card title={title} className={styles.stage} bordered={false}>
      <div className={styles.stageBody}>
        <Empty
          description={
            <Typography.Text type="secondary">
              The Arco Pro shell is ready. Business content will be migrated after this checkpoint is approved.
            </Typography.Text>
          }
        />
      </div>
    </Card>
  );
}
