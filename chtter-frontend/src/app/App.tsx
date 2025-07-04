import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';

import Home from '@/pages/home';
import AuthLayout from './layouts/AuthLayout';
import { Protected } from './layouts/Protected';
import { ApolloProvider } from '@/shared/api/graphql';

export default function App() {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  );
}

