import config from '../config';

/**
 * Returns the current date in milliseconds, adjusted by a day offset.
 * This is useful for testing purposes to simulate different dates.
 *
 * @returns {number} The current date in milliseconds since the epoch, adjusted by the day offset.
 */
export const nowDate = () => {
  return Date.now() + config.dayOffset * 24 * 60 * 60 * 1000;
};
