import type { ComponentType } from 'react';
import {
  IconApps,
  IconBranch,
  IconCheckCircle,
  IconCloudDownload,
  IconCompass,
  IconCopy,
  IconDashboard,
  IconHome,
  IconFile,
  IconIdcard,
  IconLink,
  IconMindMapping,
  IconMobile,
  IconOrderedList,
  IconSafe,
  IconSend,
  IconSettings,
  IconStorage,
  IconSwap,
  IconTrophy,
  IconUserGroup,
} from '@arco-design/web-react/icon';

type NavigationIcon = ComponentType<{
  className?: string;
  'aria-label'?: string;
}>;

export type NavigationItem = {
  key: string;
  label: string;
  icon?: NavigationIcon;
  children?: NavigationItem[];
  badge?: string;
  separated?: boolean;
};

export const navigationItems: NavigationItem[] = [
  {
    key: '/overview',
    label: 'Overview',
    icon: IconDashboard,
  },
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: IconHome,
  },
  {
    key: '/getting-started',
    label: 'Get Started',
    icon: IconCompass,
  },
  {
    key: '/balance-menu',
    label: 'Balance',
    icon: IconStorage,
    children: [
      { key: '/balance', label: 'Balance' },
      { key: '/balance/withdrawal', label: 'Withdrawal' },
      { key: '/balance/receive-transfer', label: 'Receive Transfer' },
      { key: '/balance/report', label: 'Balance Report' },
    ],
  },
  {
    key: '/settlement',
    label: 'Settlement',
    icon: IconCheckCircle,
    children: [
      { key: '/settlement/list', label: 'Settlement' },
      { key: '/settlement/details', label: 'Settlement Details' },
      { key: '/settlement/history', label: 'Historical Settlement' },
      { key: '/settlement/reconciliation', label: 'Reconciliation' },
    ],
  },
  {
    key: '/transactions',
    label: 'Transactions',
    icon: IconSwap,
    children: [
      { key: '/transactions/history', label: 'Transaction History' },
      { key: '/transactions/summary', label: 'Summary' },
    ],
  },
  {
    key: '/disputes',
    label: 'Disputes',
    icon: IconSafe,
  },
  {
    key: '/business-orders',
    label: 'Business Orders',
    icon: IconOrderedList,
    children: [
      { key: '/business-orders/checkout-records', label: 'Checkout Records' },
      { key: '/business-orders/merchant-details', label: 'Merchant Details' },
      { key: '/business-orders/transactions', label: 'Transactions' },
    ],
  },
  {
    key: '/reports',
    label: 'Reports',
    icon: IconFile,
    children: [
      { key: '/reports/user', label: 'User Report' },
      { key: '/reports/branch', label: 'Branch Report' },
      { key: '/reports/transaction', label: 'Transaction Report' },
    ],
  },
  {
    key: '/branches',
    label: 'Branch',
    icon: IconBranch,
    children: [
      { key: '/branches/new', label: 'Branch List' },
    ],
  },
  {
    key: '/team',
    label: 'Team',
    icon: IconUserGroup,
    children: [
      { key: '/team/members', label: 'Team Members' },
      { key: '/team/permissions', label: 'Permissions' },
    ],
  },
  {
    key: '/pos-menu',
    label: 'POS',
    icon: IconMobile,
    children: [
      { key: '/pos', label: 'POS List' },
      { key: '/pos/live-location', label: 'POS live location' },
    ],
  },
  {
    key: '/expense-account',
    label: 'Expense Account',
    icon: IconIdcard,
    children: [
      { key: '/expense-account/overview', label: 'Expense Account' },
      { key: '/expense-account/employees', label: 'Authorized Employees' },
      { key: '/expense-account/purchase', label: 'Card Purchase' },
      { key: '/expense-account/cards', label: 'Card Management' },
      { key: '/expense-account/transactions', label: 'Expense Transaction' },
      { key: '/expense-account/statements', label: 'Account Statement' },
      { key: '/expense-account/summary', label: 'Employees Summary' },
      { key: '/expense-account/categories', label: 'Financial Category' },
    ],
  },
  {
    key: '/funds',
    label: 'Funds',
    icon: IconApps,
    children: [
      { key: '/funds/digital-wallets', label: 'Digital Wallets' },
      { key: '/funds/transactions', label: 'Transactions' },
      { key: '/funds/transfer-number-list', label: 'Transfer Number List' },
      { key: '/funds/transfers', label: 'Transfers' },
      { key: '/funds/large-transfers', label: 'Large Transfers' },
    ],
  },
  {
    key: '/pay-out-menu',
    label: 'Pay Out',
    icon: IconSend,
    children: [
      { key: '/pay-out', label: 'Pay Out' },
      { key: '/pay-out/single-review', label: 'Single Payout Review' },
      { key: '/pay-out/bulk-review', label: 'Bulk Payout Review' },
    ],
  },
  {
    key: '/payment-links',
    label: 'Payment Links',
    icon: IconLink,
  },
  {
    key: '/savings',
    label: 'Savings',
    icon: IconTrophy,
    children: [
      { key: '/savings/summary', label: 'Summary' },
      { key: '/savings/owealth', label: 'OWealth' },
      { key: '/savings/fixed', label: 'Fixed Savings' },
    ],
  },
  {
    key: '/branch-savings',
    label: 'Branch Savings',
    icon: IconMindMapping,
    children: [
      { key: '/branch-savings/owealth', label: 'Branch OWealth' },
      { key: '/branch-savings/fixed', label: 'Branch Fixed Savings' },
    ],
  },
  {
    key: '/download-center',
    label: 'Download Center',
    icon: IconCloudDownload,
  },
  {
    key: '/settings-menu',
    label: 'Settings',
    icon: IconSettings,
    children: [
      { key: '/settings', label: 'Setting' },
      { key: '/settings/payment-pin', label: 'Employees Payment PIN' },
      { key: '/settings/pos/receipt', label: 'POS Receipt Configuration' },
    ],
  },
  {
    key: '/replicate',
    label: 'Replicate',
    icon: IconCopy,
    separated: true,
  },
];

export const defaultNavigationKey = '/transactions/history';

export function findNavigationLabel(
  key: string,
  items: NavigationItem[] = navigationItems,
): string | undefined {
  for (const item of items) {
    if (item.key === key) return item.label;
    const childLabel = item.children
      ? findNavigationLabel(key, item.children)
      : undefined;
    if (childLabel) return childLabel;
  }
  return undefined;
}

export function findNavigationItem(
  key: string,
  items: NavigationItem[] = navigationItems,
): NavigationItem | undefined {
  for (const item of items) {
    if (item.key === key) return item;
    const childItem = item.children
      ? findNavigationItem(key, item.children)
      : undefined;
    if (childItem) return childItem;
  }
  return undefined;
}

export function findNavigationSection(
  key: string,
  items: NavigationItem[] = navigationItems,
): NavigationItem | undefined {
  for (const item of items) {
    if (item.key === key) return item;
    if (item.children && findNavigationItem(key, item.children)) return item;
  }
  return undefined;
}

export function findNavigationParentKey(
  key: string,
  items: NavigationItem[] = navigationItems,
): string | undefined {
  for (const item of items) {
    if (item.children?.some((child) => child.key === key)) return item.key;
    const nestedParent = item.children
      ? findNavigationParentKey(key, item.children)
      : undefined;
    if (nestedParent) return nestedParent;
  }
  return undefined;
}
