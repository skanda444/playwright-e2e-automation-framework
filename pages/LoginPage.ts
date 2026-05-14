import { Page } from '@playwright/test';

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

      timeout: 60000

    });

  }

  async login(u: string, p: string) {

    log(`Logging in with user: ${u}`);

    await this.page.fill('#user-name', u);

    await this.page.fill('#password', p);

    await this.page.click('#login-button');

  }

}