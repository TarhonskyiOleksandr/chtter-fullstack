import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
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