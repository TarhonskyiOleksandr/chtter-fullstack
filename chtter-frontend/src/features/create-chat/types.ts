import { z } from 'zod';

export const createChatSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().nonempty('Name is required'),
});

export type CreateChatFormData = z.infer<typeof createChatSchema>;
