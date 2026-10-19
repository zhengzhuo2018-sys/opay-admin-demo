import { expect, test } from '@playwright/test';

type CompletedPage = {
  name: string;
  path: string;
  testId: string;
};

const completedPages: CompletedPage[] = [
  { name: 'overview', path: '/overview', testId: 'overview-page' },
  {
    name: 'transaction-history',
    path: '/transactions/history',
    testId: 'transaction-history-page',
  },
  {
    name: 'transaction-detail',
    path: '/transactions/260131020200004331964330',
    testId: 'transaction-detail-page',
  },
  { name: 'branch-create', path: '/branches/new', testId: 'branch-create-page' },
  { name: 'pos-list', path: '/pos', testId: 'pos-list-page' },
  {
    name: 'card-management',
    path: '/expense-account/cards',
    testId: 'card-management-page',
  },
  { name: 'team-members', path: '/team/members', testId: 'team-members-page' },
  {
    name: 'add-team-member',
    path: '/team/members/new',
    testId: 'add-team-member-page',
  },
  {
    name: 'savings-summary',
    path: '/savings/summary',
    testId: 'savings-summary-page',
  },
  {
    name: 'savings-owealth',
    path: '/savings/owealth',
    testId: 'savings-owealth-page',
  },
];

test.describe('completed page visual baselines', () => {
  for (const completedPage of completedPages) {
    test(`${completedPage.name} desktop baseline`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1100 });
      await page.goto(completedPage.path);
      await expect(page.getByTestId(completedPage.testId)).toBeVisible();
      await page.evaluate(async () => {
        await document.fonts.ready;
      });

      await expect(page).toHaveScreenshot(`${completedPage.name}-desktop.png`, {
        fullPage: true,
      });
    });
  }
});
