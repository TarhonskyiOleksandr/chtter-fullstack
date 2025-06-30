import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser } from '@/features';
import { registerSchema, type RegisterFormData } from './types';

const RegisterPage = () => {
  const [createUser] = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleOnSubmit = async ({ name, email, password }: RegisterFormData) => {
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
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h2 className="card-title mb-3">Register</h2>
      <div className="form-control w-full">
        <input 
          placeholder="Name" 
          className={`input input-bordered w-full ${errors.name ? 'input-error' : 'mb-2'}`}
          {...register('name')}
        />
        {errors.name && (
          <label className="label mb-2">
            <span className="label-text-alt text-error">{errors.name.message}</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <input 
          placeholder="Email" 
          type="email"
          className={`input input-bordered w-full ${errors.email ? 'input-error' : 'mb-2'}`}
          {...register('email')}
        />
        {errors.email && (
          <label className="label mb-2">
            <span className="label-text-alt text-error">{errors.email.message}</span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <input 
          type="password" 
          placeholder="Password" 
          className={`input input-bordered w-full ${errors.password ? 'input-error' : 'mb-2'}`}
          {...register('password')}
        />
        {errors.password && (
          <label className="label mb-2">
            <span className="label-text-alt text-error">{errors.password.message}</span>
          </label>
        )}
        <div className="card-actions justify-end mt-4">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default RegisterPage;
