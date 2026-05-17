# Traffic Violation Management

Full-stack monorepo for the traffic violation management system.

## Apps and Packages

- `apps/web`: Next.js frontend
- `apps/api`: NestJS REST API
- `packages/ui`: shared UI components
- `packages/types`: shared TypeScript types
- `packages/eslint-config`: shared ESLint configs
- `packages/typescript-config`: shared TS configs

## Scripts

```sh
pnpm dev
pnpm dev:web
pnpm dev:api
pnpm lint
pnpm check-types
pnpm format
```

## Environment

- `apps/web/.env.example`
- `apps/api/.env.example`
