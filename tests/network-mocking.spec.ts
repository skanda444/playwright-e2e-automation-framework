import { test, expect } from '@playwright/test';

import {
  FAILURE_CATALOG_RESPONSE,
  PRODUCTS_API_URL,
  SUCCESS_CATALOG_RESPONSE,
  loadCatalogMockPage,
} from '../utils/networkMocks';

test.describe('Network interception and API mocking', () => {
  test('intercepts a request and fulfills a successful mocked response', async ({ page }) => {
    const interceptedRequests: Array<{ method: string; url: string }> = [];

    await page.route(PRODUCTS_API_URL, async (route) => {
      const request = route.request();

      interceptedRequests.push({
        method: request.method(),
        url: request.url(),
      });

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(SUCCESS_CATALOG_RESPONSE),
      });
    });

    await loadCatalogMockPage(page);

    await expect(page.getByText('Loaded 2 products')).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bolt T-Shirt')).toBeVisible();
    expect(interceptedRequests).toEqual([
      {
        method: 'GET',
        url: PRODUCTS_API_URL,
      },
    ]);
  });

  test('simulates a failed API response and renders an error state', async ({ page }) => {
    const interceptedRequests: Array<{ method: string; url: string }> = [];

    await page.route(PRODUCTS_API_URL, async (route) => {
      const request = route.request();

      interceptedRequests.push({
        method: request.method(),
        url: request.url(),
      });

      await route.fulfill({
        status: 503,
        contentType: 'application/json',
        body: JSON.stringify(FAILURE_CATALOG_RESPONSE),
      });
    });

    await loadCatalogMockPage(page);

    await expect(page.getByText('Unable to load catalog: Catalog service is temporarily unavailable')).toBeVisible();
    await expect(page.locator('#products li')).toHaveCount(0);
    expect(interceptedRequests).toEqual([
      {
        method: 'GET',
        url: PRODUCTS_API_URL,
      },
    ]);
  });
});