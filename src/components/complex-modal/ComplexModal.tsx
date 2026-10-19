import type { ReactNode } from 'react';
import { Modal } from '@arco-design/web-react';

type ComplexModalProps = {
  title: string;
  visible: boolean;
  children: ReactNode;
  onClose: () => void;
  testId?: string;
};

export default function ComplexModal({
  title,
  visible,
  children,
  onClose,
  testId = 'complex-modal',
}: ComplexModalProps) {
  return (
    <Modal
      className="complex-modal"
      wrapClassName="complex-modal-wrap"
      title={title}
      visible={visible}
      footer={null}
      maskClosable={false}
      escToExit
      unmountOnExit={false}
      onCancel={onClose}
      style={{ width: 'var(--complex-modal-width)' }}
    >
      <div className="complex-modal-content" data-testid={testId} data-complex-modal-component="shell">
        {children}
      </div>
    </Modal>
  );
}
