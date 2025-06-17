import { frequencyType } from '../types/frequency.type';

/**
 * Checks if the provided value is a valid frequency type.
 * @param value - The value to check.
 * @returns True if the value is a valid frequency type, otherwise false.
 */
export const isValidFrequency = (value: string): value is frequencyType => {
  const validFrequencies = ['daily', 'weekly', 'monthly'] as const;
  return validFrequencies.includes(value as frequencyType);
};
