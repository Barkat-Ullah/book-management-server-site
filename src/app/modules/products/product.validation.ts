import { z } from 'zod';

export const productValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    author: z.string().nonempty('Author is required'),
    price: z
      .number()
      .min(0, 'Price must be a positive number')
      .refine((value) => value !== undefined, {
        message: 'Price is required',
      }),

    category: z
      .enum(['Fiction', 'Science', 'Poetry', 'Religious'], {
        invalid_type_error: '{VALUE} is not a valid category',
      })
      .refine((value) => value !== undefined, {
        message: 'Category is required',
      }),

    description: z.string().nonempty('Description is required'),

    quantity: z
      .number()
      .min(0, 'Quantity cannot be negative')
      .refine((value) => value !== undefined, {
        message: 'Quantity is required',
      }),

    inStock: z.boolean().default(true),

    image: z.string().optional(),
  }),
});
