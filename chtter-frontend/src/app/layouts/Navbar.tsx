import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useGetMe } from '@/entities';
import { useLogout } from '@/features';
import { client } from '@/shared/api/graphql';
import { isAuthenticated } from '@/shared/constatnts';
import { useReactiveVar } from '@apollo/client';
import { Avatar } from '@/shared/ui';

export const Navbar: React.FC = () => {
  const { data } = useGetMe();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const authenticated = useReactiveVar(isAuthenticated);

  const handleLogout = async() => {
    await logout();
    isAuthenticated(false);
    navigate('/login');
    client.resetStore();
  };

  console.log(authenticated)

  return (
    <div className="bg-base-100 shadow-md">
      <div className="navbar max-w-screen-xl mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            Chtter
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="cursor-pointer">
              <Avatar name={ data?.me.name || ''} /> 
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/proile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
