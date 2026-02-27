# ecomm-demoblaze

Automation testing framework for the Demoblaze e-commerce site, built with TypeScript + Playwright using a Page Object Model (POM) architecture.

## 1) What this project includes

- End-to-end UI tests for key user flows:
	- Product data extraction (`tests/productList/productData.spec.ts`)
	- Checkout/place order (`tests/checkout/placeOrder.spec.ts`)
	- User sign up (`tests/userAccount/signUp.spec.ts`)
	- User login (`tests/userAccount/logIn.spec.ts`)
- POM layer in `page-objects/`
- Shared fixtures in `fixtures/pageManager.fixture.ts`
- Multi-environment URL selection (`prod`, `staging`, `dev`)
- Smoke workflow in GitHub Actions (`.github/workflows/smoke.yml`)

---

## 2) Prerequisites

Install these before running the framework:

- Node.js 18+ (recommended: 18 or 20)
- npm (comes with Node.js)
- Git

Optional (recommended):

- VS Code with Playwright extension

---

## 3) Clone and install

```bash
git clone https://github.com/Escobar-Alejandro/ecomm-demoblaze.git
cd ecomm-demoblaze
npm ci
```

Install Playwright browser dependencies and browsers:

```bash
npx playwright install-deps
npx playwright install
```

> On Windows, `install-deps` is mainly for Linux CI runners, but `npx playwright install` is still required.

---

## 4) Environment configuration

The framework resolves the base URL from:

- `process.env.ENVIRONMENT` (expected values: `prod`, `staging`, `dev`)
- URL map in `config/environmentUrls.json`
- Resolver in `config/environmentPicker.ts`

Default behavior in this project relies on setting `ENVIRONMENT` explicitly.

### Option A: one-time command

#### Windows PowerShell
```powershell
$env:ENVIRONMENT='prod'; npx playwright test
```

#### macOS/Linux
```bash
ENVIRONMENT=prod npx playwright test
```

### Option B: use a local `.env` file (optional)

Create `.env` at repository root:

```env
ENVIRONMENT=prod
```

`config/loadEnv.ts` loads `.env` if present. If it does not exist, tests can still run as long as your environment variable is set externally.

---

## 5) Run tests

### Run all tests

```bash
npx playwright test
```

### Run smoke tests

```bash
npx playwright test --grep '@smoke'
```

### Run a single file

```bash
npx playwright test tests/userAccount/logIn.spec.ts
```

### Run a specific project/browser

```bash
npx playwright test --project=chromium
```

---

## 6) View reports

After execution:

```bash
npx playwright show-report
```

Artifacts are generated in:

- `playwright-report/`
- `test-results/`
- `output/` (for runtime-generated JSON/data files when applicable)

---

## 7) Project structure (high level)

```text
config/          # env loading and env URL selection
fixtures/        # Playwright fixture extension (homePage, cartPage, etc.)
api/             # API controllers (pet, store, user)
models/          # enums and shared constants (timeouts/environments)
models/api/      # API request/response typing
page-objects/    # POM classes
tests/           # test suites by domain
tests/test-data/ # reusable test data builders/factories
```

### Recommended scalable structure (API now, UI later)

- Keep API and UI concerns separate:
	- API controllers in `api/`
	- UI page objects in `page-objects/`
	- independent fixtures (`fixtures/controllerManager.fixture.ts` and `fixtures/pageManager.fixture.ts`)
- Keep typed domain models in `models/api/` to avoid hard-coded payload shapes in specs.
- Keep specs thin: assertions and business flow only; move payload construction to `tests/test-data/`.
- Tag test intent (`@api`, `@smoke`, `@regression`) to support CI suites by scope.

### API suites added for Petstore

- `tests/productList/postPetData.spec.ts`
	- Posts 10 pets (5 `available`, 4 `pending`, 1 `sold`)
	- Lists `sold` pets and validates the created sold pet details by ID
- `tests/productList/createOrdersForAvailablePets.spec.ts`
	- Lists `available` pets
	- Stores first 5 in memory
	- Creates 1 order per selected pet

Run API tests only:

```bash
npx playwright test tests/productList/postPetData.spec.ts tests/productList/createOrdersForAvailablePets.spec.ts --grep @api
```

### Tagging convention guard (`@api`)

- Every API spec must include the `@api` tag in the test metadata.
- The Playwright project named `api` runs only tests tagged `@api`.
- Browser projects (`chromium`, `firefox`, `webkit`) explicitly skip `@api` tests.
- If an API test is missing `@api`, it will run in browser projects by mistake.

Recommended commands:

```bash
# Runs only API-tagged tests once
npx playwright test --project=api

# Runs only UI tests in one browser
npx playwright test --project=chromium
```

---

## 8) Code style and linting

ESLint is configured with:

- TypeScript ESLint flat config
- Playwright plugin rules
- Stylistic plugin rules

Config file: `eslint.config.mjs`

Run lint manually:

```bash
npx eslint .
```

Auto-fix lint issues:

```bash
npx eslint . --fix
```

---

## 9) CI workflow (manual trigger)

Smoke workflow file: `.github/workflows/smoke.yml`

Current behavior:

- Trigger: manual (`workflow_dispatch`)
- Installs dependencies + Playwright dependencies + browsers
- Runs smoke tests: `npx playwright test --grep '@smoke'`
- Uploads artifacts:
	- `playwright-report`
	- `output` directory (if present)

How to run manually in GitHub:

1. Go to **Actions** tab
2. Select **Smoke Tests**
3. Click **Run workflow**

---

## 10) Troubleshooting

### A) "No tests found"

- Verify test files are under `tests/`
- Verify `--grep` tag exists in test titles/tags
- Run without grep first:
	```bash
	npx playwright test
	```

### B) Browser executable missing in CI

Add/run:

```bash
npx playwright install
```

### C) Linux system dependencies missing (especially WebKit)

Add/run:

```bash
npx playwright install-deps
```

## 11) Good practices for contributors

- Keep tests independent and deterministic
- Prefer explicit waits tied to UI/network signals over hard sleeps
- Use page objects for locators and actions, not raw selectors in specs
- Keep tags consistent (`@smoke`, `@regression`, etc.)
- Run locally before opening PR:

```bash
npx playwright test --project=chromium
```

---

## 12) Quick start (copy/paste)

```bash
git clone https://github.com/Escobar-Alejandro/ecomm-demoblaze.git
cd ecomm-demoblaze
npm ci
npx playwright install
```

Windows PowerShell:

```powershell
$env:ENVIRONMENT='prod'; npx playwright test --grep '@smoke'
```

macOS/Linux:

```bash
ENVIRONMENT=prod npx playwright test --grep '@smoke'
```
