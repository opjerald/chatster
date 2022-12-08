import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes';
import './assets/styles/index.css';
import './assets/styles/style.less';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </BrowserRouter>
);
