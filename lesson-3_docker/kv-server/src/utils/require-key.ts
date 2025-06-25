/**
 * Utility function to ensure that a specific environment variable is defined.
 * @param key
 */
export const requireKey = (key: string) => {
  const definedKey = process.env[key];

  if (definedKey === undefined) {
    throw new Error(`Missing ENV: ${key}`);
  }
  return definedKey;
};
