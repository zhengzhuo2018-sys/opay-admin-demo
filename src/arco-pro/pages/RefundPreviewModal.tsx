import { useEffect } from 'react';
import { Button, Form, Grid, Input, InputNumber, Message, Modal, Space, Typography } from '@arco-design/web-react';
import { refundExample, validRefundAmount, validRefundDraft, type RefundDraft } from '../../data/page3';
import styles from './Page3.module.css';

const { Row, Col } = Grid;

export default function RefundPreviewModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [form] = Form.useForm<RefundDraft>();
  useEffect(() => { if (visible) form.resetFields(); }, [visible, form]);
  const close = () => { form.clearFields(); onClose(); };
  const required = (label: string) => [
    { required: true, message: `Enter ${label.toLowerCase()}.` },
    { validator: (value: string | undefined, callback: (message?: string) => void) => callback(value && !value.trim() ? `Enter ${label.toLowerCase()}.` : undefined) },
  ];
  return (
    <Modal className={styles.modal} title="Settlement Amount" visible={visible}
      style={{ maxWidth: 'calc(100vw - 32px)', width: 'var(--pro-refund-modal-width)' }} unmountOnExit onCancel={close}
      footer={<Space><Button onClick={close}>Cancel</Button><Button type="primary" onClick={() => form.submit()}>Refoud</Button></Space>}>
      <Form id="refund-preview" form={form} layout="vertical" initialValues={{ amount: refundExample.amount }} onSubmit={(values) => {
        // No financial request is issued. A missing integration is reported only on action.
        if (validRefundDraft(values)) Message.warning('Refund service is not connected.');
      }}>
        <Row gutter={16}>
          <Col xs={24} md={12}><Form.Item label="Refund Amount" field="amount" rules={[
            { validator: (value, callback) => callback(!validRefundAmount(value) ? 'Enter a positive amount with at most two decimal places.' : undefined) },
          ]}><InputNumber className={styles.fullWidth} prefix="₦" precision={2} /></Form.Item></Col>
          <Col xs={24} md={12}><Form.Item label="Transaction Fee"><Input readOnly value={`₦ ${refundExample.fee.toFixed(2)}`} aria-label="Transaction Fee" /></Form.Item></Col>
        </Row>
        <Form.Item label="Refund Reason" field="reason" rules={required('Refund Reason')}><Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} /></Form.Item>
        <Typography.Title heading={6}>Cardholder Bank Details</Typography.Title>
        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="Bank Name" field="bankName" rules={required('Bank Name')}><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Bank Branch" field="bankBranch" rules={required('Bank Branch')}><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Bank Account Number" field="accountNumber" rules={required('Bank Account Number')}><Input /></Form.Item></Col>
          <Col xs={24} md={12}><Form.Item label="Bank Account Name" field="accountName" rules={required('Bank Account Name')}><Input /></Form.Item></Col>
        </Row>
        <Typography.Title heading={6}>Cardholder</Typography.Title>
        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="First name" field="firstName" rules={required('First name')}><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Middle name" field="middleName"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Last name" field="lastName" rules={required('Last name')}><Input /></Form.Item></Col>
          <Col xs={24} md={12}><Form.Item label="Mobile number" field="mobile" rules={[
            ...required('Mobile number'), { validator: (value, callback) => callback(value && !/^\+?\d{7,15}$/.test(value.replace(/[\s()-]/g, '')) ? 'Enter a valid phone number.' : undefined) },
          ]}><Input /></Form.Item></Col>
          <Col xs={24} md={12}><Form.Item label="Email address" field="email" rules={[
            { validator: (value, callback) => callback(value?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? 'Enter a valid email address.' : undefined) },
          ]}><Input /></Form.Item></Col>
        </Row>
      </Form>
    </Modal>
  );
}
