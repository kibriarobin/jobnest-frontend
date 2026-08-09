import { z } from 'zod';
import { Role } from '@/lib/type';

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum([Role.CANDIDATE, Role.EMPLOYER]),
    companyName: z.string().optional(),
  })
  .refine((data) => data.role !== Role.EMPLOYER || !!data.companyName, {
    message: 'Company name is required for employer registration',
    path: ['companyName'],
  });