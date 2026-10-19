import type { ReactNode } from 'react';
import { Card, Typography } from '@arco-design/web-react';
import './edit-page.css';

const { Text } = Typography;

type EditPageProps = {
  title: string;
  actions?: ReactNode;
  navigation?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: 'split' | 'centered';
  testId?: string;
};

export default function EditPage({
  title,
  actions,
  navigation,
  aside,
  children,
  footer,
  variant = 'split',
  testId = 'edit-page',
}: EditPageProps) {
  return (
    <main className={`edit-page edit-page-${variant}`} data-testid={testId}>
      <Card
        className="edit-page-card"
        title={<Text className="edit-page-title">{title}</Text>}
        extra={actions}
      >
        {navigation ? <nav className="edit-page-navigation">{navigation}</nav> : null}
        <div className="edit-page-workspace">
          {aside ? <aside className="edit-page-aside">{aside}</aside> : null}
          <section className="edit-page-form">{children}</section>
        </div>
        {footer ? <footer className="edit-page-footer">{footer}</footer> : null}
      </Card>
    </main>
  );
}
