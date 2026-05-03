---
name: test-driven-development
description: Enforces RED-GREEN-REFACTOR discipline. No production code without a failing test first. Iron Law — no exceptions.
---

# Test-Driven Development

## Iron Law

> No production code without a failing test that describes the desired behavior first.

If you have written implementation code before a failing test exists: **delete the implementation code**. Not "add a test after." Delete it. Start at RED.

---

## The Cycle

### RED
Write a test that:
- Describes one specific behavior
- Fails for the right reason (not a compile error — an assertion failure)
- Is named clearly: `should [behavior] when [condition]`

Run the test. Confirm it fails. If it passes without implementation, the test is wrong — rewrite it.

### GREEN
Write the **minimum** code to make the test pass. Nothing more.
- No extra error handling "just in case"
- No abstractions for future use cases
- No cleanup of adjacent code

If the test passes, stop. Move to REFACTOR.

### REFACTOR
Clean up the implementation. The test must still pass after every change.
- Remove duplication
- Clarify naming
- Extract only what the current code actually needs

Then return to RED for the next behavior.

---

## Stack Conventions

**TypeScript / Next.js / Koa**
- Test runner: Jest + `@types/jest`
- File convention: `*.test.ts` co-located with source, or `__tests__/` directory
- API tests: use `supertest` for Koa route handlers
- Mocking: `jest.fn()` for dependencies; never mock the database in integration tests

**Flutter**
- Test runner: `flutter test`
- Unit tests in `test/` mirroring `lib/` structure
- Widget tests for UI components
- Integration tests in `integration_test/`

---

## Red Flags

| You might think... | The rule is... |
|--------------------|----------------|
| "I'll write the test after, I know what it'll look like" | Iron Law. Delete the implementation. Write the test first. |
| "This is too simple to need a test" | Simple code breaks too. Write a simple test. |
| "The test is hard to write, I'll skip it" | Hard-to-test code is a design smell. Redesign, then test. |
| "I'll just test the happy path" | Happy path + one failure case minimum per behavior. |
| "Refactor means add more features" | Refactor means clean up. No new behavior during REFACTOR. |
