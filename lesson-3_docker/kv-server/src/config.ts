import { config as load } from 'dotenv';
import { requireKey } from './utils/require-key.js';

load();

interface Config {
  PORT: string;
  REDIS_URL: string;
}

const config: Config = {
  PORT: requireKey('PORT'),
  REDIS_URL: requireKey('REDIS_URL')
};
export default config;
