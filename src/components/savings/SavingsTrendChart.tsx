const chartData = [
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 0 },
  { day: 'Fri', value: 0 },
  { day: 'Sat', value: 38 },
  { day: 'Sun', value: 0 },
  { day: 'Mon', value: 68 },
  { day: 'Tue', value: 0 },
];

export default function SavingsTrendChart() {
  return (
    <section className="savings-trend-card" data-savings-component="trend-chart">
      <header>
        <h2>Interest Trend (7 Days)</h2>
        <span>Wed - Tue</span>
      </header>
      <div className="savings-trend-plot" aria-label="Interest trend for the last seven days">
        {chartData.map((item) => (
          <div className="savings-trend-column" key={item.day}>
            <div className="savings-trend-value">
              {item.value ? (
                <span className="savings-trend-bar" style={{ height: `${item.value}%` }} />
              ) : null}
              {item.day === 'Tue' ? <span className="savings-trend-amount">₦0.00</span> : null}
            </div>
            <span>{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
