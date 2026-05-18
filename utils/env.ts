import path from 'path';
import { config } from 'dotenv';

const testEnv = process.env.TEST_ENV ?? 'qa';
config({ path: path.resolve(process.cwd(), `.env.${testEnv}`), override: true });

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? '',
  USERNAME: process.env.USERNAME ?? 'standard_user',
  PASSWORD: process.env.PASSWORD ?? 'secret_sauce',
  AUTH_STATE_PATH: 'playwright/.auth/user.json',
};