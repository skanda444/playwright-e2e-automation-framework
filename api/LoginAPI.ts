import { APIRequestContext, expect } from '@playwright/test';

export class LoginAPI {

  request: APIRequestContext;

  constructor(request: APIRequestContext) {

    this.request = request;

  }

  async getUsers() {

    const response = await this.request.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

    expect(body.length).toBeGreaterThan(0);

    expect(body[0].name).toBe('Leanne Graham');

    expect(body[0].email).toContain('@');

    return body;

  }

}