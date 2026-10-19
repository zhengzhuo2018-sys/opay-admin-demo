import type { ReactNode } from 'react';
import { Tooltip } from '@arco-design/web-react';
import { IconQuestionCircle } from '@arco-design/web-react/icon';

type ListFilterFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export default function ListFilterField({ label, hint, children }: ListFilterFieldProps) {
  return (
    <label className="list-filter-field" data-list-component="filter-field">
      <span className="list-filter-label">
        {label}
        {hint ? (
          <Tooltip content={hint}>
            <IconQuestionCircle className="list-filter-help" aria-label={hint} />
          </Tooltip>
        ) : null}
      </span>
      {children}
    </label>
  );
}
