import { z } from 'zod';

export const settingsFormSchema = z.object({
  file: z.custom<File>((file) => !file || file instanceof File, {
      message: 'Only JPEG images are allowed',
    }).refine((file) => !file || file.type === 'image/jpeg', {
      message: 'Only JPEG images are allowed',
    }).refine((file) => !file || file.size <= 100000, {
      message: 'Max file size is 100KB',
    }).optional(),
});

export type SettingsFormSchema = z.infer<typeof settingsFormSchema>;
