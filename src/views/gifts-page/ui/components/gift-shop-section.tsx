'use client'

import type { GiftCatalogItem } from '@/entities/gift/model/types'
import { useGetGiftCatalogQuery } from '@/entities/gift/api/client/endpoints'
import { useBuyGift } from '@/features/gifts/buy-gift'
import { Button } from '@/shared/ui/button'
import { getGiftsQueryErrorMessage } from '../../lib/get-gifts-query-error-message'
import { GiftShopCard } from './gift-shop-card'

const GiftShopLoading = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-border p-4">
                    <div className="h-36 animate-pulse rounded-lg bg-muted/40" />
                    <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-muted/40" />
                    <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-muted/40" />
                    <div className="mt-4 h-10 animate-pulse rounded bg-muted/40" />
                </div>
            ))}
        </div>
    )
}

export const GiftShopSection = () => {
    const catalogQuery = useGetGiftCatalogQuery()
    const buyGift = useBuyGift()

    const onBuyGift = async (item: GiftCatalogItem) => {
        await buyGift.buyGift({ giftId: item.id, giftName: item.name })
    }

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Gift Shop</h2>
                <p className="text-sm text-muted-foreground">
                    Buy gifts and add them to your inventory.
                </p>
            </div>

            {buyGift.successMessage ? (
                <div className="rounded-xl border border-border bg-primary/10 px-4 py-3 text-sm">
                    {buyGift.successMessage}
                </div>
            ) : null}

            {buyGift.errorMessage ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {buyGift.errorMessage}
                </div>
            ) : null}

            {catalogQuery.isLoading ? (
                <GiftShopLoading />
            ) : catalogQuery.isError ? (
                <div className="space-y-3 rounded-xl border border-border p-4">
                    <p className="text-sm text-destructive">
                        {getGiftsQueryErrorMessage(catalogQuery.error)}
                    </p>
                    <Button variant="outline" size="sm" onClick={() => void catalogQuery.refetch()}>
                        Retry
                    </Button>
                </div>
            ) : (catalogQuery.data?.items.length ?? 0) === 0 ? (
                <div className="rounded-xl border border-border p-4">
                    <p className="text-sm text-muted-foreground">Gift shop is currently empty.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {catalogQuery.data?.items.map((item) => (
                        <GiftShopCard
                            key={item.id}
                            item={item}
                            isBuying={buyGift.isBuyingGiftId === item.id}
                            onBuy={onBuyGift}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
