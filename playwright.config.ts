import path from 'path';
import { config as dotenvConfig } from 'dotenv';
import { defineConfig, devices } from '@playwright/test';
import { ENV } from './utils/env';

// Load environment file early so tests and fixtures see the vars.
const envFile = `.env.${process.env.TEST_ENV ?? 'qa'}`;
dotenvConfig({ path: path.resolve(process.cwd(), envFile), override: true });
console.log('playwright.config loaded ENV file:', envFile);
console.log('BASE_URL in config load:', process.env.BASE_URL);

const isCI = !!process.env.CI;
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const retries = isGitHubActions ? 2 : 1;

const authStatePath = ENV.AUTH_STATE_PATH;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  timeout: isCI ? 90000 : 60000,
  expect: {
    timeout: isCI ? 15000 : 10000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,
  /* Retry once locally and twice in GitHub Actions CI. */
  retries,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: ENV.BASE_URL || undefined,
    actionTimeout: isCI ? 15000 : 10000,
    navigationTimeout: isCI ? 45000 : 30000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authStatePath,
      },
      dependencies: ['setup'],
      testIgnore: ['**/auth.setup.ts'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: authStatePath,
      },
      dependencies: ['setup'],
      testIgnore: ['**/auth.setup.ts'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: authStatePath,
      },
      dependencies: ['setup'],
      testIgnore: ['**/auth.setup.ts'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
