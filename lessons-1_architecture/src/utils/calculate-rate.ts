import { frequencyType } from '../types/frequency.type';

/**
 * @param frequency - daily / weekly / monthly
 * @param doneCount - count of days the habit was done
 * @param totalDays - count of total days since habit creation
 * @returns number form 0 to 100
 */
export const calculateRate = (
  frequency: frequencyType,
  doneCount: number,
  totalDays: number
): number => {
  if (totalDays <= 0) return 0;

  let expected = 1;

  switch (frequency) {
    case 'daily':
      expected = totalDays;
      break;
    case 'weekly':
      expected = totalDays / 7;
      break;
    case 'monthly':
      expected = totalDays / 30;
      break;
  }

  const rate = (doneCount / expected) * 100;
  return Math.min(100, Math.round(rate));
};
