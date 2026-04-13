# Cypress Automation — Saucedemo QA Task

A small Cypress test suite against [Saucedemo](https://www.saucedemo.com). The suite covers the critical user journey (login → browse → purchase) plus targeted smoke tests.


## Prerequisites

- Node.js 18+ (tested on Node 24)
- npm 9+

## Setup

```bash
git clone https://github.com/syeda-tabassum-rahaman/cypress-saucedemo-qa-task.git
cd cypress-task
npm install
```

## Running the tests

```bash
npm run cy:open      # Interactive GUI (recommended for development and demos)
npm run smoke        # Smoke suite only (3 tests, ~15s)
npm run regression   # Regression suite only (1 test, ~10s)
npm test             # Full suite, headless
```


## Test strategy

I treated test selection as a **risk-based budgeting exercise**: with only 4 tests, each one had to cover a risk no other test covered.

| # | Test | Suite | Risk it protects |
|---|------|-------|------------------|
| 1 | Valid login | Smoke | Authentication broken → app unusable |
| 2 | Locked-out user | Smoke | Security/error-handling regression |
| 3 | Sort by price (both directions) | Smoke | Core business logic |
| 4 | Full purchase (end-to-end) | Regression | Revenue path broken |

**Smoke** = fast liveness checks, run on every build.
**Regression** = deeper user journeys, run on a slower cadence.


## Project structure

```text
cypress/
  e2e/
    regression/
      full-purchase.cy.js
    smoke/
      locked-out-user.cy.js
      sort-by-price.cy.js
      valid-login.cy.js
  fixtures/
    users.json
  support/
    pages/
      CheckoutPage.js
      InventoryPage.js
      LoginPage.js
    commands.js
    e2e.js

cypress.config.js
package.json
package-lock.json
.gitignore
```
## Design choices

**Page Object Model** — Selectors and page-specific actions live in page objects. Tests describe *what* the user does; the page object owns *how*. One selector change = one file edit.

**`data-test` selectors** — I use `[data-test="..."]` attributes exclusively. They exist for testing, so they're stable across CSS/structural refactors that would break ID or class selectors.

**Fixtures for test data** — Users and shipping info live in `cypress/fixtures/users.json`, not in test code. Swapping environments or user roles is a JSON edit, not a code change.

**`cy.login()` custom command** — Tests where login is a *precondition* (not the focus) use `cy.login()` for one-line setup. Test 2 drives the login form directly because login failure *is* what it tests — different intent, different pattern.

**Separation of smoke vs regression** — Folder structure maps to test tier, which maps to CI cadence. Smoke runs on every commit; regression runs on merge to main. Expressed in the folder tree so the strategy is visible without reading docs.


## What I deliberately did NOT do

- **Visual regression testing** — Saucedemo has a `problem_user` with broken images, but visual diffs need a dedicated tool (Percy, Applitools). Out of scope for this exercise.
- **API-level auth in `cy.login()`** — In a real product I'd hit the auth endpoint directly and cache the session with `cy.session()`. Saucedemo doesn't expose one, so I drove the form.
- **A test per login user variant** — `problem_user`, `performance_glitch_user`, etc. add diminishing coverage. Better handled as targeted exploratory tests.
- **CI pipeline (GitHub Actions)** — Possible extension; scoped out for time.
- **An auth-guard test** (`/inventory.html` when logged out) — I explored this and noted Saucedemo's guard is client-side only. Raising the behaviour with the dev team would precede writing an assertion.


## Tech

- Cypress 15
- Node 24
- Page Object Model + custom commands
