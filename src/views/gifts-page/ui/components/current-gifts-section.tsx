'use client'

import { useMemo } from 'react'
import { useGetGiftInventoryQuery } from '@/entities/gift/api/client/endpoints'
import { Button } from '@/shared/ui/button'
import { getGiftsQueryErrorMessage } from '../../lib/get-gifts-query-error-message'
import { CurrentGiftCard } from './current-gift-card'

const toTimestamp = (value: string): number => {
    const parsed = new Date(value).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
}

const CurrentGiftsLoading = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-border p-4">
                    <div className="h-36 animate-pulse rounded-lg bg-muted/40" />
                    <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-muted/40" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/40" />
                </div>
            ))}
        </div>
    )
}

export const CurrentGiftsSection = () => {
    const inventoryQuery = useGetGiftInventoryQuery()

    const sortedItems = useMemo(() => {
        const items = inventoryQuery.data?.items ?? []

        return items
            .map((item, index) => ({ item, index }))
            .sort((first, second) => {
                const byDate = toTimestamp(second.item.updatedAt) - toTimestamp(first.item.updatedAt)
                return byDate !== 0 ? byDate : first.index - second.index
            })
            .map((entry) => entry.item)
    }, [inventoryQuery.data?.items])

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Current Gifts</h2>
                <p className="text-sm text-muted-foreground">
                    Everything you currently own in your gift inventory.
                </p>
            </div>

            {inventoryQuery.isLoading ? (
                <CurrentGiftsLoading />
            ) : inventoryQuery.isError ? (
                <div className="space-y-3 rounded-xl border border-border p-4">
                    <p className="text-sm text-destructive">
                        {getGiftsQueryErrorMessage(inventoryQuery.error)}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => void inventoryQuery.refetch()}>
                        Retry
                    </Button>
                </div>
            ) : sortedItems.length === 0 ? (
                <div className="rounded-xl border border-border p-4">
                    <p className="text-sm text-muted-foreground">
                        You have no gifts yet. Buy one below.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {sortedItems.map((item) => (
                        <CurrentGiftCard key={item.giftId} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}
