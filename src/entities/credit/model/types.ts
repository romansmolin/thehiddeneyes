/**
 * Credit domain types
 */

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

export interface CreateTransactionInput {
    userId: string
    type: TransactionType
    amount: number
    status?: CreditTransactionStatus
    reason?: string
    paymentTokenId?: string
}
