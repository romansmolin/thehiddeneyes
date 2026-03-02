import type { CreditTransaction } from '../api/client/services/wallet.service'

type WalletTransactionsProps = {
    transactions: CreditTransaction[]
    isLoading?: boolean
}

const formatDateTime = (value: string) => {
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return 'Unknown date'
    return parsed.toLocaleString()
}

const formatAmount = (tx: CreditTransaction) => {
    const sign = tx.type === 'spend' ? '-' : '+'
    const amount = Math.abs(tx.amount)
    return `${sign}${amount}`
}

const statusStyles: Record<NonNullable<CreditTransaction['status']>, string> = {
    PENDING: 'bg-amber-100 text-amber-800',
    SUCCESSFUL: 'bg-emerald-100 text-emerald-800',
    FAILED: 'bg-rose-100 text-rose-800',
}

const typeLabels: Record<NonNullable<CreditTransaction['type']>, string> = {
    grant: 'Purchase',
    spend: 'Generation',
    refund: 'Refund',
    adjustment: 'Adjustment',
}

export const WalletTransactions = ({ transactions, isLoading }: WalletTransactionsProps) => {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                        <div className="h-4 w-1/3 animate-pulse rounded-full bg-slate-200" />
                        <div className="mt-3 h-3 w-1/4 animate-pulse rounded-full bg-slate-200" />
                    </div>
                ))}
            </div>
        )
    }

    if (transactions.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300/70 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-800">No transactions yet</p>
                <p className="mt-2 text-xs text-slate-500">
                    Purchase credits to see your history here.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {transactions.map((tx) => {
                const status = tx.status ?? 'PENDING'
                const type = tx.type ?? 'grant'

                return (
                <div
                    key={tx.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                            {typeLabels[type]}
                        </p>
                        <p className="text-xs text-slate-500">
                            {tx.reason ?? 'Credit activity'}
                        </p>
                        <p className="text-xs text-slate-500">{formatDateTime(tx.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
                        >
                            {status.toLowerCase()}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                            {formatAmount(tx)} credits
                        </span>
                    </div>
                </div>
                )
            })}
        </div>
    )
}
