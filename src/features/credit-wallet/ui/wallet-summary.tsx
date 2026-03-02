import type { WalletSummary as WalletSummaryType } from '../api/client/services/wallet.service'

type WalletSummaryProps = {
    summary: WalletSummaryType
}

const formatCurrency = (amount: number, currency: string) => {
    try {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(amount)
    } catch (error) {
        return `${amount.toFixed(2)} ${currency}`
    }
}

export const WalletSummary = ({ summary }: WalletSummaryProps) => {
    return (
        <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Balance</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {summary.balance} credits
                </p>
                <p className="mt-1 text-sm text-slate-500">
                    {formatCurrency(summary.balance * 0.02, summary.currency)}
                </p>
            </div>
            <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Total purchased
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {summary.totalPurchased}
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total spent</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {summary.totalSpent}
                    </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Pending credits
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                        {summary.pendingCredits}
                    </p>
                </div>
            </div>
        </div>
    )
}
