import { test, expect } from '../fixtures/baseTest';
import { ENV } from '../utils/env';
import { CheckoutDataAPI } from '../api/CheckoutDataAPI';

const CHECKOUT_CUSTOMER = {
  firstName: 'Asha',
  lastName: 'Patel',
  postalCode: '560067',
  email: 'asha.patel@example.com',
  label: 'enterprise-hybrid-checkout',
};

test('API-created checkout data is validated through the UI @hybrid', async ({
  request,
  page,
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  const checkoutDataApi = new CheckoutDataAPI(request);
  const createdCustomer = await checkoutDataApi.createCheckoutCustomer(CHECKOUT_CUSTOMER);

  try {
    await test.step('Authenticate and reach inventory', async () => {
      console.log('[HybridWorkflow] Opening application and validating authenticated state');
      await loginPage.goto();

      const loginFieldVisible = await page
        .locator('#user-name')
        .isVisible({ timeout: 2000 })
        .catch(() => false);

      if (loginFieldVisible) {
        console.log('[HybridWorkflow] Session missing, logging in with configured credentials');
        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
      }

      await expect(page).toHaveURL(/inventory/);
      console.log('[HybridWorkflow] Inventory page is ready for UI validation');
    });

    await test.step('Build order through the existing UI flow', async () => {
      console.log('[HybridWorkflow] Adding backpack to the cart');
      await inventoryPage.addBackpackToCart();

      console.log('[HybridWorkflow] Opening cart and verifying line item');
      await inventoryPage.openCart();
      await cartPage.verifyProduct();

      console.log('[HybridWorkflow] Navigating to checkout');
      await cartPage.checkout();
    });

    await test.step('Validate API-created customer data in the checkout UI', async () => {
      await checkoutPage.fillDetailsWith({
        firstName: createdCustomer.firstName,
        lastName: createdCustomer.lastName,
        postalCode: createdCustomer.postalCode,
      });

      await expect(page.locator('#first-name')).toHaveValue(createdCustomer.firstName);
      await expect(page.locator('#last-name')).toHaveValue(createdCustomer.lastName);
      await expect(page.locator('#postal-code')).toHaveValue(createdCustomer.postalCode);
      console.log('[HybridWorkflow] Checkout form values match the API-created data');
    });

    await test.step('Complete the order and validate the end state', async () => {
      await checkoutPage.finishOrder();
      await checkoutPage.verifyOrderSuccess();
      console.log('[HybridWorkflow] End-to-end hybrid flow completed successfully');
    });
  } finally {
    await checkoutDataApi.cleanupCheckoutCustomer(createdCustomer.id);
  }
});