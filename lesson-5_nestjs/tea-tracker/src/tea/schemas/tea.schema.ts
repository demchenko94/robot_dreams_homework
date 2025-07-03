import { z } from 'zod';

const TeaSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(40, { message: 'Name must be at most 40 characters' }),
  origin: z
    .string()
    .min(2, { message: 'Origin must be at least 2 characters' })
    .max(30, { message: 'Origin must be at most 30 characters' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' })
    .max(10, { message: 'Rating must be at most 10' })
    .optional(),
  brewTemp: z
    .number()
    .min(60, { message: 'BrewTemp must be at least 60°C' })
    .max(100, { message: 'BrewTemp must be at most 100°C' })
    .optional(),
  notes: z
    .string()
    .max(150, { message: 'Notes must be at most 150 characters' })
    .optional(),
});

export const UpdateTeaDtoShema = TeaSchema.partial();
export const CreateTeaDtoShema = TeaSchema;
