import { DEFAULT_GIFT_ASSET_PATH, GIFT_ASSET_MAP, getThemedFallbackGiftAsset } from './gift-asset-map'

type ResolveGiftImagePathInput = {
    slug?: string
    imagePath?: string
}

export const resolveGiftImagePath = ({ slug, imagePath }: ResolveGiftImagePathInput): string => {
    const normalizedSlug = slug?.trim().toLowerCase()

    if (normalizedSlug) {
        const mappedPath = GIFT_ASSET_MAP[normalizedSlug]
        if (mappedPath) {
            return mappedPath
        }

        const themedFallbackPath = getThemedFallbackGiftAsset(normalizedSlug)
        if (themedFallbackPath) {
            return themedFallbackPath
        }
    }

    if (typeof imagePath === 'string' && imagePath.startsWith('/')) {
        return imagePath
    }

    return DEFAULT_GIFT_ASSET_PATH
}
