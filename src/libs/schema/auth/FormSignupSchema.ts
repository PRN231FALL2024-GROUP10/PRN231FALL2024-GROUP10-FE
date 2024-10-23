import { z } from 'zod';

// export const FormSignUpSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   phone: z.string(),
//   email: z.string().email('Please enter valid email adress'),
//   password: z.string({
//     required_error: 'Please enter your password',
//   }),
//   rePassword: z.string(),
//   accepted: z.boolean().nullable(),
// });

export const FormSignUpSchema = z.object({
  email: z.string().email('Please enter valid email adress'),
  username: z.string({
    required_error: 'Please enter your username',
  }),
  password: z.string({
    required_error: 'Please enter your password',
  }),
  // rePassword: z.string({
  //   required_error: 'Please match your password',
  // }),
});
