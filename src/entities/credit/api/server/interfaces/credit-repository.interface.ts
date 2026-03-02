import type { UserCredits, CreditTransaction, CreateTransactionInput } from '../../../model/types'

export interface ICreditRepository {
    getOrCreateBalance(userId: string): Promise<UserCredits>
    updateBalance(userId: string, newBalance: number): Promise<UserCredits>
    createTransaction(input: CreateTransactionInput): Promise<CreditTransaction>
    getTransactions(userId: string, limit?: number): Promise<CreditTransaction[]>
    findTransactionByPaymentTokenId(paymentTokenId: string): Promise<CreditTransaction | null>
    updateTransactionStatus(
        transactionId: string,
        status: CreditTransaction['status'],
    ): Promise<CreditTransaction>
}
