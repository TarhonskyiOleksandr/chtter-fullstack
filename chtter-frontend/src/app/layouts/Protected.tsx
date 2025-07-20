import { Navigate, Outlet } from 'react-router-dom';

import { useGetMe } from '@/entities';
import { Navbar } from './Navbar';
import { useEffect } from 'react';
import { isAuthenticated } from '@/shared/constatnts';

export const Protected = () => {
  const { data, loading } = useGetMe();

  useEffect(() => {
    if (data?.me) isAuthenticated(true);
  }, [data]);
  
  if (loading) return <p>Loading...</p>;
  
  if (!data?.me) return <Navigate to="/login" />;

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};
