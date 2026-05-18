# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.setup.ts >> authenticate once and persist session state
- Location: tests\auth.setup.ts:8:6

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /inventory/
Received string:  "https://www.saucedemo.com/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "https://www.saucedemo.com/"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: Hi
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Username and password do not match any user in this service" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Username and password do not match any user in this service"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import fs from 'fs';
  2  | import path from 'path';
  3  | import { test as setup, expect } from '@playwright/test';
  4  | 
  5  | import { LoginPage } from '../pages/LoginPage';
  6  | import { ENV } from '../utils/env';
  7  | 
  8  | setup('authenticate once and persist session state', async ({ page }) => {
  9  |   const loginPage = new LoginPage(page);
  10 |   const authStateFile = path.resolve(process.cwd(), ENV.AUTH_STATE_PATH);
  11 | 
  12 |   await loginPage.goto();
  13 |   await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
> 14 |   await expect(page).toHaveURL(/inventory/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  15 | 
  16 |   fs.mkdirSync(path.dirname(authStateFile), { recursive: true });
  17 |   await page.context().storageState({ path: authStateFile });
  18 | });
  19 | 
```