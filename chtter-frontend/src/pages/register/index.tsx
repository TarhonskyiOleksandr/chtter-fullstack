import React from 'react';

import { useCreateUser } from '@/features';

const RegisterPage = () => {
  const [createUser] = useCreateUser();

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await createUser({
      variables: {
        createUserInput: {
          name,
          email,
          password,
        },
      },
    });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2 className="card-title mb-3">Register</h2>
      <input 
        placeholder="Name" 
        className="input input-bordered w-full"
        name="name"
      />
      <input 
        placeholder="Email" 
        className="input input-bordered w-full mt-2" 
        name="email"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="input input-bordered w-full mt-2" 
        name="password"
      />
      <div className="card-actions justify-end mt-4">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

export default RegisterPage;
