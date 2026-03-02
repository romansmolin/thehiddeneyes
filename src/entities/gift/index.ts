export type {
    BuyGiftRequest,
    BuyGiftResponse,
    GiftCatalogItem,
    GiftCatalogResponse,
    GiftHistoryItem,
    GiftHistoryResponse,
    GiftInventoryItem,
    GiftInventoryResponse,
    SendGiftRequest,
    SendGiftResponse,
} from './model/types'

export {
    useGetGiftCatalogQuery,
    useGetGiftInventoryQuery,
    useGetGiftHistoryQuery,
    useBuyGiftMutation,
    useSendGiftMutation,
} from './api/client/endpoints'

export type { GiftHistoryQuery } from './api/client/services/gift.service'

// Server-side exports (app/api and DI wiring)
export { GiftController } from './api/server/controllers/gift.controller'
export { GiftRepository } from './api/server/repositories/gift.repo'
export { GiftService } from './api/server/services/gift.service'
export { GIFT_PORT_TOKENS } from './model/ports/match-reader.port'
export type { MatchReaderPort } from './model/ports/match-reader.port'
