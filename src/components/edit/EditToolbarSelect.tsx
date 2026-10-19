import { Select } from '@arco-design/web-react';

export type EditSelectOption = {
  label: string;
  value: string;
};

type EditToolbarSelectProps = {
  ariaLabel: string;
  placeholder: string;
  options: EditSelectOption[];
};

export default function EditToolbarSelect({
  ariaLabel,
  placeholder,
  options,
}: EditToolbarSelectProps) {
  return (
    <Select
      className="edit-toolbar-select"
      placeholder={placeholder}
      options={options}
      allowClear
      aria-label={ariaLabel}
      data-edit-component="toolbar-select"
    />
  );
}
