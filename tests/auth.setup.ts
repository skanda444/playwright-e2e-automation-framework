import fs from 'fs';
import path from 'path';
import { test as setup, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { ENV } from '../utils/env';

const INVENTORY_URL_PATTERN = /\/inventory(?:\.html)?(?:[?#].*)?$/;

setup('authenticate once and persist session state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const authStateFile = path.resolve(process.cwd(), ENV.AUTH_STATE_PATH);
  const inventoryList = page.locator('.inventory_list');

  await setup.step('Open login page', async () => {
    console.log(`[AuthSetup] Opening login page: ${ENV.BASE_URL}`);
    await loginPage.goto();
    await expect(page.locator('#user-name')).toBeVisible({ timeout: 15000 });
    console.log(`[AuthSetup] Login page ready at ${page.url()}`);
  });

  await setup.step('Log in and confirm inventory is ready', async () => {
    console.log(`[AuthSetup] Logging in as ${ENV.USERNAME}`);
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);

    try {
      await expect(page).toHaveURL(INVENTORY_URL_PATTERN, { timeout: 30000 });
      console.log(`[AuthSetup] Inventory URL confirmed: ${page.url()}`);
    } catch (error) {
      console.log(`[AuthSetup] Inventory URL check did not pass: ${page.url()}`);
      console.log('[AuthSetup] Waiting for inventory content as the authoritative ready signal');
      await expect(inventoryList).toBeVisible({ timeout: 30000 });
      console.log(`[AuthSetup] Inventory content confirmed at: ${page.url()}`);
    }
  });

  fs.mkdirSync(path.dirname(authStateFile), { recursive: true });
  console.log(`[AuthSetup] Saving authenticated storage state to ${authStateFile}`);
  await page.context().storageState({ path: authStateFile });
  console.log('[AuthSetup] Storage state saved successfully');
});
