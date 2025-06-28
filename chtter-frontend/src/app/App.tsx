import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';

import { AuthLayout } from '@/app/layouts';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

