# 🚀 Playwright E2E Automation Framework

An enterprise-grade end-to-end automation framework built using Playwright and TypeScript.

This project demonstrates modern QA automation practices including UI testing, API testing, hybrid workflows, network mocking, authentication reuse, Docker execution, Allure reporting, and GitHub Actions CI/CD.

---

# 📌 Project Highlights

✅ Cross-browser testing (Chromium, Firefox, WebKit)
✅ UI automation with Playwright
✅ API testing and validations
✅ Hybrid API + UI workflow automation
✅ Session authentication reuse
✅ Network interception and mocking
✅ Dockerized test execution
✅ GitHub Actions CI/CD pipeline
✅ Allure reporting integration
✅ Environment-based configuration
✅ Page Object Model (POM) architecture

---

# 🛠️ Tech Stack

* Playwright
* TypeScript
* Node.js
* Docker
* GitHub Actions
* Allure Reports
* dotenv

---

# 📂 Project Structure

```bash
playwright-e2e-automation-framework/
│
├── api/
│   └── LoginAPI.ts
│
├── data/
│   └── login.json
│
├── fixtures/
│   └── baseTest.ts
│
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── api.spec.ts
│   ├── auth.setup.ts
│   ├── hybrid-workflow.spec.ts
│   ├── login.spec.ts
│   ├── network-mocking.spec.ts
│   └── order.spec.ts
│
├── utils/
│   ├── env.ts
│   └── logger.ts
│
├── playwright.config.ts
├── Dockerfile
├── package.json
└── README.md
```

---

# ⚙️ Features Implemented

## 🔐 Authentication Reuse

* Login session is saved using Playwright storage state.
* Avoids repeated login execution.
* Improves execution speed and framework efficiency.

---

## 🌐 Cross Browser Execution

Framework supports:

* Chromium
* Firefox
* WebKit

---

## 🔄 Hybrid API + UI Testing

* API creates application data.
* UI validates the same data.
* Demonstrates real-world enterprise workflow testing.

---

## 📡 Network Mocking

Implemented request interception and mocked API responses using Playwright route handling.

Includes:

* Successful mocked responses
* Failed API simulation
* Error-state validation

---

## 📊 Allure Reporting

Integrated Allure reports for advanced execution reporting.

Generate report:

```bash
npx allure generate ./allure-results --clean
npx allure open
```

---

## 🐳 Docker Support

Framework can run completely inside Docker.

### Build Docker Image

```bash
docker build --no-cache -t playwright-framework .
```

### Run Tests Inside Docker

```bash
docker run --rm playwright-framework
```

---

# 🚀 Running Tests

## Run All Tests

```bash
npx playwright test
```

## Run Specific Test File

```bash
npx playwright test tests/login.spec.ts
```

## Run Specific Browser

```bash
npx playwright test --project=chromium
```

---

# 🔧 Environment Configuration

Environment files used:

```bash
.env.qa
.env.uat
.env.prod
```

Example:

```env
BASE_URL=https://www.saucedemo.com/
USERNAME=standard_user
PASSWORD=secret_sauce
```

---

# 📈 CI/CD Pipeline

GitHub Actions workflow configured for:

* Automatic test execution
* Multi-browser execution
* Artifact upload
* HTML report generation

Workflow file:

```bash
.github/workflows/playwright.yml
```

---

# 📋 Test Coverage

## UI Automation

* Login validation
* Cart workflow
* Checkout flow
* Order placement

## API Automation

* User API validation
* Response status validation
* Response body validation

## Hybrid Testing

* API-generated data verification through UI

## Network Mocking

* API interception
* Mocked responses
* Failure simulations

---

# 🎯 Future Enhancements

* Jenkins integration
* Parallel execution optimization
* Visual regression testing
* Database validation
* Slack notifications
* Kubernetes execution
* Performance testing integration
* AI-based self-healing locators

---

# 👨‍💻 Author

Skanda C

QA Automation Engineer | Playwright | TypeScript | API Testing | CI/CD | Docker

---

# ⭐ Project Status

✅ Enterprise-ready Playwright Automation Framework
✅ Dockerized
✅ CI/CD Enabled
✅ Cross-Browser Compatible
✅ Scalable Architecture
