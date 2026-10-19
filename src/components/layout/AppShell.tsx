import { useEffect, useState, type ReactNode } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Menu,
  Select,
  Space,
  Tag,
} from '@arco-design/web-react';
import {
  IconCheckSquare,
  IconMenuFold,
  IconMenuUnfold,
  IconNotification,
  IconSafe,
  IconSettings,
  IconUser,
  IconUserGroup,
} from '@arco-design/web-react/icon';
import opayLogoMark from '../../assets/figma/opay-logo-mark.svg';
import {
  defaultNavigationKey,
  findNavigationParentKey,
  navigationItems,
  type NavigationItem,
} from '../../config/navigation';
import './app-shell.css';

const { Header, Sider, Content } = Layout;

type AppShellProps = {
  children: ReactNode;
  pathname: string;
  onNavigate: (path: string) => void;
};

const mobileNavigationQuery = '(max-width: 640px)';

function renderNavigationItem(item: NavigationItem) {
  const Icon = item.icon;
  const title = (
    <span className="app-nav-label">
      <span>{item.label}</span>
      {item.badge ? <Badge count={item.badge} dotClassName="app-nav-badge" /> : null}
    </span>
  );

  if (item.children) {
    return (
      <Menu.SubMenu
        key={item.key}
        className={`app-nav-primary-submenu${item.separated ? ' app-nav-section-break' : ''}`}
        title={
          <>
            {Icon ? <Icon className="app-nav-icon" /> : null}
            {title}
          </>
        }
      >
        {item.children.map(renderNavigationItem)}
      </Menu.SubMenu>
    );
  }

  return (
    <Menu.Item
      key={item.key}
      className={`${Icon ? 'app-nav-primary-item' : 'app-nav-secondary-item'}${item.separated ? ' app-nav-section-break' : ''}`}
    >
      {Icon ? <Icon className="app-nav-icon" /> : null}
      {title}
    </Menu.Item>
  );
}

function navigationKeyFor(pathname: string) {
  if (pathname === '/transactions' || /^\/transactions\/[^/]+$/.test(pathname)) {
    return pathname === '/transactions/summary'
      ? '/transactions/summary'
      : '/transactions/history';
  }
  if (pathname.startsWith('/branches')) return '/branches/new';
  if (pathname.startsWith('/team')) return '/team/members';
  if (pathname === '/pos/apply') return '/pos';
  if (pathname === '/team/members/alternate-otp' || pathname === '/team/members/new') {
    return '/team/members';
  }
  return pathname;
}

export default function AppShell({ children, pathname, onNavigate }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia(mobileNavigationQuery).matches,
  );
  const selectedKey = navigationKeyFor(pathname) || defaultNavigationKey;
  const selectedParentKey = findNavigationParentKey(selectedKey);
  useEffect(() => {
    const media = window.matchMedia(mobileNavigationQuery);
    const handleChange = (event: MediaQueryListEvent) => setCollapsed(event.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const accountMenu = (
    <Menu className="account-menu">
      <Menu.Item key="profile"><IconUser /> Profile</Menu.Item>
      <Menu.Item key="settings"><IconSettings /> Account settings</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="app-shell" data-testid="app-shell">
      <Sider
        className="app-sidebar"
        collapsed={collapsed}
        collapsible
        trigger={null}
        width={224}
        collapsedWidth={72}
      >
        <div className="app-brand" aria-label="OPay merchant portal">
          <img className="app-brand-mark" src={opayLogoMark} alt="" aria-hidden="true" />
          <span className="app-brand-word">Pay</span>
        </div>

        <Menu
          className="app-nav"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={selectedParentKey ? [selectedParentKey] : []}
          onClickMenuItem={onNavigate}
        >
          {navigationItems.map(renderNavigationItem)}
        </Menu>
      </Sider>

      <Layout className="app-main">
        <Header className="app-header">
          <div className="app-header-leading">
            <Button
              className="app-collapse-button"
              type="text"
              icon={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
              aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
              onClick={() => setCollapsed((value) => !value)}
            />
          </div>

          <Space className="app-header-actions" size="medium">
            <Tag className="app-status-tag" icon={<IconSafe />} bordered={false}>
              KA VIP
            </Tag>
            <Tag className="app-status-tag" icon={<IconUserGroup />} bordered={false}>
              OPay Manager
            </Tag>
            <Button
              className="app-icon-button"
              type="text"
              icon={<IconCheckSquare />}
              aria-label="Tasks"
            />
            <Button
              className="app-icon-button"
              type="text"
              icon={
                <Badge dot>
                  <IconNotification />
                </Badge>
              }
              aria-label="Notifications"
            />
            <Select
              className="app-account-select"
              defaultValue="mayaks-prestige"
              aria-label="Select merchant account"
              options={[
                { label: 'MAYAKS aaa\"PRESTIGE ...', value: 'mayaks-prestige' },
                { label: 'MAYAKS STITCHES LTD', value: 'mayaks-stitches' },
              ]}
            />
            <Dropdown droplist={accountMenu} position="br" trigger="click">
              <button className="app-account" type="button" aria-label="Open account menu">
                <Avatar size={32}>MA</Avatar>
              </button>
            </Dropdown>
          </Space>
        </Header>

        <Content className="app-content">
          <div className="app-content-inner">{children}</div>
        </Content>
        {import.meta.env.VITE_PUBLIC_DEMO === 'true' ? (
          <div className="app-demo-disclaimer" role="note">
            Unofficial design reproduction created for evaluation purposes. Not affiliated with OPay.
          </div>
        ) : null}
      </Layout>
    </Layout>
  );
}
