import { nowDate } from './get-now-date';

/**
 * Calculates the total number of days from a given creation date to the current date.
 * @param {Date} createDate - The date when the item was created.
 * @returns {number} - The total number of days from the creation date to today.
 */
export const calculateTotalDays = (createDate: Date): number => {
  const created = new Date(createDate).setHours(0, 0, 0, 0);
  const now = new Date(nowDate()).setHours(0, 0, 0, 0);
  const diffMs = now - created;

  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
};
