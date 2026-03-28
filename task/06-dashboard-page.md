# Task 06 — Dashboard Page

## Goal

Build the main dashboard page that shows an overview of the user's account.

## Data Sources

The dashboard uses data from multiple APIs:

### 1. Wallet data
- **Hook:** Custom hook calling `GET /api/credits/wallet`
- **Service:** `src/features/credit-wallet/api/client/services/wallet.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'

export type WalletSummary = {
    balance: number
    currency: string
    totalPurchased: number
    totalSpent: number
    pendingCredits: number
}

export type CreditTransaction = {
    id: string
    userId: string
    type: 'grant' | 'spend' | 'refund' | 'adjustment'
    amount: number
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED'
    reason: string | null
    generationId: string | null
    paymentTokenId: string | null
    createdAt: string
}

export type WalletResponse = {
    wallet: WalletSummary
    transactions: CreditTransaction[]
    total: number
}

export async function getWallet(): Promise<WalletResponse> {
    const response = await apiClient.get<WalletResponse>('/api/credits/wallet')
    return response.data
}
```

### 2. Discover matches
- **Hook:** `useDiscoverMatchesQuery` from `@/entities/match`
- Fetches paginated match candidates

### 3. Gift inventory
- **Hook:** `useGetGiftInventoryQuery` from `@/entities/gift`

## Sections to Display

### Stats Row (3 cards)
| Stat | Source | Display |
|------|--------|---------|
| Balance | `wallet.balance` | Number of credits |
| Gifts Owned | `giftInventory.items.length` | Count |
| Total Spent | `wallet.totalSpent` | Number of credits |

### Quick Links (4 cards)
| Label | Icon | Route |
|-------|------|-------|
| Buy Tokens | `Wallet` | `/wallet` |
| Discover | `Heart` | `/match` |
| Messages | `MessageCircle` | `/chat` |
| Profile | `User` | `/profile` |

Each quick link is a clickable card that navigates to the target route.

### Top Members Section
- Shows up to 6 members from the discover API (`useDiscoverMatchesQuery`)
- Each member card shows: photo, username, age (if available)
- "View All" link to `/match`
- Clicking a member could navigate to `/match`

### Recent Activity Section
- Shows last 5 transactions from wallet data
- Each row: transaction type label, amount (with +/- sign), date
- "View All" link to `/wallet`
- Transaction type labels:
  - `grant` → "Purchase"
  - `spend` → "Generation" or "Spent"
  - `refund` → "Refund"
  - `adjustment` → "Adjustment"

## Structure

```
src/views/dashboard-page/
├── index.ts
└── ui/
    └── dashboard-page.tsx
```

## Page Route

Update `src/app/(app)/dashboard/page.tsx`:
```typescript
import { DashboardPage } from '@/views/dashboard-page'

export default function Page() {
    return <DashboardPage />
}
```

## States to Handle

- **Loading:** Show skeleton placeholders while data loads
- **Error:** Show error message with retry button
- **Empty:** Show appropriate empty state messages

## Design Notes

- Design the layout however you want — the original uses a grid layout
- Use shadcn Card components for stat cards and sections
- All data is fetched client-side via RTK Query hooks
- The page component should be marked `'use client'`
