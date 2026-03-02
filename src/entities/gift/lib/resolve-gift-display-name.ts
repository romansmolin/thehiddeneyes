import { GIFT_DISPLAY_NAME_BY_IMAGE_PATH } from './gift-asset-map'
import { resolveGiftImagePath } from './resolve-gift-image-path'

type ResolveGiftDisplayNameInput = {
    slug?: string
    imagePath?: string
    fallbackName?: string
}

export const resolveGiftDisplayName = ({
    slug,
    imagePath,
    fallbackName,
}: ResolveGiftDisplayNameInput): string => {
    const resolvedImagePath = resolveGiftImagePath({ slug, imagePath })
    const mappedName = GIFT_DISPLAY_NAME_BY_IMAGE_PATH[resolvedImagePath]

    if (mappedName) {
        return mappedName
    }

    if (typeof fallbackName === 'string' && fallbackName.trim().length > 0) {
        return fallbackName.trim()
    }

    return 'Gift'
}
