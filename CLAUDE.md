# CLAUDE.md

**Purpose**: Define how Claude (and other LLM agents) must work inside this repository.
**Last Updated**: 2026-02-24

## How to Work in This Repo

-   Make the smallest change that satisfies the request.
-   Reuse existing patterns and utilities before introducing new ones.
-   Do not create, delete, or rename files unless explicitly requested.
-   Do not introduce new dependencies without explicit approval.
-   Do not refactor unrelated areas.

## Architecture

-   **FSD (Feature-Sliced Design)**: `shared/` → `entities/` → `features/` → `widgets/` → `views/` → `app/`
-   **Clean Architecture** on server: Route → Controller → Use-case → Interface → Repository/Adapter
-   **DI with Inversify**: All server dependencies are resolved via the IoC container at `@/shared/lib/di/container.server.ts`

## Key Rules

-   **Imports flow downward only**: `app/` → `views/` → `widgets/` → `features/` → `entities/` → `shared/`
-   **Barrel exports**: Cross-slice imports only via `index.ts` (e.g., `import { X } from '@/entities/user'`)
-   **No inline styles**: Tailwind CSS only. No `style={{}}` attributes.
-   **No Prisma in UI**: Prisma is only used inside `repositories/` directories.
-   **No business logic in route handlers**: Route handlers delegate to controllers.
-   **kebab-case** for all file and folder names.
-   **Section widgets** follow the variant pattern: `ui/variants/variant-01.tsx`

## Docs Map

-   [Project Tech Stack](./docs/llm/project-tech-stack.md)
-   [Project Architecture](./docs/llm/project-architecture.md)
-   [Folder Structure](./docs/llm/folder-structure.md)
-   [Naming Conventions](./docs/llm/naming-conventions.md)
-   [Patterns](./docs/llm/patterns.md)
-   [Error Handling](./docs/llm/error-handling.md)
-   [Setup and Commands](./docs/llm/setup-and-commands.md)
