import type { ContentSectionProps } from '../model/types'
import { defaultImage } from '../lib/content-section.mock'
import { Variant01 } from './variants/variant-01'
import { Variant02 } from './variants/variant-02'
import { ContentVariant03 } from './variants/variant-03'

export function ContentSection({
    variant = 'variant-01',
    image = defaultImage,
    ...props
}: ContentSectionProps) {
    switch (variant) {
        case 'variant-02':
            return <Variant02 image={image} {...props} />
        case 'variant-03':
            return <ContentVariant03 {...props} />
        case 'variant-01':
        default:
            return <Variant01 image={image} {...props} />
    }
}
