import { useEffect, useState } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import AppShell from './components/layout/AppShell';
import BranchCreate from './pages/BranchCreate';
import CardManagement from './pages/CardManagement';
import Overview from './pages/Overview';
import PosList from './pages/PosList';
import TransactionDetail from './pages/TransactionDetail';
import TransactionHistory from './pages/TransactionHistory';
import TeamMembers from './pages/TeamMembers';
import AddTeamMember from './pages/AddTeamMember';
import PlaceholderPage from './pages/PlaceholderPage';
import SavingsOwealth from './pages/SavingsOwealth';
import SavingsSummary from './pages/SavingsSummary';
import { findNavigationLabel } from './config/navigation';
import { opayConfig } from './theme/opayTheme';

const transactionHistoryPath = '/transactions/history';

function usesHashRouting() {
  return import.meta.env.BASE_URL !== '/' || window.location.hash.startsWith('#/');
}

function getRoutePath() {
  const hashPath = window.location.hash.replace(/^#/, '');
  if (hashPath.startsWith('/')) return hashPath;

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (basePath && window.location.pathname.startsWith(basePath)) {
    return window.location.pathname.slice(basePath.length) || '/';
  }

  return window.location.pathname;
}

function isTransactionDetailPath(pathname: string) {
  return /^\/transactions\/[^/]+$/.test(pathname)
    && pathname !== transactionHistoryPath
    && pathname !== '/transactions/summary';
}

function App() {
  const [pathname, setPathname] = useState(getRoutePath);

  useEffect(() => {
    if (getRoutePath() === '/') {
      const initialUrl = usesHashRouting()
        ? `${import.meta.env.BASE_URL}#${transactionHistoryPath}`
        : transactionHistoryPath;
      window.history.replaceState({}, '', initialUrl);
      setPathname(transactionHistoryPath);
    }

    const handleLocationChange = () => setPathname(getRoutePath());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    if (usesHashRouting()) {
      window.location.hash = path;
    } else {
      window.history.pushState({}, '', path);
    }
    setPathname(path);
    window.scrollTo({ top: 0 });
  };

  let page;
  if (pathname === '/transactions' || pathname === transactionHistoryPath) {
    page = (
      <TransactionHistory
        onOpenDetail={(id) => navigate(`/transactions/${id}`)}
      />
    );
  } else if (isTransactionDetailPath(pathname)) {
    page = <TransactionDetail onCancel={() => navigate(transactionHistoryPath)} />;
  } else if (pathname === '/overview') {
    page = <Overview />;
  } else if (pathname === '/savings/summary') {
    page = <SavingsSummary />;
  } else if (pathname === '/savings/owealth') {
    page = <SavingsOwealth />;
  } else if (pathname === '/branches/new' || pathname === '/branches') {
    page = <BranchCreate onCancel={() => navigate(transactionHistoryPath)} />;
  } else if (pathname === '/pos' || pathname === '/pos/apply') {
    page = (
      <PosList
        showApplyModal={pathname === '/pos/apply'}
        onOpenApply={() => navigate('/pos/apply')}
        onCloseApply={() => navigate('/pos')}
      />
    );
  } else if (pathname === '/expense-account/cards') {
    page = <CardManagement />;
  } else if (pathname === '/team/members/new') {
    page = <AddTeamMember />;
  } else if (pathname === '/team/members' || pathname === '/team/members/alternate-otp') {
    page = (
      <TeamMembers
        showAlternateOtp={pathname === '/team/members/alternate-otp'}
        onOpenAlternateOtp={() => navigate('/team/members/alternate-otp')}
        onCloseAlternateOtp={() => navigate('/team/members')}
        onAddMember={() => navigate('/team/members/new')}
      />
    );
  } else {
    const navigationLabel = findNavigationLabel(pathname);
    page = (
      <PlaceholderPage
        title={navigationLabel ?? 'Page Not Found'}
        knownPage={Boolean(navigationLabel)}
      />
    );
  }

  return (
    <ConfigProvider {...opayConfig}>
      <AppShell pathname={pathname} onNavigate={navigate}>{page}</AppShell>
    </ConfigProvider>
  );
}

export default App;
