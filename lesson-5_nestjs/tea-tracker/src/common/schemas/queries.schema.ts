import { z } from 'zod';

export const QueriesSchema = z.object({
  minRating: z.preprocess((value) => {
    if (value === undefined) return undefined;
    return Number(value);
  }, z.number().min(1).max(10).optional().describe('Min rating of the tea')),
  page: z.preprocess((value) => {
    if (value === undefined) return undefined;
    return Number(value);
  }, z.number().min(1).optional().describe('Number of page')),
  limit: z.preprocess((value) => {
    if (value === undefined) return undefined;
    return Number(value);
  }, z.number().min(1).optional().describe('Number of items per page')),
});
