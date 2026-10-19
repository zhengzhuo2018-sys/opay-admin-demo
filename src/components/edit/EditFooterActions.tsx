import { Button } from '@arco-design/web-react';

type EditFooterActionsProps = {
  secondaryLabel: string;
  primaryLabel: string;
  onSecondary: () => void;
  onPrimary?: () => void;
};

export default function EditFooterActions({
  secondaryLabel,
  primaryLabel,
  onSecondary,
  onPrimary,
}: EditFooterActionsProps) {
  return (
    <div className="edit-footer-actions" data-edit-component="footer-actions">
      <Button className="edit-action" onClick={onSecondary}>{secondaryLabel}</Button>
      <Button className="edit-action" type="primary" onClick={onPrimary}>{primaryLabel}</Button>
    </div>
  );
}
