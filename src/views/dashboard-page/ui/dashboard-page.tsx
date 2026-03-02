'use client'

import Link from 'next/link'
import {
    Coins,
    Gift,
    TrendingDown,
    ArrowRight,
    ShoppingCart,
    Clock,
    Users,
    MessageCircle,
    Heart,
    User,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'
import { useWallet, type CreditTransaction } from '@/features/credit-wallet'
import { useDiscoverMatchesQuery } from '@/entities/match/api/client/endpoints'
import { getUserInitials } from '@/entities/user/utils/user-display'
import type { MatchCandidate } from '@/entities/match/model/types'

const TRANSACTION_LABELS: Record<string, string> = {
    grant: 'Token Purchase',
    spend: 'Gift Sent',
    refund: 'Refund',
    adjustment: 'Adjustment',
}

const TRANSACTION_STATUS_VARIANT: Record<
    string,
    'default' | 'secondary' | 'destructive' | 'outline'
> = {
    SUCCESSFUL: 'default',
    PENDING: 'secondary',
    FAILED: 'destructive',
}

function QuickLink({
    href,
    icon,
    label,
    description,
}: {
    href: string
    icon: React.ReactNode
    label: string
    description: string
}) {
    return (
        <Link
            href={href}
            className="group flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-foreground/20 hover:bg-muted/30"
        >
            <div className="mt-0.5 text-muted-foreground transition-colors group-hover:text-foreground">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </Link>
    )
}

function TransactionRow({ tx }: { tx: CreditTransaction }) {
    const label = TRANSACTION_LABELS[tx.type] ?? tx.type
    const statusVariant = TRANSACTION_STATUS_VARIANT[tx.status] ?? 'outline'
    const isPositive = tx.amount > 0
    const formattedDate = new Date(tx.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
    })
    const statusLabel = tx.status.charAt(0) + tx.status.slice(1).toLowerCase()

    return (
        <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
                <Badge variant={statusVariant} className="text-[10px]">
                    {statusLabel}
                </Badge>
                <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{formattedDate}</p>
                </div>
            </div>
            <span
                className={`text-sm font-semibold tabular-nums ${
                    isPositive ? 'text-emerald-600' : 'text-muted-foreground'
                }`}
            >
                {isPositive ? '+' : ''}
                {tx.amount.toLocaleString()}
            </span>
        </div>
    )
}

function MemberCard({ member }: { member: MatchCandidate }) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-border p-3 transition-shadow hover:shadow-sm">
            {member.photoUrl ? (
                <img
                    src={member.photoUrl}
                    alt={member.username}
                    className="size-10 rounded-full object-cover"
                    draggable={false}
                />
            ) : (
                <div className="grid size-10 place-items-center rounded-full bg-muted text-xs font-semibold">
                    {getUserInitials(member.username)}
                </div>
            )}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{member.username}</p>
                <p className="truncate text-xs text-muted-foreground">
                    {[member.age, member.location].filter(Boolean).join(' · ') || 'Member'}
                </p>
            </div>
        </div>
    )
}

function TopMembersSection() {
    const { data, isLoading, isError } = useDiscoverMatchesQuery({ page: 1, perPage: 6 })

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                    <CardTitle className="text-base">Top Members</CardTitle>
                    <CardDescription className="text-xs">Recently active near you</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/match" className="flex items-center gap-1 text-xs">
                        See all <ArrowRight className="ml-1 size-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 rounded-lg" />
                        ))}
                    </div>
                ) : isError || !data?.items.length ? (
                    <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-4">
                        <Users className="size-5 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">
                            {isError ? 'Could not load members.' : 'No members yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-2 sm:grid-cols-2">
                        {data.items.map((member) => (
                            <MemberCard key={member.id} member={member} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export function DashboardPage() {
    const { wallet, isLoading } = useWallet()

    const balance = wallet?.wallet.balance ?? 0
    const totalSpent = wallet?.wallet.totalSpent ?? 0
    const recentTransactions = wallet?.transactions.slice(0, 5) ?? []

    return (
        <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="grid size-10 place-items-center rounded-lg bg-primary/10">
                            <Coins className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Balance</p>
                            {isLoading ? (
                                <Skeleton className="mt-1 h-6 w-16" />
                            ) : (
                                <p className="text-xl font-bold">{balance.toLocaleString()}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="grid size-10 place-items-center rounded-lg bg-emerald-500/10">
                            <Gift className="size-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Gifts Owned</p>
                            <p className="text-xl font-bold">—</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="grid size-10 place-items-center rounded-lg bg-orange-500/10">
                            <TrendingDown className="size-5 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground">Total Spent</p>
                            {isLoading ? (
                                <Skeleton className="mt-1 h-6 w-16" />
                            ) : (
                                <p className="text-xl font-bold">{totalSpent.toLocaleString()}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <QuickLink
                    href="/wallet"
                    icon={<ShoppingCart className="size-4" />}
                    label="Buy Tokens"
                    description="Top up balance"
                />
                <QuickLink
                    href="/match"
                    icon={<Heart className="size-4" />}
                    label="Discover"
                    description="Find matches"
                />
                <QuickLink
                    href="/chat"
                    icon={<MessageCircle className="size-4" />}
                    label="Messages"
                    description="Open chat"
                />
                <QuickLink
                    href="/profile"
                    icon={<User className="size-4" />}
                    label="Profile"
                    description="Edit profile"
                />
            </div>

            {/* Two-column: members + transactions */}
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                <TopMembersSection />

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <div>
                            <CardTitle className="text-base">Recent Activity</CardTitle>
                            <CardDescription className="text-xs">Last 5 transactions</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/wallet" className="flex items-center gap-1 text-xs">
                                All <ArrowRight className="ml-1 size-3" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-10 rounded-lg" />
                                ))}
                            </div>
                        ) : recentTransactions.length === 0 ? (
                            <div className="flex flex-col items-center gap-2 py-8 text-center">
                                <Clock className="size-6 text-muted-foreground/40" />
                                <p className="text-sm text-muted-foreground">No activity yet</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {recentTransactions.map((tx) => (
                                    <TransactionRow key={tx.id} tx={tx} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
