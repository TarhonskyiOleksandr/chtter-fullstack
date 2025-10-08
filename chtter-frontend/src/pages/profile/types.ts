import { z } from 'zod';

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const imageSchema = z.any().optional()
  .refine((file) => {
    if (!file) return true;
    return ACCEPTED_IMAGE_TYPES.includes(file.type)
  }, 'Invalid file. Choose JPEG, JPG, PNG or WEBP image')
  .refine((file) => {
    if (!file) return true;
    return file.size <= MAX_FILE_SIZE;
  }, 'Max file size allowed is 1MB.');

export const settingsFormSchema = z.object({
  file: imageSchema,
});

export type SettingsFormSchema = z.infer<typeof settingsFormSchema>;
