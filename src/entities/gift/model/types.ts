export interface GiftCatalogItem {
    id: string
    slug: string
    name: string
    imagePath: string
    priceCoins: number
}

export interface GiftCatalogResponse {
    items: GiftCatalogItem[]
}

export interface GiftInventoryItem {
    giftId: string
    giftName: string
    giftImagePath: string
    quantity: number
    updatedAt: string
}

export interface GiftInventoryResponse {
    items: GiftInventoryItem[]
}

export interface BuyGiftRequest {
    giftId: string
}

export interface BuyGiftResponse {
    giftId: string
    purchasedQuantity: number
    inventoryQuantity: number
    spentCoins: number
    remainingBalance: number
}

export interface SendGiftRequest {
    recipientUserId: number
    giftId: string
}

export interface SendGiftResponse {
    giftSendId: string
    giftId: string
    recipientUserId: number
    remainingInventory: number
    createdAt: string
}

export interface GiftHistoryItem {
    id: string
    giftId: string
    giftName: string
    giftImagePath: string
    recipientUserId: number
    priceCoins: number
    createdAt: string
}

export interface GiftHistoryResponse {
    items: GiftHistoryItem[]
}
