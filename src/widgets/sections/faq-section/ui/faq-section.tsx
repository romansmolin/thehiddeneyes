import { FaqSectionProps } from '../model/types'
import { FaqSectionVariant01 } from './variants/variant-01'
import { FaqSectionVariant02 } from './variants/variant-02'
import { FaqSectionVariant03 } from './variants/variant-03'

export const FaqSection = ({
    variant = 'variant-01',
    title,
    subtitle,
    badge,
    faqs,
    cta,
    className,
}: FaqSectionProps) => {
    const variantProps = { title, subtitle, badge, faqs, cta, className }

    switch (variant) {
        case 'variant-02':
            return <FaqSectionVariant02 {...variantProps} />
        case 'variant-03':
            return <FaqSectionVariant03 {...variantProps} />
        case 'variant-01':
        default:
            return <FaqSectionVariant01 {...variantProps} />
    }
}
