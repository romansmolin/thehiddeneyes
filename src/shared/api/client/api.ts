import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: 'include',
  }),
  tagTypes: ['User', 'Auth', 'Chat', 'Discover', 'Match', 'Gift', 'Wallet'],
  endpoints: () => ({}),
});
