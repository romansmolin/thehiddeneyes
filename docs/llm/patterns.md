# Patterns

## Frontend

- **Composition**: Widgets compose entity UI + feature actions
- **Generic Wrappers**: Use `GenericCard`, `GenericTabs` from `@/shared/components`
- **Logic in Hooks**: Extract complex state logic into custom hooks
- **Props-Driven Sections**: All section widgets accept props; mock data provides defaults

## Backend

- **DI with Inversify**: `@injectable()` + `@inject()` decorators
- **Repository Pattern**: All DB access behind interfaces
- **Adapter Pattern**: External services behind interfaces
- **Use Case Pattern**: One class per business operation

## Anti-Patterns (Do NOT)

- No Prisma outside `repositories/`
- No business logic in route handlers
- No direct Axios calls from UI components (use RTK Query hooks)
- No entity importing from features
- No `style={{}}` — Tailwind only
- No deep cross-slice imports (use barrel exports)
