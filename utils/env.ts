import { config } from 'dotenv';

config({ path: '.env.qa' });

console.log('BASE_URL:', process.env.BASE_URL);

export const ENV = {
  BASE_URL: process.env.BASE_URL ?? '',
};