import { z } from 'zod';

export const settingsSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters.' })
      .max(50, { message: 'Full name cannot exceed 50 characters.' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters.' })
      .max(20, { message: 'Username cannot exceed 20 characters.' })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores.',
      }),
    email: z
      .string()
      .min(1, { message: 'Email address is required.' })
      .email({ message: 'Please enter a valid email address (e.g. user@example.com).' }),
    bio: z
      .string()
      .max(200, { message: 'Bio cannot exceed 200 characters.' }),
    emailNotifications: z.boolean(),
    pushNotifications: z.boolean(),
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword.length >= 8;
      }
      return true;
    },
    {
      message: 'New password must be at least 8 characters long.',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0 && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Current password is required to set a new password.',
      path: ['currentPassword'],
    }
  );

export type SettingsFormData = z.infer<typeof settingsSchema>;
