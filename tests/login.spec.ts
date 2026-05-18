import { test, expect } from '../fixtures/baseTest';
import data from '../data/login.json';

test.use({ storageState: { cookies: [], origins: [] } });

for (const d of data) {
  test(`Login test for ${d.u}`, async ({ loginPage, page }) => {

    await loginPage.login(d.u, d.p);

    if (d.u === 'standard_user') {
      await expect(page).toHaveURL(/inventory/);
    } else {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }

  });
}