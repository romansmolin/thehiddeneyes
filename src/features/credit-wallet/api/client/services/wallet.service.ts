import { apiClient } from '@/shared/api/client/axios.config'

export type WalletSummary = {
    balance: number
    currency: string
    totalPurchased: number
    totalSpent: number
    pendingCredits: number
}

export type CreditTransaction = {
    id: string
    userId: string
    type: 'grant' | 'spend' | 'refund' | 'adjustment'
    amount: number
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED'
    reason: string | null
    generationId: string | null
    paymentTokenId: string | null
    createdAt: string
}

export type WalletResponse = {
    wallet: WalletSummary
    transactions: CreditTransaction[]
    total: number
}

export async function getWallet(): Promise<WalletResponse> {
    const response = await apiClient.get<WalletResponse>('/api/credits/wallet')
    return response.data
}
