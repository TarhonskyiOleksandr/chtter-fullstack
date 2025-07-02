import type { UseFormSetError } from 'react-hook-form';

import client from '@/app/graphql/apollo-client';

interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  const login = async(
    req: LoginRequest,
    setError?: UseFormSetError<LoginRequest>,
  ) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      }
    );

    let errorMessage = 'Login failed';

    if (!res.ok && setError) {
      try {
        const data = await res.json();
        if (data?.message) errorMessage = data.message;
      } catch (e) {
        console.error(e);
      }

      setError('root', {
        message: errorMessage,
      });
    }

    await client.refetchQueries({ include: 'active' });
  };

  return { login };
};
