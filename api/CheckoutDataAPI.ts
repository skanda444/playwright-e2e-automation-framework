import { APIRequestContext, expect } from '@playwright/test';

export type CheckoutCustomerPayload = {
  firstName: string;
  lastName: string;
  postalCode: string;
  email: string;
  label: string;
};

export type CheckoutCustomerRecord = CheckoutCustomerPayload & {
  id: number;
};

export class CheckoutDataAPI {

  request: APIRequestContext;

  constructor(request: APIRequestContext) {

    this.request = request;

  }

  async createCheckoutCustomer(payload: CheckoutCustomerPayload) {

    console.log(`[CheckoutDataAPI] Creating API test data for ${payload.label}`);

    const response = await this.request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: payload,
      }
    );

    expect(response.status()).toBe(201);

    const body = (await response.json()) as CheckoutCustomerRecord;

    expect(body.id).toBeTruthy();
    expect(body.firstName).toBe(payload.firstName);
    expect(body.lastName).toBe(payload.lastName);
    expect(body.postalCode).toBe(payload.postalCode);
    expect(body.email).toBe(payload.email);

    console.log(`[CheckoutDataAPI] Created API test data with id ${body.id}`);

    return body;

  }

  async cleanupCheckoutCustomer(id: number) {

    console.log(`[CheckoutDataAPI] Cleaning up API test data id ${id}`);

    const response = await this.request.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );

    expect([200, 204]).toContain(response.status());

    console.log(`[CheckoutDataAPI] Cleanup completed for id ${id}`);

  }

}