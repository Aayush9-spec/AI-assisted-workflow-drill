# Project Engineering Rules & AI Prompting Constraints (`CLAUDE.md`)

This repository documents production rules derived from comparing single-prompt unguided AI outputs against spec-driven explore-plan-code workflows.

---

## Mandatory Project Rules

### 1. Strict Schema-Driven Form Management (`react-hook-form` + `zod`)
- **Rule**: All interactive forms must be built using `react-hook-form` bound with `@hookform/resolvers/zod` and co-located Zod validation schemas (`src/schemas/*.ts`).
- **Forbidden**: Scatter-state implementations using multiple raw `useState` hooks for individual form inputs or manual inline `if (!field)` validation inside `handleSubmit`.
- **Review Verification**: Any PR adding form inputs without a co-located Zod schema or using un-wrapped `useState` for form fields must fail review.

### 2. Mandatory ARIA Accessibility & Live Region Bindings
- **Rule**: Every input element must explicitly bind:
  1. `aria-invalid={!!errors[fieldName]}`
  2. `aria-describedby={errors[fieldName] ? '${fieldName}-error' : undefined}`
  3. Error messages rendered with `id="${fieldName-error}" role="alert"`.
  4. Form submission status announcements rendered in a top-level `role="status" aria-live="polite"` element.
- **Forbidden**: Color-only error indicators or unlinked `<span>` error strings without `role="alert"` or `aria-describedby`.
- **Review Verification**: Automated a11y DOM inspection checking `aria-invalid` and `aria-describedby` linkage on errored inputs.

### 3. Co-located Automated Test Suite Coverage
- **Rule**: Every new UI feature or component must include a co-located Vitest + `@testing-library/react` unit test file (`*.test.tsx`) asserting:
  1. Default field rendering and initial state.
  2. Validation error rendering upon invalid input or empty submission.
  3. Successful submit handler trigger and accessible feedback rendering.
- **Forbidden**: Merging UI components without co-located unit test files or skipping test execution (`npm test`).
- **Review Verification**: CI pipeline executing `npm test && npm run build` with zero tolerance for failing or missing test suites.
