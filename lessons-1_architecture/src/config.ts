import { config as load } from 'dotenv';
import { requireKey } from './utils/require-key';

load();

interface Config {
  databasePath: string;
  dayOffset: number;
}

const config: Config = {
  databasePath: requireKey('DATABASE_PATH'),
  dayOffset: Number(requireKey('DAY_OFFSET')),
};

export default config;
