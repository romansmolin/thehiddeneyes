import { apiClient } from '@/shared/api/client/axios.config'
import type {
    BuyGiftRequest,
    BuyGiftResponse,
    GiftCatalogResponse,
    GiftHistoryResponse,
    GiftInventoryResponse,
    SendGiftRequest,
    SendGiftResponse,
} from '@/entities/gift/model/types'

export type GiftHistoryQuery = {
    limit?: number
}

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

    if (typeof query.limit === 'number') {
        params.set('limit', String(query.limit))
    }

    const path = params.toString()
        ? `/api/gifts/history?${params.toString()}`
        : '/api/gifts/history'

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
