import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  role: z.enum(['user', 'admin', 'manager']).optional(),
  bio: z.string().max(300).optional().default(''),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['active', 'inactive', 'banned']).optional(),
  password: z.string().min(6)
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  password: z.string().min(6).optional()
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function validate(schema, data) {
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    const err = new Error(message);
    err.status = 400;
    throw err;
  }
  return parsed.data;
}
