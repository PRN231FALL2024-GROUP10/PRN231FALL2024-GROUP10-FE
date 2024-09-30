import { z } from 'zod';

export const FormSignInSchema = z.object({
  email: z.string().email('Please enter valid email adress'),
  password: z.string({
    required_error: 'Please enter your password',
  }),
});
