import { api } from '@/shared/api/client/api'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import {
    buyGift,
    getGiftCatalog,
    getGiftHistory,
    getGiftInventory,
    sendGift,
    type GiftHistoryQuery,
} from './services/gift.service'
import type {
    BuyGiftRequest,
    BuyGiftResponse,
    GiftCatalogResponse,
    GiftHistoryResponse,
    GiftInventoryResponse,
    SendGiftRequest,
    SendGiftResponse,
} from '@/entities/gift/model/types'

export const giftApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCatalog: builder.query<GiftCatalogResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getGiftCatalog()
                    return { data }
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
            providesTags: ['Gift'],
        }),
        getGiftInventory: builder.query<GiftInventoryResponse, void>({
            queryFn: async () => {
                try {
                    const data = await getGiftInventory()
                    return { data }
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
            providesTags: ['Gift'],
        }),
        getGiftHistory: builder.query<GiftHistoryResponse, GiftHistoryQuery | void>({
            queryFn: async (query) => {
                try {
                    const data = await getGiftHistory(query ?? {})
                    return { data }
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
            providesTags: ['Gift'],
        }),
        buyGift: builder.mutation<BuyGiftResponse, BuyGiftRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await buyGift(payload)
                    return { data }
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
            invalidatesTags: ['Gift', 'Wallet'],
        }),
        sendGift: builder.mutation<SendGiftResponse, SendGiftRequest>({
            queryFn: async (payload) => {
                try {
                    const data = await sendGift(payload)
                    return { data }
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
            invalidatesTags: ['Gift'],
        }),
    }),
})

export const {
    useGetGiftCatalogQuery,
    useGetGiftInventoryQuery,
    useGetGiftHistoryQuery,
    useBuyGiftMutation,
    useSendGiftMutation,
} = giftApi
