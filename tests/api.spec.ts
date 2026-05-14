import { test, expect } from '@playwright/test';

import { LoginAPI } from '../api/LoginAPI';

test('API Users Test @api', async ({ request }) => {

  const api = new LoginAPI(request);

  const users = await api.getUsers();

  expect(users[0].id).toBe(1);

  expect(users[0].username).toBe('Bret');

});