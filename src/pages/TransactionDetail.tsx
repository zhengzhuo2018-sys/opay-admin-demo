import { Button } from '@arco-design/web-react';
import DetailPage from '../components/patterns/DetailPage';
import { transactionDetailGroups } from '../data/transaction-detail';
import './transaction-detail.css';

type TransactionDetailProps = {
  onCancel: () => void;
};

export default function TransactionDetail({ onCancel }: TransactionDetailProps) {
  return (
    <DetailPage
      title="Transaction Details"
      testId="transaction-detail-page"
      footer={(
        <Button className="transaction-detail-cancel" type="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}
    >
      <div className="transaction-detail-groups">
        {transactionDetailGroups.map((group) => (
          <section className="transaction-detail-group" key={group.key}>
            <h2 className="transaction-detail-group-title">{group.title}</h2>
            {group.fields.length > 0 ? (
              <dl className="transaction-detail-fields">
                {group.fields.map((field) => (
                  <div
                    className={`transaction-detail-field${field.span === 3 ? ' is-full-width' : ''}`}
                    key={field.label}
                  >
                    <dt>{field.label}:</dt>
                    <dd>{field.value ?? ''}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>
        ))}
      </div>
    </DetailPage>
  );
}
