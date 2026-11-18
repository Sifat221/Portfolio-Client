import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';

import { PortfolioContent } from './components/PortfolioContent';
import { LoadingScreen } from './components/common/LoadingScreen';

import { useGlobalSound } from './hooks/useGlobalSound';

// Lazy-load non-critical routes so main portfolio bundle stays fast on Web, Android & iOS
const AdminPage = lazy(() => import('./components/admin/AdminPage'));
const NotFound = lazy(() => import('./components/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 15,
    },
  },
});

export const App: React.FC = () => {
  useGlobalSound();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<PortfolioContent />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
