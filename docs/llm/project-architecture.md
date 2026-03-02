# Project Architecture

## Overview

This project combines **Feature-Sliced Design (FSD)** for frontend organization with **Clean Architecture** for server-side business logic, connected via **Inversify DI**.

## Layer Hierarchy (imports flow downward only)

```
app/        → Next.js routes, layouts, API handlers
views/      → Page-level compositions
widgets/    → Layout blocks (header, footer, sidebar) + section blocks
features/   → User actions (auth forms, credit purchase)
entities/   → Domain models + server logic (user, payment, credit)
shared/     → Utilities, UI components, services, config
```

## Server-Side Flow

```
Route Handler → Controller → Use Case → Repository (via Interface)
                                      → Adapter (via Interface)
```

- **Controllers**: Parse request, validate, call use cases, format response
- **Use Cases**: Business logic, orchestrate repositories/adapters
- **Repositories**: Data access (Prisma)
- **Adapters**: External service integration (payment gateway, AI)

## Client-Side Flow

```
UI Component → RTK Query Hook → Axios Service → API Route
```

- **RTK Query**: Caching, loading states, auto-refetch
- **Axios Services**: HTTP calls with error normalization

## DI Container

Located at `@/shared/lib/di/container.server.ts`. Binds:
- Repositories (User, Credit, PaymentToken)
- Use Cases (GetCurrentUser, PurchaseCredits, etc.)
- Controllers (GetCurrentUser, PurchaseCredits, etc.)
- Adapters (SecureProcessor payment gateway)
- AI Services (OpenAI, Gemini)

## Section Widget Pattern

Each marketing section follows:
```
section-name/
├── index.ts              — barrel export
├── model/types.ts        — prop interfaces
├── lib/section.mock.ts   — demo content (never in prod)
└── ui/
    ├── section.tsx        — variant switch
    └── variants/
        ├── variant-01.tsx
        └── variant-02.tsx
```
