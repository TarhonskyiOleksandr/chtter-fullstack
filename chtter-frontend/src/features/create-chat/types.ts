import { z } from 'zod';

export const createChatSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().optional(),
});

export type CreateChatFormData = z.infer<typeof createChatSchema>;
