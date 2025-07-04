import { z } from 'zod';

export const IdParamSchema = z.object({
  id: z.string().uuid(),
});
