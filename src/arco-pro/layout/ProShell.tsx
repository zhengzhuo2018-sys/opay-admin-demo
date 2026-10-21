import { useMemo, useState, type ReactNode } from 'react';
import {
  Avatar,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography,
} from '@arco-design/web-react';
import {
  IconBulb,
  IconDashboard,
  IconLanguage,
  IconMenuFold,
  IconMenuUnfold,
  IconMoon,
  IconNotification,
  IconSettings,
  IconUser,
} from '@arco-design/web-react/icon';
import {
  findNavigationParentKey,
  navigationItems,
  type NavigationItem,
} from '../../config/navigation';
import opayLogoMark from '../../assets/figma/opay-logo-mark.svg';
import styles from './ProShell.module.css';

const { Header, Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

type ProShellProps = {
  children: ReactNode;
  pathname: string;
  title: string;
  onNavigate: (path: string) => void;
};

function NavigationMenu({
  pathname,
  collapsed,
  onNavigate,
}: {
  pathname: string;
  collapsed?: boolean;
  onNavigate: (path: string) => void;
}) {
  const parentKey = findNavigationParentKey(pathname);
  const defaultOpenKeys = useMemo(
    () => (parentKey ? [parentKey] : []),
    [parentKey],
  );

  const renderItems = (items: NavigationItem[]) =>
    items.map((item) => {
      const Icon = item.icon;
      if (item.children?.length) {
        return (
          <SubMenu
            key={item.key}
            title={
              <>
                {Icon ? <Icon className={styles.menuIcon} /> : null}
                {item.label}
              </>
            }
          >
            {renderItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem key={item.key}>
          {Icon ? <Icon className={styles.menuIcon} /> : null}
          {item.label}
        </MenuItem>
      );
    });

  return (
    <Menu
      className={styles.menu}
      collapse={collapsed}
      levelIndent={34}
      selectedKeys={[pathname]}
      defaultOpenKeys={defaultOpenKeys}
      onClickMenuItem={onNavigate}
    >
      {renderItems(navigationItems)}
    </Menu>
  );
}

function Brand() {
  return (
    <div className={styles.brand} aria-label="OPay merchant portal">
      <img
        className={styles.brandMark}
        src={opayLogoMark}
        alt=""
        aria-hidden="true"
      />
      <Typography.Title heading={5} className={styles.brandTitle}>
        Pay
      </Typography.Title>
    </div>
  );
}

function CircleAction({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <Tooltip content={label}>
      <Button
        className={styles.iconButton}
        type="secondary"
        shape="circle"
        icon={icon}
        aria-label={label}
      />
    </Tooltip>
  );
}

export default function ProShell({
  children,
  pathname,
  title,
  onNavigate,
}: ProShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(false);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setMobileVisible(false);
  };

  const accountMenu = (
    <Menu>
      <MenuItem key="profile">Profile</MenuItem>
      <MenuItem key="preferences">Preferences</MenuItem>
    </Menu>
  );

  return (
    <Layout className={styles.shell}>
      <Header className={styles.header}>
        <Brand />
        <Button
          className={styles.mobileMenuButton}
          type="secondary"
          shape="circle"
          icon={<IconMenuUnfold />}
          aria-label="Open navigation"
          onClick={() => setMobileVisible(true)}
        />
        <div className={styles.headerSpacer} />
        <Input.Search
          className={styles.search}
          placeholder="Search"
          aria-label="Search workspace"
        />
        <Space size="medium" className={styles.headerActions}>
          <CircleAction label="Language" icon={<IconLanguage />} />
          <CircleAction label="Theme" icon={<IconMoon />} />
          <CircleAction label="Ideas" icon={<IconBulb />} />
          <CircleAction label="Notifications" icon={<IconNotification />} />
          <CircleAction label="Settings" icon={<IconSettings />} />
          <Dropdown droplist={accountMenu} position="br">
            <Avatar size={32} className={styles.avatar}>
              <IconUser />
            </Avatar>
          </Dropdown>
        </Space>
      </Header>

      <Layout className={styles.workspace}>
        <Sider
          className={styles.sider}
          width={200}
          collapsedWidth={48}
          collapsed={collapsed}
          collapsible
          trigger={null}
        >
          <NavigationMenu
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={handleNavigate}
          />
          <Button
            className={styles.collapseButton}
            type="secondary"
            shape="circle"
            size="mini"
            icon={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            onClick={() => setCollapsed((value) => !value)}
          />
        </Sider>

        <Content className={styles.content}>
          <Breadcrumb className={styles.breadcrumb}>
            <Breadcrumb.Item>
              <IconDashboard aria-label="Dashboard" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
      </Layout>

      <Drawer
        className={styles.mobileDrawer}
        width={240}
        title="OPay"
        visible={mobileVisible}
        placement="left"
        footer={null}
        onCancel={() => setMobileVisible(false)}
      >
        <NavigationMenu pathname={pathname} onNavigate={handleNavigate} />
      </Drawer>
    </Layout>
  );
}
