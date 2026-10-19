import { expect, test } from '@playwright/test';

test.describe('OPay application shell', () => {
  test('desktop baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto('/transactions');
    await expect(page.getByTestId('app-shell')).toBeVisible();
    await expect(page.getByTestId('transaction-history-page')).toBeVisible();
    await expect(page.locator('.app-brand')).toHaveCSS('background-color', 'rgb(244, 247, 250)');
    await expect(page.locator('.app-nav')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.app-header')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.app-header')).toHaveCSS('height', '52px');
    await expect(page.locator('.app-brand')).toHaveCSS('height', '52px');
    await expect(page.locator('[data-list-component="filter-field"]')).toHaveCount(9);
    await expect(page.locator('[data-list-component="data-table"]')).toHaveCount(1);
    await expect(page.locator('.list-scroll-indicator')).toHaveCount(0);
    await expect(page.locator('[data-list-component="pagination"]')).toHaveCount(1);
    await expect(page.locator('.list-page-card > .arco-card-header')).toHaveCSS('border-bottom-width', '0px');
    await expect(page.locator('.list-page-filters .arco-input-inner-wrapper').first()).toHaveCSS('background-color', 'rgb(241, 245, 248)');
    await expect(page.locator('.list-page-filters .arco-input-inner-wrapper').first()).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
    await expect(page.locator('.list-page-filters .arco-select-view').first()).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.list-page-filters .arco-select-view').first()).toHaveCSS('border-top-color', 'rgb(215, 223, 232)');
    await expect(page.locator('.list-data-table th.arco-table-col-fixed-right')).toHaveCount(1);
    await expect(page.locator('.list-data-table th', { hasText: 'Status' })).not.toHaveClass(/arco-table-col-fixed-right/);
    await expect(page.locator('.list-data-table th.list-action-column')).toHaveCSS('border-left-width', '0px');
    await expect(page.locator('.list-data-table th.list-action-column')).toHaveCSS('box-shadow', 'none');
    await expect(page.locator('.list-data-table th.list-action-column')).toHaveClass(/arco-table-col-fixed-right-first/);
    await expect(page).toHaveScreenshot('app-shell-desktop.png', {
      fullPage: true,
    });
  });

  test('mobile baseline', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/transactions');
    await expect(page.getByTestId('app-shell')).toBeVisible();
    await expect(page.getByTestId('transaction-history-page')).toBeVisible();
    await expect(page).toHaveScreenshot('app-shell-mobile.png', {
      fullPage: true,
    });
  });

  test('transaction detail route', async ({ page }) => {
    await page.goto('/transactions/260131020200004331964330');
    await expect(page.getByTestId('transaction-detail-page')).toBeVisible();
    await expect(page.getByText('Order Info')).toBeVisible();
    await expect(page.getByText('Refund Info')).toBeVisible();
  });

  test('transaction history menu route is not treated as a detail id', async ({ page }) => {
    await page.goto('/transactions/history');
    await expect(page.getByTestId('transaction-history-page')).toBeVisible();
    await expect(page.getByTestId('transaction-detail-page')).toHaveCount(0);
  });

  test('hash routes support GitHub Pages hosting', async ({ page }) => {
    await page.goto('/#/overview');
    await expect(page.getByTestId('overview-page')).toBeVisible();

    await page.evaluate(() => {
      window.location.hash = '/savings/owealth';
    });
    await expect(page).toHaveURL(/#\/savings\/owealth$/);
    await expect(page.getByTestId('savings-owealth-page')).toBeVisible();
  });

  test('implemented savings routes do not fall back to a placeholder', async ({ page }) => {
    await page.goto('/savings/owealth');
    await expect(page.getByTestId('savings-owealth-page')).toBeVisible();
    await expect(page.getByTestId('placeholder-page')).toHaveCount(0);
    await expect(page.getByTestId('transaction-history-page')).toHaveCount(0);
  });

  test('unknown routes use not-found placeholder', async ({ page }) => {
    await page.goto('/not-a-real-opay-page');
    await expect(page.getByTestId('placeholder-page')).toBeVisible();
    await expect(page.getByText('Page Not Found')).toBeVisible();
  });

  test('replicate is visually separated from business navigation', async ({ page }) => {
    await page.goto('/replicate');
    await expect(page.getByTestId('placeholder-page')).toBeVisible();
    await expect(page.locator('.app-nav-section-break')).toHaveCount(1);
    await expect(page.locator('.app-nav-section-break')).toHaveCSS('margin-top', '8px');
    await expect(page.locator('.app-nav-primary-item').first()).toHaveCSS('margin-bottom', '2px');
    await expect(page.locator('.app-nav-primary-item').first()).toHaveCSS('border-radius', '0px');
    await expect(page.locator('.app-nav .arco-menu-selected').first()).toHaveCSS('border-radius', '0px');
    await expect(page.locator('.app-nav .arco-menu-item:not(.arco-menu-selected)').first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(page.locator('.app-nav .arco-menu-inline-header').first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  });

  test('branch create route', async ({ page }) => {
    await page.goto('/branches/new');
    await expect(page.getByTestId('branch-create-page')).toBeVisible();
    await expect(page.locator('[data-edit-component="toolbar-select"]')).toHaveCount(1);
    await expect(page.locator('[data-edit-component="status-tabs"]')).toHaveCount(1);
    await expect(page.locator('[data-edit-component="tree-panel"]')).toHaveCount(1);
    await expect(page.locator('[data-edit-component="select-section"]')).toHaveCount(1);
    await expect(page.locator('[data-edit-component="footer-actions"]')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Organization' })).toBeVisible();
    await expect(page.getByLabel('Parent Branch')).toHaveText(/MAYAKS/);
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.locator('.edit-page-card > .arco-card-header')).toHaveCSS('border-bottom-width', '0px');
  });

  test('overview dashboard route', async ({ page }) => {
    await page.goto('/overview');
    await expect(page.getByTestId('overview-page')).toBeVisible();
    await expect(page.getByText('Account Overview')).toBeVisible();
    await expect(page.getByText('Transaction Summary')).toBeVisible();
    await expect(page.getByText('Branch Performance Ranking')).toBeVisible();
    await expect(page.locator('[data-dashboard-component="metric-card"]')).toHaveCount(4);
    await expect(page.locator('[data-dashboard-component="summary-card"]')).toHaveCount(2);
    await expect(page.locator('[data-dashboard-component="success-metric-card"]')).toHaveCount(3);
    await expect(page.locator('[data-dashboard-component="direction-toggle"]')).toHaveCount(2);
    await expect(page.getByTestId('overview-summary-inflow')).toHaveClass(/dashboard-summary-inflow/);
    await expect(page.getByTestId('overview-summary-outflow')).toHaveClass(/dashboard-summary-outflow/);
    await expect(page.getByTestId('overview-success-grid').locator('strong').first()).toHaveCSS('color', 'rgb(16, 33, 55)');
    await expect(page.locator('.dashboard-filter-bar')).toHaveCSS('margin-top', '-24px');
    await expect(page.locator('.dashboard-filter-bar')).toHaveCSS('margin-left', '-24px');
    await expect(page.locator('.overview-merchant-filter .arco-select-view')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('.overview-merchant-filter .arco-select-view')).toHaveCSS('border-top-color', 'rgb(215, 223, 232)');
  });

  test('overview filter bar fills wide layouts', async ({ page }) => {
    await page.setViewportSize({ width: 2400, height: 1100 });
    await page.goto('/overview');

    const fullBleedStyle = await page.locator('.dashboard-filter-bar').evaluate((element) => {
      const style = window.getComputedStyle(element);
      const spreadRadius = style.boxShadow.match(/(-?\d+(?:\.\d+)?)px\s*$/)?.[1];

      return {
        clipPath: style.clipPath,
        spreadRadius: Number(spreadRadius ?? 0),
      };
    });

    expect(fullBleedStyle.clipPath).not.toBe('none');
    expect(fullBleedStyle.spreadRadius).toBeGreaterThanOrEqual(2400);
  });

  test('POS apply complex modal route', async ({ page }) => {
    await page.goto('/pos/apply');
    await expect(page.getByTestId('pos-list-page')).toBeVisible();
    await expect(page.getByTestId('pos-apply-modal')).toBeVisible();
    await expect(page.locator('[data-complex-modal-component="section"]')).toHaveCount(3);
    await expect(page.locator('[data-pos-component="product-card"]')).toHaveCount(4);
    await expect(page.locator('[data-pos-component="quantity-stepper"]')).toHaveCount(4);
    await expect(page.locator('[data-pos-component="payment-summary"]')).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
  });

  test('card management reuses list and compact metric components', async ({ page }) => {
    await page.goto('/expense-account/cards');
    await expect(page.getByTestId('card-management-page')).toBeVisible();
    await expect(page.locator('[data-list-component="filter-field"]')).toHaveCount(6);
    await expect(page.locator('[data-dashboard-component="metric-card"]')).toHaveCount(5);
    await expect(page.locator('[data-metric-variant="compact"]')).toHaveCount(5);
    await expect(page.locator('[data-list-component="data-table"]')).toHaveCount(1);
    await expect(page.locator('[data-list-component="pagination"]')).toHaveCount(1);
    await expect(page.getByText('Showing 1 - 10 of 47')).toBeVisible();
    await expect(page.locator('.list-data-table th.arco-table-col-fixed-right')).toHaveCount(1);
    await expect(page.locator('.list-data-table th', { hasText: 'Bound to' })).not.toHaveClass(/arco-table-col-fixed-right/);
    await expect(page.locator('.list-data-table th.list-action-column')).toHaveCSS('border-left-width', '0px');
    await expect(page.locator('.list-data-table th.list-action-column')).toHaveCSS('box-shadow', 'none');
    await expect(page.locator('.list-data-table .arco-table-td.arco-table-col-fixed-right').first()).toHaveCSS('z-index', '2');
    await expect(page.locator('.list-data-table .arco-table-th.arco-table-col-fixed-right').first()).toHaveCSS('z-index', '3');
  });

  test('savings summary route composes savings metrics and trend chart', async ({ page }) => {
    await page.goto('/savings/summary');
    await expect(page.getByTestId('savings-summary-page')).toBeVisible();
    await expect(page.locator('[data-savings-component="metric-card"]')).toHaveCount(3);
    await expect(page.locator('[data-savings-component="trend-chart"]')).toHaveCount(1);
    await expect(page.getByText('Interest Trend (7 Days)')).toBeVisible();
  });

  test('savings OWealth route reuses compact table and numbered pagination', async ({ page }) => {
    await page.goto('/savings/owealth');
    await expect(page.getByTestId('savings-owealth-page')).toBeVisible();
    await expect(page.locator('[data-savings-component="auto-deposit"]')).toHaveCount(1);
    await expect(page.locator('.savings-flow-card-active')).toHaveCSS('height', '144px');
    await expect(page.locator('[data-list-density="compact"]')).toHaveCount(1);
    await expect(page.locator('[data-list-component="numbered-pagination"]')).toHaveCount(1);
    await expect(page.getByText('Total 547')).toBeVisible();
    await expect(page.locator('.savings-owealth-overview-grid .savings-metric-card')).toHaveCount(3);
    await expect(page.locator('.savings-owealth-overview-grid .savings-metric-card').first()).toHaveCSS('box-shadow', 'none');
    await expect(page.locator('.savings-owealth-overview-grid .savings-metric-card').first()).toHaveCSS('border-width', '0px');
    await expect(page.locator('.savings-detail-card .opay-inset-divider')).toHaveCount(2);
    await expect(page.locator('.savings-owealth-overview > .opay-inset-divider')).toHaveCount(1);
    await expect(page.locator('.savings-detail-card .opay-inset-divider-top')).toHaveCount(1);
  });
});
