# Task 09 — Gifts Page

## Goal

Build a gifts page with two sections: a gift shop (buy gifts) and an inventory (owned gifts).

## Data Flow

```
Gift Shop:
  useGetGiftCatalogQuery() → GiftCatalogItem[]
  useBuyGiftMutation({ giftId }) → BuyGiftResponse
  → Invalidates 'Gift' and 'Wallet' tags

Inventory:
  useGetGiftInventoryQuery() → GiftInventoryItem[]
```

## API Endpoints Used

### 1. Gift catalog
- `GET /api/gifts/catalog`
- Returns:
```json
{
  "items": [{
    "id": "clxyz...",
    "slug": "roses",
    "name": "Roses",
    "imagePath": "/gifts-1/Rose.png",
    "priceCoins": 50
  }]
}
```

### 2. Buy gift
- `POST /api/gifts/buy`
- Body: `{ "giftId": "clxyz..." }`
- Returns:
```json
{
  "giftId": "clxyz...",
  "purchasedQuantity": 1,
  "inventoryQuantity": 3,
  "spentCoins": 50,
  "remainingBalance": 450
}
```

### 3. Gift inventory
- `GET /api/gifts/inventory`
- Returns:
```json
{
  "items": [{
    "giftId": "clxyz...",
    "giftName": "Roses",
    "giftImagePath": "/gifts-1/Rose.png",
    "quantity": 3,
    "updatedAt": "2026-03-07T10:00:00Z"
  }]
}
```

## Features to Build

### 1. Buy gift hook — `src/features/gifts/buy-gift/model/use-buy-gift.ts`

```typescript
// Returns:
{
  buyingGiftId: string | null         // Which gift is currently being purchased
  successMessage: string | null
  errorMessage: string | null
  handleBuy: (giftId: string) => void
}
```

**Behavior:**
- Calls `useBuyGiftMutation` with the gift ID
- On success: shows message like "Gift purchased! Remaining balance: X credits"
- On error: shows error message from API
- Tracks which gift ID is loading (for per-card loading state)
- Clears previous messages on new purchase attempt

### 2. Gift Shop Section

**Displays gift catalog in a grid:**
- Each card shows:
  - Gift image (use `resolveGiftImagePath({ slug, imagePath })`)
  - Gift display name (use `resolveGiftDisplayName({ slug, imagePath, fallbackName: name })`)
  - Price in coins
  - Buy button
- Buy button shows loading spinner for the specific gift being purchased
- Success/error messages displayed at the top of the section

**States:**
- Loading: Skeleton cards
- Error: Error message with retry
- Empty: "No gifts available"

### 3. Current Gifts Section (Inventory)

**Displays user's gift inventory in a grid:**
- Each card shows:
  - Gift image
  - Gift display name
  - Quantity badge (e.g., "x3")
  - "Updated" timestamp
- Items sorted by `updatedAt` descending (most recently acquired first)

**States:**
- Loading: Skeleton cards
- Error: Error message with retry
- Empty: "You don't own any gifts yet"

### 4. Gifts View — `src/views/gifts-page/ui/gifts-view.tsx`

Composes both sections vertically:
- Gift Shop section on top
- Current Gifts section below

## Structure

```
src/features/gifts/
└── buy-gift/
    ├── index.ts
    └── model/
        └── use-buy-gift.ts

src/views/gifts-page/
├── index.ts
└── ui/
    ├── gifts-view.tsx
    └── components/
        ├── gift-shop-section.tsx
        ├── gift-shop-card.tsx
        ├── current-gifts-section.tsx
        └── current-gift-card.tsx
```

## Page Route

Update `src/app/(app)/gifts/page.tsx`:
```typescript
import { GiftsView } from '@/views/gifts-page'

export default function Page() {
    return <GiftsView />
}
```

## Gift Image Resolution

Use the utility from `@/entities/gift/lib/resolve-gift-image-path`:

```typescript
import { resolveGiftImagePath } from '@/entities/gift/lib/resolve-gift-image-path'

// For catalog items:
const imageSrc = resolveGiftImagePath({ slug: item.slug, imagePath: item.imagePath })

// For inventory items (derive slug from giftId or use imagePath directly):
const imageSrc = resolveGiftImagePath({ imagePath: item.giftImagePath })
```

## Design Notes

- Use a responsive grid for gift cards (2-4 columns depending on screen width)
- Gift images should be displayed at a consistent size
- The buy button should be clearly visible on each card
- Use shadcn Card components
- All components are `'use client'`
