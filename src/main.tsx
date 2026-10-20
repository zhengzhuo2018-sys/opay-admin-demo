import React from 'react';
import ReactDOM from 'react-dom/client';
import '@arco-themes/react-arco-pro/css/arco.css';
import './styles/tokens.css';
import './arco-pro/theme/global.css';
import AppV2 from './arco-pro/AppV2';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppV2 />
  </React.StrictMode>,
);
