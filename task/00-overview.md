# Task 00 — Project Overview

## Context

You are building the **inner platform** (authenticated area) of a dating web application. The backend API already exists and is shared between projects — you only need to build the **frontend client** that consumes it.

Both projects use the same `.env`, the same database, the same API endpoints, the same auth system, and the same payment gateway. The only difference is the **UI design**.

## Tech Stack (must match exactly)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Runtime | Node.js 20+ |
| UI Library | React 19 |
| Styling | Tailwind CSS v4, shadcn/ui (new-york style), tw-animate-css |
| State | Redux Toolkit + RTK Query |
| HTTP Client | Axios |
| Forms | react-hook-form + Zod + @hookform/resolvers |
| Icons | lucide-react |
| Animations | motion (Framer Motion) |
| Toasts | sonner |
| Dark Mode | next-themes |

## Architecture — Feature-Sliced Design (FSD)

Layer hierarchy (imports flow **downward only**):

```
app/        -> Next.js routes, layouts
views/      -> Page-level compositions
widgets/    -> Layout blocks (sidebar, header)
features/   -> User actions (swipe, buy gift, purchase credits)
entities/   -> Domain models + client API (user, match, chat, gift, credit)
shared/     -> Utilities, UI primitives, API client, store, errors
```

### Rules

- **Barrel exports**: Cross-slice imports only via `index.ts`
- **No inline styles**: Tailwind CSS only. No `style={{{}}}` attributes
- **kebab-case** for all file and folder names
- **No business logic in route handlers**: Route pages just render views
- RTK Query hooks are the only way UI calls the API (no direct Axios in components)
- Axios services are used inside RTK Query `queryFn` wrappers

## Pages to Build

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Stats, quick links, top members, recent activity |
| `/match` | Discover | Swipe cards with like/dislike, compatibility scoring |
| `/chat` | Chat | Contacts list + conversation panel |
| `/gifts` | Gifts | Gift shop (buy) + inventory (owned gifts) |
| `/profile` | Profile | Edit profile form + AI analysis |
| `/wallet` | Wallet | Credit purchase + balance + transaction history |

## Backend Architecture — Proxy to External Dating API

The Next.js backend acts as a **proxy layer** between the frontend and an external dating API (`https://api.fotochat.com/`). This is critical to understand:

### Complete Proxy Map — Every External Call

The backend proxies requests to **3 external services**. Below is every single proxy call, the file that makes it, and the internal route that triggers it.

#### External Dating API (`https://api.fotochat.com/`)

All requests include `session_id` (from `dating_session_id` cookie) and `api_key` (from `DATING_EXTERNAL_API_KEY` env var).

| Our API Route | Method | Server File Making the Call | External Endpoint | External Method | What it Does |
|---|---|---|---|---|---|
| `/api/auth/sign-up` | POST | `src/shared/lib/auth/external-auth.service.ts` → `signUp()` | `/index_api/subscribe` | POST | Registers user on dating platform. Sends: username, password, email, gender, lookingFor, dateOfBirth, city, userAgent, ipAddress. Returns: sessionId, userId, lang |
| `/api/auth/sign-in` | POST | `src/shared/lib/auth/external-auth.service.ts` → `signIn()` | `/index_api/login` | POST | Authenticates user. Sends: username, password, rememberMe. Returns: sessionId, userId, tokenLogin, lang |
| `/api/user/profile` | GET | `src/entities/user/api/server/repositories/user-profile.repo.ts` → `getProfile()` | `/index_api/user` | POST | Fetches full user profile. Sends: session_id, api_key. Returns: ProfileBlock with all user fields (username, age, gender, photos, description, attribute codes) |
| `/api/user/profile` | PATCH | `src/entities/user/api/server/repositories/user-profile.repo.ts` → `updateProfile()` | `/index_api/user/modify/informations` | POST | Updates profile attributes. Sends: session_id, api_key + profile fields (nom_complet, height, weight, eyeColor, etc.). Returns: accepted status |
| `/api/user/profile` | PATCH | `src/entities/user/api/server/repositories/user-profile.repo.ts` → `updateDescription()` | `/index_api/user/modify/description` | POST | Updates profile bio/description. Sends: session_id, api_key, description. Returns: accepted status |
| `/api/match/discover` | GET | `src/entities/match/api/server/repositories/match.repo.ts` → `search()` | `/index_api/search` | POST | Searches for match candidates. Sends: session_id, api_key, page, pas (perPage), age_from, age_to, sex. Returns: SearchResponse with MembreBlock[] (id, pseudo, photo, age, sexe, ville) |
| `/api/match/list` | GET | `src/entities/match/api/server/repositories/match.repo.ts` → `listMatches()` | `/index_api/match` | GET | Gets user's match list. Sends: session_id, api_key as query params. Returns: MatchListApiResponse with member blocks |
| `/api/match/action` | POST | `src/entities/match/api/server/repositories/match.repo.ts` → `submitAction()` | `/index_api/match` | GET | Submits like/dislike. Sends: session_id, api_key, action=set_like/set_dislike, id_membre (userId) as query params. Returns: MatchActionApiResponse with result, is_match |
| `/api/match/compatibility` | POST | `src/entities/user/api/server/repositories/user-profile.repo.ts` → `getProfile()` | `/index_api/user` | POST | Fetches current user's profile (to compare with candidate). Used by CompatibilityService before calling AI |
| `/api/chat/contacts` | GET | `src/entities/chat/api/server/repositories/chat.repo.ts` → `loadContacts()` | `/ajax_api/load_contacts` | GET | Loads chat contact list. Sends: session_id, api_key as query params. Returns: ContactBlock[] (id, pseudo, photo, unread count, online status, last message) |
| `/api/chat/messages` | GET | `src/entities/chat/api/server/repositories/chat.repo.ts` → `loadMessages()` | `/ajax_api/load_messages` | GET | Loads conversation messages. Sends: session_id, contact_id, contact (username), api_key as query params. Returns: EclairBlock[] (id, senderId, text, sentAt) |
| `/api/chat/send` | POST | `src/entities/chat/api/server/repositories/chat.repo.ts` → `sendMessage()` | `/ajax_api/send_message` | GET | Sends a chat message. Sends: session_id, contact_id, contact, msg, api_key as query params. Returns: message confirmation with date |

#### SecureProcessor Payment Gateway (`https://checkout.secure-processor.com`)

Uses Basic Auth with `SECURE_PROCESSOR_SHOP_ID:SECURE_PROCESSOR_SECRET_KEY`.

| Our API Route | Method | Server File Making the Call | External Endpoint | External Method | What it Does |
|---|---|---|---|---|---|
| `/api/credits/purchase` | POST | `src/entities/payment/api/server/adapters/secure-processor.adapter.ts` → `createCheckout()` | `/ctp/api/checkouts` | POST | Creates payment checkout session. Sends: checkout object with version, transaction_type, test mode, return_url, order (amount in cents, currency EUR), customer id, metadata. Returns: token, redirect_url |
| `/api/payments/secure-processor/webhook` | POST | _(incoming — gateway calls us)_ | N/A | N/A | Gateway sends payment status updates to us. We verify RSA-SHA256 signature using `SECURE_PROCESSOR_PUBLIC_KEY`, then update payment_token + credit_transaction |
| `/api/payments/secure-processor/return` | GET | _(incoming — user redirected back)_ | N/A | N/A | User returns from payment page. We read query params (token, status, uid) and redirect to `/wallet?status=X` |

#### OpenAI API (`https://api.openai.com`)

Uses Bearer token auth with `OPENAI_API_KEY`. Model: `gpt-4o-mini`.

| Our API Route | Method | Server File Making the Call | External Endpoint | External Method | What it Does |
|---|---|---|---|---|---|
| `/api/match/compatibility` | POST | `src/shared/lib/ai/openai/open-ai.service.ts` → `jsonRequest()` | `/v1/responses` | POST | Generates AI compatibility score between two profiles. CompatibilityService fetches both profiles from dating API, then sends them to OpenAI. Returns: score, summary, reasons[] |
| `/api/user/profile/analyze` | POST | `src/shared/lib/ai/openai/open-ai.service.ts` → `jsonRequest()` | `/v1/responses` | POST | Analyzes user profile and suggests improvements. Returns: summary, checklist of ProfileAdviceItem[] |

### What the backend handles locally (no proxy — Prisma/PostgreSQL only)

| Domain | Endpoints | Storage | Notes |
|--------|-----------|---------|-------|
| **Credits balance** | `GET /api/credits/balance` | `user_credits` table | Direct Prisma query |
| **Wallet** | `GET /api/credits/wallet` | `user_credits` + `credit_transaction` tables | Direct Prisma query, aggregates totals |
| **Credit purchase** | `POST /api/credits/purchase` | `payment_token` + `credit_transaction` tables | Creates DB records, THEN calls SecureProcessor (see above) |
| **Gift catalog** | `GET /api/gifts/catalog` | `gift_catalog` table | Direct Prisma query |
| **Gift inventory** | `GET /api/gifts/inventory` | `gift_inventory` table | Direct Prisma query |
| **Gift history** | `GET /api/gifts/history` | `gift_send` table | Direct Prisma query |
| **Buy gift** | `POST /api/gifts/buy` | `user_credits` + `gift_inventory` tables | Prisma transaction: deduct credits + add to inventory |
| **Send gift** | `POST /api/gifts/send` | `gift_inventory` + `gift_send` tables | Prisma transaction: decrement inventory + create send record. Also validates recipient is a match via MatchRepository (proxy call) |
| **Current user** | `GET /api/user/me` | Better Auth `user` table | Direct Prisma query via GetCurrentUserUseCase |
| **Payment webhook** | `POST /api/payments/secure-processor/webhook` | `payment_token` + `credit_transaction` + `user_credits` tables | Updates payment status, grants credits on success, sends email |
| **Payment return** | `GET /api/payments/secure-processor/return` | `payment_token` table | Updates status, redirects to `/wallet` |

### Key Server Files Reference

| File | Role |
|------|------|
| `src/shared/lib/auth/external-auth.service.ts` | Proxies sign-up/sign-in to dating API |
| `src/entities/user/api/server/repositories/user-profile.repo.ts` | Proxies profile CRUD to dating API |
| `src/entities/match/api/server/repositories/match.repo.ts` | Proxies discover/list/action to dating API |
| `src/entities/chat/api/server/repositories/chat.repo.ts` | Proxies contacts/messages/send to dating API |
| `src/entities/match/api/server/services/compatibility.service.ts` | Orchestrates: fetch profiles from dating API → send to OpenAI → return score |
| `src/entities/user/api/server/services/user-profile-analyzer.service.ts` | Sends profile to OpenAI for analysis |
| `src/entities/payment/api/server/adapters/secure-processor.adapter.ts` | Creates payment checkouts on SecureProcessor |
| `src/shared/lib/ai/openai/open-ai.service.ts` | Makes OpenAI API requests |

### Dual Authentication System

The app uses **two auth systems** simultaneously:

1. **Better Auth** — Manages app-level users (`user`, `session` tables in PostgreSQL). Cookie: `better-auth.session_token`
2. **External Dating API** — Manages dating platform sessions. Cookies: `dating_session_id`, `dating_user_id`, `dating_token_login`

A user is authenticated if **either** session exists. Different API endpoints require different sessions:
- `/api/user/me`, `/api/gifts/*`, `/api/credits/*` → require Better Auth session
- `/api/match/*`, `/api/chat/*`, `/api/user/profile` → require dating session cookies
- `/api/gifts/send` → requires both (BAuth for inventory, dating session for recipient validation)

### What this means for the new project

Since both projects share the **same `.env`** and **same backend API routes**, the frontend only needs to:
1. Call `/api/*` endpoints (never call the external dating API directly)
2. Send cookies automatically (`withCredentials: true`)
3. Handle the response DTOs as documented in each task

The proxy logic, external API integration, database access, and DI container are all in the shared backend — you do NOT need to reimplement any of this.

## API Base URL

All API calls go to the same origin (same Next.js app). The Axios client uses:
```
baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
```

Cookies (`dating_session_id`, `dating_user_id`, `better-auth.session_token`) are sent automatically via `withCredentials: true`.

## Environment Variables (frontend-relevant)

The only env var the frontend needs:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

All other env vars (`DATABASE_URL`, `DATING_EXTERNAL_API_KEY`, `SECURE_PROCESSOR_*`, `SMTP_*`, `BETTER_AUTH_*`, etc.) are used server-side only by the shared backend.

## Task Order

Complete tasks in numerical order (01 through 11). Each task builds on previous ones.
