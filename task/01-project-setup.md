# Task 01 — Project Setup & Dependencies

## Goal

Scaffold a new Next.js 16 project with all required dependencies and base configuration.

## Steps

### 1. Create Next.js project

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
```

### 2. Install dependencies

```bash
# State management & API
npm install @reduxjs/toolkit react-redux axios

# Forms & validation
npm install react-hook-form zod @hookform/resolvers

# UI components
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react motion sonner next-themes
npm install tw-animate-css embla-carousel-react

# shadcn/ui
npx shadcn@latest init --style new-york

# Then add these shadcn components:
npx shadcn@latest add button card dialog badge skeleton input textarea label tabs separator scroll-area avatar dropdown-menu sheet tooltip
```

### 3. Create folder structure

```
src/
├── app/
│   ├── (app)/              # Authenticated routes (Task 04)
│   ├── globals.css
│   └── providers.tsx
├── views/                   # Page compositions
├── widgets/                 # Layout widgets
├── features/                # User actions
├── entities/                # Domain models
└── shared/
    ├── api/
    │   └── client/
    ├── errors/
    ├── hooks/
    ├── lib/
    │   └── css/
    ├── store/
    ├── ui/                  # shadcn components go here
    └── utils/
```

### 4. Configure path aliases in `tsconfig.json`

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. Create `cn()` utility

**File:** `src/shared/lib/css/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Verification

- `npm run dev` starts without errors
- shadcn components are available in `src/shared/ui/`
- Path alias `@/` resolves correctly
