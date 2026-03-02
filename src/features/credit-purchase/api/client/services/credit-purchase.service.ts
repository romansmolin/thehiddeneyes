import { apiClient } from '@/shared/api/client/axios.config'

export type PurchaseCreditsResponse = {
    checkoutToken: string
    redirectUrl?: string | null
}

export async function purchaseCredits(credits: number): Promise<PurchaseCreditsResponse> {
    const response = await apiClient.post<PurchaseCreditsResponse>('/api/credits/purchase', {
        credits,
    })
    return response.data
}
