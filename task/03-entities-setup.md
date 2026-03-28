# Task 03 — Entity Types, Services & RTK Query Endpoints

## Goal

Create all domain entity types, Axios service functions, and RTK Query endpoint hooks. These are the data layer that all pages consume.

---

## Entity: User (`src/entities/user/`)

### Types — `src/entities/user/model/types.ts`

```typescript
export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export type UserGender = 'man' | 'woman' | 'couple'

export interface UserProfilePhoto {
  large?: string
  medium?: string
  small?: string
}

export interface UserProfile {
  id: number
  username: string
  fullName?: string
  age?: number
  gender?: UserGender
  location?: string
  email?: string
  lastVisit?: string
  avatarUrl?: string
  photos?: UserProfilePhoto[]
  photoCount?: number
  description?: string
  height?: number
  weight?: number
  eyeColor?: number
  hairColor?: number
  situation?: number
  silhouette?: number
  personality?: number
  schedule?: number
  orientation?: number
  children?: number
  education?: number
  profession?: number
}

export interface UserProfileResponse {
  user: UserProfile
}

export interface UpdateProfileRequest {
  fullName: string
  height?: number
  weight?: number
  eyeColor?: number
  hairColor?: number
  situation?: number
  silhouette?: number
  personality?: number
  schedule?: number
  orientation?: number
  children?: number
  education?: number
  profession?: number
  email?: string
  langUi?: string
  bodyOptions?: number[]
  description?: string
}

export interface UpdateProfileResponse {
  accepted?: number
  error?: string
}

export type ProfileAdvicePriority = 'high' | 'medium' | 'low'
export type ProfileAdviceCategory = 'photo' | 'bio' | 'details' | 'engagement'

export interface ProfileAdviceItem {
  id: string
  title: string
  priority: ProfileAdvicePriority
  category: ProfileAdviceCategory
  reason: string
  action: string
  example?: string
}

export interface AnalyzeProfileRequest {
  fullName?: string
  email?: string
  description?: string
  height?: number
  weight?: number
  eyeColor?: number
  hairColor?: number
  situation?: number
  silhouette?: number
  personality?: number
  schedule?: number
  orientation?: number
  children?: number
  education?: number
  profession?: number
}

export interface AnalyzeProfileResponse {
  summary: string
  checklist: ProfileAdviceItem[]
}
```

### Services — `src/entities/user/api/client/services/get-current-user.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'

export interface UserResponseDto {
  id: string
  email: string
  name: string
  emailVerified: boolean
  createdAt: string
}

export async function getCurrentUser(): Promise<UserResponseDto> {
    const response = await apiClient.get<{ data: UserResponseDto }>('/api/user/me')
    return response.data.data
}
```

### Services — `src/entities/user/api/client/services/profile.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    UserProfileResponse,
} from '@/entities/user/model/types'

export async function getUserProfile(): Promise<UserProfileResponse> {
    const response = await apiClient.get<UserProfileResponse>('/api/user/profile')
    return response.data
}

export async function updateUserProfile(payload: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    const response = await apiClient.patch<UpdateProfileResponse>('/api/user/profile', payload)
    return response.data
}

export async function analyzeUserProfile(payload: AnalyzeProfileRequest): Promise<AnalyzeProfileResponse> {
    const response = await apiClient.post<AnalyzeProfileResponse>('/api/user/profile/analyze', payload)
    return response.data
}
```

### RTK Query Endpoints — `src/entities/user/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getCurrentUser, type UserResponseDto } from './services/get-current-user.service'
import { analyzeUserProfile, getUserProfile, updateUserProfile } from './services/profile.service'
import type {
    AnalyzeProfileRequest,
    AnalyzeProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    UserProfileResponse,
} from '@/entities/user/model/types'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<UserResponseDto, void>({
            queryFn: async () => {
                try {
                    const data = await getCurrentUser()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['User'],
        }),
        getUserProfile: builder.query<UserProfileResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getUserProfile()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['User'],
        }),
        updateUserProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await updateUserProfile(payload)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            invalidatesTags: ['User'],
        }),
        analyzeUserProfile: builder.mutation<AnalyzeProfileResponse, AnalyzeProfileRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await analyzeUserProfile(payload)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
        }),
    }),
})

export const {
    useGetCurrentUserQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useAnalyzeUserProfileMutation,
} = userApi
```

### Barrel — `src/entities/user/index.ts`

```typescript
export type {
    User, UserGender, UserProfile, UserProfilePhoto, UserProfileResponse,
    UpdateProfileRequest, UpdateProfileResponse,
    AnalyzeProfileRequest, AnalyzeProfileResponse,
    ProfileAdviceItem, ProfileAdvicePriority, ProfileAdviceCategory,
} from './model/types'

export {
    useGetCurrentUserQuery, useGetUserProfileQuery,
    useUpdateUserProfileMutation, useAnalyzeUserProfileMutation,
} from './api/client/endpoints'
```

---

## Entity: Match (`src/entities/match/`)

### Types — `src/entities/match/model/types.ts`

```typescript
export type MatchGender = 'man' | 'woman' | 'couple'

export interface MatchCandidate {
    id: number
    username: string
    age?: number
    gender?: MatchGender
    location?: string
    rating?: number
    photoUrl?: string
    photoCount?: number
}

export interface DiscoverMatchesResponse {
    items: MatchCandidate[]
    page?: number
    totalPages?: number
    total?: number
}

export interface MatchListResponse {
    items: MatchCandidate[]
    total: number
}

export type MatchAction = 'like' | 'dislike'

export interface MatchActionRequest {
    userId: number
    action: MatchAction
}

export interface MatchActionResponse {
    result?: string
    isMatch?: boolean
}

export interface CompatibilityRequest {
    candidateId: number
    candidateUsername: string
    candidateAge?: number
    candidateGender?: MatchGender
    candidateLocation?: string
}

export interface CompatibilityResponse {
    score: number
    summary: string
    reasons: string[]
}
```

### Services — `src/entities/match/api/client/services/match.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type {
    CompatibilityRequest, CompatibilityResponse,
    DiscoverMatchesResponse, MatchActionRequest,
    MatchActionResponse, MatchListResponse,
} from '@/entities/match/model/types'

export type DiscoverMatchesQuery = {
    page?: number
    perPage?: number
    gender?: 'men' | 'women' | 'couple'
    ageFrom?: number
    ageTo?: number
}

const toDiscoverQueryString = (query: DiscoverMatchesQuery): string => {
    const params = new URLSearchParams()
    if (typeof query.page === 'number') params.set('page', String(query.page))
    if (typeof query.perPage === 'number') params.set('perPage', String(query.perPage))
    if (query.gender) params.set('gender', query.gender)
    if (typeof query.ageFrom === 'number') params.set('ageFrom', String(query.ageFrom))
    if (typeof query.ageTo === 'number') params.set('ageTo', String(query.ageTo))
    return params.toString()
}

export async function discoverMatches(query: DiscoverMatchesQuery = {}): Promise<DiscoverMatchesResponse> {
    const qs = toDiscoverQueryString(query)
    const path = qs ? `/api/match/discover?${qs}` : '/api/match/discover'
    const response = await apiClient.get<DiscoverMatchesResponse>(path)
    return response.data
}

export async function getMatches(): Promise<MatchListResponse> {
    const response = await apiClient.get<MatchListResponse>('/api/match/list')
    return response.data
}

export async function sendMatchAction(data: MatchActionRequest): Promise<MatchActionResponse> {
    const response = await apiClient.post<MatchActionResponse>('/api/match/action', data)
    return response.data
}

export async function getCompatibilityScore(data: CompatibilityRequest): Promise<CompatibilityResponse> {
    const response = await apiClient.post<CompatibilityResponse>('/api/match/compatibility', data)
    return response.data
}
```

### RTK Query Endpoints — `src/entities/match/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { discoverMatches, getMatches, getCompatibilityScore, sendMatchAction, type DiscoverMatchesQuery } from './services/match.service'
import type { CompatibilityRequest, CompatibilityResponse, DiscoverMatchesResponse, MatchActionRequest, MatchActionResponse, MatchListResponse } from '@/entities/match/model/types'

export const matchApi = api.injectEndpoints({
    endpoints: (builder) => ({
        discoverMatches: builder.query<DiscoverMatchesResponse, DiscoverMatchesQuery | void>({
            queryFn: async (query) => {
                try {
                    const data = await discoverMatches(query ?? {})
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['Discover'],
        }),
        getMatches: builder.query<MatchListResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getMatches()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['Match'],
        }),
        matchAction: builder.mutation<MatchActionResponse, MatchActionRequest>({
            queryFn: async (data) => {
                try {
                    const response = await sendMatchAction(data)
                    return { data: response }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            invalidatesTags: ['Match'],
        }),
        compatibilityScore: builder.mutation<CompatibilityResponse, CompatibilityRequest>({
            queryFn: async (data) => {
                try {
                    const response = await getCompatibilityScore(data)
                    return { data: response }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
        }),
    }),
})

export const {
    useDiscoverMatchesQuery,
    useGetMatchesQuery,
    useMatchActionMutation,
    useCompatibilityScoreMutation,
} = matchApi
```

### Barrel — `src/entities/match/index.ts`

```typescript
export type {
    DiscoverMatchesResponse, MatchAction, MatchActionRequest, MatchActionResponse,
    MatchCandidate, MatchGender, MatchListResponse,
    CompatibilityRequest, CompatibilityResponse,
} from './model/types'

export {
    useDiscoverMatchesQuery, useGetMatchesQuery,
    useMatchActionMutation, useCompatibilityScoreMutation,
} from './api/client/endpoints'

export type { DiscoverMatchesQuery } from './api/client/services/match.service'
```

---

## Entity: Chat (`src/entities/chat/`)

### Types — `src/entities/chat/model/types.ts`

```typescript
export interface ContactPreview {
    id: number
    username: string
    avatarUrl?: string
    unreadCount?: number
    onlineStatus?: 'online' | 'recent' | 'offline'
    isFriend?: boolean
    lastMessagePreview?: string
}

export interface ChatMessage {
    id: number | string
    senderId?: number
    text?: string
    sentAt?: string
    extra?: string
}

export interface ContactsResponse {
    contacts: ContactPreview[]
}

export interface MessagesResponse {
    messages: ChatMessage[]
}

export interface SendMessageRequest {
    contactId: number
    contact?: string
    message: string
}

export interface SendMessageResponse {
    message?: string
    date?: string
}
```

### Services — `src/entities/chat/api/client/services/chat.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type { ContactsResponse, MessagesResponse, SendMessageRequest, SendMessageResponse } from '@/entities/chat/model/types'

export type GetChatMessagesQuery = {
    contactId: number
    contact?: string
}

export async function getChatContacts(): Promise<ContactsResponse> {
    const response = await apiClient.get<ContactsResponse>('/api/chat/contacts')
    return response.data
}

export async function getChatMessages(query: GetChatMessagesQuery): Promise<MessagesResponse> {
    const params = new URLSearchParams()
    params.set('contactId', String(query.contactId))
    if (query.contact) params.set('contact', query.contact)
    const response = await apiClient.get<MessagesResponse>(`/api/chat/messages?${params.toString()}`)
    return response.data
}

export async function sendChatMessage(payload: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await apiClient.post<SendMessageResponse>('/api/chat/send', payload)
    return response.data
}
```

### RTK Query Endpoints — `src/entities/chat/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { getChatContacts, getChatMessages, sendChatMessage, type GetChatMessagesQuery } from './services/chat.service'
import type { ContactsResponse, MessagesResponse, SendMessageRequest, SendMessageResponse } from '@/entities/chat/model/types'

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChatContacts: builder.query<ContactsResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getChatContacts()
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['Chat'],
        }),
        getChatMessages: builder.query<MessagesResponse, GetChatMessagesQuery>({
            queryFn: async (query) => {
                try {
                    const data = await getChatMessages(query)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            providesTags: ['Chat'],
        }),
        sendChatMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await sendChatMessage(payload)
                    return { data }
                } catch (error) {
                    const normalized = normalizeError(error)
                    return { error: { status: 'CUSTOM_ERROR' as const, data: normalized, error: normalized.message } }
                }
            },
            invalidatesTags: ['Chat'],
        }),
    }),
})

export const { useGetChatContactsQuery, useGetChatMessagesQuery, useSendChatMessageMutation } = chatApi
```

### Barrel — `src/entities/chat/index.ts`

```typescript
export type {
    ChatMessage, ContactPreview, ContactsResponse,
    MessagesResponse, SendMessageRequest, SendMessageResponse,
} from './model/types'

export { useGetChatContactsQuery, useGetChatMessagesQuery, useSendChatMessageMutation } from './api/client/endpoints'
export type { GetChatMessagesQuery } from './api/client/services/chat.service'
```

---

## Entity: Gift (`src/entities/gift/`)

### Types — `src/entities/gift/model/types.ts`

```typescript
export interface GiftCatalogItem {
    id: string
    slug: string
    name: string
    imagePath: string
    priceCoins: number
}

export interface GiftCatalogResponse {
    items: GiftCatalogItem[]
}

export interface GiftInventoryItem {
    giftId: string
    giftName: string
    giftImagePath: string
    quantity: number
    updatedAt: string
}

export interface GiftInventoryResponse {
    items: GiftInventoryItem[]
}

export interface BuyGiftRequest {
    giftId: string
}

export interface BuyGiftResponse {
    giftId: string
    purchasedQuantity: number
    inventoryQuantity: number
    spentCoins: number
    remainingBalance: number
}

export interface SendGiftRequest {
    recipientUserId: number
    giftId: string
}

export interface SendGiftResponse {
    giftSendId: string
    giftId: string
    recipientUserId: number
    remainingInventory: number
    createdAt: string
}

export interface GiftHistoryItem {
    id: string
    giftId: string
    giftName: string
    giftImagePath: string
    recipientUserId: number
    priceCoins: number
    createdAt: string
}

export interface GiftHistoryResponse {
    items: GiftHistoryItem[]
}
```

### Services — `src/entities/gift/api/client/services/gift.service.ts`

```typescript
import { apiClient } from '@/shared/api/client/axios.config'
import type {
    BuyGiftRequest, BuyGiftResponse, GiftCatalogResponse,
    GiftHistoryResponse, GiftInventoryResponse,
    SendGiftRequest, SendGiftResponse,
} from '@/entities/gift/model/types'

export type GiftHistoryQuery = { limit?: number }

export async function getGiftCatalog(): Promise<GiftCatalogResponse> {
    const response = await apiClient.get<GiftCatalogResponse>('/api/gifts/catalog')
    return response.data
}

export async function getGiftInventory(): Promise<GiftInventoryResponse> {
    const response = await apiClient.get<GiftInventoryResponse>('/api/gifts/inventory')
    return response.data
}

export async function getGiftHistory(query: GiftHistoryQuery = {}): Promise<GiftHistoryResponse> {
    const params = new URLSearchParams()
    if (typeof query.limit === 'number') params.set('limit', String(query.limit))
    const path = params.toString() ? `/api/gifts/history?${params.toString()}` : '/api/gifts/history'
    const response = await apiClient.get<GiftHistoryResponse>(path)
    return response.data
}

export async function buyGift(payload: BuyGiftRequest): Promise<BuyGiftResponse> {
    const response = await apiClient.post<BuyGiftResponse>('/api/gifts/buy', payload)
    return response.data
}

export async function sendGift(payload: SendGiftRequest): Promise<SendGiftResponse> {
    const response = await apiClient.post<SendGiftResponse>('/api/gifts/send', payload)
    return response.data
}
```

### RTK Query Endpoints — `src/entities/gift/api/client/endpoints.ts`

```typescript
import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { buyGift, getGiftCatalog, getGiftHistory, getGiftInventory, sendGift, type GiftHistoryQuery } from './services/gift.service'
import type {
    BuyGiftRequest, BuyGiftResponse, GiftCatalogResponse,
    GiftHistoryResponse, GiftInventoryResponse,
    SendGiftRequest, SendGiftResponse,
} from '@/entities/gift/model/types'

export const giftApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCatalog: builder.query<GiftCatalogResponse, void>({
            queryFn: async () => {
                try { const data = await getGiftCatalog(); return { data } }
                catch (error) { const n = normalizeError(error); return { error: { status: 'CUSTOM_ERROR' as const, data: n, error: n.message } } }
            },
            providesTags: ['Gift'],
        }),
        getGiftInventory: builder.query<GiftInventoryResponse, void>({
            queryFn: async () => {
                try { const data = await getGiftInventory(); return { data } }
                catch (error) { const n = normalizeError(error); return { error: { status: 'CUSTOM_ERROR' as const, data: n, error: n.message } } }
            },
            providesTags: ['Gift'],
        }),
        getGiftHistory: builder.query<GiftHistoryResponse, GiftHistoryQuery | void>({
            queryFn: async (query) => {
                try { const data = await getGiftHistory(query ?? {}); return { data } }
                catch (error) { const n = normalizeError(error); return { error: { status: 'CUSTOM_ERROR' as const, data: n, error: n.message } } }
            },
            providesTags: ['Gift'],
        }),
        buyGift: builder.mutation<BuyGiftResponse, BuyGiftRequest>({
            queryFn: async (payload) => {
                try { const data = await buyGift(payload); return { data } }
                catch (error) { const n = normalizeError(error); return { error: { status: 'CUSTOM_ERROR' as const, data: n, error: n.message } } }
            },
            invalidatesTags: ['Gift', 'Wallet'],
        }),
        sendGift: builder.mutation<SendGiftResponse, SendGiftRequest>({
            queryFn: async (payload) => {
                try { const data = await sendGift(payload); return { data } }
                catch (error) { const n = normalizeError(error); return { error: { status: 'CUSTOM_ERROR' as const, data: n, error: n.message } } }
            },
            invalidatesTags: ['Gift'],
        }),
    }),
})

export const {
    useGetGiftCatalogQuery, useGetGiftInventoryQuery, useGetGiftHistoryQuery,
    useBuyGiftMutation, useSendGiftMutation,
} = giftApi
```

### Gift utilities — `src/entities/gift/lib/gift-asset-map.ts`

```typescript
export const DEFAULT_GIFT_ASSET_PATH = '/gifts-2/gift.png'

const GIFT_ASSET_POOL = [
    '/gifts-1/Rose.png', '/gifts-1/Chocolate.png', '/gifts-1/Teddy Bear.png',
    '/gifts-2/coffee.png', '/gifts-2/flower.png', '/gifts-2/trophy.png', '/gifts-2/fire.png',
    '/gifts-3/Bottle.png', '/gifts-3/Star.png', '/gifts-3/Tresure.png',
] as const

export const GIFT_ASSET_MAP: Record<string, string> = {
    roses: '/gifts-1/Rose.png', tulips: '/gifts-1/Chocolate.png',
    gerbera: '/gifts-1/Teddy Bear.png', lilacs: '/gifts-2/coffee.png',
    freesia: '/gifts-2/flower.png', dahlias: '/gifts-2/trophy.png',
    hydrangea: '/gifts-2/fire.png', orhid: '/gifts-3/Bottle.png',
    pions: '/gifts-3/Star.png', ranunculus: '/gifts-3/Tresure.png',
}

export const GIFT_DISPLAY_NAME_BY_IMAGE_PATH: Record<string, string> = {
    '/gifts-1/Rose.png': 'Rose', '/gifts-1/Chocolate.png': 'Chocolate',
    '/gifts-1/Teddy Bear.png': 'Teddy Bear', '/gifts-2/coffee.png': 'Coffee',
    '/gifts-2/flower.png': 'Flower', '/gifts-2/trophy.png': 'Trophy',
    '/gifts-2/fire.png': 'Fire', '/gifts-3/Bottle.png': 'Bottle',
    '/gifts-3/Star.png': 'Star', '/gifts-3/Tresure.png': 'Treasure',
}

export const isProjectGiftSlug = (slug: string): boolean =>
    Object.prototype.hasOwnProperty.call(GIFT_ASSET_MAP, slug)

const pickAssetByHash = (value: string): string => {
    let hash = 0
    for (let i = 0; i < value.length; i++) hash = (hash + value.charCodeAt(i)) % GIFT_ASSET_POOL.length
    return GIFT_ASSET_POOL[hash]
}

export const getThemedFallbackGiftAsset = (slug: string): string => {
    const s = slug.trim().toLowerCase()
    return s ? pickAssetByHash(s) : DEFAULT_GIFT_ASSET_PATH
}
```

### Gift utilities — `src/entities/gift/lib/resolve-gift-image-path.ts`

```typescript
import { DEFAULT_GIFT_ASSET_PATH, GIFT_ASSET_MAP, getThemedFallbackGiftAsset } from './gift-asset-map'

export const resolveGiftImagePath = ({ slug, imagePath }: { slug?: string; imagePath?: string }): string => {
    const s = slug?.trim().toLowerCase()
    if (s) {
        const mapped = GIFT_ASSET_MAP[s]
        if (mapped) return mapped
        const fallback = getThemedFallbackGiftAsset(s)
        if (fallback) return fallback
    }
    if (typeof imagePath === 'string' && imagePath.startsWith('/')) return imagePath
    return DEFAULT_GIFT_ASSET_PATH
}
```

### Gift utilities — `src/entities/gift/lib/resolve-gift-display-name.ts`

```typescript
import { GIFT_DISPLAY_NAME_BY_IMAGE_PATH } from './gift-asset-map'
import { resolveGiftImagePath } from './resolve-gift-image-path'

export const resolveGiftDisplayName = ({ slug, imagePath, fallbackName }: {
    slug?: string; imagePath?: string; fallbackName?: string
}): string => {
    const resolved = resolveGiftImagePath({ slug, imagePath })
    const mapped = GIFT_DISPLAY_NAME_BY_IMAGE_PATH[resolved]
    if (mapped) return mapped
    if (typeof fallbackName === 'string' && fallbackName.trim().length > 0) return fallbackName.trim()
    return 'Gift'
}
```

### Barrel — `src/entities/gift/index.ts`

```typescript
export type {
    BuyGiftRequest, BuyGiftResponse, GiftCatalogItem, GiftCatalogResponse,
    GiftHistoryItem, GiftHistoryResponse, GiftInventoryItem, GiftInventoryResponse,
    SendGiftRequest, SendGiftResponse,
} from './model/types'

export {
    useGetGiftCatalogQuery, useGetGiftInventoryQuery, useGetGiftHistoryQuery,
    useBuyGiftMutation, useSendGiftMutation,
} from './api/client/endpoints'

export type { GiftHistoryQuery } from './api/client/services/gift.service'
```

---

## Entity: Credit (`src/entities/credit/`)

### Types — `src/entities/credit/model/types.ts`

```typescript
export type TransactionType = 'grant' | 'spend' | 'refund' | 'adjustment'
export type CreditTransactionStatus = 'PENDING' | 'SUCCESSFUL' | 'FAILED'

export interface UserCredits {
    id: string
    userId: string
    balance: number
    createdAt: Date
    updatedAt: Date
}

export interface CreditTransaction {
    id: string
    userId: string
    type: TransactionType
    amount: number
    status: CreditTransactionStatus
    reason: string | null
    paymentTokenId: string | null
    createdAt: Date
}
```

### Barrel — `src/entities/credit/index.ts`

```typescript
export type { TransactionType, CreditTransactionStatus, UserCredits, CreditTransaction } from './model/types'
```

---

## Static assets

Copy the gift image folders to `public/`:
- `public/gifts-1/` (Rose.png, Chocolate.png, Teddy Bear.png)
- `public/gifts-2/` (coffee.png, flower.png, trophy.png, fire.png, gift.png)
- `public/gifts-3/` (Bottle.png, Star.png, Tresure.png)

## Verification

- All entity types compile
- All RTK Query hooks are importable from barrel files
- `useDiscoverMatchesQuery`, `useGetChatContactsQuery`, etc. are available
