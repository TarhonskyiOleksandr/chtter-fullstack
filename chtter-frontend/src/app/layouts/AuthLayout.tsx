import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useGetMe } from '@/entities';

export const AuthLayout = () => {
  const { data } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.me) navigate('/')
  }, [data, navigate]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <Outlet />
        </div> 
      </div>
    </div>
  );
}

export default AuthLayout;
