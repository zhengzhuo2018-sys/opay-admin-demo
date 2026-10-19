import type { ReactNode } from 'react';

type ComplexModalActionsProps = {
  children: ReactNode;
  note?: ReactNode;
};

export default function ComplexModalActions({ children, note }: ComplexModalActionsProps) {
  return (
    <footer className="complex-modal-actions" data-complex-modal-component="actions">
      <div className="complex-modal-action-buttons">{children}</div>
      {note ? <div className="complex-modal-action-note">{note}</div> : null}
    </footer>
  );
}
