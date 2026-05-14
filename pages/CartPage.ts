import { Page, expect } from '@playwright/test';

export class CartPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProduct() {
    console.log('[CartPage] Verifying backpack is present in cart');
    await expect(this.page).toHaveURL(/cart/);
    await expect(
      this.page.locator('.inventory_item_name')
    ).toContainText('Sauce Labs Backpack');
  }

  async checkout() {
    const checkoutButton = this.page.locator('#checkout');
    await expect(checkoutButton).toBeVisible();
    console.log('[CartPage] Clicking checkout');
    await checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one/);
  }

}