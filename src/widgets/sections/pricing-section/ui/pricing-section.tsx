import type { PricingSectionProps } from '../model/types'
import { defaultPlans } from '../lib/pricing-section.mock'
import { Variant01 } from './variants/variant-01'
import { Variant02 } from './variants/variant-02'
import { PricingVariant03 } from './variants/variant-03'

export function PricingSection({
    variant = 'variant-01',
    plans = defaultPlans,
    ...props
}: PricingSectionProps) {
    switch (variant) {
        case 'variant-02':
            return <Variant02 plans={plans} {...props} />
        case 'variant-03':
            return <PricingVariant03 plans={plans} {...props} />
        case 'variant-01':
        default:
            return <Variant01 plans={plans} {...props} />
    }
}
