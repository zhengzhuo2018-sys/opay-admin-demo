import { useEffect, useMemo, useState } from 'react';
import { ConfigProvider } from '@arco-design/web-react';
import { findNavigationLabel } from '../config/navigation';
import ProShell from './layout/ProShell';
import ShellStage from './pages/ShellStage';

function usesHashRouting() {
  return import.meta.env.BASE_URL !== '/' || window.location.hash.startsWith('#/');
}

function readPathname() {
  const hashPath = window.location.hash.replace(/^#/, '');
  if (hashPath.startsWith('/')) return hashPath;
  return window.location.pathname === '/' ? '/overview' : window.location.pathname;
}

export default function AppV2() {
  const [pathname, setPathname] = useState(readPathname);

  useEffect(() => {
    const handleLocationChange = () => setPathname(readPathname());
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const title = useMemo(
    () => findNavigationLabel(pathname) ?? 'Workspace',
    [pathname],
  );

  const navigate = (path: string) => {
    if (usesHashRouting()) {
      window.location.hash = path;
      return;
    }
    window.history.pushState({}, '', path);
    setPathname(path);
  };

  return (
    <ConfigProvider>
      <ProShell pathname={pathname} title={title} onNavigate={navigate}>
        <ShellStage title={title} />
      </ProShell>
    </ConfigProvider>
  );
}
