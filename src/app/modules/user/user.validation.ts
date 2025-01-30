import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('invalid email format'),
    password: z.string(),
  }),
});

const logInValidationSchema = z.object({
  body: z.object({
    email: z.string().email('invalid email format'),
    password: z.string({ required_error: 'password is Required' }),
  }),
});
export const UserValidation = {
  registerValidationSchema,
  logInValidationSchema,
};
