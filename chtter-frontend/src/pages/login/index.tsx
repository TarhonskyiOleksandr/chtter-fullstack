import { FormField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginFormData } from './types';
import { useLogin } from '@/features';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useLogin();

  const onHandleSubmit = (data: LoginFormData) => {
    clearErrors('root');
    login(data, setError);
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <h2 className="card-title mb-3">Login</h2>
      {errors.root && (
        <div className="alert alert-error mb-4">
          <span>{errors.root.message}</span>
        </div>
      )}
      <FormField error={errors.email?.message}>
        <input 
          placeholder="Email" 
          className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
          {...register('email')}
        />
      </FormField>
      <FormField error={errors.password?.message}>
        <input 
          type="password" 
          placeholder="Password" 
          className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
          {...register('password')}
        />
      </FormField>
      <div className="card-actions justify-between items-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary">
            Register
          </Link>.
        </p>
        <button 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginPage;