import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .refine(
     (val) => /^[a-zA-Z].{7,14}$/.test(val),
      'Invalid username'
    ),
  email: z
    .string()
    .min(1, 'Email is required').refine(
      (val) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      'Invalid email address'
    ),
  phone: z
    .string()
    .min(1, 'Phone number is required').refine(
      (val) => 
        /^\+?\d{10,15}$/.test(val),
      'Invalid phone number'
    ),
  role: z
    .string()
    .min(1, 'Role is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long').max(16, 'Password is too long'),
});

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .refine(
      (val) => 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^\+?\d{10,15}$/.test(val),
      'Invalid email address or phone number'
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long').max(16, 'Password is too long'),
});
