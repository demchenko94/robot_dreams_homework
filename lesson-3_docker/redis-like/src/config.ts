import { config as load } from 'dotenv';
import { requireKey } from './utils/require-key.js';

load();

interface Config {
  PORT: string;
}

const config: Config = {
  PORT: requireKey('PORT'),
};

export default config;
