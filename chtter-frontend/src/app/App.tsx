import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';

import { AuthLayout } from '@/app/layouts';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo-client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

