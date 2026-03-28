# Task 05 — App Layout & Sidebar Navigation

## Goal

Build the main app layout with a navigation sidebar/header that wraps all authenticated pages.

## Functional Requirements

The navigation must include 6 items:

| Label | Icon (lucide-react) | Route |
|-------|---------------------|-------|
| Dashboard | `LayoutDashboard` | `/dashboard` |
| Discover | `Heart` | `/match` |
| Chat | `MessageCircle` | `/chat` |
| Gifts | `Gift` | `/gifts` |
| Profile | `User` | `/profile` |
| Wallet | `Wallet` | `/wallet` |

### Behavior

- The current route's nav item should be visually highlighted (active state)
- Navigation should work with Next.js `<Link>` component
- Use `usePathname()` from `next/navigation` to detect the active route
- The layout must include a logo/app name at the top
- The main content area should be scrollable
- Must be responsive

## Structure

```
src/widgets/sidebar/
├── index.ts
└── ui/
    └── sidebar.tsx
```

## Integration

Update the app layout (`src/app/(app)/layout.tsx`) to wrap children with the sidebar:

```typescript
import { redirect } from 'next/navigation'
import { getSession } from '@/shared/lib/auth/get-session'
import SidebarLayout from '@/widgets/sidebar'
import type { Metadata } from 'next'
import { Providers } from '../providers'

export const metadata: Metadata = {
    title: 'YourAppName',
    description: 'Your app description.',
}

export default async function AppLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getSession()
    if (!session) redirect('/auth')

    return (
        <Providers>
            <SidebarLayout>
                <main className="container mx-auto p-4 h-full">{children}</main>
            </SidebarLayout>
        </Providers>
    )
}
```

## Design Notes

- **Design the UI however you want** — the original uses a sticky top bar with inline nav pills, but you can use a left sidebar, bottom nav, hamburger menu, or any layout you prefer
- The key requirement is that all 6 nav items are accessible and the active route is indicated
- Use Tailwind CSS for all styling
- Use shadcn/ui components where appropriate (Button, etc.)

## Verification

- All 6 navigation links work and route correctly
- Active route is visually distinct
- Layout wraps all authenticated pages
- Content area scrolls independently of navigation
