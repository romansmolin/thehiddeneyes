import { inject, injectable } from 'inversify'
import type { ICreditRepository } from '../interfaces/credit-repository.interface'
import type { CreditTransaction } from '../../../model/types'

const DEFAULT_CURRENCY = 'EUR'

export type WalletSummary = {
    balance: number
    currency: string
    totalPurchased: number
    totalSpent: number
    pendingCredits: number
}

export type WalletResponse = {
    wallet: WalletSummary
    transactions: CreditTransaction[]
    total: number
}

@injectable()
export class GetWalletUseCase {
    constructor(@inject('ICreditRepository') private creditRepo: ICreditRepository) {}

    async execute(userId: string, limit?: number): Promise<WalletResponse> {
        const credits = await this.creditRepo.getOrCreateBalance(userId)
        const transactions = await this.creditRepo.getTransactions(userId, limit)

        const summary = transactions.reduce<WalletSummary>(
            (acc, tx) => {
                if (tx.type === 'grant' && tx.status === 'SUCCESSFUL') {
                    acc.totalPurchased += tx.amount
                }

                if (tx.type === 'grant' && tx.status === 'PENDING') {
                    acc.pendingCredits += tx.amount
                }

                if (tx.type === 'spend' && tx.status === 'SUCCESSFUL') {
                    acc.totalSpent += Math.abs(tx.amount)
                }

                return acc
            },
            {
                balance: credits.balance,
                currency: DEFAULT_CURRENCY,
                totalPurchased: 0,
                totalSpent: 0,
                pendingCredits: 0,
            },
        )

        summary.balance = credits.balance

        return {
            wallet: summary,
            transactions,
            total: transactions.length,
        }
    }
}
