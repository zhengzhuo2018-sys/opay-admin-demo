import { useEffect, useState } from 'react';
import {
  Alert, Avatar, Button, Card, Descriptions, Divider, Form, Grid,
  InputNumber, Modal, Radio, Result, Select, Space, Statistic, Tag, Typography,
} from '@arco-design/web-react';
import { IconMobile, IconRefresh } from '@arco-design/web-react/icon';
import { merchantOptions, pickupCityOptions, posProducts, posPurchaseAccount } from '../../data/pos';
import styles from './PosApplyModal.module.css';

const { Title, Text } = Typography;
const { Row, Col } = Grid;
type PurchaseFields = { merchant: string; pickupCity: string };
const zeroQuantities = () => Object.fromEntries(posProducts.map((item) => [item.key, 0]));
const money = (value: number) => `₦ ${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function PosApplyModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [form] = Form.useForm<PurchaseFields>();
  const [quantities, setQuantities] = useState<Record<string, number>>(zeroQuantities);
  const [insurance, setInsurance] = useState('no');
  const [quantityError, setQuantityError] = useState(false);
  const [prepared, setPrepared] = useState<PurchaseFields | null>(null);
  const [balance, setBalance] = useState(posPurchaseAccount.balance);
  const count = Object.values(quantities).reduce((total, quantity) => total + quantity, 0);
  const charge = posProducts.reduce((total, product) => (
    total + Number(product.price.replace(/[^\d.]/g, '')) * quantities[product.key]
  ), 0);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setQuantities(zeroQuantities());
      setInsurance('no');
      setQuantityError(false);
      setPrepared(null);
    }
  }, [visible, form]);

  const confirm = async () => {
    setQuantityError(count === 0);
    try {
      const values = await form.validate();
      if (count > 0 && insurance === 'no' && charge <= balance) setPrepared(values);
    } catch {
      // Native Form displays required-field errors beside their controls.
    }
  };

  return (
    <Modal
      className={styles.modal}
      title="Apply for POS"
      visible={visible}
      style={{ width: 'var(--complex-modal-width)', maxWidth: 'calc(100vw - var(--space-8))' }}
      onCancel={onClose}
      footer={prepared ? <Button type="primary" onClick={onClose}>Done</Button> : (
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={confirm} disabled={insurance === 'yes' || charge > balance}>Confirm</Button>
        </Space>
      )}
    >
      {prepared ? (
        <Result status="info" title="Application details ready"
          subTitle="Your selection has been validated. No payment has been submitted."
          extra={(
            <Descriptions column={1} data={[
              { label: 'POS quantity', value: count },
              { label: 'Pickup City', value: pickupCityOptions.find((city) => city.value === prepared.pickupCity)?.label },
              { label: 'Total', value: money(charge) },
            ]} />
          )} />
      ) : (
        <div className={styles.content} data-testid="pos-apply-modal">
          <Title heading={6} className={styles.sectionTitle}>POS Purchase</Title>
          <Form id="pos-application" form={form} layout="vertical">
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item label="Merchant" field="merchant" rules={[{ required: true, message: 'Please select a merchant' }]}>
                  <Select placeholder="Please select" options={merchantOptions} aria-label="Merchant" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Pickup City" field="pickupCity" rules={[{ required: true, message: 'Please select a pickup city' }]}>
                  <Select placeholder="Please select" options={pickupCityOptions} aria-label="Pickup City" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="POS Type" required validateStatus={quantityError ? 'error' : undefined}
              help={quantityError ? 'Select at least one POS terminal' : undefined}>
              <Row gutter={[16, 16]}>
                {posProducts.map((product) => (
                  <Col xs={24} sm={12} key={product.key}>
                    <Card size="small" className={quantities[product.key] ? styles.selectedProduct : undefined}>
                      <div className={styles.productHeading}>
                        <Avatar className={styles.productIcon} size={40}><IconMobile /></Avatar>
                        <div>
                          <Text bold>{product.name}</Text>
                          <div><Tag size="small" color={product.priceType === 'Partner Price' ? 'arcoblue' : 'gray'}>{product.priceType}</Tag></div>
                        </div>
                      </div>
                      <div className={styles.productControls}>
                        <Text bold>{money(Number(product.price.replace(/[^\d.]/g, '')))}</Text>
                        <InputNumber min={0} precision={0} mode="button" value={quantities[product.key]}
                          aria-label={`${product.name} ${product.priceType} quantity`}
                          onChange={(value) => {
                            setQuantities((previous) => ({ ...previous, [product.key]: value || 0 }));
                            setQuantityError(false);
                          }} />
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Form.Item>
          </Form>
          <Divider />
          <Title heading={6} className={styles.sectionTitle}>POS Insurance</Title>
          <div className={styles.insurance}>
            <Space size="large">
              <Text>Insurance</Text>
              <Radio.Group value={insurance} onChange={setInsurance} aria-label="POS insurance">
                <Radio value="yes">Yes</Radio><Radio value="no">No</Radio>
              </Radio.Group>
            </Space>
            <Text type="secondary">Total Insurance Premium: {insurance === 'no' ? money(0) : '—'}</Text>
          </div>
          {insurance === 'yes' ? <Alert type="info" content="An insurance premium quote is required before payment can be confirmed." /> : null}
          <Divider />
          <Title heading={6} className={styles.sectionTitle}>Payment Details</Title>
          <div className={styles.payment}>
            <Descriptions column={1} data={[
              { label: 'Available Balance', value: money(balance) },
              { label: 'POS Charge', value: money(charge) },
              { label: 'Insurance Premium', value: insurance === 'no' ? money(0) : '—' },
            ]} />
            <Statistic title="Total" value={insurance === 'no' ? money(charge) : 'Awaiting quote'} />
          </div>
          {charge > balance ? <Alert type="error" content="Insufficient account balance. Please top up before payment." /> : null}
          <Alert type="warning" content="Please ensure sufficient account balance. If insufficient, please top up before payment. Upon confirmation, the total amount will be deducted from your balance." />
          <div className={styles.account}>
            <Text type="secondary">Your OPay account: <Text copyable>{posPurchaseAccount.accountNumber}</Text></Text>
            <Button size="small" icon={<IconRefresh />} onClick={() => setBalance(posPurchaseAccount.balance)}>Refresh</Button>
          </div>
          <Text type="secondary" className={styles.agreement}>By clicking confirm, you accept the OPay POS Agreement.</Text>
        </div>
      )}
    </Modal>
  );
}
