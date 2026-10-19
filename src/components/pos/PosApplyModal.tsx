import { useMemo, useState } from 'react';
import { Button, Form, Radio, Select, Typography } from '@arco-design/web-react';
import {
  IconExclamationCircle,
  IconRefresh,
  IconSafe,
  IconStorage,
} from '@arco-design/web-react/icon';
import {
  ComplexModal,
  ComplexModalActions,
  ComplexModalSection,
} from '../complex-modal';
import {
  merchantOptions,
  pickupCityOptions,
  posProducts,
} from '../../data/pos';
import PaymentSummary from './PaymentSummary';
import PosProductCard from './PosProductCard';
import './pos-apply-modal.css';

const { Text } = Typography;

type PosApplyModalProps = {
  visible: boolean;
  onClose: () => void;
};

const numericPrice = (price: string) => Number(price.replace(/[^0-9.]/g, ''));

export default function PosApplyModal({ visible, onClose }: PosApplyModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(posProducts.map((product) => [product.key, 0])),
  );
  const [insurance, setInsurance] = useState('no');

  const posCharge = useMemo(
    () => posProducts.reduce(
      (total, product) => total + numericPrice(product.price) * quantities[product.key],
      0,
    ),
    [quantities],
  );
  const formattedCharge = `₦${posCharge.toFixed(2)}`;

  return (
    <ComplexModal
      title="Apply for POS"
      visible={visible}
      onClose={onClose}
      testId="pos-apply-modal"
    >
      <ComplexModalSection title="POS Purchase" icon={<IconStorage />}>
        <Form className="pos-apply-form" layout="vertical">
          <Form.Item label="Merchant" required>
            <Select
              className="pos-apply-select"
              placeholder="Please select"
              options={merchantOptions}
              aria-label="Merchant"
            />
          </Form.Item>
          <Form.Item label="POS Type" required>
            <div className="pos-product-grid">
              {posProducts.map((product) => (
                <PosProductCard
                  key={product.key}
                  product={product}
                  quantity={quantities[product.key]}
                  onQuantityChange={(value) => setQuantities((current) => ({
                    ...current,
                    [product.key]: value,
                  }))}
                />
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Pickup City" required>
            <Select
              className="pos-apply-select"
              placeholder="Please select"
              options={pickupCityOptions}
              aria-label="Pickup City"
            />
          </Form.Item>
        </Form>
      </ComplexModalSection>

      <ComplexModalSection title="POS Insurance" icon={<IconSafe />}>
        <div className="pos-insurance-field">
          <Text className="pos-field-label">Insurance:</Text>
          <Radio.Group value={insurance} onChange={setInsurance}>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </div>
        <div className="pos-insurance-premium">
          <Text className="pos-field-label">Total Insurance Premium:</Text>
          <strong>₦0.00</strong>
        </div>
      </ComplexModalSection>

      <ComplexModalSection title="Payment Details" icon={<IconStorage />}>
        <PaymentSummary
          balance="₦ 326,904.30"
          posCharge={formattedCharge}
          insurancePremium="₦0.00"
          total={formattedCharge}
        />
      </ComplexModalSection>

      <div className="pos-payment-guidance">
        <p className="pos-balance-warning">
          <IconExclamationCircle />
          Please ensure sufficient account balance. If insufficient, please top up before payment. Upon confirmation, the total amount will be deducted from your balance.
        </p>
        <p className="pos-account-number">Your OPay account: <strong>9552579338.</strong></p>
        <p>
          If the top-up is already completed, you may click to refresh the balance.
          <Button className="pos-refresh-button" type="outline" size="small" icon={<IconRefresh />}>Refresh</Button>
        </p>
      </div>

      <ComplexModalActions
        note={<>By clicking confirm, you accept the <a href="#pos-agreement">OPay POS Agreement</a></>}
      >
        <Button className="pos-modal-action" type="outline" onClick={onClose}>Cancel</Button>
        <Button className="pos-modal-action" type="primary">Confirm</Button>
      </ComplexModalActions>
    </ComplexModal>
  );
}
