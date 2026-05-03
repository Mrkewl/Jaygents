# Tech Stack

**Summary**: TypeScript/Next.js frontend, Koa.js backend, Flutter mobile, Terraform on AWS.

---

## Frontend

- **Framework**: Next.js (App Router preferred)
- **Language**: TypeScript (strict mode)
- **Styling**: TBD per project
- **State**: TBD per project (prefer server state via React Query or tRPC before client state)

## Backend

- **Framework**: Koa.js
- **Language**: TypeScript
- **API style**: REST (OpenAPI spec required for all endpoints)
- **Auth**: TBD per project

## Mobile

- **Framework**: Flutter
- **Language**: Dart
- **State management**: TBD per project (prefer Riverpod)

## Infrastructure

- **Cloud**: AWS
- **IaC**: Terraform
- **Prefer**: managed services (RDS, ECS/Fargate, S3, CloudFront) over self-managed

## Defaults (apply unless project overrides)

- TypeScript strict mode everywhere
- Tests required before shipping (Jest for TS, Flutter test for mobile)
- No `any` types without an explicit comment explaining why
- Environment variables via `.env.local` (never committed); secrets via AWS Secrets Manager in prod
- Migrations must include a rollback path

## Patterns to Prefer

- Cursor-based pagination over offset
- Optimistic locking for concurrent writes
- Error responses as typed objects (never raw strings)
- Feature flags before big rollouts

## What to Avoid

- `any` in TypeScript without justification
- Client-side secrets
- Raw SQL without parameterization
- Untyped API responses

## TODO

- Add techstack skills and proper conventions
