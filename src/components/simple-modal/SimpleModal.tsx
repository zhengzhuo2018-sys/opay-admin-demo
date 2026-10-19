import type { ReactNode } from 'react';
import { Modal } from '@arco-design/web-react';

type SimpleModalProps = {
  title: string;
  visible: boolean;
  children: ReactNode;
  footer: ReactNode;
  onClose: () => void;
  testId?: string;
};

export default function SimpleModal({
  title,
  visible,
  children,
  footer,
  onClose,
  testId = 'simple-modal',
}: SimpleModalProps) {
  return (
    <Modal
      className="simple-modal"
      wrapClassName="simple-modal-wrap"
      title={title}
      visible={visible}
      footer={null}
      maskClosable={false}
      escToExit
      unmountOnExit={false}
      onCancel={onClose}
      style={{ width: 'var(--simple-modal-width)' }}
    >
      <div className="simple-modal-body" data-testid={testId} data-simple-modal-component="shell">
        <div className="simple-modal-content">{children}</div>
        <footer className="simple-modal-footer">{footer}</footer>
      </div>
    </Modal>
  );
}
