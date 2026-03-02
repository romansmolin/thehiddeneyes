import type { SocialProofSectionProps } from '../model/types'
import { defaultStats, defaultLogos } from '../lib/social-proof-section.mock'
import { Variant01 } from './variants/variant-01'
import { Variant02 } from './variants/variant-02'

export function SocialProofSection({
    variant = 'variant-01',
    stats = defaultStats,
    logos = defaultLogos,
    ...props
}: SocialProofSectionProps) {
    switch (variant) {
        case 'variant-02':
            return <Variant02 stats={stats} logos={logos} {...props} />
        case 'variant-01':
        default:
            return <Variant01 stats={stats} logos={logos} {...props} />
    }
}
