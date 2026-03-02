import { TestimonialsSectionProps } from '../model/types'
import { TestimonialsVariant01 } from './variants/variant-01'
import { TestimonialsVariant02 } from './variants/variant-02'
import { TestimonialsVariant03 } from './variants/variant-03'

export const TestimonialsSection = ({
    variant = 'variant-01',
    title,
    subtitle,
    badge,
    testimonials,
    className,
}: TestimonialsSectionProps) => {
    const variantProps = { title, subtitle, badge, testimonials, className }

    switch (variant) {
        case 'variant-01':
            return <TestimonialsVariant01 {...variantProps} />
        case 'variant-02':
            return <TestimonialsVariant02 {...variantProps} />
        case 'variant-03':
            return <TestimonialsVariant03 {...variantProps} />
        default:
            return <TestimonialsVariant01 {...variantProps} />
    }
}
