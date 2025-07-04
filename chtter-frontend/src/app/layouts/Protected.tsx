import { useGetMe } from '@/entities';
import { Navigate, Outlet } from 'react-router-dom';

export const Protected = () => {
  const { data, loading } = useGetMe();
  
  if (loading) return <p>Loading...</p>;
  
  if (!data?.me) return <Navigate to="/login" />;

  return <Outlet />;
};
