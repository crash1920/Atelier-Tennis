import { z } from 'zod';

/**
 * Zod schema for creating a new player
 * This provides runtime validation + TypeScript types
 */
export const createPlayerSchema = z.object({
  firstname: z.string()
    .min(1, 'firstname is required')
    .trim(),

  lastname: z.string()
    .min(1, 'lastname is required')
    .trim(),

  shortname: z.string()
    .optional(),

  sex: z.enum(['M', 'F'], {
    message: 'sex must be either M or F',
  }),

  country: z.object({
    code: z.string()
      .min(1, 'country.code is required')
      .toUpperCase(),
    picture: z.string()
      .url('country.picture must be a valid URL')
      .optional(),
  }),

  picture: z.string()
    .url('picture must be a valid URL')
    .optional()
    .or(z.literal('')),

  data: z.object({
    rank: z.number()
      .int('data.rank must be an integer')
      .positive('data.rank must be a positive number'),

    points: z.number()
      .int('data.points must be an integer')
      .nonnegative('data.points must be a non-negative number'),

    weight: z.number()
      .int('data.weight must be an integer')
      .positive('data.weight must be a positive number (in grams)'),

    height: z.number()
      .int('data.height must be an integer')
      .positive('data.height must be a positive number (in cm)'),

    age: z.number()
      .int('data.age must be an integer')
      .positive('data.age must be a positive number'),

    last: z.array(z.number().int().min(0).max(1))
      .optional()
      .default([]),
  }),
});

/**
 * TypeScript type inferred from the Zod schema
 * This replaces the manual CreatePlayerDTO interface
 */
export type CreatePlayerDTO = z.infer<typeof createPlayerSchema>;
