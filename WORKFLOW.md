# FE-03 / FE-04 Workflow Analysis: AI Prompting Drill

## Overview
This report evaluates the engineering delta between two AI development workflows applied to a User Profile & Account Settings Form:
- **Round One (`feat/round-1-vague`)**: Generated from a single, unguided prompt ("*Build a user settings page with validation*").
- **Round Two (`feat/round-2-precise`)**: Built using an explore-plan-code loop with explicit architectural constraints, Zod schema validation, ARIA accessibility bindings, and co-located Vitest unit tests.

---

## Comparative Analysis & Specific Code Diffs

### 1. Correctness & Architecture
- **Round One (`src/components/SettingsFormVague.tsx`)**: Created 8 individual `useState` hooks (`name`, `username`, `email`, `bio`, etc.) with manual inline validation inside `handleSubmit`. The validation checked basic string presence but allowed whitespace-only inputs and invalid character strings (e.g., spaces in usernames).
- **Round Two (`src/schemas/settingsSchema.ts` & `src/components/SettingsFormPrecise.tsx`)**: Implemented a unified Zod schema with strict regex rules (`/^[a-zA-Z0-9_]+$/` for usernames, RFC-compliant email validation, and refined password matching). Form state was managed via `react-hook-form`, eliminating unnecessary re-renders.

### 2. Accessibility (ARIA & Screen Reader Compliance)
- **Round One**: Zero ARIA attributes. Error messages were plain `<span>` tags rendered conditionally without `role="alert"` or `aria-describedby` associations. Screen readers could not announce validation errors when inputs lost focus or when form submission failed.
- **Round Two**: Fully accessible. Inputs explicitly bind `aria-invalid={!!errors[field]}` and `aria-describedby="${field}-error"`. Error elements include `role="alert"`, and form submission outcomes trigger a `role="status" aria-live="polite"` toast notification. Dark/light theme toggles use `aria-pressed`.

### 3. Edge Cases & Error Handling
- **Round One**: Failed on edge cases. Password updates allowed 4-character weak passwords without requiring the current password. Bio text had no character counter or upper bound limit. Async submission lacked loading indicators (`isSubmitting`), allowing duplicate rapid button clicks.
- **Round Two**: Solved edge cases. Zod `.refine()` blocks enforce that setting a new password requires the current password and a minimum of 8 characters. Bio input includes a real-time character counter (`watch('bio').length / 200`) and visually highlights warning states when approaching the limit. The save button displays a spinning `Loader2` indicator and disables interaction during async operations.

---

## Review Effort & Total Time Comparison
- **Round One**: Generating initial code took ~30 seconds. However, manual code review, refactoring scattered state, fixing validation bugs, adding missing ARIA attributes, and writing tests from scratch required **~45 minutes of developer fixing effort**.
- **Round Two**: Drafting the initial spec and plan mode took ~5 minutes. Code generation, Zod schema definition, and Vitest suite creation ran in ~4 minutes. Verifying passing tests took 1 minute. Total end-to-end time was **~10 minutes with zero code rewrite required**.

---

## AI Mistake Caught During Drill
In Round One, the model generated an inline password check:
```typescript
if (newPassword && newPassword.length < 4) errs.newPassword = 'Password short';
```
**The Mistake**: The AI allowed users to set a new password without providing their current password, creating a critical security vulnerability. In Round Two's precise prompt, explicit schema refinement constraints forced the AI to generate a multi-field Zod `.refine()` check requiring `currentPassword` whenever `newPassword` is present.
