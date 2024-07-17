import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().trim().min(1),
  login: z
    .string()
    .trim()
    .min(3)
    .max(20)
    .regex(/^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,20}$/),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .regex(/^1\d{10}$/),
});

export type User = z.infer<typeof UserSchema>;
