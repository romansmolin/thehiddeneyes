import { apiClient } from '@/shared/api/client/axios.config'

export interface CreditBalanceResponse {
    balance: number
    userId: string
}

/**
 * Get user's credit balance
 */
export async function getCreditBalance(): Promise<CreditBalanceResponse> {
    const response = await apiClient.get<CreditBalanceResponse>('/api/credits/balance')
    return response.data
}
