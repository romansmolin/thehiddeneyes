import Image from 'next/image'
import type { GiftInventoryItem } from '@/entities/gift/model/types'
import { resolveGiftImagePath } from '@/entities/gift/lib/resolve-gift-image-path'
import { Card, CardContent } from '@/shared/ui/card'

const formatUpdatedAt = (value: string): string => {
    const parsed = new Date(value)

    if (Number.isNaN(parsed.getTime())) {
        return 'Updated recently'
    }

    return new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsed)
}

const toInventoryGiftSlug = (item: GiftInventoryItem): string => {
    if (item.giftId.startsWith('gift_')) {
        return item.giftId.slice(5)
    }

    return item.giftName.trim().toLowerCase().replaceAll(/\s+/g, '-')
}

export const CurrentGiftCard = ({ item }: { item: GiftInventoryItem }) => {
    const slug = toInventoryGiftSlug(item)
    const imagePath = resolveGiftImagePath({
        slug,
        imagePath: item.giftImagePath,
    })

    return (
        <Card className="h-full">
            <CardContent className="space-y-3 p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted/20">
                    <Image
                        src={imagePath}
                        alt={item.giftName}
                        fill
                        sizes="(min-width: 1280px) 20vw, (min-width: 768px) 35vw, 90vw"
                        className="object-contain p-3"
                    />
                </div>

                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                        <p className="truncate text-sm font-semibold">{item.giftName}</p>
                        <p className="text-xs text-muted-foreground">
                            Updated {formatUpdatedAt(item.updatedAt)}
                        </p>
                    </div>
                    <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold">
                        x{item.quantity}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
