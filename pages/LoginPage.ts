import { Page, expect } from '@playwright/test';

import { log } from '../utils/logger';

import { ENV } from '../utils/env';

export class LoginPage {

  page: Page;

  constructor(page: Page) {

    this.page = page;

  }

  async goto() {

    console.log('Opening URL:', ENV.BASE_URL);

    await this.page.goto(ENV.BASE_URL, {

      waitUntil: 'domcontentloaded',

      timeout: 30000

    });

    await expect(this.page.locator('#user-name')).toBeVisible({ timeout: 30000 });
    await expect(this.page.locator('#password')).toBeVisible({ timeout: 30000 });

  }

  async login(u: string, p: string) {

    log(`Logging in with user: ${u}`);

    const usernameField = this.page.locator('#user-name');
    const passwordField = this.page.locator('#password');
    const loginButton = this.page.locator('#login-button');

    await usernameField.waitFor({ state: 'visible', timeout: 15000 });
    await passwordField.waitFor({ state: 'visible', timeout: 15000 });
    await loginButton.waitFor({ state: 'visible', timeout: 15000 });

    await this.page.fill('#user-name', u);

    await this.page.fill('#password', p);

    console.log('[LoginPage] Submitting login form');

    await this.page.click('#login-button');

    console.log(`[LoginPage] Login form submitted, current URL: ${this.page.url()}`);

  }

}