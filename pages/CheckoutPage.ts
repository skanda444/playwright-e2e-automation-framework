import { Page, expect } from '@playwright/test';

export class CheckoutPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillDetails() {
    console.log('[CheckoutPage] Filling checkout details');

    const firstName = this.page.locator('#first-name');
    const lastName = this.page.locator('#last-name');
    const postalCode = this.page.locator('#postal-code');

    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
    await expect(postalCode).toBeVisible();

    await firstName.fill('Skanda');
    await lastName.fill('C');
    await postalCode.fill('560067');

  }

  async finishOrder() {
    const continueButton = this.page.locator('#continue');
    const finishButton = this.page.locator('#finish');

    await expect(continueButton).toBeVisible();
    console.log('[CheckoutPage] Clicking continue');
    await continueButton.click();
    await expect(this.page).toHaveURL(/checkout-step-two/);

    await expect(finishButton).toBeVisible();
    console.log('[CheckoutPage] Clicking finish');
    await finishButton.click();

  }

  async verifyOrderSuccess() {

    await expect(
      this.page.locator('.complete-header')
    ).toContainText('Thank you for your order!');

  }

}