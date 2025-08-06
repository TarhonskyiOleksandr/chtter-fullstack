import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateUser } from '@/features';
import { registerSchema, type RegisterFormData } from './types';
import { extractErrorMessage } from '@/shared/utils';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [createUser] = useCreateUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleOnSubmit = async ({ name, email, password }: RegisterFormData) => {
    try {
      await createUser({
        variables: {
          createUserInput: {
            name,
            email,
            password,
          },
        },
      });
      navigate('/login')
    } catch(err) {
      const message = extractErrorMessage(err);
      if (message) {
        setError('root', { message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h2 className="card-title mb-3">Register</h2>
      {errors.root && (
        <div className="alert alert-error mb-4">
          <span>{errors.root.message}</span>
        </div>
      )}
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
        <div className="card-actions justify-between items-center">
          <p className="text-sm">
            Already registered?{' '}
            <Link to="/login" className="text-primary">
              Login
            </Link>.
          </p>
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
