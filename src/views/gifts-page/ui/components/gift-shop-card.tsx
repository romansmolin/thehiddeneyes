import Image from 'next/image'
import type { GiftCatalogItem } from '@/entities/gift/model/types'
import { resolveGiftImagePath } from '@/entities/gift/lib/resolve-gift-image-path'
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'

type GiftShopCardProps = {
    item: GiftCatalogItem
    isBuying: boolean
    onBuy: (item: GiftCatalogItem) => Promise<void>
}

export const GiftShopCard = ({ item, isBuying, onBuy }: GiftShopCardProps) => {
    const imagePath = resolveGiftImagePath({
        slug: item.slug,
        imagePath: item.imagePath,
    })

    return (
        <Card className="h-full">
            <CardContent className="space-y-4 p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/20">
                    <Image
                        src={imagePath}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 35vw, 90vw"
                        className="object-contain p-3"
                    />
                </div>

                <div className="space-y-2">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.priceCoins} Lovity Coins</p>
                </div>

                <Button
                    type="button"
                    className="w-full"
                    disabled={isBuying}
                    onClick={() => void onBuy(item)}
                >
                    {isBuying ? 'Buying...' : 'Buy Gift'}
                </Button>
            </CardContent>
        </Card>
    )
}
