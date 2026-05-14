import { Page, expect } from '@playwright/test';
import { log } from '../utils/logger';

export class InventoryPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addBackpackToCart() {
    log('Adding backpack to cart');

    const addToCartButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
    await expect(this.page).toHaveURL(/inventory/);
    await expect(addToCartButton).toBeVisible();
    console.log('[InventoryPage] Clicking add-to-cart for backpack');
    await addToCartButton.click();
  }

  async openCart() {
    log('Opening cart');

    const cartLink = this.page.locator('.shopping_cart_link');
    await expect(cartLink).toBeVisible();
    console.log('[InventoryPage] Opening cart from inventory page');
    await cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

}