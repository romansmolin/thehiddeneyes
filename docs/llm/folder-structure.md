# Folder Structure

```
new-boiler-plate/
├── prisma/schema.prisma          — Database schema
├── public/assets/                — Static assets
├── docs/llm/                     — LLM documentation
├── src/
│   ├── middleware.ts              — Auth middleware
│   ├── app/
│   │   ├── globals.css            — Tailwind + theme variables
│   │   ├── providers.tsx          — Redux + Toaster providers
│   │   ├── (marketing)/           — Landing page + legal pages
│   │   ├── (auth)/                — Sign in/up, verify email
│   │   ├── (app)/                 — Dashboard, wallet (protected)
│   │   └── api/                   — API route handlers
│   ├── entities/
│   │   ├── user/                  — User domain
│   │   ├── payment/               — Payment domain
│   │   └── credit/                — Credit domain
│   ├── features/
│   │   ├── auth/                  — Sign in/up/out forms
│   │   ├── credit-balance/
│   │   ├── credit-purchase/
│   │   └── credit-wallet/
│   ├── views/
│   │   ├── dashboard-page/
│   │   ├── wallet-page/
│   │   └── landing-page/
│   ├── widgets/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── sidebar/
│   │   ├── auth-tabs/
│   │   └── sections/              — 9 landing page sections
│   └── shared/
│       ├── api/client/            — Axios + RTK Query base
│       ├── components/            — Logo, GenericCard, GenericTabs
│       ├── errors/                — AppError, ErrorCode
│       ├── hooks/                 — useIsMobile
│       ├── http/                  — asyncHandler
│       ├── lib/
│       │   ├── ai/               — OpenAI + Gemini services
│       │   ├── auth/             — BetterAuth config
│       │   ├── css/              — cn() utility
│       │   ├── database/         — Prisma singleton
│       │   ├── di/               — Inversify container
│       │   ├── email/            — SMTP mailer
│       │   ├── storage/          — File storage
│       │   └── validation/       — Zod schemas
│       ├── store/                — Redux store
│       └── ui/                   — shadcn components
```

## Entity Server Module Structure

```
entities/{name}/
├── index.ts
├── model/types.ts
├── ui/                           — Client components (optional)
└── api/
    ├── client/
    │   ├── endpoints.ts          — RTK Query injected endpoints
    │   └── services/             — Axios service functions
    └── server/
        ├── contracts/            — DTOs (Zod schemas)
        ├── controller/           — Request handlers
        ├── interfaces/           — Repository/adapter contracts
        ├── repositories/         — Prisma implementations
        ├── adapters/             — External service adapters
        └── use-cases/            — Business logic
```
