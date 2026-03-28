# Task 04 — Authentication, Auth Pages, Middleware & Logout

## Goal

Build the complete authentication system: sign-in form, sign-up form, logout, middleware route protection, and session management. This is the entry point — without this, you cannot access any inner platform page.

---

## How Auth Works — Full Flow

### Sign-Up Flow (step by step)

```
1. User fills out sign-up form in browser
2. Frontend calls:  POST /api/auth/sign-up
   Body: { username, password, email, gender, lookingFor, dateOfBirth, city? }

3. Backend route handler (src/app/api/auth/sign-up/route.ts):
   a. Validates body with Zod
   b. Calls externalAuthService.signUp() which sends POST to:
      https://api.fotochat.com/index_api/subscribe
      with query params: login, pass, mail, sex, cherche1, birthday_date, api_key, etc.
   c. External API returns: { accepted: 1, session_id: "abc123", user_id: "456", lang: "en" }
   d. Backend sets cookies on the response:
      - dating_session_id = "abc123"     (httpOnly, 30 days maxAge)
      - dating_user_id = "456"           (httpOnly, 30 days maxAge)
      - dating_lang = "en"               (httpOnly, 30 days maxAge)
   e. Backend sends welcome email (async, non-blocking)
   f. Returns JSON: { accepted: 1, sessionId: "abc123", userId: "456", lang: "en" }

4. Frontend receives response + cookies are set by browser automatically
5. Frontend redirects to /dashboard
6. Middleware sees dating_session_id cookie → allows access
```

### Sign-In Flow (step by step)

```
1. User fills out sign-in form
2. Frontend calls:  POST /api/auth/sign-in
   Body: { username, password, rememberMe? }

3. Backend route handler (src/app/api/auth/sign-in/route.ts):
   a. Validates body with Zod
   b. Calls externalAuthService.signIn() which sends POST to:
      https://api.fotochat.com/index_api/login
      with query params: login, pass, rememberme, browser, api_key
   c. External API returns: { connected: 1, session_id: "xyz789", user_id: "456", token_login: "tok", lang: "en" }
   d. Backend sets cookies on the response:
      - dating_session_id = "xyz789"
      - dating_user_id = "456"
      - dating_token_login = "tok"       (if present)
      - dating_lang = "en"               (if present)
      Cookie options: httpOnly, sameSite: 'lax', secure (in prod), maxAge: 30 days (or session if rememberMe=false)
   e. Returns JSON: { connected: 1, sessionId: "xyz789", userId: "456", tokenLogin: "tok", lang: "en" }

4. Frontend receives response + cookies are set automatically
5. Frontend redirects to /dashboard
```

### Sign-Out Flow

```
1. Frontend calls:  POST /api/auth/sign-out
2. Backend clears ALL session cookies (sets maxAge: 0):
   - dating_session_id = ""
   - dating_user_id = ""
   - dating_lang = ""
   - dating_token_login = ""
3. Returns: { ok: true }
4. Frontend redirects to /auth

Note: The logout also calls Better Auth's signOut() on the client side
to clear the better-auth.session_token cookie (if one exists).
```

### Session Check (how middleware knows you're logged in)

The middleware checks for cookies — NO API call is made:
```
Has 'better-auth.session_token' cookie?  → authenticated
Has 'dating_session_id' cookie?          → authenticated
Neither?                                 → redirect to /auth
```

The server-side layout (`getSession()`) does the same check plus can optionally validate the Better Auth token against the database.

---

## Cookie Reference

| Cookie Name | Set By | Max Age | Used For |
|---|---|---|---|
| `dating_session_id` | `/api/auth/sign-in`, `/api/auth/sign-up` | 30 days | All dating API proxy calls (match, chat, profile). This is the **primary session cookie**. |
| `dating_user_id` | `/api/auth/sign-in`, `/api/auth/sign-up` | 30 days | Identifying the user in compatibility scoring and profile fetching |
| `dating_token_login` | `/api/auth/sign-in` (optional) | 30 days | Token-based re-authentication (backend internal) |
| `dating_lang` | `/api/auth/sign-in`, `/api/auth/sign-up` (optional) | 30 days | User language preference |
| `better-auth.session_token` | Better Auth (`/api/auth/[...auth]`) | 7 days | Gifts, credits, wallet, payment endpoints |

**Critical:** The `dating_session_id` cookie is the one that matters most. Without it, match/chat/profile APIs will fail. The sign-in and sign-up route handlers set this cookie on the **response** — the browser stores it automatically because the Axios client uses `withCredentials: true`.

---

## Files to Create

### 1. Auth types — `src/shared/lib/auth/external-auth.types.ts`

```typescript
export const GENDER_VALUES = ['man', 'woman', 'non_binary', 'other'] as const
export type Gender = (typeof GENDER_VALUES)[number]

export const LOOKING_FOR_VALUES = ['man', 'women', 'couple', 'other'] as const
export type LookingFor = (typeof LOOKING_FOR_VALUES)[number]
```

### 2. Validation schemas — `src/shared/lib/validation/common-schemas.ts`

```typescript
import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .toLowerCase()
  .trim()

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must not exceed 100 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
```

### 3. Better Auth client — `src/shared/lib/auth/auth-client.ts`

```typescript
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
})

export const { signIn, signUp, signOut, useSession, $fetch } = authClient
```

**Dependency:** `npm install better-auth` (used client-side for session management and Google OAuth)

### 4. Session check — `src/shared/lib/auth/get-session.ts`

```typescript
import { cookies } from 'next/headers'

export async function getSession() {
    const cookieStore = await cookies()

    // 1. Check dating session cookies (primary auth)
    const datingSessionId = cookieStore.get('dating_session_id')?.value
    const datingUserId = cookieStore.get('dating_user_id')?.value

    if (datingSessionId && datingUserId) {
        return {
            session: { id: datingSessionId, userId: datingUserId },
            user: { id: datingUserId },
        }
    }

    // 2. Fallback to BetterAuth session
    const secureSessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value
    const sessionToken = cookieStore.get('better-auth.session_token')?.value
    const token = secureSessionToken ?? sessionToken

    if (!token) return null

    // If you need to validate against DB, import auth from auth.config.ts
    // For now, just confirm the cookie exists
    return {
        session: { id: token, userId: 'bauth' },
        user: { id: 'bauth' },
    }
}
```

### 5. Middleware — `src/middleware.ts`

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const betterAuthToken = request.cookies.get('better-auth.session_token')?.value
    const datingSessionId = request.cookies.get('dating_session_id')?.value
    const hasSession = Boolean(betterAuthToken ?? datingSessionId)

    const isProtectedRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/wallet') ||
        pathname.startsWith('/match') ||
        pathname.startsWith('/chat') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/gifts')
    const isAuthRoute = pathname.startsWith('/auth')

    if (isProtectedRoute && !hasSession) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (isAuthRoute && hasSession) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api|gifts-1|gifts-2|gifts-3).*)'],
}
```

---

## Sign-In Feature

### DTO — `src/features/auth/auth-sign-in/contracts/sign-in.dto.ts`

```typescript
import { z } from 'zod'

export const signInSchema = z.object({
    username: z.string().trim().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().default(false),
    consent: z.boolean().refine((value) => value, {
        message: 'Consent is required',
    }),
})

export type SignInFormValues = z.input<typeof signInSchema>
export type SignInDto = z.output<typeof signInSchema>
```

### Service — `src/features/auth/auth-sign-in/api/client/services/sign-in.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type { SignInDto } from '@/features/auth/auth-sign-in/contracts/sign-in.dto'

export interface SignInResponse {
    connected: 1
    sessionId: string
    userId: string
    tokenLogin?: string
    lang?: string
}

export async function signIn(data: SignInDto): Promise<SignInResponse> {
    const { consent: _consent, ...payload } = data
    const response = await apiClient.post<SignInResponse>('/api/auth/sign-in', {
        username: payload.username.trim(),
        password: payload.password,
        rememberMe: payload.rememberMe,
    })
    return response.data
}
```

**What happens:** The Axios call to `/api/auth/sign-in` returns a response. The **backend sets cookies on that response** (`Set-Cookie` headers). The browser stores them because `withCredentials: true`. From this point on, every subsequent Axios request includes those cookies automatically.

### RTK Query Endpoint — `src/features/auth/auth-sign-in/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { signIn, SignInResponse } from './services/sign-in.service'
import { SignInDto } from '@/features/auth/auth-sign-in/contracts/sign-in.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'

export const signInApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInDto>({
            queryFn: async (data) => {
                try {
                    const result = await signIn(data)
                    return { data: result }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Auth', 'User'],
        }),
    }),
})

export const { useSignInMutation } = signInApi
```

### Form Component — `src/features/auth/auth-sign-in/ui/sign-in-form.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useSignInMutation } from '../api/client/endpoints'
import { SignInDto, SignInFormValues, signInSchema } from '@/features/auth/auth-sign-in/contracts/sign-in.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export function SignInForm() {
    const router = useRouter()
    const [signIn, { isLoading }] = useSignInMutation()
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues, unknown, SignInDto>({
        resolver: zodResolver(signInSchema),
        defaultValues: { username: '', password: '', rememberMe: false, consent: false },
    })

    const onSubmit = async (data: SignInDto) => {
        try {
            setError(null)
            await signIn(data).unwrap()
            // After this call succeeds, cookies are already set by the browser.
            // Now we redirect — middleware will see the cookies and allow access.
            router.push('/dashboard')
        } catch (err) {
            const normalized = normalizeError(err)
            setError(normalized.message)
        }
    }

    // Render form with: username input, password input, rememberMe checkbox,
    // consent checkbox (required), submit button, error display
    // Design the UI however you want.
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <div className="text-sm text-destructive">{error}</div>}

            <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="your.username" autoComplete="username" {...register('username')} />
                {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" autoComplete="current-password" {...register('password')} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <div className="flex items-center gap-2">
                <input id="rememberMe" type="checkbox" {...register('rememberMe')} />
                <Label htmlFor="rememberMe">Keep me signed in</Label>
            </div>

            <div className="flex items-start gap-2">
                <input id="consent" type="checkbox" {...register('consent')} />
                <Label htmlFor="consent">
                    I agree to the Terms of Service, Privacy Policy, and Return Policy.
                </Label>
            </div>
            {errors.consent && <p className="text-sm text-destructive">{errors.consent.message}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
        </form>
    )
}
```

### Barrel — `src/features/auth/auth-sign-in/index.ts`

```typescript
export { SignInForm } from './ui/sign-in-form'
export { useSignInMutation } from './api/client/endpoints'
```

---

## Sign-Up Feature

### DTO — `src/features/auth/auth-sign-up/contracts/sign-up.dto.ts`

```typescript
import { z } from 'zod'
import { emailSchema, passwordSchema } from '@/shared/lib/validation/common-schemas'
import { GENDER_VALUES, LOOKING_FOR_VALUES } from '@/shared/lib/auth/external-auth.types'

export const signUpSchema = z.object({
    username: z.string().trim().min(1, 'Username is required'),
    email: emailSchema,
    password: passwordSchema,
    gender: z.enum(GENDER_VALUES),
    lookingFor: z.enum(LOOKING_FOR_VALUES),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    city: z.string().trim()
        .refine((value) => value === '' || /^\d+$/.test(value), { message: 'City must be numeric' })
        .optional(),
    consent: z.boolean().refine((value) => value, { message: 'Consent is required' }),
})

export type SignUpDto = z.infer<typeof signUpSchema>
```

### Service — `src/features/auth/auth-sign-up/api/client/services/sign-up.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type { SignUpDto } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'

export interface SignUpResponse {
    accepted: 1
    sessionId: string
    userId: string
    lang?: string
}

export async function signUp(data: SignUpDto): Promise<SignUpResponse> {
    const { consent: _consent, ...payload } = data
    const response = await apiClient.post<SignUpResponse>('/api/auth/sign-up', {
        username: payload.username.trim(),
        email: payload.email,
        password: payload.password,
        gender: payload.gender,
        lookingFor: payload.lookingFor,
        dateOfBirth: payload.dateOfBirth,
        city: payload.city?.trim() || undefined,
    })
    return response.data
}
```

### RTK Query Endpoint — `src/features/auth/auth-sign-up/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { signUp, SignUpResponse } from './services/sign-up.service'
import { SignUpDto } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'

export const signUpApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpResponse, SignUpDto>({
            queryFn: async (data) => {
                try {
                    const result = await signUp(data)
                    return { data: result }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Auth', 'User'],
        }),
    }),
})

export const { useSignUpMutation } = signUpApi
```

### Form Component — `src/features/auth/auth-sign-up/ui/sign-up-form.tsx`

Sign-up form fields:

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| username | text | min 1 char | Yes |
| email | email | valid email | Yes |
| password | password | min 8, uppercase, lowercase, number | Yes |
| gender | select | 'man', 'woman', 'non_binary', 'other' | Yes |
| lookingFor | select | 'man', 'women', 'couple', 'other' | Yes |
| dateOfBirth | date | non-empty string | Yes |
| city | text | numeric string | No |
| consent | checkbox | must be true | Yes |

On success: `router.push('/dashboard')` — same as sign-in, cookies are already set.

### Barrel — `src/features/auth/auth-sign-up/index.ts`

```typescript
export { SignUpForm } from './ui/sign-up-form'
export { useSignUpMutation } from './api/client/endpoints'
```

---

## Logout Feature

### Service — `src/features/auth/auth-logout/api/client/services/logout.service.ts`

```typescript
import { authClient } from '@/shared/lib/auth/auth-client'

export async function logout(): Promise<void> {
    // This clears the better-auth.session_token cookie
    const response = await authClient.signOut()
    if (response.error) {
        throw new Error(response.error.message || 'Logout failed')
    }
}
```

**Important:** This only clears the Better Auth cookie. The dating session cookies (`dating_session_id`, etc.) are cleared by calling `POST /api/auth/sign-out` which is a separate endpoint. In the current implementation, the logout button calls the Better Auth signOut. For complete logout, you should also call `/api/auth/sign-out` to clear dating cookies.

### RTK Query Endpoint — `src/features/auth/auth-logout/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { logout } from './services/logout.service'
import { normalizeError } from '@/shared/api/client/error-normalizer'

export const logoutApi = api.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<void, void>({
            queryFn: async () => {
                try {
                    await logout()
                    return { data: undefined }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return {
                        error: {
                            status: 'CUSTOM_ERROR' as const,
                            data: normalized,
                            error: normalized.message,
                        },
                    }
                }
            },
            invalidatesTags: ['Auth', 'User'],
        }),
    }),
})

export const { useLogoutMutation } = logoutApi
```

### Button — `src/features/auth/auth-logout/ui/logout-button.tsx`

```typescript
'use client'

import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '../api/client/endpoints'
import { Button } from '@/shared/ui/button'

export function LogoutButton() {
    const router = useRouter()
    const [logout, { isLoading }] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logout().unwrap()
            router.push('/auth')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
    )
}
```

---

## Auth Page & Layout

### Auth layout — `src/app/(auth)/layout.tsx`

```typescript
import type { Metadata } from 'next'
import { Providers } from '../providers'

export const metadata: Metadata = {
    title: 'Sign In or Sign Up',
    description: 'Access your account or create a new one.',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-xl">{children}</div>
            </div>
        </Providers>
    )
}
```

### Auth page — `src/app/(auth)/auth/page.tsx`

```typescript
import { AuthTabs } from '@/widgets/auth-tabs'

export default function AuthPage() {
    return <AuthTabs />
}
```

### Auth tabs widget — `src/widgets/auth-tabs/ui/auth-tabs.tsx`

A tabbed interface with "Sign In" and "Sign Up" tabs. Uses the `SignInForm` and `SignUpForm` components.

```typescript
// Two tabs: Sign In (default) and Sign Up
// Each tab renders its respective form
// Design the tabs UI however you want
```

---

## App layout — `src/app/(app)/layout.tsx`

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

---

## Route page stubs

Create these under `src/app/(app)/`:

- `dashboard/page.tsx` → `<div>Dashboard</div>`
- `match/page.tsx` → `<div>Match</div>`
- `chat/page.tsx` → `<div>Chat</div>`
- `gifts/page.tsx` → `<div>Gifts</div>`
- `profile/page.tsx` → `<div>Profile</div>`
- `wallet/page.tsx` → `<div>Wallet</div>`

---

## Troubleshooting: "I can't log in"

If login succeeds (200 response) but you're still redirected to `/auth`:

1. **Check cookies in DevTools** → Application → Cookies. After sign-in, you should see `dating_session_id` and `dating_user_id`.
2. **`withCredentials: true`** must be set on the Axios client. Without it, the browser won't store cookies from the API response.
3. **Same origin**: The frontend and API must be on the same origin (both `localhost:3000`). If they're on different ports, cookies won't be sent due to CORS.
4. **`NEXT_PUBLIC_APP_URL`** must match the actual URL you're visiting. If you visit `http://localhost:3000` but the env var says `http://localhost:3001`, Axios calls will go to the wrong server.
5. **Middleware matcher**: Make sure `/api` routes are excluded from the middleware matcher (they are by default in the pattern above).
6. **Cookie `httpOnly`**: These cookies are httpOnly so you won't see them in `document.cookie`, but they ARE visible in DevTools → Application → Cookies.

## Verification

- Sign up with a new account → redirects to `/dashboard`
- Sign in with existing account → redirects to `/dashboard`
- Visit `/dashboard` without cookies → redirects to `/auth`
- Visit `/auth` with cookies → redirects to `/dashboard`
- Logout → clears cookies → redirects to `/auth`
- After login, check DevTools cookies: `dating_session_id` and `dating_user_id` are present
