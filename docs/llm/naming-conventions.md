# Naming Conventions

## Files & Folders

- **kebab-case** for all files and folders: `get-current-user.controller.ts`
- **Never** use camelCase or snake_case for file names

## Server Module Suffixes

| Suffix | Example |
|--------|---------|
| `*.controller.ts` | `get-current-user.controller.ts` |
| `*.usecase.ts` | `get-current-user.usecase.ts` |
| `*.interface.ts` | `user-repository.interface.ts` |
| `*.repository.ts` | `prisma-user.repository.ts` |
| `*.adapter.ts` | `secure-processor.adapter.ts` |
| `*.dto.ts` | `purchase-credits.dto.ts` |
| `*.service.ts` | `sign-in.service.ts` |

## Components

- **PascalCase** for React components: `SignInForm`, `HeroSection`
- **kebab-case** for component file names: `sign-in-form.tsx`

## Variables & Functions

- **camelCase**: `getCurrentUser`, `handleSubmit`
- **UPPER_SNAKE_CASE**: Constants and env vars: `DI_TOKENS`, `DATABASE_URL`

## Section Variants

- File pattern: `variant-01.tsx`, `variant-02.tsx`
- Type pattern: `'variant-01' | 'variant-02'`

## RTK Query

- Hooks: `useGetCurrentUserQuery`, `usePurchaseCreditsMutation`
- Endpoint names: `getCurrentUser`, `purchaseCredits`
