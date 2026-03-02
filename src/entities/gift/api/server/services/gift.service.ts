import { inject, injectable } from 'inversify'
import { AppError } from '@/shared/errors/app-error'
import { GIFT_PORT_TOKENS } from '@/entities/gift/model/ports/match-reader.port'
import type { MatchReaderPort } from '@/entities/gift/model/ports/match-reader.port'
import { isProjectGiftSlug } from '@/entities/gift/lib/gift-asset-map'
import { resolveGiftDisplayName } from '@/entities/gift/lib/resolve-gift-display-name'
import { resolveGiftImagePath } from '@/entities/gift/lib/resolve-gift-image-path'
import type {
    BuyGiftResponse,
    GiftCatalogItem,
    GiftCatalogResponse,
    GiftHistoryItem,
    GiftHistoryResponse,
    GiftInventoryItem,
    GiftInventoryResponse,
    SendGiftResponse,
} from '@/entities/gift/model/types'
import { GiftRepository } from '../repositories/gift.repo'

type BuyGiftInput = {
    userId: string
    giftId: string
}

type SendGiftInput = {
    senderUserId: string
    recipientUserId: number
    giftId: string
    sessionId: string
}

const toGiftCatalogItem = (row: {
    id: string
    slug: string
    name: string
    imagePath: string
    priceCoins: number
}): GiftCatalogItem => ({
    id: row.id,
    slug: row.slug,
    name: resolveGiftDisplayName({
        slug: row.slug,
        imagePath: row.imagePath,
        fallbackName: row.name,
    }),
    imagePath: resolveGiftImagePath({
        slug: row.slug,
        imagePath: row.imagePath,
    }),
    priceCoins: row.priceCoins,
})

const toGiftInventoryItem = (row: {
    giftId: string
    quantity: number
    updatedAt: Date
    gift: {
        slug: string
        name: string
        imagePath: string
    }
}): GiftInventoryItem => ({
    giftId: row.giftId,
    quantity: row.quantity,
    updatedAt: row.updatedAt.toISOString(),
    giftName: resolveGiftDisplayName({
        slug: row.gift.slug,
        imagePath: row.gift.imagePath,
        fallbackName: row.gift.name,
    }),
    giftImagePath: resolveGiftImagePath({
        slug: row.gift.slug,
        imagePath: row.gift.imagePath,
    }),
})

const toGiftHistoryItem = (row: {
    id: string
    giftId: string
    recipientDatingUserId: number
    priceCoins: number
    createdAt: Date
    gift: {
        slug: string
        name: string
        imagePath: string
    }
}): GiftHistoryItem => ({
    id: row.id,
    giftId: row.giftId,
    recipientUserId: row.recipientDatingUserId,
    priceCoins: row.priceCoins,
    createdAt: row.createdAt.toISOString(),
    giftName: resolveGiftDisplayName({
        slug: row.gift.slug,
        imagePath: row.gift.imagePath,
        fallbackName: row.gift.name,
    }),
    giftImagePath: resolveGiftImagePath({
        slug: row.gift.slug,
        imagePath: row.gift.imagePath,
    }),
})

@injectable()
export class GiftService {
    constructor(
        @inject(GiftRepository) private repository: GiftRepository,
        @inject(GIFT_PORT_TOKENS.MatchReaderPort) private matchReader: MatchReaderPort,
    ) {}

    async listCatalog(): Promise<GiftCatalogResponse> {
        const rows = await this.repository.listCatalog()

        return {
            items: rows.map(toGiftCatalogItem),
        }
    }

    async listInventory(userId: string): Promise<GiftInventoryResponse> {
        const rows = await this.repository.listUserInventory(userId)

        return {
            items: rows.map(toGiftInventoryItem),
        }
    }

    async listHistory(senderUserId: string, limit = 20): Promise<GiftHistoryResponse> {
        const rows = await this.repository.listUserGiftHistory(senderUserId, limit)

        return {
            items: rows.map(toGiftHistoryItem),
        }
    }

    async buyGift(input: BuyGiftInput): Promise<BuyGiftResponse> {
        const gift = await this.repository.findGiftById(input.giftId)

        if (!gift) {
            throw AppError.notFoundError('Gift not found')
        }

        if (!isProjectGiftSlug(gift.slug)) {
            throw AppError.notFoundError('Gift not found')
        }

        if (!gift.isActive) {
            throw AppError.validationError('Gift is inactive')
        }

        const result = await this.repository.buyGiftTransactional({
            userId: input.userId,
            giftId: gift.id,
            giftName: gift.name,
            priceCoins: gift.priceCoins,
        })

        return {
            giftId: gift.id,
            purchasedQuantity: 1,
            inventoryQuantity: result.inventoryQuantity,
            spentCoins: gift.priceCoins,
            remainingBalance: result.remainingBalance,
        }
    }

    async sendGift(input: SendGiftInput): Promise<SendGiftResponse> {
        const gift = await this.repository.findGiftById(input.giftId)

        if (!gift) {
            throw AppError.notFoundError('Gift not found')
        }

        if (!isProjectGiftSlug(gift.slug)) {
            throw AppError.notFoundError('Gift not found')
        }

        const matches = await this.matchReader.listMatches(input.sessionId)
        const recipientIsMatch = matches.items.some((match) => match.id === input.recipientUserId)

        if (!recipientIsMatch) {
            throw AppError.authorizationError(
                'Match not found. Gifts can be sent only to matched users.',
            )
        }

        const result = await this.repository.sendGiftTransactional({
            senderUserId: input.senderUserId,
            recipientDatingUserId: input.recipientUserId,
            giftId: gift.id,
            priceCoins: gift.priceCoins,
        })

        return {
            giftSendId: result.giftSend.id,
            giftId: gift.id,
            recipientUserId: input.recipientUserId,
            remainingInventory: result.remainingInventory,
            createdAt: result.giftSend.createdAt.toISOString(),
        }
    }
}
