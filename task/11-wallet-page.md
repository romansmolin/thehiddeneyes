# Task 11 — Wallet Page

## Goal

Build the wallet page with credit purchase, balance overview, and transaction history.

## Data Flow

```
Wallet Data:
  getWallet() → WalletResponse (balance, transactions)

Credit Purchase:
  purchaseCredits(credits) → { checkoutToken, redirectUrl }
  → Open checkout URL in iframe/modal or redirect
```

## API Endpoints Used

### 1. Get wallet
- `GET /api/credits/wallet`
- Returns:
```json
{
  "wallet": {
    "balance": 500,
    "currency": "EUR",
    "totalPurchased": 1000,
    "totalSpent": 500,
    "pendingCredits": 0
  },
  "transactions": [{
    "id": "tx_123",
    "userId": "user_456",
    "type": "grant",
    "amount": 200,
    "status": "SUCCESSFUL",
    "reason": null,
    "paymentTokenId": "pt_789",
    "createdAt": "2026-03-07T10:00:00Z"
  }],
  "total": 15
}
```

### 2. Purchase credits
- `POST /api/credits/purchase`
- Body: `{ "credits": 200 }`
- Returns:
```json
{
  "checkoutToken": "tok_abc",
  "redirectUrl": "https://payment-gateway.com/checkout/tok_abc"
}
```

### 3. Payment return
After payment, the gateway redirects back to `/wallet?status=successful&token=tok_abc` (or `status=pending` or `status=failed`).

## Features to Build

### 1. Credit purchase service — `src/features/credit-purchase/api/client/services/credit-purchase.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'

export type PurchaseCreditsResponse = {
    checkoutToken: string
    redirectUrl?: string | null
}

export async function purchaseCredits(credits: number): Promise<PurchaseCreditsResponse> {
    const response = await apiClient.post<PurchaseCreditsResponse>('/api/credits/purchase', { credits })
    return response.data
}
```

### 2. Credit purchase hook — `src/features/credit-purchase/model/use-credit-purchase.ts`

```typescript
// Returns:
{
  selectedPreset: number | null       // Selected preset amount
  customAmount: string                // Custom amount input value
  isSubmitting: boolean
  checkoutUrl: string | null          // Payment gateway URL to open
  error: string | null
  selectedCredits: number             // Computed: preset or custom amount
  handlePresetSelect: (amount: number) => void
  handleCustomChange: (value: string) => void
  handlePurchase: () => void
}
```

**Behavior:**
- 3 preset credit packs: 100, 200, 500 credits
- Custom amount input (positive integer)
- Selecting a preset clears custom amount and vice versa
- `handlePurchase`: calls `purchaseCredits(selectedCredits)`
- On success: sets `checkoutUrl` from response's `redirectUrl`
- The checkout URL should be opened in an iframe/modal or new window
- Credit-to-EUR conversion: 1 credit = 0.005 EUR (so 200 credits = 1.00 EUR)

### 3. Credit purchase form — `src/features/credit-purchase/ui/credit-purchase-form.tsx`

**Displays:**
- 3 preset buttons (100, 200, 500 credits) with EUR equivalent
- Custom amount input field
- Summary: "X credits = Y EUR"
- "Purchase" button
- Consent checkbox/modal before proceeding to payment
- After purchase: iframe/modal showing the payment gateway checkout page

### 4. Wallet summary — `src/features/credit-wallet/ui/wallet-summary.tsx`

**Displays wallet stats as cards:**
| Stat | Value | Format |
|------|-------|--------|
| Current Balance | `wallet.balance` | "X credits (Y EUR)" |
| Total Purchased | `wallet.totalPurchased` | "X credits" |
| Total Spent | `wallet.totalSpent` | "X credits" |
| Pending | `wallet.pendingCredits` | "X credits" |

EUR formatting: Use `Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' })`

### 5. Wallet transactions — `src/features/credit-wallet/ui/wallet-transactions.tsx`

**Displays transaction history as a table:**

| Column | Source | Display |
|--------|--------|---------|
| Type | `type` | grant="Purchase", spend="Spent", refund="Refund", adjustment="Adjustment" |
| Amount | `amount` | Positive for grant/refund, negative for spend |
| Status | `status` | Badge: SUCCESSFUL=green, PENDING=yellow, FAILED=red |
| Date | `createdAt` | Formatted date string |

**States:**
- Loading: Skeleton rows
- Empty: "No transactions yet"

### 6. Wallet hook — `src/features/credit-wallet/model/use-wallet.ts`

```typescript
// Returns:
{
  walletData: WalletResponse | null
  isLoading: boolean
  error: string | null
  refreshWallet: () => void
}
```

Fetches wallet data on mount and provides refresh capability.

### 7. Wallet Page View — `src/views/wallet-page/ui/wallet-page.tsx`

**Layout:**
- Two-column grid: Credit Purchase Form + Wallet Summary
- Below: Transaction history table
- Handles payment return query params:
  - `?status=successful` → toast "Payment successful!"
  - `?status=pending` → toast "Payment is being processed"
  - `?status=failed` → toast "Payment failed"

## Structure

```
src/features/credit-purchase/
├── index.ts
├── api/
│   └── client/
│       └── services/
│           └── credit-purchase.service.ts
├── model/
│   └── use-credit-purchase.ts
└── ui/
    └── credit-purchase-form.tsx

src/features/credit-wallet/
├── index.ts
├── api/
│   └── client/
│       └── services/
│           └── wallet.service.ts
├── model/
│   └── use-wallet.ts
└── ui/
    ├── wallet-summary.tsx
    └── wallet-transactions.tsx

src/views/wallet-page/
├── index.ts
└── ui/
    └── wallet-page.tsx
```

## Page Route

Update `src/app/(app)/wallet/page.tsx`:
```typescript
import { WalletPage } from '@/views/wallet-page'

export default function Page() {
    return <WalletPage />
}
```

## Design Notes

- Use shadcn Card for stat cards and purchase form
- Use shadcn Badge for transaction status
- The checkout iframe/modal should be dismissible
- Toast notifications use `sonner` (`toast.success()`, `toast.error()`)
- Use `useSearchParams()` from `next/navigation` to read payment return status
- All components are `'use client'`
