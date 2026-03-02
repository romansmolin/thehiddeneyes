import type { AboutSectionProps } from '../model/types'
import { defaultAboutContent } from '../lib/about-section.mock'
import { AboutSectionVariant01 } from './variants/variant-01'
import { AboutSectionVariant02 } from './variants/varaint-02'

export const AboutSection = ({
    variant = 'variant-01',
    title,
    subtitle,
    className,
}: AboutSectionProps) => {
    const variantProps = {
        className,
        title: title ?? defaultAboutContent.title,
        subtitle: subtitle ?? defaultAboutContent.subtitle,
        badge: defaultAboutContent.badge,
        image: defaultAboutContent.image,
        cards: defaultAboutContent.cards,
    }

    switch (variant) {
        case 'variant-01':
            return <AboutSectionVariant01 {...variantProps} />
        case 'variant-02':
            return <AboutSectionVariant02 {...variantProps} />
        default:
            const check: never = variant
            return check
    }
}
