import { config as load } from 'dotenv';
import { requireKey } from './utils/require-key';

load();

interface Config {
  DATABASE_PATH: string;
  PORT: string;
}

const config: Config = {
  PORT: requireKey('PORT'),
  DATABASE_PATH: requireKey('DATABASE_PATH'),
};

export default config;
