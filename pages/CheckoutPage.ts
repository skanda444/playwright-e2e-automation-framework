import { Page, expect } from '@playwright/test';

export class CheckoutPage {

  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillDetails() {
    console.log('[CheckoutPage] Filling checkout details');

    await this.fillDetailsWith({
      firstName: 'Skanda',
      lastName: 'C',
      postalCode: '560067',
    });

  }

  async fillDetailsWith(details: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    console.log('[CheckoutPage] Filling checkout details with dynamic data');

    const firstName = this.page.locator('#first-name');
    const lastName = this.page.locator('#last-name');
    const postalCode = this.page.locator('#postal-code');

    await expect(this.page).toHaveURL(/checkout-step-one/);
    await expect(firstName).toBeVisible();
    await expect(lastName).toBeVisible();
    await expect(postalCode).toBeVisible();

    await firstName.fill(details.firstName);
    await lastName.fill(details.lastName);
    await postalCode.fill(details.postalCode);

    await expect(firstName).toHaveValue(details.firstName);
    await expect(lastName).toHaveValue(details.lastName);
    await expect(postalCode).toHaveValue(details.postalCode);

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