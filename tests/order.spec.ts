import { test, expect } from '../fixtures/baseTest';
import { ENV } from '../utils/env';

test.beforeEach(async () => {

  console.log('Starting test...');

});

test.afterEach(async () => {

  console.log('Test completed...');

});

test('Complete Order Flow @smoke', async ({

  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage

}) => {
  await test.step('Ensure authenticated session', async () => {
    await loginPage.goto();

    const loginFieldVisible = await page
      .locator('#user-name')
      .isVisible({ timeout: 2000 })
      .catch(() => false);

    if (loginFieldVisible) {
      console.log('[OrderFlow] Existing session missing, performing login fallback');
      await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    }

    await expect(page).toHaveURL(/inventory/);
    console.log('[OrderFlow] Authenticated session ready on inventory page');
  });

  await test.step('Add backpack to cart', async () => {
    console.log('[OrderFlow] Step 2: Add backpack start');
    await inventoryPage.addBackpackToCart();
    console.log('[OrderFlow] Step 2: Add backpack success');
  });

  await test.step('Open cart', async () => {
    console.log('[OrderFlow] Step 3: Open cart start');
    await inventoryPage.openCart();
    console.log('[OrderFlow] Step 3: Open cart success');
  });

  await test.step('Verify product and continue checkout', async () => {
    console.log('[OrderFlow] Step 4: Verify product start');
    await cartPage.verifyProduct();
    console.log('[OrderFlow] Step 4: Verify product success');

    console.log('[OrderFlow] Step 5: Checkout start');
    await cartPage.checkout();
    console.log('[OrderFlow] Step 5: Checkout success');
  });

  await test.step('Fill checkout details', async () => {
    console.log('[OrderFlow] Step 6: Fill details start');
    await checkoutPage.fillDetails();
    console.log('[OrderFlow] Step 6: Fill details success');
  });

  await test.step('Finish order', async () => {
    console.log('[OrderFlow] Step 7: Finish order start');
    await checkoutPage.finishOrder();
    console.log('[OrderFlow] Step 7: Finish order success');
  });

  await test.step('Verify success message', async () => {
    console.log('[OrderFlow] Step 8: Verify success start');
    await checkoutPage.verifyOrderSuccess();
    console.log('[OrderFlow] Step 8: Verify success complete');
  });

});