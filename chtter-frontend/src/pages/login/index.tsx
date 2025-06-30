import { FormField } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, type LoginFormData } from './types';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <h2 className="card-title mb-3">Login</h2>
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
      <div className="card-actions justify-end">
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