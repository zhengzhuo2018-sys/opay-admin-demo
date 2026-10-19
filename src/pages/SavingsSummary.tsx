import { Button } from '@arco-design/web-react';
import { IconArrowRise, IconPlus, IconTrophy } from '@arco-design/web-react/icon';
import {
  SavingsFooter,
  SavingsMetricCard,
  SavingsTrendChart,
} from '../components/savings';
import './savings-pages.css';

export default function SavingsSummary() {
  return (
    <main className="savings-page" data-testid="savings-summary-page">
      <header className="savings-page-header">
        <h1>Savings Summary</h1>
        <Button type="primary" icon={<IconPlus />}>ADD Branch Savings</Button>
      </header>

      <section className="savings-summary-grid" aria-label="Savings metrics">
        <SavingsMetricCard
          label="Total Assets (Savings)"
          value="₦326,904.3"
          tone="brand"
          footer={(
            <>
              <span>OWealth: ₦326,904.3</span>
              <span>Fixed: ₦0.00</span>
            </>
          )}
        />
        <SavingsMetricCard
          label="Yesterday's Interest"
          value="+ ₦0"
          icon={<IconArrowRise />}
          note="--  vs last Tuesday"
        />
        <SavingsMetricCard
          label="Total Interest Earned"
          value="₦20,058.3"
          icon={<IconTrophy />}
        />
      </section>

      <SavingsTrendChart />
      <SavingsFooter />
    </main>
  );
}
