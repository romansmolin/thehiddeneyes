# Task 02 — Shared Layer (API Client, Store, Errors)

## Goal

Set up the shared infrastructure: Axios client, RTK Query base API, Redux store, error handling, and providers.

## Files to Create

### 1. Error codes enum

**File:** `src/shared/errors/error-codes.ts`
```typescript
export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  NOT_FOUND = 'NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  CONFLICT = 'CONFLICT',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
}
```

### 2. Axios client

**File:** `src/shared/api/client/axios.config.ts`
```typescript
import axios from 'axios'

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('[API] Unauthorized request')
        }
        return Promise.reject(error)
    },
)
```

### 3. Error normalizer

**File:** `src/shared/api/client/error-normalizer.ts`
```typescript
import { AxiosError } from 'axios'
import { ErrorCode } from '../../errors/error-codes'

export interface NormalizedError {
  code: ErrorCode
  message: string
  fields?: Array<{ field: string; message: string }>
}

export function normalizeError(error: unknown): NormalizedError {
  if (error instanceof AxiosError) {
    const data = error.response?.data
    if (data?.error) {
      return {
        code: data.error.code || ErrorCode.INTERNAL_ERROR,
        message: data.error.message || 'An error occurred',
        fields: data.error.fields,
      }
    }
    return {
      code: ErrorCode.INTERNAL_ERROR,
      message: error.message || 'Network error occurred',
    }
  }
  if (error instanceof Error) {
    return { code: ErrorCode.INTERNAL_ERROR, message: error.message }
  }
  return { code: ErrorCode.INTERNAL_ERROR, message: 'An unexpected error occurred' }
}
```

### 4. RTK Query base API

**File:** `src/shared/api/client/api.ts`
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: 'include',
  }),
  tagTypes: ['User', 'Auth', 'Chat', 'Discover', 'Match', 'Gift', 'Wallet'],
  endpoints: () => ({}),
})
```

### 5. Redux store

**File:** `src/shared/store/store.ts`
```typescript
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/client/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 6. Providers wrapper

**File:** `src/app/providers.tsx`
```typescript
'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/shared/store/store'
import { Toaster } from '@/shared/ui/sonner'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            {children}
            <Toaster />
        </Provider>
    )
}
```

## Verification

- Importing `apiClient` from `@/shared/api/client/axios.config` works
- Importing `api` from `@/shared/api/client/api` works
- Importing `normalizeError` from `@/shared/api/client/error-normalizer` works
- The Redux store initializes without errors
