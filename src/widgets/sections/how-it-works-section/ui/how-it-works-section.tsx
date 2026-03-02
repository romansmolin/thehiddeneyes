import { HowItWorksSectionProps } from '../model/types'
import { HowItWorksVariant01 } from './variants/variant-01'
import { HowItWorksVariant02 } from './variants/variant-02'
import { HowItWorksVariant03 } from './variants/variant-03'

export function HowItWorksSection({ variant = 'variant-01', ...props }: HowItWorksSectionProps) {
    switch (variant) {
        case 'variant-01':
            return <HowItWorksVariant01 {...props} />
        case 'variant-02':
            return <HowItWorksVariant02 {...props} />
        case 'variant-03':
            return <HowItWorksVariant03 {...props} />
        default:
            return <HowItWorksVariant01 {...props} />
    }
}
