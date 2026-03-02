import { Sparkles } from 'lucide-react'

type CreditBalanceCardProps = {
    balance: number
}

export function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
    return (
        <div className="bg-muted rounded-2xl p-4 flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Credits Balance</p>
                <p className="text-2xl font-bold">{balance}</p>
            </div>
            <Sparkles className="w-8 h-8 text-muted-foreground" />
        </div>
    )
}
