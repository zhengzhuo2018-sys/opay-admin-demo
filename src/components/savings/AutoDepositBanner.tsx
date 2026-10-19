import { Button } from '@arco-design/web-react';
import { IconArrowRight } from '@arco-design/web-react/icon';

export default function AutoDepositBanner() {
  return (
    <section className="savings-auto-deposit" data-savings-component="auto-deposit">
      <div className="savings-auto-copy">
        <h2>Auto-deposit</h2>
        <p>Turn on Auto-deposit to automatically move funds from your Balance to OWealth</p>
        <Button type="primary">Turn on</Button>
      </div>

      <div className="savings-auto-flow" aria-label="Balance to OWealth auto-deposit flow">
        <article className="savings-flow-card">
          <strong>Balance</strong>
          <b>0%</b>
          <span>0 Interest</span>
          <span>Idle Funds</span>
        </article>
        <span className="savings-flow-arrow"><IconArrowRight /></span>
        <article className="savings-flow-card savings-flow-card-active">
          <strong>OWealth</strong>
          <b>5% p.a</b>
          <span>Earn Interest every Day</span>
          <span>Withdraw Anytime for Free</span>
        </article>
      </div>
    </section>
  );
}
