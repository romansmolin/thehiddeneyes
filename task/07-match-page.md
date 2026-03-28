# Task 07 — Match / Discover Page

## Goal

Build the match discovery page where users browse candidates and swipe to like/dislike them, with an optional AI compatibility score.

## Data Flow

```
useDiscoverMatchesQuery (page=1, perPage=20)
  → Returns MatchCandidate[]
  → Display one candidate at a time
  → On swipe: useMatchActionMutation({ userId, action: 'like'|'dislike' })
  → Advance to next candidate
  → Optional: useCompatibilityScoreMutation for current candidate
```

## API Endpoints Used

### 1. Discover candidates
- `GET /api/match/discover?page=0&perPage=20`
- Returns: `{ items: MatchCandidate[], page?, totalPages?, total? }`

### 2. Submit action
- `POST /api/match/action`
- Body: `{ userId: number, action: 'like' | 'dislike' }`
- Returns: `{ result?: string, isMatch?: boolean }`

### 3. Compatibility score
- `POST /api/match/compatibility`
- Body: `{ candidateId, candidateUsername, candidateAge?, candidateGender?, candidateLocation? }`
- Returns: `{ score: number, summary: string, reasons: string[] }`

## Features to Build

### 1. Swipe hook — `src/features/match/swipe/model/use-match-swipe.ts`

Manages the swipe state machine:

```typescript
// Returns:
{
  candidate: MatchCandidate | null  // Current candidate to display
  isLoading: boolean
  feedback: string | null           // Success messages (e.g., "It's a match!")
  error: string | null
  isEmpty: boolean                  // No more candidates
  onSwipe: (action: 'like' | 'dislike') => void
  onReload: () => void              // Refetch candidates
}
```

**Behavior:**
- Fetches candidates with `useDiscoverMatchesQuery({ page: 1, perPage: 20 })`
- Maintains a `currentIndex` into the candidates array
- On swipe: calls `useMatchActionMutation`, then increments index
- If `isMatch` is true in response, shows feedback "It's a match!"
- When all candidates are exhausted, shows empty state
- `onReload` resets index and refetches

### 2. Swipe card component — `src/features/match/swipe/ui/swipe-match-card.tsx`

Displays the current candidate with swipe interaction:

**Props:**
```typescript
{
  candidate: MatchCandidate
  onSwipe: (action: 'like' | 'dislike') => void
}
```

**Displays:**
- Candidate photo (or placeholder if no `photoUrl`)
- Username
- Age (if available)
- Location (if available)

**Interaction (implement one of these):**
- **Drag-to-swipe:** Pointer/touch drag horizontally. 100px threshold triggers like (right) or dislike (left). Show LIKE/NOPE visual stamp while dragging.
- **Button-based:** Like and Dislike buttons below the card (simpler alternative)
- **Both:** Drag + buttons (original implementation does both)

### 3. Compatibility score — `src/features/match/compatibility/ui/compatibility-score.tsx`

**Props:**
```typescript
{
  candidate: MatchCandidate
}
```

**Behavior:**
- Button that triggers `useCompatibilityScoreMutation`
- Sends candidate data to get AI compatibility score
- Displays:
  - Score percentage with color coding:
    - 75%+ → green/emerald
    - 50-74% → amber/yellow
    - Below 50% → red/rose
  - Summary text
  - List of reasons (bullet points)
- Loading state while computing
- Error state with retry

### 4. Match view — `src/views/match-page/ui/match-view.tsx`

Composes the swipe card and compatibility score:
- Shows the swipe card for current candidate
- Shows like/dislike buttons
- Shows compatibility score component for current candidate
- Shows feedback messages (match notification)
- Shows empty state when no candidates remain
- Shows error state with retry

## Structure

```
src/features/match/
├── swipe/
│   ├── index.ts
│   ├── model/
│   │   └── use-match-swipe.ts
│   └── ui/
│       └── swipe-match-card.tsx
└── compatibility/
    ├── index.ts
    └── ui/
        └── compatibility-score.tsx

src/views/match-page/
├── index.ts
└── ui/
    └── match-view.tsx
```

## Page Route

Update `src/app/(app)/match/page.tsx`:
```typescript
import { MatchView } from '@/views/match-page'

export default function Page() {
    return <MatchView />
}
```

## Design Notes

- The card should be prominently displayed in the center
- Like button: Heart icon, green/positive color
- Dislike button: X icon, red/negative color
- The compatibility score can be a secondary action (e.g., Sparkles icon button)
- All components are `'use client'`
