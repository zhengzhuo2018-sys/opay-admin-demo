import type { ReactNode } from 'react';
import { Typography } from '@arco-design/web-react';

const { Title } = Typography;

type ComplexModalSectionProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function ComplexModalSection({
  title,
  icon,
  children,
  className = '',
}: ComplexModalSectionProps) {
  return (
    <section className={`complex-modal-section ${className}`} data-complex-modal-component="section">
      <Title heading={6} className="complex-modal-section-title">
        {icon ? <span className="complex-modal-section-icon">{icon}</span> : null}
        {title}
      </Title>
      {children}
    </section>
  );
}
