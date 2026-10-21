import { expect, test } from '@playwright/test';

const desktopWidths = [1534, 1280];
const compactWidths = [768, 390];

for (const width of desktopWidths) {
  test(`Arco Pro shell is structurally stable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/overview');

    const header = page.locator('header.arco-layout-header');
    await expect(header).toBeVisible();
    await expect(header).toHaveCSS('height', '60px');
    const brand = page.getByLabel('OPay merchant portal');
    const brandText = brand.getByText('OPay', { exact: true });
    await expect(brandText).toHaveCSS('font-weight', '700');

    const brandAlignment = await brand.evaluate((node) => {
      const mark = node.querySelector('img')?.getBoundingClientRect();
      const word = node.querySelector('span')?.getBoundingClientRect();
      if (!mark || !word) return Number.POSITIVE_INFINITY;
      return Math.abs(mark.top + mark.height / 2 - (word.top + word.height / 2));
    });
    expect(brandAlignment).toBeLessThanOrEqual(1);

    const search = page.getByRole('textbox', { name: 'Search workspace' });
    await expect(search).toBeVisible();
    await expect(search.locator('..')).toHaveCSS('border-radius', '16px');

    const languageButton = page.getByRole('button', { name: 'Language' });
    await expect(languageButton).toHaveClass(/arco-btn-shape-circle/);
    await expect(languageButton).toHaveClass(/arco-btn-secondary/);

    const navigation = page.locator('aside .arco-menu').first();
    await expect(navigation).toBeVisible();
    await expect(navigation.locator('.arco-menu-item').first()).toHaveClass(
      /arco-menu-selected/,
    );

    const breadcrumb = page.locator('.arco-breadcrumb');
    await expect(breadcrumb).toContainText('Overview');
    const dashboardIcon = breadcrumb.locator('svg[aria-label="Dashboard"]');
    await expect(dashboardIcon).toBeVisible();
    await expect(dashboardIcon).toHaveCSS('font-size', '18px');

    const firstMenuIcon = navigation.locator('.arco-menu-item .arco-icon').first();
    await expect(firstMenuIcon).toHaveCSS('vertical-align', 'text-bottom');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

for (const width of compactWidths) {
  test(`Arco Pro shell uses native mobile navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/overview');

    await expect(page.locator('aside.arco-layout-sider')).toBeHidden();
    const openButton = page.getByRole('button', { name: 'Open navigation' });
    await expect(openButton).toBeVisible();
    await openButton.click();

    const drawer = page.locator('.arco-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText('Overview', { exact: true })).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('native nested menu controls business navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/overview');

  await page.locator('aside').getByText('Transactions', { exact: true }).click();
  const history = page.locator('aside').getByText('Transaction History', { exact: true });
  await expect(history).toBeVisible();
  await history.click();

  await expect(page).toHaveURL(/\/transactions\/history$/);
  await expect(page.locator('.arco-breadcrumb')).toContainText('Transaction History');
});
