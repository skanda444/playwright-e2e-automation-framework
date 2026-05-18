import type { Page } from '@playwright/test';

export type MockProduct = {
  id: number;
  name: string;
  price: string;
  stock: number;
};

export type MockCatalogResponse = {
  products: MockProduct[];
};

export const PRODUCTS_API_URL = 'https://mock-api.local/api/products';

export const SUCCESS_CATALOG_RESPONSE: MockCatalogResponse = {
  products: [
    {
      id: 1,
      name: 'Sauce Labs Backpack',
      price: '$29.99',
      stock: 15,
    },
    {
      id: 2,
      name: 'Sauce Labs Bolt T-Shirt',
      price: '$15.99',
      stock: 8,
    },
  ],
};

export const FAILURE_CATALOG_RESPONSE = {
  error: 'Catalog service is temporarily unavailable',
};

export function buildCatalogMockPage(): string {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mocked Catalog</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 32px;
            background: #f6f7fb;
            color: #1f2937;
          }

          .panel {
            max-width: 720px;
            margin: 0 auto;
            padding: 24px;
            background: #ffffff;
            border: 1px solid #d7dde8;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
          }

          h1 {
            margin-top: 0;
            font-size: 28px;
          }

          #status {
            margin: 0 0 16px;
            padding: 12px 16px;
            border-radius: 12px;
            background: #eef2ff;
          }

          #status.error {
            background: #fee2e2;
            color: #991b1b;
          }

          #products {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 12px;
          }

          #products li {
            padding: 16px;
            border-radius: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          }

          .product-name {
            display: block;
            font-weight: 700;
            margin-bottom: 4px;
          }
        </style>
      </head>
      <body>
        <main class="panel">
          <h1>Mocked Catalog</h1>
          <p id="status">Loading catalog...</p>
          <ul id="products"></ul>
        </main>

        <script>
          (async () => {
            const status = document.getElementById('status');
            const list = document.getElementById('products');

            try {
              const response = await fetch('${PRODUCTS_API_URL}');

              if (!response.ok) {
                const payload = await response.json().catch(() => ({}));
                throw new Error(payload.error || 'Request failed with status ' + response.status);
              }

              const data = await response.json();
              status.textContent = 'Loaded ' + data.products.length + ' products';

              data.products.forEach((product) => {
                const item = document.createElement('li');
                item.innerHTML =
                  '<span class="product-name">' + product.name + '</span>' +
                  '<span class="product-meta">' + product.price + ' | Stock: ' + product.stock + '</span>';
                list.appendChild(item);
              });
            } catch (error) {
              status.textContent = 'Unable to load catalog: ' + error.message;
              status.classList.add('error');
            }
          })();
        </script>
      </body>
    </html>
  `;
}

export async function loadCatalogMockPage(page: Page): Promise<void> {
  await page.setContent(buildCatalogMockPage());
}