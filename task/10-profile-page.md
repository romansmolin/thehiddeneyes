# Task 10 — Profile Page

## Goal

Build a profile settings page where users can view and edit their profile, and optionally get AI-powered improvement suggestions.

## Data Flow

```
useGetUserProfileQuery() → UserProfileResponse
  → Populate form fields
  → User edits fields
  → useUpdateUserProfileMutation(formData) → UpdateProfileResponse

Optional AI Analysis:
  useAnalyzeUserProfileMutation(profileData) → AnalyzeProfileResponse
  → Display advice checklist in dialog
```

## API Endpoints Used

### 1. Get profile
- `GET /api/user/profile`
- Returns:
```json
{
  "user": {
    "id": 123,
    "username": "john_doe",
    "fullName": "John Doe",
    "age": 28,
    "gender": "man",
    "location": "New York",
    "email": "john@example.com",
    "description": "Love hiking and coffee",
    "height": 180,
    "weight": 75,
    "eyeColor": 1,
    "hairColor": 2,
    "situation": 1,
    "silhouette": 2,
    "personality": 3,
    "schedule": 1,
    "orientation": 1,
    "children": 0,
    "education": 3,
    "profession": 5,
    "avatarUrl": "https://...",
    "photos": [{ "large": "...", "medium": "...", "small": "..." }]
  }
}
```

### 2. Update profile
- `PATCH /api/user/profile`
- Body:
```json
{
  "fullName": "John Doe",
  "description": "Updated bio",
  "height": 180,
  "weight": 75,
  "eyeColor": 1,
  "hairColor": 2,
  "situation": 1,
  "silhouette": 2,
  "personality": 3,
  "schedule": 1,
  "orientation": 1,
  "children": 0,
  "education": 3,
  "profession": 5
}
```
- Returns: `{ "accepted": 1 }` or `{ "error": "..." }`

### 3. AI Profile Analysis
- `POST /api/user/profile/analyze`
- Body: Same fields as update (partial)
- Returns:
```json
{
  "summary": "Your profile is 70% complete...",
  "checklist": [{
    "id": "add-photos",
    "title": "Add more photos",
    "priority": "high",
    "category": "photo",
    "reason": "Profiles with 3+ photos get 5x more matches",
    "action": "Upload at least 3 clear photos",
    "example": "A mix of headshot, full body, and activity photo"
  }]
}
```

## Features to Build

### 1. Profile form hook — `src/features/profile/update-profile/model/use-profile-form.ts`

Uses `react-hook-form` to manage form state:

```typescript
// Returns:
{
  form: UseFormReturn                    // react-hook-form instance
  isProfileLoading: boolean
  isSubmitting: boolean
  successMessage: string | null
  errorMessage: string | null
  onSubmit: (data: FormValues) => void
  // AI analysis
  isAnalyzing: boolean
  analysisResult: AnalyzeProfileResponse | null
  isAnalysisDialogOpen: boolean
  setAnalysisDialogOpen: (open: boolean) => void
  handleAnalyze: () => void
}
```

**Behavior:**
- Fetches profile via `useGetUserProfileQuery()`
- Populates form with profile data when loaded (using `form.reset()`)
- On submit: calls `useUpdateUserProfileMutation`
- Converts form values to API payload (string → number for numeric fields)
- Shows success/error messages
- `handleAnalyze`: collects current form values, calls `useAnalyzeUserProfileMutation`

### 2. Profile form component — `src/features/profile/update-profile/ui/profile-form.tsx`

**Form sections:**

**Identity Section:**
- Avatar display (read-only, from profile data)
- Username (read-only)
- Full Name (text input, required)
- Email (text input, optional)
- Description / Bio (textarea)

**Preferences Section (all optional number inputs):**
| Field | Label |
|-------|-------|
| height | Height |
| weight | Weight |
| eyeColor | Eye Color |
| hairColor | Hair Color |
| situation | Relationship Status |
| silhouette | Body Type |
| personality | Personality |
| schedule | Availability |
| orientation | Orientation |
| children | Children |
| education | Education |
| profession | Profession |

**Actions:**
- "Save Profile" button (submit form)
- "Analyze with AI" button (triggers AI analysis)

**AI Analysis Dialog:**
- Opens when analysis completes
- Shows summary text
- Shows checklist items, each with:
  - Title
  - Priority badge (high=red, medium=yellow, low=green)
  - Category badge
  - Reason text
  - Action text
  - Example text (if available)

### 3. Profile View — `src/views/profile-page/ui/profile-view.tsx`

Simple wrapper that renders the profile form.

## Structure

```
src/features/profile/
└── update-profile/
    ├── index.ts
    ├── model/
    │   └── use-profile-form.ts
    └── ui/
        └── profile-form.tsx

src/views/profile-page/
├── index.ts
└── ui/
    └── profile-view.tsx
```

## Page Route

Update `src/app/(app)/profile/page.tsx`:
```typescript
import { ProfileView } from '@/views/profile-page'

export default function Page() {
    return <ProfileView />
}
```

## Design Notes

- Use a two-column layout for identity + preferences, or a single-column tabbed layout
- Use shadcn Input, Textarea, Label, Button, Dialog, Badge components
- Numeric preference fields use `<Input type="number" />`
- The AI analysis dialog can use shadcn Dialog or Sheet
- Loading state: show skeleton for the entire form while profile loads
- All components are `'use client'`
