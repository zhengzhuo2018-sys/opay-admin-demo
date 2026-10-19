import { Button } from '@arco-design/web-react';
import { IconMinus, IconPlus } from '@arco-design/web-react/icon';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  return (
    <div className="pos-quantity-stepper" data-pos-component="quantity-stepper">
      <Button
        icon={<IconMinus />}
        disabled={value === 0}
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(0, value - 1))}
      />
      <span>{value}</span>
      <Button
        icon={<IconPlus />}
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      />
    </div>
  );
}
