type PaymentSummaryProps = {
  balance: string;
  posCharge: string;
  insurancePremium: string;
  total: string;
};

export default function PaymentSummary({
  balance,
  posCharge,
  insurancePremium,
  total,
}: PaymentSummaryProps) {
  return (
    <div className="pos-payment-summary" data-pos-component="payment-summary">
      <div className="pos-balance">Available Balance: {balance}<span aria-hidden="true" /></div>
      <dl>
        <div><dt>POS Charge:</dt><dd>{posCharge}</dd></div>
        <div><dt>Insurance Premium:</dt><dd>{insurancePremium}</dd></div>
        <div className="pos-summary-total"><dt>Total:</dt><dd>{total}</dd></div>
      </dl>
    </div>
  );
}
