import { Form, Select, Typography } from '@arco-design/web-react';
import type { EditSelectOption } from './EditToolbarSelect';

const { Title } = Typography;

type EditSelectSectionProps = {
  title: string;
  headingId: string;
  fieldLabel: string;
  fieldAriaLabel?: string;
  required?: boolean;
  value: string;
  options: EditSelectOption[];
  onChange: (value: string) => void;
};

export default function EditSelectSection({
  title,
  headingId,
  fieldLabel,
  fieldAriaLabel = fieldLabel,
  required = false,
  value,
  options,
  onChange,
}: EditSelectSectionProps) {
  return (
    <section
      className="edit-form-section"
      aria-labelledby={headingId}
      data-edit-component="select-section"
    >
      <Title id={headingId} heading={6}>{title}</Title>
      <Form layout="vertical" className="edit-section-form">
        <Form.Item label={fieldLabel} required={required}>
          <Select
            value={value}
            options={options}
            onChange={onChange}
            aria-label={fieldAriaLabel}
          />
        </Form.Item>
      </Form>
    </section>
  );
}
