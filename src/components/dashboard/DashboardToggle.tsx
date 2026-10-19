type DashboardToggleProps = {
  active?: 'IN' | 'OUT';
};

export default function DashboardToggle({ active = 'IN' }: DashboardToggleProps) {
  return (
    <div className="dashboard-toggle" role="group" aria-label="Transaction direction" data-dashboard-component="direction-toggle">
      <span className={active === 'IN' ? 'active' : ''}>IN</span>
      <span className={active === 'OUT' ? 'active' : ''}>OUT</span>
    </div>
  );
}
