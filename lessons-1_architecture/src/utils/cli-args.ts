import { isValidFrequency } from './is-valid-frequency';

enum ValidParameters {
  name = '--name',
  freq = '--freq',
  id = '--id',
}

export const getArgs = () => process.argv.slice(2);

/**
 * Get the first command from the CLI arguments.
 * @return string
 */
export const getCommand = (): string => {
  const args = getArgs();
  return args[0] ?? '';
};

/**
 * Get argument value by flag.
 * @param flag
 * @return string
 */
export const getArg = (flag: string): string => {
  const args = getArgs();
  const index = args.indexOf(flag);
  const value = index !== -1 ? args[index + 1] : undefined;

  if (!value) {
    throw new Error(`Argument ${flag} is required`);
  }

  if (flag === ValidParameters.freq && !isValidFrequency(value as string)) {
    throw new Error(`Invalid value for ${flag}. Expected one of: daily, weekly, monthly.`);
  }

  if (flag === ValidParameters.id && isNaN(Number(value))) {
    throw new Error(`Invalid value for ${flag}. Expected a number.`);
  }

  return value;
};
