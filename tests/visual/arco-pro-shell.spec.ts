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

    await expect(page.locator('.arco-breadcrumb')).toContainText('Overview');

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
