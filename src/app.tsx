import * as React from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import NotFoundPage from 'pages/global/not-found-page';
import GlobalLayout from 'pages/global/components/global-layout';
import ShopPage from 'pages/global/shop-page';
import FotoPage from 'pages/global/foto-page';

import AuthLayout from 'pages/auth/components/auth-layout';
import LoginPage from 'pages/auth/login-page';
import RegisterPage from 'pages/auth/register-page';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<ShopPage />} />
        <Route path="foto/:id" element={<FotoPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>

      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
