import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().nonempty('Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
