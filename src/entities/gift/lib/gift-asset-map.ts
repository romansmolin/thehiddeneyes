export const DEFAULT_GIFT_ASSET_PATH = '/gifts-2/gift.png'

const GIFT_ASSET_POOL = [
    '/gifts-1/Rose.png',
    '/gifts-1/Chocolate.png',
    '/gifts-1/Teddy Bear.png',
    '/gifts-2/coffee.png',
    '/gifts-2/flower.png',
    '/gifts-2/trophy.png',
    '/gifts-2/fire.png',
    '/gifts-3/Bottle.png',
    '/gifts-3/Star.png',
    '/gifts-3/Tresure.png',
] as const

export const GIFT_ASSET_MAP: Record<string, string> = {
    roses: '/gifts-1/Rose.png',
    tulips: '/gifts-1/Chocolate.png',
    gerbera: '/gifts-1/Teddy Bear.png',
    lilacs: '/gifts-2/coffee.png',
    freesia: '/gifts-2/flower.png',
    dahlias: '/gifts-2/trophy.png',
    hydrangea: '/gifts-2/fire.png',
    orhid: '/gifts-3/Bottle.png',
    pions: '/gifts-3/Star.png',
    ranunculus: '/gifts-3/Tresure.png',
}

export const GIFT_DISPLAY_NAME_BY_IMAGE_PATH: Record<string, string> = {
    '/gifts-1/Rose.png': 'Rose',
    '/gifts-1/Chocolate.png': 'Chocolate',
    '/gifts-1/Teddy Bear.png': 'Teddy Bear',
    '/gifts-2/coffee.png': 'Coffee',
    '/gifts-2/flower.png': 'Flower',
    '/gifts-2/trophy.png': 'Trophy',
    '/gifts-2/fire.png': 'Fire',
    '/gifts-3/Bottle.png': 'Bottle',
    '/gifts-3/Star.png': 'Star',
    '/gifts-3/Tresure.png': 'Treasure',
}

export const PROJECT_GIFT_SLUGS = Object.keys(GIFT_ASSET_MAP)

export const isProjectGiftSlug = (slug: string): boolean => {
    return Object.prototype.hasOwnProperty.call(GIFT_ASSET_MAP, slug)
}

const pickAssetByHash = (value: string): string => {
    let hash = 0

    for (let index = 0; index < value.length; index += 1) {
        hash = (hash + value.charCodeAt(index)) % GIFT_ASSET_POOL.length
    }

    return GIFT_ASSET_POOL[hash]
}

export const getThemedFallbackGiftAsset = (slug: string): string => {
    const normalizedSlug = slug.trim().toLowerCase()

    if (!normalizedSlug) {
        return DEFAULT_GIFT_ASSET_PATH
    }

    return pickAssetByHash(normalizedSlug)
}
